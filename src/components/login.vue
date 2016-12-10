<template lang="html">
    <div class="">
        <form class="signin" v-on:submit.prevent="submit">

            <transition name="fade">
                <div v-show="btn && !form.phone">手机不能为空</div>
            </transition>

            <div class="signin-ipt phone" v-bind:class="{active: btn && !form.phone}">
                <input type="number" placeholder="输入手机号" v-model="form.phone">
            </div>
            <!-- <div class="signin-ipt verificationCode">
                <input type="number" placeholder="短信验证码">
                <button id="btn_send_msg" class="btn-send-msg">短信验证码</button>
            </div> -->


            <div class="signin-ipt password" v-bind:class="{active: btn && !form.pass}">
                <input id="password" type="password" placeholder="输入6-16位密码" v-model="form.pass">
                <span id="btn_block" class="btn-block">
                    <img class="btn-block-img" src="../images/signin/icon5.png" alt="">
                </span>
            </div>
            <!-- <div class="signin-ipt invite">
                <input class="invite-ipt" type="text" placeholder="推荐人邀请码或手机号（选填）" >
                <span id="inviteCode" class="btn-block none">
                    邀请码
                </span>
            </div> -->
            <button class="signin-btn" v-bind:disabled="false">login</button>
        </form>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';

export default {
    data(){
        return{
            btn:false,
            isActive:false,
            form:{
                phone:'',
                pass:'',
            }
        }
    },
    created(){
        // console.log(this.$store);
    },
    methods:{
        /*
        *使用 mapActions 工具函数，映射组件方法到调用 store.dispatch
        *通过store里面的actions来操作mutations改变state，并且直接映射到this上
        *如：映射 this.signinSync(opt) 到 this.$store.dispatch('signinSync',opt)
        *使用 this.signinSync(opt)
        *...mapActions(['SIGNIN_Sync']);通过扩展运算符...mapActions来直接映射actions名
        */
        ...mapActions(['USER_SIGNIN_Sync']),
        // 登录
        submit() {
            console.log(this.$store.state.StateUser.notLoginName);
            this.btn = true;
            if(!this.form.phone || !this.form.pass) {
                this.$toast({
                    message:'请输入正确的用户名和密码',
                    position:'middle',
                    duration:3000
                });
                return
            };
            // commit dispatch 分发 提交用户登录信息到状态机处理
            // this.$store.dispatch(
            //     'signinSync',
            //     this.form.phone,
            //     // {silent:true}//指定插件中的mutation为静默
            // );
            this.USER_SIGNIN_Sync(this.form.phone);
            console.log(this.$store.state.StateUser.notLoginName);
            // 登录后跳转到未登录之前访问的路由地址(this.$router.replace({path: '/home'}))
            this.$router.replace({name:this.$store.state.StateUser.notLoginName ? this.$store.state.StateUser.notLoginName : 'routeHome'});
        },
    },
    // computed:mapState({
    //     count:state=>state.user,
    //     // 传入字符串 'count' 等同于 `state => state.count`
    //     countAlias:'user',
    //
    // })
}
</script>
