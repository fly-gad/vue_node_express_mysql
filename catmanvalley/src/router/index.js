/*
 * @Author: MrZhang
 * @Date: 2021-02-19 14:55:57
 * @Description: 路由入口
 */
import Vue from 'vue';
import routes from './define';
import VueRouter from 'vue-router';
import { env } from '@/util/env/index';
import * as User from '@/util/user/user';

Vue.use(VueRouter)

const beforeEach = function (to, from, next) {
  // 当前页面
  const { path: toPath } = to
  // 上一个页面
  const { path: fromPath } = from
  // 判断用户信息是否存在
  if (User.get()) {
    // 刷新用户信息缓存
    User.sync();
    // 已登录
    // 如果当前页面是 / 或者登录页
    if (toPath === '/' || toPath === env.VUE_APP_Path_login) {
      // 判断上一个页面是否为首页
      if (fromPath !== env.VUE_APP_Path_dashboard) {
        // 跳转到首页
        return next({ path: env.VUE_APP_Path_dashboard });
      }
    }
  } else {
    // 未登录
    //如果跳转的页面不是登录页
    if (toPath !== env.VUE_APP_Path_login) {
      // 重定向到登录页
      return next({ path: env.VUE_APP_Path_login });
    }
  }

  // 不做任何处理，执行下一步
  return next();
}

// 创建路由
const router = new VueRouter({
  routes
});

router.beforeEach(beforeEach);

export default router
