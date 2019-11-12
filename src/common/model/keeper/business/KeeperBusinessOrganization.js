import BaseEntity from '../../base/BaseEntity'
import Filter from '../../base/Filter'
import Tank from '../../tank/Tank'
import KeeperBusinessType from './KeeperBusinessType'
import Vue from 'vue'
import SpaceRegional from "../../space/SpaceRegional";
import MakerOrganization from "../../maker/MakerOrganization";
import User from "../../user/User";

let Type = {
  //工商服务
  BUSINESS_SERVICE: "BUSINESS_SERVICE",
  //金融服务
  FINANCE_SERVICE: "FINANCE_SERVICE",
  //财税服务
  FISCAL_SERVICE: "FISCAL_SERVICE",
  //法律法规
  LAW_SERVICE: "LAW_SERVICE",
  //知识产权
  KNOWLEDGE_SERVICE: "KNOWLEDGE_SERVICE",
  //人力资源
  RESOURCES_SERVICE: "RESOURCES_SERVICE",
  //广告会展
  ADVERTISEMENT_SERVICE: "ADVERTISEMENT_SERVICE",
  //IT服务
  IT_SERVICE: "IT_SERVICE",
  //创业服务
  BUSINESS_START_SERVICE: "BUSINESS_START_SERVICE",
  //其他服务
  OTHER_SERVICE: "OTHER_SERVICE"
};

let TypeMap = {
  BUSINESS_SERVICE: {
    name: "工商服务",
    value: "BUSINESS_SERVICE",
    style: ""
  },
  FINANCE_SERVICE: {
    name: "金融服务",
    value: "FINANCE_SERVICE",
    style: ""
  },
  FISCAL_SERVICE: {
    name: "财税服务",
    value: "FISCAL_SERVICE",
    style: ""
  },
  LAW_SERVICE: {
    name: "法律法规",
    value: "LAW_SERVICE",
    style: ""
  },
  KNOWLEDGE_SERVICE: {
    name: "知识产权",
    value: "KNOWLEDGE_SERVICE",
    style: ""
  },
  RESOURCES_SERVICE: {
    name: "人力资源",
    value: "RESOURCES_SERVICE",
    style: ""
  },
  ADVERTISEMENT_SERVICE: {
    name: "广告会展",
    value: "ADVERTISEMENT_SERVICE",
    style: ""
  },
  IT_SERVICE: {
    name: "IT服务",
    value: "IT_SERVICE",
    style: ""
  },
  BUSINESS_START_SERVICE: {
    name: "创业服务",
    value: "BUSINESS_START_SERVICE",
    style: ""
  },
  OTHER_SERVICE: {
    name: "其他服务",
    value: "OTHER_SERVICE",
    style: ""
  }
};

let Status = {
  PROCESSING: "PROCESSING",
  FINISH: "FINISH"
};

let StatusMap = {
  PROCESSING: {
    name: "正在进行中",
    value: "PROCESSING",
    style: "info"
  },
  FINISH: {
    name: "审核通过",
    value: "FINISH",
    style: "success"
  }
}
export default function KeeperBusinessOrganization() {

	BaseEntity.call(this, arguments);
	this.creatorId = new User();
	this.name = null;
	this.description = null;
	this.showDetail = null;
	this.detailName = null;
	this.type = Type.BUSINESS_SERVICE;
  this.status = Status.PROCESSING;
  this.logo = new Tank("image", false);
  this.scanning = new Tank('image', false, 2 * 1024 * 1024, '最大不超过2M');
  this.businessType = new KeeperBusinessType();
  this.contactsCompany = null;
  this.contactsName = null;
  this.contactsPhone = null;
  this.contactsAddress = null;
  this.contactsNote = null;
  this.isPageUrl = false;
  this.url = null;
  this.isFinanceType = false;
  this.mainTitle = null;
  this.subheading = null;
  this.content = null;
  this.multiplePictures = [];
  this.multiplePicturesUrls = [];
  if (Vue.store.state.debug) {
    this.mockData();
  }
}

KeeperBusinessOrganization.prototype = new BaseEntity();
KeeperBusinessOrganization.prototype.constructor = KeeperBusinessOrganization;
KeeperBusinessOrganization.prototype.URL_STATUS = "/keeper/business/organization/status";

