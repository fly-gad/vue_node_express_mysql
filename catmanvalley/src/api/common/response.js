/**
 * @file http 响应处理
 * @author svon.me@gmail.com
 */

import * as Code from './code';

export function Success(response) {
  if (response.code === Code.success) {
    return response.data;
  }
  return Promise.reject(response);
}

