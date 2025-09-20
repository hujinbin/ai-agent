<template>
  <div class="vue-app">
    <header class="app-header">
      <h1>AI Agent - Vue 示例</h1>
    </header>
    
    <main>
      <div class="config-section">
        <h2>配置选项</h2>
        
        <div class="form-group">
          <label>主题：</label>
          <select v-model="config.theme">
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>位置：</label>
          <select v-model="config.position">
            <option value="bottom-right">右下角</option>
            <option value="bottom-left">左下角</option>
            <option value="top-right">右上角</option>
            <option value="top-left">左上角</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>标题：</label>
          <input 
            type="text" 
            v-model="config.title"
          />
        </div>
        
        <div class="form-group">
          <label>输入框占位文本：</label>
          <input 
            type="text" 
            v-model="config.placeholder"
          />
        </div>
        
        <button class="button" @click="applyConfig">
          应用配置
        </button>
      </div>
      
      <div class="code-section">
        <h2>代码示例</h2>
        <pre>
<code>{{vueCode}}</code>
        </pre>
      </div>
      
      <div class="actions">
        <button class="button" @click="destroyAgent">
          销毁插件
        </button>
        <button class="button" @click="recreateAgent">
          重新创建插件
        </button>
      </div>
    </main>
  </div>
</template>

<script>
// 在实际项目中可以通过 import 导入
// import AIAgent from 'ai-agent-plugin';
// 这里我们假设通过 <script> 标签全局引入

export default {
  name: 'App',
  data() {
    return {
      config: {
        theme: 'light',
        position: 'bottom-left',
        title: 'Vue AI 助手',
        placeholder: '请输入您的问题...'
      },
      aiAgent: null
    };
  },
  computed: {
    vueCode() {
      return `<template>
  <div>Vue 项目</div>
</template>

<script>
import AIAgent from 'ai-agent-plugin';
// 或通过 script 标签引入后，使用全局变量 window.AIAgent

export default {
  mounted() {
    // 初始化 AI Agent
    this.aiAgent = new AIAgent({
      apiUrl: '/api/ai/chat',
      theme: '${this.config.theme}',
      title: '${this.config.title}',
      position: '${this.config.position}'
    });
  },
  beforeDestroy() {
    // 组件销毁前清理插件
    if (this.aiAgent) this.aiAgent.destroy();
  }
};
<\/script>`;
    }
  },
  mounted() {
    this.createAgent();
  },
  beforeDestroy() {
    if (this.aiAgent) this.aiAgent.destroy();
  },
  methods: {
    createAgent() {
      if (window.AIAgent) {
        // 创建 AI Agent 实例
        this.aiAgent = new window.AIAgent({
          apiUrl: '/api/mock/chat',
          ...this.config
        });
        
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
                } else if (data.message.toLowerCase().includes('vue')) {
                  response = { reply: 'Vue.js 是一个流行的JavaScript框架，用于构建用户界面。它的核心是声明式渲染和组件系统，同时它也非常轻量和灵活，易于与其他库集成或现有项目整合。' };
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
    },
    applyConfig() {
      if (this.aiAgent) this.aiAgent.destroy();
      this.createAgent();
    },
    destroyAgent() {
      if (this.aiAgent) {
        this.aiAgent.destroy();
        this.aiAgent = null;
      }
    },
    recreateAgent() {
      if (this.aiAgent) this.aiAgent.destroy();
      this.createAgent();
    }
  }
};
</script>

<style>
.vue-app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  background-color: #4096ff;
  color: white;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 20px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 24px;
}

main {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.config-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select, input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.button {
  background-color: #4096ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  margin-top: 10px;
}

.button:hover {
  background-color: #2e80ff;
}

.code-section {
  margin-bottom: 30px;
}

pre {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  line-height: 1.5;
}

code {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>