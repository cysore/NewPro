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

        <div v-date="true" class="">
            <input id="date-selector-input" type="text" readonly/>
            <div id="targetContainer"></div>
        </div>


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

        <!-- slot -->
        <app-Layout>
            <app-header slot="header"></app-header>
            <app-main>11</app-main>

            <template slot="main" scope="props">
                <span>这是一个父类</span>
                <span>{{props.text}}{{props.note}}</span>
            </template>

            <app-footer slot="footer"></app-footer>
        </app-Layout>

        <!-- slot 作用域插槽 -->
        <test-solt>
            <div slot="a" class="">
                1
            </div>
            <div slot="b" class="">
                2
            </div>
            <!-- <template scope="props">
                <span>hello from parent</span>
                <span>{{ props.text }}</span>
            </template> -->
        </test-solt>

        <!-- 动态组件 -->
        <keep-alive>
            <component v-bind:is="currentView">
                <!-- 组件在 vm.currentview 变化时改变！ -->
                <!-- 非活动组件将被缓存！ -->
            </component>
        </keep-alive>

    </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
import showImg from '../images/signin/icon5.png';
import hideImg from '../images/signin/icon6.png';
// 导入工具库
import libs from '../javascripts/main.js';

// import dialog from './testComponents/dialog.js';
// import test from './testComponents/test.js';

//导入slot
import applayout from './slot/applayout.vue';
import header from './slot/header.vue';
import main from './slot/main.vue';
import footer from './slot/footer.vue';
import testsolt from './slot/testSolt.vue';

// 日期控件
import DateSelector from 'mob-date-selector';

export default {
    data(){
        return{
            currentView: 'appMain',
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
    // 组件在挂载之后
    mounted(){
        //月份从1开始
        new DateSelector({
            input: 'date-selector-input',//点击触发插件的input框的id
            container: 'targetContainer',//插件插入的容器id
            type: 0,
            //0：不需要tab切换，自定义滑动内容，建议小于三个；
            //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
            param: [1, 1, 1],
            //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
            beginTime: [2015, 5, 5],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
            endTime: [2018, 10, 10],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
            recentTime: [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
            success: function (arr) {
                console.log(arr);
            }//回调
        });
    },
    // 组件
    components:{
        appLayout   :applayout,
        appHeader   :header,
        appMain     :main,
        appFooter   :footer,
        testSolt    :testsolt,
        child       :{
            template:'<div>A custom component!</div>'
        }
    },
    created(){
        // dialog.alert({"title":"title" , message:"message"})
        // console.log(this.$store);
        // let ar = libs.unique([112,112,434,'你好',112,112,34,'你好','str','str1','str']);
        console.log(Array.from(new Set([112,112,434,'你好',112,112,34,'你好','str','str1','str'])));
    },
    // 局部自定义指令
    directives: {
        date: {
            // 当绑定元素插入到 DOM 中。
            bind: function (el,binding) {
                // console.log(binding.value);
            }
        }
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

            /*this.$http.post('/api/login',{user:this.login.phone,pass:this.login.pass}).then((res) => {
                console.log(res);
            })
            return;*/
            this.$http({
                url:'/api/login',
                method:'post',
                body:{user:this.login.phone,pass:this.login.pass}
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
                this.$toast({
                    message:"错误码："+e.status,
                    position:'middle',
                    duration:3000
                });
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
