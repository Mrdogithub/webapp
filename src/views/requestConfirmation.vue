<template>
<div class="requestConfirmation">
	<div v-show = "requestConfirmationStatus"> 
		<bar v-bind="{ 'title': '订单确认','goBackIcon': false}"></bar>
		<div class="content-wrapper" v-show = "!submitSuccess">
			<div>
				<img src="../assets/successLarge@3x.png" width="87.2" height="68.6" style="margin-top:150px;"/>
				<h2 class="request-title">订单已确认</h2>
				<p class="text-content">
					您的服务订单已提交，请将您的车辆送至以下经销商: 
				</p>
				<p class="text-content">
					{{requestConfirmationData.name}}{{requestConfirmationData.address}}
					<span>致电经销商:{{requestConfirmationData.phone}}</span>
				</p>
				<p class="text-content"> 
					预约时间:{{appointmentTimeStandard}}
				</p>
			</div>	
			<div class="largeBtnWrapper">
				<div>
					<Button type="primary" class="largeBtn" @click="saveToCalendar" v-bind:disabled="saveToCalendarFlag">设置提醒</Button>
				</div>
				<div class="btn-wrapper modifyOrder">
						<Button type="primary" class="largeBtn" @click = "goToMyAppointment">好</Button>
				</div>
			</div>
		</div>

		<div class="content-wrapper" v-show = "!submitSuccess">
			<div>
				<img src="../assets/warning@3x.png"  width="87.2" height="68.6" style="margin-top:150px;"/>
				<h2 class="request-title">订单提交失败</h2>
				<p class="text-content">
					未能提交您的服务订单，请重试。
				</p>
			</div>	
			<div class="largeBtnWrapper">
				<div>
					<Button type="primary"  class="largeBtn" @click = "reSubmit">重新提交</Button>
				</div>
				<div class="btn-wrapper modifyOrder">
					<Button type="primary" class="largeBtn" @click = "goToDashboard">取消</Button>
				</div>
			</div>
		</div>
		<alert v-bind="{title: this.title, message: this.message,showCancel: this.showCancel,showTryAgain:this.showTryAgain,showSuccess:this.showSuccess}" ref = "alertHook"></alert>
	</div>
</div>
</template>

