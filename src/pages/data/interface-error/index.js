import {Badge, Form, Input, Button } from 'antd';
import DefaultTable from "../../../components/default-table";
import {fetchNetworkErrorList} from "../../../services/dataServices";

function InterfaceError() {
    const onSearch =()=>{
        console.log(12222222)
    }
    
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
            render: (record) => <span>{ record }ms</span>,
            width: 100,
        }
    ];

    return (
        <div>
        <Form layout="inline" onSubmit={onSearch}>
        <Form.Item label="url">
            <Input
              placeholder="url"
            />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSearch}>
            搜索
          </Button>
        </Form.Item>
      </Form>
        <DefaultTable
            columns={columns}
            request={fetchNetworkErrorList}
        >

        </DefaultTable>
        </div>
    )
}

export default InterfaceError;
