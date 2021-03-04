/*
 * @Author: MrZhang
 * @Date: 2020-12-14 10:54:24
 * @Description: 与 API 之间的数据交互
 */

import axios from './axios/index';
import * as user from '@/util/user/user';

const API = axios


// 响应前触发
axios.interceptors.response.use(response => {
    // 刷新用户信息
    user.sync();
    return response;
}, error => {
    return Promise.reject(error);
});

export { axios, API };