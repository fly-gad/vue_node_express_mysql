/*
 * @Author: MrZhang
 * @Date: 2021-02-01 18:34:29
 * @Description: 数据库连接配置
 */
const mysql = require('mysql');

module.exports = {
  config: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'backstage',
    port: '3306'
  },
  //使用连接池方式链接mysql数据库
  //连接池对象
  sqlconnection: function (sql, sqlArr, callback) {
    const pool = mysql.createPool(this.config)
    pool.getConnection((err, res) => {
      if (err) {
        return
      }
      //事件驱动回调
      res.query(sql, sqlArr, callback)
      //释放链接
      res.release()
    })
  },
  //异步回调
  SySqlconnection: function (sql, sqlArr) {
    return new Promise((reslove, reject) => {
      const pool = mysql.createPool(this.config)
      pool.getConnection((err, res) => {
        if (err) {
          reject(err)
        } else {
          //事件驱动回调
          res.query(sql, sqlArr, (err, data) => {
            if (err) {
              reject(err)
            } else {
              reslove(JSON.parse(JSON.stringify(data)))
            }
          })
          //释放链接
          res.release()
        }
      })
    }).catch((err) => { console.log(err) })
  }
}