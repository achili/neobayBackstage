let Status = {
	NEW: "NEW",
	PROCESSING: "PROCESSING",
	EXCEPTION: "EXCEPTION",
	EXPIRE: "EXPIRE"
}

let StatusMap = {
	NEW: {
		name: "等待上传附件",
		value: "NEW",
		style: "warning",
		icon: "hourglass-half"
	},
	PROCESSING: {
		name: "合同履约中",
		value: "PROCESSING",
		style: "success",
		icon: "star-half-o"
	},
	EXCEPTION: {
		name: "合同中止",
		value: "EXCEPTION",
		style: "danger",
		icon: "ban"
	},
  SOON: {
    name: "即将到期",
    value: "SOON",
    style: "warning",
    icon: "fa-hourglass-half"
  },
	EXPIRE: {
		name: "合同到期",
		value: "EXPIRE",
		style: "danger",
		icon: "close"
	}
}


let StatusList = [];
for (let key in StatusMap) {
	if (StatusMap.hasOwnProperty(key)) {
		StatusList.push(StatusMap[key]);
	}
}

export {Status, StatusMap, StatusList};
