import BaseEntity from "../base/BaseEntity";
import {simpleDateTime, str2Date} from "../../filter/time";
import Vue from "vue";
import Investment from "./Investment";
import Tank from "../tank/Tank";

export default function InvestmentIntellectual() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.intellectualType = null;
  this.occurrenceTime = new Date();
  this.intellectualNo = null;
  this.intellectualName = null;
  this.intellectualStatus = null;
  this.isEffective = null;
  this.investment = new Investment();
  this.attachment = new Tank(".doc|.docx|.pdf", true);

  if (Vue.store.state.debug) {
    this.mockData();
  }
}
InvestmentIntellectual.prototype = new BaseEntity();
InvestmentIntellectual.prototype.constructor = InvestmentIntellectual;

//测试数据。
InvestmentIntellectual.prototype.mockData = function () {
  this.intellectualType = "商标";
  this.occurrenceTime = new Date();
  this.intellectualNo = "8541631635123";
  this.intellectualName = "华莱士商标";
  this.intellectualStatus = "受理";
  this.isEffective = true;
  this.attachment = new Tank(".doc|.docx|.pdf", true);
  this.attachment.mockDataPdfPrivacy();
};

InvestmentIntellectual.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.occurrenceTime = str2Date(this.occurrenceTime);
  this.renderEntity("attachment", Tank);

};
InvestmentIntellectual.prototype.getForm = function () {

  let form = {
    intellectualType: this.intellectualType,
    occurrenceTime: simpleDateTime(this.occurrenceTime),
    intellectualNo: this.intellectualNo,
    intellectualName: this.intellectualName,
    intellectualStatus: this.intellectualStatus,
    isEffective: this.isEffective,
    attachmentCode: this.attachment.code

  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

};
