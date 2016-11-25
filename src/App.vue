<template>
    <div>
        <!-- <input class="ipt" type="button" name="name" v-on:click="btn" v-model="routeName"> -->
        <router-view></router-view>
        <Navs v-if="routeName!='routeLogin'" v-bind:message="msg"></Navs>
    </div>
</template>

<script type="text/javascript">
import Nav from "./components/router/nav.vue";

export default {
    data(){
        return {
            msg:'',
            routeName:this.$store.state.StateRoute.routeName
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
        }
    },
    watch:{
        // routeName(curVal,oldVal){
        //     console.log(curVal,oldVal);
        // },
        '$route'(to,from){
            this.routeName=to.name;
        }
    },
}
</script>
<style media="screen">
.ipt{width: 100%;height: 1rem}
.H{height: 1.46666667rem;width: 100%;background: red;}
</style>
