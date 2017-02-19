<template lang="html">
    <transition name="fadeOutAddress">
        
        
        <section class="pickerAddress" v-on:click="show = true" v-show="!show">
            <transition name="fadeInAddress">
                <div class="picker-address" v-show="!show">
                    <div class="picker-address-tit">
                        <span v-on:click="show = true">取消</span>
                        <span v-on:click="enter">确定</span>
                    </div>
                    <div class="picker-address-content">
                        <Picker v-bind:AreaData="province" v-on:accept-result="acceptResultProvince"></Picker>
                        <Picker v-bind:AreaData="city" v-on:accept-result="acceptResultCity"></Picker>
                        <Picker v-bind:AreaData="area" v-on:accept-result="acceptResultArea"></Picker>
                    </div>
                </div>
            </transition>
        </section>

    </transition>

    
</template>

<script>
import AreaData from '../../../static/AreaData.json';
import libs from '../../javascripts/main.js';
import pickers from './picker.vue';
export default {
    name:'pickerAddress',
    data(){
        return{
            msg         :'pickerAddress',
            province    :null,//省
            provinceIdx :0,
            city        :null,//市
            cityIdx     :0,
            area        :null,//区
            areaIdx     :0,
            show        :true,
        }
    },
    props:{
        setAddress:{
            type:Array,
            default:()=>{
                return [];
            }
        }
    },
    components:{
        Picker:pickers
    },
    created(){
        console.log(this.setAddress)
        this.province   = AreaData;
        this.city       = AreaData['0'].c;
        this.area       = AreaData['0'].c['0'].c;

    },
    mounted(){

    },
    methods:{
        open(){
            this.show = false;
        },
        enter(){
            this.show = true;
            // console.log(AreaData[this.provinceIdx].n)
            // console.log(AreaData[this.provinceIdx].c[this.cityIdx].n)
            // console.log(AreaData[this.provinceIdx].c[this.cityIdx].c[this.areaIdx].n);
            let address = [
                AreaData[this.provinceIdx].n,
                AreaData[this.provinceIdx].c[this.cityIdx].n,
                AreaData[this.provinceIdx].c[this.cityIdx].c[this.areaIdx].n
            ]
            this.$emit('accept-result',address);
        },
        acceptResultProvince(v){
            this.provinceIdx = v;
            this.city        = AreaData[v].c;
            this.area        = AreaData[v].c['0'].c;
        },
        acceptResultCity(v){
            this.cityIdx = v;
            this.area    = AreaData[this.provinceIdx].c[v].c;
        },
        acceptResultArea(v){
            this.areaIdx = v;
            console.log(v)
        }
    },
    watch:{
        provinceIdx(n,o){
            this.city = AreaData[n].c;
        },
        cityIdx(n,o){
            this.area = AreaData[this.provinceIdx].c[n].c;
        },
        
    }
}
</script>

<style lang="less">
.pickerAddress{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0,0,0,.5);
    overflow-y: hidden;
}
.picker-address{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 6rem;
    background: #fff;
    z-index: 9999;
    .picker-address-tit{
        height: calc(1rem - .1px);
        line-height: 1rem;
        border-bottom: 1px #ccc solid;

        display: box;
        display: -webkit-box;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        text-align: center;
        font-size: .45rem;
        >span{
            width: 20%;
        }
    }
    .picker-address-content{
        height: 5rem;
        width: 100%;
        overflow: hidden;
        position: relative;

        display: box;
        display: -webkit-box;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        
        .picker-address-list{
            width: 33.33%;
            float: left;
            text-align: center;
            transition: all .3s ease-out;
            >li{
                height: 1rem;
                line-height: 1rem;
                font-size: .5rem;
            }

        }
    }
}
.fadeOutAddress-enter-active, .fadeOutAddress-leave-active {
    transition: .5s;
}
.fadeOutAddress-enter, .fadeOutAddress-leave-active {
    opacity: 0;
}
.fadeInAddress-enter-active, .fadeInAddress-leave-active {
    transition: .25s;
}
.fadeInAddress-enter, .fadeInAddress-leave-active {
    opacity: 0;
    transform: translateY(6rem);
}
</style>
