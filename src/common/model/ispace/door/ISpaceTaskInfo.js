import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import Tank from "../../tank/Tank";
import Base from "../../base/Base";
import {simpleDateTime} from "../../../filter/time";
import {MessageBox, Notification as NotificationBox} from 'element-ui'
import ISpaceDoor from "./ISpaceDoor";

let Status = {
  OK: "OK",
  ERROR: "ERROR"
};
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
};
export default function ISpaceTaskInfo() {
  Base.call(this, arguments);
  this.templateId = null;
  this.broadStartDateTime = new Date();
  this.broadEndDateTime = new Date();
  this.doorList = [];
  this.doorEditList = [];
  this.doorNameList = [];
  this.image = new Tank("image", false);   //图片上传
  this.status = Status.OK;
  this.imageKey = null;
  this.doorDetails = new ISpaceDoor();
}
//extend BaseEntity
ISpaceTaskInfo.prototype = new Base();
ISpaceTaskInfo.prototype.constructor = ISpaceTaskInfo;
ISpaceTaskInfo.prototype.Status = Status;
ISpaceTaskInfo.prototype.StatusMap = StatusMap;
ISpaceTaskInfo.prototype.StatusList = ISpaceTaskInfo.prototype.getStatusList();

ISpaceTaskInfo.prototype.URL_PAGE = "/i/space/task/info/page";  //分页查询任务通知
ISpaceTaskInfo.prototype.URL_SAVE_TASK_INFO = "/i/space/task/info/create";  //新建任务通知
ISpaceTaskInfo.prototype.URL_DETAIL_TASK_INFO = "/i/space/task/info/detail"; //任务通知详情
ISpaceTaskInfo.prototype.URL_EDIT_TASK_INFO = "/i/space/task/info/edit"; //任务通知详情
ISpaceTaskInfo.prototype.URL_DELETE_TASK_INFO = "/i/space/task/info/delete"; //任务通知的删除

ISpaceTaskInfo.prototype.getFilters = function () {
  return [
    new Filter("SORT", "templateId", "templateId"),
    new Filter("SORT", "imageKey", "imageKey")
  ];
};

ISpaceTaskInfo.prototype.render = function (obj) {
  BaseEntity.prototype.render.call(this, obj);
  this.renderEntity("broadStartDateTime", Date);
  this.renderEntity("broadEndDateTime", Date);
  this.renderEntity("image", Tank);
  this.doorList = JSON.parse(this.doorList)
};

ISpaceTaskInfo.prototype.getForm = function () {
  let form = {
    imageTankCode: this.image.code,
    doorList: this.doorList.toString(),
    broadStartDateTime: simpleDateTime(this.broadStartDateTime),
    broadEndDateTime: simpleDateTime(this.broadEndDateTime),
    templateId: this.templateId
  };
  if (this.templateId) {
    form.templateId = this.templateId;
  }
  return form;
};

/*判断必填项是否为空或者是否符合要求*/
ISpaceTaskInfo.prototype.validate = function () {
  if (!this.image.code) {
    this.errorMessage = "图片必选！";
    return false;
  }
  if (this.image.size > 2 * 1024 * 1024) {
    this.errorMessage = "图片大小需要小于2MB！";
    return false;
  }
  if (!this.broadStartDateTime) {
    this.errorMessage = "请选择开始日期时间！";
    return false;
  }
  if (this.broadStartDateTime) {
    let myDate = new Date();
    let broadStartDateTime = this.broadStartDateTime;
    if (myDate >= broadStartDateTime) {
      this.errorMessage = "开始日期时间不能“小于或等于”当前日期时间！";
      return false;
    }
  }
  if (!this.broadEndDateTime) {
    this.errorMessage = "请选择结束日期！";
    return false;
  }
  if (this.broadEndDateTime) {
    let broadStartDateTime = this.broadStartDateTime;
    let broadEndDateTime = this.broadEndDateTime;
    if (broadStartDateTime.getTime() >= broadEndDateTime.getTime()) {
      this.errorMessage = "结束日期时间不能“小于或等于”开始日期时间！";
      return false;
    }
    let s1 = broadStartDateTime.getTime();
    let s2 = broadEndDateTime.getTime();
    let total = (s2 - s1) / 1000;
    let day = parseInt(total / (24 * 60 * 60));//计算整数天数
    let afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
    let hour = parseInt(afterDay / (60 * 60));//计算整数小时数
    if (hour >= 24 || day >= 1) {
      this.errorMessage = "结束日期与开始日期不能相差超过“24”小时！";
      return false;
    }
  }
  if (!this.doorList) {
    this.errorMessage = "门禁ID集合必填！";
    return false;
  }
  return true;
}

//新建任务通知
ISpaceTaskInfo.prototype.httpSaveTaskInfo = function (successCallback, errorCallback) {
  let that = this;
  let url = this.URL_SAVE_TASK_INFO;
  if (this.templateId) {
    url = this.URL_EDIT_TASK_INFO;
  }
  if (!this.validate()) {
    that.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  let  image = new Image();
  image.src = this.image.url;
  image.onload = function () {
    if(image.width !== 800 || image.height !== 1280){
      console.error(image.width, image.height);
      NotificationBox.success({
        message: "图片的宽高为800px和1280px！"
      });
      return;
    } else {
      that.httpPost(url, that.getForm(), function (response) {
        let returnCode = response.body.returnCode;
        if (returnCode === '3006') {
          NotificationBox.success({
            message: response.body.message
          });
          return;
        }
        that.render(response.data[that.getTAG()]);
        successCallback && successCallback();
      }, errorCallback);
    }
  };

};


//任务通知的详情
ISpaceTaskInfo.prototype.httpDetailTaskInfo = function (successCallback, errorCallback) {
  let that = this;
  if (!this.templateId) {
    this.errorMessage = "没有详情！";
    this.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  this.detailLoading = true;
  let form = {
    templateId: that.templateId
  };
  this.httpPost(this.URL_DETAIL_TASK_INFO, form, function (response) {
    that.detailLoading = false;
    that.editMode = true;
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);
  }, function (response) {
    that.detailLoading = false;
    if (typeof errorCallback === "function") {
      errorCallback();
    } else {
      that.defaultErrorHandler(response);
    }
  });
}

//任务通知的确认删除
ISpaceTaskInfo.prototype.confirmDelete = function (successCallback, failureCallback) {

  let that = this;

  MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(function () {

      that.httpDelete(function () {
        NotificationBox.success({
          message: '成功删除!'
        });

        if (typeof successCallback === "function") {
          successCallback();
        }

      }, failureCallback);

    },
    function () {
      if (typeof failureCallback === "function") {
        failureCallback();
      }
    }
  );
}

//任务通知的删除
ISpaceTaskInfo.prototype.httpDelete = function (successCallback, errorCallback) {
  let that = this;
  console.log("任务通知的删除id" + this.templateId);
  if (!this.templateId) {
    this.errorMessage = "没有templateId，无法删除！";
    that.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  let form = {
    templateId: that.templateId
  };
  this.httpPost(this.URL_DELETE_TASK_INFO, form, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);
}

