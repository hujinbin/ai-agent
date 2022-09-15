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

    return (
        <Card
            title={STABLE_PAGE_TYPE.getName(data.Kind)}
            hoverable={true}
            className={'stable-card'}
            extra={<Button type={'link'} onClick={() => handleSetDrawerVisible(true)}>查看详情</Button>}
        >
            <p className={'card-content-item'}>
                <span className={'label'}>页面完整加载时间: </span>
                <span className={'content'}>{timeConsumingFormatter(data.LoadTime)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>持续时间: </span>
                <span className={'content'}>{timeConsumingFormatter(data.Duration)}</span>
            </p>
            <p className={'card-content-item'}>
                <span className={'label'}>内存使用率: </span>
                <span className={'content'}>{calPercent(data.UsedJSHeapSize, data.TotalJSHeapSize)}</span>
            </p>

            <StableInfoDrawer
                data={data}
                drawerVisible={drawerVisible}
                onClose={() => handleSetDrawerVisible(false)}
            />
        </Card>
    )
}

export default StableCard;