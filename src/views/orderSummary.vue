<template>
<div class="orderSummary">
	<div>
        <bar v-bind="{ 'title': '订单详情', 'goBackIcon': true}"></bar>
            <div class="content-wrapper">
                <div class="input-wrapper">
                    <p class="input-title">服务车辆</p>
                    <div class="info">
                        <img width="86" height="43"  v-bind:src='generateUrlForVehicle'/>
                        <div class="info-text">
                            <p>{{modelName}}</p>
                        </div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">预约经销商</p>
                    <div class="text-wrapper">
                        <p>{{value.dealer.name}}</p>
                        <p>{{value.dealer.address}}</p>
                        <a :href= "callDealer()">致电经销商</a>
                    </div>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">订单信息</p>
                    <Input v-model="contactNameLable" placeholder="联系人姓名" disabled disabled class="input-item">
                        <span slot="prepend" style="display:none"></span>
                        <span slot="append">{{contactName}}</span>
                    </Input>
                    <Input v-model="mobileNumberLable" placeholder="手机号码" disabled class="input-item inputevenHook">
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
                    <Input v-model="serviceType" class="textAreaSize" disabled placeholder="Any other service..."></Input>
                </div><!-- 
                <div class="input-wrapper">
                    <p class="input-title">服务顾问</p>
                    <Input v-model="serviceConsultant" disabled class="textAreaSize" placeholder="Any other service..."></Input>
                </div> -->
                <div class="input-wrapper">
                    <p class="input-title">注意事项</p>
                    <Input v-model="note" disabled class="textAreaSize" placeholder="Any other service..."></Input>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">预约时间</p>
                    <Input v-model="appointmentTime" disabled class="textAreaSize" placeholder="Any other service..."></Input>
                </div>
                <transition name="fade">		
	                <div class="largeBtnWrapper" v-show = "orderBtnWrapper">
	                    <div class="btn-wrapper modifyOrder">
	                        <Button type="primary" style="margin-bottom:15px" class="largeBtn" @click="modifyOrderFn">修改订单</Button>
	                    </div>
	                    <div>
	                        <Button type="primary" style="margin-bottom:50px" class="largeBtn" @click="cancelOrderFn">取消订单</Button>
	                    </div>
	                </div>
	            </transition>
        </div>
	</div>

    <div class="orderConfirm" v-show = "orderConfirmStatus">
        <div class="messageInfoWrapper">
            <h2>您确定要取消订单吗？</h2>
            <p>点击“取消”按钮即可取消此订单。</p>
            <div class="largeBtnWrapper">
                <div class="btn-wrapper ">
                    <Button style="width:266px;height:55px;margin-bottom:10px" type="primary" @click = "cancelConfirm" v-bind:disabled="orderBtnActive">取消</Button>
                </div>
                <div class="modifyOrder">
                    <Button type="primary" style="width:266px;height:55px;border-color:#fff" @click="backConfirm">返回</Button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import bar from '../components/bar'
