import axios from 'axios';

const http = axios.create({
    baseURL: '/'
});

// 拦截器
http.interceptors.request.use(config => {
    config.headers.Author = 'yinlei'; // 这里方便日后的JWT登录认证
    return config;
}, err => {
    return Promise.reject(err);
});

// 这里日后可以封装通用的错误处理并错误上报
http.interceptors.response.use(res => {
    return res.data;
}, err=> {
    // if(err.response.status == 401){
        //未jwt认证
    // }
    return Promise.reject(err);
});



export default http;