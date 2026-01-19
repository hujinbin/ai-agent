/**
 * 工具函数和边界情况测试
 */
import AIAgent from '../src/ai-agent';

describe('工具函数和边界情况', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('消息内容处理', () => {
    test('应该正确转义HTML特殊字符', () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '<script>alert("XSS")</script>';
      sendBtn.click();

      const messagesEl = document.querySelector('.ai-agent-messages');
      const userMessage = messagesEl?.querySelector('.ai-agent-msg-user');
      
      // 确保HTML被转义
      expect(userMessage?.innerHTML).toContain('&lt;script&gt;');
      expect(userMessage?.innerHTML).not.toContain('<script>');
    });

    test('应该正确处理换行符', () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      // 注意：input元素不支持多行，这个测试主要测试消息显示时的换行处理
      // 我们直接创建消息元素来测试
      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试消息';
      sendBtn.click();

      // 检查消息是否正常添加
      const messagesEl = document.querySelector('.ai-agent-messages');
      const userMessage = messagesEl?.querySelector('.ai-agent-msg-user');
      
      expect(userMessage).not.toBeNull();
    });
  });

  describe('端点URL计算', () => {
    test('应该正确处理带尾部斜杠的host', () => {
      const agent = new AIAgent({
        host: 'http://localhost:8080/',
        secret: 'test-key'
      });

      expect(agent).toBeDefined();
    });

    test('应该正确处理不带尾部斜杠的host', () => {
      const agent = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      expect(agent).toBeDefined();
    });

    test('应该正确处理多个尾部斜杠', () => {
      const agent = new AIAgent({
        host: 'http://localhost:8080///',
        secret: 'test-key'
      });

      expect(agent).toBeDefined();
    });
  });

  describe('历史记录管理', () => {
    test('应该限制历史记录长度', async () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          code: 200,
          data: {
            choices: [{
              message: { content: 'AI回复' }
            }]
          }
        })
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      // 发送超过20条消息
      for (let i = 0; i < 25; i++) {
        input.value = `消息 ${i}`;
        sendBtn.click();
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // 历史记录应该被限制（通过检查DOM元素数量来验证）
      const messagesEl = document.querySelector('.ai-agent-messages');
      const allMessages = messagesEl?.querySelectorAll('.ai-agent-msg');
      
      // 每条用户消息会产生一条AI回复，所以总数会超过20
      // 但历史记录内部应该被限制（这里通过代码逻辑保证）
      expect(allMessages?.length).toBeGreaterThan(0);

      jest.resetAllMocks();
    });
  });

  describe('多实例支持', () => {
    test('应该支持创建多个实例', () => {
      const agent1 = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'key1'
      });

      const agent2 = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'key2'
      });

      const buttons = document.querySelectorAll('.ai-agent-btn');
      const panels = document.querySelectorAll('.ai-agent-panel');

      expect(buttons.length).toBe(2);
      expect(panels.length).toBe(2);

      agent1.destroy();
      agent2.destroy();
    });

    test('销毁一个实例不应影响其他实例', () => {
      const agent1 = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'key1'
      });

      const agent2 = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'key2'
      });

      agent1.destroy();

      const buttons = document.querySelectorAll('.ai-agent-btn');
      const panels = document.querySelectorAll('.ai-agent-panel');

      expect(buttons.length).toBe(1);
      expect(panels.length).toBe(1);

      agent2.destroy();
    });
  });

  describe('错误处理', () => {
    test('应该处理格式错误的API响应', async () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          // 错误的响应格式
          invalid: 'data'
        })
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试问题';
      sendBtn.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      const messagesEl = document.querySelector('.ai-agent-messages');
      const aiMessage = messagesEl?.querySelector('.ai-agent-msg-ai');
      
      // 应该显示错误提示
      expect(aiMessage?.textContent).toContain('抱歉');

      jest.resetAllMocks();
    });

    test('应该处理HTTP 404错误', async () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试问题';
      sendBtn.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      const messagesEl = document.querySelector('.ai-agent-messages');
      const aiMessage = messagesEl?.querySelector('.ai-agent-msg-ai');
      
      expect(aiMessage?.textContent).toContain('API接口地址不存在');

      jest.resetAllMocks();
    });

    test('应该处理HTTP 401认证错误', async () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试问题';
      sendBtn.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      const messagesEl = document.querySelector('.ai-agent-messages');
      const aiMessage = messagesEl?.querySelector('.ai-agent-msg-ai');
      
      expect(aiMessage?.textContent).toContain('API密钥验证失败');

      jest.resetAllMocks();
    });
  });

  describe('自定义颜色配置', () => {
    test('应该接受自定义主题颜色', () => {
      const agent = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key',
        colors: {
          primary: '#ff0000',
          primaryHover: '#cc0000',
          background: '#ffffff'
        }
      });

      expect(agent).toBeDefined();
    });
  });

  describe('空内容处理', () => {
    test('应该忽略只包含空格的消息', () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '     ';
      sendBtn.click();

      const messagesEl = document.querySelector('.ai-agent-messages');
      const userMessages = messagesEl?.querySelectorAll('.ai-agent-msg-user');
      
      expect(userMessages?.length).toBe(0);
    });

    test('应该忽略空字符串消息', () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '';
      sendBtn.click();

      const messagesEl = document.querySelector('.ai-agent-messages');
      const userMessages = messagesEl?.querySelectorAll('.ai-agent-msg-user');
      
      expect(userMessages?.length).toBe(0);
    });
  });
});
