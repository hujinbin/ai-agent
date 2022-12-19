import {fetchNetworkStabilityList} from '../../../services/dataServices';
import DefaultTable from "../../../components/default-table";
import {Badge} from "antd";

function DataPerformance() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'Id',
            key: 'Id',
            width: 70,
        },
        {
            title: '类别',
            dataIndex: 'Kind',
            key: 'Kind',
            width: 120,
        },
        {
            title: '事件类型',
            dataIndex: 'EventType',
            key: 'EventType',
            width: 100,
        },
        {
            title: 'URL',
            dataIndex: 'Pathname',
            key: 'Pathname',
            ellipsis: true,
        },
        {
            title: 'Method',
            dataIndex: 'Method',
            key: 'Method',
            width: 100,
        },
        {
            title: '接口状态',
            key: 'Status',
            render: (record) =>
                <Badge
                    status={ record.Status === 200 ? 'success' : 'warning' }
                    text={<span>{ record.Status }({ record.StatusText || '-' })</span>} />,
            width: 200,
        },
        {
            title: '接口耗时',
            dataIndex: 'Duration',
            key: 'Duration',
            render: (record) => <span>{ (record / 1000).toFixed(0) }s</span>,
            width: 100,
        }
    ];

    return (
        <DefaultTable
            columns={columns}
            request={fetchNetworkStabilityList}
        >

        </DefaultTable>
    )
}


export default DataPerformance;
