import BaseEntity from '../../base/BaseEntity'
import Filter from '../../base/Filter'
import User from '../../user/User'
import Vue from 'vue'
import { addDate, simpleDateTime, preDay } from '../../../filter/time'
import SpaceApply from '../../space/SpaceApply'
import SpaceSeat from '../../space/SpaceSeat'
import SpaceRoom from '../../space/SpaceRoom'
import FinancePayInfo from '../../finance/FinancePayInfo'
import Tank from '../../tank/Tank'
import { Status, StatusList, StatusMap } from '../ProtocolStatus'
import Project from '../../project/Project'
import { Type, TypeMap } from '../../space/SpaceType'
import ProjectMentor from '../../project/ProjectMentor'
import SpaceRegional from "../../space/SpaceRegional";



let TariffType = {
  GATHER: 'GATHER',
  NOT_GATHER: 'NOT_GATHER'
}
let TariffTypeMap = {
  GATHER: {
    name: '单独收取',
    value: 'GATHER',
    style: 'success'
  },
  NOT_GATHER: {
    name: '包含在租金中',
    value: 'NOT_GATHER',
    style: 'info'
  }
}
let TariffTypeList = []
for (let key in TariffTypeMap) {
  if (TariffTypeMap.hasOwnProperty(key)) {
    TariffTypeList.push(TariffTypeMap[key])
  }
}


export default function ProtocolSpace() {

	BaseEntity.call(this, arguments);

	//乙方用户
	this.user = new User();
	//关联的创业空间申请。
	this.spaceApply = new SpaceApply();

	this.project = new Project();

	this.type = Type.INCUBATOR;
  this.tariffType = null

  this.spaceIds = []

	//名称 标题。
	this.name = null;
	//合同编号
	this.no = null;
	//租赁协议相关内容。
	//甲方
	this.partyA = Vue.store.state.preference.party;

	//乙方
	this.partyB = null;
	//房屋地址
	this.address = null;
	//建筑面积
	this.area = null;
	//产权证编号
	this.propertyNo = null;

	//交付时间 一号楼
	this.deliveryTime = new Date();
	//交付时间 第一次租金时间 一号
	this.firstRentalTime = new Date()
	//交付时间 交押金时间 往前推五天
	this.depositTime = addDate(new Date(), -5)

	//年限
	this.year = null;
	//开始时间
	this.startTime = new Date();
	//结束时间
	this.endTime = new Date();
	//装修免租期
  this.rentFreePeriod = null;
  //装修免租期截至时间
  this.rentFreePeriodEndTime = new Date();
	//计算租金和物业管理费起始时间
	this.rentStartTime = new Date();
	//续租提前几个月告知 同时这段时间内可以带潜在租户看房。
	this.reletAheadMonth = null;
	//定金
	this.frontMoney = 0;
	this.frontMoneyRental = null;
	//租金（月）
	this.rental = 0;
	this.submitRental = 0
	//大写租金
	this.capitalRental = null;
	//押金月数
	this.depositMonth = 0;
	//押金
	this.deposit = 0;
	//押金大写
	this.capitalDeposit = null;
	//创新券总额
	this.totalInnoToken = 0;
	//每隔几个月支付一次
	this.intervalMonth = 3;

	//甲方法定代表人或委托代理人
	this.partyARepresentative = Vue.store.state.preference.representative;
	//乙方法定代表人或委托代理人
	this.partyBRepresentative = null;
	//甲方法定代表人或委托代理人
	this.partyAPhone = Vue.store.state.preference.representativePhone;
	//乙方法定代表人或委托代理人
	this.partyBPhone = null;

	//甲方签约时间
  this.partyATime = new Date()
	//乙方签约时间
  this.partyBTime = new Date()
	//签约地点
	this.signAddress = Vue.store.state.preference.signAddress;
	//甲方开户银行
	this.partyABank = Vue.store.state.preference.bank;
	//乙方开户银行
	this.partyBBank = null;
	//甲方银行账号
	this.partyABankNo = Vue.store.state.preference.bankNo;
	//乙方银行账号
	this.partyBBankNo = null;
  //纳税人识别号
  this.partyACode = Vue.store.state.preference.taxpayerCode
  this.partyBCode = null
  //地址电话
  this.partyAAddress = Vue.store.state.preference.partyAAddress
  this.partyASignPhone = Vue.store.state.preference.partyASignPhone
  this.partyBAddress = null
  this.partyBSignPhone = null
  //发票类型
  this.invoiceType = null

	this.scanning = new Tank(".doc|.docx|.pdf|.jpg|.jpeg|.png", true, 50 * 1024 * 1024, "可上传doc,docx,pdf,jpg,jpeg,png格式的扫描件");
	//附件
	this.attachments = [];

	this.reason = null;

	this.archive = false;

  this.cumulativeDeductions = null;

	//状态
	this.status = Status.NEW;

  //合同版本号
  this.contractNo = null;

	this.financePayInfos = [];

	this.financeBillReceipts = [];

	//当前字段
	this.currentAttachments = []
  this.spaceSeats = []
  this.spaceRooms = []

  //财务联系人
  this.dutyName = null;
	this.dutyPhone = null;
	this.dutyEmail = null;

	//发票联系人
  this.invoiceName = null;
  this.invoicePhone = null;
  this.invoiceEmail = null;
  this.invoiceContactsType = null;

	if (Vue.store.state.debug) {
		this.mockData();
	}
}


