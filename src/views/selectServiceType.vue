<template>
<div class="selectServiceType">
  <bar v-bind="{ 'title': '选择服务类型','allIconStatus': false, 'goBackIcon': true}" ref = "barComponentHook"></bar>
	<div class="content-wrapper">
		<div class="input-wrapper">
			<p class="input-title">车主信息</p>
			<Input v-model="name" placeholder=" " class="input-item" type="text" v-bind:class="{ 'checkErrorName':checkName}">
				<span slot="prepend" style="display:none"></span>
        		<span slot="append" @click = "clearNameInput()"><Icon type="ios-close"></Icon></span>
			</Input>
			<Input v-model="phoneNumber" placeholder=" " maxlength="11" type="text" class="input-item inputevenHook" v-bind:class="{ 'checkErrorPhoneNumber':checkPhoneNumber}">
				<span slot="prepend" style="display:none"></span>
        		<span slot="append" @click = "clearPhoneNumberInput()"><Icon type="ios-close"></Icon></span>	
			</Input>
		</div>
		<div class="input-wrapper">
			<p class="input-title">当前里程</p>
			<Input v-model="mileage" class="input-item" type="text" v-bind:class="{ 'checkErrorMileage':checkMileage}">
   				<span slot="prepend" style="display:none"></span>
        		<span slot="append">km</span>
			</Input>
		</div>
		<div class="input-wrapper">
			<p class="input-title">服务类型</p>
			<RadioGroup v-model="serviceType" style="border: 1px solid #dddee1;">
				<div class="select-item">
					<Radio label="保养">
						<span class="radio-text">保养</span>
						<span class="server-type-detail" v-on:click="showServiceDetail"><Icon type="ios-information-outline"></Icon></span>
					</Radio>
				</div>
				<div class="select-item">
					<Radio label="维修">
						<span class="radio-text">维修</span>
					</Radio>
				</div>
				<div class="select-item">
					<Radio label="检查">
						<span class="radio-text">检查</span>
					</Radio>
				</div>
				<div class="select-item" style="border-bottom:none">
					<Radio label="其他">
						<span class="radio-text">其他</span>
					</Radio>
				</div>
			</RadioGroup>
		</div>
		<div class="input-wrapper">
			<p class="input-title">服务顾问</p>
			<seletios :listData="listData" @selectedValue= "getValueFromSelect" @show="showHidden" ref="selectConsultantHook"></seletios>
			<p @click= "showSelect" style="line-height: 51px;text-align: left;border: 1px solid rgb(221, 222, 225);width: 100%;height: 51px; padding-left:25px;font-size:14pxborder: 1px solid rgb(221, 222, 225);color:rgb(45,152,205)"> {{consultant}} <Icon type="ios-arrow-down" style="float: right;height: 51px;line-height: 51px;margin-right: 33px;font-size: 14px;"></Icon></p>
		</div>
		<div class="input-wrapper selectSerivceTypeTextArea">
			<p class="input-title">注意事项</p>
			<Input v-bind:class="{ 'maxlengthError': note.length >200}" v-model="note"  type="textarea" class="textAreaSize" placeholder="您是否需要其他服务……">	
			</Input>
			<span style="float:right;margin-right:25px" v-bind:class="{ 'errorNumber': note.length >200}">{{note.length}} /200</span>
		</div>
  	</div>
	<div class="largeBtnWrapper" v-bind:class="{ 'submitDisabled':!onSubmitFlag}">
		<Button type="primary" class="largeBtn" @click = "goToSelectDayAndTime()">请选择服务日期和时段</Button>
	</div>

</div>
</template>

