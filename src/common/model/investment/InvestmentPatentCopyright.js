import BaseEntity from "../base/BaseEntity";
import Vue from "vue";
import Investment from "./Investment";


export default function InvestmentPatentCopyright() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);
  this.year = null;
  this.intellectualApplyNum = null;
  this.intellectualInventionApplyNum = null;
  this.authorizationNum = null;
  this.authorizationInventionNum = null;
  this.effectiveIntellectualNum = null;
  this.effectiveIntellectualInventionNum = null;
  this.softwareCopyrightNum = null;
  this.newPlantNum = null;
  this.integratedCircuitNum = null;
  this.otherPowerNum = null;
  this.investment = new Investment();

  if (Vue.store.state.debug) {
    this.mockData();
  }

}
InvestmentPatentCopyright.prototype = new BaseEntity();
InvestmentPatentCopyright.prototype.constructor = InvestmentPatentCopyright;

//测试数据。
InvestmentPatentCopyright.prototype.mockData = function () {
  this.year = "2016";
  this.intellectualApplyNum = 13;
  this.intellectualInventionApplyNum = 13;
  this.authorizationNum = 13;
  this.authorizationInventionNum = 13;
  this.effectiveIntellectualNum = 13;
  this.effectiveIntellectualInventionNum = 13;
  this.softwareCopyrightNum = 13;
  this.newPlantNum = 13;
  this.integratedCircuitNum = 13;
  this.otherPowerNum = 13;
}

//We use this method to get the full js Object.
InvestmentPatentCopyright.prototype.render = function(obj){
  BaseEntity.prototype.render.call(this,obj);
}

InvestmentPatentCopyright.prototype.getForm = function () {

  let form = {
    year: this.year,
    intellectualApplyNum: this.intellectualApplyNum,
    intellectualInventionApplyNum: this.intellectualInventionApplyNum,
    authorizationNum: this.authorizationNum,
    authorizationInventionNum: this.authorizationInventionNum,
    effectiveIntellectualNum: this.effectiveIntellectualNum,
    effectiveIntellectualInventionNum: this.effectiveIntellectualInventionNum,
    softwareCopyrightNum: this.softwareCopyrightNum,
    newPlantNum: this.newPlantNum,
    integratedCircuitNum: this.integratedCircuitNum,
    otherPowerNum: this.otherPowerNum

  };
  if (this.id) {
    form.id = this.id;
  }


  return form;

};
