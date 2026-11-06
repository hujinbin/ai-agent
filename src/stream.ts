interface StreamCallbacks {
  onContent?: (content: string) => void;
  onStage?: (message: string) => void;
  onSources?: (payload: unknown) => void;
}

// 文本对话与 MCP 工具规划共用增量 SSE 解析，避免 CRLF 和拆包丢字。
export async function readAIStream(response: Response, signal: AbortSignal, callbacks: StreamCallbacks = {}): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('无法获取响应流');
  const decoder = new TextDecoder();
  let buffer = '';
  let eventName = '';
  let data: string[] = [];
  let completed = false;
  let content = '';
  const dispatch = () => {
    const name = eventName || 'message';
    const raw = data.join('\n');
    eventName = '';
    data = [];
    if (!raw || completed || signal.aborted) return;
    if (raw.trim() === '[DONE]') { completed = true; return; }
    if (!['message', 'search', 'stage', 'error', 'done'].includes(name)) return;
    let value: any;
    try { value = JSON.parse(raw); } catch { throw new Error('流式响应数据格式错误'); }
    if (name === 'error' || value.error) throw new Error(value.message || value.error?.message || 'AI 服务返回错误');
    if (name === 'done') { completed = true; return; }
    if (name === 'stage' && typeof value.message === 'string') callbacks.onStage?.(value.message);
    if (name === 'search' || name === 'message') callbacks.onSources?.(value);
    if (name === 'message') {
      const choice = value.choices?.[0];
      const text = typeof value.content === 'string' ? value.content : choice?.delta?.content;
      if (typeof text === 'string') { content += text; callbacks.onContent?.(text); }
      if (choice?.finish_reason) completed = true;
    }
  };
  const line = (text: string) => {
    if (!text) { dispatch(); return; }
    if (text.startsWith(':')) return;
    const colon = text.indexOf(':');
    const field = colon < 0 ? text : text.slice(0, colon);
    let value = colon < 0 ? '' : text.slice(colon + 1);
    if (value.startsWith(' ')) value = value.slice(1);
    if (field === 'event') eventName = value;
    if (field === 'data') data.push(value);
  };
  const process = (final = false) => {
    while (!completed) {
      const index = buffer.search(/[\r\n]/);
      if (index < 0) break;
      if (!final && buffer[index] === '\r' && index === buffer.length - 1) break;
      const width = buffer[index] === '\r' && buffer[index + 1] === '\n' ? 2 : 1;
      line(buffer.slice(0, index));
      buffer = buffer.slice(index + width);
    }
    if (final && !completed) { if (buffer) line(buffer); buffer = ''; dispatch(); }
  };
  const abort = () => { reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', abort, { once: true });
  try {
    if (signal.aborted) throw new DOMException('请求已取消', 'AbortError');
    while (!completed) {
      const result = await reader.read();
      if (signal.aborted) throw new DOMException('请求已取消', 'AbortError');
      buffer += result.done ? decoder.decode() : decoder.decode(result.value, { stream: true });
      process(result.done);
      if (result.done) break;
    }
    if (!completed) throw new Error('回复连接提前中断，已收到的内容已保留，请继续追问');
    return content;
  } finally {
    signal.removeEventListener('abort', abort);
    try { await reader.cancel(); } catch { /* 已关闭连接仍需释放读取锁。 */ }
    reader.releaseLock();
  }
}