ProtocolSpace.prototype = new BaseEntity();
ProtocolSpace.prototype.constructor = ProtocolSpace;

ProtocolSpace.prototype.URL_DOWNLOAD_PDF = "/protocol/space/download/pdf/{id}";
ProtocolSpace.prototype.URL_STATUS = "/protocol/space/status";
ProtocolSpace.prototype.URL_ARCHIVE = "/protocol/space/archive";
ProtocolSpace.prototype.URL_SCANNING = "/protocol/space/scanning";
ProtocolSpace.prototype.URL_REFRESH_STATUS = "/protocol/space/refresh/status";
ProtocolSpace.prototype.URL_INVOICE = "/protocol/space/invoice";
ProtocolSpace.prototype.URL_UPLOAD_ATTACHMENTS = '/protocol/space/upload/attachments'

ProtocolSpace.prototype.Status = Status;
ProtocolSpace.prototype.StatusMap = StatusMap;
ProtocolSpace.prototype.StatusList = StatusList;

ProtocolSpace.prototype.Type = Type;
ProtocolSpace.prototype.TypeMap = TypeMap;
ProtocolSpace.prototype.TypeList = ProtocolSpace.prototype.getTypeList();

ProtocolSpace.prototype.TariffType = TariffType
ProtocolSpace.prototype.TariffTypeMap = TariffTypeMap
ProtocolSpace.prototype.TariffTypeList = TariffTypeList


ProtocolSpace.prototype.mockData = function () {
	this.year = 1;
	this.startTime = new Date();

	let date = new Date();
	date.setFullYear(date.getFullYear() + 1);
	this.endTime = date;
  this.rentFreePeriod = 3;
	this.reletAheadMonth = 3;
	this.rental = 1800;
	this.totalInnoToken = 0;

}

ProtocolSpace.prototype.getTariffTypeStyle = function () {
  let item = TariffTypeMap[this.tariffType]
  if (item) {
    return item.style
  } else {
    return 'default'
  }
}
ProtocolSpace.prototype.getTariffTypeName = function () {
  let item = TariffTypeMap[this.tariffType]
  if (item) {
    return item.name
  } else {
    return '未知类型'
  }
}

ProtocolSpace.prototype.getFilters = function () {

	return [
		new Filter(Filter.prototype.Type.SORT, "ID", "orderId"),
		new Filter(Filter.prototype.Type.SORT, "名称", "orderName"),
		new Filter(Filter.prototype.Type.SORT, '编号', 'orderNo'),
		new Filter(Filter.prototype.Type.MULTI_SELECTION, "状态", "statuses", this.getStatusList()),
		new Filter(Filter.prototype.Type.MULTI_SELECTION, "类型", "types", this.getTypeList()),
		new Filter(Filter.prototype.Type.INPUT, "协议名称", "name"),
		new Filter(Filter.prototype.Type.INPUT, "关键字", "keyword"),
		new Filter(Filter.prototype.Type.INPUT, '编号', 'no'),
		new Filter(Filter.prototype.Type.HTTP_SELECTION, "乙方用户", "userId", null, User, false),
    new Filter(Filter.prototype.Type.HTTP_SELECTION, '占用房间', 'spaceRoomId', null, SpaceRoom),
    new Filter(Filter.prototype.Type.HTTP_SELECTION, '占用工位', 'spaceSeatId', null, SpaceSeat),
    new Filter(Filter.prototype.Type.HTTP_SELECTION, '项目经理', 'projectMentorId', null, ProjectMentor),
		new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "起始时间", "fromDate"),
		new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, "终止时间", "toDate"),
		new Filter(Filter.prototype.Type.CHECK, "归档", "archive"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object
ProtocolSpace.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	if (!one2one) {
		this.renderEntity("spaceApply", SpaceApply, true);
	}
	this.renderEntity("project", Project);
	this.renderEntity("user", User);
	this.renderEntity("deliveryTime", Date);
	this.renderEntity('firstRentalTime', Date)
	this.renderEntity('depositTime', Date)
	this.renderEntity("startTime", Date);
	this.renderEntity("endTime", Date);
	this.renderEntity("rentFreePeriodEndTime", Date);
	this.renderEntity("rentStartTime", Date);

	if (this.partyATime) {
		this.renderEntity("partyATime", Date);
	}
	if (this.partyBTime) {
		this.renderEntity("partyBTime", Date);
	}

	this.renderList("financePayInfos", FinancePayInfo);

	this.renderEntity("scanning", Tank, true);
	if (this.attachments) {
		this.renderList("attachments", Tank)
	} else {
		this.attachments = [];
	}

  if (this.type === SpaceApply.prototype.Type.NURSERY) {
    this.renderList('spaceSeats', SpaceSeat)
  } else {
    this.renderList('spaceRooms', SpaceRoom)
  }

}

