/*
 * @Author: MrZhang
 * @Date: 2021-02-26 13:51:33
 * @Description:
 */
/*
 * @Author: MrZhang
 * @Date: 2021-02-02 15:24:09
 * @Description:接口
 */
const db = require("../../http/db")
const dayjs = require("dayjs")
const fs = require('fs')
// 时间格式转换
formateDate = (time) => {
    let date = dayjs(time).format();
    const arr = date.split("T");
    const d = arr[0];
    const darr = d.split("-");
    const t = arr[1];
    const tarr = t.split(".000");
    const marr = tarr[0].split(":");
    const dd =
        parseInt(darr[0]) +
        "-" +
        parseInt(darr[1]) +
        "-" +
        parseInt(darr[2]) +
        " " +
        parseInt(marr[0]) +
        ":" +
        parseInt(marr[1]) +
        ":" +
        parseInt(marr[2]);
    return dd;
}
adas = (time) => {
    for (const iterator of time) {
        iterator.create_time = formateDate(iterator.create_time)
    }
}
//查询列表总数
const entry = async (req, res) => {
    const params = req.body
    let sql = 'select * from entry';
    let sqlArr = [];
    if (params.id) {
        sql += " where id=?"
        sqlArr.push(params.id)
    }
    if (params.page || params.page_size) {//开启分页
        let current = params.page;//当前页码
        let pageSize = params.page_size;//一页展示多少条数据
        sql += " order by browse desc limit ?,?";
        sqlArr.push((current - 1) * pageSize, parseInt(pageSize));
    }
    if (params.search) {
        sql += " WHERE title LIKE ?";
        sqlArr.push("%" + params.search + "%");
    }
    let data = await db.SySqlconnection(sql, sqlArr)
    await adas(data)
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

//提交问题
const submitAQuestion = async (req, res) => {
    const { title, details } = req.body
    let sql = `INSERT INTO entry(title,details,comm,favorites,likes,create_time,browse)
    VALUES(?,?,?,?,?,?,?)`;
    let sqlArr = [title, details, '5434', '1', '545', '2020-12-13', 452];
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
// //上传
// const uploads = (req, res) => {
//     res.send({
//         code: '200',
//         msg: '成功',
//         type: 'single',
//         originalname: req.file.originalname,
//         path: req.file.path
//     })
// }

//上传视频
const uploads = (req, res) => {
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
//上传图片
const uploadImage = (req, res) => {
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.render("error", { message: "上传文件不能为空！" });
        return
    } else {
        let file = req.file;
        console.log('file: ', file);
        fs.renameSync('./public/image/' + file.filename, './public/image/' + file.originalname);
        // 设置响应类型及编码
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        res.send({
            code: '200',
            msg: '成功',
            type: 'single',
            originalname: file.originalname,
            path: "http://127.0.0.1:8001/image/" + file.originalname
        })
    }
}

module.exports = {
    entry,
    submitAQuestion,
    uploads,
    uploadImage
}