/*
 * @Author: MrZhang
 * @Date: 2021-02-19 14:54:43
 * @Description: 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/base.scss';

Vue.config.productionTip = false

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
