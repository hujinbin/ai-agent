import request from "../utils/request";

export function fetchLogin(data) {
    return request({
        url: '/login',
        method: 'POST',
        data,
    })
}

// 注册接口
// username  require  5-20位用户名
// password  require  5-20位的密码
// code   require  验证码
export function fetchUserRegister(data) {
  return request({
    url: "/reg",
    method: "POST",
    data,
  });
}

