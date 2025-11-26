/**
 * AIAgent - 跨框架通用的AI对话助手插件
 * 支持Vue、React、jQuery等多种框架
 * 采用TypeScript + UMD模块化规范实现
 */

// 样式隔离
import './styles/ai-agent.css';

// 导入类型定义
import { AIAgentOptions, ChatMessage, ApiResponse, PositionStyles, PositionStyleKey } from './types';

/**
 * AIAgent类 - 插件的主类
 */
class AIAgent {
  /**
   * 配置选项
   */
  private options: Required<AIAgentOptions>;
  // 默认后端 host，用于在未配置时自动使用
  private static DEFAULT_HOST = 'http://localhost:8080';
  // 计算好的端点
  private endpoints: {
    completion: string;
    stream: string;
    streamSimple: string;
    streamConfig: string;
    session: string;
    platforms: string;
    fileExtraction: string;
  };
  
  /**
   * 对话历史记录
   */
  private chatHistory: ChatMessage[] = [];
  
  /**
   * 面板是否展开
   */
  private isOpen: boolean = false;
  
  /**
   * 对话面板DOM元素
   */
  private panelEl: HTMLDivElement | null = null;
  
  /**
   * 触发按钮DOM元素
   */
  private buttonEl: HTMLButtonElement | null = null;

  /**
   * 创建AIAgent实例
   * @param options 配置选项
   */
  constructor(options: AIAgentOptions = {}) {
    // 验证必填参数（仅当用户提供了远程 host 时才强制校验 secret）
    const providedHost = options.host && options.host.trim() !== '';
    const host = providedHost ? options.host!.trim().replace(/\/+$/, '') : '';
    const isLocalLike = host.includes('localhost') || host.includes('127.0.0.1') || !providedHost;
    if (!options.secret && !isLocalLike) {
      throw new Error('AI Agent: secret 参数为必填项，请提供 API 密钥');
    }

    // 默认配置 + 用户自定义配置
    this.options = {
      host: host || '', // 后端站点域名/基础地址，可选
      secret: options.secret || 'demo-key',     // API 密钥（演示模式使用默认值）
      stream: options.stream || false,          // 是否启用流式响应
      theme: options.theme || 'light',          // 主题：light / dark
      position: options.position || 'bottom-right', // 位置：bottom-left/right, top-left/right
      placeholder: options.placeholder || '请输入问题...',
      title: options.title || 'AI 助手',
      ...options
    };
    // 计算端点：基于 host 来拼接标准路由 /ai/chat/completion 或 /ai/chat/stream
    const baseHost = (this.options.host && this.options.host !== '') ? this.options.host : AIAgent.DEFAULT_HOST;
    const hostNormalize = (p: string) => baseHost.replace(/\/+$/, '') + '/' + p.replace(/^\/+/, '');
    const chatBase = hostNormalize('api/ai/chat');
    this.endpoints = {
      completion: chatBase + '/completion',
      stream: chatBase + '/stream',
      streamSimple: chatBase + '/stream-simple',
      streamConfig: chatBase + '/stream-config',
      session: hostNormalize('api/ai/session'),
      platforms: hostNormalize('api/ai/platforms'),
      fileExtraction: hostNormalize('api/ai/file/extraction')
    };

    this.init(); // 初始化插件
  }

  /**
   * 初始化插件
   * 创建界面、绑定事件
   */
  private init(): void {
    this.createTriggerButton();
    this.createChatPanel();
    this.injectStyles();
    document.body.appendChild(this.buttonEl!);
  }

  /**
   * 创建悬浮触发按钮
   */
  private createTriggerButton(): void {
    this.buttonEl = document.createElement('button');
    this.buttonEl.className = 'ai-agent-btn';
    
    // 设置按钮的位置
    const positionStyles: PositionStyles = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
    };
    
    const position = positionStyles[this.options.position as PositionStyleKey] || positionStyles['bottom-right'];
    Object.assign(this.buttonEl.style, position);
    
