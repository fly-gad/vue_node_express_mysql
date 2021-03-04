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
    let sql = 'select *from entry';
    let sqlArr = [];
    let data = await db.SySqlconnection(sql, sqlArr)
    await adas(data)
    try {
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

    } catch (error) {
        console.log('error: ', error);
    }

}

module.exports = {
    entry
}