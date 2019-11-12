import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import Tank from "../../tank/Tank";
import TypeProcess from "../../keeper/business/TypeProcess";
import TableCell from "./TableCell";
import TableAdd from "./TableAdd";
import SpaceRegional from "../../space/SpaceRegional";

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
	OK: "OK",
	ERROR: "ERROR"
};
let StatusMap = {
	OK: {
		name: "正常",
		value: "OK",
		style: "success"
	},
	ERROR: {
		name: "错误",
		value: "ERROR",
		style: "error"
	}
};

export default function KeeperBusinessType() {

	BaseEntity.call(this, arguments);
	this.name = null;
	this.description = null;
	this.poster = new Tank("image", false, 1024 * 1024, "图片大小不超过1M");
	this.posterUrl = null;
	this.type = "";
  //服务流程
	this.processTypes = [];
  //登记审核
	this.examineCells = [];
	//提供服务
  this.serviceCells = [];
  //注意事项
	this.tableCells = [];
  //所需材料
	this.materialCells = [];
	this.status = Status.OK;
}


KeeperBusinessType.prototype = new BaseEntity();
KeeperBusinessType.prototype.constructor = KeeperBusinessType;

KeeperBusinessType.prototype.Status = Status;
KeeperBusinessType.prototype.StatusMap = StatusMap;
KeeperBusinessType.prototype.StatusList = KeeperBusinessType.prototype.getStatusList();

KeeperBusinessType.prototype.Type = Type;
KeeperBusinessType.prototype.TypeMap = TypeMap;
KeeperBusinessType.prototype.TypeList = KeeperBusinessType.prototype.getTypeList();


KeeperBusinessType.prototype.getFilters = function () {
	return [
		new Filter("INPUT", "名称", "name"),
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("SELECTION", "十大服务类型", "type", this.getTypeList()),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};


KeeperBusinessType.prototype.getForm = function () {
  let processTypes = [];
  let tableCells = [];
  let materialCells = [];
  let examineCells = [];
  let serviceCells = [];
  this.processTypes.forEach(processType => {
    processTypes.push(processType.getForm());
  });
  this.tableCells.forEach(tableCell => {
    tableCells.push(tableCell.getForm());
  });
  this.materialCells.forEach(materialCell => {
    materialCells.push(materialCell.getForm());
  });
  this.examineCells.forEach(examineCell => {
    examineCells.push(examineCell.getForm());
  });
  this.serviceCells.forEach(serviceCell => {
    serviceCells.push(serviceCell.getForm());
  });

	let form = {
    spaceRegional:this.spaceRegional.id,
		name: this.name,
    type: this.type,

    processTypes: JSON.stringify(processTypes),
    examineCells: JSON.stringify(examineCells),
    serviceCells: JSON.stringify(serviceCells),
    tableCells: JSON.stringify(tableCells),
    materialCells: JSON.stringify(materialCells),
    posterCode: this.poster.code,
		description: this.description
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
};

KeeperBusinessType.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  //JSON.parse(),将一个string类型的数组转行成对象
  if (typeof this.processTypes === 'string') {
    this.processTypes = JSON.parse(this.processTypes);
    this.renderList("processTypes", TypeProcess);
  }
  if (typeof this.tableCells === 'string') {
    this.tableCells = JSON.parse(this.tableCells);
    this.renderList("tableCells",  TableCell);
  }
  if (typeof this.materialCells === 'string') {
    this.materialCells = JSON.parse(this.materialCells);
    this.renderList("materialCells", TableCell);
  }
  if (typeof this.examineCells === 'string') {
    this.examineCells = JSON.parse(this.examineCells);
    this.renderList("examineCells", TableAdd);
  }
  if (typeof this.serviceCells === 'string') {
    this.serviceCells = JSON.parse(this.serviceCells);
    this.renderList("serviceCells", TableAdd);
  }

  this.renderEntity("poster", Tank);
};

KeeperBusinessType.prototype.validate = function () {
  if (!this.spaceRegional.id) {
    this.errorMessage = "空间地必选！";
    return false;
  }
	if (!this.name) {
		this.errorMessage = "服务名称必填！";
		return false;
	}
	if (!this.poster.code) {
    this.errorMessage = "图片必填！";
    return false;
  }
  if (!this.description) {
    this.errorMessage = "描述必填!";
    return false;
  }
  if (!this.type) {
    this.errorMessage = "服务类型必选！";
    return false;
  }
  if (!this.processTypes.length) {
    this.errorMessage = "至少选择一个服务流程!";
    return false;
  }
  if (!this.tableCells.length) {
    this.errorMessage = "至少填写一个注意事项！";
    return false;
  }
  if (!this.materialCells.length) {
    this.errorMessage = "至少添加一个材料！";
    return false;
  }

	return true;
};

KeeperBusinessType.prototype.addExamineCell = function () {
  let examineCell = new TableAdd();
  this.examineCells.push(examineCell);
};

KeeperBusinessType.prototype.addServiceCell = function () {
  let serviceCell = new TableAdd();
  this.serviceCells.push(serviceCell);
};

KeeperBusinessType.prototype.addTableCell = function () {
  let tableCell = new TableCell();
  this.tableCells.push(tableCell);
};

KeeperBusinessType.prototype.addMaterialCell = function () {
  let materialCell = new TableCell();
  this.materialCells.push(materialCell);
};

KeeperBusinessType.prototype.subExamineCell = function (index) {
  if (index !== -1) {
    this.examineCells.splice(index, 1);
  }
};

KeeperBusinessType.prototype.subServiceCell = function (index) {
  if (index !== -1) {
    this.serviceCells.splice(index, 1);
  }
};

KeeperBusinessType.prototype.subTableCell = function (index) {
  if (index !== -1) {
    this.tableCells.splice(index, 1);
  }
};

KeeperBusinessType.prototype.subMaterialCell = function(index) {
  if (index !== -1) {
    this.materialCells.splice(index, 1);
  }
};