ProtocolSpace.prototype.getForm = function () {

	let form = {

		//关联的创业空间申请。
		spaceApplyId: this.spaceApply.id,

    spaceIds: JSON.stringify(this.spaceIds),
    type: this.type,
    tariffType: this.tariffType,
		//名称 标题。
		name: this.name,
		//合同编号
		no: this.no,
    //关键字
    keyword: this.keyword,
		//租赁协议相关内容。
		//甲方
		partyA: this.partyA,
		//乙方
		partyB: this.partyB,
		//房屋地址
		address: this.address,
		//建筑面积
		area: this.area,
		//产权证编号
		propertyNo: this.propertyNo,
		//交付时间
		deliveryTime: simpleDateTime(this.deliveryTime),
		//第一期
		firstRentalTime: simpleDateTime(this.firstRentalTime),
		//押金
		depositTime: simpleDateTime(this.depositTime),
		//年限
		year: this.year,
		//开始时间
		startTime: simpleDateTime(this.startTime),
		//结束时间
		endTime: simpleDateTime(this.endTime),
    //装修免租期
    rentFreePeriod: this.rentFreePeriod,
    //装修免租期截至时间
    rentFreePeriodEndTime: simpleDateTime(preDay(this.rentStartTime)),
		//计算租金和物业管理费起始时间
		rentStartTime: simpleDateTime(this.rentStartTime),
		//续租提前几个月告知 同时这段时间内可以带潜在租户看房。
		reletAheadMonth: this.reletAheadMonth,
		//定金部分
		frontMoney: this.frontMoney,
		frontMoneyRental: this.frontMoneyRental,
		//租金（月）
		rental: this.rental,
		//大写租金
		capitalRental: this.capitalRental,
		//押金月数
		depositMonth: this.depositMonth,
		//押金
		deposit: this.deposit,
		//押金大写
		capitalDeposit: this.capitalDeposit,
		//创新券总额
		totalInnoToken: this.totalInnoToken,
		//
		intervalMonth: this.intervalMonth,

		//甲方法定代表人或委托代理人电话
		partyAPhone: this.partyAPhone,
		//乙方法定代表人或委托代理人电话
    partyBPhone: this.partyBPhone,
    /////发票信息/////
    partyABank: this.partyABank,
    partyBBank: this.partyBBank,
    partyABankNo: this.partyABankNo,
    partyBBankNo: this.partyBBankNo,
    partyACode: this.partyACode,
    partyBCode: this.partyBCode,
    partyAAddress: this.partyAAddress,
    partyASignPhone: this.partyASignPhone,
    partyBAddress: this.partyBAddress,
    partyBSignPhone: this.partyBSignPhone,
    invoiceType: this.invoiceType,
    dutyName:this.dutyName,
    dutyPhone:this.dutyPhone,
    dutyEmail:this.dutyEmail

	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}


ProtocolSpace.prototype.validate = function () {

	this.errorMessage = null;
  if (!this.type) {
    this.errorMessage = '请填选择合同类型！'
    return false
  }
  if (this.type === Type.INCUBATOR) {
    if (this.tariffType === null) {
      this.errorMessage = '请填选择电费类型！'
      return false
    }
  }
	if (!this.spaceApply.id) {
		this.errorMessage = '必须关联一个场地申请！'
		return false;
	}
	if (this.spaceApply.status !== this.spaceApply.Status.PASS) {
		this.errorMessage = '场地申请必须通过！'
		return false
	}
	//名称 标题。
	if (!this.name) {
		this.errorMessage = "name必填！";
		return false;
	}
	//租赁协议相关内容。
	//甲方
	if (!this.partyA) {
		this.errorMessage = "甲方必填！";
		return false;
	}
	//乙方
	if (!this.partyB) {
		this.errorMessage = "乙方必填！";
		return false;
	}
  if (!this.dutyName) {
    this.errorMessage = "财务联系人姓名必填！";
    return false;
  }
  if (!this.dutyPhone) {
    this.errorMessage = "财务联系人电话必填！";
    return false;
  }
  if (!this.dutyEmail) {
    this.errorMessage = "财务联系人邮箱必填！";
    return false;
  }
  if (this.spaceIds.length === 0) {
    this.errorMessage = '至少选择一个工位'
    return false
  }
	//房屋地址
	if (!this.address) {
		this.errorMessage = "房屋地址必填！";
		return false;
	}
	//建筑面积
	if (!this.area) {
		this.errorMessage = "建筑面积必填！";
		return false;
	}
	//产权证编号
	if (!this.propertyNo) {
		this.errorMessage = "产权证编号必填！";
		return false;
	}
	//交付时间
	if (!this.deliveryTime) {
		this.errorMessage = "交付时间必填！";
		return false;
	}
	//合同年限
	if (!this.year) {
		this.errorMessage = "合同年限必填！";
		return false;
	}
	//开始时间
	if (!this.startTime) {
		this.errorMessage = "开始时间必填！";
		return false;
	}
	//结束时间
	if (!this.endTime) {
		this.errorMessage = "结束时间必填！";
		return false;
	}
	//装修免租期
  if (this.type === Type.ACCELERATOR) {
    if (this.rentFreePeriod === null) {
      this.errorMessage = "装修免租期月份必填！";
      return false;
    }
  }
	//费用起算时间
	if (!this.rentStartTime) {
		this.errorMessage = "费用起算时间必填！";
		return false;
	}
	//续租提前月份
	if (!this.reletAheadMonth) {
		this.errorMessage = "续租提前月份必填！";
		return false;
	}
	//租金（月）
	if (this.rental === null) {
		this.errorMessage = "租金必填！";
		return false;
	}
	//大写租金
	if (!this.capitalRental) {
		this.errorMessage = "大写租金必填！";
		return false;
	}
  if (!this.depositMonth) {
    this.errorMessage = '履约保证金月数必填！'
    return false
  }
	//每几个月支付一次
	if (!this.intervalMonth) {
		this.errorMessage = "每几个月支付一次必填！";
		return false;
	}
  if (!this.invoiceType) {
    this.errorMessage = '发票类型必填！'
    return false
  }
	return true;
}

//根据当前的 spaceApply来填充一些字段信息。
ProtocolSpace.prototype.fillBySpaceApply = function () {

	if (this.spaceApply.type === SpaceApply.prototype.Type.NURSERY) {
		this.name = "开放工位租赁合同-" + this.spaceApply.companyName;
    this.depositMonth = 3;
	} else if (this.spaceApply.type === SpaceApply.prototype.Type.INCUBATOR) {
		this.name = "2号楼独立空间租赁合同-" + this.spaceApply.companyName;
		this.depositMonth = 1;
	} else if (this.spaceApply.type === SpaceApply.prototype.Type.ACCELERATOR) {
		this.name = "1号楼独立空间租赁合同-" + this.spaceApply.companyName;
    this.depositMonth = 1;
	} else if (this.spaceApply.type === SpaceApply.prototype.Type.CIRCULATE) {
    this.name = "流动工位租赁合同-" + this.spaceApply.companyName;
    this.depositMonth = 3;
  }

  this.type = this.spaceApply.type;
	this.partyB = this.spaceApply.companyName;
	this.address = this.spaceApply.address;
	this.area = this.spaceApply.area;
	this.propertyNo = this.spaceApply.propertyNo;

}

ProtocolSpace.prototype.fillByProtocolType = function () {
  if (this.spaceApply.companyName === null) {
    return
  }
  if (this.type === SpaceApply.prototype.Type.NURSERY) {
    this.name = '开放工位租赁合同-' + this.spaceApply.companyName;
    this.depositMonth = 3;
  } else if (this.type === SpaceApply.prototype.Type.INCUBATOR) {
    this.name = '2号楼独立空间租赁合同-' + this.spaceApply.companyName;
    this.depositMonth = 1;
  } else if (this.type === SpaceApply.prototype.Type.ACCELERATOR) {
    this.name = '1号楼独立空间租赁合同-' + this.spaceApply.companyName;
    this.depositMonth = 1;
  } else if (this.type === SpaceApply.prototype.Type.CIRCULATE) {
    this.name = "流动工位租赁合同-" + this.spaceApply.companyName;
    this.depositMonth = 3;
  }
}

ProtocolSpace.prototype.downloadPdfUrl = function () {
	return Vue.http.options.root + this.URL_DOWNLOAD_PDF.replace("{id}", this.id);
}

//修改签约信息扫描件
ProtocolSpace.prototype.saveScanning = function (successCallback, failureCallback){
  let that = this;

  let form = {
    id: this.id,
    "scanningCode": this.scanning.code
  };

  this.httpPost(this.URL_SCANNING, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, failureCallback);
}

//从当前状态允许变成的下一个状态列表
ProtocolSpace.prototype.availableStatusList = function () {
	let list = [];
	if (this.status === this.Status.NEW) {

		list.push(this.StatusMap[this.Status.PROCESSING]);
		list.push(this.StatusMap[this.Status.EXCEPTION]);

	} else if (this.status === this.Status.PROCESSING) {

		list.push(this.StatusMap[this.Status.EXCEPTION]);

	} else if (this.status === this.Status.EXCEPTION) {

		list.push(this.StatusMap[this.Status.PROCESSING]);

	}

	return list;

};

ProtocolSpace.prototype.validateChangeStatusForm = function () {

	if (!this.id) {
		this.errorMessage = "协议不存在！请刷新";
		return false;
	}
	if (!this.partyBRepresentative) {
		this.errorMessage = "请填写乙方代表！";
		return false;
	}

	if (!this.partyATime) {
		this.errorMessage = "请填写甲方签署时间！";
		return false;
	}
	if (!this.partyBTime) {
		this.errorMessage = "请填写乙方签署时间！";
		return false;
	}

	if (!this.scanning.exist()) {

		this.errorMessage = "请上传扫描件！";
		return false;
	}

	this.errorMessage = null;
	return true;
}

ProtocolSpace.prototype.httpStatus = function (status, reason, successCallback, failureCallback) {

	let attachmentsCodes = [];
	let form = null;
	if (status === Status.PROCESSING) {
		if (!this.validateChangeStatusForm()) {
			return;
		}

		this.attachments.forEach(tank => {
			attachmentsCodes.push(tank.code);
		});


		form = {
			"id": this.id,
			"status": status,
			"partyARepresentative": this.partyARepresentative,
			"partyBRepresentative": this.partyBRepresentative,
			"partyATime": simpleDateTime(this.partyATime),
			"partyBTime": simpleDateTime(this.partyBTime),

			"scanningCode": this.scanning.code,
			"attachmentsCodes": JSON.stringify(attachmentsCodes),
			"reason": reason
		};
	} else if (status === Status.EXCEPTION) {
		form = {
			"id": this.id,
			"status": status,
			"reason": reason
		};
	}


	let that = this;
	this.httpPost(this.URL_STATUS, form, function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, failureCallback);
}

ProtocolSpace.prototype.httpUploadAttachments = function (successCallback, failureCallback) {

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

/**
 * 归档状态不能编辑
 * 不是NEW状态不能编辑
 */
ProtocolSpace.prototype.canEdit = function () {

	if (this.archive) {
		return false;
	} else {
		if (this.status === Status.NEW) {
			return true;
		} else {
			return false;
		}
	}

}

/**
 * 只有NEW状态的可以删除。
 */
ProtocolSpace.prototype.canDel = function () {
	if (this.status === Status.NEW) {
		return true;
	} else {
		return false;
	}
}
//归档操作。
ProtocolSpace.prototype.httpArchive = function (reason, successCallback, failureCallback) {

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

//手动刷新过期的合同状态.
ProtocolSpace.prototype.httpRefreshStatus = function (successCallback, failureCallback) {

	let that = this;

	this.httpPost(this.URL_REFRESH_STATUS, {}, function (response) {

		successCallback && successCallback(response);
	}, failureCallback);


}
//发票领取信息
ProtocolSpace.prototype.httpSaveInvoice = function (type,name,phone,email,successCallback, failureCallback) {

  let that = this;
  let form = {
    id:this.id,
    type:type,
    name:name,
    phone:phone,
    email:email
  };
  this.httpPost(this.URL_INVOICE, form, function (response) {

    successCallback && successCallback(response);
  }, failureCallback);


}
