import DefaultTable from "../../../components/default-table";
import {fetchNetworkErrorList} from "../../../services/dataServices";

function InterfaceError() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'Id',
            key: 'Id',
        },
        {
            title: '类别',
            dataIndex: 'Kind',
            key: 'Kind',
        },
        {
            title: '事件类型',
            dataIndex: 'EventType',
            key: 'EventType',
        },
        {
            title: 'URL',
            dataIndex: 'Pathname',
            key: 'Pathname',
        },
        {
            title: '接口状态',
            key: 'Status',
            render: (record) => <span>{ record.Status }({ record.StatusText || '-' })</span>
        },
        {
            title: '接口耗时',
            dataIndex: 'Duration',
            key: 'Duration',
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