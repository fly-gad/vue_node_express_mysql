/*
 * @Author: MrZhang
 * @Date: 2021-03-18 14:33:43
 * @Description:发布沙雕图接口
 */
const db = require("../../http/db")
const fs = require('fs')

//上传视频接口
const uploadVideo = (req, res) => {
    if (req.file.length === 0) {
        res.render("error", { message: "上传文件不能为空！" });
        return
    } else {
        let file = req.file;
        let fileInfo = {};
        fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname);
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        res.send({
            code: '200',
            msg: '成功',
            type: 'single',
            originalname: req.file.originalname,
            path: "http://127.0.0.1:8001/uploads/" + file.originalname
        })
    }
}

//发布视频接口
const releaseVideo = async (req, res) => {
    const { title, details, type } = req.body
    let sql = `INSERT INTO entry(title,details,comm,favorites,likes,create_time,browse,type)
    VALUES(?,?,?,?,?,?,?,?)`;
    let sqlArr = [title, details, '5434', '1', '545', '2020-12-13', 452, type];
    let data = await db.SySqlconnection(sql, sqlArr)
    try {
        if (data) {
            res.send({
                code: 200,
                msg: '成功',
            })
        } else {
            res.send({
                code: 400,
                msg: '失败'
            })
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = {
    uploadVideo,
    releaseVideo
}