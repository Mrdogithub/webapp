<template>
<div class="myAppointment">
		<div ref="scroll" class = "scroll listView">
			<ul>
				<li class="listViewItem" @click = "showMyAppointmentDetail">
					<div class="infoContent">
						<h2 style="font-size:12px">2018/2/1. 19:00</h2>
						<p style="color:rgb(45,150,205);font-size:14px">onLine Servicing Booking: My Mondeo</p>
						<span style="color:rgb(149,149,149);font-size:12px">Ongoing request</span>
					</div>
				</li>
                <li class="listViewItem" @click = "showMyAppointmentDetail">
					<div class="infoContent">
						<h2 style="font-size:12px">2018/2/1. 19:00</h2>
						<p style="color:rgb(45,150,205);font-size:14px">onLine Servicing Booking: My Mondeo</p>
						<span style="color:rgb(149,149,149);font-size:12px">Ongoing request</span>
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
		}
	},
	methods: {
        showMyAppointmentDetail () {
            var u = navigator.userAgent
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            if (isAndroid) {
                window.AppModel.postMessage('gotoAppointmentDetail')
            } else if (isiOS) {
                window.webkit.messageHandlers.AppModel.postMessage('gotoAppointmentDetail')
            }
            this.$router.push({name: 'orderSummary'})
        }
	},
	created () {
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
