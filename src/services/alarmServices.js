import request from "../utils/request";

// 获取告警信息
export function fetchAlarmInfo(params) {
  return request({
    url: "/alarm/info",
    method: "GET",
    params,
  });
}

// 设置告警信息
export function fetchSetAlarm(data) {
  return request({
    url: "/alarm/set",
    method: "POST",
    data,
  });
}

