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
					<a href="tel:requestConfirmationData.phone">致电经销商:{{requestConfirmationData.phone}}</a>
				</p>
				<p class="text-content"> 
					预约时间:
					{{requestConfirmationData.chooseDate}}{{requestConfirmationData.chooseTime}}
				</p>
			</div>	
			<div class="largeBtnWrapper">
				<div>
					<Button type="primary"  class="largeBtn" @click="saveToCalendar">设置提醒</Button>
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
		</div>
		<alert v-bind="{title:this.title, message: this.message,showCancel: showCancelBtn,showTryAgain:showTryAgainStatus}" ref = "alertHook"></alert>
</div>
</template>

<script>
import bar from '../components/bar'
import alert from '../components/alert'
export default {
	data () {
		return {
			requestConfirmationData: {},
			requestConfirmationStatus: false,
			title: '',
			message: ''
		}
    },
    components: {
		'bar': bar,
		'alert': alert
    },
	methods: {
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
				this.$router.push({name: 'myAppointment'})
				var isAndroid = ''
				var isiOS = ''
				var u = navigator.userAgent
				isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
				isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+ Mac OS X/) // ios终端
				if (isAndroid) {
					window.AppModel.postMessage(JSON.stringify({'message': 'createOrderSuccess'}))
				} else if (isiOS) {
					window.webkit.messageHandlers.AppModel.postMessage({'message': 'createOrderSuccess'})
				}
		},
		reSubmit () {
			console.log('re')
			this.requestConfirmationStatus = false
			this.$emit('resubmit', true)
		},
		saveToCalendar () {
				let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
				console.log(1, _osbAuth)
				this.showCancelBtn = true
				this.showTryAgainStatus = true
				this.title = '您已设置提醒'
				this.message = '您预约的服务将被自动添加至您的日历中。'
				this.$refs.alertHook.showAlert()
				console.log('_osbAuth.selectDateAndTime.apptTime')
				console.log(_osbAuth.selectDateAndTime.apptTime.split('-').join('/').replace('T', ' '))
                var startTimeStamp = new Date(_osbAuth.selectDateAndTime.apptTime.split('-').join('/').replace('T', ' ')).getTime() // 开始时间戳
				console.log('save to calendar-----')
				console.log(startTimeStamp)
				var startTime = new Date(startTimeStamp) // Sat Dec 16 2017 11:00:00 GMT+0800 (China Standard Time)
				console.log('save to calendar again')
				console.log(startTimeStamp)
				var startY = startTime.getFullYear() + '-'
				var startM = (startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1) + '-'
				var startD = (startTime.getDate() < 10 ? '0' + startTime.getDate() : startTime.getDate()) + ' '
				var starth = (startTime.getHours() < 10 ? '0' + startTime.getHours() : startTime.getHours()) + ':'
				var startm = (startTime.getMinutes() < 10 ? '0' + startTime.getMinutes() : startTime.getMinutes()) + ':'
				var starts = (startTime.getSeconds() < 10 ? '0' + startTime.getSeconds() : startTime.getSeconds())
				this.start = startY + startM + startD + starth + startm + starts
				var endTime = new Date(startTimeStamp + 1800000) // China Standard Time
				var endY = endTime.getFullYear() + '-'
				var endM = (endTime.getMonth() + 1 < 10 ? '0' + (endTime.getMonth() + 1) : endTime.getMonth() + 1) + '-'
				var endD = (endTime.getDate() < 10 ? '0' + endTime.getDate() : endTime.getDate()) + ' '
				var endh = (endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()) + ':'
				var endm = (endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes()) + ':'
				var ends = (endTime.getSeconds() < 10 ? '0' + endTime.getSeconds() : endTime.getSeconds())
				this.end = endY + endM + endD + endh + endm + ends
				var isAndroid = ''
				var isiOS = ''
				var u = navigator.userAgent
				isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
				isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+ Mac OS X/) // ios终端

				console.log(this.start)
				console.log(this.end)
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
		background:rgb(45,150,205)
		border-color:rgb(45,150,205)
	.requestConfirmation .modifyOrder .ivu-btn-primary
		font-size:17px
		color:rgb(45,150,205)
		background:#fff
		border-color:rgb(45,150,205)
</style>

