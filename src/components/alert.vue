<template>
<transition name="fade">
    <div class="orderConfirm" v-show = "orderConfirmStatus">
        <div class="messageInfoWrapper">
            <h2>{{title}}</h2>
            <p>{{message}}</p>
            <div class="btn-wrapper" v-show = "showCancel">
                <Button style="width:266px;height:45px;font-size:14px" type="primary" class="largeBtn" @click = "cancle" >好</Button>
            </div>
            <div class="btn-wrapper" v-show="showTryAgain">
                <Button style="width:266px;height:45px;font-size:14px;color:rgb(45,150,205);background:#fff;border-color:rgb(45,150,205)" type="primary" class="largeBtn" @click = "tryAgain" >重试</Button>
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
        showTryAgain: Boolean
    },
    data () {
        return {
            orderConfirmStatus: false,
            showCancel: false,
            showTryAgain: false
        }
    },
    methods: {
        cancle () {
            this.orderConfirmStatus = false
        },
        showAlert () {
            this.orderConfirmStatus = true
        },
        tryAgain () {

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
            position:absolute
            top:0
            left:0
            right:0
            bottom:0
            margin:auto
            width:91.2%
            min-height:230px
            max-height: 300px;
            background:rgb(249,252,255)
            border-radius:18px
            &>h2
                font-size:17px
                padding:20px
                border-bottom:1px solid rgba(66,89,104,0.15)
            &>p
                margin:20px 17px 20px 16px
                font-size:14px
</style>



