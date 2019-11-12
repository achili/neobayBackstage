import BaseEntity from '../base/BaseEntity'
import Tank from '../tank/Tank'

import Vue from 'vue'
import Investment from "./Investment";


export default function InvestmentCore() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.name = null;
  this.department = null;
  this.position = null;
  this.telephone = null;
  this.fax = null;
  this.phone = null;
  this.docType = null;
  this.docNo = null;
  this.mail = null;
  this.education = null;
  this.highestTitle = null;
  this.firstWorkingYear = null;
  this.isShareholder = null;
  this.isPersonLiable = null;
  this.isContinuous = null;
  this.features = null;
  this.isOverseas = null;
  this.isPujiangTalent = null;
  this.isThousandPlan = null;
  this.thousandPlanCode = null;
  this.isCollegeScience = null;
  this.settlePolicy = new Tank(".doc|.docx|.pdf", true);
  this.otherPolicy = new Tank(".doc|.docx|.pdf", true);
  this.resume = new Tank(".doc|.docx|.pdf", true);
  this.investment = new Investment();

  if (Vue.store.state.debug) {
    this.mockData();
  }
}
InvestmentCore.prototype = new BaseEntity();
InvestmentCore.prototype.constructor = InvestmentCore;

//测试数据。
InvestmentCore.prototype.mockData = function () {
  this.name = "小川威慑";
  this.department = "外交部";
  this.position = "部长";
  this.telephone = "6589666";
  this.fax = "62000";
  this.phone = "18634324953";
  this.docType = "军人证";
  this.docNo = "55446214456255";
  this.mail = "957026715@qq.com";
  this.education = "大专";
  this.highestTitle = "宇宙第一外交交";
  this.firstWorkingYear = "1992";
  this.isShareholder = true;
  this.isPersonLiable = true;
  this.isContinuous = true;
  this.features = "大学生创业";
  this.isOverseas = true;
  this.isPujiangTalent = true;
  this.isThousandPlan = true;
  this.thousandPlanCode = "1556618";
  this.isCollegeScience = true;
  this.settlePolicy = new Tank(".doc|.docx|.pdf", true);
  this.settlePolicy.mockDataPdfPrivacy();
  this.otherPolicy = new Tank(".doc|.docx|.pdf", true);
  this.otherPolicy.mockDataPdfPrivacy();
  this.resume = new Tank(".doc|.docx|.pdf", true);
  this.resume.mockDataPdfPrivacy();
};


InvestmentCore.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);

  this.renderEntity("settlePolicy", Tank);
  this.renderEntity("otherPolicy", Tank);
  this.renderEntity("resume", Tank);

};

InvestmentCore.prototype.getForm = function () {

  let form = {
    investmentId: this.investment.id,
    name: this.name,
    department: this.department,
    position: this.position,
    telephone: this.telephone,
    fax: this.fax,
    phone: this.phone,
    docType: this.docType,
    docNo: this.docNo,
    mail: this.mail,
    education: this.education,
    highestTitle: this.highestTitle,
    firstWorkingYear: this.firstWorkingYear,
    isShareholder: this.isShareholder,
    isPersonLiable: this.isPersonLiable,
    isContinuous: this.isContinuous,
    features: this.features,
    isOverseas: this.isOverseas,
    isPujiangTalent: this.isPujiangTalent,
    isThousandPlan: this.isThousandPlan,
    thousandPlanCode: this.thousandPlanCode,
    isCollegeScience: this.isCollegeScience,
    settlePolicyCode: this.settlePolicy.code,
    otherPolicyCode: this.otherPolicy.code,
    resumeCode: this.resume.code

  };
  if (this.id) {
    form.id = this.id;
  }


  return form;

};

