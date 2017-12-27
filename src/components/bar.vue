<template>
  	<div class="bar-wrapper">
        <div class="bar">
            <div v-show = "goBackIcon" class="arrow-left" @click="goBack(title)"><Icon type="android-arrow-back"></Icon></div>
            <h1 class="bar-title">{{title}}</h1>
            <div class="arrow-right" @click="switchView" v-show= "allIconStatus">
                <transition>
                    <i class="ios-list-outline" v-show = "iconStatus"></i>
                </transition>
                <transition>
                    <i class="mapIcon" v-show = "!iconStatus"></i>
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
            } else if (type === '订单详情') {
                isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
                isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
                if (isAndroid) {
					window.AppModel.postMessage(JSON.stringify({'message': 'gotoAppointmentList'}))
				} else if (isiOS) {
					window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoAppointmentList'})
                }
                this.$router.push({name: 'myAppointment'})
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
            margin-top: -10px
            margin-left:20px
            font-size:25px
            color:#fff
        .arrow-right
            width: 30px
            margin-top: -10px
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
            font-size: 14px
            color: #fff
            display: inline-block
            height: 100%
            width: 87%
            text-align: left
            padding: 17px
    .bar-wrapper .ios-list-outline
        display:block
        height: 20px
        margin-top: 12px
        background-repeat: no-repeat
        background-size: contain
        background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAALGPC/xhBQAAANpJREFUaAXt1kEKgzAQheFEurCCW+/Rc/QWHqPgNdy3eBEP0kUPUuJzFwKuzGJw/kAgmRCZfBmIIdAQQAABBBBAAAEEEEAAAQQQQODyAjE/YUqp1XxUH/K4xl/1JcaYinjQnodiT/VbuWZo/lMuH+X/L5OctPA6SLRR/J2v6bCd5qt6n8eNju/Ka94P4aq5K2lXt8thEUAAAQSsC7h7h/m1tF6SZ/NzV9JnwdiPAAIIIIBARQF37zC/lhWrx+Sn3JW0yVsgKQQQQAABBBBAAAEEEEAAAQQQqCuwAZsbWkOxqknwAAAAAElFTkSuQmCC')
    .bar-wrapper .mapIcon
        display:block
        height: 20px
        margin-top: 12px
        background-repeat: no-repeat
        background-size: contain
        background-image:url('data:image/png;base64,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')
</style>



