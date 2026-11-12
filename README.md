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
          host: 'https://monitor.leheavengame.com',          // 后端站点主机（插件会在该 host 下拼接 /api/ai/chat/... 路径，正式环境）
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
  host: 'https://monitor.leheavengame.com',          // 后端站点主机（可选，正式环境）
  // 如果未提供 host，插件会回退到内置默认 host：
  // https://monitor.leheavengame.com
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
      host: 'https://monitor.leheavengame.com',          // 后端站点主机（正式环境）
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
| host | String | 'https://monitor.leheavengame.com' | - | 后端站点主机，插件会拼接 /api/ai/chat/... 路径（向后兼容：仍支持旧字段 `apiUrl`）。 |
| stream | Boolean | false | - | 是否启用流式响应 |
| model | String | 'agnes-3.0-flash' | - | 使用的模型名称，需与后端 `/api/ai/models` 返回的模型一致 |
| usingContext | Boolean | true | - | 是否携带最近十轮已完成的对话上下文 |
| search | Boolean | true | - | 是否允许后端根据问题和上下文决定联网检索 |
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
  ],
  "model": "agnes-3.0-flash",
  "search": true
}
```

流式响应格式为 Server-Sent Events (SSE)，响应头：`Content-Type: text/event-stream`

| 事件 | 数据 | 说明 |
|------|------|------|
| connect | `{"message":"连接成功","model":"agnes-3.0-flash"}` | 连接建立 |
| stage | `{"stage":"search_planning","message":"正在理解问题并判断是否需要联网…"}` | 处理阶段提示，支持搜索规划、跳过检索和继续生成等阶段 |
| message | `{"content":"文字片段"}` | 回复内容片段，插件实时追加 |
| search | `{"search_results":[...]}` | 后端决定检索时返回参考来源，插件实时渲染为来源列表 |
| error | `{"message":"错误信息"}` | 服务端错误 |
| done | `{}` | 回复结束 |

## 客服文本与 MCP 扩展

```js
const agent = new AIAgent({
  host: 'https://实际AI服务域名',
  secret: 'site-session-token',
  stream: true,
  search: false,
  usingContext: true,
  mcpServers: [
    { id: 'articles', name: '文章库', url: 'https://实际MCP域名/mcp', token: '浏览器可见的查询令牌' }
  ]
});
```

0.0.2 起插件专用于文本客服。`search` 控制是否允许后端结合当前问题和已完成的对话上下文决定联网检索，默认 `true`。`false` 关闭联网检索。`mcpServers` 可省略，配置后由浏览器直连查询服务。`mcp: false` 可禁用已配置的 MCP。旧 `media` 参数会被忽略。

`stream: true` 时逐片显示回复。`stream: false` 时在完成后整段显示，为使联网与上下文生效，内部仍通过 `/api/ai/chat/stream` 获取结果。明确同时关闭 `stream`、`search`、`usingContext` 且使用默认模型、没有 MCP 时保留 `/api/ai/chat/completion` 普通 JSON 兼容入口。

插件负责初始化 MCP、发现工具、通过普通 AI 文本请求选择工具、调用工具，再将查询参考资料交给 AI 生成回复。工具规划固定关闭联网，最终客服回答按 `search` 配置执行。文章来源支持新标签页打开。

配置服务后，首次打开对话框会检查连接并显示状态，也可点击“检查连接”重试。连接成功代表服务与工具发现正常；每轮是否实际调用、是否取得资料会显示在处理过程里。资料服务来源和联网来源分别展示，查询失败或未取得内容会明确提示。`mcp: true` 可在尚未传入服务时显示“站内资料尚未启用”，便于发现宿主网站遗漏配置。

AI 回复支持安全的 Markdown 排版，包括标题、列表、代码和表格，长代码与表格可横向滚动。普通文本用户消息保持原样显示。

每项 MCP 配置需要唯一的 `id` 和完整 `url`，可选 `name` 和 Bearer `token`。最多启用四个服务。浏览器配置的 token 对用户可见，适合使用公开客户端的只读查询凭据。HTTPS 网站通过 HTTPS MCP 地址接入，服务需要配置允许插件所在网站跨域访问。

调用 `agent.cancel()` 或点击“停止”可取消当前回复并保留已收到的文字。`destroy()` 会取消进行中的 AI 和 MCP 请求并清理界面。

多轮上下文由最近十轮完整的用户问题与 AI 回复组成。失败或停止的本轮保留在页面，后续请求沿用已完成的对话历史。欢迎语、处理阶段和 MCP 参考资料单独展示与传递。

## 实例方法

| 方法 | 说明 |
|------|------|
| destroy() | 取消请求并销毁插件，清理 DOM 和事件 |
| cancel() | 停止当前回复并保留已收到的文本 |
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
