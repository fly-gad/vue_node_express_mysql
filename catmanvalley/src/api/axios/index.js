/*
 * @Author: MrZhang
 * @Date: 2020-12-14 10:54:23
 * @Description: axios 包装
 */
import _ from 'lodash';
import server from './server';
import { headers } from '../common/headers';
import { Success } from '../common/response';
import sefaSet from '@fengqiaogang/safe-set';

// 发送前触发
server.interceptors.request.use(function (config) {
  const method = _.toLower(config.method);
  if (_.includes(method, "post")) {
    // config.data = Qs.stringify(config.data);
    // sefaSet(config, 'headers.Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }
  _.each(headers(), (value, key) => {
    sefaSet(config, `headers.${key}`, value);
  });
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应前触发
server.interceptors.response.use(response => {
  if (response.status === 200 || response.statusText === 'ok') {
    return Success(response.data ? response.data : response);
  }
  return response;
}, error => {
  return Promise.reject(error);
});

export default server;