<template>
<div class="chooseDealerOption">
	<bar v-bind="{ 'title': '选择经销商', 'allIconStatus': true, 'goBackIcon': true}"  @icon-switch-status = "switchIcon(listView)" ref = "barComponentHook"></bar>
	<div style="position:relative;top:58px">
		<tab @watch-tab-status = "switchTab"></tab>
		<transition name="fade">
			<Row v-show = "showChooseCity">
					<Col span="12">
						<Select class="provinceHighLight" v-model="provinceValue" placeholder='省市' @on-change = "selectProvince(listView)">
							<Option v-for="item in provinceList" :value="item.p" :key="item.p"  >{{ item.p }}</Option>
						</Select>
					</Col>
					<Col span="12">
						<Select class="cityHighLight" v-model="cityValue" placeholder='地区' @on-change = "selectCity(listView)">
							<Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
						</Select>
					</Col> 
			</Row>
		</transition>
		<transition name="fade">
			<Row v-show = "!showChooseCity">
				<Input v-model="queryDealerByTextValue" @on-change = "queryDealerByText(listView)">
					<Button slot="prepend" icon="ios-search" @click = "queryDealerByText(listView)"></Button>
				</Input>
			</Row>
		</transition>
	</div>
	<transition name="fade">
		<div class="mapView" v-show = "mapView">
			<transition name="fade">
				<div class="noDealerMessage" v-show = "noDealer">
					<p>Sorry, your search did not return any results. Please search a different city or province by using the dropdown.</p>
				</div>
			</transition>
			<transition name="fade">
				<div class="noDealerMessage" v-show = "noDealerByQueryTextInMap">
					<p>Sorry, your search did not return any results. Please try searching for another dealer or searching by using the dropdown.</p>
				</div>
			</transition>
			<transition name="fade">
				<div class="noDealerMessage" v-show = "noDealerByJvFlagInMap">
					<p>Sorry, Online service booking is currently not available for your vehicle. Please call your preferred dealer to book an service appointment.</p>
				</div>
			</transition>
			<transition name="fade">
				<div class="noDealerMessage" v-show = "noDealerByLocationInMap">
					<p>Sorry, Online Service Booking is currently not available in your current location. Please search available location by using dropdown.</p>
				</div>
			</transition>
			<div id="container" style="min-width:320px;width:100%; height:100%;min-height:450px;position:relative"></div>	
		</div>
	</transition>
	<transition name="fade">
		<div ref="scroll" class = "scroll listView">
			<ul v-show = "listView">
				<transition name="fade">
					<div class="noDealerByQueryCity" v-show = "noDealerByQueryCity">
						<img src="../assets/warning@3x.png" width="29" height="25"/>
						<p>Sorry, your search did not return any results. Please search a different city or province by using the dropdown.</p>
					</div>
				</transition>
				<transition name="fade">
					<div class="noDealerByQueryText" v-show = "noDealerByQueryText">
						<img src="../assets/warning@3x.png" width="29" height="25"/>
						<p>Sorry, your search did not return any results. Please try searching for another dealer or searching by using the dropdown.</p>
					</div>
				</transition>
				<transition name="fade">
					<div class="noDealerByQueryText" v-show = "noDealerByJvFlagInList">
						<img src="../assets/warning@3x.png" width="29" height="25"/>
						<p>Sorry, Online service booking is currently not available for your vehicle. Please call your preferred dealer to book an service appointment.</p>
					</div>
				</transition>
				<transition name="fade">
					<div class="noDealerByQueryText" v-show = "noDealerByLocationInList">
						<img src="../assets/warning@3x.png" width="29" height="25"/>
						<p>Sorry, Online Service Booking is currently not available in your current location. Please search available location by using dropdown.</p>
					</div>
				</transition>
				<li class="listViewItem" v-for = "item in orderDealer" :value="item._name" :key="item._distance" @click.stop = "selectDealerForListView(item)">
					<div class="thumb">
						<img src="../assets/group2@3x.png"/>
					</div>
					<div class="infoContent">
						<h2>{{item._name}}</h2>
						<p>{{item._address}}</p>
						<a :href= "callDealer(item.OSBPhone)" @click.stop = 'stopPop'>致电经销商</a>
					</div>
					<div class="distances">
						<span>{{(item._distance/1000).toFixed(2)}} km</span>
					</div>
				</li>
			</ul>
		</div>
	</transition>
	<transition name="fade">
		<dealer-info ref = "showDealer" v-bind="{ 'dealerObj': activeDealer}"></dealer-info>
	</transition>
</div>
</template>

