import BaseEntity from "../base/BaseEntity";

import Filter from "../base/Filter";
import User from "../user/User";
import {simpleDateTime, str2Date} from "../../filter/time";
import Project from "../project/Project";
import SpaceRegional from "../space/SpaceRegional";

export default function Torch2017() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.user = new User();

  this.project = new Project();

  //1  企业名称
  this.businessName = null;
  // 2 组织机构代码或统一社会信用代码
  this.organizationCode = null;
  //3  企业成立时间
  this.businessStartTime = new Date();
  //4  企业入驻时间
  this.businessEntryTime = new Date();
  //5 行业类别
  this.industryCategory = null;
  //6 企业登记注册类型
  this.registrationType = null;
  //7 企业所属技术领域
  this.technicalField = null;
  //8 企业纳税人类型
  this.taxpayerType = null;
  //9 是否与创业导师建立辅导关系
  this.coachRelationship = null;
  //10 是否毕业企业
  this.graduateEnterprise = null;
  //11 毕业时间
  this.graduateTime = new Date();
  //12 是否高新技术企业
  this.technologyEnterprises = null;
  //13 企业主要负责人创业特征
  this.entrepreneurialCharacteristics = null;
  //14 企业主要负责人是否为连续创业者
  this.continuousEntrepreneur = null;
  //15 企业主要负责人性别
  this.sex = null;
  //16 获得天使或风险投资额
  this.investmentAmount = null;
  //17 占用孵化器场地面积
  this.incubatorArea = null;
  //18 企业成立时注册资本
  this.registeredCapital = null;
  //19 在孵企业总收入
  this.totalIncome = null;
  //20 在孵企业净利润
  this.netProfit = null;
  //21 在孵企业进口总额
  this.totalImport = null;
  //22 在孵企业研究与实验发展经费支出
  this.expenditure = null;
  //23 在孵企业实际上缴税费
  this.payFees = null;

  //24 企业从业人员情况
  //在孵企业从业人员
  this.employeesInBusiness = null;
  //博士
  this.doctor = null;
  //大专以上
  this.juniorCollege = null;
  //留学人员
  this.abroadStudent = null;
  //千人计划人数
  this.thousandPlan = null;
  //吸纳应届大学毕业生
  this.graduates = null;

  //25 企业知识产权情况
  //当年知识产权申请数
  this.applicationNumber = null;
  //当年知识产权授权数
  this.authorizedNumber = null;
  //拥有有效知识产权数
  this.propertyRightNumber = null;
  //发明专利
  this.patent = null;
  //软件著作权
  this.softwareCopyRight = null;
  //植物新品种
  this.plantVariety = null;
  //集成电路布图
  this.circuitLayout = null;
  //购买国外专利数
  this.patentNumber = null;
  //技术合同交易数量
  this.transactionNumber = null;
  //技术合同交易额
  this.transactionForehead = null;
  //当年承担国家级科技计划项目数
  this.nationalProject = null;
  //当年获得省级以上奖励
  this.provincialAward = null;

  //26 统计信息
  //单位负责人
  this.unitHead = null;
  //统计负责人
  this.statisticsHead = null;
  //填表人
  this.fillForm = null;
  //联系电话
  this.phone = null;

  // if(Vue.store.state.debug) {
  //    // 1  企业名称
  //   this.businessName = "呵呵哒";
  //   // 2 组织机构代码或统一社会信用代码
  //   this.organizationCode = "呵呵哒";
  //   //3  企业成立时间
  //   this.businessStartTime = new Date();
  //   //4  企业入驻时间
  //   this.businessEntryTime = new Date();
  //   //5 行业类别
  //   this.industryCategory = "其它";
  //   //6 企业登记注册类型
  //   this.registrationType = "呵呵哒";
  //   //7 企业所属技术领域
  //   this.technicalField = "电子信息";
  //   //8 企业纳税人类型
  //   this.taxpayerType = "一般纳税人";
  //   //9 是否与创业导师建立辅导关系
  //   this.coachRelationship = "是";
  //   //10 是否毕业企业
  //   this.graduateEnterprise = "是";
  //   //11 毕业时间
  //   this.graduateTime = new Date();
  //   //12 是否高新技术企业
  //   this.technologyEnterprises = "是";
  //   //13 企业主要负责人创业特征
  //   this.entrepreneurialCharacteristics = "大学生创业";
  //   //14 企业主要负责人是否为连续创业者
  //   this.continuousEntrepreneur = "是";
  //   //15 企业主要负责人性别
  //   this.sex = "男";
  //   //16 获得天使或风险投资额
  //   this.investmentAmount = 110;
  //   //17 占用孵化器场地面积
  //   this.incubatorArea = 110;
  //   //18 企业成立时注册资本
  //   this.registeredCapital = 110;
  //   //19 在孵企业总收入
  //   this.totalIncome = 110;
  //   //20 在孵企业净利润
  //   this.netProfit = 110;
  //   //21 在孵企业进口总额
  //   this.totalImport = 110;
  //   //22 在孵企业研究与实验发展经费支出
  //   this.expenditure = 110;
  //   //23 在孵企业实际上缴税费
  //   this.payFees = 110;
  //   //24 企业从业人员情况
  //在孵企业从业人员
  // this.employeesInBusiness = 100;
  //   //博士
  //   this.doctor = 110;
  //   //大专以上
  //   this.juniorCollege = 110;
  //   //留学人员
  //   this.abroadStudent = 110;
  //   //千人计划人数
  //   this.thousandPlan = 110;
  //   //吸纳应届大学毕业生
  //   this.graduates = 110;
  //
  //   //25 企业知识产权情况
  //   //当年知识产权申请数
  //   this.applicationNumber = 110;
  //   //当年知识产权授权数
  //   this.authorizedNumber = 110;
  //   //拥有有效知识产权数
  //   this.propertyRightNumber = 110;
  //   //发明专利
  //   this.patent = 110;
  //   //软件著作权
  //   this.softwareCopyRight = 110;
  //   //植物新品种
  //   this.plantVariety = 110;
  //   //集成电路布图
  //   this.circuitLayout = 110;
  //   //购买国外专利数
  //   this.patentNumber = 110;
  //   //技术合同交易数量
  //   this.transactionNumber = 110;
  //   //技术合同交易额
  //   this.transactionForehead = 110;
  //   //当年承担国家级科技计划项目数
  //   this.nationalProject = 110;
  //   //当年获得省级以上奖励
  //   this.provincialAward = 110;
  //
  //   //26 统计信息
  //   //单位负责人
  //   this.unitHead = "呵呵哒";
  //   //统计负责人
  //   this.statisticsHead = "呵呵哒";
  //   //填表人
  //   this.fillForm = "呵呵哒";
  //   //联系电话
  //   this.phone = "呵呵哒";
  // }

}

