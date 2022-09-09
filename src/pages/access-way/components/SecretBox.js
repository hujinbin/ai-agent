import CopyToClipboard  from 'react-clipboardjs-copy'
import { CopyOutlined } from '@ant-design/icons';
import { message } from "antd";

function SecretBox(props) {
    const { secret } = props;
    return (
        <div className={'box-wrapper'}>
            <div className={'info-item'}>
                <span className={'label'}>ApiKey：</span>
                <span className={'content'}>{ secret }</span>
                <CopyToClipboard
                    text={secret}
                    onSuccess={() => {
                        message.success('复制成功！');
                    }}
                >
                    <CopyOutlined className={'copy-icon'}/>
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default SecretBox;