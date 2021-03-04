/*
 * @Author: MrZhang
 * @Date: 2021-02-02 09:57:42
 * @Description: 前台接口
 */

const app = require("express").Router();
const catman = require('../../src/api/catman')

//验证码
app.post('/entry', catman.entry)



module.exports = app;