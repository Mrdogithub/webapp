<template>
        <div v-show = "showDealerInfo" class="dealerInfo">
            <div class="dealerInfoWrapper" >
                <div class="dealerContentWrapper">
                    <div class="thumb">
                        <img src="../assets/group2@3x.png"/>
                    </div>
                    <div class="dealerContent">
                        <h2>{{dealerObj.name}}</h2>
                        <p>{{dealerObj.address}}</p>
                        <a :href= "callDealer()">致电经销商</a>
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
        callDealer () {
            return 'tel:' + this.dealerObj.OSBPhone
        },
        showDealerDetail (activeDealer, status) {
            this.dealerObj = activeDealer
            this.showDealerInfo = status
            if (status) {
                document.querySelector('.amap-geolocation-con').style.bottom = '250px'
            } else {
                document.querySelector('.amap-geolocation-con').style.bottom = '50px'
            }
        },
        goToSelectServiceType () {
            let _self = this.dealerObj
            let _delaer = {name: _self.name, OSBPhone: _self.OSBPhone, address: _self.address, OSBDealerID: _self.OSBDealerID}
            let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
            _osbAuth['chooseDealerParams'] = _delaer
            window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
            this.$router.push({name: 'selectServiceType'})
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .dealerInfo .dealerInfoWrapper
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
    .dealerInfo .selectBtn
        position:absolute
        bottom:29px
        width:100%
        z-index: 999
</style>