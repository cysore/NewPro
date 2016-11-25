export default {
    // 在严格模式下，只要 Vuex 状态在 mutation 方法外被修改就会抛出错误。这确保了所有状态修改都会明确的被调试工具跟踪
    // strict: process.env.NODE_ENV !== 'production',
    // 初始
    state:{
        count:0,//累加计算
        routeName:'',//路由名称
        noLoginRouteName:'',//未登录之前的路由名
        user:'',//用户信息
    },
    // 改变
    mutations:{
        increment(state){
            state.count++
        },
        ROUT_ENAME(state,payload){
            state.routeName=payload;
        },
        NO_LOGIN_ROUT_ENAME(state,payload){
            state.noLoginRouteName=payload;
        },
        SIGNIN(state,payload){
            state.user=payload;
        },
    },
    // 动作
    actions:{
        increment({commit}){
            commit('increment')
        },
        // 异步增加
        incrementAsync({state,commit},payload){
            setTimeout(()=>{
                commit('increment');
            },1000)
        },
        // 登录
        signinSync({commit},payload){
            commit('SIGNIN',payload);
        },
        // 路由名称
        routeNameSync({commit},payload){
            commit('ROUT_ENAME',payload);
        },
        // 未登录之前访问的路由地址
        noLoginRouteNameSync({commit},payload){
            commit('NO_LOGIN_ROUT_ENAME',payload);
        },
    },
    // 计算属性(用于多个组件获取推导后的状态值)
    getters:{
        /**
        *@param 默认第一个参数为当前state
        *@param 第二个函数也可接受其他getters作为参数
        *@param 在模块getter内，rootState根状态作为第三个参数
        */
        done(state){
            return state.count+10;
        }
    }
}
