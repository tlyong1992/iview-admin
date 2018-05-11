import axios from 'axios';
import qs from 'qs';
import store from '@/store';

axios.interceptors.request.use(config => {
    // 这里可以加一些动作, 比如来个进度条开始动作,
    console.log('发起请求');
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了
    return Promise.resolve(error.response);
});

// 统一判断返回状态值
function checkStatus (response) {
    // 异常状态，将异常状态包装成正常返回
    if (response.status !== 200) {

        let res = {
            code : response.status,
            msg : response.statusText,
            data : response.data
        };
        return res;

    } else {
        return response.data;
    }
}


export default {
    post (url, data) {
        url = store.state.app.serverUrl + url;
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus);
    },
    get (url, params) {
        url = store.state.app.serverUrl + url;
        return axios({
            method: 'get',
            url,
            params,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus);
    },
    patch (url, data) {
        url = store.state.app.serverUrl + url;
        return axios({
            method: 'patch',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus);
    },
    delete (url, data) {
         url = store.state.app.serverUrl + url;
        return axios({
            method: 'delete',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus);
    },
    put (url, data) {
         url = store.state.app.serverUrl + url;
        return axios({
            method: 'put',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus);
    },
};
