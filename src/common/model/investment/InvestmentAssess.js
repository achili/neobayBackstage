import BaseEntity from '../base/BaseEntity'

import Vue from 'vue'
import Investment from "./Investment";
import User from "../user/User";
import MakerSimpleApply from "../maker/MakerSimpleApply";
import Filter from "../base/Filter";
import MakerOrganization from "../maker/MakerOrganization";
import MakerApartment from "../maker/MakerApartment";


export default function InvestmentAssess() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.creator = new User();
  this.investment = new Investment();
  this.makerSimpleApply = new MakerSimpleApply();
  this.makerApartment = new MakerApartment();
  this.team = null;
  this.industry = null;
  this.technology = null;
  this.finance = null;
  this.service = null;
  this.comment = null;

}
InvestmentAssess.prototype = new BaseEntity();
InvestmentAssess.prototype.constructor = InvestmentAssess;

InvestmentAssess.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter("HTTP_SELECTION", "机构", "makerOrganizationId",null, MakerOrganization, false ),
    new Filter("HTTP_SELECTION", "第三方服务", "makerSimpleApplyId", null, MakerSimpleApply),
    new Filter("HTTP_SELECTION", "人才公寓", "makerApartmentId", null, MakerApartment)
  ];
};

InvestmentAssess.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("creator", User);
  this.renderEntity("investment", Investment);
  this.renderEntity("makerSimpleApply", MakerSimpleApply);
  this.renderEntity("makerApartment", MakerApartment);

};

InvestmentAssess.prototype.getForm = function () {

  let form = {
    investmentId: this.investment.id,
    makerSimpleApply:this.makerSimpleApply.id,
    team: this.team,
    industry: this.industry,
    technology: this.technology,
    finance: this.finance,
    comment: this.comment
  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
};

