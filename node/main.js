/*
 * @Author: MrZhang
 * @Date: 2021-02-01 18:34:29
 * @Description: 文件入口
 */
//引入express模块
var express = require('express');
var app = express();
// CORS模块，处理web端跨域问题
const cors = require('cors')
app.use(cors())

//设置相对路径
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//body-parser 解析表单中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//引入接口模块后台
let login = require('./http/interface/login');
app.use('/api', login);

//引入接口模块前台
let catmanvalley = require('./http/interface/catmanvalley');
app.use('/api', catmanvalley);

//引入沙雕图发布模块接口
let image = require('./http/interface/image');
app.use('/api', image);

//引入环境变量
const { env } = require('./http/env')
//启动服务，端口3000
app.listen(env.port, env.hostname, () => {
  console.log(`服务器运行在 http://${env.hostname}:${env.port}/`)
})