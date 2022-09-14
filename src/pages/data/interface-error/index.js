import DefaultTable from "../../../components/default-table";
import {fetchNetworkErrorList} from "../../../services/dataServices";

function InterfaceError() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'Id',
        },
        {
            title: '类别',
            dataIndex: 'Kind',
        },
        {
            title: '事件类型',
            dataIndex: 'EventType',
        },
        {
            title: 'URL',
            dataIndex: 'Pathname'
        },
        {
            title: '接口状态',
            dataIndex: 'Status',
            render: ({ record }) => <span>{ record.Status }({ record.StatusText })</span>
        },
        {
            title: '接口耗时',
            dataIndex: 'Duration'
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