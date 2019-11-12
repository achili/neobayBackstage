import BaseEntity from "../base/BaseEntity"
import Filter from "../base/Filter";
import {simpleDateTime, str2Date} from "../../filter/time";
import {validateEmail} from "../../filter/validate";
import Tank from "../tank/Tank";
import CompanyCore from "../company/CompanyCore";
import CompanyBranch from "../company/CompanyBranch";
import CompanyEquity from "../company/CompanyEquity";
import CompanyFinance from "../company/CompanyFinance";
import CompanyIntellectual from "../company/CompanyIntellectual";
import CompanyIntellectualInformation from "../company/CompanyIntellectualInformation";
import CompanyInvestment from "../company/CompanyInvestment";
import CompanyQualification from "../company/CompanyQualification";
import Project from "../project/Project";
import User from "../user/User";

import Vue from "vue";
import {isLocalStorageNameSupported, readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import EntryBatch from '../entry/batch/EntryBatch'
import SpaceRegional from "../space/SpaceRegional";

let Status = {
	OK: "OK",
	ERROR: "ERROR"
}

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
}

let Type = {
	//基本信息
	"BASIC_INFO": "BASIC_INFO",
	//附加信息
	"ADD_INFO": "ADD_INFO",
	//股权结构
	"EQUITY_STRUC": "EQUITY_STRUC",
	//人员结构
	"CORE_STRUC": "CORE_STRUC",
	//财务情况
	"FINANCE_INFO": "FINANCE_INFO",
	//专利版权
	"PATENT_INFO": "PATENT_INFO",
	//投融资
	"INVEST_INFO": "INVEST_INFO",
	//知识产权
	"INTELLECT_INFO": "INTELLECT_INFO",
	//企业资质
	"QULIFI_INFO": "QULIFI_INFO",
	//机构信息
	"ORGANIZATION_INFO": "ORGANIZATION_INFO"

}
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
		index: 2,
		compulsory: true
	},
	{
		name: "人员结构",
		value: Type.CORE_STRUC,
		fa: "fa fa-dot-circle-o",
		index: 3,
		compulsory: true
	},
	{
		name: "财务情况",
		value: Type.FINANCE_INFO,
		fa: "fa fa-dot-circle-o",
		index: 4,
		compulsory: false
	},
	{
		name: "专利版权",
		value: Type.PATENT_INFO,
		fa: "fa fa-dot-circle-o",
		index: 5,
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
		index: 6,
		compulsory: false
	},
	{
		name: "附加信息",
		value: Type.ADD_INFO,
		fa: "fa fa-dot-circle-o",
		index: 1,
		compulsory: false
	},
	{
		name: "企业资质",
		value: Type.QULIFI_INFO,
		fa: "fa fa-dot-circle-o",
		index: 8,
		compulsory: false
	},
	{
		name: "机构信息",
		value: Type.ORGANIZATION_INFO,
		fa: "fa fa-dot-circle-o",
		index: 9,
		compulsory: false
	}
]

