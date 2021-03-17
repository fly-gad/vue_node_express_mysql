/*
 * @Author: MrZhang
 * @Date: 2020-12-14 11:02:24
 * @Description: 接口
 */

import { API } from '@/api/index';

export const entry = function (param) {
    return API.post('/entry',param)
}
export const submitAQuestion = function (param) {
    return API.post('/submitAQuestion', param)
}