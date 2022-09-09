import {useEffect, useState} from "react";
import {Table} from "antd";

function DefaultTable(props) {
    const {
        columns,
        request
    } = props;
    const [tableDataSource, setTableDataSource] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);

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
        request(params).then(res => {
            setTableDataSource(res.data.data.list || []);
            setTotal(res.data.data.total || 0);
        }).finally(() => {
            setTableLoading(false)
        });
    }

    useEffect(() => {
        handleSearchList()
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
        >

        </Table>
    )
}


export default DefaultTable;