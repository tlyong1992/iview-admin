import axios from 'axios';
import qs from 'qs';

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
    // NProgress.done();
    if (response.status !== 200) {
    }
    return response;

}

function checkCode (res) {
    return res;
}

export default {
    post (url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode);
    },
    get (url, params) {
        return axios({
            method: 'get',
            url,
            params,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode);
    }
};
