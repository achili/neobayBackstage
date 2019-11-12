import Filter from "../base/Filter";
import {MessageBox,Message, Notification as NotificationBox} from 'element-ui'
import {lowerCamel, lowerSlash, startWith, toPlural} from "../../filter/str";
import Base from "../base/Base";
import $ from "jquery";
import Vue from "vue";
import {str2Date} from "../../filter/time";
import BaseEntity from "../base/BaseEntity";

export default function SpaceRegional() {

  //基本信息
  this.id = 0;
  this.name = null;
  this.sort = null;
  this.createTime = null;
  this.updateTime = null;
  this.deleted = false;

  this.description = null;
  this.longitude = null;
  this.latitude = null;
  this.address = null;
  this.no = null;
  this.englishAddress = null;
  this.loading = false;
  this.URL_PAGE = null;

}

SpaceRegional.prototype = new SpaceRegional();
SpaceRegional.prototype.constructor = SpaceRegional;

SpaceRegional.prototype.getFilters = function () {
  return [
    new Filter("SORT", "ID", "orderId"),
    new Filter('SORT', '创建时间', 'orderCreateTime'),
    new Filter("INPUT", "关键字", "keyword")
  ];
};

//We use this method to get the full js Object.
SpaceRegional.prototype.render = function (obj, one2one = false) {
  if (obj) {
    $.extend(this, obj);
  }
  // this.renderEntity("createTime", Date);
  // this.renderEntity("updateTime", Date);
  this.createTime = str2Date(this.createTime);
  this.updateTime = str2Date(this.updateTime);
};

SpaceRegional.prototype.getForm = function () {

  let form = {
    name: this.name,
    no: this.no,
    description: this.description,
    address: this.address,
    longitude: this.longitude,
    latitude: this.latitude,
    englishAddress: this.englishAddress
  };
  if (this.id) {
    form.id = this.id;
  }

  return form;
};

SpaceRegional.prototype.httpSave = function (successCallback, errorCallback) {

  let that = this;

  let url = this.getUrlCreate();
  if (this.id) {
    url = this.getUrlEdit();
  }

  if (!this.validate()) {
    that.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  this.httpPost(url, this.getForm(), function (response) {
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);

  }, errorCallback);
};

SpaceRegional.prototype.validate = function () {

  if (!this.name) {
    this.errorMessage = "名称必填！";
    return false;
  }

  if (!this.description) {
    this.errorMessage = "空间描述必填！";
    return false;
  }

  if (!this.longitude) {
    this.errorMessage = "坐标lng必填！";
    return false;
  }

  if (!this.latitude) {
    this.errorMessage = "坐标lat必填！";
    return false;
  }

  if (!this.address) {
    this.errorMessage = "地址必填！";
    return false;
  }

  if (!this.englishAddress) {
    this.errorMessage = "英语必填！";
    return false;
  }

  if (!this.no) {
    this.errorMessage = "工位号必填！";
    return false;
  }

  return true;
};

//获取到当前类的单数标签。比如 Project便得到 project
SpaceRegional.prototype.getTAG = function () {
  let className = this.constructor.name;
  return lowerCamel(className);
};

//Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
//url is something like this: /article/detail/1
//opts中可以传递一些特殊的选项。具体参考：https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
SpaceRegional.prototype.httpPost = function (url, params, successCallback, errorCallback, opts = {}) {
  let that = this;

  let fullUrl = url;
  if (!startWith(url, "http")) {
    fullUrl = Vue.http.options.root + url;
  }

  let options = $.extend({}, opts);

  options["emulateJSON"] = !(params instanceof FormData);

  this.loading = true;
  Vue.http.post(fullUrl, params, options).then(function (response) {
    that.loading = false;
    (typeof successCallback === "function") && successCallback(response);
  }, function (response) {
    that.loading = false;

    console.error(response);

    //对于没有登录的错误直接跳转到登录页面
    if (that.loginErrorHandler(response)) {
      return;
    }

    //有传入错误处理方法，就按你的执行
    if (typeof errorCallback === "function") {
      errorCallback(response);
    } else {
      //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
      that.defaultErrorHandler(response);
    }
  });
};

//we provide a default error handing method. handle with specific errorCallback.
SpaceRegional.prototype.defaultErrorHandler = function (response, errorCallback) {

  let msg = this.getErrorMessage(response);

  if (typeof errorCallback === "function") {
    errorCallback(response);
  } else {
    NotificationBox.error({
      title: "错误",
      message: msg
    });
  }
};

//Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
//opts中可以传递一些特殊的选项。具体参考：https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
SpaceRegional.prototype.httpGet = function (url, params = {}, successCallback, errorCallback, opts = {}) {
  let that = this;
  let fullUrl = url;
  if (!startWith(url, "http")) {
    fullUrl = Vue.http.options.root + url;
  }
  let options = $.extend({}, opts);
  options["params"] = params;

  this.loading = true;
  Vue.http.get(fullUrl, options).then(function (response) {

    that.loading = false;
    (typeof successCallback === "function") && successCallback(response);

  }, function (response) {

    that.loading = false;

    console.error(response);

    //对于没有登录的错误直接跳转到登录页面
    if (that.loginErrorHandler(response)) {
      return;
    }

    //有传入错误处理方法，就按你的执行
    if (typeof errorCallback === "function") {
      errorCallback(response);
    } else {
      //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
      that.defaultErrorHandler(response);
    }

  });

};

