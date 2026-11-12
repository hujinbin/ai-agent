import AIAgent from '../src/ai-agent';
import * as mcp from '../src/mcp';
import { streamFixture, tick } from './streamFixture';

const config = { id: 'articles', name: '文章库', url: 'https://mcp.example.com/mcp' };
const connection = { id: 'articles', name: '文章库', connected: true, toolCount: 9 };
const reply = () => streamFixture([`event: message\ndata: ${JSON.stringify({ content: '## 作者\n\n**惊觉**' })}\n\nevent: done\ndata: {}\n\n`]).response;
const result = (overrides: Partial<mcp.MCPQueryResult> = {}): mcp.MCPQueryResult => ({
  context: '', sources: [], status: 'skipped', toolCount: 9, toolCalls: 0,
  successfulCalls: 0, failedCalls: 0, servers: [connection], ...overrides
});

describe('MCP 连接状态与回复', () => {
  let agent: AIAgent | undefined;
  beforeEach(() => { document.body.innerHTML = ''; (global.fetch as jest.Mock).mockReset(); });
  afterEach(() => { agent?.destroy(); jest.restoreAllMocks(); });

  test('显式开启却未传服务时给出提示，并将未查询事实传给最终回复', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(reply());
    agent = new AIAgent({ host: 'http://localhost:8080', stream: false, search: false, usingContext: false, mcp: true });
    expect(document.querySelector('.ai-agent-extension-label')?.textContent).toBe('站内资料尚未启用');
    agent.sendMessage('社区有什么作者？');
    await tick();
    const messages = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body).messages;
    expect(messages.at(-1).content).toContain('本轮未查询 MCP');
    expect(document.querySelector('.ai-agent-context-notice')?.textContent).toContain('未查询站内资料');
  });

  test('取消所有资料服务时，兼容模式同样传递未查询事实', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(reply());
    agent = new AIAgent({ host: 'http://localhost:8080', stream: false, search: false, usingContext: false, mcpServers: [config] });
    (document.querySelector('.ai-agent-mcp option') as HTMLOptionElement).selected = false;
    agent.sendMessage('社区有什么作者？');
    await tick();
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain('/chat/stream');
    expect(document.querySelector('.ai-agent-context-notice')?.textContent).toContain('未选择资料服务');
    expect(JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body).messages.at(-1).content).toContain('本轮未查询 MCP');
  });

  test('打开面板检查连接，失败可重试，单个服务不显示选择列表', async () => {
    const inspect = jest.spyOn(mcp, 'inspectMCPServers')
      .mockResolvedValueOnce([{ ...connection, connected: false, toolCount: 0 }])
      .mockResolvedValueOnce([connection]);
    agent = new AIAgent({ host: 'http://localhost:8080', mcpServers: [config] });
    agent.togglePanel();
    await tick();
    expect(document.querySelector('.ai-agent-extension-status')?.getAttribute('data-state')).toBe('error');
    expect((document.querySelector('.ai-agent-mcp') as HTMLSelectElement).hidden).toBe(true);
    (document.querySelector('.ai-agent-extension-retry') as HTMLButtonElement).click();
    await tick();
    expect(inspect).toHaveBeenCalledTimes(2);
    expect(document.querySelector('.ai-agent-extension-label')?.textContent).toBe('文章库已连接');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('工具查询失败仍继续回复，不能作为正常的站内查无结果', async () => {
    jest.spyOn(mcp, 'queryMCP').mockResolvedValueOnce(result({ status: 'failed', toolCalls: 1, failedCalls: 1 }));
    (global.fetch as jest.Mock).mockResolvedValueOnce(reply());
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true, mcpServers: [config] });
    agent.sendMessage('社区有什么作者？');
    await tick();
    expect(document.querySelector('.ai-agent-context-notice')?.textContent).toContain('未成功');
    const messages = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body).messages;
    expect(messages.at(-1).content).toContain('不得由此推断网站没有相关作者');
    expect(document.querySelector('.ai-agent-msg-ai h2')?.textContent).toBe('作者');
    expect(document.querySelector('.ai-agent-request-error')).toBeNull();
  });

  test('站内来源独立于联网来源，用户消息中的 HTML 保持文本', async () => {
    jest.spyOn(mcp, 'queryMCP').mockResolvedValueOnce(result({ status: 'completed', toolCalls: 1, successfulCalls: 1,
      context: '推荐作者样本：惊觉', sources: [{ title: '惊觉', url: 'https://example.com/user/1' }] }));
    (global.fetch as jest.Mock).mockResolvedValueOnce(streamFixture([
      'event: search\ndata: {"sources":[{"title":"网页","url":"https://example.org"}]}\n\nevent: message\ndata: {"content":"**作者介绍**"}\n\nevent: done\ndata: {}\n\n'
    ]).response);
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true, mcpServers: [config] });
    agent.sendMessage('<img src=x onerror=alert(1)>');
    await tick();
    const summaries = Array.from(document.querySelectorAll('.ai-agent-sources-title')).map(el => el.textContent);
    expect(summaries).toEqual(['参考来源 · 1', '资料服务来源 · 1']);
    expect(document.querySelector('.ai-agent-msg-user img')).toBeNull();
    expect(document.querySelector('.ai-agent-msg-user')?.textContent).toContain('<img');
    expect(document.querySelector('.ai-agent-mcp-sources a')?.getAttribute('target')).toBe('_blank');
    expect(document.querySelector('.ai-agent-msg-ai strong')?.textContent).toBe('作者介绍');
  });

  test('开始对话取消未完成的探测，迟到的探测不得覆盖当前状态', async () => {
    let resolveProbe!: (statuses: mcp.MCPServerStatus[]) => void;
    const inspect = jest.spyOn(mcp, 'inspectMCPServers').mockImplementationOnce(() => new Promise(resolve => { resolveProbe = resolve; }));
    jest.spyOn(mcp, 'queryMCP').mockResolvedValueOnce(result());
    (global.fetch as jest.Mock).mockResolvedValueOnce(reply());
    agent = new AIAgent({ host: 'http://localhost:8080', stream: true, mcpServers: [config] });
    agent.togglePanel();
    agent.sendMessage('你好');
    await tick();
    expect(inspect.mock.calls[0][1].aborted).toBe(true);
    resolveProbe([{ ...connection, connected: false, toolCount: 0 }]);
    await tick();
    expect(document.querySelector('.ai-agent-extension-label')?.textContent).toBe('文章库已连接');
    expect(document.querySelector('.ai-agent-context-notice')?.textContent).toBe('本轮未使用资料服务。');
    expect((document.querySelector('.ai-agent-context-notice') as HTMLElement).hidden).toBe(false);
  });
});
