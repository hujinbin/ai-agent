import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import CopyToClipboard  from 'react-clipboardjs-copy'
import { CopyOutlined } from '@ant-design/icons';
import { message } from "antd";

function Markdown(props) {
    const { text = '' } = props;
    return (
        <div className={'markdown-wrapper'}>
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }) {
                        return <SyntaxHighlighter
                            showLineNumbers={true}
                            style={vscDarkPlus}
                            language={'javascript'}
                            PreTag={'div'}
                            {...props}
                        >
                            { String(children).replace(/\n$/, '') }
                        </SyntaxHighlighter>
                    }
                }}
            >
                { text }
            </ReactMarkdown>
            <CopyToClipboard
                text={text.replaceAll('```', '')}
                onSuccess={() => {
                    message.success('复制成功！');
                }}
            >
                <CopyOutlined className={'markdown-copy-icon'}/>
            </CopyToClipboard>
        </div>
    )
}

export default Markdown;