<template lang="html">
    <div class="appfooter">
        {{msg}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'appfooter'
        }
    }
}
</script>

<style lang="css">
.appfooter{
    border: 1px green solid;
}
</style>