<script>
import bar from '../components/bar'
import seletIOS from '../components/selectIOS'
export default {
    props: {},
	data () {
		return {
			listData: [	{ 'id': '1', 'name': '张三' }, { 'id': 'CF3225001000', 'name': '杜鹏飞' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' }, { 'id': 'CF3225001409', 'name': '毛玉亭' } ],
			Hidden: false,
			serviceType: '',
			name: '',
			phoneNumber: '',
			mileage: '',
			form: {
				checkName: false,
				checkPhoneNumber: false,
				checkConsultant: false,
				checkServiceType: false,
				checkMileage: false
			},
			consultant: '请选择',
			note: '',
			consultantArr: [],
			serviceAdvisorsParams: {
				params: {'OSBDealerID': ''},
				'headersContent': {
					headers: {
						'auth-token': '',
						'application-id': ''
					}
				}
			}
		}
	},
	created () {
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		this.name = _osbAuth.userName
		this.phoneNumber = _osbAuth.phoneNumber
		this.serviceAdvisorsParams.params.OSBDealerID = _osbAuth.chooseDealerParams.OSBDealerID
		this.serviceAdvisorsParams.headersContent.headers['Auth-token'] = _osbAuth.accessToken
		this.serviceAdvisorsParams.headersContent.headers['Application-id'] = _osbAuth.guid
		this.getServiceAdvisors()
	},
	mounted () {
	},
	computed: {
		checkName () {
			if (!this.name) {
				return true
			} else {
				return false
			}
		},
		checkPhoneNumber () {
			if (!this.phoneNumber) {
				return true
			} else {
				return false
			}
		},
		checkMileage () {
			if (!this.mileage) {
				return true
			} else {
				return false
			}
		},
		checkServiceType () {
			if (!this.ServiceType) {
				return true
			} else {
				return false
			}
		},
		onSubmitFlag () {
			this.showError()
			if (!this.name) {
				return false
			} else if (!this.phoneNumber) {
				return false
			} else if (!this.mileage) {
				return false
			} else if (!this.serviceType) {
				return false
			} else if (this.consultant === '请选择') {
				return false
			}

			if (this.name && this.phoneNumber && this.mileage && this.consultant !== '请选择' && this.serviceType) {
				return true
			}
		}
	},
    components: {
		'bar': bar,
		'seletios': seletIOS
    },
	methods: {
		getServiceAdvisors () {
			this.$http.get('https://servicebooking-service-qa.apps.cl-cn-east-preprod01.cf.ford.com/api/v2/dealers/' + this.serviceAdvisorsParams.params.OSBDealerID + '/serviceadvisors', this.serviceAdvisorsParams.headersContent).then((response) => {
				response = JSON.parse(response.bodyText)
				console.log(1, response)
			}, (response) => {
				// 响应错误回调
			})
		},
		showError () {
			if (this.phoneNumber.length < 11) {
				this.$refs.barComponentHook.errorCloseFn('手机号码必须为11位', this.phoneNumber.length)
			}
		},
		clearNameInput () {
			this.name = ''
		},
		clearPhoneNumberInput () {
			this.phoneNumber = ''
		},
		showHidden (status) {
			this.Hidden = status
		},
		getValueFromSelect (consultant) {
			this.consultant = consultant
		},
		showSelect () {
			this.$refs.selectConsultantHook.showSelectConsultant()
		},
		showServiceDetail () {
			this.$router.push({name: 'selectServiceDetail'})
		},
		goToSelectDayAndTime () {
			let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			_osbAuth['selectServiceTypeParams'] = {
				'customer_mileage': this.mileage,
				'customer_name': this.name,
				'customer_phoneNumber': this.phoneNumber,
				'customer_consultant': this.consultant,
				'customer_note': this.note,
				'customer_serviceType': this.serviceType
			}
            window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
            this.$router.push({name: 'selectDateAndTime'})
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.selectServiceType .largeBtnWrapper
		margin-top:50px
		margin-bottom:50px
		text-align:center
	.selectServiceType .largeBtn
		width:90.1333%
		height 55px
	.checkErrorName .ivu-input,
	.checkErrorMileage .ivu-input,
	.checkErrorServiceType .ivu-input,
	.checkErrorPhoneNumber .ivu-input,
	.selectServiceType .checkErrorName .ivu-input-group-append,
	.selectServiceType .checkErrorMileage .ivu-input-group-append,
	.selectServiceType .checkErrorPhoneNumber .ivu-input-group-append
		background:rgba( 208,2,27,0.05)
		border-top:1px solid rgb(208,2,27)
		border-bottom:1px solid rgb(208,2,27)
	.selectServiceType .ivu-input
		height:55px
		width: 100%
		border-radius:0px
		border-left:none
		border-right:none
		padding-left:25px
		color:rgb(51,51,51)
		font-size:14px
	.selectServiceType .ivu-radio-group
		width:100%
		padding-right:25px
		padding-left:25px
	.selectServiceType .ivu-radio-wrapper
		height:55px
		line-height:55px
		width:100%
	.selectServiceType .select-item
		position:relative
		width: 100%
		height:55px
		margin:0 auto
		line-height:55px	
		border-bottom:1px solid #dddee1
	.selectServiceType .radio-text
		position:absolute
		left:0px
	.selectServiceType .ivu-radio
		position:absolute
		right:0px
		top:18px
	.selectServiceType .ivu-input:hover
		border-top-color: #57a3f3
		border-bottom-color: #57a3f3
	.selectServiceType .ivu-input-group-prepend
		display:none
	.selectServiceType	.ivu-input-group-append
		padding-right:25px
		font-size:14px
		color:rgb(51,51,51)
	.selectServiceType .ivu-input-group-append, .ivu-input-group-prepend
		background-color:#fff
		border-right:none
		border-radius: 0px;
	.selectServiceType textarea.ivu-input
		border:1px solid #dddee1
		border-radius:4px
		padding-left:5px
	.selectServiceType .content-wrapper
		font-size:14px
		color:rgb(149,149,149)
	.selectServiceType .server-type-detail
		position: absolute;
		left: 30%;
		top:2%
		width: 50px;
		font-size: 21px;
		color:rgb(45,150,205)
	.selectServiceType .input-title
		height:50px
		font-size:14px
		color:rgb(149,149,149)
		line-height:50px
		background:rgb(249,252,255)
	.selectServiceType .radio-text
		font-size: 14px
		color:rgb(51,51,51)
	.selectServiceType	.ivu-icon-ios-close
		color:rgb(219,219,219)
	.selectServiceType .ivu-btn-primary
		background-color: rgb(45,150,205)
		border-color: rgb(45,150,205)
		font-size:14px
	.selectServiceType	.ivu-select-single .ivu-select-selection
		height:51px
		border-radius: 0px
	.selectSerivceTypeTextArea .ivu-input-wrapper
		padding-left: 18px;
		padding-right: 19px;
	.maxlengthError textarea.ivu-input
		background:rgba( 208,2,27,0.05)
	.errorNumber
		color:rgb(208,2,27)
	.submitDisabled .ivu-btn-primary
		background-color: rgb(193,193,193)
		border-color: rgb(193,193,193)
		font-size:14px
		color:#fff
		
</style>

