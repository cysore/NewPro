// import './flexiblecssjs.js';//导入手淘适配解决方案

//firstClick
document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body);
}, false);

import Vue from 'vue';// vue core
import App from './App.vue';// root component
import VueRouter from "vue-router";// vue router
import VueResource from 'vue-resource';// vue http get or post
import NProgress from 'nprogress';// vue nprogress loading bar
// import Element from 'element-ui'
// Vue.use(Element)

import routes from './routers/routers.js';//导入路由配置
import * as types from './store/types.js';//导入命名空间

import Mint from 'mint-ui';// mintUI
import 'mint-ui/lib/style.css';// mintUI 样式
import './styles/main.less';// 所有文件样式
import 'nprogress/nprogress.css';// 进度条样式

import tool from '../plugin/tool/tool.js';

import directives from './directive/touch.js';
directives(Vue);

// NProgress 进度条配置
NProgress.configure({
    minimum : 0.1,//在开始使用的最小百分比变化
    easing: 'ease',
    speed: 1500,
    showSpinner:false,//关闭旋转圈
})



//开启debug模式
Vue.config.debug = true;
Vue.use(VueRouter);//vue使用路由配置
Vue.use(VueResource);//vue使用响应请求
Vue.use(Mint);//使用mintUI
Vue.use(tool);//使用自定义插件方法

// 引入创建的Store
import store from './store/index.js';
let Store = store.state;

// 创建一个路由器实例
const router = new VueRouter({
    mode: 'history',
    routes: routes
})



// 路由请求拦截之前
let indexScrollTop = 0;
router.beforeEach((to,from,next)=>{
    NProgress.start();

    // let {auth = true} = to.meta;
    let auth = to.meta.auth;
    let isLogin = Store.StateUser.user=='' ? false : true; //true用户已登录， false用户未登录

    // 授权匹配
    if (auth && !isLogin && to.path !== '/login') {
        // 登录前的路由名通过 dispatch 分发转存到state里面，方便登录后直接跳转到目标路径
        store.dispatch('USER_NOT_LOGIN_NAME_Sync',to.name);
        return next({ path: '/login' });
    }

    // dispatch 分发转存路由名称(actions)
    store.dispatch('routeNameSync',to.name);

    // 返回路径列表滚动条定位
    if(to.path !== '/investement'){
        indexScrollTop = document.body.scrollTop;
    }

    // 设置路由页面文档标题
    document.title = to.meta.title || document.title;

    next();
})

/**
*注入http请求拦截器
*使用进度条显示载入
*/
Vue.http.interceptors.push((request, next) => {
    NProgress.start();

    next((response)=>{
        NProgress.done();
    });
});

// 路由请求完成之后
router.afterEach(to=>{

    NProgress.done();
    /*
    *定位列表页的scrollTop值，便于访问完详情页后返回上一次的位置
    *但是不能使用this.$router.go(-1)进行返回操作，
    *只能使用<router-link to="/">来进行返回
    */
    if (to.path !== '/investement') {
        document.body.scrollTop = 0;
    } else {
        Vue.nextTick(() => {
            document.body.scrollTop = indexScrollTop;
        });
    }
})

import libs from './javascripts/main.js';

//路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
    data:libs,
    router,// 注册路由
    store,// 注册 store 对象。将会把 store 实例注入到所有子组件。子组件使用this.$store.state来访问
    components:{App},
    render: h => h(App)//渲染入口组件
}).$mount('#app')
