import {ModuleType} from "./ModuleType";

let FeatureType = {

	PUBLIC:"PUBLIC",
	OFFICIAL_MANAGE:"OFFICIAL_MANAGE",
	ENTRY_APPLY_MINE:"ENTRY_APPLY_MINE",
	ENTRY_APPLY_MANAGE:"ENTRY_APPLY_MANAGE",
	ENTRY_APPLY_DISTRIBUTION:"ENTRY_APPLY_DISTRIBUTION",
	PROJECT_MINE:"PROJECT_MINE",
	PROJECT_MANAGE:"PROJECT_MANAGE",
	KEEPER_BUSINESS_MINE:"KEEPER_BUSINESS_MINE",
	KEEPER_BUSINESS_MANAGE:"KEEPER_BUSINESS_MANAGE",
	MAKER_SIMPLE_APPLY_MINE:"MAKER_SIMPLE_APPLY_MINE",
	MAKER_SIMPLE_APPLY_MANAGE:"MAKER_SIMPLE_APPLY_MANAGE",
	SPACE_APPLY_MINE:"SPACE_APPLY_MINE",
	SPACE_APPLY_MANAGE:"SPACE_APPLY_MANAGE",
	CONFERENCE_ROOM_MANAGE:"CONFERENCE_ROOM_MANAGE",
	PROTOCOL_INCUBATOR_MANAGE:"PROTOCOL_INCUBATOR_MANAGE",
	PROTOCOL_INCUBATOR_MINE:"PROTOCOL_INCUBATOR_MINE",
	PROTOCOL_SPACE_MANAGE:"PROTOCOL_SPACE_MANAGE",
	PROTOCOL_SPACE_MINE:"PROTOCOL_SPACE_MINE",
	FINANCE_PAY_INFO_MANAGE:"FINANCE_PAY_INFO_MANAGE",
	FINANCE_PAY_INFO_MINE:"FINANCE_PAY_INFO_MINE",
	FINANCE_PAY_INFO_REMINDER_MANAGE:"FINANCE_PAY_INFO_REMINDER_MANAGE",
	FINANCE_BILL_VIEW:"FINANCE_BILL_VIEW",
	FINANCE_BILL_OPERATE:"FINANCE_BILL_OPERATE",
	USER_MINE:"USER_MINE",
	USER_MANAGE:"USER_MANAGE",
	USER_SELECTION:"USER_SELECTION",
	USER_ROLE_MANAGE:"USER_ROLE_MANAGE",
	MESSAGE_MINE:"MESSAGE_MINE",
	MESSAGE_MANAGE:"MESSAGE_MANAGE",
	PREFERENCE_MANAGE:"PREFERENCE_MANAGE",
	SURVEY_MANAGE:"SURVEY_MANAGE",
	RECEPTION_MANAGE:"RECEPTION_MANAGE",
	RECEPTION_MINE:"RECEPTION_MINE",
	SUMMARY_INTERNS:"SUMMARY_INTERNS",
	SPACE_INVESTMENT_MANAGE:"SPACE_INVESTMENT_MANAGE",
	SPACE_INVESTMENT_MINE:"SPACE_INVESTMENT_MINE",
	SPACE_TEAMWORK_MANAGE:"SPACE_TEAMWORK_MANAGE",
	SPACE_TEAMWORK_MINE:"SPACE_TEAMWORK_MINE",
	INVESTMENT_MANAGE:"INVESTMENT_MANAGE",
	INVESTMENT_QUERY:"INVESTMENT_QUERY",
	INVESTMENT_MINE:"INVESTMENT_MINE",
	BASICS_SPACE_ENTRANCE:"BASICS_SPACE_ENTRANCE",
	I_SPACE_ENTRANCE:"I_SPACE_ENTRANCE",
	I_SPACE_MANAGE:"I_SPACE_MANAGE",
	OTHER:"OTHER"

}

