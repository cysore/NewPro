<template lang="html">
    <div class="">
        <h1>名称：{{ Datas.title }}</h1>
        <h1>收益：{{ Datas.earnings }}</h1>
        <h1>期限：{{ Datas.date }}</h1>
        <h1>限额：{{ Datas.num }}</h1>

        <section id="newsbieWrap" class="newsbie">
            <div class="newsbie-top newsbie-top-wlb">
                <div class="top-padding">
                    <div class="padding-tit" v-on:click="back">稳利宝.20161115-AWMimg</div>
                    <div class="padding-center">
                        <div class="center-l">
                            <p>8.5<var>%</var></p>
                            <span>年化收益</span>
                        </div>
                        <div class="center-c">
                            <p>90<var>天</var></p>
                            <span>投资期限</span>
                        </div>
                        <div class="center-r">
                            <p><var>50万</var></p>
                            <span>项目金额</span>
                        </div>
                    </div>
                    <div class="padding-porgress">
                        <div class="porgress-outer">
                            <div class="porgress-within" style="width:20%;"></div>
                        </div>
                        <div class="porgress-info">剩余{{state.residue}}元</div>
                    </div>
                </div>

                <div class="top-btm">
                    <div class="btm-l">1元起投，筹满计息</div>
                    <div class="btm-r">
                        <img src="../../images/newbie_top_red.png" alt="">
                        <span>支持红包</span>
                    </div>
                </div>
            </div>
            <div class="newsbie-topban">
                <div class="topban-l">
                    <p>担保类型</p>
                    <p>还款方式</p>
                </div>
                <div class="topban-r">
                    <p>信用担保</p>
                    <p>按月付息 到期还本</p>
                </div>
            </div>
            <div class="newsbie-center">
                <div class="center-tit">
                    信用等级：AAAAA
                </div>
                <div class="center-info">
                    <p class="info-list">
                        <span class="list-l">借款人</span>
                        <span class="list-c">**男士&nbsp;30-35岁</span>
                        <span class="list-r">已认证</span>
                        <span class="list-icon"><img src="../../images/newbie_auth_yes.png" alt=""></span>
                    </p>
                    <p class="info-list">
                        <span class="list-l">公　司</span>
                        <span class="list-c">华为技术有限公司&nbsp;深圳</span>
                        <span class="list-r">已认证</span>
                        <span class="list-icon"><img src="../../images/newbie_auth_yes.png" alt=""></span>
                    </p>
                    <p class="info-list">
                        <span class="list-l">职　级</span>
                        <span class="list-c">中层管理员</span>
                        <span class="list-r">未认证</span>
                        <span class="list-icon"><img src="../../images/newbie_auth_no.png" alt=""></span>
                    </p>
                    <p class="info-list">
                        <span class="list-l">学　历</span>
                        <span class="list-c">大学本科</span>
                        <span class="list-r">已认证</span>
                        <span class="list-icon"><img src="../../images/newbie_auth_yes.png" alt=""></span>
                    </p>
                    <p class="info-list">
                        <span class="list-l">年收入</span>
                        <span class="list-c">196万(税前)</span>
                        <span class="list-r">已认证</span>
                        <span class="list-icon"><img src="../../images/newbie_auth_yes.png" alt=""></span>
                    </p>
                    <p class="info-list">
                        <span class="list-l">信用记录</span>
                        <span class="list-c">信用记录良好</span>
                        <span class="list-r">已认证</span>
                        <span class="list-icon"><img src="../../images/newbie_auth_yes.png" alt=""></span>
                    </p>
                </div>
                <div class="center-chart">
                    <div v-canvas id="chartCanvas" class="chart-canvas">
                        <canvas id="chartSlef" data-progress="50"></canvas>
                        <div class="canvas-info">
                            <p>50%</p>
                            <span>负载率</span>
                        </div>
                    </div>

                    <div class="chart-porgress">
                        <div class="porgress-a">
                            <div class="porgress-a-info">
                                <span>总资产(200万)</span>
                                <span>
                                    <var>健康</var>
                                    <img src="../../images/newbie_health_yes.png" alt="">
                                </span>
                            </div>
                            <div class="porgress-a-porgress">
                                <div class="porgress-a-ban ban-a" v-bind:style="{width:Progress.ProgA}"></div>
                            </div>
                        </div>

                        <div class="porgress-a">
                            <div class="porgress-a-info">
                                <span>负　债(200万)</span>
                                <span class="info-color">
                                    <var>备注：包含房贷100万</var>
                                    <!-- <img src="../../images/newbie_health_yes.png" alt=""> -->
                                </span>
                            </div>
                            <div class="porgress-a-porgress">
                                <div class="porgress-a-ban ban-b" v-bind:style="{width:Progress.ProgB}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="newsbie-project">
                <div class="project-tit">
                    项目情况
                </div>
                <div class="project-abstract">
                    本项目为500强企业金领贷款，借款人是腾讯公司管理层员工，工作地点为深圳。借款人年收入50多万元，并且提供了大额理财的证明，该笔贷款用于个人周转。我公司核实了借款人的个人信用报告及工作单位，证明借款人个人征信良好，工作单位及部门级别属实，到期收入能够完全覆盖贷款本息，保证贷款资金的安全。
                </div>
            </div>
            <div class="investment-record">
                <div class="record-tit">
                    投资记录
                </div>
                <div class="record-list">
                    <div class="list-tit">
                        <span>投资人</span>
                        <span>投资金额</span>
                        <span>投资时间</span>
                    </div>
                    <div class="list-lie">
                        <span>a***9</span>
                        <span>25000.0元</span>
                        <span>2016-08-20 22:22:22</span>
                    </div>
                    <div class="list-lie">
                        <span>a***9</span>
                        <span>25000.0元</span>
                        <span>2016-08-20 22:22:22</span>
                    </div>
                    <div class="list-lie">
                        <span>a***9</span>
                        <span>25000.0元</span>
                        <span>2016-08-20 22:22:22</span>
                    </div>
                    <div class="list-lie">
                        <span>{{noticeMsg}}</span>
                        <span>25000.0元</span>
                        <span>2016-08-20 22:22:22</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 底部输入框 -->
        <!-- <section id="newsbieFiexd" class="newsbie-fiexd none">
            <div class="fiexd-tits">
                <div id="selRed" class="tits-l" v-on:click="selectedRed">
                    <img id="selRedValIcon" src="../../images/reda.png" alt="">
                    <span id="selRedVal">{{state.redMsg}}</span>
                </div>
                <div class="tits-r">
                    账户余额:<var id="userAccountBalance">{{state.isLogin==true ? state.userBalance : '登录后可见'}}</var>元
                </div>
            </div>
            <div class="tits-ipt">
                <div class="ipt-si">
                    <input id="iptMoney" ref="ipts" v-model="iptMoney"  v-bind="{'disabled':state.isLogin ? false : true}" type="tel" pattern="\d*" autocomplete="off" oninput="value=value.replace(/\b(0+)/gi,'');value=value.replace(/[^\d]/gi,'');" maxlength="8"  name="investAmount" class="ebuy-input" onkeyup="value=value.replace(/\b(0+)/gi,'');value=value.replace(/[^\d]/gi,'');" placeholder="请输入投资金额">
                    <span>预期收益<br><em v-bind:class="{'hover' : iptMoney!=''}">{{isNaN(state.expectMoney)==true ? 0 :state.expectMoney}}</em>元</span>
                </div>
                <button id="startInvestementBtn" type="button" name="button" v-on:click="startInvestementBtn">立即投资</button>
            </div>
        </section> -->


        <bottomFiexd
            v-bind:parentState="state"
            v-bind:parentIptMoney="iptMoney"
            v-bind:parentNotice="noticeMsg"
            v-on:parentSelectRed="selectedRed"
            v-on:parentStartInvestementBtn="startInvestementBtn"
        ></bottomFiexd>

        <!-- 遮罩层 -->
        <transition name="fade">
            <div class="layer" v-on:click.stop="layerHide" v-show="popup.layer">
            <!-- 选择红包 -->
            <transition name="slide">
                <div id="selectedRed" class="layer-tips selectedRed" v-show="popup.selectedRed">
                    <div class="layer-tips-content">
                        请选择红包
                    </div>

                    <div class="layer-tips-list" v-bind:class="{'list-selected' : state.selectedIndex==index}" v-for="(item, index) in redDatas" v-on:click.stop="selRed(item,index)">
                        <div v-bind="{'data-Money':item.money}" data-Money class="layer-tips-list-l">
                            {{item.money}}<var>元</var>
                        </div>
                        <div class="layer-tips-list-r">
                            <p>{{item.msg}}</p>
                            <span>有效期：{{item.validDate}}</span>
                        </div>
                    </div>

                    <div class="layer-tips-btns"></div>
                </div>
            </transition>
            <!-- 注册/登录 -->
            <div id="regeditLogin" class="layer-tips regeditLogin" v-show="popup.regeditLogin">
                <div class="layer-tips-content">
                    投资需要先登录，前往登录或注册？
                </div>
                <div class="layer-tips-btns">
                    <a class="layer-tips-btns-clear">取消</a>
                    <a id="reglogBtn" class="layer-tips-btns-reglog" v-on:click.stop="goLogin">登录/注册</a>
                    <!-- <router-link to="/login">登录/注册</router-link> -->
                </div>
            </div>
            <!-- 用户余额不足 -->
            <div id="userBalance" class="layer-tips userBalance" v-show="popup.userBalance">
                <div class="layer-tips-content">
                    账户余额不足，前往充值？
                </div>
                <div class="layer-tips-btns">
                    <a class="layer-tips-btns-clear">取消</a>
                    <a id="userBalanceBtn" class="layer-tips-btns-reglog" v-on:click.stop="goPay">前往充值</a>
                </div>
            </div>
            <!-- 开通第三方资金托管 -->
            <div id="thirdParty" class="layer-tips thirdParty" v-show="popup.thirdParty">
                <div class="layer-tips-content">
                    请先开通第三方资金托管账户!
                </div>
                <div class="layer-tips-btns">
                    <a class="layer-tips-btns-clear">取消</a>
                    <a id="thirdPartyBtn" class="layer-tips-btns-reglog" href="http://www.baidu.com">前往开通</a>
                </div>
            </div>
            <!-- 不满足红包加息券使用条件 -->
            <div id="dissatisfy" class="layer-tips dissatisfy" v-show="popup.dissatisfy">
                <div class="layer-tips-content">
                    输入的投资金额不满足红包或加息券使用条件!
                </div>
                <div class="layer-tips-btns">
                    <a class="layer-tips-btns-clear">取消</a>
                    <a id="goDissatisfyBtn" class="layer-tips-btns-reglog">继续投资</a>
                </div>
            </div>
            <!-- 确认投资 -->
            <div id="enterInvestement" class="layer-tips enterInvestement" v-show="popup.enterInvestement">
                <div class="layer-tips-investement">
                    <p>投资金额：<span id="investMoney">{{iptMoney}}</span>元</p>
                    <p>使用红包：<span id="investRed">{{state.redMoney}}</span>元</p>
                    <p class="practical">实际付款：<span id="investPractical">{{iptMoney - state.redMoney}}</span>元</p>
                    <p>预期本息：<span id="investPredict">{{state.expectMoney}}</span>元</p>
                </div>
                <div class="layer-tips-btns">
                    <a id="enterDissatisfyBtn" class="layer-tips-btns-reglog" v-on:click.stop="enterDissatisfyBtn">确认投资</a>
                </div>
                <div class="layer-tips-info">
                    投资表示同意<a href="">《投资管理协议》</a>
                </div>
            </div>
            <!-- 投资失败 -->
            <div id="errorInvestement" class="layer-tips errorInvestement" v-show="popup.errorInvestement">
                <div class="layer-tips-error">
                    <img src="../../images/newbie_pay_error.png" alt="">
                    <p class="error-type">投资失败</p>
                    <p class="error-info">投资金额大于项目剩余可投金额请重新输入投资金额</p>
                </div>
                <div class="layer-tips-btns">
                    <a id="errorInvestementBtn" class="layer-tips-btns-reglog" v-on:click.stop="errorInvestementBtn">返回重新投资</a>
                </div>
            </div>
            <!-- 投资成功 -->
            <div id="successInvestement" class="layer-tips successInvestement" v-show="popup.successInvestement">
                <div class="layer-tips-success">
                    <img src="../../images/newbie_pay_success.png" alt="">
                    <p class="success-type">投资成功</p>
                    <p class="success-info"><var id="times">{{state.count}}</var>秒后自动关闭</p>
                </div>
            </div>

            <!-- 可使用的红包或加息券及其他提示 -->
            <div id="notcoupon" class="notcoupon" v-show="popup.notcoupon">
                <div class="notcoupon-content">
                    {{state.tipsMsg}}
                </div>
            </div>

            </div>
        </transition>
        <div class="nolayer none"></div>

    </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
