<template lang="html">
    <section class="'paySuccess'">
        <div class="paySuccess-content">
            <div class="content-icon">
                <img src="./images/pay_success.png" alt="">
                <p>充值成功{{paySuccess}}</p>
            </div>
            <div class="content-tips">赶紧去投资吧</div>
            <div class="content-btn">
                <a class="btn-investement" href="">我要投资</a>
                <a class="btn-back" href="">返回</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            msg:'paySuccess'
        }
    }
}
</script>
