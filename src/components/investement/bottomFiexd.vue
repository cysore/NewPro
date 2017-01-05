<template lang="html">
    <!-- 底部输入框 -->
    <section class="newsbie-fiexd">
        <div class="fiexd-tits">
            <div class="tits-l" v-on:click="HandlerSelectRed">
                <img src="../../images/reda.png" alt="">
                <span>{{parentState.redMsg}}</span>
            </div>
            <div class="tits-r">
                账户余额:<var>{{parentState.isLogin==true ? parentState.userBalance : '登录后可见'}}</var>元
            </div>
        </div>
        <div class="tits-ipt">
            <div class="ipt-si">
                <input ref="ipts" v-model="iptMoney"  v-bind="{'disabled':parentState.isLogin ? false : true}" type="tel" pattern="\d*" autocomplete="off" oninput="value=value.replace(/\b(0+)/gi,'');value=value.replace(/[^\d]/gi,'');" maxlength="8"  name="investAmount" class="ebuy-input" onkeyup="value=value.replace(/\b(0+)/gi,'');value=value.replace(/[^\d]/gi,'');" placeholder="请输入投资金额">
                <span>预期收益<br><em v-bind:class="{'hover' : iptMoney!=''}">{{isNaN(parentState.expectMoney)==true ? 0 : parentState.expectMoney}}</em>元</span>
            </div>
            <button type="button" name="button" v-on:click="HandlerStartInvestementBtn">立即投资</button>
        </div>
    </section>
</template>

<script>
export default {
    name:'bf',
    props:{
        parentState:{
            type:Object,
        },
        parentIptMoney:{
            type:String,
        },
        parentNotice:{
            type:Boolean,
            default:function(){
                console.log(1);
                return false;
            }
        },
        parentTestObj:{
            validator:function(v){
                // console.log(v);
                return v;
            }
        }
    },
    data(){
        return{
            iptMoney:this.parentIptMoney,
        }
    },
    created(){
        // console.log(this.$parent);
        // console.log(this.parentState.noticeMsg);
        // console.log(this.parentTestObj);
    },
    methods:{
        HandlerSelectRed(){
            this.$emit('parentSelectRed');
        },
        HandlerStartInvestementBtn(){
            this.$emit('parentStartInvestementBtn',this.iptMoney);
        }
    },
    // 属性监听
    watch:{
        iptMoney(newVal,oldVal){
            // console.log(document.activeElement.id=='iptMoney');// input 元素聚焦
            this.parentState.expectMoney = (parseFloat(newVal) + parseFloat(newVal * 7 / 36500 * 180)).toFixed(2);
        },
        parentNotice(newVal,oldVal){
            if(newVal){
                this.iptMoney='';
            }
        }
    }

}
</script>
