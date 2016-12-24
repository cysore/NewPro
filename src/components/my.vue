<template lang="html">
    <section class="my">
        <div class="my-top">
            <div class="top-tips">总资产(元)</div>
            <div class="top-total">302,501.00</div>
            <div class="top-earnings">
                <div class="earnings-l">
                    26205.00
                    <p>待收本金(元）</p>
                </div>
                <div class="earnings-c">
                    703.00
                    <p>预期收益(元)</p>
                </div>
                <div class="earnings-r">
                    1283.90
                    <p>累积收益(元)</p>
                </div>
            </div>
        </div>
        <div class="my-balance">
            <p>可用余额:<var>2258.60</var>元</p>
            <a class="balance-pay" href="">提现</a>
            <a class="balance-embody" href="">充值</a>
        </div>

        <ul class="my-menu">
            <li>
                <a href="">
                    <img src="../images/1.png" alt="">
                    <span>我的红包</span>
                    <var>2</var>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../images/2.png" alt="">
                    <span>邀请奖励</span>
                    <var>2</var>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../images/3.png" alt="">
                    <span>投资记录</span>
                    <var>2</var>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../images/4.png" alt="">
                    <span>交易记录</span>
                    <var>2</var>
                </a>
            </li>
        </ul>

        <ul class="my-menu">
            <li>
                <a href="">
                    <img src="../images/5.png" alt="">
                    <span>预约投资</span>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../images/6.png" alt="">
                    <span>账户设置</span>
                </a>
            </li>
            <li>
                <a v-on:click="logout">
                    <span>退出登录</span>
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';
import libs from '../javascripts/main.js';

export default {
    data(){
        return{
            msg:'myvue',
            articles:[]
        }
    },
    computed:{
        // 映射store里面的state到this上(use:this.StateUser)
        ...mapState(['StateUser']),
    },
    created(){
        // store 上保存的用户信息
        // console.log(this.StateUser.user);
    },
    beforeCreate(){
        /*let a = new Promise((resolve,reject) => {
            this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10').then(function(data){
                data.status == 200 ? resolve(data) : reject(data);
            });
        })
        let b = new Promise((resolve,reject) => {
            fetch('api/login',{
                method:'POST',
                body:{user:123,pass:'123'}
            }).then(function(data){
                if(data.status == 200){
                    data.json().then((d)=>{resolve(d)});
                }else{
                    reject(data);
                }
            }).catch((e)=>{console.log(e)});
        })*/


        var req1 = new Request('api/login',{
            method:'post',
            cache:'reload',
            body:{user:123,pass:'123'}
        })
        var req2 = new Request('api/selectUser',{
            method:'GET',
            cache:'reload',
            params:{user:123,pass:'123'}
        })
        var req3 = new Request('https://api.douban.com/v2/movie/top250?count=10',{
            method:'get',
            mode:'no-cors'
        })
        // 同步等待执行async
        let asyncPromise = async function(){
            try{
                let get1 = await libs.Fetch(req1);
                console.log(get1.json().then(d => {console.log(d)}));
                let get2 = await libs.Fetch(req2);
                console.log(get2.json().then(d => {console.log(d)}));
            }catch(err){
                console.log(err);
            }
        }
        asyncPromise();

        // 设置头信息
        /*let headers = new Headers();
            headers.append("Content-Type", "text/plain");
            headers.append("Content-Length", '36');
            headers.append("X-Custom-Header", "ProcessThisImmediately");
        */


        // 单独使用
        /*libs.Fetch(req2).then((d) => {
            console.log(d)
        });*/


        // promise并发多个请求
        /*Promise.all([a,b]).then((data) => {
            console.log(data);
        },(err) => {
            console.log(err);
        })*/

        /*this.$http.jsonp(
            'https://api.douban.com/v2/movie/top250?count=10',
        ).then(function(response) {
            // 这里是处理正确的回调
            this.articles = response.data.subjects;
            console.log(response);
        }, function(e) {
            console.log(e);
        });*/

    },
    methods:{
        ...mapActions(['USER_SIGNOUT_Sync']),
        // 注销
        logout(){
            this.USER_SIGNOUT_Sync();
            this.$router.replace({path: '/login'})
        },

    }
}
</script>
