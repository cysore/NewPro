<template lang="html">
    <div class="">
        <!-- 登录 -->
        <form class="signin" v-on:submit.prevent="submit">

            <transition name="fade">
                <div v-show="btn && !login.phone">手机不能为空</div>
            </transition>

            <div class="signin-ipt phone" v-bind:class="{active: login.loginBtn && !login.phone}">
                <input type="number" placeholder="输入手机号" v-model="login.phone">
            </div>
            <!-- <div class="signin-ipt verificationCode">
                <input type="number" placeholder="短信验证码">
                <button id="btn_send_msg" class="btn-send-msg">短信验证码</button>
            </div> -->


            <div class="signin-ipt password" v-bind:class="{active: login.loginBtn && !login.pass}">
                <input id="password" v-bind="{'type' : showTag.showpass ? 'text' : 'password'}"  placeholder="输入6-16位密码" v-model="login.pass">
                <span id="btn_block" class="btn-block" v-on:click="showTag.showpass = !showTag.showpass">
                    <img class="btn-block-img" v-bind="{'src' : showTag.showpass ?  showTag.HidePassIcom : showTag.ShowPassIcom}" alt="">
                </span>
            </div>
            <!-- <div class="signin-ipt invite">
                <input class="invite-ipt" type="text" placeholder="推荐人邀请码或手机号（选填）" >
                <span id="inviteCode" class="btn-block none">
                    邀请码
                </span>
            </div> -->
            <button class="signin-btn" v-bind:disabled=" login.phone=='' && login.pass=='' " v-bind:class="{disabled: login.phone=='' && login.pass=='' }">login</button>

            <div class="not-user">
                <a class="not-user-l" v-on:click="siginPopup = true;">没有账号？先注册</a>
                <a class="not-user-r" v-on:click="resetPass">忘记密码？</a>
            </div>

        </form>


        <!-- 注册 -->

        <mt-popup v-model="siginPopup" position="bottom" class="mint-popup-3" v-bind:modal="false">
            <div class="signin">
                <div class="signin-ipt phone" v-bind:class="{active: sigin.siginBtn && !sigin.phone}">
                    <input type="number" placeholder="输入手机号" v-model="sigin.phone">
                </div>
                <div class="signin-ipt verificationCode">
                    <input type="number" placeholder="短信验证码" v-model="sigin.sendMsgCode">
                    <button id="btn_send_msg" class="btn-send-msg">短信验证码</button>
                </div>
                <div class="signin-ipt password" v-bind:class="{active: sigin.siginBtn && !sigin.pass}">
                    <input id="password" v-bind="{'type' : showTag.showpass ? 'text' : 'password'}"  placeholder="输入6-16位密码" v-model="sigin.pass">
                    <span id="btn_block" class="btn-block" v-on:click="showTag.showpass = !showTag.showpass">
                        <img class="btn-block-img" v-bind="{'src' : showTag.showpass ?  showTag.HidePassIcom : showTag.ShowPassIcom}" alt="">
                    </span>
                </div>
                <div class="signin-ipt invite">
                    <input class="invite-ipt" type="text" placeholder="推荐人邀请码或手机号（选填）" v-model="sigin.inviteCode">
                    <span id="inviteCode" class="btn-block ">邀请码</span>
                </div>
                <button class="signin-btn" v-on:click="signin">signin</button>
                <a class="backlogin" v-on:click="siginPopup = false">&lt;有账号，去登陆</a>
            </div>
        </mt-popup>

    </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
import showImg from '../images/signin/icon5.png';
import hideImg from '../images/signin/icon6.png';

// import dialog from './testComponents/dialog.js';
import test from './testComponents/test.js';

export default {
    data(){
        return{
            isActive:false,
            siginPopup:false,
            showTag:{
                showpass:false,
                ShowPassIcom:showImg,
                HidePassIcom:hideImg,
            },
            login:{
                phone:'',
                pass:'',
                loginBtn:false,
            },
            sigin:{
                phone:'',
                pass:'',
                sendMsgCode:'',
                inviteCode:'',
                siginBtn:false,
            }
        }
    },
    component:{

    },
    created(){
        console.log(test);
        test.alert(1235)
        // console.log(this.$store);
        // console.log(this.StateUser);
    },
    computed:{
        // 映射store里面的state到this上(use:this.StateUser)
        ...mapState(['StateUser']),
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
            console.log(this.StateUser.notLoginName);
            this.login.loginBtn = true;
            if(!this.login.phone || !this.login.pass) {
                this.$toast({
                    message:'请输入正确的用户名和密码',
                    position:'middle',
                    duration:3000
                });
                return;
            };
            this.$http({
                url:'/api/selectUser',
                method:'get',
                params:{user:this.login.phone,pass:this.login.pass}
            }).then((data)=>{
                console.log(data);
                if(data.body.code==200){
                    this.USER_SIGNIN_Sync(this.login.phone);
                    this.$router.replace({name:this.StateUser.notLoginName ? this.StateUser.notLoginName : 'routeHome'});
                }else{
                    this.$toast({
                        message:data.body.msg,
                        position:'middle',
                        duration:3000
                    });
                    return;
                }
            },(e)=>{
                console.log(e);
            })
            // commit dispatch 分发 提交用户登录信息到状态机处理
            // this.$store.dispatch(
            //     'signinSync',
            //     this.login.phone,
            //     // {silent:true}//指定插件中的mutation为静默
            // );
            // this.USER_SIGNIN_Sync(this.login.phone);
            // console.log(this.StateUser.notLoginName);
            // 登录后跳转到未登录之前访问的路由地址(this.$router.replace({path: '/home'}))
            // this.$router.replace({name:this.StateUser.notLoginName ? this.StateUser.notLoginName : 'routeHome'});

        },
        // 注册
        signin(){
            this.$http({
                url:'/api/addUser',
                method:'get',
                params:{user:this.sigin.phone,pass:this.sigin.pass}
            }).then(function(data){
                console.log(data);
                if(data.body.code==200){
                    this.USER_SIGNIN_Sync(this.sigin.phone);
                    this.$router.replace({name:this.StateUser.notLoginName ? this.StateUser.notLoginName : 'routeHome'});
                }else{
                    this.$toast({
                        message:data.body.msg,
                        position:'middle',
                        duration:3000
                    });
                }
            },function(err){
                console.log(err);
            })
        },
        resetPass(){
            console.log(2);
        }
    },

}
</script>
