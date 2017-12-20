<template>
<div class="chooseDealerOption">
	<bar v-bind="{ 'title': '选择经销商', 'allIconStatus': true, 'goBackIcon': true}"  @icon-switch-status = "switchIcon(listView)" ref = "barComponentHook"></bar>
	<div style="position:relative;top:50px">
		<tab @watch-tab-status = "switchTab"></tab>
		<transition name="fade">
			<Row v-show = "showChooseCity">
					<Col span="12">
						<Select v-model="provinceValue"   @on-change = "selectProvince(listView)">
							<Option v-for="item in provinceList" :value="item.p" :key="item.p"  >{{ item.p }}</Option>
						</Select>
					</Col>
					<Col span="12">
						<Select v-model="cityValue"  @on-change = "selectCity(listView)">
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
					<p>Sorry, Pickup & Delivery Service is currently only available in Beijing, Shanghai, Guangzhou, Chengdu, Suzhou and Nanjing. We are working on expanding this service to your city. Thank you for your patience!</p>
				</div>
			</transition>
			<transition name="fade">
				<div class="noDealerMessage" v-show = "noDealerByQueryTextInMap">
					<p>No results. Please search a different city or province using the dropdown.</p>
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
						<p>Sorry, Pickup & Delivery Service is currently only available in Beijing, Shanghai, Guangzhou, Chengdu, Suzhou and Nanjing. We are working on expanding this service to your city. Thank you for your patience!</p>
					</div>
				</transition>
				<transition name="fade">
					<div class="noDealerByQueryText" v-show = "noDealerByQueryText">
						<img src="../assets/warning@3x.png" width="29" height="25"/>
						<p>No results. Please search a different city or province using the dropdown.</p>
					</div>
				</transition>
				<li class="listViewItem" v-for = "item in orderDealer" :value="item._name" :key="item._distance" @click.stop = "selectDealerForListView(item)">
					<div class="thumb">
						<img src="../assets/group2@3x.png"/>
					</div>
					<div class="infoContent">
						<h2>{{item._name}}</h2>
						<p>{{item._address}}</p>
						<a href="tel:item.OSBPhone" @click.stop = 'stopPop'>致电经销商</a>
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
					'keywords': 'CAF',
					'filter': '',
					'key': '6edfef5707fff59eaa5ba33f7f02b939'
				}
			}
		}
	},
	computed: {
		orderDealer: function () {
			return _.orderBy(this.dealerResult, '_distance')
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
		switchDealerInfo () {

		},
		getDealer (city, filter) {
			this.dealerParams.params.filter = filter
			this.dealerParams.params.city = city
			this.orderDealer.length = 0
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
			let _filter = 'OSBFlag:True+JVFlag:CAF+_city:' + this.cityValue
			this.getDealer(this.cityValue, _filter)
		},
		selectDealer (e) {
			let _paramsForActiveDealer = e.target.G
			this.activeDealer = {'OSBDealerID': _paramsForActiveDealer.OSBDealerID || '20940', 'name': _paramsForActiveDealer.name, 'address': _paramsForActiveDealer.address, 'OSBPhone': _paramsForActiveDealer.OSBPhone || '15940885590'}
			this.$refs.showDealer.showDealerDetail(this.activeDealer, true)
		},
		selectDealerForListView (selectedDealer) {
			this.activeDealer = {'OSBDealerID': selectedDealer.OSBDealerID || '20940', 'name': selectedDealer._name, 'address': selectedDealer._address, 'OSBPhone': selectedDealer.OSBPhone || '15940885590'}
			this.switchIcon(true)
		},
		queryDealerByText (listView) {
			this.noDealer = false
			this.noDealerByQueryText = false
			this.noDealerByQueryCity = false
			this.noDealerByQueryTextInMap = false
			let _filter = '_name:' + this.queryDealerByTextValue + '+OSBFlag:True+JVFlag:CAF'
			this.cityValue = '全国'
			this.getDealer(this.cityValue, _filter)
		},
		hideDealerInfo () {
			this.$refs.showDealer.showDealerDetail(this.activeDealer, false)
		},
		showDealerInfo () {
			let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			_osbAuth['showDealerInfo'] = this.activeDealer
			window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
			this.$refs.showDealer.showDealerDetail(this.activeDealer, true)
		},
		init (city, result) {
			console.log(city + 'xxx')
			this.hideDealerInfo()
			// let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
			// _osbAuth['mapResult'] = result
			// _osbAuth['provinceValue'] = this.provinceValue
			// _osbAuth['cityValue'] = this.cityValue
			// window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
			console.log('-------')
			console.log(1, result)
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
					tel: result[i].ServicePhoneNumber
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
					this.$refs.barComponentHook.errorCloseFn('没有查询结果。请使用下拉菜单搜索不同的城市或省份。', true)
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
				zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			})
			map.addControl(geolocation)
			geolocation.getCurrentPosition()
			console.log('_that.dealerAroundParams.params.center')
			AMap.event.addListener(geolocation, 'complete', function (e) {
				console.log(1, e)
				_that.dealerParams.params.city = e.addressComponent.city !== '' ? e.addressComponent.city : e.addressComponent.province.replace('市', '')
				_that.provinceValue = e.addressComponent.province.replace('市', '')
				var _filter = 'OSBFlag:True+JVFlag:CAF'
				_that.getDealer(_that.dealerParams.params.city, _filter)
			}) // 返回定位信息
			AMap.event.addListener(geolocation, 'error', function (e) {
				console.log('xxxxxxx')
				console.log(1, e)
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
		top: 150px
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
</style>