export default function Company() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.creator = new User();
	this.project = new Project();
	this.status = Status.OK;
	this.name = null;
	this.organizationCode = null;
	this.registeredArea = null;
	this.registeredAddress = null;
	this.establishTime = new Date();
	this.registeredCapital = null;
	this.subordinateBase = null;
	this.responsiblePerson = null;
	this.responsiblePersonPhone = null;
	this.responsiblePersonMail = null;
	this.contacts = null;
	this.contactsPhone = null;
	this.contactsMail = null;
	this.leaseArea = null;
	this.officeAddress = null;
	this.officePostcode = null;
	this.registrationType = null;
	this.highTechType = null;
	this.industryType = null;
	this.enterpriseCharacteristics = null;
	this.skillDirection = null;
	this.marketType = null;
	this.webOrApp = null;
	this.hatchState = null;
	this.mainProducts = null;
	this.basicNotes = null;
	this.legalPersonName = null;
	this.legalPersonSex = null;
	this.legalPersonDocType = null;
	this.legalPersonIdentityCardAddress = null;
	this.legalPersonDocNo = null;
	this.legalPersonPhone = null;
	this.legalPersonServingTime = new Date();
	this.legalPersonDegree = null;
	//法人简历
 // this.legalPersonTrade = new Tank(".doc|.docx|.pdf|.jpg|.jpeg|.png", false, 50 * 1024 * 1024, "可上传doc,docx,pdf,jpg,jpeg,png格式的扫描件");
	this.brandName = null;
	this.brandTrademark = new Tank("image", true);
	this.listedSecurityCode = null;
	this.listedTime = new Date();
	this.listedMarket = null;
	this.listedStockNum = null;
	this.listedMarketValue = null;
	this.listedDelistingTime = new Date();
	this.listedNotes = null;
	this.bank = null;
	this.bankAccountName = null;
	this.bankAccountNo = null;
	this.taxCode = null;
	this.taxOrganizationType = null;
	this.taxBusinessScope = null;
	this.lastYearStaffNum = null;
	this.doctorsNum = null;
	this.overseasNum = null;
	this.thousandsPlanNum = null;
	this.freshGraduateNum = null;
	this.higherCollegeDegreeNum = null;
	this.administrativePersonnelNum = null;
	this.marketingPersonaeNum = null;
	this.researchPersonnelNum = null;
	this.manufacturingPersonnelNum = null;
	this.natureOtherNum = null;
	this.masterNum = null;
	this.undergraduateNum = null;
	this.technicalSecondaryNum = null;
	this.educationOtherNum = null;
	this.seniorTitleNum = null;
	this.intermediateTitleNum = null;
	this.primaryTitleNum = null;
	this.titleOtherNum = null;
	this.nationalProjectsNum = null;
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
	this.parentCompany = null;
	this.parentTaxpayerCode = null;
	this.parentAddress = null;
	this.parentBusinessScope = null;
	this.companyCores = [];
	this.companyBranches = [];
	this.companyEquities = [];
	this.companyFinances = [];
	this.companyIntellectuals = [];
	this.companyIntellectualInformations = [];
	this.companyInvestments = [];
	this.companyQualifications = [];

	if (Vue.store.state.debug) {
		this.mockData();
	}
}

//extend BaseEntity
Company.prototype = new BaseEntity();
Company.prototype.constructor = Company;


Company.prototype.Status = Status;
Company.prototype.StatusMap = StatusMap;
Company.prototype.StatusList = Company.prototype.getStatusList();

Company.prototype.Type = Type;
Company.prototype.Types = Types;

