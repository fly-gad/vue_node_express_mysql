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
        sql = "select * from (SELECT e.*,u.userpic,u.alias FROM user u, entry e where u.id = e.user_id) ss where ss.id=?"
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
    const { title, details, type, create_time, user_id } = req.body
    let sql = `INSERT INTO entry(title,details,comm,favorites,likes,create_time,browse,type,user_id)
    VALUES(?,?,?,?,?,?,?,?,?)`;
    let sqlArr = [title, details, '0', '1', '0', create_time, 0, type, user_id];
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

//点赞-喜欢
const pointlike = async (req, res) => {
    const { point_like, id } = req.body
    let sql = 'UPDATE entry SET likes=? WHERE id=?';
    let sqlArr = [point_like + 1, id];
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

//浏览次数
const browseNum = async (req, res) => {
    const { browse_num, id } = req.body
    let sql = 'UPDATE entry SET browse=? WHERE id=?';
    let sqlArr = [browse_num + 1, id];
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

//回复
const discuss = async (req, res) => {
    const { id, substance, create_time, user_id } = req.body
    let sql = 'INSERT INTO reply (entry_id,substance,create_time,user_id) VALUES (?,?,?,?)';
    let sqlArr = [id, substance, create_time, user_id];
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

//回复列表
const discussList = async (req, res) => {
    const { id } = req.body
    let sql = 'select * from (SELECT r.*,u.userpic,u.alias FROM user u, reply r where u.id = r.user_id) ss where ss.entry_id=?';
    let sqlArr = [id];
    let data = await db.SySqlconnection(sql, sqlArr)
    conversion(data)
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

//举报
const reportNum = async (req, res) => {
    const { contants, create_time, user_id, entry_id } = req.body
    let sql = `INSERT INTO report(contants,create_time,user_id,entry_id)
    VALUES(?,?,?,?)`;
    let sqlArr = [contants, create_time, user_id, entry_id];
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
    entry,
    submitAQuestion,
    editUserImg,
    editCollection,
    pointlike,
    browseNum,
    discuss,
    discussList,
    reportNum
}