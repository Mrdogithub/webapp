<template>
<div class="selectDateAndTime">
  <bar v-bind="{ 'title': '请选择服务日期和时段', 'allIconStatus': false, 'goBackIcon': true}"></bar>
  <div class="content-wrapper">
	  <div class="available-dates-wrapper">
		  <p class="date-title">可选日期*</p>
		  <p class="year-month">{{ year }}年{{ month }}月</p>
		  <DatePicker type="year"></DatePicker>
		  <div>
			<DatePicker
			        :value="chooseDate"
					:open="open"
					:options="options" 
					@on-change="handleChange"
					type="date"
					format="yyyy-MM-dd"
					style="width: 100%">
			</DatePicker>
		  </div>
	  </div>
	  <div class="available-times-wrapper">
		  <p class="date-title">可选时间段</p>
		  <div class="select-time"  @click = "switchTimeInfo">
			 <p v-if="chooseTime === ''">请选择</p>
			 <p v-else>{{ chooseTime }}</p>
			 <a><Icon type="chevron-down"></Icon></a>
		  </div>
	  </div>
	  <div class="largeBtnWrapper">
		<Button type = "primary" size = "large" class = "largeBtn"   @click.stop = "goToPreviewOrderSummary()" :class = "{active: this.chooseDate !== '' && this.chooseTime !== ''}"  v-bind:disabled='buttonStatus'>订单详情预览</Button>
	  </div>
	  <div class = "date-intro">
	      <p class = "date-title">*可选日期仅限明天至未来一周，可选时段根据经销商营业时间而定。</p>
	  </div>
	  <time-info ref = "showTime"  @child-say="timeChoose"></time-info>	   
  </div>
</div>
</template>

<script>
	import bar from '../components/bar'
	import timeInfo from '../components/timeInfo'
	export default {
		props: {},
		data () {
			return {
				options: {
					disabledDate (date) {
						return date.valueOf() > Date.now() + 604800000 || date.valueOf() < Date.now()
					}
				},
				open: true,
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				chooseDate: '',
				chooseTime: '',
				start: '',
				end: ''
			}
		},
		components: {
			'bar': bar,
			'timeInfo': timeInfo
		},
		mounted () {
           this.handleChange(this.chooseDate)
		},
		created () {
			var tomorrowStamp = Date.now() + 56400000
			var tomorrow = new Date(tomorrowStamp) // Sat Dec 16 2017 11:00:00 GMT+0800 (China Standard Time)
			var tomorrowY = tomorrow.getFullYear() + '-'
			var tomorrowM = (tomorrow.getMonth() + 1 < 10 ? '0' + (tomorrow.getMonth() + 1) : tomorrow.getMonth() + 1) + '-'
			var tomorrowD = (tomorrow.getDate() < 10 ? '0' + tomorrow.getDate() : tomorrow.getDate()) + ' '
			this.tomorrowTime = tomorrowY + tomorrowM + tomorrowD
			this.chooseDate = this.tomorrowTime
		},
		computed: {
            buttonStatus () {
                if (this.chooseDate !== '' && this.chooseTime !== '') {
					return false
				} else {
					return true
				}
			}
		},
		methods: {
			handleChange (date) {
				this.chooseDate = date
				this.$refs.showTime.getDate(this.chooseDate)
			},
            switchTimeInfo (data) {
				this.$refs.showTime.showTime('hi', true)
			},
			timeChoose (activeTime) {
				this.chooseTime = activeTime
			},
			goToPreviewOrderSummary () {
				let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
				_osbAuth['selectDateAndTime'] = {
					'apptTime': this.chooseDate + 'T' + this.chooseTime
				}
				window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
				this.$router.push({name: 'previewOrderSummary'})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.selectDateAndTime .content-wrapper
		position: relative
		top: 58px
	.selectDateAndTime .date-title
		height:50px
		font-size:14px
		color:rgb(149,149,149)
		line-height:50px
		background:rgb(249,252,255)
		border-top: 1px solid rgb(219,219,219)
		border-bottom: 1px solid rgb(219,219,219)
	.selectDateAndTime .year-month
		height:30px
		line-height:30px
	.selectDateAndTime .ivu-date-picker-header
		display:none
	.selectDateAndTime .ivu-date-picker
		margin-top:-30px
	.selectDateAndTime .ivu-date-picker-rel
		display:none
	.selectDateAndTime .ivu-select-dropdown
		position:unset !important
	.selectDateAndTime .ivu-picker-panel-body
		width:100%
	.selectDateAndTime .ivu-date-picker-cells
		width:97%
		margin:0 auto
	.selectDateAndTime .ivu-date-picker-cells-header
		border-bottom: 1.5px solid rgb(69,150,164)
		margin: 1% 5%
		display: flex
	.selectDateAndTime .ivu-date-picker-cells-header span
		margin:0px 5%
		color: rgb(69,150,164)
	.selectDateAndTime .ivu-date-picker-cells-header span:nth-child(1)
		margin-left:0
	.selectDateAndTime .ivu-date-picker-cells-header span:nth-child(7)
		margin-right:0
	.selectDateAndTime .ivu-date-picker-cells span em
		width: 25px
		height: 25px
		line-height: 25px
		transition: all 0s
	.selectDateAndTime .ivu-date-picker-cells-cell-selected em, .ivu-date-picker-cells-cell-selected:hover em
		background: rgb(45,150,203)
		color: #fff
		border-radius: 50% !important
	.selectDateAndTime .ivu-date-picker-cells-cell
		margin:0px 2%
	.selectDateAndTime .select-time
		height:50px
		padding: 0 10px
		font-size:14px
		color:rgb(45,152,205)
		line-height:50px
		background:rgb(255,255,255)
		border-bottom: 1px solid rgb(219,219,219)
	.selectDateAndTime .select-time p
		float: left
	.selectDateAndTime .ivu-icon-chevron-down
		float:right
		line-height:50px
	.selectDateAndTime span.ivu-date-picker-cells-cell-disabled, span.ivu-date-picker-cells-cell-disabled:hover
		background:none
	.selectDateAndTime span.ivu-date-picker-cells-cell-disabled em
		color: #bbbec4
	.selectDateAndTime .ivu-date-picker-cells-cell-prev-month em, .ivu-date-picker-cells-cell-next-month em
		color:black
	.selectDateAndTime .largeBtnWrapper
		height: 158px
	.selectDateAndTime .ivu-date-picker-cells-cell-today em:after
		display:none
	.selectDateAndTime .ivu-btn-large.active,.ivu-btn-large.active:hover
		background:rgb(45,150,205)
		color:#fff
	.selectDateAndTime .date-intro .date-title
		height: 80px
		line-height: 20px
		text-align: left
		padding: 10px
	.selectDateAndTime span.ivu-date-picker-cells-cell
		width:10%
		height:10%
	.selectDateAndTime .ivu-btn-large,.ivu-btn-large:hover
		margin-top:80px
		width: 90.1333%
		height: 55px
		background:#f7f7f7
		color:#bbbec4
		border:none
</style>