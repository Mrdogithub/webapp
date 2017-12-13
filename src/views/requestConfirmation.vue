<template>
<div v-show = "requestConfirmationStatus" class="requestConfirmation">
  <bar v-bind="{ 'title': '订单确认','goBackIcon': false}"></bar>
	<div class="content-wrapper" v-show = "submitSuccess">
		<div>
			<img src="../assets/successLarge.png" width="87.2" height="68.6" style="margin-top:150px;"/>
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
				<Button type="primary" size="large" class="largeBtn" >设置提醒</Button>
			</div>
			<div class="btn-wrapper modifyOrder">
				
				<router-link to="/myAppointment">
					<Button type="primary" size="large" class="largeBtn" >好</Button>
				</router-link>
			</div>
		</div>
	</div>

	<div class="content-wrapper" v-show = "!submitSuccess">
		<div>
			<img src="../assets/group2.png"  width="87.2" height="68.6" style="margin-top:150px;"/>
			<h2 class="request-title">订单提交失败</h2>
			<p class="text-content">
				未能提交您的服务订单，请重试。
			</p>
		</div>	
		<div class="largeBtnWrapper">
			<div>
				<router-link to="/">
					<Button type="primary"  class="largeBtn" >重新提交</Button>
				</router-link>
			</div>
			<div class="btn-wrapper modifyOrder">
				<Button type="primary" class="largeBtn" >取消</Button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import bar from '../components/bar'
export default {
    props: {},
	data () {
		return {
			requestConfirmationStatus: false,
			requestConfirmationData: {},
			submitSuccess: false
		}
    },
    components: {
      'bar': bar
    },
	methods: {
		showRequestConfirmationStatus (status, resultStatus, paramsObj) {
			console.log(status)
			console.log('*********')
			console.log(1, paramsObj)
			this.requestConfirmationData = paramsObj
			this.requestConfirmationStatus = status
			this.submitSuccess = resultStatus
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
		margin-top:60px
		text-align:center
	.largeBtn
		width:90.1333%
		height 55px
	.request-title
		width:325px
		text-align:center
		margin:0 auto;
		margin-top:27.4px
		margin-bottom:27.4px
		color:rgb(12,55,94)
		font-size:17px
		font-weight:normal
	.text-content
		width:325px
		text-align:center
		margin:0 auto
		margin-bottom:10px
		font-size:14px
		color:rgb(51,51,51)
	.btn-wrapper
		margin-top:17px
	.ivu-btn-primary
		font-size:17px
		background:rgb(45,150,205)
		border-color:rgb(45,150,205)
	.modifyOrder .ivu-btn-primary
		font-size:17px
		color:rgb(45,150,205)
		background:#fff
		border-color:rgb(45,150,205)
</style>

