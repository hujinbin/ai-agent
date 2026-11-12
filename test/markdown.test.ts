import { renderMarkdown } from '../src/markdown';

describe('客服回复 Markdown', () => {
  test('渲染标题、列表、代码和表格，外部链接在新窗口打开', () => {
    const content = document.createElement('div');
    renderMarkdown(content, '# 作者推荐\n\n**惊觉**\n\n- [作者主页](https://example.com/user/1)\n\n```js\nconst value = "<b>";\n```\n\n| 作者 | 文章 |\n| --- | --- |\n| 惊觉 | 3 |');
    expect(content.querySelector('h1')?.textContent).toBe('作者推荐');
    expect(content.querySelector('strong')?.textContent).toBe('惊觉');
    expect(content.querySelector('li a')?.getAttribute('target')).toBe('_blank');
    expect(content.querySelector('a')?.rel).toBe('noopener noreferrer');
    expect(content.querySelector('pre code')?.textContent).toContain('"<b>"');
    expect(content.querySelector('pre b')).toBeNull();
    expect(content.querySelectorAll('table tr')).toHaveLength(2);
  });

  test('移除可执行 HTML 和危险链接，不把被过滤的链接改成当前页面', () => {
    const content = document.createElement('div');
    renderMarkdown(content, '<script>alert(1)</script><img src=x onerror=alert(1)><iframe src="https://bad.example"></iframe><a href="javascript:alert(1)" onclick="alert(1)">危险链接</a>\n\n[正常链接](https://example.com)');
    expect(content.querySelector('script,img,iframe')).toBeNull();
    const links = content.querySelectorAll('a');
    expect(links[0].hasAttribute('href')).toBe(false);
    expect(links[0].hasAttribute('onclick')).toBe(false);
    expect(links[1].href).toBe('https://example.com/');
  });

  test('未完成的流式 Markdown 可在后续片段到达时完整更新', () => {
    const content = document.createElement('div');
    renderMarkdown(content, '正在介绍 **惊');
    expect(content.textContent).toContain('惊');
    renderMarkdown(content, '正在介绍 **惊觉**\n\n- 第一篇文章');
    expect(content.querySelector('strong')?.textContent).toBe('惊觉');
    expect(content.querySelector('li')?.textContent).toBe('第一篇文章');
  });
});
