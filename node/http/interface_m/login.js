/*
 * @Author: MrZhang
 * @Date: 2021-02-02 09:57:42
 * @Description: 登录后台接口公共入口
 */

const app = require("express").Router();
const api = require('../../src/management_api/index')
const login = require('../../src/management_api/login')

//验证码
app.post('/sendCode', login.sendCode)

//验证码
app.post('/user', login.user)

//免密登录
app.post('/login', login.codePhoneLogin)

//帐号密码登录 
app.post('/accountPassWordlogin', login.accountPassWordlogin)

//用户信息
app.post('/accuntinfo', login.accuntinfo)

//修改密码
app.post('/modifypassword', login.modifypassword)

//分页
app.get('/lists', api.lists)

//绑定邮箱
app.get('/bindEmail', api.bindEmail)

module.exports = app;