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

export default {
    data(){
        return{
            msg:'myvue'
        }
    },
    created(){
        console.log(this.$store.state.StateUser.user);
    },
    methods:{
        ...mapActions(['USER_SIGNOUT_Sync']),
        // 注销
        logout(){
            this.USER_SIGNOUT_Sync();
            this.$router.replace({path: '/login'})
        }
    }
}
</script>
