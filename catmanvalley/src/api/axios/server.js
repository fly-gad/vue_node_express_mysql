/*
 * @Author: MrZhang
 * @Date: 2020-12-14 10:54:24
 * @Description: 创建 axios 对象
 */

import axios from 'axios';
import { env } from '@/util/env/index';

const server = axios.create({
  headers: {
    // 'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: env.VUE_APP_API_timeout,
  withCredentials: false, // 不发送 cookie
  baseURL: `${env.VUE_APP_API_domain}${env.VUE_APP_API_baseurl}`, // 默认域名
});

export default server;