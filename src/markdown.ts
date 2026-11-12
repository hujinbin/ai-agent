import { Marked } from 'marked';
import DOMPurify from 'dompurify';

const markdown = new Marked({ gfm: true, breaks: true });

/** 将回复渲染为受限 Markdown，保留文本排版并过滤可执行内容。 */
export function renderMarkdown(container: HTMLElement, content: string): void {
  const html = markdown.parse(content, { async: false });
  container.innerHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'del', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'hr', 'a',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', 'align', 'start'],
    ALLOW_DATA_ATTR: false
  }).trim();
  container.classList.add('ai-agent-markdown');
  for (const link of Array.from(container.querySelectorAll('a'))) {
    const href = link.getAttribute('href');
    if (!href) continue;
    try {
      const url = new URL(href, window.location.href);
      if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) throw new Error();
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } catch {
      link.removeAttribute('href');
    }
  }
}
