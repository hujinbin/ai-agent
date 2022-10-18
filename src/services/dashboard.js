import request from "../utils/request";

// 获取接口错误TOP10
export function fetchNetWorkErrorOverview() {
    return request({
        url: "/report/networkErrorOverview",
        method: "GET",
    });
}

// 获取接口稳定TOP10
export function fetchStablerOverview() {
    return request({
        url: "/report/networkStabilityOverview",
        method: "GET",
    });
}
