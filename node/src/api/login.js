/*
 * @Author: MrZhang
 * @Date: 2021-02-23 10:41:47
 * @Description:登录接口
 */
const db = require("../../http/db")

//随机数
function randCode(value) {
    let casual = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var str = '';
    for (var i = 0; i < value; i++) {
        var ran = Math.floor(Math.random() * 62);
        str += casual.charAt(ran);
    }
    return str;
}

//是否发送过验证码
let sendCodeP = (phone) => {
    for (const item of validatePhoneCode) {
        if (phone === item.phone) {
            return true
        }
    }
    return false
}

let validatePhoneCode = []

//模拟验证码发送接口
sendCode = (req, res) => {
    let phone = req.body.phone;
    if (phone) {
        let code = randCode(4);
        validatePhoneCode.push({
            phone: phone,
            code: code
        })
        res.send({
            code: 200,
            msg: '成功',
            data: code
        })
    } else {
        res.send({
            code: 400,
            msg: '未输入手机号'
        })
    }

}

//用户是登录过
let findCodeAndPhone = (phone, code) => {
    for (let item of validatePhoneCode) {
        if (phone == item.phone && code == item.code) {
            return 'login'
        }
    }
    return 'error'

}

//用户是否注册
let phoneCodeBind = async (phone) => {
    let sql = `select * from user where username=? or phone=?`;
    let sqlArr = [phone, phone];
    let res = await db.SySqlconnection(sql, sqlArr)
    if (res.length) {
        res[0].userinfo = await getUserInfo(res[0].id)
        return res
    } else {
        //用户第一登录，绑定表
        let res = await regUser(phone)
        //获取用户附表
        res[0].userinfo = await getUserInfo(res[0].id)
        return res
    }
}

//用户注册方法
let regUser = async (phone) => {
    //监测用户是否第一次登录
    let userpic = 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF';
    let sql = `insert into user(username,userpic,phone,create_time) values(?,?,?,?)`;
    let sqlArr = [phone, userpic, phone, '2020-12-12-12'];
    let res = await db.SySqlconnection(sql, sqlArr)
    if (res.affectedRows == 1) {
        //获取用户信息
        let user = await getUser(phone)
        //创建附表
        let userinfo = await createUserInfo(user[0].id);
        if (userinfo.affectedRows == 1) {
            return user
        } else {
            return false
        }
    } else {
        return false
    }
}

//获取用户信息的方法
let getUser = async (username) => {
    console.log('username: ', username);
    let sql = `select * from user where id=? or phone=? or username=?`;
    let sqlArr = [username, username, username];
    return await db.SySqlconnection(sql, sqlArr)
}

//创建用户附表
let createUserInfo = async (user_id) => {
    let sql = `insert into userinfo(user_id,age,sex,job) values(?,?,?,?)`;
    let sqlArr = [user_id, 18, '男', '其他'];
    return await db.SySqlconnection(sql, sqlArr)
}

//获取用户附表信息
let getUserInfo = async (user_id) => {
    let sql = `select age,sex,job,path,birthday from userinfo where user_id`;
    let sqlArr = [user_id];
    return await db.SySqlconnection(sql, sqlArr)
}


//验证码登录接口
codePhoneLogin = async (req, res) => {
    let { phone, code } = req.body;
    //手机号是否发送过验证码
    if (sendCodeP(phone)) {
        let status = findCodeAndPhone(phone, code);
        if (status == 'login') {
            let code = randCode(32);
            let data = await phoneCodeBind(phone)
            res.send({
                "code": 200,
                "msg": '登录成功',
                "data": {
                    token: code,
                    id: data[0].id
                }
            })
        } else if (status == 'error') {
            res.send({
                code: 400,
                msg: '登录失败',
            })
        }
    } else {
        res.send({
            code: 400,
            msg: '未发送验证码',
        })
    }
}

/**判断是否是手机号**/
function isPhoneNumber(tel) {
    var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(tel);
}
//帐号密码登录
accountPassWordlogin = async (req, res) => {
    let { username, password } = req.body
    let sql = `select * from user where (username=? or  phone=?) and password=?`;
    let sqlArr = [username, username, password];
    let code = randCode(32);
    let data = await db.SySqlconnection(sql, sqlArr)
    if (data.length > 0) {
        res.send({
            code: 200,
            msg: '成功',
            data: {
                token: code,
                id: data[0].id
            }
        })
    } else {
        res.send({
            code: 400,
            msg: '失败'
        })
    }
}

//用户信息接口
accuntinfo = async (req, res) => {
    let { id } = req.body
    let data = await getUser(id)
    console.log('data: ', data);
    res.send({
        code: 200,
        msg: '成功',
        data: {
            data: data
        }
    })
}

//修改账户密码接口
modifypassword = async (req, res) => {
    let { id, password } = req.body
    let sql = `UPDATE user SET password=? WHERE id=?;`;
    let sqlArr = [password, id];
    let data = await db.SySqlconnection(sql, sqlArr);
    res.send({
        code: 200,
        msg: '成功',
        data: data
    })
}

//用户列表
user = async (req, res) => {
    let sql = `select * from user`;
    let sqlArr = [];
    let data = await db.SySqlconnection(sql, sqlArr);
    console.log('data: ', data);
    res.send({
        code: 200,
        msg: '成功',
        data: data
    })
}



module.exports = {
    sendCode,
    codePhoneLogin,
    accountPassWordlogin,
    modifypassword,
    accuntinfo,
    user
}