import bottomFiexd from './bottomFiexd.vue';
import libs from '../../javascripts/main.js';
export default {
    data(){
        return {
            iptMoney:'',//用户输入的投资金额
            noticeMsg:false,//通知子组件重置状态
            state:{
                tipsMsg:'',// 提示信息
                redMsg:'点击选择红包',
                selectedIndex:null,//选中的红包下标
                isLogin:this.$store.getters.GET_USER,//是否登录
                isRed:false,//是否有红包
                isCoupon:false,//是否有加息券
                isThirdParty:true,//是否开通第三方资金托管
                isSuccess:true,//是否投资成功
                redMoney:0,//选中的红包金额
                residue:1000,//投资项目剩余金额
                userBalance:500,//用户余额
                userInvesVal:0,//用户投资额度
                count:3,//投资成功后倒计时(秒)
                expectMoney:0,//预期本息
            },
            Progress:{
                ProgA:'20%',//总资产进度
                ProgB:'40%',//负债进度
            },
            popup:{
                layer:false,
                selectedRed:false,
                regeditLogin:false,
                userBalance:false,
                thirdParty:false,
                dissatisfy:false,
                enterInvestement:false,
                errorInvestement:false,
                successInvestement:false,
                nolayer:false,
                notcoupon:false,
            },
            redDatas:[
                {
                    validDate:'2016.08.01~2017.09.01',
                    money:50,
                    msg:'福利红包，投资5000元可用'
                },
                {
                    validDate:'2016.08.01~2017.09.01',
                    money:40,
                    msg:'福利红包，投资5000元可用'
                },
                {
                    validDate:'2016.08.01~2017.09.01',
                    money:30,
                    msg:'福利红包，投资5000元可用'
                },
                {
                    validDate:'2016.08.01~2017.09.01',
                    money:20,
                    msg:'福利红包，投资5000元可用'
                },
            ],
            Datas:JSON.parse(decodeURI(this.$route.params.Datas))
        }
    },
    components:{
        bottomFiexd:bottomFiexd
    },
    beforeCreate(){

    },
    created(){
        // console.log(this.$store.getters.GET_USER);
        // console.log(this.$on);
    },
    computed:{

    },
    methods:{
        /*
        *重置popup的状态
        */
        resetPopup(){
            for(let val in this.popup){
                if(this.popup[val]==true){
                    this.popup[val]=false;
                    // console.log(this.popup[val]);
                }
            }
        },
        /*
        *弹出指定层
        */
        showPopup(tagAttr,times){
            this.popup.layer=true;// 显示layer遮罩层
            this.popup[tagAttr]=true;// 显示目标层
            //延迟隐藏
            if(times){
                setTimeout(()=>{
                    this.hidePopup(tagAttr);
                },times);
            }
        },
        /*
        *隐藏指定层
        */
        hidePopup(tagAttr){
            this.popup.layer=false;// 隐藏layer遮罩层
            this.popup[tagAttr]=false;// 隐藏目标层
        },
        /*
        *点击显示选择红包层
        */
        selectedRed(){
            if(!this.state.isLogin){
                this.showPopup('regeditLogin');
                return;
            }
            setTimeout(()=>{
                this.showPopup('selectedRed');
            },500)
        },
        /*
        *点击遮罩层隐藏所有
        */
        layerHide(){
            this.resetPopup();
        },
        /*
        *点击选择红包
        */
        selRed(data,index,e){
            if(this.state.selectedIndex!=null && this.state.selectedIndex==index){
                this.state.selectedIndex=null;
                this.state.redMsg='点击选择红包';
                this.state.redMoney=0;
            }else{
                this.state.redMsg='已选择'+data.money+'红包';
                this.state.selectedIndex=index;
                this.state.redMoney=data.money;
            }
            setTimeout(()=>{
                this.resetPopup();
            },500)
            console.log(data,index);
        },
        /*
        *立即投资
        */
        startInvestementBtn(childTransmitData){
            console.log(childTransmitData);
            this.iptMoney=childTransmitData;
            setTimeout(()=>{

                // 是否登录
                if(!this.state.isLogin){
                    this.showPopup('regeditLogin');
                    return;
                }

                // 是否开通第三方资金托管
                if(!this.state.isThirdParty){
                    this.showPopup('thirdParty');
                    return;
                }

                if(this.iptMoney>this.state.userBalance){
                    // this.state.tipsMsg='账户余额不足,是否前往充值';
                    this.showPopup('userBalance');
                    return;
                }

                if(this.iptMoney>=10000){
                    this.state.tipsMsg='投资金额不能大于1万元';
                    this.showPopup('notcoupon',2000);
                    return;
                }

                // 是否大于投资金额
                if(this.iptMoney>this.state.residue){
                    this.state.tipsMsg='投资金额不能大于项目剩余金额';
                    this.showPopup('notcoupon',2000);
                    return;
                }

                // 是否有输入投资金额
                if(this.iptMoney!=''){
                    this.showPopup('enterInvestement');
                    return;
                }else{
                    this.state.tipsMsg="请输入投资金额!";
                    this.showPopup('notcoupon',2000);
                    console.log('not ipt val');
                }
            },500);
        },
        /*
        *确认投资
        */
        enterDissatisfyBtn(e){
            this.hidePopup('enterInvestement');
            if(this.state.isSuccess){
                //投资成功
                this.showPopup('successInvestement');

                this.state.redMsg='点击选择红包';
                this.state.userBalance=this.state.userBalance-this.iptMoney+this.state.redMoney;
                this.state.redMoney=0;
                this.iptMoney='';

                this.noticeMsg=true;//通知子组件更新

                let countDown = setInterval(()=>{
                    if(this.state.count==0){
                        this.hidePopup('successInvestement');
                        this.state.count=3;
                        clearInterval(countDown);
                    }
                    this.state.count--;
                },1000);
            }else {
                //投资失败
                this.showPopup('errorInvestement');
            }
        },
        /*
        *投资失败返回重新投资
        */
        errorInvestementBtn(e){
            this.hidePopup('errorInvestement');
        },
        /*
        *去登陆
        */
        ...mapActions(['USER_NOT_LOGIN_NAME_Sync']),//映射store里面的actions
        goLogin(){
            console.log(this.$route.name);
            this.USER_NOT_LOGIN_NAME_Sync(this.$route.name);
            this.$router.replace({name:'routeLogin'});
        },
        /*
        *去充值
        */
        goPay(){
            console.log('前往充值！');
        },
        back(){
            history.go(-2);
            // this.$router.replace({name:'routeInvestement'});
        }
    },
    // 局部自定义指令
    directives: {
        canvas: {
            // 当绑定元素插入到 DOM 中。
            inserted: (el) => {
                // el.focus();
                let canvasEleSlef = el.children[0].id;
                let canvasEleParent= el.id;
                libs.drawCricle(canvasEleParent,canvasEleSlef,false,'#ff7900');
            }
        }
    },

}
</script>
