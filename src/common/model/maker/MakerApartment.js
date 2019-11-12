import BaseEntity from "../base/BaseEntity";
import User from "../user/User";
import Company from "../company/Company";
import Tank from "../tank/Tank";
import MakerMarket from "./MakerMarket";
import Filter from "../base/Filter";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import MakerOrganization from "./MakerOrganization";
import SpaceRegional from "../space/SpaceRegional";
import MakerSimpleApply from "./MakerSimpleApply";

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
};

export default function MakerApartment () {

  BaseEntity.call(this,arguments);
  this.creator = new User();
  this.makerOrganization = new MakerOrganization();
  this.applicantName = null;
  this.education = null;
  //职称
  this.title = null;
  //目前住房情况
  this.circumstances = null;
  this.houseApply = null;
  this.address = null;
  this.phone = null;

  this.company = new Company();
  this.companyName = null;
  //企业性质
  this.companyProperty = null;
  this.mainProducts = null;
  this.officeAddress = null;
  this.registeredAddress = null;
  this.isCompanyHighTech = null;

  //部门或者岗位
  this.department = null;
  this.post = null;
  this.year = null;
  this.contacts = null;
  this.contactsPhone = null;

  this.isHighTech = null;
  this.isNoHouse = null;
  this.isBachelorDegree = null;

  this.identityCard = new Tank();
  this.diplomaCertificate = new Tank();
  this.laborContract = new Tank();
  this.billOfPayment = new Tank();
  this.cognizanceMaterial = [];
  this.status = Status.PROCESSING;

}

MakerApartment.prototype = new BaseEntity();
MakerApartment.prototype.constructor = MakerApartment;

MakerApartment.prototype.URL_STATUS = "/maker/apartment/status";
MakerApartment.prototype.URL_ASSESS = "/maker/apartment/assess";

MakerApartment.prototype.Status = Status;
MakerApartment.prototype.StatusMap = StatusMap;
MakerApartment.prototype.StatusList = MakerApartment.prototype.getStatusList();

MakerApartment.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter('INPUT', '关键字', 'keyword'),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ]
};

MakerApartment.prototype.render = function (obj,one2one = false) {
  BaseEntity.prototype.render.call(this,obj);
  this.renderEntity("creator", User);
  this.renderEntity("company",Company);

  this.renderEntity("identityCard", Tank);
  this.renderEntity("diplomaCertificate", Tank);
  this.renderEntity("laborContract", Tank);
  this.renderEntity("billOfPayment", Tank);

  this.renderList("cognizanceMaterial", Tank);
  this.renderEntity("makerOrganization", MakerOrganization);

  // if(this.cognizanceMaterialInfo){
  //   if(this.cognizanceMaterialInfo.length !== 0 ){
  //     this.cognizanceMaterialInfo = JSON.parse(this.cognizanceMaterialInfo)
  //   }
  // }
};

