import request from "../utils/request";

// 获取数据列表
export function getReportList(params) {
  return request({
    url: "/report/list",
    method: "GET",
    params,
  });
}