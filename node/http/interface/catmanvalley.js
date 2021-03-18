/*
 * @Author: MrZhang
 * @Date: 2021-02-02 09:57:42
 * @Description: 前台接口
 */

const app = require("express").Router();
const catman = require('../../src/api/catman')
const multer = require('multer')
var upload = multer({ dest: './public/image/' }).single('file')
//查询列表总数
app.post('/entry', catman.entry)

//收藏
app.post('/editCollection', catman.editCollection)

//提交问题接口
app.post('/submitAQuestion', catman.submitAQuestion)

//上传视频
app.post('/uploads', upload, catman.uploads)

//上传图片
app.post('/uploadImage', upload, catman.uploadImage)

//上传图片
app.post('/imagearticle', upload, catman.imagearticle)



module.exports = app;