<template>
<div class="previewOrderSummary">
	<div v-show = "previewOrderSummaryStatus">
		<bar v-bind="{ 'title': '订单详情预览', 'goBackIcon': true}"></bar>
		<div class="content-wrapper">
			<div class="input-wrapper">
				<p class="input-title">服务车辆</p>
				<div class="info">
					<img width="86" height="43"  v-bind:src='generateUrlForVehicle'/>
					<div class="info-text">
						<p>{{vehicleServicing.name}}</p>
					</div>
				</div>
			</div>
			<div class="input-wrapper">
				<p class="input-title">预约经销商</p>
				<div class="text-wrapper">
					<p>{{dealerInformation.name}}</p>
					<p>{{dealerInformation.address}}</p>
					<a href="tel:dealerInformation.phone">致电经销商</a>
				</div>
			</div>
			<div class="input-wrapper">
				<p class="input-title">订单信息</p>
				<Input v-model="contactNameLable" placeholder="" disabled disabled class="input-item">
					<span slot="prepend" style="display:none"></span>
					<span slot="append">{{contactName}}</span>
				</Input>
				<Input v-model="mobileNumberLable" placeholder=" " disabled class="input-item inputevenHook">
					<span slot="prepend" style="display:none"></span>
					<span slot="append">{{mobileNumber}}</span>
				</Input>
			</div>
			<div class="input-wrapper">
				<p class="input-title">当前里程</p>
				<Input v-model="currentMileage"   disabled placeholder="Enter your Odometer" class="input-item"></Input>
			</div>
			<div class="input-wrapper">
				<p class="input-title">服务类型</p>
				<Input v-model="serviceType" class="textAreaSize" placeholder="Any other service..."></Input>
			</div>
			<div class="input-wrapper">
				<p class="input-title">服务顾问</p>
				<Input v-model="serviceConsultant" disabled class="textAreaSize" placeholder="Any other service..."></Input>
			</div>
			<div class="input-wrapper">
				<p class="input-title">注意事项</p>
				<Input v-model="note" disabled class="textAreaSize" placeholder="Any other service..."></Input>
			</div>
			<div class="input-wrapper">
				<p class="input-title">预约时间</p>
				<Input v-model="appointmentTime" disabled class="textAreaSize" placeholder="Any other service..."></Input>
			</div>		
			<div class="largeBtnWrapper" style="margin-top:22px;margin-bottom:51px">
				<div>
					<Button type="primary"  class="largeBtn" @click="submitFn">提交</Button>
				</div>
				<div class="btn-wrapper modifyOrder">
					<Button type="primary"  class="largeBtn" @click="modifyOrder">修改订单</Button>
				</div>
			</div>
		</div>
	</div>
	<requestconfirmation ref = "requestconfirmationHook" @resubmit = "submitAgain"></requestconfirmation>
</div>
</template>

