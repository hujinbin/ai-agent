import { fetchUserList } from "../../services/userServices";
import moment from 'moment'
import DefaultTable from "../../components/default-table";


function UserIndex() {
    const columns = [
        {
            title: '用户ID',
            dataIndex: 'Id',
            key: 'Id'
        },
        {
            title: '用户名',
            dataIndex: 'Username',
            key: 'Id'
        },
        {
            title: 'API Key',
            dataIndex: 'ApiKey',
            key: 'Id'
        },
        {
            title: '用户权限',
            dataIndex: 'Role',
            key: 'Role',
            render: role => <span>{ role === 100 ? '超级管理员' : '普通用户' }</span>
        },
        {
            title: '注册时间',
            dataIndex: 'RegTime',
            key: 'RegTime',
            render: time => <span>{ moment(time * 1000).format('YYYY-MM-DD HH:mm:ss') }</span>
        },
    ];

    return (
        <DefaultTable
            columns={columns}
            request={fetchUserList}
        >

        </DefaultTable>
    )
}

export default UserIndex;