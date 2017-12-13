<template>
<div>
  <bar v-bind="{ 'title': '请选择服务日期和时段', 'allIconStatus': false, 'goBackIcon': true}"  ref = "barComponentHook"></bar>
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
		  <div class="select-time"  @click = "switchTimeInfo"	>
			 <p v-if="chooseTime === ''">请选择</p>
			 <p v-else>{{ chooseTime }}</p>
			 <a><Icon type="chevron-down"></Icon></a>
		  </div>
	  </div>
	  <div class="largeBtnWrapper">
			<Button type = "primary" class = "largeBtn" :class = "{active: chooseDate !== '' && chooseTime !== ''}" @click.stop = "goToPreviewOrderSummary()">订单详情预览</Button>
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
				chooseDate: Date.now() + 56400000,
				chooseTime: ''
			}
		},
		components: {
			'bar': bar,
			'timeInfo': timeInfo
		},
		methods: {
			handleChange (date) {
				this.chooseDate = date
			},
            switchTimeInfo (data) {
				this.$refs.showTime.showTime('hi', true)
			},
			timeChoose (activeTime) {
				this.chooseTime = activeTime
			},
			goToPreviewOrderSummary () {
				this.$route.params['chooseDate'] = this.chooseDate
				this.$route.params['chooseTime'] = this.chooseTime
				this.$router.push({name: 'previewOrderSummary', params: this.$route.params})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.date-title
		height:50px
		font-size:14px
		color:rgb(149,149,149)
		line-height:50px
		background:rgb(249,252,255)
		border-top: 1px solid rgb(219,219,219)
		border-bottom: 1px solid rgb(219,219,219)
	.year-month
		height:30px
		line-height:30px
	.ivu-date-picker-header
		display:none
	.ivu-date-picker
		margin-top:-30px
	.ivu-date-picker-rel
		display:none
	.ivu-select-dropdown
		position:unset !important
	.ivu-picker-panel-body
		width:100%
	.ivu-date-picker-cells
		width:97%
		margin:0 auto
	.ivu-date-picker-cells-header
		border-bottom: 1.5px solid rgb(69,150,164)
		margin: 1% 5%
		display: flex
	.ivu-date-picker-cells-header span
		margin:0px 5%
		color: rgb(69,150,164)
	.ivu-date-picker-cells-header span:nth-child(1)
		margin-left:0
	.ivu-date-picker-cells-header span:nth-child(7)
		margin-right:0
	.ivu-date-picker-cells span em
		width: 25px
		height: 25px
		line-height: 25px
		transition: all 0s
	.ivu-date-picker-cells-cell-selected em, .ivu-date-picker-cells-cell-selected:hover em
		background: rgb(45,150,203)
		color: #fff
		border-radius: 50% !important
	.ivu-date-picker-cells-cell
		margin:0px 2%
	.select-time
		height:50px
		padding: 0 10px
		font-size:14px
		color:rgb(45,152,205)
		line-height:50px
		background:rgb(255,255,255)
		border-bottom: 1px solid rgb(219,219,219)
	.select-time p
		float: left
	.ivu-icon-chevron-down
		float:right
		line-height:50px
	span.ivu-date-picker-cells-cell-disabled, span.ivu-date-picker-cells-cell-disabled:hover
		background:none
	.ivu-date-picker-cells-cell-prev-month em, .ivu-date-picker-cells-cell-next-month em
		color:black
	.largeBtnWrapper
		height: 158px
	.ivu-btn-large,.ivu-btn-large:hover
		margin-top:80px
		width: 90.1333%
		height: 55px
		background:rgb(193,193,193)
		color:rgb(255,255,255)
		border:none
	.ivu-date-picker-cells-cell-today em:after
		display:none
	.ivu-btn-large.active,.ivu-btn-large.active:hover
		background:rgb(45,150,205)
	.date-intro .date-title
		height: 80px
		line-height: 20px
		text-align: left
		padding: 10px
	span.ivu-date-picker-cells-cell
		width:10%
		height:10%
		
</style>