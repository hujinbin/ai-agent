# AI Agent Plugin

一个能在 Vue、React、jQuery 等多框架项目中通用的 AI Agent 前端插件，采用原生 JavaScript + TypeScript + UMD 模块化规范，确保跨框架兼容性。

---

## 🔥 新增预览功能

本项目已集成 TypeScript 示例和多框架预览页面，支持本地快速预览和调试。

- 启动预览命令：
  ```bash
  npm run serve
  ```
- 默认端口：**9000**
- 预览入口：
  - http://localhost:9000/
---

## 特性

- ✅ 跨框架兼容：支持 Vue、React、jQuery 等任意前端项目
- ✅ 样式隔离：避免与宿主项目样式冲突
- ✅ 主题定制：支持浅色/深色主题
- ✅ 位置灵活：支持四角悬浮定位
- ✅ 简单易用：引入即可使用，无复杂配置

## 安装

### 直接引入

```html
<script src="path/to/ai-agent.min.js"></script>
```

### NPM 安装

```bash
npm install ai-agent-plugin --save
```

## TypeScript 示例与预览

项目内 `examples/typescript` 目录下，包含完整的 React/Vue/jQuery TypeScript 示例代码和预览页面。

- 进入示例目录并安装依赖：
  ```bash
  cd examples/typescript
  npm install
  npm start
  ```
- 访问对应页面即可预览和调试。

## 使用方法

### 在 jQuery 项目中使用

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="path/to/ai-agent.min.js"></script> <!-- 引入插件 -->
</head>
<body>
  <h1>jQuery 项目</h1>
  <script>
    $(document).ready(function() {
      // 初始化 AI Agent
      window.aiAgent = new AIAgent({
          host: 'http://monitor.leheavengame.com',          // 后端站点主机（插件会在该 host 下拼接 /api/ai/chat/... 路径，正式环境）
          // 说明：为向后兼容，如果仍传入 apiUrl（示例中旧字段），插件也会识别并适配
          secret: 'your-api-secret-key',   // API 密钥（必填）
          stream: false,                   // 是否启用流式响应
          title: 'jQuery AI 助手',
          position: 'bottom-right'
        });
    });
  </script>
</body>
</html>
```

### 在 React 项目中使用

```jsx
import React, { useEffect } from 'react';
// 引入 AI Agent 插件
import AIAgent from 'ai-agent-plugin';
// 或通过 script 标签引入后，使用全局变量 window.AIAgent

function App() {
  useEffect(() => {
    // 初始化 AI Agent
    const aiAgent = new AIAgent({
  host: 'http://monitor.leheavengame.com',          // 后端站点主机（可选，正式环境）
  // 如果未提供 host，插件会回退到内置默认 host：
  // http://monitor.leheavengame.com
  // 注意：当您提供远程（非 localhost）host 时，secret 为必填，用于后端鉴权
  secret: 'your-api-secret-key',   // API 密钥（当使用真实远端 host 时必填）
      stream: true,                    // 启用流式响应
      theme: 'dark',
      title: 'React AI 助手'
    });
    
    // 组件卸载时销毁插件
    return () => aiAgent.destroy();
  }, []);

  return <div>React 项目</div>;
}

export default App;
```

### 在 Vue 项目中使用

```vue
<template>
  <div>Vue 项目</div>
</template>

<script>
import AIAgent from 'ai-agent-plugin';
// 或通过 script 标签引入后，使用全局变量 window.AIAgent

export default {
  mounted() {
    // 初始化 AI Agent
    this.aiAgent = new AIAgent({
      host: 'http://monitor.leheavengame.com',          // 后端站点主机（正式环境）
      // 兼容旧字段：如果仍使用 apiUrl，插件会自动转换为 host
      secret: 'your-api-secret-key',   // API 密钥（必填）
      stream: false,                   // 普通响应模式
      title: 'Vue AI 助手',
      position: 'bottom-left'
    });
  },
  beforeDestroy() {
    // 组件销毁前清理插件
    if (this.aiAgent) this.aiAgent.destroy();
  }
};
</script>
```

## 配置选项

| 选项 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| **secret** | String | - | ✅ | API 密钥/令牌，必须提供 |
| apiUrl | String | '/api/ai/chat' | - | 后端 AI 接口地址 |
| host | String | 'http://monitor.leheavengame.com' | - | 后端站点主机，插件会拼接 /api/ai/chat/... 路径（向后兼容：仍支持旧字段 `apiUrl`）。 |
| stream | Boolean | false | - | 是否启用流式响应 |
| theme | String | 'light' | - | 主题，可选：'light'/'dark' |
| position | String | 'bottom-right' | - | 位置，可选：'bottom-right'/'bottom-left'/'top-right'/'top-left' |
| title | String | 'AI 助手' | - | 面板标题 |
| placeholder | String | '请输入问题...' | - | 输入框占位文本 |

## 后端接口说明

插件支持以下后端接口格式：

### 普通模式接口
```
POST /api/ai/chat/completion
Content-Type: application/json
Authorization: Bearer your-api-secret-key

{
  "content": "用户输入的消息"
}
```

### 流式模式接口
```
POST /api/ai/chat/stream
Content-Type: application/json
Authorization: Bearer your-api-secret-key

{
  "messages": [
    {"role": "user", "content": "用户输入的消息"}
  ]
}
```

流式响应格式为 Server-Sent Events (SSE)，响应头：`Content-Type: text/event-stream`

## 方法

| 方法 | 说明 |
|------|------|
| destroy() | 销毁插件，清理 DOM 和事件 |
| togglePanel() | 切换面板显示/隐藏 |
| closePanel() | 关闭面板 |
| sendMessage(text) | 发送消息到 AI 接口 |

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 许可证

MIT