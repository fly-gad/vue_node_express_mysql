/*
 * @Author: MrZhang
 * @Date: 2021-03-18 14:35:34
 * @Description: 发布图片接口公共入口
 */
const app = require("express").Router();
const video = require('../../src/catmanvalley_api/video')
const multer = require('multer')
var uploads = multer({ dest: './public/uploads/' }).single('file')

//上传视频
app.post('/uploadVideo', uploads, video.uploadVideo)

//上传视频
app.post('/releaseVideo', uploads, video.releaseVideo)

module.exports = app;