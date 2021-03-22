/*
 * @Author: MrZhang
 * @Date: 2021-02-02 15:24:09
 * @Description:接口
 */
const db = require("../../http/db")
const moment = require("moment")
const fs = require('fs')

//时间格式转换
conversion = (time) => {
    for (const iterator of time) {
        iterator.create_time = moment(iterator.create_time).format('YYYY-MM-DD HH:mm');
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
    if (params.favorites) {
        console.log('params.favorites: ', params.favorites);
        sql += " WHERE favorites=?";
        sqlArr.push(params.favorites);
    }
    let data = await db.SySqlconnection(sql, sqlArr)
    await conversion(data)
    if (data) {
        res.send({

            code: 200,
            msg: '成功',
            data: data,
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
    const { title, details, type, create_time } = req.body
    let sql = `INSERT INTO entry(title,details,comm,favorites,likes,create_time,browse,type)
    VALUES(?,?,?,?,?,?,?,?)`;
    let sqlArr = [title, details, '5434', '1', '545', create_time, 452, type];
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

//修改头像接口
const editUserImg = (req, res) => {
    const { user_id, imgUrl } = req.body
    console.log('req.body: ', req.body);
    let sql = "update  user set userpic=? where id=?";
    let sqlArr = [imgUrl, user_id];
    db.sqlconnection(sql, sqlArr, (err, data) => {
        if (err) {
            console.log('err: ', err);
        } else {
            if (data.affectedRows == 1) {
                res.send({
                    'code': 200,
                    'msg': '修改成功',
                    'url': imgUrl
                });
            } else {
                res.send({
                    'code': 500,
                    'msg': '修改失败'
                });
            }
        }
    })

}

//收藏接口
const editCollection = async (req, res) => {
    const { id, favorite } = req.body
    let sql = 'UPDATE entry SET favorites=? WHERE id=?;';
    let sqlArr = [favorite, id];
    let data = await db.SySqlconnection(sql, sqlArr)
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

}


module.exports = {
    entry,
    submitAQuestion,
    editUserImg,
    editCollection,
}