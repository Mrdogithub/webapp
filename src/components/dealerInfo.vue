<template>
        <div v-show = "showDealerInfo">
            <div class="dealerInfoWrapper" >
                <div class="dealerContentWrapper">
                    <div class="thumb">
                        <img src="../assets/dealerPin6@2x.png"/>
                    </div>
                    <div class="dealerContent">
                        <h2>{{dealerObj.name}}</h2>
                        <p>{{dealerObj.address}}</p>
                        <a href="tel:dealerObj.tel">致电经销商</a>
                    </div>
                </div>
            </div>
            <div class="selectBtn">
                <Button type="primary" size="large" class="largeBtn" @click = "goToSelectServiceType">选择服务类型</Button>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        'nextRouteName': String
    },
    data () {
       return {
           showDealerInfo: false,
           dealerObj: {}
       }
    },
    created () {
    },
    methods: {
        showDealerDetail (activeDealer, status) {
            this.dealerObj = activeDealer
            this.showDealerInfo = status
        },
        goToSelectServiceType () {
            let _self = this.dealerObj
            let _delaer = {name: _self.name, phone: _self.tel, address: _self.address, customer_mileage: ' ', customer_name: ' ', customer_phoneNumber: ' ', customer_consultant: ' ', customer_note: ' ', chooseDate: ' ', chooseTime: ' ', customer_serviceType: ' '}
            this.$router.push({name: this.nextRouteName, params: _delaer})
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .dealerInfoWrapper
        position: absolute
        bottom: 0px
        z-index: 999
        height: 203px
        width: 100%
        padding:18px 18px 29px 18px
        box-sizing:border-box
        background:#fff
        box-shadow: -4px -1px 27px #dbdbdb
        .dealerContentWrapper
            display:flex
            .thumb > img
                width:56px
                height:56px
                border-radius:12px
            .dealerContent
                flex:1 auto
                margin-left:16px
                text-align:left
            .dealerContent > h2
                margin-bottom:5px
                font-size:14px
                color:rgb(51,51,51)
            .dealerContent > p
                margin-bottom:5px
                font-size:12px
                color:rgb(149,149,149)
    .selectBtn
        position:absolute
        bottom:29px
        width:100%
        z-index: 999
</style>



