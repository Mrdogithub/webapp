<template>
<div>
  <bar v-bind="{ 'title': '选择服务类型','allIconStatus': false, 'goBackIcon': true}"></bar>
	<div class="content-wrapper">
		<div class="input-wrapper">
			<p class="input-title">车主信息</p>
			<Input v-model="name" placeholder=" " class="input-item"></Input>
			<Input v-model="phoneNumber" placeholder=" " class="input-item inputevenHook"></Input>
		</div>
		<div class="input-wrapper">
			<p class="input-title">当前里程</p>
			<Input v-model="mileage" placeholder="Enter your Odometer" class="input-item">
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
			<Input v-model="consultant" placeholder="Enter your Odometer" class="input-item" @click="showSelect"></Input>
		</div>
		<div class="input-wrapper">
			<p class="input-title">注意事项</p>
			<Input v-model="note" type="textarea" class="textAreaSize" placeholder="您是否需要其他服务……"></Input>
		</div>
  	</div>
	<div class="largeBtnWrapper">
		<Button type="primary" class="largeBtn" @click = "goToSelectDayAndTime()">请选择服务日期和时段 </Button>
	</div>

</div>
</template>

<script>
import bar from '../components/bar'
export default {
    props: {},
	data () {
		return {
			month: 2,
			Hidden: false,
			serviceType: '',
			name: '',
			phoneNumber: '',
			mileage: '',
			consultant: '',
			note: ''
		}
	},
	created () {
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		this.name = _osbAuth.userName
		this.phoneNumber = _osbAuth.phoneNumber
		console.log(1, this.$route)
		console.log(this.$route.params)
	},
	mounted () {
	},
    components: {
		'bar': bar
    },
	methods: {
		showSelect () {},
		showServiceDetail () {
			this.$router.push({name: 'selectServiceDetail'})
		},
		goToSelectDayAndTime () {
			this.$route.params['customer_mileage'] = this.mileage
			this.$route.params['customer_name'] = this.name
			this.$route.params['customer_phoneNumber'] = this.phoneNumber
			this.$route.params['customer_consultant'] = this.consultant
			this.$route.params['customer_note'] = this.note
			this.$route.params['customer_serviceType'] = this.serviceType

			console.log(1, this.$route.params)
			// let _self = this.dealerObj
			// let _delaer = {name: _self.name, phone: _self.tel, address: _self.address}
			// let _dayAndTime = {'name': this.name, 'phoneNumber': this.phoneNumber, 'mileage': this.mileage, 'consultant': this.consultant, 'note': this.note}
           this.$router.push({name: 'selectDateAndTime', params: this.$route.params})
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.bar
		height:60px
		background:rgb(69,150,164)
		padding-top:22px
		border-radius 15px 15px 0 0
	.bar-title
		text-align:center
		font-size:17px
		color:#fff
	.largeBtnWrapper
		margin-top:20px
		text-align:center
	.largeBtn
		width:90.1333%
		height 55px
	.inputevenHook .ivu-input
		border-top:none
	
	.ivu-input
		height:55px
		width: 100%
		border-radius:0px
		border-left:none
		border-right:none
	.ivu-radio-group
		width:100%
	.ivu-radio-wrapper
		height:55px
		line-height:55px
		width:100%
	.select-item
		position:relative
		width: 85.7333%
		height:55px
		margin:0 auto
		line-height:55px	
		border-bottom:1px solid #dddee1
	.radio-text
		position:absolute
		left:0px
	.ivu-radio
		position:absolute
		right:0px
		top:18px
	.ivu-input:hover
		border-top-color: #57a3f3
		border-bottom-color: #57a3f3
	.ivu-input-group-prepend
		display:none
	.ivu-input-group-append, .ivu-input-group-prepend
		background-color:#fff
		border-right:none
		border-radius: 0px;
	textarea.ivu-input
		width:90.1333%
		border:1px solid #dddee1
		border-radius:4px
	.content-wrapper
		font-size:14px
		color:rgb(149,149,149)
	.server-type-detail
		position: absolute;
		left: 30%;
		top:2%
		width: 50px;
		font-size: 21px;
		color:rgb(45,150,205)
	.input-title
		height:50px
		font-size:14px
		color:rgb(149,149,149)
		line-height:50px
		background:rgb(249,252,255)

	.radio-text
		font-size: 14px
</style>

