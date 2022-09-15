import {Drawer, message} from "antd";
import {STABLE_PAGE_TYPE} from "../../../../enums";
import {calPercent, fileLengthFormat, timeConsumingFormatter} from "../../../../utils";
import {CopyOutlined} from "@ant-design/icons";
import CopyToClipboard from "react-clipboardjs-copy";

function StableInfoDrawer(props) {
    const {
        drawerVisible,
        onClose,
        data,
    } = props;

    return (
        <Drawer
            title={'详情'}
            placement={'right'}
            visible={drawerVisible}
            onClose={onClose}
        >
            <p className={'drawer-content-item'}>
                <span className={'label'}>XPath路径：</span>
                <CopyToClipboard
                    text={data.Selector}
                    onSuccess={() => {
                        message.success('复制成功！');
                    }}
                >
                    <CopyOutlined className={'markdown-copy-icon'}/>
                </CopyToClipboard>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>类型：</span>
                <span className={'content'}>{STABLE_PAGE_TYPE.getName(data.Kind)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>TTFB：</span>
                <span className={'content'}>{timeConsumingFormatter(data.TtfbTime)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>TCP连接耗时：</span>
                <span className={'content'}>{timeConsumingFormatter(data.ConnectTime)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>Response耗时：</span>
                <span className={'content'}>{timeConsumingFormatter(data.ResponseTime)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>DOM解析渲染耗时：</span>
                <span className={'content'}>{timeConsumingFormatter(data.ParseDOMTime)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>DOMContentLoaded事件回调耗时：</span>
                <span className={'content'}>{timeConsumingFormatter(data.DomContentLoadedTime)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>首次可交互时间：</span>
                <span className={'content'}>{timeConsumingFormatter(data.TimeToInteractive)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>页面完整加载时间：</span>
                <span className={'content'}>{timeConsumingFormatter(data.LoadTime)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>持续时间：</span>
                <span className={'content'}>{timeConsumingFormatter(data.Duration)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>内存大小限制：</span>
                <span className={'content'}>{fileLengthFormat(data.JsHeapSizeLimit)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>可使用内存：</span>
                <span className={'content'}>{fileLengthFormat(data.TotalJSHeapSize)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>已使用内存：</span>
                <span className={'content'}>{fileLengthFormat(data.UsedJSHeapSize)}</span>
            </p>
            <p className={'drawer-content-item'}>
                <span className={'label'}>内存使用率：</span>
                <span className={'content'}>{calPercent(data.UsedJSHeapSize, data.TotalJSHeapSize)}</span>
            </p>
        </Drawer>
    )
}

export default StableInfoDrawer;