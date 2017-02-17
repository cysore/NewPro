<template>
    <section>
        <!-- <input class="ipt" type="button" name="name" v-on:click="btn" v-model="routeName"> -->
        <router-view></router-view>
        <Navs v-if="!isMenu" v-bind:message="msg"></Navs>
        <!-- <vue-progress-bar></vue-progress-bar> -->
    </section>
</template>

<script type="text/javascript">
import Nav from "./components/menu/nav.vue";

export default {
    data(){
        return {
            msg:'',
            isMenu:false,
            notMenuRouterName:this.$store.state.StateRoute.routeName,
        }
    },
    components:{
        Navs:Nav
    },
    created(){
        // console.log(this.$store.state.StateRoute.routeName);
    },
    methods:{
        btn(){
            console.log(this.$store.state.StateRoute.routeName);
            this.$router.go(-1);
        },

    },
    // 计算属性
    computed:{

    },
    watch:{
        // routeName(curVal,oldVal){
        //     console.log(curVal,oldVal);
        // },
        '$route'(to,from){
            this.notMenuRouterName=to.name;
            let res = ['routeLogin','routeInvestementId','loadmore'].indexOf(to.name) != -1;
            // console.log(res);

            // 针对指定路由地址进行底部菜单屏蔽
            if(res){
                this.isMenu=true;
            }else{
                this.isMenu=false;
            }
        }
    },
}
</script>
<style media="screen">
.ipt{width: 100%;height: 1rem}
.H{height: 1.46666667rem;width: 100%;background: red;}
</style>