KeeperBusinessOrganization.prototype.Type = Type;
KeeperBusinessOrganization.prototype.TypeMap = TypeMap;
KeeperBusinessOrganization.prototype.TypeList = KeeperBusinessOrganization.prototype.getTypeList();
KeeperBusinessOrganization.prototype.Status = Status;
KeeperBusinessOrganization.prototype.StatusMap = StatusMap;
KeeperBusinessOrganization.prototype.StatusList = KeeperBusinessOrganization.prototype.getStatusList();


KeeperBusinessOrganization.prototype.mockData = function () {
  this.name = "服务名字不能一样，请修改";
  this.description = "服务类型详情";
  this.showDetail = "展示详情";
  this.detailName = "很具体的单位";
  this.contactsCompany = "明教";
  this.contactsName = "阳顶天";
  this.contactsPhone = "16845269554";
  this.contactsAddress = "金顶";
  this.contactsNote = "别找了，已经死了。";
}

KeeperBusinessOrganization.prototype.getFilters = function () {
	return [
		new Filter("INPUT", "名称", "name"),
    new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "具体单位名称", "detailName"),
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("SORT", "创建时间", "orderCreateTime"),
		new Filter("HTTP_SELECTION", "服务类型", "keeperBusinessTypeId", null, KeeperBusinessType),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};


KeeperBusinessOrganization.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("businessType", KeeperBusinessType);
	this.renderEntity("logo", Tank);
  this.renderEntity("scanning", Tank);
  this.renderList("multiplePictures", Tank);
}

KeeperBusinessOrganization.prototype.getForm = function () {
  let multiplePicturesInfo = [];
  if (this.multiplePictures && this.multiplePictures.length) {
    for (let i = 0; i < this.multiplePictures.length; i++) {
      let tank = this.multiplePictures[i];
      if (tank.exist()) {
        multiplePicturesInfo.push(tank.code);
      }
    }
  }
	let form = {
    creatorId: this.creatorId,
		name: this.name,
    keyword: this.keyword,
    type: this.type,
		description: this.description,
    showDetail: this.showDetail,
		detailName: this.detailName,
		logoCode: this.logo.code,
    scanningCode: this.scanning.code,
    businessTypeId: this.businessType.id,
    contactsCompany: this.contactsCompany,
    contactsName: this.contactsName,
    contactsPhone: this.contactsPhone,
    contactsAddress: this.contactsAddress,
    contactsNote: this.contactsNote,
    isPageUrl: this.isPageUrl,
    url: this.url,
    mainTitle:this.mainTitle,
    subheading:this.subheading,
    content:this.content,
    multiplePicturesInfo:JSON.stringify(multiplePicturesInfo)
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}

KeeperBusinessOrganization.prototype.validate = function () {
	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}
	if (!this.detailName) {
		this.errorMessage = "具体单位必填！";
		return false;
	}
  if (!this.type) {
    this.errorMessage = "所属十大服务类型必填！";
    return false;
  }
  if (!this.businessType.id) {
    this.errorMessage = "所属服务类型必填！";
    return false;
  }
  if (!this.scanning) {
    this.errorMessage = "营业执照必填！";
    return false;
  }
	if (!this.logo) {
		this.errorMessage = "logo必填！";
		return false;
	}
  if (!this.contactsCompany) {
    this.errorMessage = "联系人单位必填！";
    return false;
  }
  if (!this.contactsName) {
    this.errorMessage = "联系人姓名必填！";
    return false;
  }
  if (!this.contactsPhone) {
    this.errorMessage = "联系方式必填！";
    return false;
  }
	if (!this.businessType.id) {
		this.errorMessage = "服务类型必选！";
		return false;
	}
	if (this.isPageUrl) {
    if (!this.url) {
      this.errorMessage = "详情页链接必填！";
      return false;
    }
  } else {
    if (!this.description) {
      this.errorMessage = "描述信息必填！";
      return false;
    }
  }
	return true;
}

//从当前状态允许变成的下一个状态列表
KeeperBusinessOrganization.prototype.finishStatusList = function () {
  let list = [];
  list.push(this.StatusMap[this.Status.FINISH]);
  return list;
};

KeeperBusinessOrganization.prototype.httpStatus = function (status, reason, successCallback, failureCallback) {
  let form = {
    "id": this.id,
    "status": status,
    "reason": reason
  };
  let that = this;
  this.httpPost(this.URL_STATUS, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
};
