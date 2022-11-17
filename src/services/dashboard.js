import request from "../utils/request";

// 获取接口错误TOP10
export function fetchNetWorkErrorOverview(params) {
    return request({
        url: "/report/networkErrorOverview",
        method: "GET",
        params,
    });
}

// 获取接口稳定TOP10
export function fetchStablerOverview(params) {
    return request({
        url: "/report/networkStabilityOverview",
        method: "GET",
        params,
    });
}
