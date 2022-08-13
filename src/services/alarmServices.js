import request from "../utils/request";

// 获取告警信息
export function getAlarmInfo(params) {
  return request({
    url: "/alarm/info",
    method: "GET",
    params,
  });
}

// 设置告警信息
export function setAlarm(data) {
  return request({
    url: "/alarm/set",
    method: "POST",
    data,
  });
}

