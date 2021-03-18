/*
 * @Author: MrZhang
 * @Date: 2021-03-18 14:33:43
 * @Description:发布沙雕图接口
 */
const db = require("../../http/db")
const fs = require('fs')

//上传图片接口
const uploadImage = (req, res) => {
    if (req.file.length === 0) {
        res.render("error", { message: "上传文件不能为空！" });
        return
    } else {
        let file = req.file;
        fs.renameSync('./public/image/' + file.filename, './public/image/' + file.originalname);
        // 设置响应类型及编码
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        res.send({
            code: '200',
            msg: '成功',
            path: "http://127.0.0.1:8001/image/" + file.originalname
        })
    }
}

//沙雕图发布接口
const uploadImages = async (req, res) => {
    const { title, imgUrl } = req.body
    let sql = `INSERT INTO image(title,img_url,comm,create_time,browse) VALUES(?,?,?,?,?)`;
    let sqlArr = [title, imgUrl, '5434', '2020-12-13', 452];
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


//沙雕图列表接口
const imagearticle = async (req, res) => {
    let sql = 'select * from image';
    let sqlArr = [];
    let data = await db.SySqlconnection(sql, sqlArr)
    await conversion(data)
    if (data) {
        res.send({
            code: 200,
            msg: '成功',
            data: data
        })
    } else {
        res.send({
            code: 400,
            msg: '失败'
        })
    }
}


module.exports = {
    uploadImage,
    imagearticle,
    uploadImages
}