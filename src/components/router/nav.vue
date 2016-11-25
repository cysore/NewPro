<template lang="html">
    <footer class="footer">
        {{message}}
        <!-- <router-link v-for="item in navData" v-bind:to="item.link" class="home_b">
            <img v-if="flag" v-bind:src="item.src" />
            <img v-else v-bind:src="item.csrc" />
            {{item.text}}
        </router-link> -->
        <router-link to="/home" class="home_b">
            <img v-if="flag=='routeHome'" src="../../images/home_a.png">
            <img v-else src="../../images/home_b.png">
            首页
        </router-link>
        <router-link to="/investement" class="money_b">
            <img v-if="flag=='routeInvestement' || flag=='routeInvestementId'" src="../../images/money_a.png">
            <img v-else src="../../images/money_b.png">
            投资
        </router-link>
        <router-link to="/media" class="loan_b">
            <img v-if="flag=='routeMedia'" src="../../images/loan_a.png">
            <img v-else src="../../images/loan_b.png">
            金领借款
        </router-link>
        <router-link to="/my" class="my_b">
            <img v-if="flag=='routeMy'" src="../../images/my_a.png">
            <img v-else src="../../images/my_b.png">
            我的
        </router-link>

    </footer>
</template>

<script>
import home_b from '../../images/home_b.png';
import home_a from '../../images/home_a.png';
import money_b from '../../images/money_b.png';
import money_a from '../../images/money_a.png';
import loan_b from '../../images/loan_b.png';
import loan_a from '../../images/loan_a.png';
import my_b from '../../images/my_b.png';
import my_a from '../../images/my_a.png';

export default {
    data(){
        return {
            state:this.$store.state.StateRoute,
            flag:'',
            navData:[
                {link:'/home',text:'首页',src:home_b,csrc:home_a},
                {link:'/investement',text:'投资',src:money_b,csrc:money_a},
                {link:'/media',text:'金领借款',src:loan_b,csrc:loan_a},
                {link:'/my',text:'我的',src:my_b,csrc:my_a},
            ]
        }
    },
    props:['message'],
    ready(){
        window.scrollTo(100, 100);
    },
    created(){
        this.flag=this.$store.state.StateRoute.routeName;
    },
    watch:{
        // 监听组件路由发生变化改变其状态
        '$route'(to,from){
            this.flag=to.name;
        }
    }

}
</script>
