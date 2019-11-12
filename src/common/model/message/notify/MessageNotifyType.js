let MessageNotifyType = {
	//提醒
	REMIND: "REMIND",
	//公告
	ANNOUNCE: "ANNOUNCE",
	//私信
	LETTER: "LETTER"
}

let MessageNotifyTypeMap = {
	REMIND: {
		name: "提醒",
		value: "REMIND",
		style: "info"
	},
	ANNOUNCE: {
		name: "公告",
		value: "ANNOUNCE",
		style: "primary"
	},
	LETTER: {
		name: "私信",
		value: "LETTER",
		style: "danger"
	}
}

export {MessageNotifyType, MessageNotifyTypeMap};