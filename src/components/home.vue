<template lang="html">
    <div>
        <section class="banner">
            <mt-swipe :auto="50000">
                <mt-swipe-item v-for="item in swiper" class="swiper-slide"><img v-bind:src='item.src' v-bind:alt='item.alt'></mt-swipe-item>
            </mt-swipe>
        </section>
        <section class="content">
            <div class="content-total">
                <div class="totals-l">
                    <h3>233,892<var>人</var></h3>
                    <span>累计用户</span>
                </div>
                <div class="totals-r">
                    <h3>1,469,760,110<var>元</var></h3>
                    <span>累计融资额</span>
                </div>
            </div>
            <div class="content-notice">
                <div class="notice-icon">
                    <i class="notice-icon-new"></i>
                </div>
                <div class="notice-info"><a href="">淘金家进行系统维护和升级，期间可能会影...</a></div>
                <div class="notice-more"><a href="./notice.html">更多</a></div>
            </div>
            <div class="content-investment">
                <div class="investment-canvas">
                    <div class="canvas-title">新手专享</div>
                    <div v-canvas class="canvas-parent" id="canvasParent">
                        <canvas id="canvas" data-progress="80"></canvas>
                    </div>
                    <div class="canvas-info">
                        <p class="info-tit">年化收益</p>
                        <p class="info-num">18.0<var>%</var></p>
                        <p class="info-deadline">期限7天</p>
                        <p class="info-details">
                            可投金额<span>100-10000</span>元
                            <var>|</var>
                            已加入<span>56</span>人
                        </p>
                        <a href="#" class="info-btn" v-on:click="immediately">立即投资</a>
                        <p class="info-tips">
                            资金安全由富友金账户监控
                        </p>
                    </div>
                </div>
            </div>
            <div class="content-investment">
                <div class="investment-canvas">
                    <div class="canvas-title">月季盈B</div>
                    <div v-canvas class="canvas-parent" id="canvasParent1">
                        <canvas id="canvas1" data-progress="10"></canvas>
                    </div>
                    <div class="canvas-info">
                        <p class="info-tit">年化收益</p>
                        <p class="info-num investmentB">
                            7.0<var>%</var>&sim;18.0<var>%</var>
                        </p>
                        <p class="info-deadline">期限3&sim;12个月</p>
                        <p class="info-details">
                            可投金额<span>6.25</span>万元
                            <var>|</var>
                            已加入<span>56</span>人
                        </p>
                        <a class="info-btn" v-on:click="showPicker">立即投资</a>
                        <p class="info-tips">
                            资金安全由富友金账户监控
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-height"></div>

            <div class="content-news">
                <div class="news-top">
                    <div class="top-icon"></div>
                    <div class="top-tit">淘金家. 媒体报道</div>
                    <div class="top-more"><a href="./media.html">更多</a></div>
                </div>
                <div class="news-topline">
                    <a href="">
                        芭莎男士专访淘金家CEO杨蜀
                        <span>2016-09-06</span>
                    </a>
                </div>
            </div>

            <div class="bg-height"></div>

            <div class="content-safety">
                <div class="safety-top">
                    <div class="top-icon"></div>
                    <div class="top-tit">资金安全保障</div>
                    <div class="top-more"><a href="">更多</a></div>
                </div>
                <div class="safety-type">
                    <a href="">
                        <img src="../images/safety_funds.png" alt="">
                        资金安全
                    </a>
                    <a href="">
                        <img src="../images/safety_risk.png" alt="">
                        严格风控
                    </a>
                    <a href="">
                        <img src="../images/safety_law.png" alt="">
                        法律保障
                    </a>
                </div>
            </div>
            {{reversedMessage}}
            <button class="btn" type="button" name="button" v-on:click="increment">{{count}}</button>

            <div class="Loading">
                <img class="loading-img none" src="../images/loading.gif" alt="">
            </div>

        </section>

        <pickerTime
            v-bind:maxDate="'2020-12-12'"
            v-bind:minDate="'2010-10-10'"
            v-bind:setDate="'2017-11-11'"
            v-bind:resDate='data'
            v-on:on-result-change="onResultChange"
            ref="pickerTime"
        ></pickerTime>

    </div>
</template>

<script>
// import { Swipe, SwipeItem } from 'mint-ui';
import {mapState,mapActions} from 'vuex';
import libs from '../javascripts/main.js';
import img from '../images/top_banner.png';
import picker from './testComponents/pickerTime.vue';

var i = require('../images/top_banner.png')

export default {
    data(){
        return{
            date:null,
            // count:this.$store.state.StateRoute.count,
            counts:this.$store.state.StateRoute.count,
            message:"Hello",
            swiper:[
                {src:img,alt:"top_banner1"},
                {src:"http://static0.tuicool.com/images/upload/pingxx_right.jpg",alt:"top_banner2"},
                {src:img,alt:"top_banner3"},
            ]
        }
    },
    // 组件创建之前
    beforeCreate(){
        // console.log('beforeCreate');
    },
    // 模板编译/挂载之后(不保证组件已经存在document中)
    mounted(){
        // this.$Progress.finish();//进度条完成
    },
    // 组件创建完成
    created(){
        if(this.$store.state.StateUser==""){
            console.log('用户不存在')
        }else{
            console.log(this.$store.state.StateUser);
        }

        /*this.$Progress.start();//进度条开始
        this.$router.beforeEach((to,from,next)=>{
            if(to.meta.progress !== undefined){
                let meta = to.meta.progress;
                this.$Progress.parseMeta(meta);
            }
            this.$Progress.start();
            next();
        })
        this.$router.afterEach((to,from) => {
            this.$Progress.finish();
        })*/

    },
    // 导入其他组件
    components:{
        pickerTime:picker
    },
    // 局部自定义指令
    directives: {
        canvas: {
            // 当绑定元素插入到 DOM 中。
            inserted: function (el) {
                // el.focus();
                let canvasEleSlef = el.children[0].id;
                let  canvasEleParent= el.id;
                libs.drawCricle(canvasEleParent,canvasEleSlef,true,'#ff7900');
            }
        }
    },
    // 组件上挂载的方法
    methods:{
        // 映射 this.increment() 到 this.$store.dispatch('increment')
        // ...mapActions(['increment']);
        ...mapActions({
            increment:'incrementAsync'
        }),
        immediately(){

            this.$http.get('/api').then((res)=>{
                console.log(res);
            },(err)=>{
                console.log(err);
            })

        },
        // 带参数的actions
        /*increment () {
            this.$store.dispatch('incrementAsync',{amount:10});
        },
        decrement () {
        	this.$store.commit('decrement');
        }*/
        showPicker(){
            this.$refs.pickerTime.open();
        },
        onResultChange(val){
            this.data = val;
            console.log(this.data)
        }
    },
    // 组件的计算属性
    /*computed: {
        // count () {
        //     return this.$store.state.count
        // }
        reversedMessage(){
            return this.message.split('').reverse().join('');
        }
    },*/
    computed:mapState({
        count:state=>state.StateRoute.count,
        // 传入字符串 'count' 等同于 `state => state.count`
        countAlias:'count',
        countPlusLocalState(state){
            return state.StateRoute.count+this.localCount
        }
    }),
    watch:{
        'date'(val){
            console.log(val)
        }
    }
}
</script>
