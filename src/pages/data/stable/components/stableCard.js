import {Card, Button} from 'antd';
import StableInfoDrawer from "./stableInfoDrawer";
import {STABLE_PAGE_TYPE} from "../../../../enums";
import {timeConsumingFormatter, calPercent} from "../../../../utils";
import {useState} from "react";

function StableCard(props) {
    const {data} = props;
    const [drawerVisible, setDrawerVisible] = useState(false);

    function handleSetDrawerVisible(status) {
        setDrawerVisible(status);
    }

    const payloadWrapper = () => (
        <>
            <p className={'card-content-item'}>
                <span className={'label'}>TCP连接耗时: </span>
                <span className={'content'}>{timeConsumingFormatter(data.ConnectTime)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>TTFB: </span>
                <span className={'content'}>{timeConsumingFormatter(data.TtfbTime)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>Response耗时: </span>
                <span className={'content'}>{timeConsumingFormatter(data.ResponseTime)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>DOM解析渲染耗时: </span>
                <span className={'content'}>{timeConsumingFormatter(data.ParseDOMTime)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>DOMContentLoaded事件回调耗时: </span>
                <span className={'content'}>{timeConsumingFormatter(data.DomContentLoadedTime)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>首次可交互时间: </span>
                <span className={'content'}>{timeConsumingFormatter(data.TimeToInteractive)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>页面完整加载时间: </span>
                <span className={'content'}>{timeConsumingFormatter(data.LoadTime)}</span>
            </p>
        </>
    );

    const commonWrapper = () => (
        <>
            <p className={'card-content-item'}>
                <span className={'label'}>事件类型: </span>
                <span className={'content'}>{data.EventType}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>开始时间: </span>
                <span className={'content'}>{data.StartTime}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>持续时间: </span>
                <span className={'content'}>{data.Duration}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>选中节点: </span>
                <span className={'content'}>{data.Selector}</span>
            </p>
        </>
    )

    const memoryWrapper = () => (
        <>
            <p className={'card-content-item'}>
                <span className={'label'}>可使用内存: </span>
                <span className={'content'}>{data.TotalJSHeapSize}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>已使用内存: </span>
                <span className={'content'}>{data.UsedJSHeapSize}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>内存使用率: </span>
                <span className={'content'}>{calPercent(data.UsedJSHeapSize, data.TotalJSHeapSize)}</span>
            </p>
        </>
    )

    return (
        <Card
            title={STABLE_PAGE_TYPE.getName(data.Kind)}
            hoverable={true}
            className={'stable-card'}
            extra={<Button type={'link'} onClick={() => handleSetDrawerVisible(true)}>查看详情</Button>}
        >
            {data.Kind === 'payload' ? payloadWrapper() : null}
            {['longtask', 'resource', 'draw'].includes(data.Kind) ? commonWrapper() : null}
            {data.Kind === 'memory' ? memoryWrapper() : null}

            <StableInfoDrawer
                data={data}
                drawerVisible={drawerVisible}
                onClose={() => handleSetDrawerVisible(false)}
            />
        </Card>
    )
}

export default StableCard;