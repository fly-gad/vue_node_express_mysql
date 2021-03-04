/*
 * @Author: MrZhang
 * @Date: 2021-02-20 15:49:56
 * @Description:路由
 */
import layout from '@/views/layout/index';

const routes = [
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/layout/login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/layout/404.vue')
    },
    {
        path: '/home',
        name: '功能',
        component: layout,
        redirect: '/home',
        children: [
            {
                path: '/',
                name: '首页',
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'pagination',
                name: '回答',
                component: () => import('@/views/home/pagination.vue')
            }
        ]
    }
];

export default routes;