import AIAgent from '../src/ai-agent';
import { streamFixture, tick } from './streamFixture';

describe('客服文本插件', () => {
  let agent: AIAgent | undefined;
  beforeEach(() => { (global.fetch as jest.Mock).mockReset(); document.body.innerHTML = ''; });
  afterEach(() => agent?.destroy());

  test('只提供文本客服入口，旧媒体参数不会创建媒体控件', () => {
    agent = new AIAgent({ host: 'http://localhost:8080', media: true });
    expect(document.querySelector('.ai-agent-mode')).toBeNull();
    expect(document.querySelector('input[type="file"]')).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('关闭联网原样传给 AI，来源支持新标签页打开', async () => {
    const stream = streamFixture(['event: search\r\ndata: {"search_results":[{"title":"产品说明","url":"https://example.com/help"}]}\r\n\r\nevent: message\r\ndata: {"content":"客服回复"}\r\n\r\nevent: done\r\ndata: {}\r\n\r\n']);
    (global.fetch as jest.Mock).mockResolvedValueOnce(stream.response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true, search: false });
    agent.sendMessage('售后咨询');
    await tick();
    expect(JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body).search).toBe(false);
    expect(document.querySelector('.ai-agent-msg-ai')?.textContent).toContain('客服回复');
    expect(document.querySelector('.ai-agent-source')?.getAttribute('target')).toBe('_blank');
    expect(stream.reader.releaseLock).toHaveBeenCalled();
  });

  test('非流式展示仍支持联网，完成前缓冲完整回复', async () => {
    const stream = streamFixture(['event: message\ndata: {"content":"缓冲文字"}\n\n'], true);
    (global.fetch as jest.Mock).mockResolvedValueOnce(stream.response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: false, search: true });
    agent.sendMessage('查询保修政策');
    await tick();
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain('/chat/stream');
    expect(JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body).search).toBe(true);
    expect(document.querySelector('.ai-agent-msg-ai')?.textContent).not.toContain('缓冲文字');
    stream.push('event: done\ndata: {}\n\n');
    stream.close();
    await tick();
    expect(document.querySelector('.ai-agent-msg-ai')?.textContent).toContain('缓冲文字');
  });

  test('MCP 可独立禁用，联网关闭时也可使用文本接口', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(streamFixture(['event: message\ndata: {"content":"正常回复"}\n\nevent: done\ndata: {}\n\n']).response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true, search: false, mcp: false, mcpServers: [{ id: 'articles', url: 'https://mcp.example.com/mcp' }] });
    agent.sendMessage('咨询');
    await tick();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe('http://localhost:8080/api/ai/chat/stream');
    expect((document.querySelector('.ai-agent-toolbar') as HTMLElement).style.display).toBe('none');
  });

  test('普通兼容模式保留 JSON completion 入口', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ code: 200, data: { choices: [{ message: { content: '普通回复' } }] } }) });
    agent = new AIAgent({ host: 'http://localhost:8080', stream: false, search: false, usingContext: false });
    agent.sendMessage('咨询');
    await tick();
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain('/chat/completion');
    expect(document.querySelector('.ai-agent-msg-ai')?.textContent).toContain('普通回复');
  });

  test('停止保留已收到的文本，销毁后迟到响应不会恢复插件', async () => {
    const stream = streamFixture(['event: message\ndata: {"content":"部分回复"}\n\n'], true);
    (global.fetch as jest.Mock).mockResolvedValueOnce(stream.response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true, search: false });
    agent.sendMessage('咨询');
    await tick();
    agent.cancel();
    await tick();
    expect(document.querySelector('.ai-agent-msg-ai .ai-agent-msg-content')?.textContent).toBe('部分回复');
    expect(stream.reader.cancel).toHaveBeenCalled();
    expect(stream.reader.releaseLock).toHaveBeenCalled();
    expect((document.querySelector('.ai-agent-send') as HTMLButtonElement).hidden).toBe(false);
    expect((document.querySelector('.ai-agent-send') as HTMLButtonElement).disabled).toBe(true);
    agent.destroy();
    stream.push('event: message\ndata: {"content":"迟到内容"}\n\n');
    await tick();
    expect(document.querySelector('.ai-agent-btn')).toBeNull();
    expect(document.querySelector('.ai-agent-panel')).toBeNull();
  });

  test('输入法确认与换行不会误发送，Enter 发送后停止按钮接替发送', async () => {
    const stream = streamFixture([], true);
    (global.fetch as jest.Mock).mockResolvedValueOnce(stream.response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true });
    const input = document.querySelector('.ai-agent-input') as HTMLTextAreaElement;
    const send = document.querySelector('.ai-agent-send') as HTMLButtonElement;
    const stop = document.querySelector('.ai-agent-stop') as HTMLButtonElement;
    expect(input.tagName).toBe('TEXTAREA');
    expect(send.disabled).toBe(true);
    input.value = '客户问题';
    input.dispatchEvent(new Event('input'));
    expect(send.disabled).toBe(false);
    input.dispatchEvent(new Event('compositionstart'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    input.dispatchEvent(new Event('compositionend'));
    const lineBreak = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true, cancelable: true });
    input.dispatchEvent(lineBreak);
    expect(lineBreak.defaultPrevented).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    expect(send.hidden).toBe(true);
    expect(stop.hidden).toBe(false);
    expect((document.querySelector('.ai-agent-welcome') as HTMLElement).hidden).toBe(true);
    input.value = '下一条草稿';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('下一条草稿');
    await tick();
    stop.click();
    await tick();
    expect(stop.hidden).toBe(true);
    expect(send.hidden).toBe(false);
    expect(send.disabled).toBe(false);
    expect(input.value).toBe('下一条草稿');
  });

  test('后端阶段与正文分开，来源默认折叠并只统计安全链接', async () => {
    const stream = streamFixture(['event: stage\ndata: {"message":"正在检索资料"}\n\nevent: search\ndata: {"sources":[{"title":"产品说明","url":"https://example.com/help"},{"title":"无效链接","url":"javascript:alert(1)"}]}\n\n'], true);
    (global.fetch as jest.Mock).mockResolvedValueOnce(stream.response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true });
    agent.sendMessage('售后政策');
    await tick();
    const progress = document.querySelector('.ai-agent-progress') as HTMLDetailsElement;
    const content = document.querySelector('.ai-agent-msg-ai .ai-agent-msg-content') as HTMLElement;
    const sources = document.querySelector('.ai-agent-msg-sources') as HTMLDetailsElement;
    expect(progress.dataset.state).toBe('busy');
    expect(progress.open).toBe(false);
    expect(progress.querySelector('summary')?.textContent).toBe('正在检索资料');
    expect(content.hidden).toBe(true);
    expect(sources.open).toBe(false);
    expect(sources.querySelector('summary')?.textContent).toBe('参考来源 · 1');
    expect(sources.querySelectorAll('a')).toHaveLength(1);
    expect(sources.querySelector('a')?.rel).toBe('noopener noreferrer');
    sources.open = true;
    stream.push('event: message\ndata: {"content":"这是回答"}\n\nevent: done\ndata: {}\n\n');
    stream.close();
    await tick();
    expect(content.textContent).toBe('这是回答');
    expect(content.hidden).toBe(false);
    expect(progress.dataset.state).toBe('done');
    expect(progress.querySelector('summary')?.textContent).toBe('已完成');
    expect(progress.querySelector('ol')?.textContent).toContain('正在检索资料');
    expect(sources.open).toBe(true);
  });

  test('上翻时不抢滚动位置，回到最新后恢复跟随', async () => {
    const stream = streamFixture([], true);
    (global.fetch as jest.Mock).mockResolvedValueOnce(stream.response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true });
    const messages = document.querySelector('.ai-agent-messages') as HTMLDivElement;
    Object.defineProperty(messages, 'scrollHeight', { configurable: true, value: 1200 });
    Object.defineProperty(messages, 'clientHeight', { configurable: true, value: 300 });
    agent.sendMessage('较长回答');
    await tick();
    messages.scrollTop = 200;
    messages.dispatchEvent(new Event('scroll'));
    const progress = document.querySelector('.ai-agent-progress') as HTMLDetailsElement;
    progress.open = true;
    progress.dispatchEvent(new Event('toggle'));
    expect(messages.scrollTop).toBe(200);
    stream.push('event: message\ndata: {"content":"第一段"}\n\n');
    await tick();
    expect(messages.scrollTop).toBe(200);
    const scrollButton = document.querySelector('.ai-agent-scroll-bottom') as HTMLButtonElement;
    expect(scrollButton.hidden).toBe(false);
    scrollButton.click();
    expect(messages.scrollTop).toBe(1200);
    expect(scrollButton.hidden).toBe(true);
    Object.defineProperty(messages, 'scrollHeight', { configurable: true, value: 1400 });
    stream.push('event: message\ndata: {"content":"第二段"}\n\nevent: done\ndata: {}\n\n');
    stream.close();
    await tick();
    expect(messages.scrollTop).toBe(1400);
  });

  test('关闭面板保留草稿并还原触发按钮焦点，多实例销毁仅清理自己的样式', () => {
    agent = new AIAgent({ host: 'http://localhost:8080', colors: { primary: '#123456' } });
    const second = new AIAgent({ host: 'http://localhost:8080', theme: 'dark' });
    const trigger = document.querySelector('.ai-agent-btn') as HTMLButtonElement;
    const input = document.querySelector('.ai-agent-input') as HTMLTextAreaElement;
    trigger.click();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(input);
    input.value = '尚未发送';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
    trigger.click();
    expect(input.value).toBe('尚未发送');
    const styles = Array.from(document.querySelectorAll('style[ai-agent-dynamic-styles]'));
    const remainingStyle = styles[styles.length - 1];
    agent.destroy();
    expect(remainingStyle.isConnected).toBe(true);
    second.destroy();
    expect(remainingStyle.isConnected).toBe(false);
  });

  test('显式传入 undefined 的可选标题和占位文本仍使用默认值', () => {
    agent = new AIAgent({ host: 'http://localhost:8080', title: undefined, placeholder: undefined });
    expect(document.querySelector('.ai-agent-panel-header h3')?.textContent).toBe('AI 助手');
    expect(document.querySelector('.ai-agent-panel')?.getAttribute('aria-label')).toBe('AI 助手');
    expect((document.querySelector('.ai-agent-input') as HTMLTextAreaElement).placeholder).toBe('请输入问题...');
  });
});
