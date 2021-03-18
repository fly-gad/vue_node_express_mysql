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