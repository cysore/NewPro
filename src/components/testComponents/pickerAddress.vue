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
                        <Picker
                        v-bind:AreaData="province"
                        v-bind:setIndex="setProvinceCurrIndex"
                        v-on:accept-result="acceptResultProvince"></Picker>
                        <Picker
                        v-bind:AreaData="city"
                        v-bind:setIndex="setCityCurrIndex"
                        v-on:accept-result="acceptResultCity"></Picker>
                        <Picker
                        v-bind:AreaData="area"
                        v-bind:setIndex="setAreaCurrIndex"
                        v-on:accept-result="acceptResultArea"></Picker>
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
            msg                     :'pickerAddress',
            province                :null,//省
            selectedProvinceIndex   :0,
            city                    :null,//市
            selectedCityIndex       :0,
            area                    :null,//区
            selectedAreaIndex       :0,
            show                    :true,
        }
    },
    props:{
        setAddress:{
            type:Array,
            default:()=>{
                return ['北京','北京市','东城区'];
            }
        }
    },
    components:{
        Picker:pickers
    },
    created(){
        // 如果没有设置省市区使用默认


            this.province   = AreaData.map((v,k)=>{return v.n});
            for(let i = 0;i < AreaData.length;i++){
                if(AreaData[i].n == this.setAddress[0]){
                    this.selectedProvinceIndex = i;//选中省的下标
                    this.setProvinceCurrIndex = i;//设置当前省下标
                    break;
                }
            }
            let AreaDataCitys = AreaData[this.selectedProvinceIndex].c;
            for(let i = 0;i < AreaDataCitys.length;i++){
                if(AreaDataCitys[i].n == this.setAddress[1]){
                    this.selectedCityIndex = i;//选中市的下标
                    this.setCityCurrIndex = i;//设置当前市下标
                    this.city       = AreaDataCitys.map((v,k)=>{return v.n});
                    break;
                }
            }
            let AreaDataAreas = AreaData[this.selectedProvinceIndex].c[this.selectedCityIndex].c;
            for(let i = 0;i < AreaDataAreas.length;i++){
                if(AreaDataAreas[i].n == this.setAddress[2]){
                    this.selectedAreaIndex = i;//选中区的下标
                    this.setAreaCurrIndex = i;//设置当前区下标
                    this.area       = AreaDataAreas.map((v,k)=>{return v.n});
                    break;
                }
            }


            // this.province   = AreaData;
            // this.city       = AreaData['2'].c;
            // this.area       = AreaData['2'].c['2'].c;

            // this.selectedProvinceIndex = 2;//选中省下标
            // this.setProvinceCurrIndex = 2;//当前省下标
            // this.setCityCurrIndex = 2;//当前市下标
            // this.setAreaCurrIndex = 2;//当前区下标
        // }
    },
    mounted(){

    },
    methods:{
        open(){
            this.show = false;
        },
        enter(){
            this.show = true;
            let address = [
                AreaData[this.selectedProvinceIndex].n,
                AreaData[this.selectedProvinceIndex].c[this.selectedCityIndex].n,
                AreaData[this.selectedProvinceIndex].c[this.selectedCityIndex].c[this.selectedAreaIndex].n
            ]
            this.$emit('accept-result',address);
        },
        acceptResultProvince(v){
            this.selectedProvinceIndex = v;
            // this.city        = AreaData[v].c;
            this.area        = AreaData[v].c['0'].c.map((v,k)=>{
                return v.n
            });
        },
        acceptResultCity(v){
            this.selectedCityIndex = v;
            // this.area    = AreaData[this.selectedProvinceIndex].c[v].c;
        },
        acceptResultArea(v){
            this.selectedAreaIndex = v;
        }
    },
    watch:{
        selectedProvinceIndex(n,o){
            this.city = AreaData[n].c.map((v,k)=>{
                return v.n;
            });
        },
        selectedCityIndex(n,o){
            this.area = AreaData[this.selectedProvinceIndex].c[n].c.map((v,k)=>{
                return v.n;
            });
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
