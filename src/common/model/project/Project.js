import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from '../tank/Tank'
import { simpleDateTime } from '../../filter/time'
import ProjectMember from './ProjectMember'
import ProjectFinancing from './ProjectFinancing'
import EntryApply from '../entry/apply/EntryApply'
import Vue from 'vue'
import User from '../user/User'
import ProjectMentor from './ProjectMentor'
import SpaceApply from '../space/SpaceApply'
import Company from '../company/Company'
import { readLocalStorage, removeLocalStorage, saveToLocalStorage } from '../../util/Utils'
import ProtocolSpace from '../protocol/space/ProtocolSpace'
import SpaceRegional from "../space/SpaceRegional";

let Status = {
	INCUBATING: "INCUBATING",
	QUIT: "QUIT",
	GRADUATION: "GRADUATION"
}

let StatusMap = {
	INCUBATING: {
		name: "孵化中",
		value: "INCUBATING",
		style: "success",
		icon: "sun-o"
	},
	QUIT: {
		name: "已退出",
		value: "QUIT",
		style: "danger",
		icon: "close"
	},
	GRADUATION: {
		name: "已毕业",
		value: "GRADUATION",
		style: "`",
		icon: "graduation-cap"
	}
}


export default function Project() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.creator = new User();
	this.entryApply = new EntryApply();
  this.isHot = null
	this.projectMentor = new ProjectMentor();
	this.name = null;
	this.leader = null;
  this.leaderPhone = null
  this.leaderEmail = null
	this.no = null;
	this.entryTime = new Date();
	this.entryAddress = "零号湾全球创新创业集聚区";
	this.subordinateBase = "零号湾创业苗圃";
	this.projectSource = null;
	this.technologyDirection = null;
	this.marketTypes = [];

	this.isRegisteredCompany = null;
	this.registeredCompanyTime = new Date();
	this.registeredCompanyName = null;
  this.registeredCompanyAddress = null
  this.businessLicense = new Tank('image', false, 2 * 1024 * 1024, '最大不超过2M')
	this.moveTime = new Date();
	this.quitTime = new Date();
	this.graduationTime = new Date();
	this.description = null;
	this.implementation = null;
	this.memberNum = null;
	this.businessPlan = new Tank(".doc|.docx|.pdf", true);
  this.attachments = [];
	this.projectMembers = [];
	this.projectFinancings = [];

	this.spaceApplies = [];

	this.company = null;

	this.status = Status.INCUBATING;

	//当前这段
  this.currentAttachments = []

	if (Vue.store.state.debug) {
    //this.mockData();
	}
}

//extend BaseEntity
Project.prototype = new BaseEntity();
Project.prototype.constructor = Project;

Project.prototype.URL_ASSIGN_MENTOR = "/project/assign/mentor";
Project.prototype.URL_ASSIGN_CREATOR = "/project/assign/creator";
Project.prototype.URL_STATUS = "/project/status";
Project.prototype.URL_MANAGE = "/project/manage";
Project.prototype.URL_HOT = '/project/hot'
Project.prototype.URL_UPLOAD_ATTACHMENTS = '/project/upload/attachments'


Project.prototype.Status = Status;
Project.prototype.StatusMap = StatusMap;
Project.prototype.StatusList = Project.prototype.getStatusList();

//测试数据。
Project.prototype.mockData = function () {

	this.entryApply = new EntryApply();
	this.name = "华山论剑项目";
	this.no = null;
	this.entryTime = new Date();
	this.entryAddress = "昆仑山大峡谷";
	this.subordinateBase = "零号湾创业苗圃";
	this.projectSource = "自主研发";
	this.technologyDirection = "电子信息";
	this.marketTypes = ["大医疗"];

	this.isRegisteredCompany = true;
	this.registeredCompanyTime = new Date();
	this.registeredCompanyName = "倚天剑信息科技有限公司";
	this.moveTime = new Date();
	this.description = "射雕英雄传之《华山论剑》，20集：黄蓉受七公所托，接管丐帮帮主之职，杨康从中作梗，最终被众人识破，郭靖黄蓉追敌误入铁掌帮，黄蓉为其帮主重伤，一灯大师不惜性命相救。伤愈后，二人重返桃花岛，却发现江南五怪死于岛上，郭靖误认是黄药师是凶手，含恨弃蓉离岛而去。";
	this.implementation = "郭靖与黄药师定下烟雨楼决战，双方混战中，杨康领兵围攻，黄蓉救出柯震恶，在破庙中用计诱使杨康说出真相。";
	this.memberNum = 10;
	this.businessPlan = new Tank(".doc|.docx|.pdf", true);
	this.businessPlan.mockDataDocxPrivacy();


	this.projectMembers = [];
	this.projectFinancings = [];

}

