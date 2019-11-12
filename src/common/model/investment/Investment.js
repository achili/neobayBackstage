import BaseEntity from "../base/BaseEntity"
import Filter from "../base/Filter";
import {validateEmail} from "../../filter/validate";
import Project from "../project/Project";
import User from "../user/User";
import Vue from "vue";
import {isLocalStorageNameSupported, readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import InvestmentAssess from "./InvestmentAssess";
import InvestmentIntellectual from "./InvestmentIntellectual";
import InvestmentPatentCopyright from "./InvestmentPatentCopyright";
import InvestmentFinance from "./InvestmentFinance";
import InvestmentHonor from "./InvestmentHonor";
import InvestmentFinancing from "./InvestmentFinancing";
import InvestmentCore from "./InvestmentCore";
import InvestmentEquity from "./InvestmentEquity";
import Tank from "../tank/Tank";

let Status = {
  NEW: "NEW",
  APPLY: "APPLY",
  ALREADY_BUTTED:"ALREADY_BUTTED",
  REACH_FINANCING_INTENTION:"REACH_FINANCING_INTENTION",
  ALREADY_FINANCING:"ALREADY_FINANCING"
};

let StatusMap = {
  NEW: {
    name: "新建",
    value: "NEW",
    style: "success"
  },
  APPLY: {
    name: "已申请",
    value: "APPLY",
    style: "warning"
  },
  ALREADY_BUTTED: {
    name: "已对接",
    value: "ALREADY_BUTTED",
    style: "info"
  },
  REACH_FINANCING_INTENTION: {
    name: "达成融资意向",
    value: "REACH_FINANCING_INTENTION",
    style: "primary"
  },
  ALREADY_FINANCING: {
    name: "已融资",
    value: "ALREADY_FINANCING",
    style: "danger"
  }
};

let Type = {
  //基本信息
  "BASIC_INFO": "BASIC_INFO",
  //股权结构
  "EQUITY_STRUC": "EQUITY_STRUC",
  //人员结构
  "CORE_STRUC": "CORE_STRUC",
  //投融资
  "INVEST_INFO": "INVEST_INFO",
  //比赛获奖信息财务状况
  "HONOR_INFO": "HONOR_INFO",
  //财务情况
  "FINANCE_INFO": "FINANCE_INFO",
  //专利版权
  "PATENT_INFO": "PATENT_INFO",
  //知识产权
  "INTELLECT_INFO": "INTELLECT_INFO"
};
let Types = [
  {
    name: "基本信息",
    value: Type.BASIC_INFO,
    fa: "fa fa-dot-circle-o",
    index: 0,
    compulsory: true
  },
  {
    name: "股权结构",
    value: Type.EQUITY_STRUC,
    fa: "fa fa-dot-circle-o",
    index: 1,
    compulsory: true
  },
  {
    name: "人员结构",
    value: Type.CORE_STRUC,
    fa: "fa fa-dot-circle-o",
    index: 2,
    compulsory: true
  },
  {
    name: "财务情况",
    value: Type.FINANCE_INFO,
    fa: "fa fa-dot-circle-o",
    index: 5,
    compulsory: false
  },
  {
    name: "专利产权",
    value: Type.PATENT_INFO,
    fa: "fa fa-dot-circle-o",
    index: 6,
    compulsory: false
  },
  {
    name: "知识产权",
    value: Type.INTELLECT_INFO,
    fa: "fa fa-dot-circle-o",
    index: 7,
    compulsory: false
  },
  {
    name: "投融资",
    value: Type.INVEST_INFO,
    fa: "fa fa-dot-circle-o",
    index: 3,
    compulsory: false
  },
  {
    name: "比赛获奖信息",
    value: Type.ADD_INFO,
    fa: "fa fa-dot-circle-o",
    index: 4,
    compulsory: false
  }
];

export default function Investment() {

  //extend BaseEntity's Attributes.
  BaseEntity.call(this, arguments);
  //基本信息
  this.creator = new User();
  this.project = new Project();
  this.status = Status.NEW;
  this.companyName = null;
  this.organizationCode = null;
  this.principal = null;
  this.principalPhone = null;
  this.principalEmail = null;
  this.contacts = null;
  this.contactsPhone = null;
  this.contactsEmail = null;
  this.webOrApp = null;
  this.registrationType = null;//登记注册类型
  this.highTechType = null;
  this.industryType = null;
  this.enterpriseCharacteristics = null;//创业企业特征
  this.skillDirection = null;
  this.marketType = null;
  this.mainProducts = null;
  this.isAffiliatedCompany = null;//是否有关联公司
  //人员结构
  this.lastYearStaffNum = null;
  this.doctorsNum = null;
  this.overseasNum = null;
  this.thousandsPlanNum = null;
  this.fullTimeNum = null;//全职人员数
  this.partTimeJobNum = null;//兼职人数
  this.higherCollegeDegreeNum = null;
  //专利产权
  this.nationalNum = null;
  this.provincialAwards = null;
  this.foreignPatentsNum = null;
  this.technicalContractNum = null;
  this.technicalContractTradingValue = null;
  this.rdRecordNum = null;
  this.projectCenterNum = null;
  this.projectCenterNationalNum = null;
  this.projectCenterProvinceNum = null;
  this.projectCenterCityNum = null;
  this.projectNum = null;
  this.projectNationalNum = null;
  this.projectProvinceNum = null;
  this.projectCityNum = null;
  this.nationalFunding = null;
  this.provinceFunding = null;
  this.cityFunding = null;
  //
  this.investmentEquities = [];
  this.investmentCores = [];
  this.investmentFinancings = [];
  this.investmentHonors = [];
  this.investmentFinances = [];
  this.investmentPatentCopyrights = [];
  this.investmentIntellectuals = [];
  //反馈
  this.investmentAssesses = [];
  //附件
  this.industryProfile = new Tank();
  this.competitor = new Tank();
  this.businessModel = new Tank();
  //上传FA协议
  this.protocol = new Tank(".doc|.docx|.pdf|.jpg|.jpeg|.png", true, 50 * 1024 * 1024, "可上传doc,docx,pdf,jpg,jpeg,png格式的扫描件");
  //关注
  this.follows = [];
  this.isFollow = null;

    if (Vue.store.state.debug) {
    this.mockData();
  }
}

//extend BaseEntity
Investment.prototype = new BaseEntity();
Investment.prototype.constructor = Investment;

Investment.prototype.Status = Status;
Investment.prototype.StatusMap = StatusMap;
Investment.prototype.StatusList = Investment.prototype.getStatusList();

Investment.prototype.Type = Type;
Investment.prototype.Types = Types;

Investment.prototype.URL_STATUS = "/investment/status";
Investment.prototype.URL_ASSESS = "/investment/assess";
Investment.prototype.URL_UPLOAD_PROTOCOL = "/investment/upload/protocol";
Investment.prototype.URL_FOLLOW = "/investment/follow";
Investment.prototype.URL_ABOLISH = "/investment/abolish";


//测试数据。
Investment.prototype.mockData = function () {
  this.companyName = "上海华莱士有限责任公司";
  this.organizationCode = "159874263";
};

Investment.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("INPUT", "公司名称", "name"),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("HTTP_SELECTION", "所属项目", "projectId", null, Project)
  ];
};

