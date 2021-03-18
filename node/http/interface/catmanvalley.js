/*
 * @Author: MrZhang
 * @Date: 2021-02-02 09:57:42
 * @Description: 前台接口
 */

const app = require("express").Router();
const catman = require('../../src/api/catman')
const multer = require('multer')
var uploads = multer({ dest: './public/uploads/' }).single('file')
var upload = multer({ dest: './public/uploads/' }).single('file')

//查询列表总数
app.post('/entry', catman.entry)

//收藏
app.post('/editCollection', catman.editCollection)

//提交问题接口
app.post('/submitAQuestion', catman.submitAQuestion)

//上传视频
app.post('/uploads', uploads, catman.uploads)

//修改头像接口
app.post('/editUserImg', upload, catman.editUserImg)



module.exports = app;