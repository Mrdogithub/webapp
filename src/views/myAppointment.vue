<template>
	<div class="myAppointment">
		<div ref="scroll" class = "scroll listView">
			<ul>
				<li class="listViewItem" @click = "showMyAppointmentDetail(index)" v-for = " (item, index) in vehicles" :key = 'item.vin' :value = 'item.vin'>
					<div class="infoContent">
						<h2 style="font-size:12px">2017/12/08, 09:00</h2>
						<p style="color:rgb(45,150,205);font-size:14px">onLine Servicing Booking: Mondeo Hybrid - NH</p>
						<span style="color:rgb(149,149,149);font-size:12px">Ongoing Request</span>
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
			vehicles: [],
			vin: null
		}
	},
	methods: {
        showMyAppointmentDetail (index) {
   //          var u = navigator.userAgent
   //          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
   //          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
			// if (isAndroid) {
			// 	window.AppModel.postMessage(JSON.stringify({'message': 'gotoAppointmentDetail'}))
			// } else if (isiOS) {
			// 	window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoAppointmentDetail'})
			// }
            this.$router.push({name: 'orderSummary'})
            let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			_osbAuth['index'] = index
			window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
        }
	},
	// beforeMount () {
	// 	let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
	// 	for (var i = 0; i < _osbAuth.vehicles.length; i++) {
	// 		var thisTime = _osbAuth.vehicles[i].value.appointmentTimeAsDate.split(':', 3)
	// 		var thisT = thisTime[0].replace(/-/g, '/').replace(/T/g, ' , ') + ':' + thisTime[1]
	// 		console.log(_osbAuth['vehicles'][i], 980)
	// 		var ccc = _osbAuth['vehicles'][i].split(']')
	// 		console.log(ccc, 333)
	// 	}
	// 	console.log(_osbAuth['vehicles'][i], 960)
	// 	window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
	// 	let aaa = JSON.parse(window.localStorage.getItem('osb'))
	// 	console.log(aaa, 900)
	// },
	created () {
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		this.vehicles = _osbAuth.vehicles
		this.serviceAdvisorsParams.params.OSBDealerID = _osbAuth.chooseDealerParams.OSBDealerID
		this.serviceAdvisorsParams.headersContent.headers['Auth-token'] = _osbAuth.accessToken
		this.serviceAdvisorsParams.headersContent.headers['Application-id'] = _osbAuth.guid
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
