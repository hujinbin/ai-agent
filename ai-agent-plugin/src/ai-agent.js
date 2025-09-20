/**
 * AIAgent - 跨框架通用的AI对话助手插件
 * 支持Vue、React、jQuery等多种框架
 * 采用原生JavaScript + UMD模块化规范实现
 */

// 样式隔离
import './styles/ai-agent.css';

/**
 * AIAgent类 - 插件的主类
 * @param {Object} options - 配置选项
 */
class AIAgent {
  constructor(options = {}) {
    // 默认配置 + 用户自定义配置
    this.options = {
      apiUrl: options.apiUrl || '/api/ai/chat', // 后端 AI 接口地址
      theme: options.theme || 'light',          // 主题：light / dark
      position: options.position || 'bottom-right', // 位置：bottom-left/right, top-left/right
      placeholder: options.placeholder || '请输入问题...',
      title: options.title || 'AI 助手',
      ...options
    };
    this.chatHistory = []; // 对话历史
    this.isOpen = false;   // 面板是否展开
    this.panelEl = null;   // 对话面板 DOM
    this.buttonEl = null;  // 触发按钮 DOM
    this.init(); // 初始化插件
  }

  /**
   * 初始化插件
   * 创建界面、绑定事件
   */
  init() {
    this.createTriggerButton();
    this.createChatPanel();
    this.injectStyles();
    document.body.appendChild(this.buttonEl);
  }

  /**
   * 创建悬浮触发按钮
   */
  createTriggerButton() {
    this.buttonEl = document.createElement('button');
    this.buttonEl.className = 'ai-agent-btn';
    // 设置按钮的位置
    const positionStyles = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
    };
    
    const position = positionStyles[this.options.position] || positionStyles['bottom-right'];
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
  createChatPanel() {
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
    closeBtn.addEventListener('click', () => this.closePanel());
    
    // 绑定输入/发送事件
    const input = this.panelEl.querySelector('.ai-agent-input');
    const sendBtn = this.panelEl.querySelector('.ai-agent-send');
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
    
    document.body.appendChild(this.panelEl);
  }

  /**
   * 注入样式（避免与宿主项目冲突）
   * 为了确保代码的模块化，样式已移至单独的CSS文件
   * 但此方法保留，便于动态注入特定样式
   */
  injectStyles() {
    // 动态计算位置相关的样式
    const style = document.createElement('style');
    style.setAttribute('ai-agent-dynamic-styles', '');
    
    // 根据配置计算面板位置
    const positions = {
      'bottom-right': 'bottom: 70px; right: 20px;',
      'bottom-left': 'bottom: 70px; left: 20px;',
      'top-right': 'top: 70px; right: 20px;',
      'top-left': 'top: 70px; left: 20px;',
    };
    
    // 设置按钮的位置
    const buttonPositions = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;',
    };
    
    // 动态生成位置相关的样式
    style.textContent = `
      .ai-agent-panel.ai-agent-pos-${this.options.position} {
        ${positions[this.options.position] || positions['bottom-right']}
      }
      .ai-agent-btn {
        ${buttonPositions[this.options.position] || buttonPositions['bottom-right']}
      }
    `;
    
    document.head.appendChild(style);
  }

  /**
   * 切换面板显示/隐藏
   */
  togglePanel() {
    this.isOpen = !this.isOpen;
    this.panelEl.style.display = this.isOpen ? 'flex' : 'none';
    if (this.isOpen) {
      setTimeout(() => this.panelEl.querySelector('.ai-agent-input').focus(), 300);
    }
  }

  /**
   * 关闭面板
   */
  closePanel() {
    this.isOpen = false;
    this.panelEl.style.display = 'none';
  }

  /**
   * 发送消息到后端 AI 接口
   * @param {string} text - 用户输入的消息文本
   */
  sendMessage(text) {
    if (!text.trim()) return;
    
    const input = this.panelEl.querySelector('.ai-agent-input');
    const messagesEl = this.panelEl.querySelector('.ai-agent-messages');
    
    // 添加用户消息到界面
    this.addMessage('user', text);
    messagesEl.appendChild(this.createMessageEl('user', text));
    input.value = '';
    messagesEl.scrollTop = messagesEl.scrollHeight;
    
    // 显示加载中状态
    const loadingId = this.showLoading(messagesEl);
    
    // 调用后端 API
    fetch(this.options.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: text, 
        history: this.chatHistory 
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('API响应异常: ' + res.status);
        }
        return res.json();
      })
      .then(data => {
        // 移除加载中状态
        this.removeLoading(loadingId);
        
        // 添加AI回复
        const reply = data.reply || '抱歉，无法获取回复～';
        this.addMessage('ai', reply);
        messagesEl.appendChild(this.createMessageEl('ai', reply));
        messagesEl.scrollTop = messagesEl.scrollHeight;
      })
      .catch(err => {
        // 移除加载中状态
        this.removeLoading(loadingId);
        
        // 显示错误信息
        console.error('AI 接口调用失败：', err);
        this.addMessage('ai', '接口异常，请稍后再试～');
        messagesEl.appendChild(this.createMessageEl('ai', '接口异常，请稍后再试～'));
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
  }

  /**
   * 显示加载中状态
   * @param {HTMLElement} messagesEl - 消息容器元素
   * @returns {string} 加载状态的唯一ID
   */
  showLoading(messagesEl) {
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
   * @param {string} loadingId - 加载状态的唯一ID
   */
  removeLoading(loadingId) {
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
  }

  /**
   * 添加消息到历史记录
   * @param {string} role - 角色：'user' 或 'ai'
   * @param {string} content - 消息内容
   */
  addMessage(role, content) {
    this.chatHistory.push({ role, content });
    if (this.chatHistory.length > 20) this.chatHistory.shift(); // 限制历史长度
  }

  /**
   * 创建消息 DOM 元素
   * @param {string} role - 角色：'user' 或 'ai'
   * @param {string} content - 消息内容
   * @returns {HTMLElement} 消息DOM元素
   */
  createMessageEl(role, content) {
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
  destroy() {
    // 移除悬浮按钮
    if (this.buttonEl && this.buttonEl.parentNode) {
      this.buttonEl.parentNode.removeChild(this.buttonEl);
    }
    
    // 移除对话面板
    if (this.panelEl && this.panelEl.parentNode) {
      this.panelEl.parentNode.removeChild(this.panelEl);
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