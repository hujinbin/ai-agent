import { useEffect, useState} from 'react';
import {Table} from "antd";
import { fetchUserList } from "../../services/userServices";
import moment from 'moment'


function UserIndex() {
    const [tableDataSource, setTableDataSource] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);
    const [columns] = useState([
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
    ])

    const handleChangePageOptions = (pageNum, pageSize) => {
        setPageNum(pageNum);
        setPageSize(pageSize);
        handleSearchList();
    }

    const handleSearchList = () => {
        const params = {
            pageSize,
            pageNum
        };
        setTableLoading(true);
        fetchUserList(params).then(res => {
            console.log(res);
            setTableDataSource(res.data.data.list || []);
            setTotal(0);
        }).finally(() => {
            setTableLoading(false);
        })
    }

    useEffect(() => {
        handleSearchList();
    }, []);
    return (
        <Table
            loading={tableLoading}
            dataSource={tableDataSource}
            columns={columns}
            pagination={{
                current: pageNum,
                pageSize: pageSize,
                total: total,
                onChange: (pageNum, pageSize) => handleChangePageOptions(pageNum, pageSize)
            }}
        ></Table>
    )
}

export default UserIndex;