//测试数据。
Company.prototype.mockData = function () {
	this.name = "上海华莱士有限责任公司";
	this.organizationCode = "159874263";
	this.registeredArea = "上海市 闵行区";
	this.registeredAddress = "剑川路950弄";
	this.establishTime = new Date();
	this.registeredCapital = 200;
	this.subordinateBase = "零号湾创业园区";
	this.responsiblePerson = "哈莱士";
	this.responsiblePersonPhone = "18634324953";
	this.responsiblePersonMail = "534153953@qq.com";
	this.contacts = "鲍博";
	this.contactsPhone = "18369302861";
	this.contactsMail = "957029717@qq.com";
	this.leaseArea = 5;
	this.officeAddress = "剑川路1号楼1102";
	this.officePostcode = "200000 ";
	this.registrationType = "外商投资股份有限公司";
	this.highTechType = "待填";
	this.industryType = "待填";
	this.enterpriseCharacteristics = "认定高新技术企业";
	this.skillDirection = "先进制造";
	this.marketType = "移动互联网";
	this.webOrApp = "www.baidu.com";
	this.hatchState = "在园";
	this.mainProducts = "橱柜,床,沙发";
	this.basicNotes = "无";
	this.legalPersonName = "郑爽";
	this.legalPersonSex = "男";
	this.legalPersonDocType = "身份证";
	this.legalPersonIdentityCardAddress = "身份证住址";
	this.legalPersonDocNo = "521456952236545856";
	this.legalPersonPhone = "18632549853";
	this.legalPersonServingTime = new Date();
	this.legalPersonDegree = "博士";

	this.brandTrademark = new Tank("image", true);

	this.listedSecurityCode = "451598712522";
	this.listedTime = new Date();
	this.listedMarket = "深交所主板";
	this.listedStockNum = "5000";
	this.listedMarketValue = 600;
	this.listedDelistingTime = new Date();
	this.listedNotes = "无";
	this.bank = "工商银行";
	this.bankAccountName = "华莱士";
	this.bankAccountNo = "125110010025484101";
	this.taxCode = "321300608539098";
	this.taxOrganizationType = "总机构";
	this.taxBusinessScope = "家具";
	this.lastYearStaffNum = 5;
	this.doctorsNum = 101;
	this.overseasNum = 110;
	this.thousandsPlanNum = 4;
	this.freshGraduateNum = 33;
	this.higherCollegeDegreeNum = 2;
	this.administrativePersonnelNum = 52;
	this.marketingPersonaeNum = 4;
	this.researchPersonnelNum = 22;
	this.manufacturingPersonnelNum = 11;
	this.natureOtherNum = 11;
	this.masterNum = 11;
	this.undergraduateNum = 11;
	this.technicalSecondaryNum = 11;
	this.educationOtherNum = 15;
	this.seniorTitleNum = 11;
	this.intermediateTitleNum = 11;
	this.primaryTitleNum = 11;
	this.titleOtherNum = 11;
	this.nationalProjectsNum = 11;
	this.provincialAwards = 11;
	this.foreignPatentsNum = 11;
	this.technicalContractNum = 11;
	this.technicalContractTradingValue = 11;
	this.rdRecordNum = 11;
	this.projectCenterNum = 11;
	this.projectCenterNationalNum = 11;
	this.projectCenterProvinceNum = 11;
	this.projectCenterCityNum = 11;
	this.projectNum = 11;
	this.projectNationalNum = 11;
	this.projectProvinceNum = 11;
	this.projectCityNum = 11;
	this.nationalFunding = 12;
	this.provinceFunding = 3;
	this.cityFunding = 5;
	this.parentCompany = "总机构";
	this.parentTaxpayerCode = "16516";
	this.parentAddress = "美国纽约";
	this.parentBusinessScope = "家具";
	this.companyCores = [];
	this.companyBranches = [];
	this.companyEquities = [];
	this.companyFinances = [];
	this.companyIntellectuals = [];
	this.companyIntellectualInformations = [];
	this.companyInvestments = [];
	this.companyQualifications = [];
}

Company.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("INPUT", "公司名称", "name"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "创建者", "creatorId"),
    new Filter("HTTP_SELECTION", "所属项目", "projectId", null, Project),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object.
Company.prototype.render = function (obj, one2one = false) {

	BaseEntity.prototype.render.call(this, obj);

	this.establishTime = str2Date(this.establishTime);
	this.legalPersonServingTime = str2Date(this.legalPersonServingTime);
	this.listedTime = str2Date(this.listedTime);
	this.listedDelistingTime = str2Date(this.listedDelistingTime);
	this.renderEntity("creator", User);
	this.renderEntity("brandTrademark", Tank);
	//this.renderEntity("legalPersonTrade", Tank);

	if (!one2one) {
		this.renderEntity("project", Project);
	}


	this.renderList("companyBranches", CompanyBranch);
	this.renderList("companyCores", CompanyCore);
	this.renderList("companyEquities", CompanyEquity);
	this.renderList("companyFinances", CompanyFinance);
	this.renderList("companyIntellectuals", CompanyIntellectual);
	this.renderList("companyIntellectualInformations", CompanyIntellectualInformation);
	this.renderList("companyInvestments", CompanyInvestment);
	this.renderList("companyQualifications", CompanyQualification);
}


Company.prototype.addEquity = function (equity) {
	this.companyEquities.push(equity);
}
Company.prototype.delEquity = function (equity) {
	let index = this.companyEquities.indexOf(equity);
	if (index !== -1) {
		this.companyEquities.splice(index, 1);
	}
}

Company.prototype.addCore = function (core) {
	this.companyCores.push(core);
}
Company.prototype.delCore = function (core) {
	let index = this.companyCores.indexOf(core);
	if (index !== -1) {
		this.companyCores.splice(index, 1)
	}
}

Company.prototype.addInvest = function (invest) {
	this.companyInvestments.push(invest);
}
Company.prototype.delInvest = function (index) {
	if (index !== -1) {
		this.companyInvestments.splice(index, 1);
	}
}

