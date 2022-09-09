import request from "../utils/request";

export function fetchDomainList(params) {
    return request({
        url: '/domain/list',
        method: 'get',
        params,
    })
}

// 获取接口报错列表
export function fetchNetworkErrorList(params) {
    return request({
        url: "/report/networkErrorList",
        method: "GET",
        params,
    });
}

// 获取接口稳定性能列表
export function fetchNetworkStabilityList(params) {
    return request({
        url: "/report/networkStabilityList",
        method: "GET",
        params,
    });
}

// 获取网站稳定性 (长加载和长任务) 列表
export function fetchWebStabilityList(params) {
    return request({
        url: "/report/webStabilityList",
        method: "GET",
        params,
    });
}

// 获取网站代码报错列表
export function fetchWebErrorList(params) {
    return request({
        url: "/report/webErrorList",
        method: "GET",
        params,
    });
}
