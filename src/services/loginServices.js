import request from "../utils/request";

export function fetchLogin(data) {
    return request({
        url: '/login',
        method: 'POST',
        data,
    })
}

export function fetchUserRegister(data) {
  return request({
    url: "/reg",
    method: "POST",
    data,
  });
}

