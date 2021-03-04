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
        path: '/fogret',
        name: '忘记密码',
        component: () => import('@/views/system/forget.vue')
    },
    {
        path: '/home',
        name: '功能',
        component: layout,
        redirect: '/home/test1',
        children: [
            {
                path: 'test1',
                name: '表单',
                component: () => import('@/views/home/test1.vue')
            },
            {
                path: 'pagination',
                name: '分页',
                component: () => import('@/views/home/pagination.vue')
            }
        ]
    },
    {
        path: '/system',
        name: '帐号管理',
        component: layout,
        children: [
            {
                path: 'modifypass',
                name: '修改密码',
                component: () => import('@/views/system/modifypass.vue')
            },
            {
                path: 'index',
                name: '个人信息',
                component: () => import('@/views/system/index.vue')
            }
        ]
    },
    {
        path: '/settings',
        name: '设置',
        component: () => import('@/views/settings/index.vue'),
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