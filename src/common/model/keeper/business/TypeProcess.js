import Base from "../../base/Base";
import KeeperBusinessType from "./KeeperBusinessType";
import Filter from "../../base/Filter";

let Type = {
  //提供材料
  PROVIDE_MATERIAL: "PROVIDE_MATERIAL",
  //申报公示
  PUBLIC_NOTICE: "PUBLIC_NOTICE",
  //提交申报
  SUBMIT_DECLARATION: "SUBMIT_DECLARATION",
  //审核
  TO_EXAMINE: "TO_EXAMINE",
  //领取证件
  CERTIFICATE_RECEIPT: "CERTIFICATE_RECEIPT",
  //办理刻章
  ENGRAVING: "ENGRAVING",
  //核实
  VERIFY: "VERIFY",
  //票据
  BILL: "BILL",
  //记账
  ACCOUNTING: "ACCOUNTING",
  //申报
  DECLARE: "DECLARE",
  //提出需求
  DEMAND: "DEMAND",
  //签订协议
  SIGN_AGREEMENT: "SIGN_AGREEMENT",
  //提供服务
  PROVIDE_SERVICES: "PROVIDE_SERVICES",
  //出具报告
  REPORT: "REPORT",
  //第三方受理
  THIRD_PARTY_ADMISSIBILITY: "THIRD_PARTY_ADMISSIBILITY",
  //完成项目
  COMPLETION_PROJECT: "COMPLETION_PROJECT",
  //整合信息
  INTEGRATED_INFORMATION: "INTEGRATED_INFORMATION",
  //完善计划书
  PERFECT_PLAN: "PERFECT_PLAN",
  //反馈信息
  FEEDBACK_INFORMATION: "FEEDBACK_INFORMATION",
  //期限
  TERM: "TERM",
  //收款
  RECEIVABLES: "RECEIVABLES",
  //填写材料
  FILL_MATERIAL: "FILL_MATERIAL",
  //密码激活
  PASSWORD_ACTIVATION: "PASSWORD_ACTIVATION",
  //完成服务
  COMPLETION_SERVICE: "COMPLETION_SERVICE",
  //服务细则
  RULES_SERVICE: "RULES_SERVICE",
  //缴纳费用
  PAY_COST: "PAY_COST",
  //领取钥匙
  GET_KEY: "GET_KEY",
  //风格模板
  STYLE_TEMPLATE: "STYLE_TEMPLATE",
  //平面图
  PLAN: "PLAN",
  //效果图
  DESIGN_SKETCH: "DESIGN_SKETCH",
  //施工图
  CONSTRUCTION_PLANS: "CONSTRUCTION_PLANS",
  //缴款验收
  PAYMENT_ACCEPTANCE: "PAYMENT_ACCEPTANCE",
  //挑选酒店
  PICK_HOTEL: "PICK_HOTEL",
  //版权委托书
  COPYRIGHT_ENTRUSTMENT: "COPYRIGHT_ENTRUSTMENT",
  //提交作品
  SUBMISSION_WORK: "SUBMISSION_WORK",
  //提交申请
  SUBMISSION: "SUBMISSION",
  //商标查询
  TRADEMARK_INQUIRIES: "TRADEMARK_INQUIRIES",
  //申请文件
  APPLICATION_DOCUMENTS: "APPLICATION_DOCUMENTS",
  //注册申请
  REGISTRATION_APPLICATION: "REGISTRATION_APPLICATION",
  //商标形式
  TRADEMARK_FORM: "TRADEMARK_FORM",
  //受理通知书
  NOTIFICATION_ACCEPTANCE: "NOTIFICATION_ACCEPTANCE",
  //商标审查
  EXAMINATION_TRADEMARKS: "EXAMINATION_TRADEMARKS",
  //公告
  NOTICE: "NOTICE",
  //答复通知书
  NOTICE_REPLY: "NOTICE_REPLY",
  //登记手续
  REGISTRATION_FORMALITIES: "REGISTRATION_FORMALITIES",
  //领取证书
  RECEIVE_CERTIFICATE: "RECEIVE_CERTIFICATE",
  //拟定方案
  PROPOSED_SCHEME: "PROPOSED_SCHEME"
};

