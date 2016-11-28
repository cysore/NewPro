export default [
    {
        path: '/home',
        meta: {
            auth: false,
            title: '首页',
            progress: {
                func: [
                    {call: 'color', modifier: 'temp', argument: '#ffb000'},
                    {call: 'fail', modifier: 'temp', argument: '#6e0000'},
                    {call: 'location', modifier: 'temp', argument: 'top'},
                    {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.1s'}}
                ]
            }
        },
        name: 'routeHome',
        component: resolve => require(['../components/home.vue'], resolve)
    },
    {
        path: '/investement',
        meta: {
            auth: false,
            title: '投资'
        },
        name: 'routeInvestement',
        component: resolve => require(['../components/investement.vue'], resolve)
    },
    {
        path: '/investement/:Datas',
        meta: {
            auth: false,
            title: '投资详情'
        },
        name: 'routeInvestementId',
        component: resolve => require(['../components/investementDetails.vue'], resolve)
    },
    {
        path: '/media',
        meta: {
            auth: true,
            title: '媒体'
        },
        name: 'routeMedia',
        component: resolve => require(['../components/media.vue'], resolve)
    },
    {
        path: '/my',
        meta: {
            auth: true,
            title: '我的设置',

        },
        name: 'routeMy',
        component: resolve => require(['../components/my.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            auth: true,
            title: '登录',
        },
        name: 'routeLogin',
        component: resolve => require(['../components/login.vue'],resolve)
    },
    {
        path: '*',
        redirect: {name:'routeHome'}
    }
]
