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
			component: selectDealerOption
		},
		{
			path: '/selectServiceType/:name/:phone/:address/:customer_mileage/:customer_name/:customer_phoneNumber/:customer_consultant/:customer_note/:chooseDate/:chooseTime／:customer_serviceType',
			name: 'selectServiceType',
			component: selectServiceType
		},
		{
			path: '/selectServiceDetail',
			name: 'selectServiceDetail',
			component: selectServiceDetail
		},
		{
			path: '/selectDateAndTime/:name/:phone/:address/:customer_mileage/:customer_name/:customer_phoneNumber/:customer_consultant/:customer_note/:chooseDate/:chooseTime／:customer_serviceType',
			name: 'selectDateAndTime',
			component: selectDateAndTime
		},
		{
			path: '/previewOrderSummary/:name/:phone/:address/:customer_mileage/:customer_name/:customer_phoneNumber/:customer_consultant/:customer_note/:chooseDate/:chooseTime／:customer_serviceType',
			name: 'previewOrderSummary',
			component: previewOrderSummary
		},
		{
			path: '/requestConfirmation',
			name: 'requestConfirmation',
			component: requestConfirmation
		},
		{
			path: '/myAppointment',
			name: 'myAppointment',
			component: myAppointment
		},
		{
			path: '/orderSummary',
			name: 'orderSummary',
			component: orderSummary
		}
	]
})
