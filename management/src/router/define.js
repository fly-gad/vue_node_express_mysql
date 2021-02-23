/*
 * @Author: MrZhang
 * @Date: 2021-02-20 15:49:56
 * @Description:路由
 */

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
        component: () => import('@/views/home/index.vue'),
        children: [
            {
                path: 'test1',
                name: '表单',
                component: () => import('@/views/home/test1.vue')
            },
            {
                path: 'pagination',
                name: '分页',
                info:'xsxsxsx',
                component: () => import('@/views/home/pagination.vue')
            },
        ]
    }
];

export default routes;