/*
 * @Author: MrZhang
 * @Date: 2020-12-14 10:44:10
 * @Description: 坏境信息
 */

const ObliqueLineLast = function (value) {
  // 去掉末尾的 /
  if (value[value.length - 1] === '/') {
    return value.slice(0, -1);
  }
  return value;
}

const ObliqueLineFirst = function (value) {
  // 判断开头是否有 / 没有则补上
  if (value[0] !== '/') {
    return `/${value}`;
  }
  return value
}


const defaultOption = {
  VUE_APP_Path_login: '/login', // 登录地址
  VUE_APP_Path_dashboard: '/home',   // 首页
  VUE_APP_token: 'token',  // token 名称
  VUE_APP_API_timeout: 1000 * 5,// API 请求最大时间
  VUE_APP_API_baseurl: '/api',  // 接口默认路径
  VUE_APP_API_domain: 'http://127.0.0.1:8001', // 接口域名
};

const env = Object.assign({}, defaultOption, process.env)


// 判断末尾是否有 / 有则去掉
env.VUE_APP_API_domain = ObliqueLineLast(env.VUE_APP_API_domain);

// 判断开头是否有 / 没有则补上
// 判断末尾是否有 / 有则去掉
env.VUE_APP_API_baseurl = ObliqueLineLast(ObliqueLineFirst(env.VUE_APP_API_baseurl));


export { env }