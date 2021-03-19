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
                path: 'reply',
                name: '回答',
                component: () => import('@/views/home/reply.vue')
            },
            {
                path: 'video',
                name: '视频',
                component: () => import('@/views/home/video.vue')
            },
            {
                path: 'problem',
                name: '问题',
                component: () => import('@/views/home/problem.vue')
            },
            {
                path: 'favorites',
                name: '收藏',
                component: () => import('@/views/home/favorites.vue')
            },
            {
                path: 'detail',
                name: '文章细节',
                component: () => import('@/views/home/detail.vue')
            }
        ]
    },
    {
        path: '/settings',
        name: '设置',
        component: () => import('@/views/settings/index.vue'),
        redirect: '/settings/account',
        children: [
            {
                path: 'account',
                name: '帐号与密码',
                component: () => import('@/views/settings/account.vue')
            },
            {
                path: 'filter',
                name: '屏蔽',
                component: () => import('@/views/settings/filter.vue')
            }
        ]
    }
];

export default routes;