let TypeMap = {
  PROVIDE_MATERIAL: {
    name: "提供材料",
    value: "PROVIDE_MATERIAL"
  },
  PUBLIC_NOTICE: {
    name: "申报公示",
    value: "PUBLIC_NOTICE"
  },
  SUBMIT_DECLARATION: {
    name: "提交申报",
    value: "SUBMIT_DECLARATION"
  },
  TO_EXAMINE: {
    name: "审核",
    value: "TO_EXAMINE"
  },
  CERTIFICATE_RECEIPT: {
    name: "领取证件",
    value: "CERTIFICATE_RECEIPT"
  },
  ENGRAVING: {
    name: "办理刻章",
    value: "ENGRAVING"
  },
  VERIFY: {
    name: "核实",
    value: "VERIFY"
  },
  BILL: {
    name: "票据",
    value: "BILL"
  },
  ACCOUNTING: {
    name: "记账",
    value: "ACCOUNTING"
  },
  DECLARE: {
    name: "申报",
    value: "DECLARE"
  },
  DEMAND: {
    name: "提出需求",
    value: "DEMAND"
  },
  SIGN_AGREEMENT: {
    name: "签订协议",
    value: "SIGN_AGREEMENT"
  },
  PROVIDE_SERVICES: {
    name: "提供服务",
    value: "PROVIDE_SERVICES"
  },
  REPORT: {
    name: "出具报告",
    value: "REPORT"
  },
  THIRD_PARTY_ADMISSIBILITY: {
    name: "第三方受理",
    value: "THIRD_PARTY_ADMISSIBILITY"
  },
  COMPLETION_PROJECT: {
    name: "完成项目",
    value: "COMPLETION_PROJECT"
  },
  INTEGRATED_INFORMATION: {
    name: "整合信息",
    value: "INTEGRATED_INFORMATION"
  },
  PERFECT_PLAN: {
    name: "完善计划书",
    value: "PERFECT_PLAN"
  },
  FEEDBACK_INFORMATION: {
    name: "反馈信息",
    value: "FEEDBACK_INFORMATION"
  },
  TERM: {
    name: "期限",
    value: "TERM"
  },
  RECEIVABLES: {
    name: "收款",
    value: "RECEIVABLES"
  },
  FILL_MATERIAL: {
    name: "填写材料",
    value: "FILL_MATERIAL"
  },
  PASSWORD_ACTIVATION: {
    name: "密码激活",
    value: "PASSWORD_ACTIVATION"
  },
  COMPLETION_SERVICE: {
    name: "完成服务",
    value: "COMPLETION_SERVICE"
  },
  RULES_SERVICE: {
    name: "服务细则",
    value: "RULES_SERVICE"
  },
  PAY_COST: {
    name: "缴纳费用",
    value: "PAY_COST"
  },
  GET_KEY: {
    name: "领取钥匙",
    value: "GET_KEY"
  },
  STYLE_TEMPLATE: {
    name: "风格模板",
    value: "STYLE_TEMPLATE"
  },
  PLAN: {
    name: "平面图",
    value: "PLAN"
  },
  DESIGN_SKETCH: {
    name: "效果图",
    value: "DESIGN_SKETCH"
  },
  CONSTRUCTION_PLANS: {
    name: "施工图",
    value: "CONSTRUCTION_PLANS"
  },
  PAYMENT_ACCEPTANCE: {
    name: "缴款验收",
    value: "PAYMENT_ACCEPTANCE"
  },
  PICK_HOTEL: {
    name: "挑选酒店",
    value: "PICK_HOTEL"
  },
  COPYRIGHT_ENTRUSTMENT: {
    name: "版权委托书",
    value: "COPYRIGHT_ENTRUSTMENT"
  },
  SUBMISSION_WORK: {
    name: "提交作品",
    value: "SUBMISSION_WORK"
  },
  SUBMISSION: {
    name: "提交申请",
    value: "SUBMISSION"
  },
  TRADEMARK_INQUIRIES: {
    name: "商标查询",
    value: "TRADEMARK_INQUIRIES"
  },
  APPLICATION_DOCUMENTS: {
    name: "申请文件",
    value: "APPLICATION_DOCUMENTS"
  },
  REGISTRATION_APPLICATION: {
    name: "注册申请",
    value: "REGISTRATION_APPLICATION"
  },
  TRADEMARK_FORM: {
    name: "商标形式",
    value: "TRADEMARK_FORM"
  },
  NOTIFICATION_ACCEPTANCE: {
    name: "受理通知书",
    value: "NOTIFICATION_ACCEPTANCE"
  },
  EXAMINATION_TRADEMARKS: {
    name: "商标审查",
    value: "EXAMINATION_TRADEMARKS"
  },
  NOTICE: {
    name: "公告",
    value: "NOTICE"
  },
  NOTICE_REPLY: {
    name: "答复通知书",
    value: "NOTICE_REPLY"
  },
  REGISTRATION_FORMALITIES: {
    name: "登记手续",
    value: "REGISTRATION_FORMALITIES"
  },
  RECEIVE_CERTIFICATE: {
    name: "领取证书",
    value: "RECEIVE_CERTIFICATE"
  },
  PROPOSED_SCHEME: {
    name: "拟定方案",
    value: "PROPOSED_SCHEME"
  }
};

export default function TypeProcess(type) {

  Base.call(this, arguments);

  //服务流程所需要的字段，目前只需要流程详情，因为它的名字是枚举类，是提供选择的
  this.content = null;
  this.type = type;

}

TypeProcess.prototype = new Base();
TypeProcess.prototype.constructor = TypeProcess;

TypeProcess.prototype.Type = Type;
TypeProcess.prototype.TypeMap = TypeMap;
TypeProcess.prototype.TypeList = TypeProcess.prototype.getTypeList();

TypeProcess.prototype.getFilters = function () {
  return [];
};

TypeProcess.prototype.getForm = function () {
  let form = {
    content: this.content,
    type: this.type
  };
  return form;
};