    this.buttonEl.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="ai-agent-btn-text">${this.options.title}</span>
    `;
    this.buttonEl.addEventListener('click', () => this.togglePanel());
  }

  /**
   * 创建对话面板
   */
  private createChatPanel(): void {
    this.panelEl = document.createElement('div');
    this.panelEl.className = `ai-agent-panel ai-agent-theme-${this.options.theme} ai-agent-pos-${this.options.position}`;
    this.panelEl.style.display = 'none';
    this.panelEl.innerHTML = `
      <div class="ai-agent-panel-header">
        <h3>${this.options.title}</h3>
        <button class="ai-agent-close">&times;</button>
      </div>
      <div class="ai-agent-messages"></div>
      <div class="ai-agent-input-wrap">
        <input type="text" placeholder="${this.options.placeholder}" class="ai-agent-input" />
        <button class="ai-agent-send">发送</button>
      </div>
    `;
    
    // 绑定关闭按钮事件
    const closeBtn = this.panelEl.querySelector('.ai-agent-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closePanel());
    }
    
    // 绑定输入/发送事件
    const input = this.panelEl.querySelector('.ai-agent-input') as HTMLInputElement;
    const sendBtn = this.panelEl.querySelector('.ai-agent-send');
    if (input && sendBtn) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          this.sendMessage(input.value);
        }
      });
      
      sendBtn.addEventListener('click', () => {
        if (input.value.trim()) {
          this.sendMessage(input.value);
        }
      });
    }
    
    document.body.appendChild(this.panelEl);
  }

  /**
   * 注入样式（避免与宿主项目冲突）
   * 为了确保代码的模块化，样式已移至单独的CSS文件
   * 但此方法保留，便于动态注入特定样式
   */
  private injectStyles(): void {
    // 动态计算位置相关的样式
    const style = document.createElement('style');
    style.setAttribute('ai-agent-dynamic-styles', '');
    
    // 根据配置计算面板位置
    const positions: Record<PositionStyleKey, string> = {
      'bottom-right': 'bottom: 70px; right: 20px;',
      'bottom-left': 'bottom: 70px; left: 20px;',
      'top-right': 'top: 70px; right: 20px;',
      'top-left': 'top: 70px; left: 20px;',
    };
    
    // 设置按钮的位置
    const buttonPositions: Record<PositionStyleKey, string> = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;',
    };
    
    const position = this.options.position as PositionStyleKey;
    
    // 动态生成位置相关的样式
    style.textContent = `
      .ai-agent-panel.ai-agent-pos-${position} {
        ${positions[position] || positions['bottom-right']}
      }
      .ai-agent-btn {
        ${buttonPositions[position] || buttonPositions['bottom-right']}
      }
    `;
    
    document.head.appendChild(style);
  }

  /**
   * 切换面板显示/隐藏
   */
  public togglePanel(): void {
    this.isOpen = !this.isOpen;
    
    if (this.panelEl) {
      this.panelEl.style.display = this.isOpen ? 'flex' : 'none';
      
      if (this.isOpen) {
        const input = this.panelEl.querySelector('.ai-agent-input') as HTMLInputElement;
        if (input) {
          setTimeout(() => input.focus(), 300);
        }
      }
    }
  }

  /**
   * 关闭面板
   */
  public closePanel(): void {
    this.isOpen = false;
    if (this.panelEl) {
      this.panelEl.style.display = 'none';
    }
  }

  /**
   * 发送消息到后端 AI 接口
   * @param text 用户输入的消息文本
   */
  public sendMessage(text: string): void {
    if (!text.trim() || !this.panelEl) return;
    
    const input = this.panelEl.querySelector('.ai-agent-input') as HTMLInputElement;
    const messagesEl = this.panelEl.querySelector('.ai-agent-messages') as HTMLDivElement;
    
    if (!input || !messagesEl) return;
    
    // 添加用户消息到界面
    this.addMessage('user', text);
    messagesEl.appendChild(this.createMessageEl('user', text));
    input.value = '';
    messagesEl.scrollTop = messagesEl.scrollHeight;
    
    // 根据配置选择普通模式还是流式模式
    if (this.options.stream) {
      this.sendStreamMessage(text, messagesEl);
    } else {
      this.sendNormalMessage(text, messagesEl);
    }
  }

  /**
   * 发送普通模式消息
   * @param text 用户消息
   * @param messagesEl 消息容器
   */
  private sendNormalMessage(text: string, messagesEl: HTMLDivElement): void {
    // 显示加载中状态
    const loadingId = this.showLoading(messagesEl);
    
    // 计算最终 completion URL（优先使用 endpoints）
    const finalCompletionUrl = this.endpoints.completion;
    try { console.info('[AIAgent] 普通请求 URL ->', finalCompletionUrl); } catch (e) {}

    // 调用普通对话接口
    fetch(finalCompletionUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.options.secret}`
      },
      body: JSON.stringify({ content: text })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json() as Promise<ApiResponse>;
      })
      .then(data => {
        // 移除加载中状态
        this.removeLoading(loadingId);
        
        // 安全解析AI回复
        let reply = '';
        try {
          if (data && data.code === 200 && data.data?.choices?.length > 0) {
            reply = data.data.choices[0].message?.content || '';
          }
          
          if (!reply) {
            reply = '抱歉，AI暂时无法回复，请稍后再试～';
          }
        } catch (parseError) {
          console.warn('解析AI回复数据失败:', parseError);
          reply = '数据解析异常，请检查接口返回格式～';
        }
        
        // 添加AI回复到界面
        this.addMessage('ai', reply);
        messagesEl.appendChild(this.createMessageEl('ai', reply));
        messagesEl.scrollTop = messagesEl.scrollHeight;
      })
      .catch(err => {
        // 移除加载中状态
        this.removeLoading(loadingId);
        
        // 根据错误类型提供不同的提示
        let errorMessage = '网络异常，请稍后再试～';
        
        if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          errorMessage = '网络连接失败，请检查网络连接或API地址配置～';
        } else if (err.message.includes('HTTP 404')) {
          errorMessage = 'API接口地址不存在，请检查 host 配置～';
        } else if (err.message.includes('HTTP 401') || err.message.includes('HTTP 403')) {
          errorMessage = 'API密钥验证失败，请检查secret配置～';
        } else if (err.message.includes('HTTP 500')) {
          errorMessage = '服务器内部错误，请联系管理员～';
        }
        
        // 显示错误信息
        console.error('AI 接口调用失败：', err);
        this.addMessage('ai', errorMessage);
        messagesEl.appendChild(this.createMessageEl('ai', errorMessage));
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
  }

  /**
   * 发送流式模式消息
   * @param text 用户消息
   * @param messagesEl 消息容器
   */
  private sendStreamMessage(text: string, messagesEl: HTMLDivElement): void {
    // 创建AI消息容器
    const aiMessageEl = this.createMessageEl('ai', '');
    messagesEl.appendChild(aiMessageEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    
    const contentEl = aiMessageEl.querySelector('.ai-agent-msg-content') as HTMLElement;
    let fullContent = '';
    
    // 计算最终流式接口 URL：如果用户直接传入了完整的 stream URL（包含 '/stream'），优先使用
    const finalStreamUrl = this.endpoints.stream;
    // 打印调试信息，方便定位请求目标
    try { console.info('[AIAgent] 流式请求 URL ->', finalStreamUrl); } catch (e) {}

    // 调用流式对话接口
    try { console.info('[AIAgent] 将向流式接口发送 POST 请求，URL ->', finalStreamUrl); } catch (e) {}
    fetch(finalStreamUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.options.secret}`
      },
      body: JSON.stringify({ content: text })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('API响应异常: ' + response.status);
        }
        
        // 检查是否为流式响应
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('text/event-stream')) {
          throw new Error('不是流式响应格式');
        }
        
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('无法获取响应流');
        }
        
        const decoder = new TextDecoder();
        
        // 递归读取流式数据
        const readStream = (): Promise<void> => {
          return reader.read().then(({ done, value }) => {
            if (done) {
              // 流结束，保存完整内容到历史
              this.addMessage('ai', fullContent);
              return;
            }
            
            // 解析SSE数据
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                
                if (data === '[DONE]') {
                  // 流结束
                  this.addMessage('ai', fullContent);
                  return;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.choices?.length > 0) {
                    const delta = parsed.choices[0].delta;
                    if (delta.content) {
                      fullContent += delta.content;
                      contentEl.textContent = fullContent;
                      messagesEl.scrollTop = messagesEl.scrollHeight;
                    }
                  }
                } catch (e) {
                  // 忽略解析错误，继续处理下一行
                  console.debug('SSE数据解析跳过:', data);
                }
              }
            }
            
            return readStream();
          });
        };
        
        return readStream();
      })
      .catch(err => {
        console.error('流式接口调用失败：', err);
        
        // 根据错误类型提供不同的提示
        let errorMessage = '流式接口异常，请稍后再试～';
        
        if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
          errorMessage = '网络连接失败，请检查网络连接或API地址配置～';
        } else if (err.message.includes('不是流式响应格式')) {
          errorMessage = '服务器不支持流式响应，请尝试关闭stream选项～';
        } else if (err.message.includes('无法获取响应流')) {
          errorMessage = '流式数据读取失败，请检查浏览器兼容性～';
        }
        
        contentEl.textContent = errorMessage;
        this.addMessage('ai', errorMessage);
      });
  }

  /**
   * 显示加载中状态
   * @param messagesEl 消息容器元素
   * @returns 加载状态的唯一ID
   */
  private showLoading(messagesEl: HTMLDivElement): string {
    const loadingId = 'loading-' + Date.now();
    const loadingEl = document.createElement('div');
    loadingEl.className = 'ai-agent-msg ai-agent-msg-ai ai-agent-loading';
    loadingEl.id = loadingId;
    loadingEl.innerHTML = `
      <div class="ai-agent-msg-content">
        <div class="ai-agent-loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesEl.appendChild(loadingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return loadingId;
  }

  /**
   * 移除加载中状态
   * @param loadingId 加载状态的唯一ID
   */
  private removeLoading(loadingId: string): void {
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
  }

  /**
   * 添加消息到历史记录
   * @param role 角色：'user' 或 'ai'
   * @param content 消息内容
   */
  private addMessage(role: 'user' | 'ai', content: string): void {
    this.chatHistory.push({ role, content });
    if (this.chatHistory.length > 20) this.chatHistory.shift(); // 限制历史长度
  }

  /**
   * 创建消息 DOM 元素
   * @param role 角色：'user' 或 'ai'
   * @param content 消息内容
   * @returns 消息DOM元素
   */
  private createMessageEl(role: 'user' | 'ai', content: string): HTMLDivElement {
    const msgEl = document.createElement('div');
    msgEl.className = `ai-agent-msg ai-agent-msg-${role}`;
    
    // 转换换行为 <br>，并处理HTML转义
    const formattedContent = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    
    msgEl.innerHTML = `<div class="ai-agent-msg-content">${formattedContent}</div>`;
    return msgEl;
  }

  /**
   * 销毁插件（清理 DOM 和事件）
   */
  public destroy(): void {
    // 移除悬浮按钮
    if (this.buttonEl && this.buttonEl.parentNode) {
      this.buttonEl.parentNode.removeChild(this.buttonEl);
      this.buttonEl = null;
    }
    
    // 移除对话面板
    if (this.panelEl && this.panelEl.parentNode) {
      this.panelEl.parentNode.removeChild(this.panelEl);
      this.panelEl = null;
    }
    
    // 移除动态注入的样式
    const style = document.querySelector('style[ai-agent-dynamic-styles]');
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
    
    // 清空对话历史
    this.chatHistory = [];
  }
}

// 导出为默认模块
export default AIAgent;