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
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';

export default {
    data(){
        return {
            state:this.StateRoute,
            flag:'',
        }
    },
    props:['message'],
    created(){
        console.log(this.StateRoute);
    },
    computed:{
        // 映射store里面的state到this上(use:this.StateRoute)
        ...mapState(['StateRoute']),
    },
    created(){
        this.flag=this.StateRoute.routeName;
    },
    watch:{
        // 监听组件路由发生变化改变其状态
        '$route'(to,from){
            this.flag=to.name;
        }
    }

}
</script>
