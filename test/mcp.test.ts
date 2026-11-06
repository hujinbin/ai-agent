import { queryMCP, planWithAI } from '../src/mcp';
import { streamFixture } from './streamFixture';

const rpcResponse = (result: unknown) => ({
  ok: true, status: 200,
  headers: { get: (name: string) => name === 'Content-Type' ? 'application/json' : null },
  text: async () => JSON.stringify({ jsonrpc: '2.0', id: 1, result })
});

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
    const calls = (global.fetch as jest.Mock).mock.calls;
    expect(calls).toHaveLength(4);
    expect(calls.every(call => call[0] === 'https://mcp.example.com/mcp')).toBe(true);
    expect(calls[0][1].headers.Authorization).toBe('Bearer browser-token');
    expect(JSON.parse(calls[3][1].body).method).toBe('tools/call');
  });

  test('AI 规划只发送普通聊天参数', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(streamFixture(['event: message\ndata: {"content":"[]"}\n\nevent: done\ndata: {}\n\n']).response);
    const result = await planWithAI('/api/ai/chat/stream', [{ role: 'user', content: '查询' }], 'agnes-3.0-flash', 'site-token', new AbortController().signal);
    expect(result).toBe('[]');
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(Object.keys(body).sort()).toEqual(['messages', 'model', 'search']);
  });

  test('未知工具会在访问 MCP 前被拒绝', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(rpcResponse({ protocolVersion: '2025-03-26' }))
      .mockResolvedValueOnce({ ok: true, headers: { get: () => null } })
      .mockResolvedValueOnce(rpcResponse({ tools: [{ name: 'search_articles', inputSchema: {} }] }));
    await expect(queryMCP([{ id: 'articles', url: 'https://mcp.example.com/mcp' }], [], async () => '[{"tool":"mcp_99","arguments":{}}]', new AbortController().signal, jest.fn())).rejects.toThrow('无效');
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });
});
