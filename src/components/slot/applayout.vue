<template lang="html">
    <div class="applayout">
        <slot name="header"></slot>

        <!-- 只有父组件没有分发内容时候才显示默认且没有具名的slot -->
        <slot>没有内容才显示这个分发的slot</slot>

        <slot name="main" text="hello from child"></slot>

        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'applayout'
        }
    },
    methods:{

    }

}
</script>

<style lang="css">
.applayout{
    border: 1px solid red;
}
</style>
