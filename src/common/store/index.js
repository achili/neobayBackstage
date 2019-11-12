import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import User from "../model/user/User";
import MessageManager from "../model/message/MessageManager";
import Preference from "../model/preference/Preference";
import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../model/core/feature/FeatureType";
import {ModuleType, ModuleTypeMap, ModuleTypeList} from "../model/core/feature/ModuleType";
import Pager from "../model/base/Pager";
import SpaceRegional from "../model/space/SpaceRegional";

let host = window.location.protocol + "//" + window.location.host + "/v1";
let domainName = window.location.protocol + "//" + window.location.host;

const state = {
	config: {
		mobile: false,
		showDrawer: true
	},
	debug: true,
	user: new User(),
	tankHost: "https://yctank.liyarou.com",
	host: host,
  domainName: domainName,

	//网站版权信息
	copyright: "©Copyright 上海零号湾创业投资有限公司 ",
	//备案信息
	filling: "沪ICP备15050352号-1",
	//地址
	address: "上海市闵行区剑川路951号零号湾2号楼",
	//邮编
	ipCode: "200240",
	//邮件
	email: "welcome@neobay.cn",
	//电话
	Telephone: "021-6450 0866",
	//微信
	weixinLink: "http://weixin.com",
	//微博
	weiboLink: "http://weibo.com",

	breadcrumbs: null,

	//缓存的attribute键值对
	attributeMap: {},

  spaceRegionals : new Pager(SpaceRegional,50),

	//和权限控制相关的。
	FeatureType,
	FeatureTypeMap,
	FeatureTypeList,
	ModuleFeatureMap,
	ModuleType,
	ModuleTypeMap,
	ModuleTypeList,

	//消息的Manager
	messageManager: new MessageManager(),
	//系统的偏好设置
	preference: new Preference()
}

//从本地存储中读取用户信息。
state.user.renderFromLocalStorage();
// state.spaceRegionals.httpFastPage();

const getters = {
	getConfig(state){
		return state.config;
	}
}

const mutations = {}

const actions = {}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
