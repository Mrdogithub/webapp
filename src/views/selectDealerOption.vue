<template>
<div class="chooseDealerOption">
	<bar v-bind="{ 'title': '选择经销商', 'allIconStatus': true, 'goBackIcon': true}"  @icon-switch-status = "switchIcon(listView)" ref = "barComponentHook"></bar>
	<div style="position:relative">
		<tab @watch-tab-status = "switchTab"></tab>
		<transition name="fade">
			<Row v-show = "showChooseCity">
					<Col span="12">
						<Select v-model="provinceValue" filterable  @on-change = "selectProvince(listView)">
							<Option v-for="item in provinceList" :value="item.p" :key="item.p"  >{{ item.p }}</Option>
						</Select>
					</Col>
					<Col span="12">
						<Select v-model="cityValue" filterable @on-change = "selectCity(listView)">
							<Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
						</Select>
					</Col>
			</Row>
		</transition>
		<transition name="fade">
			<Row v-show = "!showChooseCity">
				<Input v-model="queryDealerByTextValue" @on-change = "queryDealerByText(listView)">
					<Button slot="append" icon="ios-search" @click = "queryDealerByText(listView)"></Button>
				</Input>
			</Row>
		</transition>
	</div>
	<transition name="fade">
		<div class="mapView" v-show = "mapView">
			<div id="container" style="min-width:320px;width:100%; height:100%;min-height:450px;position:relative"></div>	
		</div>
	</transition>
	<transition name="fade">
		<div ref="scroll" class = "scroll listView">
			<ul v-show = "listView">
				<li class="listViewItem" v-for = "item in dealerResult" :value="item._name" :key="item._id" @click = "selectDealerForListView(item)">
					<div class="thumb">
						<img src="../assets/timg.jpg"/>
					</div>
					<div class="infoContent">
						<h2>{{item._name}}</h2>
						<p>{{item._address}}</p>
						<a href="tel:item.ServicePhoneNumber">致电经销商</a>
					</div>
					<div class="distances">
						<span>{{(item._distance/1000).toFixed(2)}} km</span>
					</div>
				</li>
			</ul>
		</div>
	</transition>
	<transition name="fade">
		<dealer-info ref = "showDealer" v-bind="{ 'dealerObj': activeDealer, 'nextRouteName': 'selectServiceType'}" @dealer-switch-status = "switchDealerInfo"></dealer-info>
	</transition>
</div>
</template>

<script>
import bar from '../components/bar'
import tab from '../components/tab'
import AMap from 'AMap'
import BuildScroll from 'better-scroll'
import dealerInfo from '../components/dealerInfo'

