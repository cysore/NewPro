<template lang="html">
    <section class="mark">

        <div
        class="page-loadmore-wrapper"
        ref="wrapper"
        v-bind:style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore
            class="page-loadmore"
            v-bind:top-method="loadTop"
            @top-status-change="handleTopChange"
            ref="loadmore"
            v-bind:bottom-method="loadBottom"
            @bottom-status-change="handleBottomChange"
            v-bind:bottom-all-loaded="allLoaded"
            >

                <div class="mark-list " v-for="item in listData">
                    <div class="list-top">
                        <div class="top-img">
                            <img v-if="item.isNew" src="../images/newbie.png" alt="">
                        </div>
                        <div class="top-tit">{{item.title}}</div>
                        <div class="top-right"><img src="../images/guarantee.png" alt="">安全保证</div>
                    </div>
                    <div class="list-info">
                        <div class="info-earnings">
                            <span>年化收益</span>
                            <p>{{item.earnings}}<var>%</var></p>
                        </div>
                        <div class="info-deadline">
                            <span>期限</span>
                            <p>{{item.date}}<var>天</var></p>
                        </div>
                        <div class="info-start">
                            <span>限投{{item.num}}元</span>
                            <a v-on:click="startInvestementDetails(item,$event)">立即投资</a>
                        </div>
                    </div>
                </div>


                <div slot="top" class="mint-loadmore-top">
                    <span
                    v-show="topStatus !== 'loading'"
                    v-bind:class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <div v-show="topStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </div>
                </div>

                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>

            </mt-loadmore>
        </div>

    </section>

</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';
export default {
    data(){
        return {
            topStatus: '',
            allLoaded: false,
            bottomStatus: '',
            wrapperHeight: 0,
            listData:[],
            cacheListData:this.$store.getters.GET_DATA,
            clickElementOffsetTop:this.$store.getters.GET_OFFSETTOP,
        }
    },
    methods:{
        //映射store里的actions
        ...mapActions(['investementListCacheDataSyns','saveClickElementOffsetTopSyns']),
        // 跳转指定详情页
        startInvestementDetails(data,e){
            // console.log(e.path[0].offsetTop);
            // 获取点击时的按钮定位
            this.saveClickElementOffsetTopSyns(this.$refs.wrapper.scrollTop);
            // 进行url编码
            let enrl = encodeURI(JSON.stringify(data));
            // 自定义路由跳转需要路由名且根据需要带参数，若无路由名，则必须指定路径跟所需参数。
            this.$router.push({
                path:'/investement',
                name:'routeInvestementId',
                params:{Datas:enrl}
            })
        },
        // 上拉刷新更新状态
        handleTopChange(status){
            this.topStatus = status;
        },
        // 下拉加载更新状态
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        // 刷新数据
        loadTop(id){
            setTimeout(() => {
            // console.log(this.$store.state.StateData.investementListCacheData.length);
                for (let i = 0; i < 1; i++) {
                    let obj = {
                        isNew:true,
                        title:'首投专享down',
                        earnings:Math.floor(Math.random()*10)*i,
                        date:i*10,
                        num:1000*i
                    };
                    this.listData.unshift(obj);
                    this.investementListCacheDataSyns(obj);
                }

                this.$refs.loadmore.onTopLoaded(id);
            }, 1000);
        },
        // 加载数据
        loadBottom(id) {
            // this.allLoaded = true;// 若数据已全部获取完毕
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    let obj = {
                        isNew:true,
                        title:'首投专享up',
                        earnings:Math.floor(Math.random()*10)*i,
                        date:i*10,
                        num:1000*i
                    };
                    this.listData.push(obj);
                    this.investementListCacheDataSyns(obj);
                }

                this.$refs.loadmore.onBottomLoaded(id);
            }, 1500);
        },

    },
    beforeCreate(){
        console.log(this.$store.getters.GET_DATA);
        console.log(this.$store.getters.GET_OFFSETTOP);
    },
    // 组件创建完成时调用
    created(){
        // 判断store里面的investementListCacheData是否存在，如果存在直接转换成数组复制给this.cacheListData
        // 如果不存在直接重新请求数据，并存入store中的investementListCacheData里面
        if(this.cacheListData!=0){
            this.listData=Array.prototype.slice.call(this.cacheListData);
        }else{
            for(let i=1;i<=5;i++){
                let obj={
                    isNew:true,
                    title:'首投专享',
                    earnings:Math.floor(Math.random()*10)*i,
                    date:i*10,
                    num:1000*i
                };
                this.listData.unshift(obj);
                this.investementListCacheDataSyns(obj);
            }
        }

        // this.investementListCacheDataSyns(this.listData);
        // console.log(this.$store.state.StateData.investementListCacheData);
    },
    mounted(){
        let footerH = (window.getComputedStyle(document.getElementsByTagName('footer')[0]).getPropertyValue('height')).replace(/px/g,'');
        this.wrapperHeight=document.documentElement.clientHeight-this.$refs.wrapper.getBoundingClientRect().top;
        // console.log(this.$refs.wrapper.scrollHeight);
        // console.log(this.$refs.wrapper.offsetTop);

        // 用户返回列表页面时定位当前foosettop值
        if(this.clickElementOffsetTop!=0){
            // console.log(this.clickElementOffsetTop);
            this.$refs.wrapper.scrollTop=this.clickElementOffsetTop;
        }

    }
}
</script>
