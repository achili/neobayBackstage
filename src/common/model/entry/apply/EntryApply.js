import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import Tank from "../../tank/Tank";
import EntryBatch from "../batch/EntryBatch";
import EntryApplyMember from "./EntryApplyMember";
import {validateEmail} from "../../../../common/filter/validate";
import Vue from "vue";
import User from "../../user/User";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../util/Utils";
import ProjectMentor from "../../project/ProjectMentor";
import SpaceRegional from "../../space/SpaceRegional";

let Status = {
	NEW: "NEW",
	REVIEWING: "REVIEWING",
	FIRST_REVIEW_PASS: "FIRST_REVIEW_PASS",
	FIRST_REVIEW_REJECT: "FIRST_REVIEW_REJECT",
	FINAL_REVIEW_PASS: "FINAL_REVIEW_PASS",
	FINAL_REVIEW_REJECT: "FINAL_REVIEW_REJECT"
};

let StatusMap = {
	NEW: {
		name: "等待审核",
		value: "NEW",
		style: "warning",
		icon: "star-o"
	},
	REVIEWING: {
		name: "正在审核中",
		value: "REVIEWING",
		style: "info",
		icon: "hourglass"
	},
	FIRST_REVIEW_PASS: {
		name: "初审通过",
		value: "FIRST_REVIEW_PASS",
		style: "info",
		icon: "flag-o"
	},
	FIRST_REVIEW_REJECT: {
		name: "初审未通过",
		value: "FIRST_REVIEW_REJECT",
		style: "danger",
		icon: "ban"
	},
	FINAL_REVIEW_PASS: {
		name: "终审通过",
		value: "FINAL_REVIEW_PASS",
		style: "success",
		icon: "flag"
	},
	FINAL_REVIEW_REJECT: {
		name: "终审未通过",
		value: "FINAL_REVIEW_REJECT",
		style: "danger",
		icon: "ban"
	}
}

export default function EntryApply() {

	BaseEntity.call(this, arguments);

	this.creator = new User();
	this.name = null;
	this.fieldDescription = null;
	this.field = null;
	this.memberNum = 0;

	this.entryApplyMembers = [];

	this.description = null;
	this.innovative = null;
	this.difficulty = null;
	this.expectedAchievement = null;

	this.feasibilityAnalysis = null;
	this.division = null;
	this.expectedSchedule = null;

	this.spaceRequirement = null;
	this.guideRequirement = null;
	this.investRequirement = null;
	this.policyRequirement = null;
	this.otherRequirement = null;

	this.resume = new Tank(".doc|.docx|.pdf", true, 50 * 1024 * 1024, "doc,docx,pdf");
	this.businessPlan = new Tank(".doc|.docx|.pdf|.ppt|.pptx", true, 50 * 1024 * 1024, "doc,docx,pdf,ppt,pptx");
	this.projectPPT = new Tank(".ppt|.pptx|.pdf", true, 50 * 1024 * 1024, "ppt,pptx,pdf");


	this.entryBatch = new EntryBatch();
	this.archive = false;
	this.status = Status.NEW;
	this.reason = null;
	this.type = null;

	//预置项目经理
  this.presetProjectMentor = new ProjectMentor();

	this.entryProjects = [];

	if (Vue.store.state.debug) {
		this.mockData();
	}
}

EntryApply.prototype = new BaseEntity();
EntryApply.prototype.constructor = EntryApply;

EntryApply.prototype.URL_REVIEWING = "/entry/apply/reviewing/{id}";
EntryApply.prototype.URL_STATUS = "/entry/apply/status";
EntryApply.prototype.URL_ARCHIVE = "/entry/apply/archive";
EntryApply.prototype.URL_DISTRIBUTION = "/entry/apply/preset/mentor";
EntryApply.prototype.URL_DOWNLOAD_PDF = "/entry/apply/download/pdf/{id}";

EntryApply.prototype.Status = Status;
EntryApply.prototype.StatusMap = StatusMap;
EntryApply.prototype.StatusList = EntryApply.prototype.getStatusList();

//测试数据。
EntryApply.prototype.mockData = function () {
	this.name = "零号湾创业无忧平台";
	this.fieldDescription = "零号湾创业无忧平台开发";
	this.field = "电子信息技术";
	this.type = null;

	this.memberNum = 5;

	this.entryApplyMembers = [];

	this.description = "这里是项目简介";
	this.innovative = "创新点";
	this.difficulty = "难点";
	this.expectedAchievement = "6个月内分阶段预期成果(每3月为一个阶段)";
	this.feasibilityAnalysis = "可行性分析";
	this.division = "团队分工及股权结构";
	this.expectedSchedule = "项目执行进度预计";


	this.spaceRequirement = "40平方米以下";
	this.guideRequirement = "创业指导";
	this.investRequirement = "投资需求";
	this.policyRequirement = "政策需求";
	this.otherRequirement = "其他服务需求";

	this.resume.mockDataDocxPrivacy();
	this.businessPlan.mockDataDocxPrivacy();
	this.projectPPT.mockDataPptxPrivacy();

	this.entryBatch = new EntryBatch();

	this.preStatus = Status.NEW;
	this.status = Status.NEW;
}