//extend BaseEntity's methods.
Torch2017.prototype = new BaseEntity();
Torch2017.prototype.constructor = Torch2017;


Torch2017.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("INPUT", "关键字", "keyword"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

Torch2017.prototype.getForm = function () {

  let form = {
    projectId: this.project.id,
    businessName: this.businessName,
    organizationCode: this.organizationCode,
    businessStartTime: simpleDateTime(this.businessStartTime),
    businessEntryTime: simpleDateTime(this.businessEntryTime),
    industryCategory: this.industryCategory,
    registrationType: this.registrationType,
    technicalField: this.technicalField,
    taxpayerType: this.taxpayerType,
    coachRelationship: this.coachRelationship,
    graduateEnterprise: this.graduateEnterprise,
    graduateTime: simpleDateTime(this.graduateTime),
    technologyEnterprises: this.technologyEnterprises,
    entrepreneurialCharacteristics: this.entrepreneurialCharacteristics,
    continuousEntrepreneur: this.continuousEntrepreneur,
    sex: this.sex,
    investmentAmount: this.investmentAmount,
    incubatorArea: this.incubatorArea,
    registeredCapital: this.registeredCapital,
    totalIncome: this.totalIncome,
    netProfit: this.netProfit,
    totalImport: this.totalImport,
    expenditure: this.expenditure,
    payFees: this.payFees,
    employeesInBusiness: this.employeesInBusiness,
    doctor: this.doctor,
    juniorCollege: this.juniorCollege,
    abroadStudent: this.abroadStudent,
    thousandPlan: this.thousandPlan,
    graduates: this.graduates,
    applicationNumber: this.applicationNumber,
    authorizedNumber: this.authorizedNumber,
    propertyRightNumber: this.propertyRightNumber,
    patent: this.patent,
    softwareCopyRight: this.softwareCopyRight,
    plantVariety: this.plantVariety,
    circuitLayout: this.circuitLayout,
    patentNumber: this.patentNumber,
    transactionNumber: this.transactionNumber,
    transactionForehead: this.transactionForehead,
    nationalProject: this.nationalProject,
    provincialAward: this.provincialAward,
    unitHead: this.unitHead,
    statisticsHead: this.statisticsHead,
    fillForm: this.fillForm,
    phone: this.phone
  };
  if (this.id) {
    form.id = this.id;
  }

  return form;
};

//Extend some all the things include arrays. More powerful than extend.
Torch2017.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);

  this.businessStartTime = str2Date(this.businessStartTime);
  this.businessEntryTime = str2Date(this.businessEntryTime);
  this.graduateTime = str2Date(this.graduateTime);

  this.renderEntity("user", User);
  this.renderEntity("project", Project);

};

