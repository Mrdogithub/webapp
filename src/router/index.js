import Vue from 'vue'
import Router from 'vue-router'
import previewOrderSummary from '../views/previewOrderSummary'
import requestConfirmation from '../views/requestConfirmation'
import selectDateAndTime from '../views/selectDateAndTime'
import selectServiceDetail from '../views/selectServiceDetail'
import selectServiceType from '../views/selectServiceType'
import selectDealerOption from '../views/selectDealerOption'
import myAppointment from '../views/myAppointment'
import orderSummary from '../views/orderSummary'
import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.use(Router)
Vue.use(iView)
Vue.use(VueResource)

Router.prototype.goBack = function () {
	this.isBack = true
	window.history.go(-1)
}

export default new Router({
	routes: [
		{
			path: '/',
			name: 'selectDealerOption',
			component: selectDealerOption,
			meta: {
				keepAlive: true // 不需要缓存
			}
		},
		{
			// path: '/selectServiceType/:name/:phone/:address/:customer_mileage/:customer_name/:customer_phoneNumber/:customer_consultant/:customer_note/:chooseDate/:chooseTime／:customer_serviceType',
			path: '/selectServiceType',
			name: 'selectServiceType',
			component: selectServiceType,
			meta: {
				keepAlive: true // 不需要缓存
			}
		},
		{
			path: '/selectServiceDetail',
			name: 'selectServiceDetail',
			component: selectServiceDetail,
			meta: {
				keepAlive: true // 不需要缓存
			}
		},
		{
			// path: '/selectDateAndTime/:name/:phone/:address/:customer_mileage/:customer_name/:customer_phoneNumber/:customer_consultant/:customer_note/:chooseDate/:chooseTime／:customer_serviceType',
			path: '/selectDateAndTime',
			name: 'selectDateAndTime',
			component: selectDateAndTime,
			meta: {
				keepAlive: true // 不需要缓存
			}
		},
		{
			// path: '/previewOrderSummary/:name/:phone/:address/:customer_mileage/:customer_name/:customer_phoneNumber/:customer_consultant/:customer_note/:chooseDate/:chooseTime／:customer_serviceType',
			path: '/previewOrderSummary',
			name: 'previewOrderSummary',
			component: previewOrderSummary,
			meta: {
				keepAlive: true // 不需要缓存
			}
		},
		{
			path: '/requestConfirmation',
			name: 'requestConfirmation',
			component: requestConfirmation,
			meta: {
				keepAlive: true // 不需要缓存
			}
		},
		{
			path: '/myAppointment',
			name: 'myAppointment',
			component: myAppointment,
			meta: {
				keepAlive: true // 不需要缓存
			}
		},
		{
			path: '/orderSummary',
			name: 'orderSummary',
			component: orderSummary,
			meta: {
				keepAlive: true // 不需要缓存
			}
		}
	]
})