Project.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "项目编号", "orderProjectNo"),
		new Filter("INPUT", "项目名称", "name"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("SELECTION", "状态", "status", this.getStatusList()),
    new Filter(Filter.prototype.Type.HTTP_SELECTION, '项目经理', 'projectMentorId', null, ProjectMentor),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};


//We use this method to get the full js Object.
Project.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("creator", User);
	this.renderEntity("entryApply", EntryApply);
	this.renderEntity("projectMentor", ProjectMentor);
	this.renderEntity("entryTime", Date);
	this.renderEntity("registeredCompanyTime", Date);
  this.renderEntity('businessLicense', Tank)
	this.renderEntity("moveTime", Date);
	this.renderEntity("quitTime", Date);
	this.renderEntity("graduationTime", Date);

	this.renderEntity("businessPlan", Tank);

  if (this.attachments) {
    this.renderList("attachments", Tank)
  } else {
    this.attachments = [];
  }

	this.renderList("projectMembers", ProjectMember);
	this.renderList("projectFinancings", ProjectFinancing);
	this.renderList("spaceApplies", SpaceApply);

	if (!one2one) {
		this.renderEntity("company", Company, true);
	}
};


/**
 * 1.在归档情况下，任何人都不能编辑。
 * 2.在非归档情况下，管理员在任何状态下都能编辑。普通用户只能在NEW和FIRST_REVIEW_REJECT这两种状态下编辑。
 */
Project.prototype.canEdit = function () {

	return true;
}

/**
 * 任何状态均可尝试去删除，后台返回结果是否可以删除。
 */
Project.prototype.canDel = function () {

	return true;
}


Project.prototype.getForm = function () {

	let marketTypes = this.marketTypes;
	let marketTypesInfo = [];
	for (let i = 0; i < marketTypes.length; i++) {
		let market = marketTypes[i];

		marketTypesInfo.push(market);
	}

	let projectMembers = this.projectMembers;
	let projectMembersInfo = [];
	for (let i = 0; i < projectMembers.length; i++) {
		let projectMember = projectMembers[i];

		projectMembersInfo.push(projectMember.getForm());
	}

	let projectFinancings = this.projectFinancings;
	let projectFinancingsInfo = [];
	for (let i = 0; i < projectFinancings.length; i++) {
		let projectFinancing = projectFinancings[i];

		projectFinancingsInfo.push(projectFinancing.getForm());
	}
	let form = {
		name: this.name,
		leader: this.leader,
    leaderPhone: this.leaderPhone,
    leaderEmail: this.leaderEmail,
		entryApplyId: this.entryApply.id,
		projectSource: this.projectSource,
		technologyDirection: this.technologyDirection,
		isRegisteredCompany: this.isRegisteredCompany,
		moveTime: simpleDateTime(this.moveTime),
		description: this.description,
		implementation: this.implementation,
		memberNum: this.memberNum,
		businessPlanCode: this.businessPlan.code,
		status: this.status,
		projectMembersInfo: JSON.stringify(projectMembersInfo),
		projectFinancingsInfo: JSON.stringify(projectFinancingsInfo),
		marketTypes: JSON.stringify(marketTypesInfo)
	};
	if (this.isRegisteredCompany) {
    form.registeredCompanyTime = simpleDateTime(this.registeredCompanyTime);
    form.registeredCompanyName = this.registeredCompanyName;
    form.registeredCompanyAddress = this.registeredCompanyAddress;
    form.businessLicenseCode = this.businessLicense.code;
  }
	if (this.id) {
		form.id = this.id;
	}
	return form;

};