EntryApply.prototype.getFilters = function () {
	return [
    new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "项目名", "name"),
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "项目名", "orderName"),
		new Filter("SORT", "项目人数", "orderMemberNum"),
		new Filter("SORT", "申请时间", "orderCreateTime"),
		new Filter("CHECK", "已创建项目", "archive"),
    new Filter("INPUT", "中国矿业大学", "type", null, null, null, false),
    new Filter("SELECTION", "申请进度", "status", this.getStatusList(), null, false),
		new Filter("HTTP_SELECTION", "入驻批次", "entryBatchId", null, EntryBatch),
		new Filter("HTTP_SELECTION", "创建者", "userId", null, User, false),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};


//We use this method to get the full js Object
EntryApply.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("creator", User);
	this.renderList("entryApplyMembers", EntryApplyMember);
	this.renderEntity("resume", Tank);
	this.renderEntity("businessPlan", Tank);
	this.renderEntity("projectPPT", Tank);
	this.renderEntity("entryBatch", EntryBatch);

  this.renderEntity("presetProjectMentor", ProjectMentor);

}


/**
 * 1.在归档情况下，任何人都不能编辑。
 * 2.在非归档情况下，管理员在任何状态下都能编辑。普通用户只能在NEW和FIRST_REVIEW_REJECT这两种状态下编辑。
 */
EntryApply.prototype.canEdit = function () {

	if (this.archive) {
		return false;
	} else {

		if (Vue.store.state.user.hasPermissionSpace(Vue.store.state.FeatureType.ENTRY_APPLY_MANAGE,this.spaceRegional.id)) {
			return true;
		} else {
			if (this.status === Status.NEW || this.status === Status.FIRST_REVIEW_REJECT) {
				return true;
			} else {
				return false;
			}
		}


	}

}

/**
 * 任何状态均可尝试去删除，后台返回结果是否可以删除。
 */
//该实体目前是否能够删除
EntryApply.prototype.canDel = function () {

	return true;
}


