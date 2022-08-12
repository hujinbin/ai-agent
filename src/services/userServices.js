import request from "../utils/request";

export function fetchUserList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params,
    })
}