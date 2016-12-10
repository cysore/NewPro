import Vue from 'vue'

export default {
    // state: JSON.parse(sessionStorage.getItem('user')) || {},
    state:{
        user        :'',
        notLoginName:'',
    },
    mutations: {
        /**
         * 登录成功
         *
         * @param {Object} state
         * @param {Object} user
         */
        USER_SIGNIN(state, user) {
            state.user = user;

            // sessionStorage.setItem('user', JSON.stringify(user))
            // Object.assign(state, user)//合并对象
        },
        /**
         * 退出登录
         *
         * @param {Object} state
         */
        USER_SIGNOUT(state) {
            state.user = '';

            // sessionStorage.removeItem('user')
            // Object.keys(state).forEach(k => Vue.delete(state, k))
        },
        /**
        *存储未登录之前需要访问的路由名
        *
        */
        USER_NOT_LOGIN_NAME(state,routeName){
            state.notLoginName = routeName;
        }
    },
    actions: {
        /**
        *用户登录
        */
        USER_SIGNIN_Sync({commit}, user) {
            commit('USER_SIGNIN', user)
        },
        /**
        *用户退出
        */
        USER_SIGNOUT_Sync({commit}) {
            commit('USER_SIGNOUT')
        },
        /**
        *登录前需要访问的路由
        */
        USER_NOT_LOGIN_NAME_Sync({commit},routeName){
            commit('USER_NOT_LOGIN_NAME',routeName);
        }
    },
    getters:{
        /*
        *获取用户是否登录
        */
        GET_USER(state){
            return state.user ? true : false;
        }
    }
}
