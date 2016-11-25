<template lang="html">
    <div class="">
        <h1>名称：{{ Datas.title }}</h1>
        <h1>收益：{{ Datas.earnings }}</h1>
        <h1>期限：{{ Datas.date }}</h1>
        <h1>限额：{{ Datas.num }}</h1>
    </div>
</template>

<script>
export default {
    data(){
        return {
            Datas:JSON.parse(decodeURI(this.$route.params.Datas))
        }
    },
    beforeCreate(){

    },
    created(){
        // console.log(this.$route);
    }
}
</script>

<style lang="css">
</style>
