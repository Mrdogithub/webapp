<template>
  	<div class="bar-wrapper">
        <div class="bar">
            <div v-show = "goBackIcon" class="arrow-left" @click="goBack(title)"><Icon type="android-arrow-back"></Icon></div>
            <h1 class="bar-title">{{title}}</h1>
            <div class="arrow-right" @click="switchView" v-show= "allIconStatus">
                <transition name="fade">
                    <Icon type="ios-list-outline" v-show = "!iconStatus"></Icon>
                </transition>
                <transition name="fade">
                    <Icon type="map" v-show = "iconStatus"></Icon>
                </transition>
            </div>
        </div>
        <transition name="fade">
            <div class="errorMessageWrapper" v-show="errorMessageStatus">
                <span class="errorText">{{errorMessageText}}</span>
                <a class="errorClose" @click="errorCloseFn"><Icon type="ios-close-empty"></Icon></a>
            </div>
        </transition>
	</div>
</template>

<script>
export default {
    props: {
       title: String,
       allIconStatus: Boolean,
       goBackIcon: Boolean
    },
    data () {
       return {
            errorMessageStatus: false,
            errorMessageText: '',
            iconStatus: true
       }
    },
    created () {
    },
    methods: {
        goBack (type) {
            console.log(1, type)
            var isAndroid = ''
            var isiOS = ''
            var u = navigator.userAgent
            if (type === '选择经销商') {
                isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
                isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
                if (isAndroid) {
					window.AppModel.postMessage(JSON.stringify({'message': 'gotoChooseVehicle'}))
				} else if (isiOS) {
					window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoChooseVehicle'})
                }
            } else if (type === 'Order Summary') {
                isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
                isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
                if (isAndroid) {
					window.AppModel.postMessage(JSON.stringify({'message': 'gotoAppointmentList'}))
				} else if (isiOS) {
					window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoAppointmentList'})
                }
            } else {
                this.$router.goBack(-1)
            }
        },
        switchView () {
            this.iconStatus = !this.iconStatus
            this.$emit('icon-switch-status', this.iconStatus)
        },
        errorCloseFn (errorMessageText, status) {
            this.errorMessageText = errorMessageText
            status === 10 ? this.errorMessageStatus = false : this.errorMessageStatus = status
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .bar-wrapper
        max-height:108px
        width:100%
        position:fixed
        z-index:999
    .bar-wrapper .bar
        display:flex
        height:58px
        background:rgb(69,150,164)
        padding-top:22px
        border-radius: 15px 15px 0 0
        .bar-title
            flex:1 auto
            text-align:center
            font-size:17px
            color:#fff
        .arrow-left
            flex:50px auto
            margin-top: -10px;
            margin-left:20px
            font-size:25px
            color:#fff
        .arrow-right
            width: 30px
            margin-top: -10px;
            flex:50px auto
            margin-right:20px
            font-size:25px
            color:#fff
    .bar-wrapper .errorMessageWrapper
        width:100%
        min-height:56px
        position:absolute
        z-index: 6
        background:rgb(207,2,27)
        .errorClose
            width: 50px
            height: 100%
            padding: 14px
            color: #fff
            position: absolute
            right: 0px
            display: inline-block
        .errorText
            font-size: 14px;
            color: #fff;
            display: inline-block;
            height: 100%;
            width: 87%;
            text-align: left;
            padding: 17px;
</style>



