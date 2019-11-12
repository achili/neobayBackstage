let Action = {

	ENTRY_APPLY_CREATE:"ENTRY_APPLY_CREATE",
	ENTRY_APPLY_EDIT:"ENTRY_APPLY_EDIT",
	ENTRY_APPLY_NEW:"ENTRY_APPLY_NEW",
	ENTRY_APPLY_REVIEWING:"ENTRY_APPLY_REVIEWING",
	ENTRY_APPLY_FIRST_REVIEW_PASS:"ENTRY_APPLY_FIRST_REVIEW_PASS",
	ENTRY_APPLY_FIRST_REVIEW_REJECT:"ENTRY_APPLY_FIRST_REVIEW_REJECT",
	ENTRY_APPLY_FINAL_REVIEW_PASS:"ENTRY_APPLY_FINAL_REVIEW_PASS",
	ENTRY_APPLY_FINAL_REVIEW_REJECT:"ENTRY_APPLY_FINAL_REVIEW_REJECT",
	ENTRY_APPLY_ARCHIVE:"ENTRY_APPLY_ARCHIVE",
	ENTRY_APPLY_UNARCHIVE:"ENTRY_APPLY_UNARCHIVE",
	ENTRY_APPLY_DISTRIBUTION:"ENTRY_APPLY_DISTRIBUTION",
	PROJECT_CREATE:"PROJECT_CREATE",
	PROJECT_EDIT:"PROJECT_EDIT",
	PROJECT_INVITATION:"PROJECT_INVITATION",
	PROJECT_PLUS:"PROJECT_PLUS",
	PROJECT_ATTACHMENTS:"PROJECT_ATTACHMENTS",
	PROJECT_INCUBATING:"PROJECT_INCUBATING",
	PROJECT_QUIT:"PROJECT_QUIT",
	PROJECT_GRADUATION:"PROJECT_GRADUATION",
	PROJECT_ARCHIVE:"PROJECT_ARCHIVE",
	PROJECT_UNARCHIVE:"PROJECT_UNARCHIVE",
	PROJECT_ASSIGN_MENTOR:"PROJECT_ASSIGN_MENTOR",
	PROJECT_ASSIGN_CREATOR:"PROJECT_ASSIGN_CREATOR",
	COMPANY_CREATE:"COMPANY_CREATE",
	COMPANY_EDIT:"COMPANY_EDIT",
	KEEPER_BUSINESS_CREATE:"KEEPER_BUSINESS_CREATE",
	KEEPER_BUSINESS_EDIT:"KEEPER_BUSINESS_EDIT",
	KEEPER_BUSINESS_NEW:"KEEPER_BUSINESS_NEW",
	KEEPER_BUSINESS_PASS:"KEEPER_BUSINESS_PASS",
	KEEPER_BUSINESS_CHARGE_PASS:"KEEPER_BUSINESS_CHARGE_PASS",
	KEEPER_BUSINESS_STATUS_PASS:"KEEPER_BUSINESS_STATUS_PASS",
	KEEPER_BUSINESS_REJECT:"KEEPER_BUSINESS_REJECT",
	KEEPER_BUSINESS_ARCHIVE:"KEEPER_BUSINESS_ARCHIVE",
	KEEPER_BUSINESS_UNARCHIVE:"KEEPER_BUSINESS_UNARCHIVE",
	KEEPER_BUSINESS_ORGANIZATION_FINISH:"KEEPER_BUSINESS_ORGANIZATION_FINISH",
	SPACE_APPLY_CREATE:"SPACE_APPLY_CREATE",
	SPACE_APPLY_EDIT:"SPACE_APPLY_EDIT",
	SPACE_APPLY_NEW:"SPACE_APPLY_NEW",
	SPACE_APPLY_REVIEWING:"SPACE_APPLY_REVIEWING",
	SPACE_APPLY_PASS:"SPACE_APPLY_PASS",
	SPACE_APPLY_REJECT:"SPACE_APPLY_REJECT",
	SPACE_APPLY_ARCHIVE:"SPACE_APPLY_ARCHIVE",
	SPACE_APPLY_UNARCHIVE:"SPACE_APPLY_UNARCHIVE",
	PROTOCOL_INCUBATOR_CREATE:"PROTOCOL_INCUBATOR_CREATE",
	PROTOCOL_INCUBATOR_EDIT:"PROTOCOL_INCUBATOR_EDIT",
	PROTOCOL_INCUBATOR_NEW:"PROTOCOL_INCUBATOR_NEW",
	PROTOCOL_INCUBATOR_ATTACHMENTS:"PROTOCOL_INCUBATOR_ATTACHMENTS",
	PROTOCOL_INCUBATOR_PROCESSING:"PROTOCOL_INCUBATOR_PROCESSING",
	PROTOCOL_INCUBATOR_EXCEPTION:"PROTOCOL_INCUBATOR_EXCEPTION",
	PROTOCOL_INCUBATOR_SOON:"PROTOCOL_INCUBATOR_SOON",
	PROTOCOL_INCUBATOR_EXPIRE:"PROTOCOL_INCUBATOR_EXPIRE",
	PROTOCOL_INCUBATOR_ARCHIVE:"PROTOCOL_INCUBATOR_ARCHIVE",
	PROTOCOL_INCUBATOR_UNARCHIVE:"PROTOCOL_INCUBATOR_UNARCHIVE",
	PROTOCOL_SPACE_CREATE:"PROTOCOL_SPACE_CREATE",
	PROTOCOL_SPACE_EDIT:"PROTOCOL_SPACE_EDIT",
	PROTOCOL_SPACE_NEW:"PROTOCOL_SPACE_NEW",
	PROTOCOL_SPACE_ATTACHMENTS:"PROTOCOL_SPACE_ATTACHMENTS",
	PROTOCOL_SPACE_PROCESSING:"PROTOCOL_SPACE_PROCESSING",
	PROTOCOL_SPACE_EXCEPTION:"PROTOCOL_SPACE_EXCEPTION",
	PROTOCOL_SPACE_SOON:"PROTOCOL_SPACE_SOON",
	PROTOCOL_SPACE_EXPIRE:"PROTOCOL_SPACE_EXPIRE",
	PROTOCOL_SPACE_ARCHIVE:"PROTOCOL_SPACE_ARCHIVE",
	PROTOCOL_SPACE_UNARCHIVE:"PROTOCOL_SPACE_UNARCHIVE",
	FINANCE_PAY_INFO_CREATE:"FINANCE_PAY_INFO_CREATE",
	FINANCE_PAY_INFO_EDIT:"FINANCE_PAY_INFO_EDIT",
	FINANCE_PAY_INFO_NOTIFY:"FINANCE_PAY_INFO_NOTIFY",
	FINANCE_PAY_INFO_REMINDER:"FINANCE_PAY_INFO_REMINDER",
	FINANCE_PAY_INFO_INVOICE:"FINANCE_PAY_INFO_INVOICE",
	FINANCE_ELECTRIC_PAY_INFO_INVOICE:"FINANCE_ELECTRIC_PAY_INFO_INVOICE",
	FINANCE_PAY_INFO_PAYING:"FINANCE_PAY_INFO_PAYING",
	FINANCE_PAY_INFO_FINISH:"FINANCE_PAY_INFO_FINISH",
	FINANCE_PAY_INFO_ARCHIVE:"FINANCE_PAY_INFO_ARCHIVE",
	FINANCE_PAY_INFO_UNARCHIVE:"FINANCE_PAY_INFO_UNARCHIVE",
	FEEDBACK_CREATE:"FEEDBACK_CREATE",
	FEEDBACK_EDIT:"FEEDBACK_EDIT",
	FEEDBACK_NEW:"FEEDBACK_NEW",
	FEEDBACK_FINISH:"FEEDBACK_FINISH",
	FEEDBACK_ARCHIVE:"FEEDBACK_ARCHIVE",
	FEEDBACK_UNARCHIVE:"FEEDBACK_UNARCHIVE",
	MAKER_ORGANIZATION_FINISH:"MAKER_ORGANIZATION_FINISH",
	MAKER_CARD_FINISH:"MAKER_CARD_FINISH",
	MAKER_APARTMENT_FINISH:"MAKER_APARTMENT_FINISH",
	MAKER_PARK_FINISH:"MAKER_PARK_FINISH",
	MAKER_SIMPLE_APPLY_COMMENT:"MAKER_SIMPLE_APPLY_COMMENT",
	MAKER_SIMPLE_APPLY_CREATE:"MAKER_SIMPLE_APPLY_CREATE",
	MAKER_SIMPLE_APPLY_EDIT:"MAKER_SIMPLE_APPLY_EDIT",
	MAKER_SIMPLE_APPLY_REFUSE:"MAKER_SIMPLE_APPLY_REFUSE",
	MAKER_SIMPLE_APPLY_PASS:"MAKER_SIMPLE_APPLY_PASS",
	MAKER_SIMPLE_APPLY_CHARGE_PASS:"MAKER_SIMPLE_APPLY_CHARGE_PASS",
	INVESTMENT_CREATE:"INVESTMENT_CREATE",
	INVESTMENT_EDIT:"INVESTMENT_EDIT",
	INVESTMENT_NEW:"INVESTMENT_NEW",
	INVESTMENT_ATTACHMENTS:"INVESTMENT_ATTACHMENTS",
	INVESTMENT_APPLY:"INVESTMENT_APPLY",
	INVESTMENT_ALREADY_BUTTED:"INVESTMENT_ALREADY_BUTTED",
	INVESTMENT_REACH_FINANCING_INTENTION:"INVESTMENT_REACH_FINANCING_INTENTION",
	INVESTMENT_ALREADY_FINANCING:"INVESTMENT_ALREADY_FINANCING",
	MESSAGE_ANNOUNCEMENT_CREATE:"MESSAGE_ANNOUNCEMENT_CREATE",
	MESSAGE_ANNOUNCEMENT_FINISH:"MESSAGE_ANNOUNCEMENT_FINISH"

}