let marker
let map
let _that
export default {
	props: {},
	data () {
		return {
			markers: [],
			showChooseCity: true,
			mapView: true,
			listView: false,
			provinceList: [],
			cityList: [],
			value13: '',
			queryDealerByTextValue: '',
			provinceValue: '',
			cityValue: [],
			dealerResult: [],
			activeDealer: [],
			dealerParams: {
				params: {
					'tableid': '58afdc467bbf195ae88d74ab',
					'city': '',
					'keywords': 'FCO',
					'filter': '',
					'key': '6edfef5707fff59eaa5ba33f7f02b939'
				}
			},
			allDealerParams: {
				params: {
					'tableid': '58afdc467bbf195ae88d74ab',
					'city': '全国',
					'keywords': 'FCO',
					'filter': '',
					'key': '6edfef5707fff59eaa5ba33f7f02b939'
				}
			},
			dealerAroundParams: {
				params: {
					'tableid': '58afdc467bbf195ae88d74ab',
					'center': '121.33976,31.19609',
					'keywords': 'FCO',
					'city': '',
					'filter': '',
					'radius': '50000',
					'limit': '10',
					'key': '6edfef5707fff59eaa5ba33f7f02b939'
				}
			}
		}
	},
	methods: {
		switchTab (activeTab) {
			this.hideDealerInfo()
			switch (activeTab) {
				case 'location' :this.showChooseCity = true
				break
				case 'dealer' :this.showChooseCity = !this.showChooseCity
				break
			}
		},
		switchIcon (status) {
			this.mapView = status
			this.listView = !status
			if (this.listView) {
				this.hideDealerInfo()
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BuildScroll(this.$refs.scroll, {
							click: true
						})
					} else {
						this.scroll.refresh()
					}
				})
			} else {
				this.showDealerInfo()
			}
		},
		switchDealerInfo () {

		},
		getAjax () {
			var dataJSON = {
				'active_dealer_pickup_zh': [
					{
						'p': '上海',
						'c': ['上海']
					},
					{
						'p': '北京',
						'c': ['北京']
					},
					{
						'p': '天津',
						'c': ['天津']
					},
					{
						'p': '重庆',
						'c': ['重庆']
					},
					{
						'p': '广东',
						'c': ['广州', '深圳']
					},
					{
						'p': '江苏',
						'c': ['南京', '苏州']
					},
					{
						'p': '四川',
						'c': ['成都']
					},
					{
						'p': '浙江',
						'c': ['杭州', '宁波']
					}
				]
			}
			for (var i = 0; i < dataJSON.active_dealer_pickup_zh.length; i++) {
				this.provinceList.push(dataJSON.active_dealer_pickup_zh[i])
			}
		},
		getDealerByCountry () {
			this.$http.get('http://yuntuapi.amap.com/datasearch/local', this.allDealerParams).then((response) => {
				response = JSON.parse(response.bodyText)
				if (response.datas) {
					map.clearMap()
					this.init(this.allDealerParams.params.city, response.datas)
				} else {
					this.$refs.barComponentHook.errorCloseFn('没有查询结果。请使用下拉菜单搜索不同的城市或省份。', true)
				}
			}, (response) => {
				// 响应错误回调
			})
		},
		getDealer () {
			this.dealerParams.params.city = this.cityValue
			if (this.dealerParams.params.city) {
				this.$http.get('http://yuntuapi.amap.com/datasearch/local', this.dealerParams).then((response) => {
					response = JSON.parse(response.bodyText)
					if (response.datas) {
						map.clearMap()
						this.init(this.dealerParams.params.city, response.datas)
					} else {
						this.$refs.barComponentHook.errorCloseFn('没有查询结果。请使用下拉菜单搜索不同的城市或省份。', true)
					}
				}, (response) => {
					// 响应错误回调
				})
			}
		},
		getDealerByAround (city) {
			console.log('this.cityValue:' + this.cityValue)
			this.dealerAroundParams.params.city = city
			if (city) {
				this.dealerAroundParams.params.filter = '_city:' + city
				this.$http.get('http://yuntuapi.amap.com/datasearch/around', this.dealerAroundParams).then((response) => {
					response = JSON.parse(response.bodyText)
					if (response.datas) {
						map.clearMap()
						this.init(city, response.datas)
					} else {
						this.$refs.barComponentHook.errorCloseFn('没有查询结果。请使用下拉菜单搜索不同的城市或省份。', true)
					}
				}, (response) => {
					// 响应错误回调
				})
			}
		},
		selectProvince (isListView) {
			this.$refs.barComponentHook.errorCloseFn('', false)
				this.getDealer(this.provinceValue)
			for (var i = 0; i < this.provinceList.length; i++) {
				if (this.provinceList[i].p === this.provinceValue) {
					this.cityList = this.provinceList[i].c
				}
			}
		},
		selectCity (isListView) {
			this.$refs.barComponentHook.errorCloseFn('', false)
			this.getDealer(this.cityValue)
		},
		selectDealer (e) {
			let _paramsForActiveDealer = e.target.G
			this.activeDealer = {'name': _paramsForActiveDealer.name, 'address': _paramsForActiveDealer.address, 'tel': _paramsForActiveDealer.tel}
			this.$refs.showDealer.showDealerDetail(this.activeDealer, true)
		},
		selectDealerForListView (selectedDealer) {
			this.activeDealer = {'name': selectedDealer._name, 'address': selectedDealer._address, 'tel': selectedDealer.ServicePhoneNumber}
			this.switchIcon(true)
		},
		queryDealerByText (listView) {
			this.$refs.barComponentHook.errorCloseFn('', false)
			this.allDealerParams.params.filter = '_name:' + this.queryDealerByTextValue
			this.getDealer()
		},
		hideDealerInfo () {
			this.$refs.showDealer.showDealerDetail(this.activeDealer, false)
		},
		showDealerInfo () {
			this.$refs.showDealer.showDealerDetail(this.activeDealer, true)
		},
		init (city, result) {
			this.hideDealerInfo()
			let _city = city === '全国' ? '中国' : city
			map.setCity(_city)
			let lnglat = new AMap.LngLat(121.33976, 31.19609)
			for (var i = 0; i < result.length; i++) {
				let _gps = result[i]._location.split(',')
				marker = new AMap.Marker({
					icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
					position: [_gps[0], _gps[1]],
					name: result[i]._name,
					address: result[i]._address,
					tel: result[i].ServicePhoneNumber
				})
				result[i]['_distance'] = lnglat.distance([_gps[0], _gps[1]])
				console.log(lnglat.distance([_gps[0], _gps[1]]) + '----gps')
				AMap.event.addListener(marker, 'click', this.selectDealer)
				marker.setMap(map)
			}

			this.dealerResult = result
			map.on('click', function () {
				_that.hideDealerInfo()
			})
		}
	},
	created () {
		console.log('choose dealer')
		console.log(1, this.$route.params)
	},
	mounted () {
		map = new AMap.Map('container', {
			resizeEnable: true,
			zoom: 10
		})
		this.getAjax()
		this.getDealer()
		_that = this

		map.plugin('AMap.Geolocation', function () {
			let geolocation = new AMap.Geolocation({
				enableHighAccuracy: true, // 是否使用高精度定位，默认:true
				timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
				maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
				convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				showButton: true,        // 显示定位按钮，默认：true
				buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
				buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
				showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
				panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
				zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			})
			map.addControl(geolocation)
			geolocation.getCurrentPosition()
			// _that.dealerAroundParams.params.center = geolocation.getCurrentPosition()
			AMap.event.addListener(geolocation, 'complete', function (e) {
				_that.dealerParams.params.city = e.addressComponent.province
				_that.provinceValue = e.addressComponent.province.replace('市', '')
			}) // 返回定位信息
			AMap.event.addListener(geolocation, 'error', function (e) {
				_that.$refs.barComponentHook.errorCloseFn(e.message, true)
			}) // 返回定位出错信息
		})
	},
	components: {
		bar,
		tab,
		AMap,
		dealerInfo
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
	.largeBtn
		width:90.4%
		height 55px

	.chooseDealerOption .ivu-row
		margin-top:1px
		position:absolute
		width:100%
		z-index:5
	.chooseDealerOption .ivu-col-span-12
		display: block
		width: 50%
		border-right:none
	.chooseDealerOption .ivu-select-single .ivu-select-selection
		height: 48px
		position: relative
		border-radius: 0px;
		border-right:none
		box-shadow:1px 1px 3px rgb(219,219,219);
	.chooseDealerOption .ivu-select-input
		height:48px
		line-height:48px
		font-size:14px
		color:rgb(45,152,205)
	.chooseDealerOption .ivu-select-arrow
		color:rgb(45,152,205)
	.chooseDealerOption .ivu-select-item
		font-size:14px
		font-size:14px!important;
	.chooseDealerOption .ivu-btn-primary
		background-color: rgb(45,150,205)
		border-color: rgb(45,150,205)
		z-index: 999
	.chooseDealerOption .ivu-input-group .ivu-input
		height:48px
	.chooseDealerOption .ivu-input-group-append
		border-radius: 0px;
		padding: 4px 20px;
		background-color: #4596a4
		border: 1px solid #4596a4
		color:#fff
	.chooseDealerOption .ivu-icon
		font-size:20px
	.mapView ,.listView
		position: absolute
		top: 165px
		bottom: 0px
		width: 100%
		overflow: hidden
	.listView
		z-index: -1
	.mapView
		z-index:3
	.listView
		.listViewItem
			display:flex
			width:100%
			min-height:80px
			padding:10px
			border-bottom: 1px solid #dddee1
			.thumb
				padding:5px
				width:56px
				height:56px
				img
					width:100%
					height:100%
					border-radius:12px
		.infoContent
			flex:1 auto
			text-align:left
			margin-left:16px
			&>h2
				font-size:14px
			&>p
				color:#959595
				font-size:12px
			&>.distances
				width:65px
				height:65px
				color:#fff
				&>span
					font-weight:400
					color: #495060
					text-align: center
	.move-enter-active, .move-leave-active
		transition: all 0.5s linear
		transform: translate3d(0, 0, 0)
	.move-enter, .move-leave
		transform:translate3d(100%, 0, 0)
</style>