import requestconfirmation from '../views/requestConfirmation'
export default {
    props: {},
	data () {
		return {
			value: {
				totalBookedServices: 0,
				bookingAppointment: {
					date: '20171223',
					timeSlot: '13:30'
				},
				dealer: {
					name: 'test 九和汽车销售有限公司',
					phone: '021-88888888',
					address: '金沙江路1899号'
				},
				customer: {
					name: 'MSL',
					phone: '17245678900'
				},
				comments: 'send new ',
				mileage: '10000',
				mainServiceId: '维修'
			},
			requestStatus: 'CURRENT',
			error: null,
			lastRequested: '2017-12-22T08:54:52.320Z',
			contactNameLable: '联系人姓名',
			mobileNumberLable: '手机号码',
			orderBtnActive: false,
			orderConfirmStatus: false,
			modifyOrderId: 'aru900---3445'
		}
    },
    components: {
		'bar': bar,
		'requestconfirmation': requestconfirmation
    },
	methods: {
		callDealer () {
			let _detailData = this.value
			return 'tel:' + _detailData.dealer.phone
		},
		showServiceDetail () {
			console.log('ss')
		},
		modifyOrderFn () {
			this.$router.push({name: 'selectDealerOption'})
		},
		cancelOrderFn () {
            this.orderConfirmStatus = true
        },
        cancelConfirm () {
            this.orderConfirmStatus = false
            var u = navigator.userAgent
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
			if (isAndroid) {
				window.AppModel.postMessage(JSON.stringify({'message': 'gotoAppointmentList'}))
			} else if (isiOS) {
				window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoAppointmentList'})
			}// 发版时把它调回来
			this.$router.push({name: 'myAppointment'})
			this.orderBtnActive = true// ajax 跑完之后要变成false
			// var orderSummaryUrl = 'https://servicebooking-service-qa.apps.cl-cn-east-preprod01.cf.ford.com/api/v1/bookings'
			// this.$http.post(orderSummaryUrl).then((response) => {
			// 	this.previewOrderSummaryStatus = false
			// 	response = JSON.parse(response.bodyText)
			// 	let showPostOverLay = true
			// 	this.$refs.requestconfirmationHook.showRequestConfirmationStatus(showPostOverLay, showAjaxStatus)
			// }, (response) => {
			// 	this.previewOrderSummaryStatus = falsess
			// 	let showPostOverLay = true
			// 	this.$refs.requestconfirmationHook.showRequestConfirmationStatus(showPostOverLay, !showAjaxStatus)
			// })
        },
        backConfirm () {
            this.orderConfirmStatus = false
        }
	},
	created () {
		let _detailData = this.value
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		_osbAuth['modifyOrderId'] = this.modifyOrderId
		window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
		let orderT = _detailData.bookingAppointment.date.split('')
		let orderTimeString = orderT[0] + orderT[1] + orderT[2] + orderT[3] + '/' + orderT[4] + orderT[5] + '/' + orderT[6] + orderT[7] + ' ' + _detailData.bookingAppointment.timeSlot + ':00'
		let orderTime = new Date(orderTimeString)
		let todayTime = new Date()
		let W = orderTime.getDay()
		switch (orderTime.getDay()) {
			case 0:W = '周日,'; break
			case 1:W = '周一,'; break
			case 2:W = '周二,'; break
			case 3:W = '周三,'; break
			case 4:W = '周四,'; break
			case 5:W = '周五,'; break
			case 6:W = '周六,'; break
		}
		let M = orderTime.getMonth() + 1 + '月'
		let D = orderTime.getDate() + '日' + ' '
		let h = orderTime.getHours() + ':'
		let m = orderTime.getMinutes() < 10 ? '0' + orderTime.getMinutes() : orderTime.getMinutes()
		this.appointmentTime = W + M + D + h + m
		// control the btn is show or hide
		let intervalTtime = orderTime.getDate() - todayTime.getDate()
		if (intervalTtime && _osbAuth.orderBtnWrapper) {
			this.orderBtnWrapper = true
		} else {
			this.orderBtnWrapper = false
		}
		this.modelName = _osbAuth.vehicles[_osbAuth.index].modelName
		this.contactName = _detailData.customer.name
		this.mobileNumber = _detailData.customer.phone
		this.currentMileage = _detailData.mileage + ' km'
		this.serviceType = _detailData.mainServiceId
		this.note = _detailData.comments
		this.orderBtnActive = false
		var orderModelYear = _osbAuth.vehicles[_osbAuth.index].modelYear
		var orderModelName = this.modelName.toLowerCase().replace(' ', '-').replace(/\s*/g, '').replace('--', '-')
		this.generateUrlForVehicle = 'https://www.fordpass.com.cn/content/dam/assets/cn/ford/vehicle/' + orderModelYear + '/' + orderModelYear + '-ford-' + orderModelName + '-s.png'
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .orderSummary .orderConfirm
        position:fixed
        top:0px
        width:100%
        height:100%
        left:0
        z-index:100
        overflow:auto
        backdrop-filter:blur
        background:rgba(7,17,27,0.8)
        .messageInfoWrapper
            position:absolute
            top:0
            left:0
            right:0
            bottom:0
            margin:auto
            padding:17px
            width:91.2%
            height:240px
            background:rgb(249,252,255)
            border-radius:18px
	.orderSummary .largeBtnWrapper
		margin-top:20px
		text-align:center
	.orderSummary .largeBtn
		width:90.1333%
		height 55px
	.orderSummary .inputevenHook .ivu-input
		border-top:none
	.orderSummary .ivu-input
		height:55px
		width: 100%
		padding-left:25px
		font-size:14px
		border-radius:0px
		border-left:none
		border-right:none
	.orderSummary .ivu-radio-group
		width:100%
	.orderSummary .ivu-radio-group-vertical .ivu-radio-wrapper
		height:55px
		line-height:55px
	.orderSummary .select-item
		position:relative
		width: 85.7333%
		height:55px
		margin:0 auto
		line-height:55px	
		border-bottom:1px solid #dddee1
	.orderSummary .radio-text
		position:absolute
		left:0px
	.orderSummary .ivu-radio
		position:absolute
		right:0px
		top:18px
	.orderSummary .ivu-input:hover
		border-top-color: #57a3f3
		border-bottom-color: #57a3f3
	.orderSummary .ivu-input-group-prepend
		display:none
	.orderSummary .ivu-input-group-append, .ivu-input-group-prepend
		background-color:#fff
		padding-right:16px
		font-size:14px
		color:rgb(149,149,149)
		border-right:none
		border-radius: 0px;
	.orderSummary .ivu-input[disabled]
		background-color: #fff;
		opacity: 1;
		cursor: not-allowed;
		color: #000;
	.orderSummary .ivu-btn-primary
		font-size:17px
		background:rgb(45,150,205)
		border-color:rgb(45,150,205)
	.orderSummary .modifyOrder .ivu-btn-primary
		font-size:17px
		color:rgb(45,150,205)
		background:#fff
		border-color:rgb(45,150,205)
	.orderSummary .inputevenHook .ivu-input-group-append
		border-top:0px
	.orderSummary textarea.ivu-input
		width:90.1333%
		border:1px solid #dddee1
		border-radius:4px
	.orderSummary .content-wrapper
		font-size:14px
		color:rgb(149,149,149)
	.orderSummary .bar-wrapper + .content-wrapper
		padding-top: 58px
	.orderSummary .server-type-detail
		position: absolute;
		left: 30%;
		top:2%
		width: 50px;
		font-size: 21px;
		color:rgb(45,150,205)
	.orderSummary .input-title
		height:50px
		font-size:14px
		color:rgb(149,149,149)
		line-height:50px
		background:rgb(249,252,255)
	.orderSummary .text-wrapper
		padding:27px 18px 18px 22px
		text-align:left
		border-top:1px solid #dddee1
		border-bottom:1px solid #dddee1
		&>p:first-child
			color: black
	.orderSummary .info
		display:flex
		padding:15px
		border-top:1px solid #dddee1
		border-bottom:1px solid #dddee1
		&>img
			margin-right:16px
		.info-text
			float:left
		&>.info-text p
			width:197px
			text-align:left
			height: 100%
			line-height: 43px
			color: black
	.orderSummary .radio-text
		font-size: 14px
	.orderSummary .btn-wrapper
		margin-top:17px
</style>