let FeatureTypeMap = {

	PUBLIC: {
		name: "公共接口",
		value: "PUBLIC",
		style: "info"
	},
	OFFICIAL_MANAGE: {
		name: "官方网站管理",
		value: "OFFICIAL_MANAGE",
		style: "info"
	},
	ENTRY_APPLY_MINE: {
		name: "我的入驻申请",
		value: "ENTRY_APPLY_MINE",
		style: "info"
	},
	ENTRY_APPLY_MANAGE: {
		name: "入驻申请管理",
		value: "ENTRY_APPLY_MANAGE",
		style: "info"
	},
	ENTRY_APPLY_DISTRIBUTION: {
		name: "入驻申请预分配社区经理",
		value: "ENTRY_APPLY_DISTRIBUTION",
		style: "info"
	},
	PROJECT_MINE: {
		name: "我的项目和企业",
		value: "PROJECT_MINE",
		style: "info"
	},
	PROJECT_MANAGE: {
		name: "项目管理",
		value: "PROJECT_MANAGE",
		style: "info"
	},
	KEEPER_BUSINESS_MINE: {
		name: "我的企业管家",
		value: "KEEPER_BUSINESS_MINE",
		style: "info"
	},
	KEEPER_BUSINESS_MANAGE: {
		name: "企业管家管理",
		value: "KEEPER_BUSINESS_MANAGE",
		style: "info"
	},
	MAKER_SIMPLE_APPLY_MINE: {
		name: "我的第三方服务",
		value: "MAKER_SIMPLE_APPLY_MINE",
		style: "info"
	},
	MAKER_SIMPLE_APPLY_MANAGE: {
		name: "第三方服务管理",
		value: "MAKER_SIMPLE_APPLY_MANAGE",
		style: "info"
	},
	SPACE_APPLY_MINE: {
		name: "我的创业空间",
		value: "SPACE_APPLY_MINE",
		style: "info"
	},
	SPACE_APPLY_MANAGE: {
		name: "申请管理",
		value: "SPACE_APPLY_MANAGE",
		style: "info"
	},
	CONFERENCE_ROOM_MANAGE: {
		name: "会议室管理",
		value: "CONFERENCE_ROOM_MANAGE",
		style: "info"
	},
	PROTOCOL_INCUBATOR_MANAGE: {
		name: "孵化协议",
		value: "PROTOCOL_INCUBATOR_MANAGE",
		style: "info"
	},
	PROTOCOL_INCUBATOR_MINE: {
		name: "我的孵化协议",
		value: "PROTOCOL_INCUBATOR_MINE",
		style: "info"
	},
	PROTOCOL_SPACE_MANAGE: {
		name: "租赁协议",
		value: "PROTOCOL_SPACE_MANAGE",
		style: "info"
	},
	PROTOCOL_SPACE_MINE: {
		name: "我的租赁协议",
		value: "PROTOCOL_SPACE_MINE",
		style: "info"
	},
	FINANCE_PAY_INFO_MANAGE: {
		name: "付款信息单",
		value: "FINANCE_PAY_INFO_MANAGE",
		style: "info"
	},
	FINANCE_PAY_INFO_MINE: {
		name: "我的付款信息单",
		value: "FINANCE_PAY_INFO_MINE",
		style: "info"
	},
	FINANCE_PAY_INFO_REMINDER_MANAGE: {
		name: "催款通知",
		value: "FINANCE_PAY_INFO_REMINDER_MANAGE",
		style: "info"
	},
	FINANCE_BILL_VIEW: {
		name: "查看收款录入，查看对账单",
		value: "FINANCE_BILL_VIEW",
		style: "info"
	},
	FINANCE_BILL_OPERATE: {
		name: "操作收账款录入",
		value: "FINANCE_BILL_OPERATE",
		style: "info"
	},
	USER_MINE: {
		name: "用户个人信息",
		value: "USER_MINE",
		style: "info"
	},
	USER_MANAGE: {
		name: "用户管理",
		value: "USER_MANAGE",
		style: "info"
	},
	USER_SELECTION: {
		name: "用户选择",
		value: "USER_SELECTION",
		style: "info"
	},
	USER_ROLE_MANAGE: {
		name: "角色管理",
		value: "USER_ROLE_MANAGE",
		style: "info"
	},
	MESSAGE_MINE: {
		name: "个人消息",
		value: "MESSAGE_MINE",
		style: "info"
	},
	MESSAGE_MANAGE: {
		name: "消息管理",
		value: "MESSAGE_MANAGE",
		style: "info"
	},
	PREFERENCE_MANAGE: {
		name: "系统设置",
		value: "PREFERENCE_MANAGE",
		style: "info"
	},
	SURVEY_MANAGE: {
		name: "表单管理",
		value: "SURVEY_MANAGE",
		style: "info"
	},
	RECEPTION_MANAGE: {
		name: "活动与接待管理",
		value: "RECEPTION_MANAGE",
		style: "info"
	},
	RECEPTION_MINE: {
		name: "活动与接待查看",
		value: "RECEPTION_MINE",
		style: "info"
	},
	SUMMARY_INTERNS: {
		name: "汇总统计",
		value: "SUMMARY_INTERNS",
		style: "info"
	},
	SPACE_INVESTMENT_MANAGE: {
		name: "空间招商管理",
		value: "SPACE_INVESTMENT_MANAGE",
		style: "info"
	},
	SPACE_INVESTMENT_MINE: {
		name: "空间招商",
		value: "SPACE_INVESTMENT_MINE",
		style: "info"
	},
	SPACE_TEAMWORK_MANAGE: {
		name: "协同工作任务管理",
		value: "SPACE_TEAMWORK_MANAGE",
		style: "info"
	},
	SPACE_TEAMWORK_MINE: {
		name: "协同工作任务",
		value: "SPACE_TEAMWORK_MINE",
		style: "info"
	},
	INVESTMENT_MANAGE: {
		name: "投融资管理",
		value: "INVESTMENT_MANAGE",
		style: "info"
	},
	INVESTMENT_QUERY: {
		name: "投融资查看和评论",
		value: "INVESTMENT_QUERY",
		style: "info"
	},
	INVESTMENT_MINE: {
		name: "投融资",
		value: "INVESTMENT_MINE",
		style: "info"
	},
	BASICS_SPACE_ENTRANCE: {
		name: "基础进门(会议室200209202)",
		value: "BASICS_SPACE_ENTRANCE",
		style: "info"
	},
	I_SPACE_ENTRANCE: {
		name: "高级进门权限(所有门)",
		value: "I_SPACE_ENTRANCE",
		style: "info"
	},
	I_SPACE_MANAGE: {
		name: "智慧空间管理",
		value: "I_SPACE_MANAGE",
		style: "info"
	},
	OTHER: {
		name: "其他",
		value: "OTHER",
		style: "info"
	}

}


