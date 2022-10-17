import DefaultTable from "../../../components/default-table";
import {fetchNetworkErrorList} from "../../../services/dataServices";

function InterfaceError() {
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
            title: '接口状态',
            key: 'Status',
            render: (record) => <span>{ record.Status }({ record.StatusText || '-' })</span>,
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
            request={fetchNetworkErrorList}
        >

        </DefaultTable>
    )
}

export default InterfaceError;
