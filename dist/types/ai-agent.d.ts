/**
 * AIAgent - 跨框架通用的AI对话助手插件
 * 支持Vue、React、jQuery等多种框架
 * 采用TypeScript + UMD模块化规范实现
 */
import './styles/ai-agent.css';
import { AIAgentOptions } from './types';
/**
 * AIAgent类 - 插件的主类
 */
declare class AIAgent {
    /**
     * 配置选项
     */
    private options;
    /**
     * 对话历史记录
     */
    private chatHistory;
    /**
     * 面板是否展开
     */
    private isOpen;
    /**
     * 对话面板DOM元素
     */
    private panelEl;
    /**
     * 触发按钮DOM元素
     */
    private buttonEl;
    /**
     * 创建AIAgent实例
     * @param options 配置选项
     */
    constructor(options?: AIAgentOptions);
    /**
     * 初始化插件
     * 创建界面、绑定事件
     */
    private init;
    /**
     * 创建悬浮触发按钮
     */
    private createTriggerButton;
    /**
     * 创建对话面板
     */
    private createChatPanel;
    /**
     * 注入样式（避免与宿主项目冲突）
     * 为了确保代码的模块化，样式已移至单独的CSS文件
     * 但此方法保留，便于动态注入特定样式
     */
    private injectStyles;
    /**
     * 切换面板显示/隐藏
     */
    togglePanel(): void;
    /**
     * 关闭面板
     */
    closePanel(): void;
    /**
     * 发送消息到后端 AI 接口
     * @param text 用户输入的消息文本
     */
    sendMessage(text: string): void;
    /**
     * 显示加载中状态
     * @param messagesEl 消息容器元素
     * @returns 加载状态的唯一ID
     */
    private showLoading;
    /**
     * 移除加载中状态
     * @param loadingId 加载状态的唯一ID
     */
    private removeLoading;
    /**
     * 添加消息到历史记录
     * @param role 角色：'user' 或 'ai'
     * @param content 消息内容
     */
    private addMessage;
    /**
     * 创建消息 DOM 元素
     * @param role 角色：'user' 或 'ai'
     * @param content 消息内容
     * @returns 消息DOM元素
     */
    private createMessageEl;
    /**
     * 销毁插件（清理 DOM 和事件）
     */
    destroy(): void;
}
export default AIAgent;
