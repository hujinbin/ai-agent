import {
    PieChartOutlined,
    UserOutlined,
    SnippetsOutlined,
    AlertOutlined,
    SettingOutlined,
    ApiOutlined
} from '@ant-design/icons';

const menus = [
    {
        key: 'dashboard',
        icon: <PieChartOutlined/>,
        label: '控制台',
        role: [0, 100],
    },
    {
        key: 'user',
        icon: <UserOutlined/>,
        label: '用户管理',
        role: [100],
    },
    {
        key: 'data',
        icon: <SnippetsOutlined/>,
        label: '数据管理',
        role: [0, 100],
        children: [
            {
                key: 'data-interface-error-list',
                label: '接口报错数据',
            },
            {
                key: 'data-performance-list',
                label: '接口性能数据',
            },
            {
                key: 'data-page-stable-list',
                label: '页面稳定数据',
            },
            {
                key: 'data-page-error-list',
                label: '页面错误数据',
            }
        ]
    },
    {
        key: 'alarm',
        icon: <AlertOutlined/>,
        label: '告警管理',
        role: [0, 100],
        children: [
            {
                key: 'alarm-setting',
                label: '告警设置',
            },
        ]
    },
    // TODO 暂时注释后续再加
    // {
    //     key: 'system',
    //     icon: <SettingOutlined/>,
    //     label: '系统管理',
    //     role: [0, 100],
    //     children: [
    //         {
    //             key: 'system-setting',
    //             label: '系统设置',
    //         },
    //     ]
    // },
    {
        key: 'access',
        icon: <ApiOutlined/>,
        label: '接入方式',
        role: [0, 100],
    },
]

export default menus;