let FeatureTypeList = [];
for (let key in FeatureTypeMap) {
	if (FeatureTypeMap.hasOwnProperty(key)) {
		FeatureTypeList.push(FeatureTypeMap[key]);
	}
}

let ModuleFeatureMap = {};
ModuleFeatureMap[ModuleType.PUBLIC] = [
	FeatureType.PUBLIC
];

ModuleFeatureMap[ModuleType.OFFICIAL] = [
	FeatureType.OFFICIAL_MANAGE
];

ModuleFeatureMap[ModuleType.ENTRY_APPLY] = [
	FeatureType.ENTRY_APPLY_MINE,
	FeatureType.ENTRY_APPLY_MANAGE,
	FeatureType.ENTRY_APPLY_DISTRIBUTION
];

ModuleFeatureMap[ModuleType.STARTUP_PROJECT] = [
	FeatureType.PROJECT_MINE,
	FeatureType.PROJECT_MANAGE
];

ModuleFeatureMap[ModuleType.KEEPER_BUSINESS] = [
	FeatureType.KEEPER_BUSINESS_MINE,
	FeatureType.KEEPER_BUSINESS_MANAGE
];

ModuleFeatureMap[ModuleType.ENTREPRENEUR_SERVICES] = [
	FeatureType.MAKER_SIMPLE_APPLY_MINE,
	FeatureType.MAKER_SIMPLE_APPLY_MANAGE
];

ModuleFeatureMap[ModuleType.INVESTMENT] = [
	FeatureType.INVESTMENT_MANAGE,
	FeatureType.INVESTMENT_QUERY,
	FeatureType.INVESTMENT_MINE
];

ModuleFeatureMap[ModuleType.SPACE] = [
	FeatureType.SPACE_APPLY_MINE,
	FeatureType.SPACE_APPLY_MANAGE,
	FeatureType.CONFERENCE_ROOM_MANAGE
];

ModuleFeatureMap[ModuleType.PROTOCOL] = [
	FeatureType.PROTOCOL_INCUBATOR_MANAGE,
	FeatureType.PROTOCOL_INCUBATOR_MINE,
	FeatureType.PROTOCOL_SPACE_MANAGE,
	FeatureType.PROTOCOL_SPACE_MINE
];

ModuleFeatureMap[ModuleType.FINANCE] = [
	FeatureType.FINANCE_PAY_INFO_MANAGE,
	FeatureType.FINANCE_PAY_INFO_MINE,
	FeatureType.FINANCE_PAY_INFO_REMINDER_MANAGE,
	FeatureType.FINANCE_BILL_VIEW,
	FeatureType.FINANCE_BILL_OPERATE
];

ModuleFeatureMap[ModuleType.USER] = [
	FeatureType.USER_MINE,
	FeatureType.USER_MANAGE,
	FeatureType.USER_SELECTION,
	FeatureType.USER_ROLE_MANAGE
];

ModuleFeatureMap[ModuleType.MESSAGE] = [
	FeatureType.MESSAGE_MINE,
	FeatureType.MESSAGE_MANAGE
];

ModuleFeatureMap[ModuleType.SYSTEM] = [
	FeatureType.PREFERENCE_MANAGE
];

ModuleFeatureMap[ModuleType.SURVEY] = [
	FeatureType.SURVEY_MANAGE,
	FeatureType.RECEPTION_MANAGE,
	FeatureType.RECEPTION_MINE,
	FeatureType.SPACE_INVESTMENT_MANAGE,
	FeatureType.SPACE_INVESTMENT_MINE,
	FeatureType.SPACE_TEAMWORK_MANAGE,
	FeatureType.SPACE_TEAMWORK_MINE
];

ModuleFeatureMap[ModuleType.SUMMARY] = [
	FeatureType.SUMMARY_INTERNS
];

ModuleFeatureMap[ModuleType.I_SPACE] = [
	FeatureType.BASICS_SPACE_ENTRANCE,
	FeatureType.I_SPACE_ENTRANCE,
	FeatureType.I_SPACE_MANAGE
];

ModuleFeatureMap[ModuleType.OTHER] = [
	FeatureType.OTHER
];


export {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap};