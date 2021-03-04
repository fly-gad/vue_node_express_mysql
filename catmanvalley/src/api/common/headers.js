/*
 * @Author: MrZhang
 * @Date: 2020-12-14 10:54:24
 * @Description: 
 */
/**
 * @file 用户信息
 * @author svon.me@gmail.com
 */

import cookie from 'js-cookie';
import { env } from '@/util/env/index';

export function headers() {
  const tokenName = env.VUE_APP_token;
  const value = cookie.get(tokenName);
  const header = {};
  if (value) {
    header[tokenName] = value;
  }
  return header;
}