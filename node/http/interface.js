/*
 * @Author: MrZhang
 * @Date: 2021-02-02 09:57:42
 * @Description: 接口列表
 */

const app = require("express").Router();
const api = require('../src/api/index')

//分页
app.get('/lists', api.lists)

module.exports = app;