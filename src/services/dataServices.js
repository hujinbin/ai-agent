import request from "../utils/request";

export function fetchDomainList(params) {
    return request({
        url: '/domain/list',
        method: 'get',
        params,
    })
}