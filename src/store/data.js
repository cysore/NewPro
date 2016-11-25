export default {
    // 初始
    state:{
        investementListCacheData:[],//投资列表缓存
        saveClickElementOffsetTop:0,//投资列表上的offsetTop值，用于返回投资列表时定位
    },
    // 改变
    mutations:{
        INVESTEMENT_LIST_CACHE_DATA(state,payload){
            state.investementListCacheData.push(payload);
        },
        SAVE_CLICK_ELEMENT_OFFSET_TOP(state,paylod){
            state.saveClickElementOffsetTop=paylod;
        }
    },
    // 动作
    actions:{
        // 投资列表数据缓存
        investementListCacheDataSyns({commit},payload){
            commit('INVESTEMENT_LIST_CACHE_DATA',payload);
        },
        // 投资列表返回定位offsetTop
        saveClickElementOffsetTopSyns({commit},payload){
            commit('SAVE_CLICK_ELEMENT_OFFSET_TOP',payload);
        }
    },
    // 计算属性(用于多个组件获取推导后的状态值)
    getters:{
        /**
        *获取投资列表的数据缓存
        *@param 默认第一个参数为当前state
        *@param 第二个函数也可接受其他getters作为参数
        *@param 在模块getter内，rootState根状态作为第三个参数
        **/
        GET_DATA(state){
            return state.investementListCacheData;
        },
        /**
        *获取投资列表offsetTop的位置
        *
        **/
        GET_OFFSETTOP(state){
            return state.saveClickElementOffsetTop;
        }
    }
}