<script>
import bar from '../components/bar'
import tab from '../components/tab'
import AMap from 'AMap'
import BuildScroll from 'better-scroll'
import dealerInfo from '../components/dealerInfo'
import _ from 'lodash'
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
			noDealer: false,
			listView: false,
			noDealerByQueryCity: false,
			noDealerByQueryText: false,
			noDealerByQueryTextInMap: false,
			noDealerByJvFlagInMap: false,
			noDealerByLocationInMap: false,
			noDealerByJvFlagInList: false,
			noDealerByLocationInList: false,
			provinceList: [],
			cityList: [],
			value13: '',
			queryDealerByTextValue: '',
			allCity: [],
			provinceValue: '',
			cityValue: [],
			dealerResult: [],
			activeDealer: [],
			paramsStore: {
				selectDealerOption: {
					'selectProvinceValue': '',
					'selectCityValue': '',
					'activeDealerData': '',
					'activeDealerCard': '',
					'mapList': '',
					'formData': '',
					'showChooseCity': ''
				}
			},
            provinceAndCityParams: {
				params: {
					'tableid': '590048077bbf197dd15de019',
					'key': '6edfef5707fff59eaa5ba33f7f02b939'
				}
			},
			dealerParams: {
				params: {
					'tableid': '58afdc467bbf195ae88d74ab',
					'city': '',
					'keywords': '',
					'filter': '',
					'key': '6edfef5707fff59eaa5ba33f7f02b939'
				}
			},
			dealerAroundParams: {
				params: {
					'tableid': '58afdc467bbf195ae88d74ab',
					'city': '',
					'keywords': '',
					'filter': '',
					'radius': '',
					'center': '',
					'key': '6edfef5707fff59eaa5ba33f7f02b939'
				}
			},
			jvFlag: ''
		}
	},
	computed: {
		orderDealer: function () {
			return _.orderBy(this.dealerResult, '_distance')
		}
	},
	methods: {
		callDealer (OSBPhone) {
			return 'tel:' + OSBPhone
		},
		switchTab (activeTab) {
			this.hideDealerInfo()
			switch (activeTab) {
				case 'location' :this.showChooseCity = true
				break
				case 'dealer' :this.showChooseCity = !this.showChooseCity
				break
			}
		},
		stopPop () {},
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
		getDealer (city, filter, invokeByGaoDe) {
			map.clearMap()
			let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			let jvNumber = _osbAuth.selectedVehicle.jvFlag
			let Flag = ['', 'CAF', 'FCO', 'JMC']
			this.jvFlag = Flag[jvNumber]
			if (this.jvFlag !== 'CAF' && !this.listView) {
				this.noDealerByJvFlagInMap = true
				return
			}
			if (this.jvFlag !== 'CAF' && this.listView) {
				this.noDealerByJvFlagInList = true
				return
			}
			this.dealerParams.params.filter = filter
			this.dealerParams.params.city = city
			this.orderDealer.length = 0
			this.dealerParams.params.keywords = this.jvFlag
			if (this.dealerParams.params.city) {
				this.$http.get('https://yuntuapi.amap.com/datasearch/local', this.dealerParams).then((response) => {
					response = JSON.parse(response.bodyText)
					if (response.datas.length) {
						map.clearMap()
						this.init(this.dealerParams.params.city, response.datas)
					} else {
						map.clearMap()
						if (city === '全国' && this.listView) {
							this.noDealerByQueryText = true
						}

						if (city !== '全国' && this.listView) {
							this.noDealerByQueryCity = true
						}

						if (city !== '全国' && !this.listView) {
							this.noDealer = true
						}

						if (city === '全国' && !this.listView) {
							this.noDealerByQueryTextInMap = true
						}

						if (invokeByGaoDe && !this.listView) {
							this.noDealerByLocationInMap = true
						}
						if (invokeByGaoDe && this.listView) {
							this.noDealerByLocationInList = true
						}
					//	this.$refs.barComponentHook.errorCloseFn('没有查询结果。请使用下拉菜单搜索不同的城市或省份。', true)
					}
				}, (response) => {
					// 响应错误回调
				})
			}
		},
		getAroundDealer (city, filter, center) {
			let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			let jvNumber = _osbAuth.selectedVehicle.jvFlag
			let Flag = ['', 'CAF', 'FCO', 'JMC']
			this.jvFlag = Flag[jvNumber]
			if (this.jvFlag !== 'CAF' && !this.listView) {
				this.noDealerByJvFlagInMap = true
				return
			}
			if (this.jvFlag !== 'CAF' && this.listView) {
				this.noDealerByJvFlagInList = true
				return
			}
			this.dealerAroundParams.params.filter = filter
			this.dealerAroundParams.params.city = city
			this.dealerAroundParams.params.keywords = this.jvFlag
			this.dealerAroundParams.params.radius = '50000'
			this.dealerAroundParams.params.center = center
			this.orderDealer.length = 0
			if (this.dealerAroundParams.params.city) {
				this.$http.get('http://yuntuapi.amap.com/datasearch/around', this.dealerAroundParams).then((response) => {
					response = JSON.parse(response.bodyText)
					if (response.datas.length) {
						map.clearMap()
						this.init(this.dealerAroundParams.params.city, response.datas)
					} else {
						map.clearMap()
						if (!this.listView) {
							this.noDealerByLocationInMap = true
						}
						if (this.listView) {
							this.noDealerByLocationInList = true
						}
					//	this.$refs.barComponentHook.errorCloseFn('没有查询结果。请使用下拉菜单搜索不同的城市或省份。', true)
					}
				}, (response) => {
					// 响应错误回调
				})
			}
		},
		selectProvince (isListView) {
			this.noDealer = false
			this.noDealerByQueryText = false
			this.noDealerByQueryCity = false
			this.noDealerByQueryTextInMap = false
			this.noDealerByJvFlagInMap = false
			this.noDealerByJvFlagInList = false
			this.noDealerByLocationInMap = false
			this.noDealerByLocationInList = false
			for (let i = 0; i < this.allCity.length; i++) {
				if (this.allCity[i].Province === this.provinceValue) {
					let _cityArray = this.allCity[i].City.split('%')
					this.cityList = _cityArray
				}
			}
		},
		selectCity (isListView) {
			this.noDealer = false
			this.noDealerByQueryText = false
			this.noDealerByQueryCity = false
			this.noDealerByQueryTextInMap = false
			this.noDealerByJvFlagInMap = false
			this.noDealerByJvFlagInList = false
			this.noDealerByLocationInMap = false
			this.noDealerByLocationInList = false
			let _filter = 'OSBFlag:True'
			this.getDealer(this.cityValue, _filter)
		},
		selectDealer (e) {
			let _paramsForActiveDealer = e.target.G
			this.activeDealer.length = 0
			this.activeDealer.push({'OSBDealerID': _paramsForActiveDealer.OSBDealerID || '20940', 'name': _paramsForActiveDealer.name, 'address': _paramsForActiveDealer.address, 'OSBPhone': _paramsForActiveDealer.OSBPhone || '15940885590'})
			this.$refs.showDealer.showDealerDetail(this.activeDealer[0], true)
		},
		selectDealerForListView (selectedDealer) {
			this.activeDealer.length = 0
			this.activeDealer.push({'OSBDealerID': selectedDealer.OSBDealerID || '20940', 'name': selectedDealer._name, 'address': selectedDealer._address, 'OSBPhone': selectedDealer.OSBPhone || '15940885590'})
			this.switchIcon(true)
		},
		queryDealerByText (listView) {
			this.noDealer = false
			this.noDealerByQueryText = false
			this.noDealerByQueryCity = false
			this.noDealerByQueryTextInMap = false
			this.noDealerByJvFlagInMap = false
			this.noDealerByJvFlagInList = false
			this.noDealerByLocationInMap = false
			this.noDealerByLocationInList = false
			let _filter = '_name:' + this.queryDealerByTextValue + '+OSBFlag:True'
			this.cityValue = '全国'
			this.getDealer(this.cityValue, _filter)
		},
		hideDealerInfo () {
			this.activeDealer.length = 0
			this.$refs.showDealer.showDealerDetail(this.activeDealer, false)
		},
		showDealerInfo () {
			let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			_osbAuth['showDealerInfo'] = this.activeDealer
			window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
			if (this.activeDealer.length) {
				this.$refs.showDealer.showDealerDetail(this.activeDealer[0], true)
			}
		},
		init (city, result) {
			this.hideDealerInfo()
			let _city = city === '全国' ? '中国' : city
			map.setCity(_city)
			let lnglat = new AMap.LngLat(121.33976, 31.19609)
			for (let i = 0; i < result.length; i++) {
				let _gps = result[i]._location.split(',')
				marker = new AMap.Marker({
					icon: new AMap.Icon({
						imageSize: new AMap.Size(28, 35),
						image: 'data:image/png;base64,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'
					}),
					position: [_gps[0], _gps[1]],
					name: result[i]._name,
					address: result[i]._address,
					OSBPhone: result[i].OSBPhone,
					OSBDealerID: result[i].OSBDealerID
				})
				result[i]['_distance'] = lnglat.distance([_gps[0], _gps[1]])
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
		this.$http.get('https://yuntuapi.amap.com/datamanage/data/list', this.provinceAndCityParams).then((response) => {
				response = JSON.parse(response.bodyText)
				if (response.datas) {
					this.allCity = response.datas
					for (let i = 0; i < response.datas.length; i++) {
						this.provinceList.push({'p': response.datas[i].Province})
					}
				} else {
					this.$refs.barComponentHook.errorCloseFn('没有查询结果', true)
				}
			}, (response) => {
				// 响应错误回调
		})
	},
	mounted () {
		map = new AMap.Map('container', {
			resizeEnable: true,
			zoom: 10
		})
		_that = this
		map.plugin('AMap.Geolocation', function () {
			let geolocation = new AMap.Geolocation({
				useNative: true, // 是否使用高德定位sdk用来辅助优化定位效果，默认：false
				enableHighAccuracy: true, // 是否使用高精度定位，默认:true
				timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
				maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
				convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				showButton: true,        // 显示定位按钮，默认：true
				buttonPosition: 'RB',    // 定位按钮停靠位置，默认：'LB'，左下角
				buttonOffset: new AMap.Pixel(10, 50), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
				showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
				panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
				zoomToAccuracy: true     // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			})
			map.addControl(geolocation)
			geolocation.getCurrentPosition()
			// _that.dealerAroundParams.params.center = geolocation.getCurrentPosition()
			AMap.event.addListener(geolocation, 'complete', function (e) {
				_that.$refs.barComponentHook.errorCloseFn(e.message, false)
				let _filter = 'OSBFlag:True'
				let invokeByGaoDe = true
				debugger
				_that.getAroundDealer(e.addressComponent.city, _filter, invokeByGaoDe)
				_that.$refs.barComponentHook.errorCloseFn(e.message, false)
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
		border-radius: 0px
		border-right:none
		box-shadow:1px 1px 3px rgb(219,219,219)
	.chooseDealerOption .ivu-select-input
		height:48px
		line-height:48px
		font-size:14px
		color:rgb(45,152,205)
	.chooseDealerOption .ivu-select-arrow
		color:rgb(45,152,205)
	.chooseDealerOption .ivu-select-item
		font-size:14px
		font-size:14px!important
	.chooseDealerOption .ivu-btn-primary
		background-color: rgb(45,150,205)
		border-color: rgb(45,150,205)
		z-index: 999
		width: 90%
		height: 55px
	.chooseDealerOption .ivu-select-dropdown
		margin:0
		border-radius: 0px
	.chooseDealerOption	.ivu-input
		border-left:0px solid #fff
	.chooseDealerOption .ivu-input-group
		box-shadow: 1px 1px 3px #dbdbdb;
	.chooseDealerOption .ivu-input-group .ivu-input
		height:48px
		border-radius:0px
	.chooseDealerOption .ivu-input-group-prepend
		border-radius: 0px
		padding: 4px 20px
		background-color: #fff
		border: #fff 1px solid
		color: #4596a4
		border-top: 1px solid #dddee1
		border-bottom: 1px solid #dddee1
	.chooseDealerOption .ivu-icon
		font-size:20px
	.chooseDealerOption .mapView ,.chooseDealerOption .listView
		position: absolute
		top: 163px
		bottom: 0px
		width: 100%
		overflow: hidden
	.chooseDealerOption .listView
		z-index: -1
	.chooseDealerOption .mapView
		z-index:3
	.chooseDealerOption .listView
		.listViewItem
			display:flex
			width:100%
			min-height:80px
			padding: 23px 10px 28px 10px
			border-bottom: 1px solid #dddee1
			.thumb
				width:66px
				height:66px
				img
					width:66px
					height:66px
					border-radius:12px
		.infoContent
			flex:1 auto
			text-align:left
			margin-left:16px
			&>h2
				font-size:14px
				overflow: hidden
				text-overflow: ellipsis
				max-height: 45px
			&>p
				color:#959595
				font-size:12px
				max-height: 56px
				overflow: hidden
		.distances
			width:65px
			height:65px
			color:#fff
			&>span
				font-weight:400
				color: rgb(149,149,149)
				text-align: center
	.move-enter-active, .move-leave-active
		transition: all 0.5s linear
		transform: translate3d(0, 0, 0)
	.move-enter, .move-leave
		transform:translate3d(100%, 0, 0)
	.amap-geolocation-con .amap-geo, .amap-touch-toolbar .amap-geo 
		width: 55px
		height: 55px
		border-radius: 100%
		right: 4px
		border:none
		box-shadow: 1px 1px 3px #dbdbdb
	.amap-geolocation-con
		right: 10px
	.chooseDealerOption .ivu-icon-arrow-down-b:before
		content: "\F3D0"
		height:55px
	.chooseDealerOption .noDealerMessage
		position: absolute
		z-index: 9
		background: #fff
		width: 317px
		padding: 10px 15.3px 13px 13.4px
		border-radius:15px
		box-shadow: 1px 1px 3px #dbdbdb
		left: 0
		top: 20px
		right: 0
		margin: 0 auto
		&>p
			color:rgb(45 150 205)
			font-size:13px
	.chooseDealerOption .noDealerByQueryText
		width: 317px
		position: absolute
		left: 0
		right: 0
		top: 100px
		margin: 0 auto
		&>p
			color:rgb(51 51 51)
			font-size:14px
	.chooseDealerOption .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .chooseDealerOption .ivu-select-single .ivu-select-selection .ivu-select-selected-value
		height: 48px
		line-height: 48px
	.chooseDealerOption .noDealerByQueryCity
		position: absolute
		top: 100px
	.amap-geolocation-con .amap-geo, .amap-touch-toolbar .amap-geo
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACuCAYAAACiEkapAAAAAXNSR0IArs4c6QAAHhZJREFUeAHtXQl4FUW2LpYQEghb2BdJWNwAFUQFF5BFB+UhRFEY0NGHTx18Oir6mPn8xm1GfA6juDHgNr75BkFwYxuRkUU2ERBQEBRZTJAdwpIEQkICvP9vbt909+2+t29yl17qfF+l+1ZXV9c59aeqzqlTVdWEpKgkcPbs2RS8UFcTMjT3jCcd14Qizf3xatWqlTGBJHsSqGYvmb9SAYQEXQeEjiahSRWlcQjvbzMJ2wFeglmSRgK+ByjAWAPyuBShN0IvhB4IzRGSQfvx0VUIyxCWImwAaE/j6lvyHUADXfTlqHEVkNfivp5DEVCIcq1AUAG7zm9DBF8ANNBK9kNFj0DIQXAqIFG0sETAzkSYhrDID62rZwEKUJK3ngi/RrgDoSmCl+ggmPkQ4QOErwHWs15iTuXFcwAFMNuDuf9CGI6QheAHygOT0xHeBVB3eIlhzwAUwOS4cizCbQhUfPxIVKg+QRgPoK7zggBcD1AA8wZUBIHZ3wsVEkMeFiIvAnVBDPNMeFauBChAyRZyKAKB2S3hUnPXB9ejuOMRPgZYXWeych1AAy3maxD4Re7CSdJL+yNK8IjbWlTXABTAbAsBT0C4NelV7e4CfIrijwFQd7qBDccDFMCsDUH+PhDS3CBUF5TxJMr4FwYAtcTJ5XU0QAHOIRDeKwhZThaii8uWh7I/BpDOcioPjgQogNkYAnsPYZBTBeexcs0FP6MA1Hyn8eU4gAKcnCOfitDKacLyeHn2gL+RAOlSJ/FZ3SmFATBrIDyL8ixGkOBMfMVQ5otZB6yLxH/e/IuOaEEhEAqHDhB0d5OUfAnQe2oEWlO2qkmlpLegACfHmRsQJDiTCgXdx1kXGwJ1o3uQ6B9JBSgE8BQYnoOQmWjG5fciSoB1MidQRxETxytBUrp4MM1/jIkIo+PFmMw3phKYhNweRpd/Jqa52sgs4QAFOFNRLmrp9DqS5B4J0EuKWn5pIoucUIACnPXBHI3C1yeSSfmtmElgCXIaApAWxCzHCBklDKAAZwuU5XMELlCT5F4JUKG9CSDdlwgWEgJQgLMjmPkCISsRTMlvxF0CefjCDQDp9nh/Ke4ABThbgomVCPRGkuQdCewEK1cDpHvjyVJczUwAZwMUfj6CBGc8azE5ebNO5wfqOG4liBtAUXC6yc1G6BK30suMky0B1u3sQF3HpSxxASgKzLlcOXUZlypzXKacdZoWqPOYFy4uAEUp/4aQE/PSygydKgHWNes85hRzgOI/6VmU8oGYl1Rm6HQJPBCo+5iWM6ZaPArIlZYfxbSEMjO3SeB2aPYfx6rQMQMowJmFQn2HwNkiSf6VQAFYvwwgzYuFCGLSxQOcNVEY7hEkwRmLWnF3HsTABwFMVJmTmAAUpRiH0KPKpZEZeEUCxAIxUWWqcheP/5QbUQoa46ucV5W5kRk4SQJnUZgB6Oo5xV1pqhKoAM7m+PIGhKaVLoF80csS4BaRlwKk+yvLZKW7eICT4J6CIMFZWel7/z1iY0oAK5XittIAxdfuRJA7ylVK7L56iRghVipFleri8R+Rga9tRWAXL0lKIJIE2MWfj66+KFJC4/PKtqDPICMJTqM05W8rCRArxEzUFHULitbzQnxlI0JK1F+TL/hZAmVg/hK0oluiEUJlWtDX8QEJzmikLNNSAsQMsRMVRQVQtJ70Wrkhqi/IxFICFRK4IYChipgId7a7eGRMB2Tu0psVIU/fPj5SUi7e++6AKMT1jk5NROcm6b6VRRjG8/DsInT1JWHSBB9FA9Df4q3JwTflTYgERs78SXx/8IQSn5ZSXcwZ1kk0qyNHQyGCwoYdAOibJvEhUba6eLSeTPdEyNsyIiiBgtLTQXAy8mTZGbF2b9RWlWB+Hr95PICpiGzaAihy4S4g7SPm5uMEpadDd4UpPc3paEkmEuiAOFs7y9gF6O9NPiKjpASqIgFbmIoIUDTF/VCKy6tSEvmulICJBC4PYMvkUUVURIAiqS2kV2Qp76QEbEsgIrbCAhQI74pPSbunbXnLhFFKgHZRYsySwgIUbz1o+aZ8ICUQGwmExZilHRTIroXv0wulYWzK4a1cimFG2gibZ+7REpFXwFAqvt5VqGOyY6M00QnG+qwGtZXQuWm6aJou7aI6IQlxFL+bwy56yhCv/AwH0FuQYrbZS36N+6WwVHy27YhYubtIbAY4y89Eb0YiWK9qlSF+1b6h6N6irl9FaeR7MAA6xxjJ3+EAOh3Ph5m95Kc4mjI/335EzNh8SGw4cG6WKFb8t8xIFTkXZopfY1q0Xip3C/ItzQBAh5txbwpQdO/81z6A4NvJZLaNM7ccFu9+u1/sRssZT0pPqSGGA6T3dm0mMmr5EqjFkG8zgPS4Uc5WAB2JhO8bE/vl9+ZDxeLPy38RP+Bqh2rXrC7Oq58q6gJo+SfLBFvdzLSagiMAgvsYnEfsUGZainisRytxy/mN7CT3Wpo7AdCpRqasAPovJBxoTOyH3+9+e0BM/GYvwMU21JxSAcgeGEf2yWogerTOEC3rUp+0Js7Tf7f/uPgyr0As3VkgDgPE4ah32/rixX7Zog4cTnxEnwGg/2HkNwSg6N6ptbN795W6eQrN3tNLdop5GG9aUd/sBmJQx0bi6jb1RBpAWhki7DmWXfDzUfHxj/mKU4lZPu0bpok3BrQXreuFB7/Zuy6N438tu3lq9UEyA+gQPJ0ZTOGDm0PFZeJ3//5Z0czN2O3eMkM8dlUr0QVmolhSfnG5mLR2r5j502Fx2sQiUL92TTHhhnbiipa+0fZzAFCeAhMkM4BOwNPHgik8frPtyEnx23nbxaETod1udsPa4vEerUWv8+rFVQp5x0rFhNV7xJK8YyHfqVm9mni613liyAWZIc88GPEKADpGy5cZQNchQTdtIq/eHzlZLoZ/ukXsPx5qI76hXUMxrk+WqF0zRERxE8eU7w+KCav2hLSmNQDSSTd1ED0x3vU4rQdAdY5JOulj/MmmgoMwz9s6ytCljpq7TWyA8qIlCEg80K25eLA7j3VKPH2F2aixi3JFERQrLdVLrSmm5lwg2sJa4GEi041QB4Uqj8aR/rV44Hlwkvk/LfslBJzUzv/aPztp4GS5roECNjXnQtHGAMTC0nLx8PwdouiUHrh8x0NE7BGDQTIClBvie57+ufGgmA3FxEjP9W4rbmzXwBid8N9ZAOebN3cQVJK0lHesRPzPwlzFvqqN99i9DoNGgPb2GLMh7OSikl9bsyck/t6uzcXNHZzjF9OmXqp4GRo8lSQtrcQQgNOuHiYdBoMAxfiTdk/dANWLQnh++S5RxqkeDV0Pg/vvrmypiXHG7ZUwL429uk1IYSbCNHUYCp5HiZ72QRt8EKBgth1C8IEXmV+Ue0x8Y1hp2SKjlnixb5a110ySBTG8U2MxEJMDWqICxdkujxIxSCwqpAVoRzXSq9e319O9VU8PX9FSpDt8SvFRTBJQgdPSnK2HxQET2602jYvvg1jUch2MdDFjlkVfgbHbj/l6548LMtNDWifLDJL4gJs/jOzMvWAriMOU/9vAGWlPUhCLvgHoxz/kh9QkPYf0KkhIEsdE0BWPtlAtzUUrSh8CD5K/AEpvouW7CnT12A3e7Fe7aGaGfqL3XNpMxwPHol+aTI/qErnzh78ASs8ho+Y+oL1e8XBDPQ4wMYN9vl3n/OMGNuyUUQ9QqPWcPwu1Z9jJygVpVmENkZH6ZNU3Rjn+d2tYHLgQT0trYJUwcYTSJnHjfZsAJoU6Bm0FLtR7NzIUtszf7NMD9GKstHTrrnP0SdXScUx9/mBQ/rTPXXpPLBKTQVB61k1mJ5YDHzUYtfvCMO9W6gNveyPFejGfMf8k/VYwqbaanvWI5fy1kS538XJftv5cZKclMx61z116r2DS+wBFC2qkbKxNdzMZXe68DFDVsObaFrQc23JuPVwsinljQhsNa9nZ+jTCiks3E13xtJMOHMas3af3a1X5qwH/VipWdWupbZH6xPFXBZNqTblyDFoIBeGe2VvFdizbsEte2CDByANXBIyaw3PVzCkDm0JMHNBBdG1exzyBM2PdPwblxgrRgJP1YBy/ObNuwpeqjmEMGj61ULzzJ6/bFymZ0577YwzqNKnHojyenNw0CKa8vFxZqagOTPRqoSGxU3/ein2NjIbrSGUtLnP/koloeWAXP/ry5KyxilQfVs8BUGX4qY5B9ZZsq7ccFs/56Rm3XSS2Him23ADhg00HxRc/VyznLcT8tdvJyENz7Gzyv/BpNSOuCO2ATSDcpiSdPn1a2alNBai5CmjGscPi6CZ5cWPrDRU2YX8lLUDZ+nC5sZs1+V0G0xnNTm627ZpB6tSpU4pvpNrFuxagZsxp47gAzUhcl+RmollJS9xz1GtUVlamtKAKQNXm1GtMkh+zyltnYTN0A//ccc84BjXj0Q28hCsjWtAKgKpoDfeCW5+x+2toMMwvdrEP5WLskGekS5u5yr5pLL7p72IQHygt6IkTJ/RrIUxfcW/kFS308xBshdy6nsfooEwNPdwY3K21VlBQUNGCAqCeHYOygriHp5GMFW187sTfuwtPCW52pqUrsPOeYem89rFr7w8dQisCUlrQjRux1YaHiRuBpdTQrz6av8N9nuhmZb65g/tWBtiB2uLFi5XdKRSADho0qOjMmTP5dl50Y5r66Aava6P3o1wPRYkbdbmFuCfTPwyrONm9X2/iH+oWnqzKCSweevnll5VeXQEoEp6B1pRr9YIX4ode3DiEjVdW7xVumTbkYQ7cQExLg87PFLUMPYP2uVvvgcU8lF1xT1MBehaRP7uVITvlvha7xl1kMOjTTe9fOPfI6USFbtom/X5MHLL8p2GVp9P5sFu+ABaVtiMIUChKnm5BKZz7se+nkbiFDE+NczK9it2XSw3+rreg9XTruqpIsg5gUQ/Qo0ePeh6g/bDgjFqvlvYVnRJ/WJzn2K5++uZ85XQ7bZk59nwIW/Z4lQJY1AN0+/btngcoK/SP17UJ0ei5N/xra5y3GdfqPUVi/MpdITh8qHtL5RymkAceiQhgUT8GnTZtmqfHoGrdcT3SI1cqK1rVKOX6HpSQeQ7aBGEXDgB7fEFuyHmgPAJnGE6l8zK9//77bCyVFlRrHGyOwemylJSU4K4OXhbCUzgTybjLMneQG9cnK+m7LPPUj/+ev10YvZY458596r18XCKm3bfVqlXremCPPpLFqpKEe3Eag9NVvPED8WiXy5rr1wpSEeEW25PWJm95BG2zI2dtCQEnNw7jwV5eBidxp8Gg4rirBWj5gQMHvvYDOMljCuYHX72xnaCzr5aw5Yp4E+t3xqB7PWnQnLXp4nE/BRN6D83HQQkGp2o6HfNwB+Ny43iUIdl5ajCoGH21AD09Z86c1ckuYCK/T6flv93UXjStowcpy7AQG47xDCWerRlvon8qT/D469e7Q85I4h71z6K198EZSYqYAxjk+FNpQbVjULqlN8BakK9q1KiRpaT2yR8ehfgIjkLcdFBxoAnhmt7qj+HEuUtifBQivzsZwwmroxAb4JQPHqTgl6MQ4ZecV7NmzWtQAWw9Ff8QLUDZjDSGm9PL9erVMz1cPqTmPBTBjWCfWbozxOaoZTFWh8l+t//cYbKfbLE+TLYDNlt4nYfJYkc7v1BhYeH0+vXrPw5+ueRBmeJT1yRRBkqfjzHAKj8ClHPaXHhGYLwBm6jZcdyLcQgDA7X9q3AcNzchs3Mc97ESHMd9oOI47iM2juP+S79sx++dT9DEkoi9QH5BpwMtQGkYPbtgwYKVHTv6wtJkKtt7L2smegJ8f16xy/L0Y2r7yzA2ZSDVBmB5rlFdrDLlWfDclZvjW+7buRv2zIKSoLxNv6lGZqaliDE9WylHfqtxfroSewF+gwLTdvF8RgtwSmlp6WewRV0WSOzLC0fps3Aa3Ts4GYQgiyfVAbCHXdxEcB96r5uRrOQIG/x3qampAwPPD+OqCF3bgvIZj/1NOXjw4MzWrVv7GqD8z83BEdiD4ZTx+fYjYjpOd4v1PpwtM1IFN58Y3rmJqAeQ+pmIOQ3/xKFCRqnQ7JTWuHHj3dddd939uDe2sOfe8tFfbA4nzs9MA5BwoNb5jUSD2iniFPruw9DAK7P1NqdaB7RvKB7v2RqnyLVW1rOn1tBa+3wk3ApWz0ycOPFxeNHTjEJwBtfIGQFISSk+aSdPnpxRu3btayvykHdaCdCIz60dacPMxdTkzoISwXM0tcRteTo1rSO4Np/A7AwzVZP0FG0SeQ8JlJSUrEhLSxsWEAY96YOCNHbxVJQ4QK25b9++WdnZ2RKgAakZL2kBTZ7aPOkgWtT+U77XJRvZpanShesi5Y8QCRBrmshg9844s75FSfDSSy/Nw3NdYk0m8lZKIFYSOBXAmpqfDnNmAFW0p0mTJhVg7fyX6lvyKiUQDwkQY8RaIO8yXBU/UPVbZgANInjr1q0fqAnlVUogHhIwYCyIPfVbZgDlJL1iKL3mmmsWwD9vq5pYXqUEYikBYosY0+QZYnA2AyjTK9tXcHucnTt3TtZkIG+lBGImAWIrsAUT82TXHh1A+daQIUM+xUL6vbyXZC0BM1tmqgfXrFtLILonxBSxpXmLDiKcwNORVQvKLp4DVrF58+byvXv3vqN7S/4IkQB3L+kCm6dKaSnVRXfDClL1mbwKQUwRWxpZ6DedCjwwziRp0ismqFRG7N69+8ehQ4f+plq1at7bKVXLcRXv+2BZM/spGuWfvPY80Q5XSaESwKqFY/fdd9/DP/zwg9IIIgXFFjTOa98wziRpnxG8zdQIzJWObdKkySPqb3mVEqisBLBz3WtNmzYdr3mfU5yqqUkTbW6oVxNQmw+q/W+88cbfgXxzl3P1DXmVEoggAWKIWDIkC869G+IjOoMoy0DUlzBuGN2iRYs/qr/lVUogWglgWvP5li1bai1DHIcqyzvM8rJSktS0Os1q4MCB72LdyA71obxKCUQjAWKHGDK8Y9l6Ml0kgHLwGuzWv/322zKEpwwfkD+lBGxJgNghhjSJia+wAA2nJKn56JQlRh4/fvy9OnXq/EpNIK9SApEkgA0Z/l23bt1RhnQ8QC7sIXKRWlDmR2VJh/KpU6c+gzh2/5KkBOxIoCSAGW1aGuWDvbP2gfbeTgvK9PQbbap9ESvwnoCp4DFtnLyXEjCTAEyUrzRr1uwlwzNL05I2nZ0WlOmpaeks/SNHjpzIhfZ8KElKwEoCxAixYvI8YuvJd+wClGmVTe15Q1q4cGHJokWLHsStdtCrPJN/pAQCEigjRogVg0TY2LHRi0h2u3g1o0a40c3f7dq1636sAOWYVJKUgE4CmCJ/rk2bNm/rIs/94Ib7thq2aAEaMhZNT08X+fn5/8Sip34mBZFRPpUAFl0uwurg32jc6VRJ2Bp7qonDOYuoabRX2q0I6uCGQXA6FdhwbEnfvn1vhTOJfsNN7Zvy3jcSgCvd/qeffnrEkiVLjF078cMT1ELc6qyEE20Lynz4DjV6Hbi/+uqrq0EzEB/NuBbJJXlMAmdWrlw5DJ7y6jY2WvaUXZO1EZHuKwNQ5pmG0NCYuTQ9GSXiv98WJiUKgmNOnmZou/XkS5Vt7aiFBT2dmBGpW7duEzDmWHjul/zrNwmw7okBC77pThcVOJlPZQHKd0P89/bs2XPmjjvueAAbQa1jAkn+kQDrnHVPDJhwzZnIkAbNJF1IlG4cGfI0fESIwsTk27ZtK8cmuJ/379//RuzUnBk+C/nUCxKAorztiSeeGIbjY3S28gBvxAk3o4269eT7VQEo3+d/Be2iunzWrFlTgmnQL7p37z4Imr3+aDe+JckzEoDGvu/NN98c+uyzz+oPE63gkOC0ZZSveKXirrJKUkUO5+bpmyAiJK9PPvnkgpycnJkAqf4sbO3b8t61EoB3fMHMmTNzbrvttp8smNBtBGaRJmx0CKjCprZ+aKrVM/myZcuuwFaO03Grm4Gyzko+cYkESpYvXz68V69e31iUl70rN6KtVNeu5hkrgDK/BghcIhJC69ev79+1a9e38ECCNEQ6rowogePxA9DYrSw2BCWXcdBVs0pUFS3e+GFq9aZjDTKyYsWKEegSTJeWGjOSv50rAdYh6zIMOFl4zhZVGZzMKJYA5X+N5TQWuvnVs2bNyuE0GD8syX0SYN2xDlmXYUrPuXbjFGeY5OEf6bTv8EltPaVJga0ox6QhNGPGjHw4rn6G/74+1atXp2eUJJdIAH6d2996662hd999d26YInNvJU5nxoxiDVAWjAAlUE3Hm/PmzSvCKSKzMbjuCTtpC74gydkSgBH+26eeemrYk08+abk8GBxwKrPS9k4rCcRSSTJ+g/ZPSxsoNo5Kwxn1b8NNr6/xRfnbORKA29ziESNG3I+uXbeiwlBCjjc5zx6Tcac273gClN+h/bNiRy3tl3Hfvn37GqtXr/5DZmbmaPyMd1kMX5c/I0jg7OHDhydfddVVL+7YsSMc8NhbEpymCnKEb0R8HG9QMH96PZl292rp1q5dez3MUK9hXNpYjZPX5EkAylA+zEiPYCZwSYRSUDEmOG15x0fIy/RxLLV4sw+omn1YRwEKYty4cf1xHMlys0xkXOIkwDpgXdgAJwvFMWfcwMkPxLsF5TdI/Eeg1h70xGekkdDVV9u0adPDzZs3fwLP4qHAGT8pf1dI4PT+/ftf6ty58xvo2tmwRCKCM2bmJKuPxbsFVb/LcQqnvcIyRMFgc7LXMT16K8wae9SX5TW+EqCsKXPK3gY41W49bF3GqsSJAijLq3b3ul1KzBjp3bv32lGjRvU9cuTIO3gel8G32Xd9GFdOGVPWlLkN/lWFKOyQzUY+tpMkqos3FiisCUqb+MMPP+w4aNCg5+WxjFqpVP2exw/OnTv3j3Ay3mYzNzYU7AXDafQ2s7KfLFkAZQlpfrLthoex6cALL7zwGRj3W9lnT6Y0SoDd+ZYtW57DWPMz47Mwv6kIEZxsQRNKiezijYxxzpZz97aIAh08eHAvbB/9Kl7glJqk6CRQStlRhlGCk7KmKSnh4CR7yWxB+X0Sj/+lrdR4sC2fmdLkyZNbDx8+fHSDBg2GIYHpvL/pi/6MPHns2LEZ06dPnzx69OjdUYqAWyPS6diOVh9l1vaSOwGgLClbcnb3UYENc8ONHn300Xuxg8U98NqnP6qkgATgFncMO77849VXX/37Cy+8QJNQNMRxJp0+kt5TOQWgqvDo8EygRlWu22+/PX3ChAkjsPf5/ZiN8vUYFbNAe3CWwNtjxoyZ9tFHH0W0mKiC11xpPiI4k9Kla8qh3EYFBOPLcfrNrp5dPrv+qKhTp041sUZmSNu2be+sVatWd7zsRP6i4slm4rPwOFqLowXfxxqwWYYDsmxmoSSj0zl1A8eQUyuQ5aqHYOloEkmCHKdCIRiM7j8nJSXlokjp3fgcy31/RDc+czaoEuNLLcs0IVFhpbbuKHIqQFUhcWqUXX7UramaAa/o6s6HITqnUaNGg2Gmaqt95rZ7mIl2wrg+e+nSpTMxtNlaxfJT+aESlFRFKBwPTgcoy84yUnlii1pls9j8+fMvAV0LC0APGP+vdPq6fSg7RTCqr4Emvmrjxo0rBgwYsBFyiAXRv7MQIaGG92gL7gaAqjwRnJyBqnS3r2akXumcMmXKlE5dunTp2bBhwx7Y65SApVNL0giAPII9jtYcPXp01ffff//1XXfdtdnG/Hg05WV3zrFm0jV0O4V2E0BVftjds9sP6xmlJo7mys14J02alA3AZuNc0uyMjIzs1NTUdlC4sgMzWLHysEJPfXoPFJtcLH/5uaioKBdG9FwAMvfBBx/MNdn0NRo2rNKyO2eLSc0+aXZNq8JZxbsRoCovPIm5LoJyIrMaGa8rHKpTxo4de15WVlYLnBGVDuDWBXDrQAFjSAeA6zDw+wDfCQYoMcUIJwDEEwDicZwVVJyXl7dv/PjxvxgOtIpXsZkvzUXUzBkcYTpCOWyTmwGqMskWlUCNysivvuzhK8eWVH5c1WIa68MLAFV5ov2ULRiN/V7iS+XP7pWmIgKTBnfXdOVWzHmxIqlMEahsUW3P71sJyCXxBCIBydbSFcqPXbl6EaBa3tn9E6gMsVJwtPkn+56gpLnIE62lmTC9DlAtz9T6VbBW2Z6qzTjB92whVVC6TumJVlZ+AqgqG/LMrp/aP0HL4GTAckxJUHKZBYPnQQkeg+RHgAaZ19xwKKCClddkDQc4liQgVTD6DpDgXUcSoDpxBH+orSxbWgYCVr2vamtLENIExBkdNai/HT3tiPImnP4f57171a6Lx/sAAAAASUVORK5CYII=') 50% 50% no-repeat transparent
		width: 55px
		height: 55px
		background-size: contain
		border: 1px solid transparent
		border-radius: 3px
		right: 4px
		box-shadow: 1px 1px 3px transparent
	.chooseDealerOption	.provinceHighLight .ivu-select-placeholder
		color: rgb(45,152,205)
	.chooseDealerOption	.provinceHighLight .ivu-select-selected-value
		color: rgb(45,152,205)
	.chooseDealerOption .cityHighLight .ivu-select-placeholder
		color: #959595
	.chooseDealerOption	.cityHighLight .ivu-select-selected-value
		color: rgb(45,152,205)
</style>
