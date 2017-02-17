export default [
    {
        path: '/home',
        meta: {
            auth: false,
            title: '首页'
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
        component: resolve => require(['../components/investement/investementList.vue'], resolve)
    },
    {
        path: '/investement/:Datas',
        meta: {
            auth: false,
            title: '投资详情'
        },
        name: 'routeInvestementId',
        component: resolve => require(['../components/investement/investementDetails.vue'], resolve)
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
    },{
        path: '/picker',
        meta: {
            auth: false,
            title: '选择时间',
        },
        name: 'routePicker',
        component: resolve => require(['../components/testComponents/pickerTime.vue'],resolve)
    },
    {
        path: '/sliderRightClose',
        meta: {
            auth: false,
            title: '右滑动删除',
        },
        name: 'sliderRightClose',
        component: resolve => require(['../components/sliderRightClose.vue'],resolve)
    },
    {
        path: '/silder',
        meta: {
            auth: false,
            title: '幻灯片',
        },
        name: 'silder',
        component: resolve => require(['../components/testComponents/silder.vue'],resolve)
    },
    {
        path: '/switch',
        meta: {
            auth: false,
            title: '开关',
        },
        name: 'switch',
        component: resolve => require(['../components/testComponents/switch.vue'],resolve)
    },
    {
        path: '/systemcompoents',
        meta: {
            auth: false,
            title: '系统组件列表',
        },
        name: 'systemcompoents',
        component: resolve => require(['../components/SystemComponents.vue'],resolve)
    },
    {
        path: '/loadmore',
        meta: {
            auth: false,
            title: '加载',
        },
        name: 'loadmore',
        component: resolve => require(['../components/testComponents/loadmore.vue'],resolve)
    },
    {
        path: '*',
        redirect: {name:'routeHome'}
    }
]
