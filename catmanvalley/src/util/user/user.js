/*
 * @Author: MrZhang
 * @Date: 2020-12-14 10:55:45
 * @Description: 用户信息管理
 */

import cookie from 'js-cookie';
import { env } from '@/util/env/index';

//cookie储存
export const get = function () {
    return cookie.get(env.VUE_APP_token);
}

//cookie过期时间设置
export const set = function (value) {
    try {
        const date = new Date();
        const time = date.getTime() + 1000 * 60 * 30;
        const expires = new Date(time);
        return cookie.set(env.VUE_APP_token, value, { expires });
    } catch (error) {
        console.log(error);
    }
}

//删除cookie
export const remove = function () {
    return cookie.remove(env.VUE_APP_token);
}

//储存+过期时间设置
export const sync = function () {
    const value = get();
    if (value) {
        return set(value);
    }
    return false;
}