MakerApartment.prototype.getForm = function () {
  let cognizanceMaterialInfo = [];
  if(this.cognizanceMaterial && this.cognizanceMaterial.length){
    for(let i = 0; i < this.cognizanceMaterial.length; i++ ){
      let tank = this.cognizanceMaterial[i];
      if(tank.exist()){
        cognizanceMaterialInfo.push(tank.code);
      }
    }
  }
  let form = {
    applicantName: this.applicantName,
    education: this.education,
    title: this.title,
    circumstances: this.circumstances,
    houseApply: this.houseApply,
    address: this.address,
    phone: this.phone,

    companyId: this.company.id,
    companyName: this.companyName,
    companyProperty: this.companyProperty,
    mainProducts: this.mainProducts,
    officeAddress: this.officeAddress,
    registeredAddress: this.registeredAddress,
    isCompanyHighTech: this.isCompanyHighTech,

    department: this.department,
    post: this.post,
    year: this.year,
    contacts: this.contacts,
    contactsPhone: this.contactsPhone,

    isHighTech: this.isHighTech,
    isNoHouse: this.isNoHouse,
    isBachelorDegree: this.isBachelorDegree,

    identityCardCode: this.identityCard.code,
    diplomaCertificateCode: this.diplomaCertificate.code,
    laborContractCode: this.laborContract.code,
    billOfPaymentCode: this.billOfPayment.code,
    cognizanceMaterialInfo: JSON.stringify(cognizanceMaterialInfo),
    makerOrganizationId: this.makerOrganization.id
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

MakerApartment.prototype.validate = function () {
  if (!this.applicantName) {
    this.errorMessage = "申请人必填！";
    return false;
  }
  if (!this.education) {
    this.errorMessage = "学历必填！";
    return false;
  }
  if (!this.circumstances) {
    this.errorMessage = "目前住房情况必填！";
    return false;
  }
  if (!this.houseApply) {
    this.errorMessage = "申请房源必填！";
    return false;
  }
  if (!this.address) {
    this.errorMessage = "联系地址必填！";
    return false;
  }
  if (!this.phone) {
    this.errorMessage = "联系电话必填！";
    return false;
  }
  if (!this.company.id) {
    this.errorMessage = "请选择所在企业！";
    return false;
  }
  if (!this.mainProducts) {
    this.errorMessage = "企业主导产业必填！";
    return false;
  }
  if (!this.officeAddress) {
    this.errorMessage = "企业经营地址必填！";
    return false;
  }
  if (!this.registeredAddress) {
    this.errorMessage = "企业注册地址必填！";
    return false;
  }
  /*
  if (this.isCompanyHighTech === null) {
    this.errorMessage = "企业是否为高科技产业企业必填！";
    return false;
  }*/
  if (!this.department) {
    this.errorMessage = "所在部门或岗位必填！";
    return false;
  }
  if (!this.post) {
    this.errorMessage = "职务必填！";
    return false;
  }
  if (!this.year) {
    this.errorMessage = "为企业服务年限必填！";
    return false;
  }
  if (!this.contacts) {
    this.errorMessage = "单位联系人必填！";
    return false;
  }
  if (!this.contactsPhone) {
    this.errorMessage = "单位联系电话必填！";
    return false;
  }

  if (!this.identityCard.code) {
    this.errorMessage = "身份证必需添加！";
    return false;
  }
  if (!this.diplomaCertificate.code) {
    this.errorMessage = "学历证书必需添加！";
    return false;
  }
  if (!this.laborContract.code) {
    this.errorMessage = "合同或者劳动合同必需添加！";
    return false;
  }
  if (!this.billOfPayment.code) {
    this.errorMessage = "交纳票据必需添加！";
    return false;
  }
  if (!this.cognizanceMaterial) {
    this.errorMessage = "认定材料及证明材料必需添加！";
    return false;
  }

  return true;
};

//将信息从本地读取出来。
MakerApartment.prototype.renderFromLocalStorage = function () {
  try {
    let String = readLocalStorage(this.getTAG());
    if (String) {
      let json = JSON.parse(String);
      this.render(json);
    }
  } catch (e) {
    removeLocalStorage(this.getTAG());
  }
};
MakerApartment.prototype.saveToLocalStorage = function () {
  saveToLocalStorage(this.getTAG(), JSON.stringify(this));
};
//清除本地信息
MakerApartment.prototype.clearLocalStorage = function () {
  removeLocalStorage(this.getTAG());
};

//从当前状态允许变成的下一个状态列表
MakerApartment.prototype.finishStatusList = function () {
  let list = [];
  list.push(this.StatusMap[this.Status.FINISH]);
  return list;
};

MakerApartment.prototype.httpStatus = function (status, reason, successCallback, failureCallback) {
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

//项目评价
MakerApartment.prototype.httpAssess = function (service,comment, successCallback, failureCallback) {

  this.httpPost(this.URL_ASSESS, {"id": this.id, service,comment}, successCallback, failureCallback);
};
