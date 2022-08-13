import request from "../utils/request";

// 获取域名列表
export function getDomainList(params) {
  return request({
    url: "/domain/list",
    method: "GET",
    params,
  });
}