//We use this method to get the full js Object.
Investment.prototype.render = function (obj, one2one = false) {

  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("creator", User);
  if (!one2one) {
    this.renderEntity("project", Project);
  }

  this.renderList("investmentEquities", InvestmentEquity);
  this.renderList("investmentCores", InvestmentCore);
  this.renderList("investmentFinancings", InvestmentFinancing);
  this.renderList("investmentHonors", InvestmentHonor);
  this.renderList("investmentFinances", InvestmentFinance);
  this.renderList("investmentPatentCopyrights", InvestmentPatentCopyright);
  this.renderList("investmentIntellectuals", InvestmentIntellectual);

  this.renderList("investmentAssesses", InvestmentAssess);

  this.renderEntity("industryProfile", Tank);
  this.renderEntity("competitor", Tank);
  this.renderEntity("businessModel", Tank);

  this.renderEntity("protocol", Tank);
  this.renderList("follows", User);


};

//股权结构
Investment.prototype.addEquity = function (equity) {
  this.investmentEquities.push(equity);
};
Investment.prototype.delEquity = function (equity) {
  let index = this.investmentEquities.indexOf(equity);
  if (index !== -1) {
    this.investmentEquities.splice(index, 1);
  }
};
//核心团队人员情况
Investment.prototype.addCore = function (core) {
  this.investmentCores.push(core);
};
Investment.prototype.delCore = function (core) {
  let index = this.investmentCores.indexOf(core);
  if (index !== -1) {
    this.investmentCores.splice(index, 1)
  }
};
//投融资
Investment.prototype.addFinancing = function (financing) {
  this.investmentFinancings.push(financing);
};
Investment.prototype.delFinancing = function (financing) {
  let index = this.investmentFinancings.indexOf(financing);
  if (index !== -1) {
    this.investmentFinancings.splice(index, 1)
  }
};
//比赛获奖信息
Investment.prototype.addHonors = function (honors) {
  this.investmentHonors.push(honors);
};
Investment.prototype.delHonors = function (honors) {
  let index = this.investmentHonors.indexOf(honors);
  if (index !== -1) {
    this.investmentHonors.splice(index, 1);
  }
};
//财务状况
Investment.prototype.addFinance = function (finance) {
  this.investmentFinances.push(finance);
};
Investment.prototype.delFinance = function (finance) {
  let index = this.investmentFinances.indexOf(finance);
  if (index !== -1) {
    this.investmentFinances.splice(index, 1);
  }
};
//专利产权
Investment.prototype.addPatent = function (patent) {
  this.investmentPatentCopyrights.push(patent);
};
Investment.prototype.delPatent = function (patent) {
  let index = this.investmentPatentCopyrights.indexOf(patent);
  if (index !== -1) {
    this.investmentPatentCopyrights.splice(index, 1);
  }
};
//知识产权
Investment.prototype.addIntellectual = function (intellectual) {
  this.investmentIntellectuals.push(intellectual);
};
Investment.prototype.delIntellectual = function (intellectual) {
  let index = this.investmentIntellectuals.indexOf(intellectual);
  if (index !== -1) {
    this.investmentIntellectuals.splice(index, 1);
  }
};
//将信息从本地读取出来。
Investment.prototype.renderFromLocalStorage = function () {
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
//将用户信息存储在本地。
Investment.prototype.saveToLocalStorage = function () {
  saveToLocalStorage(this.getTAG(), JSON.stringify(this));
};
//清除本地信息
Investment.prototype.clearLocalStorage = function () {
  removeLocalStorage(this.getTAG());
};

Investment.prototype.canEdit = function () {
  return true;
};
/**
 * 任何状态均可尝试去删除，后台返回结果是否可以删除。
 */
Investment.prototype.canDel = function () {
  return true;
};


Investment.prototype.getForm = function () {

  let investmentEquities = this.investmentEquities;
  let investmentEquitiesInfo = [];
  for (let i = 0; i < investmentEquities.length; i++) {
    let investmentEquity = investmentEquities[i];
    investmentEquitiesInfo.push(investmentEquity.getForm());
  }

  let investmentCores = this.investmentCores;
  let investmentCoresInfo = [];
  for (let i = 0; i < investmentCores.length; i++) {
    let investmentCore = investmentCores[i];
    investmentCoresInfo.push(investmentCore.getForm());
  }

  let investmentFinancings = this.investmentFinancings;
  let investmentFinancingsInfo = [];
  for (let i = 0; i < investmentFinancings.length; i++) {
    let investmentFinancing = investmentFinancings[i];
    investmentFinancingsInfo.push(investmentFinancing.getForm());
  }

  let investmentHonors = this.investmentHonors;
  let investmentHonorsInfo = [];
  for (let i = 0; i < investmentHonors.length; i++) {
    let investmentHonor = investmentHonors[i];
    investmentHonorsInfo.push(investmentHonor.getForm());
  }

  let investmentFinances = this.investmentFinances;
  let investmentFinancesInfo = [];
  for (let i = 0; i < investmentFinances.length; i++) {
    let investmentFinance = investmentFinances[i];
    investmentFinancesInfo.push(investmentFinance.getForm());
  }

  let investmentPatentCopyrights = this.investmentPatentCopyrights;
  let investmentPatentCopyrightsInfo = [];
  for (let i = 0; i < investmentPatentCopyrights.length; i++) {
    let investmentPatentCopyright = investmentPatentCopyrights[i];
    investmentPatentCopyrightsInfo.push(investmentPatentCopyright.getForm());
  }

  let investmentIntellectuals = this.investmentIntellectuals;
  let investmentIntellectualsInfo = [];
  for (let i = 0; i < investmentIntellectuals.length; i++) {
    let investmentIntellectual = investmentIntellectuals[i];
    investmentIntellectualsInfo.push(investmentIntellectual.getForm());
  }

  let investmentAssesses = this.investmentAssesses;
  let investmentAssessesInfo = [];
  for (let i = 0; i < investmentAssesses.length; i++) {
    let investmentAssess = investmentAssesses[i];
    investmentAssessesInfo.push(investmentAssess.getForm());
  }

  let form = {
    projectId: this.project.id,
    companyName: this.companyName,
    organizationCode: this.organizationCode,
    principal: this.principal,
    principalPhone: this.principalPhone,
    principalEmail: this.principalEmail,
    contacts: this.contacts,
    contactsPhone: this.contactsPhone,
    contactsEmail: this.contactsEmail,
    webOrApp: this.webOrApp,
    registrationType: this.registrationType,
    highTechType: this.highTechType,
    industryType: this.industryType,
    enterpriseCharacteristics: this.enterpriseCharacteristics,
    skillDirection: this.skillDirection,
    marketType: this.marketType,
    mainProducts: this.mainProducts,
    isAffiliatedCompany:this.isAffiliatedCompany,

    lastYearStaffNum: this.lastYearStaffNum,
    doctorsNum: this.doctorsNum,
    overseasNum: this.overseasNum,
    thousandsPlanNum: this.thousandsPlanNum,
    fullTimeNum: this.fullTimeNum,
    partTimeJobNum: this.partTimeJobNum,
    higherCollegeDegreeNum: this.higherCollegeDegreeNum,

    nationalNum: this.nationalNum,
    provincialAwards: this.provincialAwards,
    foreignPatentsNum: this.foreignPatentsNum,
    technicalContractNum: this.technicalContractNum,
    technicalContractTradingValue: this.technicalContractTradingValue,
    rdRecordNum: this.rdRecordNum,
    projectCenterNum: this.projectCenterNum,
    projectCenterNationalNum: this.projectCenterNationalNum,
    projectCenterProvinceNum: this.projectCenterProvinceNum,
    projectCenterCityNum: this.projectCenterCityNum,
    projectNum: this.projectNum,
    projectNationalNum: this.projectNationalNum,
    projectProvinceNum: this.projectProvinceNum,
    projectCityNum: this.projectCityNum,
    nationalFunding: this.nationalFunding,
    provinceFunding: this.provinceFunding,
    cityFunding: this.cityFunding,

    investmentEquitiesInfo: JSON.stringify(investmentEquitiesInfo),
    investmentCoresInfo: JSON.stringify(investmentCoresInfo),
    investmentFinancingsInfo: JSON.stringify(investmentFinancingsInfo),
    investmentHonorsInfo: JSON.stringify(investmentHonorsInfo),
    investmentFinancesInfo: JSON.stringify(investmentFinancesInfo),
    investmentPatentCopyrightsInfo: JSON.stringify(investmentPatentCopyrightsInfo),
    investmentIntellectualsInfo: JSON.stringify(investmentIntellectualsInfo),

    investmentAssessesInfo: JSON.stringify(investmentAssessesInfo),

    industryProfileCode: this.industryProfile.code,
    competitorCode: this.competitor.code,
    businessModelCode: this.businessModel.code

  };

  if (this.id) {
    form.id = this.id;
  }
  return form;
};

Investment.prototype.validate = function () {
  if (!this.project.id) {
    this.errorMessage = "项目必填！";
    return false;
  }
  if (!this.companyName) {
    this.errorMessage = "企业名称必填！";
    return false;
  }
  if (!this.organizationCode) {
    this.errorMessage = "组织机构代码必填！";
    return false;
  }
  if (!this.principal) {
    this.errorMessage = "实际负责人必填！";
    return false;
  }
  if (!this.principalPhone) {
    this.errorMessage = "负责人电话必填！";
    return false;
  }
  if (!this.principalEmail) {
    this.errorMessage = "负责人邮箱必填！";
    return false;
  }
  if (!validateEmail(this.principalEmail)) {
    this.errorMessage = "负责人邮箱格式不正确！";
    return false;
  }
  if (!this.contacts) {
    this.errorMessage = "联系人必填！";
    return false;
  }
  if (!this.contactsPhone) {
    this.errorMessage = "联系人电话必填！";
    return false;
  }
  if (!this.contactsEmail) {
    this.errorMessage = "联系人邮箱必填！";
    return false;
  }
  if (!validateEmail(this.contactsEmail)) {
    this.errorMessage = "联系人邮箱格式不正确！";
    return false;
  }
  if (!this.highTechType) {
    this.errorMessage = "高新技术分类必填！";
    return false;
  }
  if (!this.industryType) {
    this.errorMessage = "行业分类必填！";
    return false;
  }
  if (!this.skillDirection) {
    this.errorMessage = "专业技术方向必填！";
    return false;
  }
  if (!this.marketType) {
    this.errorMessage = "市场分类必填！";
    return false;
  }
  if (!this.webOrApp) {
    this.errorMessage = "网站/APP必填！";
    return false;
  }
  if (!this.mainProducts) {
    this.errorMessage = "主营产品必填！";
    return false;
  }
  if (this.investmentCores.length === 0) {
    this.errorMessage = "核心团队人员至少一个！";
    return false;
  }
  return true;
};

Investment.prototype.validateStar = function () {
  if (!this.skillDirection) {
    this.errorMessage = "专业技术方向必填！";
    return false;
  }
  if (!this.marketType) {
    this.errorMessage = "市场分类必填！";
    return false;
  }
  if (!this.webOrApp) {
    this.errorMessage = "网站/APP必填！";
    return false;
  }
  if (!this.mainProducts) {
    this.errorMessage = "主营产品必填！";
    return false;
  }
  if (this.investmentCores.length === 0) {
    this.errorMessage = "核心团队人员至少一个！";
    return false;
  }
  return true;
};

Investment.prototype.httpStatus = function (status, successCallback, failureCallback) {
  this.httpPost(this.URL_STATUS, {"id": this.id, status}, successCallback, failureCallback);
};
//项目评价
Investment.prototype.httpAssess = function (team,industry,technology,finance,comment, successCallback, failureCallback) {

  this.httpPost(this.URL_ASSESS, {"id": this.id, team,industry,technology,finance,comment}, successCallback, failureCallback);
};

//上传FA协议
Investment.prototype.httpUploadProtocol = function (successCallback, failureCallback) {

  let form = {
    'id': this.id,
    "protocolCode": this.protocol.code
  };
  let that = this;
  this.httpPost(this.URL_UPLOAD_PROTOCOL, form, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response)
  }, failureCallback)
};

//关注
Investment.prototype.httpFollow = function (userId,successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_FOLLOW, {"id":this.id,userId}, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response)
  }, failureCallback)
};

//取消关注
Investment.prototype.httpAbolish = function (userId,successCallback, failureCallback) {
  let that = this;
  this.httpPost(this.URL_ABOLISH, {"id":this.id,userId}, function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response)
  }, failureCallback)
};




