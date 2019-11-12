import BaseEntity from "../../base/BaseEntity";
import Tank from "../../tank/Tank"
import Filter from "../../base/Filter";
import User from "../../user/User";
import PrintInformation from "./PrintInformation";
import {str2Date} from "../../../filter/time";
import {endWith} from "../../../filter/str";

let Status = {
  WAIT:"WAIT",
  DOWNLOAD:"DOWNLOAD",
  WAITING:"WAITING",
  SUCCESS:"SUCCESS"
}
let Type = {
  SINGLE:"SINGLE",
  DOUBLE_SIDED:"DOUBLE_SIDED"
}

let StatusMap = {
  WAIT: {
    name: "等待",
    value: "WAIT",
    style: "warning",
    icon: "sun-o"
  },
  DOWNLOAD: {
    name: "下载中",
    value: "DOWNLOAD",
    style: "warning",
    icon: "sun-o"
  },
  WAITING: {
    name: "打印中",
    value: "WAITING",
    style: "info",
    icon: "close"
  },
  SUCCESS:{
    name: "打印完成",
    value: "SUCCESS",
    style: "primary",
    icon: "close"
  }
}

let TypeMap = {
  SINGLE: {
    name: "单面",
    value: "SINGLE",
    style: "success"
  },
  DOUBLE_SIDED: {
    name: "双面",
    value: "DOUBLE_SIDED",
    style: "info"
  }
}

export default function PrintHistory() {
  BaseEntity.call(this, arguments);
  this.printFile =  new Tank(".pdf",false);
  this.creator =  new User();
  this.printInformation = new PrintInformation();
  this.finishTime = null;
  this.ranges = null;
  this.copies = null;

  this.type = Type.SINGLE;
  this.status = Status.WAIT;
}

PrintHistory.prototype = new BaseEntity();
PrintHistory.prototype.constructor = PrintHistory;

PrintHistory.prototype.Status = Status;
PrintHistory.prototype.StatusMap = StatusMap;
PrintHistory.prototype.StatusList = PrintHistory.prototype.getStatusList();

PrintHistory.prototype.Type = Type;
PrintHistory.prototype.TypeMap = TypeMap;
PrintHistory.prototype.TypeList = PrintHistory.prototype.getTypeList();

PrintHistory.prototype.URL_PAGE = "/ispace/print/history/page";

PrintHistory.prototype.getFilters = function () {
  return [
    new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("SELECTION", "状态", "status", this.getStatusList()),
    new Filter("HTTP_SELECTION", "打印机", "printInformation", null, PrintInformation)
  ];
};

PrintHistory.prototype.getTypeStyle = function () {
  let item = TypeMap[this.type];
  if (item) {
    return item.style;
  } else {
    return "default";
  }
};
PrintHistory.prototype.getTypeName = function () {
  let item = TypeMap[this.type];
  if (item) {
    return item.name;
  } else {
    return "未知状态";
  }
};

PrintHistory.prototype.render = function (obj) {

  BaseEntity.prototype.render.call(this, obj);
  this.finishTime = str2Date(this.finishTime);
  this.renderEntity("printFile", Tank);
  this.renderEntity("printInformation", PrintInformation);
}

PrintHistory.prototype.getForm = function () {
  return {
    printFileCode: this.printFile.code,
    creator: this.creator,
    printInformationId: this.printInformation.id,
    finishTime: this.finishTime,
    type: this.type,
    copies: this.copies,
    ranges: this.ranges
  };
}

PrintHistory.prototype.validate = function () {
  if (!this.printInformation.id) {
    this.errorMessage = "打印机id必填";
    return false;
  }
  if (!this.copies) {
    this.errorMessage = "打印份数必填";
    return false;
  }
  if (!this.printFile.code) {
    this.errorMessage = "请上传打印文件";
    return false;
  }
  if (this.copies) {
    let reg = /^[0-9]+$/
    if(!reg.test(this.copies)){
      this.errorMessage = "只能输入数字";
      return false;
    }
  }
  if(this.ranges){
    let reg = /^[0-9-,]*$/
    if(!reg.test(this.ranges)){
      this.errorMessage = "包含非法字符(查看是否使用的是英文',')";
      return false;
    }

    if(endWith(this.ranges , ',') || endWith(this.ranges , '，')){
      this.errorMessage = "结尾不能以,结束";
      return false;
    }

    let pageChar = this.ranges.split(",");
    for(let i = 0; i < pageChar.length; i++){
      pageChar[i] = pageChar[i].split("-");
    }
    //校验大小
    let lastNumber = 0;
    for(let i = 0; i < pageChar.length; i++){
      let pageCharItem = pageChar[i];
      if(lastNumber >= pageCharItem[0]) {
        this.errorMessage = "后面起始页需大于前面终止页";
        return false;
      }
      if(pageCharItem[0] > pageCharItem[1]){
        this.errorMessage = "起始页不能大于终止页";
        return false;
      }
      lastNumber = pageCharItem[1]
    }
  }
  return true;
};
let TypeList = [];
for (let key in TypeMap) {
  if (TypeMap.hasOwnProperty(key)) {
    TypeList.push(TypeMap[key]);
  }
}

PrintHistory.prototype.getUrlPrefix = function () {
  return "/ispace/print/history";
};

PrintHistory.prototype.getPageSize = function () {
  this.ranges;
  let pageSum = 0;
  let pageChar = this.ranges.split(",");
  for(let i = 0; i < pageChar.length; i++){
    pageChar[i] = pageChar[i].split("-");
  }
  for(let i = 0; i < pageChar.length; i++){
    let pageCharItem = pageChar[i];
    pageSum += pageCharItem[1] - pageCharItem[0] + 1
  }
  pageSum = pageSum * this.copies
  return pageSum;
};
export {Type, TypeMap, TypeList};
