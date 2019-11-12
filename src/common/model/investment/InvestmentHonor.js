import BaseEntity from '../base/BaseEntity'

import Investment from "./Investment";
import {simpleDateTime, str2Date} from "../../filter/time";


export default function InvestmentHonor() {

  //extend Base's Attributes.
  BaseEntity.call(this, arguments);

  this.honorInformation = null;
  this.awardTime = new Date();
  this.checkTime = new Date();
  this.no = null;
  this.essentialInformation = null;
  this.investment = new Investment();

}
InvestmentHonor.prototype = new BaseEntity();
InvestmentHonor.prototype.constructor = InvestmentHonor;

InvestmentHonor.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.awardTime = str2Date(this.awardTime);
  this.checkTime = str2Date(this.checkTime);


};

InvestmentHonor.prototype.getForm = function () {

  let form = {
    honorInformation: this.honorInformation,
    no:this.no,
    awardTime: simpleDateTime(this.awardTime),
    checkTime: simpleDateTime(this.checkTime),
    essentialInformation:this.essentialInformation
  };
  if (this.id) {
    form.id = this.id;
  }

  return form;

};

