import {
    PieChartOutlined,
    UserOutlined,
    SnippetsOutlined,
    AlertOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const menus = [
    {
        key: 'dashboard',
        icon: <PieChartOutlined/>,
        label: '控制台',
    },
    {
        key: 'user',
        icon: <UserOutlined/>,
        label: '用户管理',
    },
    {
        key: 'data',
        icon: <SnippetsOutlined/>,
        label: '数据管理',
        children: [
            {
                key: 'data-interface-list',
                label: '接口列表'
            },
            {
                key: 'data-error-list',
                label: '报错汇总'
            }
        ]
    },
    {
        key: 'alarm',
        icon: <AlertOutlined/>,
        label: '告警管理',
        children: [
            {
                key: 'alarm-setting',
                label: '告警设置'
            },
        ]
    },
    {
        key: 'system',
        icon: <SettingOutlined/>,
        label: '系统管理',
        children: [
            {
                key: 'system-setting',
                label: '系统设置'
            },
        ]
    },
]

export default menus;