Company.prototype.addIntellect = function (intellect) {
	this.companyIntellectuals.push(intellect);
}
Company.prototype.delIntellect = function (Intellectual) {
	let index = this.companyIntellectuals.indexOf(Intellectual);
	if (index !== -1) {
		this.companyIntellectuals.splice(index, 1);
	}
}

Company.prototype.addCompanyIntellectualInformation = function (intellecInfo) {
	this.companyIntellectualInformations.push(intellecInfo);
}
Company.prototype.delIntellectualInformation = function (IntellectualInformation) {
	let index = this.companyIntellectualInformations.indexOf(IntellectualInformation);
	if (index !== -1) {
		this.companyIntellectualInformations.splice(index, 1);
	}
}

Company.prototype.addQualifications = function (qulify) {
	this.companyQualifications.push(qulify);
}
Company.prototype.delQualifications = function (qulify) {
	let index = this.companyQualifications.indexOf(qulify);
	if (index !== -1) {
		this.companyQualifications.splice(index, 1);
	}
}

Company.prototype.addBranch = function (branch) {
	this.companyBranches.push(branch);
}
Company.prototype.delBranch = function (branch) {
	let index = this.companyBranches.indexOf(branch);
	if (index !== -1) {
		this.companyBranches.splice(index, 1);
	}
}

Company.prototype.addFinance = function (finance) {
	this.companyFinances.push(finance);
}
Company.prototype.delFinance = function (finance) {
	let index = this.companyFinances.indexOf(finance);
	if (index !== -1) {
		this.companyFinances.splice(index, 1);
	}
}