<script>
import bar from '../components/bar'
import requestconfirmation from '../views/requestConfirmation'
export default {
    props: {},
	data () {
		return {
			vertical: 'apple',
			contactNameLable: '联系人姓名',
			contactName: '',
			mobileNumberLable: '手机号码',
			mobileNumber: '',
			currentMileage: '',
			serviceType: '',
			serviceConsultant: '',
			note: '',
			appointmentTime: '',
			previewOrderSummaryStatus: true,
			vehicleServicing: {name: '', number: ''},
			dealerInformation: {name: '', address: '', phone: ''},
			submitOrderParams: {
				params: {
					'apptTime': '',
					'country': null,
					'language': null,
					'region': null,
					'vin': '',
					'mileage': '',
					'dealerCode': '',
					'mainServiceId': '',
					'additionalServices': null,
					'oldServices': null,
					'voucherCode': null,
					'customerAnnotation': null,
					'serviceAdvisorId': '',
					'customer': {
						'name': '',
						'phone': ''
					},
					'comments': '',
					'dealer': {
						'name': '',
						'phone': '',
						'address': ''
					}
				},
				headerContent: {
					headers: {
						'Auth-token': '',
						'Application-id': ''
					},
					'cors.allowOrigin': '*',
					'cors.supportedMethods': 'CONNECT, DELETE, GET, HEAD, OPTIONS, POST, PUT, TRACE, PATCH',
					'cors.supportedHeaders': 'token,Accept, Origin, X-Requested-With, Content-Type, Last-Modified',
					'cors.exposedHeaders': 'Set-Cookie',
					'cors.supportsCredentials': 'true'
				}
			}
		}
    },
    components: {
		'bar': bar,
		'requestconfirmation': requestconfirmation
	},
	created () {
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		this.modelYear = _osbAuth.selectedVehicle.modelYear
		this.modelName = _osbAuth.selectedVehicle.modelName.toLowerCase().replace(' ', '-').replace(/\s*/g, '')
		console.log(this.modelName)
		this.generateUrlForVehicle = 'https://www.fordpass.com.cn/content/dam/assets/cn/ford/vehicle/' + this.modelYear + '/' + this.modelYear + '-ford-' + this.modelName + '-s.png'
		console.log(this.generateUrlForVehicle + 'this.generateUrlForVehicle')
		this.submitOrderParams.headerContent.headers['Auth-token'] = _osbAuth.accessToken
		this.submitOrderParams.headerContent.headers['Application-id'] = _osbAuth.guid
		this.contactName = _osbAuth.selectServiceTypeParams.customer_name
		this.mobileNumber = _osbAuth.selectServiceTypeParams.customer_phoneNumber
		this.currentMileage = _osbAuth.selectServiceTypeParams.customer_mileage
		this.serviceConsultant = _osbAuth.selectServiceTypeParams.customer_consultant
		this.note = _osbAuth.selectServiceTypeParams.customer_note
		this.appointmentTime = _osbAuth.selectDateAndTime.apptTime
		this.vehicleServicing = {name: _osbAuth.selectedVehicle.modelName, vin: _osbAuth.selectedVehicle.vin}
		this.dealerInformation = {name: _osbAuth.chooseDealerParams.name, address: _osbAuth.chooseDealerParams.address, phone: _osbAuth.chooseDealerParams.OSBPhone, OSBDealerID: _osbAuth.chooseDealerParams.OSBDealerID}
		this.serviceType = _osbAuth.selectServiceTypeParams.customer_serviceType
	},
	methods: {
		showServiceDetail () {
			console.log('ss')
		},
		modifyOrder () {
			this.$router.push({name: 'selectDealerOption', params: this.$route.params})
		},
		submitAgain () {
			this.previewOrderSummaryStatus = true
		},
		submitFn () {
			let showAjaxStatus = true
			this.submitOrderParams.params = {
					'apptTime': this.appointmentTime,
					'country': null,
					'language': null,
					'region': null,
					'vin': this.vehicleServicing.vin,
					'mileage': this.currentMileage,
					'dealerCode': this.dealerInformation.OSBDealerID,
					'mainServiceId': this.serviceType,
					'additionalServices': null,
					'oldServices': null,
					'voucherCode': null,
					'customerAnnotation': null,
					'serviceAdvisorId': this.serviceConsultant,
					'customer': {
						'name': this.contactName,
						'phone': this.mobileNumber
					},
					'comments': this.note,
					'dealer': {
						'name': this.dealerInformation.name,
						'phone': this.dealerInformation.OSBPhone,
						'address': this.dealerInformation.address
					}
				}
			this.$http.post('https://servicebooking-service-qa.apps.cl-cn-east-preprod01.cf.ford.com/api/v1/bookings', this.submitOrderParams.params, this.submitOrderParams.headerContent).then((response) => {
				response = JSON.parse(response.bodyText)
				let showPostOverLay = true
				this.previewOrderSummaryStatus = false
				this.$refs.requestconfirmationHook.showRequestConfirmationStatus(showPostOverLay, showAjaxStatus)
			}, (response) => {
				let showPostOverLay = true
				this.previewOrderSummaryStatus = false
				this.$refs.requestconfirmationHook.showRequestConfirmationStatus(showPostOverLay, !showAjaxStatus)
			})
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.previewOrderSummary .largeBtnWrapper
		margin-top:20px
		text-align:center
	.previewOrderSummary .largeBtn
		width:90.1333%
		height 55px
	.previewOrderSummary .inputevenHook .ivu-input
		border-top:none
	.previewOrderSummary .ivu-input
		height:55px
		width: 100%
		padding-left:25px
		font-size:14px
		border-radius:0px
		border-left:none
		border-right:none
	.previewOrderSummary .ivu-radio-group
		width:100%
	.previewOrderSummary .ivu-radio-group-vertical .ivu-radio-wrapper
		height:55px
		line-height:55px
	.previewOrderSummary .select-item
		position:relative
		width: 85.7333%
		height:55px
		margin:0 auto
		line-height:55px	
		border-bottom:1px solid #dddee1
	.previewOrderSummary .radio-text
		position:absolute
		left:0px
	.previewOrderSummary .ivu-radio
		position:absolute
		right:0px
		top:18px
	.previewOrderSummary .ivu-input:hover
		border-top-color: #57a3f3
		border-bottom-color: #57a3f3
	.previewOrderSummary .ivu-input-group-prepend
		display:none
	.previewOrderSummary .ivu-input-group-append, .ivu-input-group-prepend
		background-color:#fff
		padding-right:16px
		font-size:14px
		color:rgb(149,149,149)
		border-right:none
		border-radius: 0px;
	.previewOrderSummary .ivu-input[disabled]
		background-color: #fff;
		opacity: 1;
		cursor: not-allowed;
		color: #000;
	.previewOrderSummary .ivu-btn-primary
		font-size:17px
		background:rgb(45,150,205)
		border-color:rgb(45,150,205)
	.previewOrderSummary .modifyOrder .ivu-btn-primary
		font-size:17px
		color:rgb(45,150,205)
		background:#fff
		border-color:rgb(45,150,205)
	.previewOrderSummary .inputevenHook .ivu-input-group-append
		border-top:0px
	.previewOrderSummary textarea.ivu-input
		width:90.1333%
		border:1px solid #dddee1
		border-radius:4px
	.previewOrderSummary .content-wrapper
		font-size:14px
		color:rgb(149,149,149)
	.previewOrderSummary .server-type-detail
		position: absolute;
		left: 30%;
		top:2%
		width: 50px;
		font-size: 21px;
		color:rgb(45,150,205)
	.previewOrderSummary .input-title
		height:50px
		font-size:14px
		color:rgb(149,149,149)
		line-height:50px
		background:rgb(249,252,255)
	.previewOrderSummary .text-wrapper
		padding:27px 18px 18px 22px
		text-align:left
		border-top:1px solid #dddee1
		border-bottom:1px solid #dddee1	
	.previewOrderSummary .info
		display:flex
		padding:15px
		border-top:1px solid #dddee1
		border-bottom:1px solid #dddee1
		&>img
			margin-right:16px
		.info-text
			float:left
		&>.info-text p
			width: 197px
			text-align: left
			font-size: 14px
			color: rgb(51,51,51)
			height: 100%
			padding: 10px
	.previewOrderSummary .radio-text
		font-size: 14px
	.previewOrderSummary .btn-wrapper
		margin-top:17px
</style>

