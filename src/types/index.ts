/**
 * AI Agent 插件的配置选项接口
 */
export interface AIAgentOptions {
  /**
   * 后端 AI 接口地址
   * @default '/api/ai/chat'
   */
  apiUrl?: string;
  
  /**
   * 主题：light / dark
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * 位置：bottom-left/right, top-left/right
   * @default 'bottom-right'
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  
  /**
   * 输入框占位文本
   * @default '请输入问题...'
   */
  placeholder?: string;
  
  /**
   * 面板标题
   * @default 'AI 助手'
   */
  title?: string;
  
  /**
   * 其他自定义选项
   */
  [key: string]: any;
}

/**
 * 聊天消息接口
 */
export interface ChatMessage {
  /**
   * 消息发送角色：'user' 或 'ai'
   */
  role: 'user' | 'ai';
  
  /**
   * 消息内容
   */
  content: string;
}

/**
 * API响应接口
 */
export interface ApiResponse {
  /**
   * AI回复内容
   */
  reply: string;
  
  /**
   * 其他可能的响应字段
   */
  [key: string]: any;
}

/**
 * 位置样式映射类型
 */
export type PositionStyleKey = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export type PositionStyles = {
  [key in PositionStyleKey]: {
    [cssProperty: string]: string;
  };
};