/**
 * AI Agent 插件的配置选项接口
 */
export interface AIAgentOptions {
  /**
   * 后端站点域名或基础地址，例如 https://example.com 或 http://localhost:8080
   * 插件会在该 host 下拼接 /ai/chat/completion 或 /ai/chat/stream
   * @default '' (使用内置本地回退)
   */
  host?: string;
  
  /**
   * API 密钥/令牌
   * @required true
   */
  secret?: string;
  
  /**
   * 是否启用流式响应
   * @default false
   */
  stream?: boolean;
  
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
 * API响应接口（普通模式）
 */
export interface ApiResponse {
  code: number;
  data: {
    choices: Array<{
      message: {
        content: string;
        role: string;
      };
    }>;
  };
  msg: string;
}

/**
 * 流式响应数据块接口
 */
export interface StreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason?: string;
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }>;
}

/**
 * 流式请求体接口
 */
export interface StreamRequest {
  messages: ChatMessage[];
}

/**
 * 简单请求体接口
 */
export interface SimpleRequest {
  content: string;
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