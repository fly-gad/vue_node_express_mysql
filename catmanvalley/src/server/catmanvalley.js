/*
 * @Author: MrZhang
 * @Date: 2020-12-14 11:02:24
 * @Description: 接口
 */

import { API } from '@/api/index';

//获取列表
export const entry = function (param) {
    return API.post('/entry', param)
}

//收藏
export const editCollection = function (param) {
    return API.post('/editCollection', param)
}

//点赞喜欢
export const pointlike = function (param) {
    return API.post('/pointlike', param)
}
//浏览次数
export const browseNum = function (param) {
    return API.post('/browseNum', param)
}

//提交问题
export const submitAQuestion = function (param) {
    return API.post('/submitAQuestion', param)
}

//沙雕图列表接口
export const imagearticle = function (param) {
    return API.post('/imagearticle', param)
}

//沙雕图发布接口
export const uploadImages = function (param) {
    return API.post('/uploadImages', param)
}

//发布视频接口
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