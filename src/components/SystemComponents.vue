<template lang="html">
    <section>

        <ul>
            <li></li>
        </ul>
        <Switchs
            v-bind:title="'开始'"
            v-bind:Active="isActive"
            v-on:accept-result="acceptResult"
        ><Switchs/>
    </section>
</template>

<script>
import switchs from './testComponents/switch.vue';
export default {
    name:'systemcompoents',
    data(){
        return{
            msg:'systemcompoents',
            isActive:true
        }
    },
    components:{
        Switchs:switchs
    },
    methods:{
        acceptResult(val){
            this.isActive = val;
            // console.log(val);
        }
    },
    watch:{
        isActive(n,o){
            console.log(n);
        }
    }
}
</script>

<style lang="less">
</style>