//将信息从本地读取出来。
Company.prototype.renderFromLocalStorage = function () {
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
Company.prototype.saveToLocalStorage = function () {
	saveToLocalStorage(this.getTAG(), JSON.stringify(this));
}
//清除本地信息
Company.prototype.clearLocalStorage = function () {
	removeLocalStorage(this.getTAG());
}



/**
 * 1.在归档情况下，任何人都不能编辑。
 * 2.在非归档情况下，管理员在任何状态下都能编辑。普通用户只能在NEW和FIRST_REVIEW_REJECT这两种状态下编辑。
 */
Company.prototype.canEdit = function () {

	return true;
}

/**
 * 任何状态均可尝试去删除，后台返回结果是否可以删除。
 */
Company.prototype.canDel = function () {

	return true;
}


Company.prototype.getForm = function () {

	let companyBranches = this.companyBranches;
	let companyBranchesInfo = [];
	for (let i = 0; i < companyBranches.length; i++) {

		let companyBranch = companyBranches[i];
		companyBranchesInfo.push(companyBranch.getForm());
	}

	let companyCores = this.companyCores;
	let companyCoresInfo = [];
	for (let i = 0; i < companyCores.length; i++) {
		let companyCore = companyCores[i];
		companyCoresInfo.push(companyCore.getForm());
	}

	let companyEquities = this.companyEquities;
	let companyEquitiesInfo = [];
	for (let i = 0; i < companyEquities.length; i++) {
		let companyEquity = companyEquities[i];
		companyEquitiesInfo.push(companyEquity.getForm());
	}

	let companyFinances = this.companyFinances;
	let companyFinancesInfo = [];
	for (let i = 0; i < companyFinances.length; i++) {
		let companyFinance = companyFinances[i];
		companyFinancesInfo.push(companyFinance.getForm());
	}

	let companyIntellectuals = this.companyIntellectuals;
	let companyIntellectualsInfo = [];
	for (let i = 0; i < companyIntellectuals.length; i++) {
		let CompanyIntellectual = companyIntellectuals[i];
		companyIntellectualsInfo.push(CompanyIntellectual.getForm());
	}

	let companyIntellectualInformations = this.companyIntellectualInformations;
	let companyIntellectualInformationsInfo = [];
	for (let i = 0; i < companyIntellectualInformations.length; i++) {
		let companyIntellectualInformation = companyIntellectualInformations[i];
		companyIntellectualInformationsInfo.push(companyIntellectualInformation.getForm());
	}

	let companyInvestments = this.companyInvestments;
	let companyInvestmentsInfo = [];
	for (let i = 0; i < companyInvestments.length; i++) {
		let CompanyInvestment = companyInvestments[i];
		companyInvestmentsInfo.push(CompanyInvestment.getForm());
	}

	let companyQualifications = this.companyQualifications;
	let companyQualificationsInfo = [];
	for (let i = 0; i < companyQualifications.length; i++) {
		let CompanyQualification = companyQualifications[i];
		companyQualificationsInfo.push(CompanyQualification.getForm());
	}


	let form = {
		projectId: this.project.id,
		name: this.name,
		organizationCode: this.organizationCode,
		registeredArea: this.registeredArea,
		registeredAddress: this.registeredAddress,
		establishTime: simpleDateTime(this.establishTime),
		registeredCapital: this.registeredCapital,
		subordinateBase: this.subordinateBase,
		responsiblePerson: this.responsiblePerson,
		responsiblePersonPhone: this.responsiblePersonPhone,
		responsiblePersonMail: this.responsiblePersonMail,
		contacts: this.contacts,
		contactsPhone: this.contactsPhone,
		contactsMail: this.contactsMail,
		leaseArea: this.leaseArea,
		officeAddress: this.officeAddress,
		officePostcode: this.officePostcode,
		registrationType: this.registrationType,
		highTechType: this.highTechType,
		industryType: this.industryType,
		enterpriseCharacteristics: this.enterpriseCharacteristics,
		skillDirection: this.skillDirection,
		marketType: this.marketType,
		webOrApp: this.webOrApp,
		hatchState: this.hatchState,
		mainProducts: this.mainProducts,
		basicNotes: this.basicNotes,
		legalPersonName: this.legalPersonName,
		legalPersonSex: this.legalPersonSex,
		legalPersonDocType: this.legalPersonDocType,
    legalPersonIdentityCardAddress: this.legalPersonIdentityCardAddress,
		legalPersonDocNo: this.legalPersonDocNo,
		legalPersonPhone: this.legalPersonPhone,
		legalPersonServingTime: simpleDateTime(this.legalPersonServingTime),
		legalPersonDegree: this.legalPersonDegree,
    //legalPersonTradeCode: this.legalPersonTrade.code,
		brandName: this.brandName,
		brandTrademarkCode: this.brandTrademark.code,
		listedSecurityCode: this.listedSecurityCode,
		listedMarket: this.listedMarket,
		listedStockNum: this.listedStockNum,
		listedMarketValue: this.listedMarketValue,
		listedNotes: this.listedNotes,
		bank: this.bank,
		bankAccountName: this.bankAccountName,
		bankAccountNo: this.bankAccountNo,
		taxCode: this.taxCode,
		taxOrganizationType: this.taxOrganizationType,
		taxBusinessScope: this.taxBusinessScope,
		lastYearStaffNum: this.lastYearStaffNum,
		doctorsNum: this.doctorsNum,
		overseasNum: this.overseasNum,
		thousandsPlanNum: this.thousandsPlanNum,
		freshGraduateNum: this.freshGraduateNum,
		higherCollegeDegreeNum: this.higherCollegeDegreeNum,
		administrativePersonnelNum: this.administrativePersonnelNum,
		marketingPersonaeNum: this.marketingPersonaeNum,
		researchPersonnelNum: this.researchPersonnelNum,
		manufacturingPersonnelNum: this.manufacturingPersonnelNum,
		natureOtherNum: this.natureOtherNum,
		masterNum: this.masterNum,
		undergraduateNum: this.undergraduateNum,
		technicalSecondaryNum: this.technicalSecondaryNum,
		educationOtherNum: this.educationOtherNum,
		seniorTitleNum: this.seniorTitleNum,
		intermediateTitleNum: this.intermediateTitleNum,
		primaryTitleNum: this.primaryTitleNum,
		titleOtherNum: this.titleOtherNum,
		nationalProjectsNum: this.nationalProjectsNum,
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
		parentCompany: this.parentCompany,
		parentTaxpayerCode: this.parentTaxpayerCode,
		parentAddress: this.parentAddress,
		parentBusinessScope: this.parentBusinessScope,
		companyBranchesInfo: JSON.stringify(companyBranchesInfo),
		companyCoresInfo: JSON.stringify(companyCoresInfo),
		companyEquitiesInfo: JSON.stringify(companyEquitiesInfo),
		companyFinancesInfo: JSON.stringify(companyFinancesInfo),
		companyIntellectualsInfo: JSON.stringify(companyIntellectualsInfo),
		companyIntellectualInformationsInfo: JSON.stringify(companyIntellectualInformationsInfo),
		companyInvestmentsInfo: JSON.stringify(companyInvestmentsInfo),
		companyQualificationsInfo: JSON.stringify(companyQualificationsInfo)

	};

	if (this.listedTime) {
    form.listedTime = simpleDateTime(this.listedTime);
  }
  if (this.listedDelistingTime) {
    form.listedDelistingTime = simpleDateTime(this.listedDelistingTime);
  }
	if (this.id) {
		form.id = this.id;
	}
	return form;

}

Company.prototype.validate = function () {

	if (!this.project.id) {
		this.errorMessage = "项目必填！";
		return false;
	}
	if (!this.name) {
		this.errorMessage = "企业名称必填！";
		return false;
	}
	if (!this.organizationCode) {
		this.errorMessage = "组织机构代码/社会信用码必填！";
		return false;
	}
	if (!this.registeredArea) {
		this.errorMessage = "注册地区/县必填！";
		return false;
	}
	if (!this.registeredAddress) {
		this.errorMessage = "注册地址必填！";
		return false;
	}
	if (!this.establishTime) {
		this.errorMessage = "成立时间必填！";
		return false;
	}
	if (!this.registeredCapital) {
		this.errorMessage = "注册资金必填！";
		return false;
	}
	if (!this.subordinateBase) {
		this.errorMessage = "所属基地必填！";
		return false;
	}
	if (!this.responsiblePerson) {
		this.errorMessage = "实际负责人必填！";
		return false;
	}
	if (!this.responsiblePersonPhone) {
		this.errorMessage = "负责人电话必填！";
		return false;
	}
	if (!this.responsiblePersonMail) {
		this.errorMessage = "负责人邮箱必填！";
		return false;
	}
	if (!validateEmail(this.responsiblePersonMail)) {
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
	if (!this.contactsMail) {
		this.errorMessage = "联系人邮箱必填！";
		return false;
	}
	if (!validateEmail(this.contactsMail)) {
		this.errorMessage = "联系人邮箱格式不正确！";
		return false;
	}
	if (!this.leaseArea) {
		this.errorMessage = "租赁面积必填！";
		return false;
	}
	if (!this.officeAddress) {
		this.errorMessage = "办公地址必填！";
		return false;
	}
	if (!this.officePostcode) {
		this.errorMessage = "办公地邮政编码必填！";
		return false;
	}
	if (!this.registrationType) {
		this.errorMessage = "登记注册类型必填！";
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
	if (!this.enterpriseCharacteristics) {
		this.errorMessage = "创业企业特征必填！";
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
	if (!this.hatchState) {
		this.errorMessage = "孵化状态必填！";
		return false;
	}

	if (!this.mainProducts) {
		this.errorMessage = "主营产品必填！";
		return false;
	}
	if (!this.legalPersonName) {
		this.errorMessage = "法人代表姓名必填！";
		return false;
	}
	if (!this.legalPersonSex) {
		this.errorMessage = "法人性别必填！";
		return false;
	}
	if (!this.legalPersonDocType) {
		this.errorMessage = "法人证件类型必填！";
		return false;
	}
	if (!this.legalPersonIdentityCardAddress){
    this.errorMessage = "法人身份证住址必填！";
    return false;
  }
	if (!this.legalPersonDocNo) {
		this.errorMessage = "法人证件号必填！";
		return false;
	}
	if (!this.legalPersonPhone) {
		this.errorMessage = "法人联系电话必填！";
		return false;
	}
	if (!this.legalPersonServingTime) {
		this.errorMessage = "法人任职时间必填！";
		return false;
	}
	if (!this.legalPersonDegree) {
		this.errorMessage = "法人最高学历必填！";
		return false;
	}
  // if (!this.legalPersonTrade.code) {
  //   this.errorMessage = "法人简历必填！";
  //   return false;
  // }
	if (this.companyCores.length === 0) {
		this.errorMessage = "核心团队人员至少一个！";
		return false;
	}

	return true;
}





