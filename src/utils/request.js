import axios from 'axios';
import {message as Message} from 'antd';
import qs from 'qs';

const pendingMap = new Map();

function getPendingKey(config) {
    let { url, method, params, data } = config;
    if (typeof data === 'string') data = JSON.parse(data);
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

function addPending(config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel);
        }
    })
}

function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        cancelToken(pendingKey);
        pendingMap.delete(pendingKey)
    }
}

function httpErrorStatusHandle(error) {
    // 处理被取消的请求
    if(axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
    let message = '';
    if (error && error.response) {
        switch(error.response.status) {
            case 302: message = '接口重定向了！';break;
            case 400: message = '参数不正确！';break;
            case 401: message = '您未登录，或者登录已经超时，请先登录！';break;
            case 403: message = '您没有权限操作！'; break;
            case 404: message = `请求地址出错: ${error.response.config.url}`; break; // 在正确域名下
            case 408: message = '请求超时！'; break;
            case 409: message = '系统已存在相同数据！'; break;
            case 500: message = '服务器内部错误！'; break;
            case 501: message = '服务未实现！'; break;
            case 502: message = '网关错误！'; break;
            case 503: message = '服务不可用！'; break;
            case 504: message = '服务暂时无法访问，请稍后再试！'; break;
            case 505: message = 'HTTP版本不受支持！'; break;
            default: message = '异常问题，请联系管理员！'; break
        }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！';
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
    Message.error(message)
}

function request (axiosConfig, customOptions) {
    const instance = axios.create({
        timeout: 1000 * 30,
        baseURL: '/api',
    })

    let custom_options = Object.assign({
        repeat_request_cancel: true,
        error_message_show: true,
    }, customOptions);

    instance.interceptors.request.use(config => {
        removePending(config);
        custom_options.repeat_request_cancel && addPending(config);
        if (config.method === 'get') {
            config.paramsSerializer = (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        }
        config.headers['Authentication'] = localStorage.getItem('token');
        return config;
    }, error => {
        return Promise.reject(error);
    })

    instance.interceptors.response.use(response => {
        console.log(response);
        if (response.data.code !== 200) {
            Message.error(response.data.msg);
        }
        removePending(response.config);
        return response;
    }, error => {
        console.log(error);
        custom_options.error_message_show && httpErrorStatusHandle(error);
        error.config && removePending(error.config);
        return Promise.reject(error);
    })
    return instance(axiosConfig)
}



export default request;