import Enum from "../utils/enum";

export const STABLE_PAGE_TYPE = new Enum([
    {
        key: 'pageload',
        name: '页面加载',
        value: 'pageload'
    },
    {
        key: 'longtask',
        name: '长任务',
        value: 'longtask'
    },
    {
        key: 'resource',
        name: '资源加载',
        value: 'resource'
    },
    {
        key: 'draw',
        name: '其他渲染',
        value: 'draw'
    },
    {
        key: 'memory',
        name: '内存泄漏',
        value: 'memory'
    }
])