//专门捕捉没有登录这种错误。return true -> 有错误（已经处理掉了）  false -> 没错误 （什么都没干）
SpaceRegional.prototype.loginErrorHandler = function (response) {

  let temp = response["data"];
  if (temp !== null && typeof temp === "object") {
    if (temp["status"] === "LOGIN") {

      //登录页面出现的未登录信息一律不管。
      let fullPath = Vue.store.state.route.fullPath;
      if (!startWith(fullPath, "/login")) {

        //加锁，一次性只展示一个登录信息。
        if (!Base.showLoginError) {
          Base.showLoginError = true;
          NotificationBox.error({
            message: "您已退出，请登录后再访问。",
            onClose: function () {
              Base.showLoginError = false;
            }
          });
          //注销登录
          Vue.store.state.user.innerLogout();
          Vue.router.push({
            path: '/login',
            query: {redirect: Vue.store.state.route.fullPath}
          });
        }
      }
      return true;
    }
  }
  return false;
};

//get errorMessage from response and wrap the value to this.errorMessage.
SpaceRegional.prototype.getErrorMessage = function (response) {

  let msg = "服务器出错，请稍后再试!";

  if (response === null) {
    msg = "出错啦，请稍后重试！";
  } else if (typeof response === "string") {
    msg = response;
  } else if (response["message"]) {
    msg = response["message"];
  } else {
    let temp = response["data"];
    if (temp !== null && typeof temp === "object") {
      if (temp["message"]) {
        msg = temp["message"];
      } else {
        if (temp["error"] && temp["error"]["message"]) {
          msg = temp["error"]["message"];
        }
      }
    }
  }
  this.errorMessage = msg;
  return msg;
};

//获取到当前类的复数标签。比如 Project便得到 projects
SpaceRegional.prototype.getTAGS = function () {
  return toPlural(this.getTAG());
};

//如果自己仅仅是作为一个列表中的属性渲染的话，那么我们只关心个别关键字段。
//比如在SpaceApply中SpaceSeats，这个如果使用render的话，那么页面加载速度将非常慢。
SpaceRegional.prototype.simpleRender = function (obj, one2one = false) {
  this.render(obj, one2one);
};

//common http detail methods.
SpaceRegional.prototype.httpDetail = function (successCallback, errorCallback) {

  let that = this;
  if (!this.id) {
    this.errorMessage = "没有详情！";
    this.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }

  let url = this.getUrlDetail(this.id);

  if (!url) {
    return;
  }

  this.detailLoading = true;

  this.httpGet(url, {}, function (response) {
    that.detailLoading = false;
    that.editMode = true;
    that.render(response.data[that.getTAG()]);
    successCallback && successCallback(response);

  }, function (response) {

    that.detailLoading = false;

    if (typeof errorCallback === "function") {
      errorCallback();
    } else {
      //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
      that.defaultErrorHandler(response);
    }
  });

};

SpaceRegional.prototype.getUrlDetail = function (id = null) {
  let prefix = this.getUrlPrefix();

  if (id === null) {
    return prefix + "/detail/{id}";
  } else {
    return prefix + "/detail/" + id;
  }

};

SpaceRegional.prototype.getUrlCreate = function () {
  let prefix = this.getUrlPrefix();

  return prefix + "/create";
};

SpaceRegional.prototype.getUrlEdit = function () {
  let prefix = this.getUrlPrefix();

  return prefix + "/edit";
};

SpaceRegional.prototype.getUrlPage = function () {
  let prefix = this.getUrlPrefix();

  return prefix + "/page";
}

//获取到当前实体的url前缀。
SpaceRegional.prototype.getUrlPrefix = function () {
  return lowerSlash(this.getTAG());
};

//该实体目前是否能够编辑
SpaceRegional.prototype.canEdit = function () {
  return true;
};

//确认删除操作.
SpaceRegional.prototype.confirmDel = function (successCallback, failureCallback) {
  let that = this;
  MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(function () {

      that.httpDel(function () {
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
};

SpaceRegional.prototype.httpDel = function (successCallback, errorCallback) {
  let that = this;
  if (!this.id) {
    this.errorMessage = "没有id，无法删除！";
    that.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  let url = this.getUrlDel(this.id);
  if (!url) {
    return;
  }
  this.httpPost(url, {}, function (response) {
    successCallback && successCallback(response);
  }, errorCallback);

};

SpaceRegional.prototype.getUrlDel = function (id = null) {
  let prefix = this.getUrlPrefix();
  if (id === null) {
    return prefix + "/del/{id}";
  } else {
    return prefix + "/del/" + id;
  }
};

//直接render出一个Entity. field字段名，Clazz类名。
SpaceRegional.prototype.renderEntity = function (field, Clazz, one2one = false) {

  let obj = this[field];
  if (!obj) {
    if (Clazz) {
      if(Clazz !== Date) {
        let EntityClazz = this.constructor;
        obj = (new EntityClazz())[field];
      }
    } else {
      return;
    }
  }

  if (Clazz === Date) {

    this[field] = str2Date(obj);
  } else if (Clazz.prototype instanceof Base) {

    //可能此处的该项属性做了特殊处理的。比如：this.avatar = new Tank("image", false, 1024 * 1024, "图片尺寸不超过1M");
    //1024*1024 以及 "图片尺寸不超过1M"用let bean = new Clazz(); 就无法反映出来。因为父类render的时候已经将avatar给变成了Object.
    //let bean = new Clazz();
    let bean = (new this.constructor())[field];
    if (!bean) {
      bean = new Clazz();
    }

    bean.render(obj, one2one);
    this[field] = bean;
  } else {
    console.error("调用错误！");
  }

}

SpaceRegional.prototype.URL_PAGE = '/space/regional/page';
