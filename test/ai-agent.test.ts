/**
 * AIAgent 核心功能单元测试
 */
import AIAgent from '../src/ai-agent';
import { AIAgentOptions } from '../src/types';

describe('AIAgent', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 在每个测试之前创建一个干净的DOM容器
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理DOM
    document.body.innerHTML = '';
  });

  describe('初始化', () => {
    test('应该成功创建AIAgent实例（本地模式）', () => {
      const agent = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      expect(agent).toBeInstanceOf(AIAgent);
    });

    test('应该在远程模式下要求提供secret', () => {
      expect(() => {
        new AIAgent({
          host: 'https://api.example.com'
          // 没有提供secret
        });
      }).toThrow('secret 参数为必填项');
    });

    test('应该允许本地模式不提供secret', () => {
      const agent = new AIAgent({
        host: 'http://localhost:8080'
      });

      expect(agent).toBeInstanceOf(AIAgent);
    });

    test('应该使用默认配置', () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      // 检查按钮和面板是否创建
      const button = document.querySelector('.ai-agent-btn');
      const panel = document.querySelector('.ai-agent-panel');

      expect(button).not.toBeNull();
      expect(panel).not.toBeNull();
    });

    test('应该应用自定义配置', () => {
      const customOptions: AIAgentOptions = {
        host: 'http://localhost:8080',
        secret: 'test-key',
        theme: 'dark',
        position: 'top-left',
        title: '自定义标题',
        placeholder: '请输入...'
      };

      new AIAgent(customOptions);

      const panel = document.querySelector('.ai-agent-panel');
      expect(panel?.classList.contains('ai-agent-theme-dark')).toBe(true);
      expect(panel?.classList.contains('ai-agent-pos-top-left')).toBe(true);

      const header = document.querySelector('.ai-agent-panel-header h3');
      expect(header?.textContent).toBe('自定义标题');

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      expect(input?.placeholder).toBe('请输入...');
    });
  });

  describe('UI交互', () => {
    beforeEach(() => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });
    });

    test('点击按钮应该打开面板', () => {
      const button = document.querySelector('.ai-agent-btn') as HTMLButtonElement;
      const panel = document.querySelector('.ai-agent-panel') as HTMLDivElement;

      expect(panel.style.display).toBe('none');

      button.click();

      expect(panel.style.display).toBe('block');
    });

    test('点击关闭按钮应该关闭面板', () => {
      const button = document.querySelector('.ai-agent-btn') as HTMLButtonElement;
      const panel = document.querySelector('.ai-agent-panel') as HTMLDivElement;
      const closeBtn = document.querySelector('.ai-agent-close') as HTMLButtonElement;

      // 先打开面板
      button.click();
      expect(panel.style.display).toBe('block');

      // 点击关闭
      closeBtn.click();
      expect(panel.style.display).toBe('none');
    });

    test('再次点击按钮应该关闭已打开的面板', () => {
      const button = document.querySelector('.ai-agent-btn') as HTMLButtonElement;
      const panel = document.querySelector('.ai-agent-panel') as HTMLDivElement;

      // 第一次点击打开
      button.click();
      expect(panel.style.display).toBe('block');

      // 第二次点击关闭
      button.click();
      expect(panel.style.display).toBe('none');
    });
  });

  describe('消息发送', () => {
    beforeEach(() => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      // 模拟fetch
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('应该在输入框按Enter时发送消息', () => {
      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const messagesEl = document.querySelector('.ai-agent-messages');

      input.value = '测试消息';
      
      // 模拟按下Enter键
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      input.dispatchEvent(event);

      // 检查消息是否添加到界面
      const userMessage = messagesEl?.querySelector('.ai-agent-msg-user');
      expect(userMessage).not.toBeNull();
      expect(userMessage?.textContent).toContain('测试消息');
    });

    test('应该在点击发送按钮时发送消息', () => {
      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;
      const messagesEl = document.querySelector('.ai-agent-messages');

      input.value = '测试消息';
      sendBtn.click();

      // 检查消息是否添加到界面
      const userMessage = messagesEl?.querySelector('.ai-agent-msg-user');
      expect(userMessage).not.toBeNull();
      expect(userMessage?.textContent).toContain('测试消息');
    });

    test('应该忽略空消息', () => {
      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;
      const messagesEl = document.querySelector('.ai-agent-messages');

      input.value = '   '; // 只有空格
      sendBtn.click();

      // 不应该添加消息
      const userMessages = messagesEl?.querySelectorAll('.ai-agent-msg-user');
      expect(userMessages?.length).toBe(0);
    });

    test('发送消息后应该清空输入框', () => {
      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试消息';
      sendBtn.click();

      expect(input.value).toBe('');
    });
  });

  describe('API调用 - 普通模式', () => {
    beforeEach(() => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key',
        stream: false
      });

      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('应该使用正确的参数调用API', async () => {
      const mockResponse = {
        code: 200,
        data: {
          choices: [
            {
              message: {
                content: 'AI回复内容'
              }
            }
          ]
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试问题';
      sendBtn.click();

      // 等待一小段时间让fetch完成
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/ai/chat/completion',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-key'
          }),
          body: JSON.stringify({ content: '测试问题' })
        })
      );
    });

    test('应该正确显示AI回复', async () => {
      const mockResponse = {
        code: 200,
        data: {
          choices: [
            {
              message: {
                content: 'AI回复内容'
              }
            }
          ]
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试问题';
      sendBtn.click();

      // 等待API响应
      await new Promise(resolve => setTimeout(resolve, 100));

      const messagesEl = document.querySelector('.ai-agent-messages');
      const aiMessage = messagesEl?.querySelector('.ai-agent-msg-ai');
      
      expect(aiMessage).not.toBeNull();
      expect(aiMessage?.textContent).toContain('AI回复内容');
    });

    test('应该处理API错误', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to fetch')
      );

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试问题';
      sendBtn.click();

      // 等待错误处理
      await new Promise(resolve => setTimeout(resolve, 100));

      const messagesEl = document.querySelector('.ai-agent-messages');
      const aiMessage = messagesEl?.querySelector('.ai-agent-msg-ai');
      
      expect(aiMessage).not.toBeNull();
      expect(aiMessage?.textContent).toContain('网络连接失败');
    });

    test('应该在发送时显示加载状态', () => {
      (global.fetch as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 1000))
      );

      const input = document.querySelector('.ai-agent-input') as HTMLInputElement;
      const sendBtn = document.querySelector('.ai-agent-send') as HTMLButtonElement;

      input.value = '测试问题';
      sendBtn.click();

      // 检查加载动画
      const loadingEl = document.querySelector('.ai-agent-loading');
      expect(loadingEl).not.toBeNull();
    });
  });

  describe('销毁', () => {
    test('应该正确清理所有DOM元素', () => {
      const agent = new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key'
      });

      // 确认元素存在
      expect(document.querySelector('.ai-agent-btn')).not.toBeNull();
      expect(document.querySelector('.ai-agent-panel')).not.toBeNull();

      // 销毁
      agent.destroy();

      // 确认元素已移除
      expect(document.querySelector('.ai-agent-btn')).toBeNull();
      expect(document.querySelector('.ai-agent-panel')).toBeNull();
    });
  });

  describe('位置配置', () => {
    const positions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const;

    positions.forEach(position => {
      test(`应该正确设置${position}位置`, () => {
        new AIAgent({
          host: 'http://localhost:8080',
          secret: 'test-key',
          position
        });

        const panel = document.querySelector('.ai-agent-panel');
        expect(panel?.classList.contains(`ai-agent-pos-${position}`)).toBe(true);
      });
    });
  });

  describe('主题配置', () => {
    test('应该正确应用light主题', () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key',
        theme: 'light'
      });

      const panel = document.querySelector('.ai-agent-panel');
      expect(panel?.classList.contains('ai-agent-theme-light')).toBe(true);
    });

    test('应该正确应用dark主题', () => {
      new AIAgent({
        host: 'http://localhost:8080',
        secret: 'test-key',
        theme: 'dark'
      });

      const panel = document.querySelector('.ai-agent-panel');
      expect(panel?.classList.contains('ai-agent-theme-dark')).toBe(true);
    });
  });
});
