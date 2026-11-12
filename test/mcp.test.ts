import { inspectMCPServers, queryMCP, planWithAI } from '../src/mcp';
import { streamFixture } from './streamFixture';

const rpcResponse = (result: unknown) => ({
  ok: true, status: 200,
  headers: { get: (name: string): string | null => name === 'Content-Type' ? 'application/json' : null },
  text: async () => JSON.stringify({ jsonrpc: '2.0', id: 1, result })
});

const server = { id: 'articles', url: 'https://mcp.example.com/mcp' };
const tools = [{ name: 'search_articles', inputSchema: { type: 'object' } }];
const toolPlan = '[{"tool":"mcp_0","arguments":{"keyword":"React"}}]';

function queueDiscovery(availableTools = tools): void {
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce(rpcResponse({ protocolVersion: '2025-03-26' }))
    .mockResolvedValueOnce({ ok: true, status: 202, headers: { get: () => null } })
    .mockResolvedValueOnce(rpcResponse({ tools: availableTools }));
}

describe('插件浏览器直连 MCP', () => {
  beforeEach(() => (global.fetch as jest.Mock).mockReset());

  test('初始化、工具发现和调用直接访问插件配置地址', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(rpcResponse({ protocolVersion: '2025-03-26' }))
      .mockResolvedValueOnce({ ok: true, status: 202, headers: { get: () => null } })
      .mockResolvedValueOnce(rpcResponse({ tools: [{ name: 'search_articles', inputSchema: { type: 'object' } }] }))
      .mockResolvedValueOnce(rpcResponse({ content: [{ type: 'text', text: JSON.stringify({ articles: [{ title: 'React 教程', url: 'https://blog.example.com/article/1' }] }) }] }));
    const plan = jest.fn().mockResolvedValueOnce('[{"tool":"mcp_0","arguments":{"keyword":"React"}}]').mockResolvedValueOnce('[]');
    const result = await queryMCP([{ id: 'articles', url: 'https://mcp.example.com/mcp', token: 'browser-token' }], [{ role: 'user', content: '找 React 文章' }], plan, new AbortController().signal, jest.fn());
    expect(result.context).toContain('React 教程');
    expect(result.sources[0].url).toBe('https://blog.example.com/article/1');
    expect(result).toMatchObject({ status: 'completed', toolCount: 1, toolCalls: 1, successfulCalls: 1, failedCalls: 0 });
    const calls = (global.fetch as jest.Mock).mock.calls;
    expect(calls).toHaveLength(4);
    expect(calls.every(call => call[0] === 'https://mcp.example.com/mcp')).toBe(true);
    expect(calls[0][1].headers.Authorization).toBe('Bearer browser-token');
    expect(JSON.parse(calls[0][1].body).params.clientInfo.version).toBe(require('../package.json').version);
    expect(JSON.parse(calls[3][1].body).method).toBe('tools/call');
  });

  test('AI 规划只发送普通聊天参数', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(streamFixture(['event: message\ndata: {"content":"[]"}\n\nevent: done\ndata: {}\n\n']).response);
    const result = await planWithAI('/api/ai/chat/stream', [{ role: 'user', content: '查询' }], 'agnes-3.0-flash', 'site-token', new AbortController().signal);
    expect(result).toBe('[]');
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(Object.keys(body).sort()).toEqual(['messages', 'model', 'search']);
    expect(body).toMatchObject({ model: 'agnes-3.0-flash', search: false });
  });

  test('未知工具仅修正一次，仍无效时返回失败状态并停止调用', async () => {
    queueDiscovery();
    const plan = jest.fn().mockResolvedValue('[{"tool":"mcp_99","arguments":{}}]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'failed', context: '', sources: [], toolCalls: 0, successfulCalls: 0, failedCalls: 0 });
    expect(plan).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test('打开面板时可独立检查连接，探测完成后关闭会话', async () => {
    const initialized = rpcResponse({ protocolVersion: '2025-03-26' });
    initialized.headers.get = (name: string) => name === 'Mcp-Session-Id' ? 'fixture-session' : name === 'Content-Type' ? 'application/json' : null;
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(initialized)
      .mockResolvedValueOnce({ ok: true, status: 202, headers: { get: () => null } })
      .mockResolvedValueOnce(rpcResponse({ tools }))
      .mockResolvedValueOnce({ ok: true });
    const onStage = jest.fn();
    const statuses = await inspectMCPServers([server], new AbortController().signal, onStage);
    expect(statuses).toEqual([{ id: 'articles', name: 'articles', connected: true, toolCount: 1, message: '已连接，发现 1 个工具' }]);
    expect(onStage).toHaveBeenCalledWith('articles 已连接，发现 1 个工具');
    expect((global.fetch as jest.Mock).mock.calls[3][1]).toMatchObject({ method: 'DELETE', headers: { 'Mcp-Session-Id': 'fixture-session' } });
  });

  test('单个连接失败不会阻断其他服务，状态不泄露原始错误', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('https://internal.example/private token=hidden'));
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse({ content: [{ type: 'text', text: '可用资料' }] }));
    const plan = jest.fn().mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('[]');
    const result = await queryMCP([{ id: 'offline', url: 'https://offline.example/mcp' }, server], [], plan, new AbortController().signal, jest.fn());
    expect(result.status).toBe('completed');
    expect(result.context).toContain('可用资料');
    expect(result.servers).toEqual([
      { id: 'offline', name: 'offline', connected: false, toolCount: 0, message: '暂时无法连接，请稍后重试' },
      { id: 'articles', name: 'articles', connected: true, toolCount: 1, message: '已连接，发现 1 个工具' }
    ]);
    expect(JSON.stringify(result)).not.toContain('internal.example');
    expect(JSON.stringify(result)).not.toContain('hidden');
  });

  test('所有连接失败时返回真实失败状态且不规划工具', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('connection refused'));
    const plan = jest.fn();
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'failed', context: '', sources: [], toolCount: 0, toolCalls: 0 });
    expect(plan).not.toHaveBeenCalled();
  });

  test('已连接但本轮无需工具时明确返回 skipped', async () => {
    queueDiscovery();
    const onStage = jest.fn();
    const result = await queryMCP([server], [], async () => '[]', new AbortController().signal, onStage);
    expect(result).toMatchObject({ status: 'skipped', context: '', sources: [], toolCount: 1, toolCalls: 0 });
    expect(onStage).toHaveBeenCalledWith('本轮无需调用扩展工具');
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test('查询成功但没有正文时不把工具名称当成参考资料', async () => {
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse({ content: [{ type: 'text', text: '  ' }], structuredContent: {} }));
    const plan = jest.fn().mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'empty', context: '', sources: [], toolCalls: 1, successfulCalls: 1, failedCalls: 0 });
    expect(plan.mock.calls[1][0].at(-1).content).toContain('未返回正文资料');
  });

  test.each([
    ['结构化空数组', { structuredContent: { success: true, data: [] }, content: [{ type: 'text', text: '查询完成' }] }],
    ['JSON 空数组', { content: [{ type: 'text', text: '[]' }] }],
    ['JSON 空包装', { content: [{ type: 'text', text: JSON.stringify({ success: true, data: [] }) }] }],
    ['JSON 分页空列表', { content: [{ type: 'text', text: JSON.stringify({ success: true, data: { authors: [], returnedCount: 0, page: 1, limit: 20, keyword: '作者', queryScope: '公开查询返回的样本' } }) }] }],
    ['嵌套空列表', { structuredContent: { results: { items: [], pagination: { page: 1, limit: 20 } }, total: 0 } }]
  ])('%s 不会被标记为匹配资料', async (_name, output) => {
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse(output));
    const plan = jest.fn().mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'empty', context: '', sources: [], toolCalls: 1, successfulCalls: 1, failedCalls: 0 });
  });

  test.each([
    ['零值统计', { structuredContent: { success: true, data: { total: 0 } } }],
    ['通用文字结果', { content: [{ type: 'text', text: JSON.stringify({ message: '第三方提供的具体回答' }) }] }],
    ['非 JSON 正文', { content: [{ type: 'text', text: '查询到的普通文本内容' }] }],
    ['通用状态结果', { structuredContent: { status: 'draft', items: [] } }],
    ['通用标题结果', { content: [{ type: 'text', text: JSON.stringify({ title: '公开资料标题' }) }] }],
    ['通用零值结果', { structuredContent: { value: 0 } }],
    ['通用布尔结果', { structuredContent: { value: false } }]
  ])('%s 仍然是有效工具资料', async (_name, output) => {
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse(output));
    const plan = jest.fn().mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result.status).toBe('completed');
    expect(result.context).not.toBe('');
  });

  test.each(['JSON', 'structuredContent'])('%s 作者主页使用 nickname 作为来源标题并保留 title 优先级', async format => {
    queueDiscovery();
    const payload = { success: true, data: { authors: [
      { nickname: '惊觉', url: 'https://blog.example.com/user/1' },
      { title: '作者主页', nickname: '另一位作者', url: 'https://blog.example.com/user/2' },
      { title: '  ', nickname: ' 空标题作者 ', url: 'https://blog.example.com/user/3' }
    ], returnedCount: 3 } };
    const output = format === 'JSON' ? { content: [{ type: 'text', text: JSON.stringify(payload) }] } : { structuredContent: payload };
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse(output));
    const plan = jest.fn().mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result.status).toBe('completed');
    expect(result.sources).toEqual([
      { title: '惊觉', url: 'https://blog.example.com/user/1' },
      { title: '作者主页', url: 'https://blog.example.com/user/2' },
      { title: '空标题作者', url: 'https://blog.example.com/user/3' }
    ]);
  });

  test('未标记 isError 的业务失败也不提交先前解析的来源', async () => {
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse({ content: [
      { type: 'text', text: JSON.stringify({ title: '失败响应的链接', url: 'https://blog.example.com/error' }) },
      { type: 'text', text: JSON.stringify({ success: false, message: '查询失败', data: [] }) }
    ] }));
    const plan = jest.fn().mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'failed', context: '', sources: [], toolCalls: 1, successfulCalls: 0, failedCalls: 1 });
  });

  test('工具错误文本和链接不进入最终参考资料', async () => {
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse({ isError: true, content: [{ type: 'text', text: '{"title":"错误页面","url":"https://internal.example/error"}' }] }));
    const plan = jest.fn().mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'failed', context: '', sources: [], toolCalls: 1, successfulCalls: 0, failedCalls: 1 });
    expect(JSON.stringify(plan.mock.calls[1][0])).not.toContain('internal.example');
  });

  test('部分工具失败时仍保留成功资料并分别统计', async () => {
    queueDiscovery();
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('tool request failed'))
      .mockResolvedValueOnce(rpcResponse({ content: [{ type: 'text', text: '另一项资料' }] }));
    const plan = jest.fn()
      .mockResolvedValueOnce('[{"tool":"mcp_0","arguments":{"keyword":"React"}},{"tool":"mcp_0","arguments":{"keyword":"Vue"}}]')
      .mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'completed', toolCalls: 2, successfulCalls: 1, failedCalls: 1 });
    expect(result.context).toContain('另一项资料');
    expect(result.context).not.toContain('tool request failed');
  });

  test('格式错误允许一次 AI 修正后继续查询', async () => {
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse({ content: [{ type: 'text', text: 'React 教程' }] }));
    const plan = jest.fn().mockResolvedValueOnce('我将查询相关文章。').mockResolvedValueOnce('```json\n' + toolPlan + '\n```').mockResolvedValueOnce('[]');
    const result = await queryMCP([server], [{ role: 'user', content: '找 React 文章' }], plan, new AbortController().signal, jest.fn());
    expect(result.status).toBe('completed');
    expect(plan).toHaveBeenCalledTimes(3);
    expect(plan.mock.calls[1][0].at(-1).content).toContain('上次工具选择格式无效');
    expect(plan.mock.calls[1][0][0]).toEqual({ role: 'user', content: '找 React 文章' });
  });

  test('整轮只修正一次，后续规划失败仍保留已经取得的资料', async () => {
    queueDiscovery();
    (global.fetch as jest.Mock).mockResolvedValueOnce(rpcResponse({ content: [{ type: 'text', text: '已查到的资料' }] }));
    const plan = jest.fn().mockResolvedValueOnce('无效格式').mockResolvedValueOnce(toolPlan).mockResolvedValueOnce('再次无效');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'failed', toolCalls: 1, successfulCalls: 1, failedCalls: 0 });
    expect(result.context).toContain('已查到的资料');
    expect(plan).toHaveBeenCalledTimes(3);
  });

  test('无可用工具的连接与连接失败保持区别', async () => {
    queueDiscovery([]);
    const plan = jest.fn();
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result).toMatchObject({ status: 'empty', toolCount: 0, toolCalls: 0 });
    expect(result.servers[0]).toMatchObject({ connected: true, toolCount: 0 });
    expect(plan).not.toHaveBeenCalled();
  });

  test('工具列表仍最多向规划模型暴露 32 项', async () => {
    queueDiscovery(Array.from({ length: 40 }, (_, index) => ({ name: `tool_${index}`, inputSchema: { type: 'object' } })));
    const plan = jest.fn().mockResolvedValue('[]');
    const result = await queryMCP([server], [], plan, new AbortController().signal, jest.fn());
    expect(result.toolCount).toBe(32);
    expect(plan.mock.calls[0][0].at(-1).content).toContain('mcp_31');
    expect(plan.mock.calls[0][0].at(-1).content).not.toContain('mcp_32');
  });

  test('探测已取消时不请求网络，规划时取消也不会继续回答', async () => {
    const cancelled = new AbortController();
    cancelled.abort();
    await expect(inspectMCPServers([server], cancelled.signal)).rejects.toMatchObject({ name: 'AbortError' });
    expect(global.fetch).not.toHaveBeenCalled();

    queueDiscovery();
    const active = new AbortController();
    const plan = jest.fn(async () => { active.abort(); return '[]'; });
    await expect(queryMCP([server], [], plan, active.signal, jest.fn())).rejects.toMatchObject({ name: 'AbortError' });
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(plan).toHaveBeenCalledTimes(1);
  });
});
