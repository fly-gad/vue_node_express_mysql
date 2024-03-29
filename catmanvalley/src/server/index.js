/*
 * @Author: MrZhang
 * @Date: 2020-12-14 11:02:24
 * @Description: 接口
 */

import { API } from '@/api/index';

//获取列表
export const lists = function (params) {
    return API.get('/lists', { params })
}

//获取验证码
export const sendCode = function (params) {
    return API.post('/sendCode', params)
}

//免密登录
export const login = function (params) {
    return API.post('/login', params)
}

//帐号密码登录
export const accountPassWordlogin = function (params) {
    return API.post('/accountPassWordlogin', params)
}

//用户信息
export const accuntinfo = function (params) {
    return API.post('/accuntinfo', params)
}

//修改密码
export const modifypassword = function (params) {
    return API.post('/modifypassword', params)
}

//获取用户表
export const user = function () {
    return API.post('/user')
}