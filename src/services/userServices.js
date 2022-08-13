import request from "../utils/request";

export function fetchUserList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params,
    })
}

// 修改密码
export function fetchUserChangePwd(data) {
  return request({
    url: "/user/changePassword",
    method: "PUT",
    data,
  });
}

// 用户信息
export function fetchUserInfo(params) {
  return request({
    url: "/user/userInfo",
    method: "get",
    params,
  });
}