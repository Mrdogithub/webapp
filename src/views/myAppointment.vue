<template>
	<div class="myAppointment">
		<div ref="scroll" class = "scroll listView">
			<ul>
				<li class="listViewItem" @click = "showMyAppointmentDetail(index)" v-for = " (item, index) in vehicles" :key = 'item.vin' :value = 'item.vin'>
					<div class="infoContent">
						<h2 style="font-size:12px">{{item.orderTimeData? item.orderTimeData: 'No Data'}}</h2>
						<p style="color:rgb(45,150,205);font-size:14px">onLine Servicing Booking: {{item.modelName? item.modelName: 'No Data'}}</p>
						<span style="color:rgb(149,149,149);font-size:12px">{{item.orderIndexStatus? item.orderIndexStatus: 'No Data'}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	props: {},
	data () {
		return {
			value: [
				{
					bookingId: 'FP201712220003',
					appointment: {
						date: '20171223',
						timeSlot: '13:30'
					},
					vin: 'LVSHJCAB2DE267069',
					vehicleName: null,
					serviceType: '维修',
					osbStatus: 'On going'
				}
			],
			requestStatus: 'CURRENT',
			error: null,
			lastRequested: '2017-12-22T08:57:01.184Z',
			orderBtnWrapper: true
		}
	},
	methods: {
		showMyAppointmentDetail (index) {
			var u = navigator.userAgent
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
			if (isAndroid) {
				window.AppModel.postMessage(JSON.stringify({'message': 'gotoAppointmentDetail'}))
			} else if (isiOS) {
				window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoAppointmentDetail'})
			}
            this.$router.push({name: 'orderSummary'})
            let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			_osbAuth['index'] = index
			if (this.value[0].osbStatus === 'On going') {
				this.orderBtnWrapper = true
			} else {
				this.orderBtnWrapper = false
			}
			_osbAuth['orderBtnWrapper'] = this.orderBtnWrapper
			window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
        }
	},
	// beforeMount () {
	// 	let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
	// },
	created () {
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		this.vehicles = _osbAuth.vehicles
		let _listData = this.value[0]
		for (var i = 0; i < this.vehicles.length; i++) {
			if (this.vehicles[i].vin) {
				// this.vehicles[i].vin === this.vehiclesData[i].value.vin
				var DataTime = _listData.appointment.date.split('')
				this.vehicles[i].orderTimeData = DataTime[0] + DataTime[1] + DataTime[2] + DataTime[3] + '/' + DataTime[4] + DataTime[5] + '/' + DataTime[6] + DataTime[7] + ', ' + _listData.appointment.timeSlot
				this.vehicles[i].orderIndexStatus = _listData.osbStatus
			}
		}
		console.log(this.vehicles, 101)
		// this.serviceAdvisorsParams.params.OSBDealerID = _osbAuth.chooseDealerParams.OSBDealerID
		// this.serviceAdvisorsParams.headersContent.headers['Auth-token'] = _osbAuth.accessToken
		// this.serviceAdvisorsParams.headersContent.headers['Application-id'] = _osbAuth.guid
	},
	components: {
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.myAppointment .listView
		position: absolute
		top: 0px
		width: 100%
		overflow: hidden
	.myAppointment .listViewItem
			display:flex
			width:100%
			min-height:80px
			padding:10px
			border-bottom: 1px solid #dddee1
	.myAppointment .listViewItem .infoContent
			flex:1 auto
			text-align:left
			margin-left:16px
	.move-enter-active, .move-leave-active
		transition: all 0.5s linear
		transform: translate3d(0, 0, 0)
	.move-enter, .move-leave
		transform:translate3d(100%, 0, 0)
</style>
