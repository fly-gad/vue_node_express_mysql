/*
 * @Author: MrZhang
 * @Date: 2020-12-14 11:02:24
 * @Description: 接口
 */

import { API } from '@/api/index';

export const entry = function (param) {
    return API.post('/entry', param)
}
//收藏
export const editCollection = function (param) {
    return API.post('/editCollection', param)
}
export const submitAQuestion = function (param) {
    return API.post('/submitAQuestion', param)
}

export const imagearticle = function (param) {
    return API.post('/imagearticle', param)
}


export const uploadImages = function (param) {
    return API.post('/uploadImages', param)
}

export const releaseVideo = function (param) {
    return API.post('/releaseVideo', param)
}

//用户信息
export const accuntinfo = function (param) {
    return API.post('/accuntinfo', param)
}
//用户信息
export const editUserImg = function (param) {
    return API.post('/editUserImg', param)
}
//修改密码
export const modifypassword = function (params) {
    return API.post('/modifypassword', params)
}