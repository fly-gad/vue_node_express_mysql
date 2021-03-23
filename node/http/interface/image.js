/*
 * @Author: MrZhang
 * @Date: 2021-03-18 14:35:34
 * @Description: 发布图片接口公共入口
 */
const app = require("express").Router();
const image = require('../../src/catmanvalley_api/image')
const multer = require('multer')
var uploadImage = multer({ dest: './public/image/' }).single('file')

//上传图片接口
app.post('/uploadImage', uploadImage, image.uploadImage)

//发布沙雕图接口
app.post('/uploadImages', image.uploadImages)

//沙雕图列表接口
app.post('/imagearticle', image.imagearticle)

module.exports = app;