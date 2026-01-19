/**
 * 类型定义单元测试
 */
import { AIAgentOptions, ChatMessage } from '../src/types';

describe('Types', () => {
  describe('AIAgentOptions', () => {
    test('应该接受所有可选配置', () => {
      const options: AIAgentOptions = {
        host: 'http://localhost:8080',
        secret: 'test-key',
        stream: true,
        theme: 'dark',
        position: 'top-left',
        title: '测试标题',
        placeholder: '请输入',
        colors: {
          primary: '#ff0000',
          primaryHover: '#cc0000',
          background: '#ffffff'
        }
      };

      expect(options.host).toBe('http://localhost:8080');
      expect(options.secret).toBe('test-key');
      expect(options.stream).toBe(true);
      expect(options.theme).toBe('dark');
      expect(options.position).toBe('top-left');
    });

    test('应该接受最小配置', () => {
      const options: AIAgentOptions = {};
      
      expect(options).toBeDefined();
    });
  });

  describe('ChatMessage', () => {
    test('应该正确表示用户消息', () => {
      const message: ChatMessage = {
        role: 'user',
        content: '用户消息内容'
      };

      expect(message.role).toBe('user');
      expect(message.content).toBe('用户消息内容');
    });

    test('应该正确表示AI消息', () => {
      const message: ChatMessage = {
        role: 'ai',
        content: 'AI回复内容'
      };

      expect(message.role).toBe('ai');
      expect(message.content).toBe('AI回复内容');
    });
  });
});
