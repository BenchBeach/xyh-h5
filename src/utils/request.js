import axios from 'axios';
import qs from 'querystring';
import router from "@/router"

axios.defaults.withCredentials = true;

const service = axios.create({

    baseURL: 'https://api.twt.edu.cn/api',
    transformRequest: [
        (oldData, config) => {
            if (!config['Content-Type']) {
                config['Content-Type'] = 'application/x-www-form-urlencoded'
                return qs.stringify(oldData);
            }
            switch (config['Content-Type']) {
                case 'multipart/form-data':
                    return oldData;
                case 'application/json':
                    return JSON.stringify(oldData)
                default:
                    return qs.stringify(oldData);
            }
        },
    ],
    timeout: 60000,
    headers: {
        'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
});

service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        if (response.status !==200) {
            alert('500系统错误');
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