EntryApply.prototype.getForm = function () {

	let entryApplyMembers = this.entryApplyMembers;
	let entryApplyMembersInfo = [];
	for (let i = 0; i < entryApplyMembers.length; i++) {
		let entryApplyMember = entryApplyMembers[i];
		entryApplyMembersInfo.push(entryApplyMember.getForm());
	}
	let form = {
    keyword: this.keyword,
    spaceRegional:this.spaceRegional.id,
		name: this.name,
    type: this.type,
		fieldDescription: this.fieldDescription,
		field: this.field,
		memberNum: this.memberNum,
		entryApplyMembersInfo: JSON.stringify(entryApplyMembersInfo),

		description: this.description,
		innovative: this.innovative,
		difficulty: this.difficulty,
		expectedAchievement: this.expectedAchievement,
		feasibilityAnalysis: this.feasibilityAnalysis,
		division: this.division,
		expectedSchedule: this.expectedSchedule,

		spaceRequirement: this.spaceRequirement,
		guideRequirement: this.guideRequirement,
		investRequirement: this.investRequirement,
		policyRequirement: this.policyRequirement,
		otherRequirement: this.otherRequirement,

		resumeCode: this.resume.code,
		businessPlanCode: this.businessPlan.code,
		projectPPTCode: this.projectPPT.code,
		status: this.status
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


EntryApply.prototype.validate = function () {
	if (!this.resume.code) {
		this.errorMessage = "请上传负责人或主创团队简历！";
		return false;
	}
	if (!this.businessPlan.code) {
		this.errorMessage = "请上传项目BP！";
		return false;
	}
	if (!this.projectPPT.code) {
		this.errorMessage = "请上传项目PPT！";
		return false;
	}

	return true;
}

EntryApply.prototype.stepValidation = function (active) {
	//分布填信息验证.
	if (active === 1) {
    if (!this.spaceRegional.id) {
      this.errorMessage = "园区地点必选！";
      return false;
    }
		if (!this.name) {
			this.errorMessage = "项目名称必填！";
			return false;
		}
		if (!this.fieldDescription) {
			this.errorMessage = "项目领域描述必填！";
			return false;
		}
		if (this.fieldDescription.length > 1024) {
			this.errorMessage = "项目领域描述字数超过限制！";
			return false;
		}
		if (!this.field) {
			this.errorMessage = "国家重点支持高新技术领域必填！";
			return false;
		}
		if (this.entryApplyMembers.length < 1) {
			this.errorMessage = "至少需要添加一名成员！";
			return false;
		}
		//团队成员信息验证.
		for (let i = 0; i < this.entryApplyMembers.length; i++) {
			let entryApplyMember = this.entryApplyMembers[i];
			if (!entryApplyMember.name) {
				this.errorMessage = "团队成员姓名必填！";
				return false;
			}

			if (!entryApplyMember.birthday) {
				this.errorMessage = "团队成员出生年月必填！";
				return false;
			}
			if (!entryApplyMember.school) {
				this.errorMessage = "团队成员毕业就读学校必填！";
				return false;
			}
			if (!entryApplyMember.major) {
				this.errorMessage = "团队成员专业必填！";
				return false;
			}
			if (!entryApplyMember.phone) {
				this.errorMessage = "团队成员手机必填！";
				return false;
			}
			if (!entryApplyMember.email) {
				this.errorMessage = "团队成员邮箱必填！";
				return false;
			}
			if (!validateEmail(entryApplyMember.email)) {
				this.errorMessage = "团队成员邮箱格式不正确！";
				return false;
			}
			if (!entryApplyMember.resume && !entryApplyMember.cvResume.code) {
				this.errorMessage = "团队成员简历或CV上传必填其一！";
				return false;
			}
			// if (entryApplyMember.resume && !entryApplyMember.resume.length > 1000) {
			// 	this.errorMessage = "团队成员简历字数超过限制！";
			// 	return false;
			// }
		}
	}
	//项目基本信息验证
	if (active === 2) {
		if (!this.description) {
			this.errorMessage = "项目简介必填！";
			return false;
		}
		if (this.description.length > 1000) {
			this.errorMessage = "项目简介指数超过限制！";
			return false;
		}
		if (!this.innovative) {
			this.errorMessage = "创新点必填！";
			return false;
		}
		if (this.innovative.length > 255) {
			this.errorMessage = "创新点字数超过限制！";
			return false;
		}
		if (!this.difficulty) {
			this.errorMessage = "难点必填！";
			return false;
		}
		if (this.difficulty.length > 255) {
			this.errorMessage = "难点字数超过限制！";
			return false;
		}
		if (!this.expectedAchievement) {
			this.errorMessage = "预期成果必填！";
			return false;
		}
		if (this.expectedAchievement.length > 1000) {
			this.errorMessage = "预期成果字数超过限制！";
			return false;
		}
		if (!this.feasibilityAnalysis) {
			this.errorMessage = "可行性分析必填！";
			return false;
		}
		if (this.feasibilityAnalysis.length > 1000) {
			this.errorMessage = "可行性分析字数超过限制！";
			return false;
		}
		if (!this.division) {
			this.errorMessage = "团队分工及股权结构必填！";
			return false;
		}
		if (this.division.length > 1000) {
			this.errorMessage = "团队分工及股权结构字数超过限制！";
			return false;
		}
		if (!this.expectedSchedule) {
			this.errorMessage = "项目执行进度预计必填！";
			return false;
		}
		if (this.expectedSchedule.length > 1000) {
			this.errorMessage = "团队执行进度预计字数超过限制！";
			return false;
		}
	}
	//孵化需求y验证
	if (active === 3) {
		if (!this.spaceRequirement) {
			this.errorMessage = "场地需求必填！";
			return false;
		}
		if (!this.guideRequirement) {
			this.errorMessage = "创业指导必填！";
			return false;
		}
		if (this.guideRequirement.length > 255) {
			this.errorMessage = "创业指导字数超过限制！";
			return false;
		}
		if (!this.investRequirement) {
			this.errorMessage = "投资需求必填！";
			return false;
		}
		if (this.investRequirement.length > 255) {
			this.errorMessage = "投资需求字数超过限制！";
			return false;
		}
		if (!this.policyRequirement) {
			this.errorMessage = "政策需求必填！";
			return false;
		}
		if (this.policyRequirement.length > 255) {
			this.errorMessage = "政策需求字数超过限制！";
			return false;
		}
		if (!this.otherRequirement) {
			this.errorMessage = "其他服务需求必填！";
			return false;
		}
		if (this.otherRequirement.length > 255) {
			this.errorMessage = "其他服务需求字数超过限制！";
			return false;
		}
	}
	this.errorMessage = null;
	return true;
}

//添加团队成员
EntryApply.prototype.addEntryApplyMember = function () {

	let entryApplyMember = new EntryApplyMember();
	this.entryApplyMembers.push(entryApplyMember);

}


EntryApply.prototype.isRefuse = function () {
	return this.status === Status.FINAL_REVIEW_REJECT || this.status === Status.FIRST_REVIEW_REJECT;
}

EntryApply.prototype.downloadPdfUrl = function () {
	return Vue.http.options.root + this.URL_DOWNLOAD_PDF.replace("{id}", this.id);
}


//删除团队成员
EntryApply.prototype.subEntryApplyMember = function (index) {
	if (index !== -1) {
		this.entryApplyMembers.splice(index, 1)
	}
}
//将信息从本地读取出来。
EntryApply.prototype.renderFromLocalStorage = function () {
	try {
		let String = readLocalStorage(this.getTAG());
		if (String) {
			let json = JSON.parse(String);
			this.render(json);
		}
	} catch (e) {
		removeLocalStorage(this.getTAG());
	}
}
//将用户信息存储在本地。
EntryApply.prototype.saveToLocalStorage = function () {

	//保存到本地的时候默认不显示任何错误了
	this.errorMessage = null;

	saveToLocalStorage(this.getTAG(), JSON.stringify(this));

}

//清除本地信息
EntryApply.prototype.clearLocalStorage = function () {
	removeLocalStorage(this.getTAG());
}


//开始审核
EntryApply.prototype.httpReviewing = function (successCallback, errorCallback) {
	let that = this;
	if (!this.id) {
		this.errorMessage = "没有详情！";
		this.defaultErrorHandler(this.errorMessage, errorCallback);
		return;
	}
	let url = this.URL_REVIEWING.replace("{id}", this.id);
	this.detailLoading = true;
	this.httpGet(url, {}, function (response) {
		that.detailLoading = false;

		that.render(response.data[that.getTAG()]);
		that.editMode = true;
		successCallback && successCallback(response);
	}, function (response) {

		that.detailLoading = false;

		if (typeof errorCallback === "function") {
			errorCallback();
		} else {
			//没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
			that.defaultErrorHandler(response);
		}
	});
}

//从当前状态允许变成的下一个状态列表
EntryApply.prototype.availableStatusList = function () {
	let list = [];
	if (this.status === this.Status.NEW) {
		list.push(this.StatusMap[this.Status.NEW]);
		list.push(this.StatusMap[this.Status.REVIEWING]);
	} else if (this.status === this.Status.REVIEWING) {
		list.push(this.StatusMap[this.Status.NEW]);
		list.push(this.StatusMap[this.Status.REVIEWING]);
		list.push(this.StatusMap[this.Status.FIRST_REVIEW_PASS]);
		list.push(this.StatusMap[this.Status.FIRST_REVIEW_REJECT]);
	} else if (this.status === this.Status.FIRST_REVIEW_PASS) {
		list.push(this.StatusMap[this.Status.FIRST_REVIEW_PASS]);
		list.push(this.StatusMap[this.Status.FIRST_REVIEW_REJECT]);
		list.push(this.StatusMap[this.Status.FINAL_REVIEW_PASS]);
		list.push(this.StatusMap[this.Status.FINAL_REVIEW_REJECT]);
	} else if (this.status === this.Status.FIRST_REVIEW_REJECT) {
		list.push(this.StatusMap[this.Status.FIRST_REVIEW_PASS]);
		list.push(this.StatusMap[this.Status.FIRST_REVIEW_REJECT]);
	} else if (this.status === this.Status.FINAL_REVIEW_PASS) {
		list.push(this.StatusMap[this.Status.FINAL_REVIEW_PASS]);
		list.push(this.StatusMap[this.Status.FINAL_REVIEW_REJECT]);
	} else if (this.status === this.Status.FINAL_REVIEW_REJECT) {
		list.push(this.StatusMap[this.Status.FINAL_REVIEW_PASS]);
		list.push(this.StatusMap[this.Status.FINAL_REVIEW_REJECT]);
	}

	return list;

}

EntryApply.prototype.httpStatus = function (params, successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_STATUS, params, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
}

//归档操作。
EntryApply.prototype.httpArchive = function (reason, successCallback, failureCallback) {

	let that = this;

	let form = {
		id: this.id,
		archive: !this.archive,
		reason: reason
	};

	if (!this.URL_ARCHIVE) {
		console.error("没有定义URL_ARCHIVE");
		return;
	}
	this.httpPost(this.URL_ARCHIVE, form, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);

}

//预分配社区经理
EntryApply.prototype.httpPresetMentor = function (projectMentorId, successCallback, failureCallback) {
  this.errorMessage = "";
  if(projectMentorId !== 0 && projectMentorId !== null) {
    if(this.status !== Status.FINAL_REVIEW_PASS) {
      this.errorMessage = "该入驻申请未通过审核，无法操作！";
      return;
    }
  }

  let that = this;
  let form = {
    id: this.id,
    presetProjectMentorId: projectMentorId
  };
  if (!this.URL_DISTRIBUTION) {
    console.error("没有定义URL_DISTRIBUTION");
    return;
  }
  console.log(form)
  this.httpPost(this.URL_DISTRIBUTION, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);

}
