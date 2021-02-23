/*
 * @Author: MrZhang
 * @Date: 2020-12-14 11:02:24
 * @Description: 接口
 */

import { API } from '@/api/index';

export const lists = function (params) {
    return API.get('/lists', { params })
}