<script>
import bar from '../components/bar'
import alert from '../components/alert'
export default {
	data () {
		return {
			requestConfirmationData: {name: '', address: '', phone: ''},
			requestConfirmationStatus: false,
			appointmentTime: '',
			title: '',
			message: '',
			showCancel: false,
			showTryAgain: false,
			showSuccess: false,
			saveToCalendarFlag: false
		}
    },
    components: {
		'bar': bar,
		'alert': alert
	},
	created () {
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		this.appointmentTimeStandard = _osbAuth.appointmentTimeStandard
		this.appointmentTime = _osbAuth.selectDateAndTime.apptTime
		this.requestConfirmationData = {name: _osbAuth.chooseDealerParams.name, address: _osbAuth.chooseDealerParams.address, phone: _osbAuth.chooseDealerParams.OSBPhone}
	},
	methods: {
		callDealer () {
			return 'tel:' + this.requestConfirmationData.phone
		},
		showRequestConfirmationStatus (status, resultStatus) {
			this.requestConfirmationStatus = status
			this.submitSuccess = resultStatus
		},
		goToDashboard () {
			var isAndroid = ''
			var isiOS = ''
			var u = navigator.userAgent
			isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
			isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+ Mac OS X/) // ios终端
			if (isAndroid) {
				window.AppModel.postMessage(JSON.stringify({'message': 'gotoDashboard'}))
			} else if (isiOS) {
				window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoDashboard'})
			}
		},
		goToMyAppointment () {
			let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			let modifyOrderId = _osbAuth.modifyOrderId
			console.log('orderId:' + modifyOrderId)
			var isAndroid = ''
			var isiOS = ''
			var u = navigator.userAgent
			isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
			isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+ Mac OS X/) // ios终端
			if (isAndroid) {
				if (modifyOrderId) {
					window.AppModel.postMessage(JSON.stringify({'message': 'modifyOrderSuccess'}))
				} else {
					window.AppModel.postMessage(JSON.stringify({'message': 'createOrderSuccess'}))
				}
			} else if (isiOS) {
				if (modifyOrderId) {
					window.webkit.messageHandlers.AppModel.postMessage({'message': 'modifyOrderSuccess'})
				} else {
					window.webkit.messageHandlers.AppModel.postMessage({'message': 'createOrderSuccess'})
				}
			}
			this.$router.push({name: 'myAppointment'})
		},
		reSubmit () {
			console.log('resubmit')
			this.$emit('resubmit')
		},
		saveToCalendar () {
			let startTimeStamp = new Date(this.appointmentTime.split('-').join('/').replace('T', ' ')).getTime() // 开始时间戳
			let startTime = new Date(startTimeStamp) // Sat Dec 16 2017 11:00:00 GMT+0800 (China Standard Time)
			let startY = startTime.getFullYear() + '-'
			let startM = (startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1) + '-'
			let startD = (startTime.getDate() < 10 ? '0' + startTime.getDate() : startTime.getDate()) + ' '
			let starth = (startTime.getHours() < 10 ? '0' + startTime.getHours() : startTime.getHours()) + ':'
			let startm = (startTime.getMinutes() < 10 ? '0' + startTime.getMinutes() : startTime.getMinutes()) + ':'
			let starts = (startTime.getSeconds() < 10 ? '0' + startTime.getSeconds() : startTime.getSeconds())
			this.start = startY + startM + startD + starth + startm + starts
			console.log(this.start)
			let endTime = new Date(startTimeStamp + 1800000) // China Standard Time
			let endY = endTime.getFullYear() + '-'
			let endM = (endTime.getMonth() + 1 < 10 ? '0' + (endTime.getMonth() + 1) : endTime.getMonth() + 1) + '-'
			let endD = (endTime.getDate() < 10 ? '0' + endTime.getDate() : endTime.getDate()) + ' '
			let endh = (endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()) + ':'
			let endm = (endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes()) + ':'
			let ends = (endTime.getSeconds() < 10 ? '0' + endTime.getSeconds() : endTime.getSeconds())
			this.end = endY + endM + endD + endh + endm + ends
			console.log(this.end)
			this.saveToCalendarFlag = true
			var isAndroid = ''
			var isiOS = ''
			var u = navigator.userAgent
			isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
			isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+ Mac OS X/) // ios终端
			if (isAndroid) {
				window.AppModel.postMessage(JSON.stringify({
					'message': 'saveToCalendar',
					'data': {
						'startDate': this.start,
						'endDate': this.end,
						'title': '预约时间',
						'content': '预约内容'
					}
				}))
			} else if (isiOS) {
				window.webkit.messageHandlers.AppModel.postMessage({
					'message': 'saveToCalendar',
					'data': {
						'startDate': this.start,
						'endDate': this.end,
						'title': '预约时间',
						'content': '预约内容'
					}
				})
			}
			let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			let saveToCalendarStatus = _osbAuth['saveToCalendarStatus']
			console.log(saveToCalendarStatus)
            setTimeout(() => {
				if (saveToCalendarStatus === 'noResponse') {
					this.$refs.alertHook.orderConfirmStatus = false
					console.log('no-response')
				} else if (saveToCalendarStatus === true || saveToCalendarStatus === 'true') {
					this.$refs.alertHook.orderConfirmStatus = true
					this.showSuccess = true
					this.title = '您已设置提醒'
					this.message = '您预约的服务将被自动添加至您的日历中'
					_osbAuth['saveToCalendarStatus'] = 'noResponse'
				} else if (saveToCalendarStatus === false || saveToCalendarStatus === 'false') {
					this.$refs.alertHook.orderConfirmStatus = true
					this.showCancel = true
					this.showTryAgain = true
					this.title = '设置提醒失败'
					this.message = '无法将您的服务提醒保存至您的日历'
					_osbAuth['saveToCalendarStatus'] = 'noResponse'
				}
				this.saveToCalendarFlag = false
			}, 500)
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.requestConfirmation
		position: absolute
		top: 0px
		background: #fff
		width: 100%
		z-index: 999
	.requestConfirmation .largeBtnWrapper
		margin-top:60px
		text-align:center
	.requestConfirmation .largeBtn
		width:90.1333%
		height 55px
	.requestConfirmation .request-title
		width:325px
		text-align:center
		margin:0 auto;
		margin-top:27.4px
		margin-bottom:27.4px
		color:rgb(12,55,94)
		font-size:17px
		font-weight:normal
	.requestConfirmation .text-content
		width:325px
		text-align:center
		margin:0 auto
		margin-bottom:10px
		font-size:14px
		color:rgb(51,51,51)
	.requestConfirmation .btn-wrapper
		margin-top:17px
	.requestConfirmation .ivu-btn-primary
		font-size:17px
		color:#fff
		background:rgb(45,150,205)
		border-color:rgb(45,150,205)
	.requestConfirmation .modifyOrder .ivu-btn-primary
		font-size:17px
		color:rgb(45,150,205)
		background:#fff
		border-color:rgb(45,150,205)
</style>

