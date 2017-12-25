<template>
	<div class="selectIOS">
		<transition name="fade">
		<div class="server-package-wrapper" v-show="showSelectFlag" @click.prevent="hideServicePackage">
			<div class="server-package-content-wrapper" @click.stop="stopEvent">
					<div class="server-package-content">
							<div class="content-item" >
								<!-- <h2>服务顾问</h2> -->
								<div class="scroll" ref="scroll" style="position: absolute;top:0px;bottom: 0px;width: 100%;padding:15px;overflow: hidden">
									<div>
										<div class="content-item-wrapper" v-for= " item in listData" :value="item.name" :key="item.id" @click = "selectedValue(item.name)">
											{{item.name}}
										</div>
									</div>
								</div>
							</div>
					</div>
			</div>
		</div>
		</transition>
	</div>
</template>
<script>
import BuildScroll from 'better-scroll'
	export default {
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {
				showSelectFlag: false
			}
		},
		methods: {
			stopEvent () {},
			showSelectConsultant () {
				this.showSelectFlag = true
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BuildScroll(this.$refs.scroll, {
							click: true
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			hideServicePackage () {
				this.showSelectFlag = false
			},
			selectedValue (selectedValue) {
				this.$emit('selectedValue', selectedValue)
				this.showSelectFlag = false
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.selectIOS	.server-package-wrapper
		position:fixed
		top:0px
		width:100%
		height:100%
		left:0
		z-index:999
		overflow:auto
		backdrop-filter:blur
		background:rgba(7,17,27,0.8)
    .selectIOS .server-package-content-wrapper
		width:70%
		height: 300px
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		margin: auto
		border-radius: 18px
		background-color:rgb(249,252,255)
    .selectIOS .server-package-title
		width:100%
		height:61px
		line-height:61px
		border-bottom:1px solid rgb(219,219,219)
		font-size:17px
		font-weight:normal
		color:rgb(18,78,132)
	.selectIOS .content-item-wrapper
		background-color:#fff
		width:100%
		height:auto
		padding:15px
		text-align:left
		box-sizing:border-box
		border-bottom:1px solid rgb(219,219,219)
		&>p
			color:#000
			font-size:18px
			font-weight:normal
		&>.note
			margin-top:16.8px
			&>small
				display:block
				color:rgb(155,155,155)
				font-size:14px
			&>sup
				margin-right:5px
	.selectIOS .largeBtnWrapper
		margin-top:20px
		text-align:center
	.selectIOS .largeBtn
		width:77.7777%
	.selectIOS  .ivu-btn-primary
		background-color: rgb(45,150,205)
		border-color: rgb(45,150,205)
		font-size:14px
</style>