Torch2017.prototype.validate = function () {

  //    1  企业名称
  if (!this.businessName) {
    this.errorMessage = "1 企业名称必填！";
    return false;
  }

  // 2 组织机构代码或统一社会信用代码
  if (!this.organizationCode) {
    this.errorMessage = "2 组织机构代码或统一社会信用代码必填！";
    return false;
  }

  //3  企业成立时间
  if (!this.businessStartTime) {
    this.errorMessage = "3 企业成立时间必填！";
    return false;
  }

  //4  企业入驻时间
  if (!this.businessEntryTime) {
    this.errorMessage = "4 企业入驻时间必填！";
    return false;
  }

  //5 企业登记注册类型
  if (!this.registrationType) {
    this.errorMessage = "5 企业登记注册类型必填！";
    return false;
  }

  //6 行业分类
  if (!this.industryCategory) {
    this.errorMessage = "6 行业分类必填！";
    return false;
  }

  //7 企业所属技术领域
  if (!this.technicalField) {
    this.errorMessage = "7 企业所属技术领域必填！";
    return false;
  }

  //8 企业纳税人类型
  if (!this.taxpayerType) {
    this.errorMessage = "8 企业纳税人类型必填！";
    return false;
  }

  //9 是否与创业导师建立辅导关系
  if (!this.coachRelationship) {
    this.errorMessage = "9 是否与创业导师建立辅导关系必填！";
    return false;
  }

  //10 是否毕业企业
  if (!this.graduateEnterprise) {
    this.errorMessage = "10 是否毕业企业必填！";
    return false;
  }

  //12 是否高新技术企业
  if (!this.technologyEnterprises) {
    this.errorMessage = "12 是否高新技术企业必填！";
    return false;
  }

  //13 企业主要负责人创业特征
  if (!this.entrepreneurialCharacteristics) {
    this.errorMessage = "13 企业主要负责人创业特征必填！";
    return false;
  }

  //14 企业主要负责人是否为连续创业者
  if (!this.continuousEntrepreneur) {
    this.errorMessage = "14 企业主要负责人是否为连续创业者必填！";
    return false;
  }

  //15 企业主要负责人性别
  if (!this.sex) {
    this.errorMessage = "15 企业主要负责人性别必填！";
    return false;
  }

  //16 获得天使或风险投资额
  if (this.investmentAmount == null || this.investmentAmount === "") {
    this.errorMessage = "16 获得天使或风险投资额必填！";
    return false;
  }

  //17 占用孵化器场地面积
  if (this.incubatorArea == null || this.incubatorArea === "") {
    this.errorMessage = "17 占用孵化器场地面积必填！";
    return false;
  }

  //18 企业成立时注册资本
  if (this.registeredCapital == null || this.registeredCapital === "") {
    this.errorMessage = "18 企业成立时注册资本必填！";
    return false;
  }

  //19 在孵企业总收入
  if (this.totalIncome == null || this.totalIncome === "") {
    this.errorMessage = "19 在孵企业总收入必填！";
    return false;
  }

  //20 在孵企业净利润
  if (this.netProfit == null || this.netProfit === "") {
    this.errorMessage = "20 在孵企业净利润必填！";
    return false;
  }

  //21 在孵企业进口总额
  if (this.totalImport == null || this.totalImport === "") {
    this.errorMessage = "21 在孵企业进口总额必填！";
    return false;
  }

  //22 在孵企业研究与实验发展经费支出
  if (this.expenditure == null || this.expenditure === "") {
    this.errorMessage = "22 在孵企业研究与实验发展经费支出必填！";
    return false;
  }

  //23 在孵企业实际上缴税费
  if (this.payFees == null || this.payFees === "") {
    this.errorMessage = "23 在孵企业实际上缴税费必填！";
    return false;
  }

  //24 企业从业人员情况
  //在孵企业从业人员
  if (this.employeesInBusiness == null || this.employeesInBusiness === "") {
    this.errorMessage = "24 在孵企业从业人员必填!";
    return false;
  }
  //博士
  if (this.doctor == null || this.doctor === "") {
    this.errorMessage = "24 博士必填！";
    return false;
  }

  //大专以上
  if (this.juniorCollege == null || this.juniorCollege === "") {
    this.errorMessage = "24 大专以上必填！";
    return false;
  }

  //留学人员
  if (this.abroadStudent == null || this.abroadStudent === "") {
    this.errorMessage = "24 留学人员必填！";
    return false;
  }

  //千人计划人数
  if (this.thousandPlan == null || this.thousandPlan === "") {
    this.errorMessage = "24 千人计划人数必填！";
    return false;
  }

  //吸纳应届大学毕业生
  if (this.graduates == null || this.graduates === "") {
    this.errorMessage = "24 吸纳应届大学毕业生必填！";
    return false;
  }

  //25 企业知识产权情况
  //当年知识产权申请数
  if (this.applicationNumber == null || this.applicationNumber === "") {
    this.errorMessage = "25 当年知识产权申请数必填！";
    return false;
  }

  //当年知识产权授权数
  if (this.authorizedNumber == null || this.authorizedNumber === "") {
    this.errorMessage = "25 当年知识产权授权数必填！";
    return false;
  }

  //拥有有效知识产权数
  if (this.propertyRightNumber == null || this.propertyRightNumber === "") {
    this.errorMessage = "25 拥有有效知识产权数必填！";
    return false;
  }

  //发明专利
  if (this.patent == null || this.patent === "") {
    this.errorMessage = "25 发明专利必填！";
    return false;
  }

  //软件著作权
  if (this.softwareCopyRight == null || this.softwareCopyRight === "") {
    this.errorMessage = "25 软件著作权必填！";
    return false;
  }

  //植物新品种
  if (this.plantVariety == null || this.plantVariety === "") {
    this.errorMessage = "25 植物新品种必填！";
    return false;
  }

  //集成电路布图
  if (this.circuitLayout == null || this.circuitLayout === "") {
    this.errorMessage = "25 集成电路布图必填！";
    return false;
  }

  //购买国外专利数
  if (this.patentNumber == null || this.patentNumber === "") {
    this.errorMessage = "25 购买国外专利数必填！";
    return false;
  }

  //技术合同交易数量
  if (this.transactionNumber == null || this.transactionNumber === "") {
    this.errorMessage = "25 技术合同交易数量必填！";
    return false;
  }

  //技术合同交易额
  if (this.transactionForehead == null || this.transactionForehead === "") {
    this.errorMessage = "25 技术合同交易额必填！";
    return false;
  }

  //当年承担国家级科技计划项目数
  if (this.nationalProject == null || this.nationalProject === "") {
    this.errorMessage = "25 当年承担国家级科技计划项目数必填！";
    return false;
  }

  //当年获得省级以上奖励
  if (this.provincialAward == null || this.provincialAward === "") {
    this.errorMessage = "25 当年获得省级以上奖励必填！";
    return false;
  }

  //26 统计信息
  //单位负责人
  if (!this.unitHead) {
    this.errorMessage = "26 单位负责人必填！";
    return false;
  }

  //统计负责人
  if (!this.statisticsHead) {
    this.errorMessage = "26 统计负责人必填！";
    return false;
  }

  //填表人
  if (!this.fillForm) {
    this.errorMessage = "26 填表人必填！";
    return false;
  }

  //联系电话
  if (!this.phone) {
    this.errorMessage = "26 联系电话必填！";
    return false;
  }

  this.errorMessage = null;

  return true;

};

Torch2017.prototype.httpDetailByProject = function (projectId, successCallback, failureCallback) {
  let that = this;
  this.httpPost("/torch2017/detail/by/project", {projectId: projectId}, function (response) {
    if(response.data[that.getTAG()].id === 0) {
      return;
    } else {
      that.render(response.data[that.getTAG()]);
    }
    successCallback && successCallback(response);
  }, failureCallback);

};






