<template lang="html">
    <div class="test">
        {{data}}
        <input id="date-selector-input" type="text" readonly/>
        <div id="targetContainer"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'msg',
            data:''
        }
    }
}
</script>

<style lang="css">
.test{
    height: 50px;
    width: 50px;
}
</style>