let ActionMap = {

	ENTRY_APPLY_CREATE: {
		name: "创建",
		value: "ENTRY_APPLY_CREATE",
		style: "info",
		icon: "magic"
	},
	ENTRY_APPLY_EDIT: {
		name: "修改",
		value: "ENTRY_APPLY_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	ENTRY_APPLY_NEW: {
		name: "新建",
		value: "ENTRY_APPLY_NEW",
		style: "info",
		icon: "star-o"
	},
	ENTRY_APPLY_REVIEWING: {
		name: "正在审核中",
		value: "ENTRY_APPLY_REVIEWING",
		style: "warning",
		icon: "eye"
	},
	ENTRY_APPLY_FIRST_REVIEW_PASS: {
		name: "初审通过",
		value: "ENTRY_APPLY_FIRST_REVIEW_PASS",
		style: "primary",
		icon: "check-square-o"
	},
	ENTRY_APPLY_FIRST_REVIEW_REJECT: {
		name: "初审未通过",
		value: "ENTRY_APPLY_FIRST_REVIEW_REJECT",
		style: "danger",
		icon: "ban"
	},
	ENTRY_APPLY_FINAL_REVIEW_PASS: {
		name: "终审通过",
		value: "ENTRY_APPLY_FINAL_REVIEW_PASS",
		style: "primary",
		icon: "check"
	},
	ENTRY_APPLY_FINAL_REVIEW_REJECT: {
		name: "终审拒绝",
		value: "ENTRY_APPLY_FINAL_REVIEW_REJECT",
		style: "danger",
		icon: "ban"
	},
	ENTRY_APPLY_ARCHIVE: {
		name: "归档",
		value: "ENTRY_APPLY_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	ENTRY_APPLY_UNARCHIVE: {
		name: "解封",
		value: "ENTRY_APPLY_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	ENTRY_APPLY_DISTRIBUTION: {
		name: "预分配项目经理",
		value: "ENTRY_APPLY_DISTRIBUTION",
		style: "info",
		icon: "user-plus"
	},
	PROJECT_CREATE: {
		name: "创建",
		value: "PROJECT_CREATE",
		style: "info",
		icon: "magic"
	},
	PROJECT_EDIT: {
		name: "修改",
		value: "PROJECT_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	PROJECT_INVITATION: {
		name: "邀请",
		value: "PROJECT_INVITATION",
		style: "info",
		icon: "user-plus"
	},
	PROJECT_PLUS: {
		name: "加入",
		value: "PROJECT_PLUS",
		style: "success",
		icon: "user-plus"
	},
	PROJECT_ATTACHMENTS: {
		name: "修改附件",
		value: "PROJECT_ATTACHMENTS",
		style: "info",
		icon: "upload"
	},
	PROJECT_INCUBATING: {
		name: "孵化中",
		value: "PROJECT_INCUBATING",
		style: "info",
		icon: "sun-o"
	},
	PROJECT_QUIT: {
		name: "已退出",
		value: "PROJECT_QUIT",
		style: "danger",
		icon: "close"
	},
	PROJECT_GRADUATION: {
		name: "已毕业",
		value: "PROJECT_GRADUATION",
		style: "primary",
		icon: "graduation-cap"
	},
	PROJECT_ARCHIVE: {
		name: "归档",
		value: "PROJECT_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	PROJECT_UNARCHIVE: {
		name: "解封",
		value: "PROJECT_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	PROJECT_ASSIGN_MENTOR: {
		name: "指派社区经理",
		value: "PROJECT_ASSIGN_MENTOR",
		style: "primary",
		icon: "user-plus"
	},
	PROJECT_ASSIGN_CREATOR: {
		name: "指派项目创建者",
		value: "PROJECT_ASSIGN_CREATOR",
		style: "success",
		icon: "user-plus"
	},
	COMPANY_CREATE: {
		name: "创建",
		value: "COMPANY_CREATE",
		style: "info",
		icon: "magic"
	},
	COMPANY_EDIT: {
		name: "修改",
		value: "COMPANY_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	KEEPER_BUSINESS_CREATE: {
		name: "创建",
		value: "KEEPER_BUSINESS_CREATE",
		style: "info",
		icon: "magic"
	},
	KEEPER_BUSINESS_EDIT: {
		name: "修改",
		value: "KEEPER_BUSINESS_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	KEEPER_BUSINESS_NEW: {
		name: "新建",
		value: "KEEPER_BUSINESS_NEW",
		style: "info",
		icon: "magic"
	},
	KEEPER_BUSINESS_PASS: {
		name: "客户通知",
		value: "KEEPER_BUSINESS_PASS",
		style: "primary",
		icon: "check"
	},
	KEEPER_BUSINESS_CHARGE_PASS: {
		name: "机构负责人通知",
		value: "KEEPER_BUSINESS_CHARGE_PASS",
		style: "primary",
		icon: "check"
	},
	KEEPER_BUSINESS_STATUS_PASS: {
		name: "通过",
		value: "KEEPER_BUSINESS_STATUS_PASS",
		style: "danger",
		icon: "close"
	},
	KEEPER_BUSINESS_REJECT: {
		name: "不通过",
		value: "KEEPER_BUSINESS_REJECT",
		style: "danger",
		icon: "ban"
	},
	KEEPER_BUSINESS_ARCHIVE: {
		name: "归档",
		value: "KEEPER_BUSINESS_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	KEEPER_BUSINESS_UNARCHIVE: {
		name: "解封",
		value: "KEEPER_BUSINESS_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	KEEPER_BUSINESS_ORGANIZATION_FINISH: {
		name: "服务机构审核通过",
		value: "KEEPER_BUSINESS_ORGANIZATION_FINISH",
		style: "success",
		icon: "pencil-square-o"
	},
	SPACE_APPLY_CREATE: {
		name: "创建",
		value: "SPACE_APPLY_CREATE",
		style: "info",
		icon: "magic"
	},
	SPACE_APPLY_EDIT: {
		name: "修改",
		value: "SPACE_APPLY_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	SPACE_APPLY_NEW: {
		name: "新建",
		value: "SPACE_APPLY_NEW",
		style: "info",
		icon: "magic"
	},
	SPACE_APPLY_REVIEWING: {
		name: "正在审核",
		value: "SPACE_APPLY_REVIEWING",
		style: "info",
		icon: "magic"
	},
	SPACE_APPLY_PASS: {
		name: "通过",
		value: "SPACE_APPLY_PASS",
		style: "primary",
		icon: "check"
	},
	SPACE_APPLY_REJECT: {
		name: "被驳回",
		value: "SPACE_APPLY_REJECT",
		style: "danger",
		icon: "ban"
	},
	SPACE_APPLY_ARCHIVE: {
		name: "归档",
		value: "SPACE_APPLY_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	SPACE_APPLY_UNARCHIVE: {
		name: "解封",
		value: "SPACE_APPLY_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	PROTOCOL_INCUBATOR_CREATE: {
		name: "创建",
		value: "PROTOCOL_INCUBATOR_CREATE",
		style: "info",
		icon: "magic"
	},
	PROTOCOL_INCUBATOR_EDIT: {
		name: "修改",
		value: "PROTOCOL_INCUBATOR_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	PROTOCOL_INCUBATOR_NEW: {
		name: "新建",
		value: "PROTOCOL_INCUBATOR_NEW",
		style: "info",
		icon: "magic"
	},
	PROTOCOL_INCUBATOR_ATTACHMENTS: {
		name: "修改附件",
		value: "PROTOCOL_INCUBATOR_ATTACHMENTS",
		style: "info",
		icon: "upload"
	},
	PROTOCOL_INCUBATOR_PROCESSING: {
		name: "正在履约中",
		value: "PROTOCOL_INCUBATOR_PROCESSING",
		style: "warning",
		icon: "hourglass-half"
	},
	PROTOCOL_INCUBATOR_EXCEPTION: {
		name: "终止",
		value: "PROTOCOL_INCUBATOR_EXCEPTION",
		style: "danger",
		icon: "close"
	},
	PROTOCOL_INCUBATOR_SOON: {
		name: "即将到期",
		value: "PROTOCOL_INCUBATOR_SOON",
		style: "danger",
		icon: "hourglass-half"
	},
	PROTOCOL_INCUBATOR_EXPIRE: {
		name: "到期",
		value: "PROTOCOL_INCUBATOR_EXPIRE",
		style: "danger",
		icon: "hourglass-o"
	},
	PROTOCOL_INCUBATOR_ARCHIVE: {
		name: "归档",
		value: "PROTOCOL_INCUBATOR_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	PROTOCOL_INCUBATOR_UNARCHIVE: {
		name: "解封",
		value: "PROTOCOL_INCUBATOR_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	PROTOCOL_SPACE_CREATE: {
		name: "创建",
		value: "PROTOCOL_SPACE_CREATE",
		style: "info",
		icon: "magic"
	},
	PROTOCOL_SPACE_EDIT: {
		name: "修改",
		value: "PROTOCOL_SPACE_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	PROTOCOL_SPACE_NEW: {
		name: "新建",
		value: "PROTOCOL_SPACE_NEW",
		style: "info",
		icon: "magic"
	},
	PROTOCOL_SPACE_ATTACHMENTS: {
		name: "修改附件",
		value: "PROTOCOL_SPACE_ATTACHMENTS",
		style: "info",
		icon: "upload"
	},
	PROTOCOL_SPACE_PROCESSING: {
		name: "正在履约中",
		value: "PROTOCOL_SPACE_PROCESSING",
		style: "warning",
		icon: "hourglass-half"
	},
	PROTOCOL_SPACE_EXCEPTION: {
		name: "终止",
		value: "PROTOCOL_SPACE_EXCEPTION",
		style: "info",
		icon: "close"
	},
	PROTOCOL_SPACE_SOON: {
		name: "即将到期",
		value: "PROTOCOL_SPACE_SOON",
		style: "danger",
		icon: "hourglass-half"
	},
	PROTOCOL_SPACE_EXPIRE: {
		name: "到期",
		value: "PROTOCOL_SPACE_EXPIRE",
		style: "danger",
		icon: "hourglass-o"
	},
	PROTOCOL_SPACE_ARCHIVE: {
		name: "归档",
		value: "PROTOCOL_SPACE_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	PROTOCOL_SPACE_UNARCHIVE: {
		name: "解封",
		value: "PROTOCOL_SPACE_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	FINANCE_PAY_INFO_CREATE: {
		name: "创建",
		value: "FINANCE_PAY_INFO_CREATE",
		style: "info",
		icon: "magic"
	},
	FINANCE_PAY_INFO_EDIT: {
		name: "修改",
		value: "FINANCE_PAY_INFO_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	FINANCE_PAY_INFO_NOTIFY: {
		name: "付款通知",
		value: "FINANCE_PAY_INFO_NOTIFY",
		style: "warning",
		icon: "bell"
	},
	FINANCE_PAY_INFO_REMINDER: {
		name: "催款",
		value: "FINANCE_PAY_INFO_REMINDER",
		style: "danger",
		icon: "bullhorn"
	},
	FINANCE_PAY_INFO_INVOICE: {
		name: "票据领取",
		value: "FINANCE_PAY_INFO_INVOICE",
		style: "success",
		icon: "magic"
	},
	FINANCE_ELECTRIC_PAY_INFO_INVOICE: {
		name: "电费发票领取",
		value: "FINANCE_ELECTRIC_PAY_INFO_INVOICE",
		style: "success",
		icon: "magic"
	},
	FINANCE_PAY_INFO_PAYING: {
		name: "付款中",
		value: "FINANCE_PAY_INFO_PAYING",
		style: "info",
		icon: "cny"
	},
	FINANCE_PAY_INFO_FINISH: {
		name: "完成",
		value: "FINANCE_PAY_INFO_FINISH",
		style: "primary",
		icon: "check"
	},
	FINANCE_PAY_INFO_ARCHIVE: {
		name: "归档",
		value: "FINANCE_PAY_INFO_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	FINANCE_PAY_INFO_UNARCHIVE: {
		name: "解封",
		value: "FINANCE_PAY_INFO_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	FEEDBACK_CREATE: {
		name: "创建",
		value: "FEEDBACK_CREATE",
		style: "info",
		icon: "magic"
	},
	FEEDBACK_EDIT: {
		name: "修改",
		value: "FEEDBACK_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	FEEDBACK_NEW: {
		name: "正在审核中",
		value: "FEEDBACK_NEW",
		style: "warning",
		icon: "eye"
	},
	FEEDBACK_FINISH: {
		name: "完成",
		value: "FEEDBACK_FINISH",
		style: "info",
		icon: "check"
	},
	FEEDBACK_ARCHIVE: {
		name: "归档",
		value: "FEEDBACK_ARCHIVE",
		style: "warning",
		icon: "lock"
	},
	FEEDBACK_UNARCHIVE: {
		name: "解封",
		value: "FEEDBACK_UNARCHIVE",
		style: "primary",
		icon: "unlock"
	},
	MAKER_ORGANIZATION_FINISH: {
		name: "服务机构审核通过",
		value: "MAKER_ORGANIZATION_FINISH",
		style: "success",
		icon: "pencil-square-o"
	},
	MAKER_CARD_FINISH: {
		name: "一卡通审核通过",
		value: "MAKER_CARD_FINISH",
		style: "success",
		icon: "pencil-square-o"
	},
	MAKER_APARTMENT_FINISH: {
		name: "人才公寓审核通过",
		value: "MAKER_APARTMENT_FINISH",
		style: "success",
		icon: "pencil-square-o"
	},
	MAKER_PARK_FINISH: {
		name: "其他服务审核通过",
		value: "MAKER_PARK_FINISH",
		style: "success",
		icon: "pencil-square-o"
	},
	MAKER_SIMPLE_APPLY_COMMENT: {
		name: "评价",
		value: "MAKER_SIMPLE_APPLY_COMMENT",
		style: "success",
		icon: "star"
	},
	MAKER_SIMPLE_APPLY_CREATE: {
		name: "创建",
		value: "MAKER_SIMPLE_APPLY_CREATE",
		style: "info",
		icon: "magic"
	},
	MAKER_SIMPLE_APPLY_EDIT: {
		name: "修改",
		value: "MAKER_SIMPLE_APPLY_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	MAKER_SIMPLE_APPLY_REFUSE: {
		name: "拒绝申请",
		value: "MAKER_SIMPLE_APPLY_REFUSE",
		style: "danger",
		icon: "pencil-square-o"
	},
	MAKER_SIMPLE_APPLY_PASS: {
		name: "客户通知",
		value: "MAKER_SIMPLE_APPLY_PASS",
		style: "primary",
		icon: "check"
	},
	MAKER_SIMPLE_APPLY_CHARGE_PASS: {
		name: "机构负责人通知",
		value: "MAKER_SIMPLE_APPLY_CHARGE_PASS",
		style: "primary",
		icon: "check"
	},
	INVESTMENT_CREATE: {
		name: "创建",
		value: "INVESTMENT_CREATE",
		style: "info",
		icon: "magic"
	},
	INVESTMENT_EDIT: {
		name: "修改",
		value: "INVESTMENT_EDIT",
		style: "success",
		icon: "pencil-square-o"
	},
	INVESTMENT_NEW: {
		name: "新建",
		value: "INVESTMENT_NEW",
		style: "success",
		icon: "magic"
	},
	INVESTMENT_ATTACHMENTS: {
		name: "修改附件",
		value: "INVESTMENT_ATTACHMENTS",
		style: "info",
		icon: "upload"
	},
	INVESTMENT_APPLY: {
		name: "已申请",
		value: "INVESTMENT_APPLY",
		style: "warning",
		icon: "pencil-square-o"
	},
	INVESTMENT_ALREADY_BUTTED: {
		name: "已对接",
		value: "INVESTMENT_ALREADY_BUTTED",
		style: "info",
		icon: "american-sign-language-interpreting"
	},
	INVESTMENT_REACH_FINANCING_INTENTION: {
		name: "达成融资意向",
		value: "INVESTMENT_REACH_FINANCING_INTENTION",
		style: "primary",
		icon: "sign-language"
	},
	INVESTMENT_ALREADY_FINANCING: {
		name: "已融资",
		value: "INVESTMENT_ALREADY_FINANCING",
		style: "danger",
		icon: "hand-peace-o"
	},
	MESSAGE_ANNOUNCEMENT_CREATE: {
		name: "发送公告",
		value: "MESSAGE_ANNOUNCEMENT_CREATE",
		style: "info",
		icon: "check"
	},
	MESSAGE_ANNOUNCEMENT_FINISH: {
		name: "发送公告完成",
		value: "MESSAGE_ANNOUNCEMENT_FINISH",
		style: "info",
		icon: "check"
	}

}


let ActionList = [];
for (let key in ActionMap) {
	if (ActionMap.hasOwnProperty(key)) {
		ActionList.push(ActionMap[key]);
	}
}

export {Action, ActionMap, ActionList};