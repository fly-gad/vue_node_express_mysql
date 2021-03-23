/*
 * @Author: MrZhang
 * @Date: 2021-02-02 09:57:42
 * @Description: 前台接口
 */

const app = require("express").Router();
const catman = require('../../src/api/catman')
const multer = require('multer')
var upload = multer({ dest: './public/uploads/' }).single('file')

//查询列表总数
app.post('/entry', catman.entry)

//收藏
app.post('/editCollection', catman.editCollection)

//点赞-喜欢
app.post('/pointlike', catman.pointlike)

//浏览次数
app.post('/browseNum', catman.browseNum)

//提交问题接口
app.post('/submitAQuestion', catman.submitAQuestion)

//修改头像接口
app.post('/editUserImg', upload, catman.editUserImg)

//评论
app.post('/discuss', catman.discuss)

//评论
app.post('/discussList', catman.discussList)

//举报
app.post('/reportNum', catman.reportNum)

module.exports = app;