<template lang="html">
    <div class="test">
        {{data}}
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
