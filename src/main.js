//For IE Exception.
import "babel-polyfill";
import Vue from 'vue'  /*Michael   引入vue*/
import App from './App.vue' /*Michael   引入app.vue  用他的内容来替换div id=app*/
import store from './common/store' /*Michael  构建vue实例*/
import {readLocalStorage} from "./common/util/Utils";

import VueI18n from 'vue-i18n'
//expose to global.
Vue.store = store;

import router from './common/router'
//expose to global.
Vue.router = router;

import {sync} from 'vuex-router-sync'
sync(store, router)

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = store.state.host;


import NProgress from 'vue-nprogress'
Vue.use(NProgress)

import filters from './common/filter'
// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})


//VUE国际化
Vue.use(VueI18n);

let currentLocale = readLocalStorage('appLocale');
if (!currentLocale) {
  currentLocale = 'zh';
}
const i18n = new VueI18n({
  locale: currentLocale,
  messages: {
    'zh': require('./common/lang/zh'),
    'en': require('./common/lang/en')
  }
})


//import partial element. ele.
import {DatePicker, TimePicker, Steps, Step, Tooltip, TimeSelect, Dialog, Tabs,TabPane, Table, TableColumn,
  Select, Option, Button } from 'element-ui'

Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tooltip)
Vue.use(TimeSelect)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button )

const nprogress = new NProgress({parent: '.nprogress-container'})

/* eslint-disable no-new */
new Vue({
  /*Michael   渲染内容的目的地*/
	el: '#app',
  /*Michael   渲染内容*/
	nprogress,
	store,
	router,
  i18n,
	template: "<app/>",
	components: {App}
})
