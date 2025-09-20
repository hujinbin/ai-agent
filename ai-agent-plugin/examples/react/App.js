import React, { useState, useEffect } from 'react';
import './App.css';

// 在实际项目中可以通过 import 导入
// import AIAgent from 'ai-agent-plugin';
// 这里我们假设通过 <script> 标签全局引入

function App() {
  const [config, setConfig] = useState({
    theme: 'dark',
    position: 'bottom-right',
    title: 'React AI 助手',
    placeholder: '请输入您的问题...'
  });
  
  const [agent, setAgent] = useState(null);
  
  useEffect(() => {
    // 在组件挂载时创建 AI Agent 实例
    createAgent();
    
    // 组件卸载时清理
    return () => {
      if (agent) agent.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const createAgent = () => {
    if (window.AIAgent) {
      // 创建 AI Agent 实例
      const aiAgent = new window.AIAgent({
        apiUrl: '/api/mock/chat',
        ...config
      });
      
      setAgent(aiAgent);
      
      // 添加一个模拟API响应的拦截器（仅用于演示）
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (url === '/api/mock/chat') {
          return new Promise((resolve) => {
            setTimeout(() => {
              const data = JSON.parse(options.body);
              let response;
              
              if (data.message.toLowerCase().includes('你好') || 
                  data.message.toLowerCase().includes('hi') || 
                  data.message.toLowerCase().includes('hello')) {
                response = { reply: '你好！我是AI助手，有什么可以帮到你的吗？' };
              } else if (data.message.toLowerCase().includes('react')) {
                response = { reply: 'React 是一个流行的 JavaScript 前端框架，由 Facebook 开发。它使用组件化的方式构建用户界面，具有高效的虚拟 DOM 和单向数据流等特点。' };
              } else {
                response = { reply: '我理解您的问题了。这是一个示例回复，在实际项目中，这里会返回真实的AI响应。' };
              }
              
              resolve({
                ok: true,
                json: () => Promise.resolve(response)
              });
            }, 1000); // 模拟网络延迟
          });
        }
        return originalFetch(url, options);
      };
    } else {
      console.error('AIAgent 插件未找到，请确保正确引入了 ai-agent.js 文件');
    }
  };
  
  const handleApplyConfig = () => {
    if (agent) agent.destroy();
    createAgent();
  };
  
  const handleDestroyAgent = () => {
    if (agent) {
      agent.destroy();
      setAgent(null);
    }
  };
  
  const handleRecreateAgent = () => {
    if (agent) agent.destroy();
    createAgent();
  };
  
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: value
    });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Agent - React 示例</h1>
      </header>
      
      <main>
        <div className="config-section">
          <h2>配置选项</h2>
          
          <div className="form-group">
            <label>主题：</label>
            <select 
              name="theme" 
              value={config.theme}
              onChange={handleConfigChange}
            >
              <option value="light">浅色</option>
              <option value="dark">深色</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>位置：</label>
            <select 
              name="position" 
              value={config.position}
              onChange={handleConfigChange}
            >
              <option value="bottom-right">右下角</option>
              <option value="bottom-left">左下角</option>
              <option value="top-right">右上角</option>
              <option value="top-left">左上角</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>标题：</label>
            <input 
              type="text" 
              name="title"
              value={config.title}
              onChange={handleConfigChange}
            />
          </div>
          
          <div className="form-group">
            <label>输入框占位文本：</label>
            <input 
              type="text" 
              name="placeholder"
              value={config.placeholder}
              onChange={handleConfigChange}
            />
          </div>
          
          <button className="button" onClick={handleApplyConfig}>
            应用配置
          </button>
        </div>
        
        <div className="code-section">
          <h2>代码示例</h2>
          <pre>
{`import React, { useEffect } from 'react';
import AIAgent from 'ai-agent-plugin';

function App() {
  useEffect(() => {
    // 初始化 AI Agent
    const aiAgent = new AIAgent({
      apiUrl: '/api/ai/chat',
      theme: '${config.theme}',
      title: '${config.title}',
      position: '${config.position}'
    });
    
    // 组件卸载时销毁插件
    return () => aiAgent.destroy();
  }, []);

  return <div>React 项目</div>;
}`}
          </pre>
        </div>
        
        <div className="actions">
          <button className="button" onClick={handleDestroyAgent}>
            销毁插件
          </button>
          <button className="button" onClick={handleRecreateAgent}>
            重新创建插件
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;