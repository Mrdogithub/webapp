<template>
<transition name="fade">
    <div class="orderConfirm" v-show = "orderConfirmStatus">
        <div class="messageInfoWrapper">
            <h2>{{title}}</h2>
            <p>{{message}}</p>
            <div class="btn-wrapper" v-show = "showCancel">
                <Button style="width:266px;height:45px;font-size:14px" type="primary" class="largeBtn" @click = "cancle" >取消</Button>
            </div>
            <div class="btn-wrapper" v-show="showTryAgain">
                <Button style="width:266px;height:45px;font-size:14px;color:rgb(45,150,205);background:#fff;border-color:rgb(45,150,205)" type="primary" class="largeBtn" @click = "tryAgain" >重新提交</Button>
            </div>
            <div class="btn-wrapper" v-show="showSuccess">
                <Button style="width:266px;height:45px;font-size:14px" type="primary" class="largeBtn" @click = "success" >好</Button>
            </div>
        </div>
    </div>
</transition>
</template>	
<script>
export default {
    props: {
        title: String,
        message: String,
        showCancel: Boolean,
        showTryAgain: Boolean,
        showSuccess: Boolean
    },
    data () {
        return {
            orderConfirmStatus: false,
            showCancel: false,
            showTryAgain: false,
            showSuccess: false
        }
    },
    methods: {
        cancle () {
            this.orderConfirmStatus = false
            this.$router.push({name: 'myAppointment'})
        },
        tryAgain () {
            this.orderConfirmStatus = false
        },
        success () {
            this.orderConfirmStatus = false
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .orderConfirm
        position:fixed
        top:0px
        width:100%
        height:100%
        left:0
        z-index:999
        overflow:auto
        backdrop-filter:blur
        background:rgba(7,17,27,0.8)
        .messageInfoWrapper
            position: relative
            top:30%
            left:0
            right:0
            bottom:0
            margin:auto
            width:91.2%
            min-height:200px
            background:rgb(249,252,255)
            border-radius:18px
            padding-bottom:17px
            &>h2
                font-size:17px
                padding:20px
                border-bottom:1px solid rgba(66,89,104,0.15)
            &>p
                margin:20px 17px 20px 16px
                font-size:14px
</style>



