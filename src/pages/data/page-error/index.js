import DefaultTable from "../../../components/default-table";
import {fetchWebErrorList} from "../../../services/dataServices";
import moment from "moment/moment";

function PageError() {
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
            title: '错误类型',
            dataIndex: 'ErrorType',
            key: 'ErrorType',
            width: 100,
        },
        {
            title: 'URL',
            dataIndex: 'Path',
            key: 'Path',
            ellipsis: true,
        },
        {
            title: '错误信息',
            dataIndex: 'Message',
            key: 'Message',
            width: 100,
        },
        {
            title: '错误坐标',
            dataIndex: 'Position',
            key: 'Position',
            width: 100,
        },
        {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
            render: (record) => moment(record.CreateTime * 1000).format('YYYY-MM-DD HH:mm:ss') || '-',
            width: 100,
        }
    ];

    return (
        <DefaultTable
            columns={columns}
            request={fetchWebErrorList}
        >

        </DefaultTable>
    )
}

export default PageError;