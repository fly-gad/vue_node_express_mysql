/*
 * @Author: MrZhang
 * @Date: 2021-02-02 15:24:09
 * @Description:接口
 */
const db = require("../../http/db")

const number = async () => {
    let sql = 'select count(*) as count from list';
    let sqlArr = [];
    let res = await db.SySqlconnection(sql, sqlArr)
    console.log('res: ', res);
    return res[0].count
}

//分页+字段搜索
const lists = async (req, res) => {
    var params = req.query || req.params;
    let sql = "SELECT * FROM `list`";
    let sqlArr = [];
    let isMore = false;//是否有多个查询参数
    if (params.id) {
        sql += " WHERE id=?";
        sqlArr.push("%" + params.id + "%");
        isMore = true;
    }
    if (params.name) {
        sql += " WHERE name LIKE ?";
        sqlArr.push("%" + params.name + "%");
        isMore = true;
    }
    if (params.features) {
        if (isMore) {//true代表有多个参数
            sql += "and features like ?";//and是两个条件都必须满足，or是或的关系
        } else {
            sql += " WHERE features LIKE ?";
        }
        sqlArr.push("%" + params.features + "%");
    }
    if (params.page || params.page_size) {//开启分页
        let current = params.page;//当前页码
        let pageSize = params.page_size;//一页展示多少条数据
        sql += " limit ?,?";
        sqlArr.push((current - 1) * pageSize, parseInt(pageSize));
    }
    let length = await number()
    console.log('length: ', length);
    let callback = (err, data) => {
        console.log('data: ', data.length);
        if (err) {
            res.send({
                code: 400,
                msg: '失败'
            })
        } else {
            res.send({
                code: 200,
                msg: '成功',
                data: {
                    list: data,
                    total: data.length,
                    page: Number(params.page) || 1,
                    page_size: Number(params.page_size) || 10
                },
            })
        }
    }
    db.sqlconnection(sql, sqlArr, callback)
}


module.exports = {
    lists
}