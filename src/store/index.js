import Vue from 'vue';
import Vuex from 'vuex';
import StateUser from './user.js';
import StateRoute from './route.js';
import StateData from './data.js';

Vue.use(Vuex);

export default new Vuex.Store({
    /*
    *非生产环境下，使用严格模式
    *严格模式下，只要 Vuex 状态在 mutation 方法外被修改就会抛出错误。
    *只允许通过 mutation 来操作，确保所有状态修改都会明确的被调试工具跟踪
    */
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        StateUser,
        StateRoute,
        StateData,
    }
})