Project.prototype.validate = function () {
  if (!this.name) {
    this.errorMessage = '项目名称必填！'
    return false
  }

  if (!this.editMode) {
    if (!this.entryApply.id) {
      this.errorMessage = '必须关联一个入驻申请！'
      return false
    }
    if (!this.projectSource) {
      this.errorMessage = '项目来源必填！'
      return false
    }
    if (!this.technologyDirection) {
      this.errorMessage = '专业技术方向必填！'
      return false
    }
    if (!this.marketTypes[0]) {
      this.errorMessage = '市场分类必填！'
      return false
    }

    if (this.isRegisteredCompany === null) {
      this.errorMessage = '是否已注册公司必填！'
      return false
    }
    if (this.isRegisteredCompany) {
      if (!this.registeredCompanyName) {
        this.errorMessage = '注册公司名称必填！'
        return false
      }
      if (!this.registeredCompanyTime) {
        this.errorMessage = '注册公司时间必填！'
        return false
      }
      if (!this.businessLicense.code) {
        this.errorMessage = '公司营业执照必填！'
        return false
      }
    }
    if (!this.description) {
      this.errorMessage = '项目简介必填！'
      return false
    }
    if (!this.implementation) {
      this.errorMessage = '项目执行进度计划必填！'
      return false
    }
    if (!this.memberNum) {
      this.errorMessage = '团队成员数必填！'
      return false
    }

    if (!this.businessPlan.code) {
      this.errorMessage = '企业计划书必须添加！'
      return false
    }
  }
	return true;
}

Project.prototype.addProjectMember = function (projectMember) {

	projectMember = new ProjectMember();
	this.projectMembers.push(projectMember);
}

Project.prototype.subProjectMember = function (projectMember) {

	let index = this.projectMembers.indexOf(projectMember);
	if (index !== -1) {
		this.projectMembers.splice(index, 1)
	}

}

Project.prototype.addProjectFinancing = function (projectFinancing) {

	this.projectFinancings.push(projectFinancing);

}


Project.prototype.subProjectFinancing = function (projectFinancing) {

	let index = this.projectFinancings.indexOf(projectFinancing);
	if (index !== -1) {
		this.projectFinancings.splice(index, 1)
	}

}

//根据当前的 spaceApply来填充一些字段信息。
Project.prototype.fillByEntryApply = function () {

	this.name = this.entryApply.name;
	this.memberNum = this.entryApply.memberNum;
	this.businessPlan = this.entryApply.businessPlan;
	this.description = this.entryApply.description;

}
//指定社区经理
Project.prototype.httpAssignMentor = function (params, successCallback, failureCallback) {
	let that = this;
	this.httpPost(this.URL_ASSIGN_MENTOR, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

//重新制定项目创建人。
Project.prototype.httpAssignCreator = function (params, successCallback, failureCallback) {
	let that = this;
	this.httpPost(this.URL_ASSIGN_CREATOR, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

Project.prototype.httpStatus = function (params, successCallback, failureCallback) {
	let that = this;
	this.httpPost(this.URL_STATUS, params, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

Project.prototype.httpManageSave = function (successCallback, failureCallback) {
	let that = this;
	let form = {
		id: this.id,
		entryTime: simpleDateTime(this.entryTime),
		entryAddress: this.entryAddress,
		subordinateBase: this.subordinateBase
	}
	this.httpPost(this.URL_MANAGE, form, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

//将信息从本地读取出来。
Project.prototype.renderFromLocalStorage = function () {
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
Project.prototype.saveToLocalStorage = function () {
	saveToLocalStorage(this.getTAG(), JSON.stringify(this));
}
//清除本地信息
Project.prototype.clearLocalStorage = function () {
	removeLocalStorage(this.getTAG());
}

Project.prototype.httpSetHot = function (successCallback, failureCallback) {
  let that = this
  let form = {
    id: this.id,
    isHot: !this.isHot
  }
  this.httpPost(this.URL_HOT, form, function (response) {
    that.render(response.data[that.getTAG()])
    successCallback && successCallback(response)
  }, failureCallback)
}

//验证用户是否是当前项目的创建者
Project.prototype.isCreator = function (user) {
  if((user.id === this.creator.id && user.hasPermissionSpace(Vue.store.state.FeatureType.PROJECT_MINE,this.spaceRegional.id)) || user.hasPermissionSpace(Vue.store.state.FeatureType.PROJECT_MANAGE,this.spaceRegional.id)) {
    return true;
  }
  return false;
}

Project.prototype.httpUploadAttachments = function (successCallback, failureCallback) {

  let attachmentsCodes = []
  this.currentAttachments.forEach(tank => {
    attachmentsCodes.push(tank.code)
  })
  let form = {
    'id': this.id,
    'attachmentsCodes': JSON.stringify(attachmentsCodes)
  }

  let that = this
  this.httpPost(this.URL_UPLOAD_ATTACHMENTS, form, function (response) {
    that.render(response.data[that.getTAG()])
    successCallback && successCallback(response)
  }, failureCallback)
}
