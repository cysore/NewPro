<template lang="html">
    <!-- 底部输入框 -->
    <section id="newsbieFiexd" class="newsbie-fiexd">
        <div class="fiexd-tits">
            <div id="selRed" class="tits-l" v-on:click="HandlerSelectRed">
                <img id="selRedValIcon" src="../../images/reda.png" alt="">
                <span id="selRedVal">{{parentState.redMsg}}</span>
            </div>
            <div class="tits-r">
                账户余额:<var id="userAccountBalance">{{parentState.isLogin==true ? parentState.userBalance : '登录后可见'}}</var>元
            </div>
        </div>
        <div class="tits-ipt">
            <div class="ipt-si">
                <input id="iptMoney" ref="ipts" v-model="iptMoney"  v-bind="{'disabled':parentState.isLogin ? false : true}" type="tel" pattern="\d*" autocomplete="off" oninput="value=value.replace(/\b(0+)/gi,'');value=value.replace(/[^\d]/gi,'');" maxlength="8"  name="investAmount" class="ebuy-input" onkeyup="value=value.replace(/\b(0+)/gi,'');value=value.replace(/[^\d]/gi,'');" placeholder="请输入投资金额">
                <span>预期收益<br><em v-bind:class="{'hover' : iptMoney!=''}">{{isNaN(parentState.expectMoney)==true ? 0 : parentState.expectMoney}}</em>元</span>
            </div>
            <button id="startInvestementBtn" type="button" name="button" v-on:click="HandlerStartInvestementBtn">立即投资</button>
        </div>
    </section>
</template>

<script>
export default {
    props:['parentState','parentIptMoney'],
    data(){
        return{
            msg:'msg',
            iptMoney:this.parentIptMoney,

        }
    },
    created(){
        // console.log(this.$parent);
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
        }
    }

}
</script>
