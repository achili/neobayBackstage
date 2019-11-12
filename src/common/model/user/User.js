import Vue from 'vue'
import {validateEmail} from '../../../common/filter/validate'
import {str2Date} from '../../filter/time'
import BaseEntity from '../base/BaseEntity'
import Tank from '../tank/Tank'
import UserRole from './role/UserRole'
import Filter from '../base/Filter'
import Captcha from '../common/Captcha'
import PhoneValidation from '../common/PhoneValidation'
import {validatePhone} from '../../filter/validate'
import $ from 'jquery'
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import $store from '../../../common/store/index'

import Project from '../project/Project'

//菜单
import backyardMenu from '../../../common/menu/backyardMenu'
import userMenu from '../../../common/menu/userMenu'
import groupMenus from '../../menu/groupMenus'
import developerMenu from '../../../common/menu/developerMenu'
import {MessageBox, Notification as NotificationBox} from 'element-ui'


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

let UploadFaceType = {
  OK: "OK",
  UNDER_WAY: "UNDER_WAY",
  NOT: "NOT",
  FAIL: "FAIL"
};
let UploadFaceTypeMap = {
  OK: {
    name: "认证成功",
    value: "OK",
    style: "success"
  },
  UNDER_WAY: {
    name: "正在认证",
    value: "UNDER_WAY",
    style: "warning"
  },
  FAIL: {
    name: "认证失败",
    value: "FAIL",
    style: "error"
  },
  NOT: {
    name: "未上传",
    value: "NOT",
    style: "info"
  }
};


export default function User() {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.role = new UserRole();

	this.email = null;
	this.phone = null;
	this.password = null;
	this.nickname = null;
	this.description = null;
	this.gender = null;
	this.city = null;
	this.avatar = new Tank("image", false);
	this.avatarUrl = null;
	this.lastIp = null;
	this.lastTime = null;
	this.iSpaceDoorList = [];


	/****************项目相关（这里只能保存ID，否则循环创建栈溢出）*******************/
  this.defaultProjectId = null;


	this.emailValidate = null;
	this.status = Status.OK;

	//local fields.
	//统指邮箱或手机
	this.username = null;
	this.isLogin = false;
	this.repassword = null;

	/*****************各个菜单***************************/
	this.byMenus = []; //管理员后台
  this.groupMenus = []; //项目后台
  this.userMenus = []; //个人中心
  this.developerMenus = []; //开发者工具

	//修改密码的时候用到的字段
	this.newPassword = null;
	this.reNewPassword = null;

	//登录的密码，服务器返回字段中没有密码
	this.localPassword = "";

	//图形验证码模块。
	this.captcha = new Captcha();
	//手机验证码模块。
	this.phoneValidation = new PhoneValidation();
  //人脸识别
  this.uploadFace = new Tank('image', false, 1024 * 1024, '图片不能超过2M');
  this.uploadFaceType = UploadFaceTypeMap.NOT.value;

  //绑定NFC
  this.employeeNfc = null;
}

//extend BaseEntity
User.prototype = new BaseEntity();
User.prototype.constructor = User;

User.prototype.URL_LOGIN = "/user/login";
User.prototype.URL_UPDATE = "/user/update";
User.prototype.URL_LOGOUT = "/user/logout";
User.prototype.URL_REGISTER = "/user/register";
User.prototype.URL_PASSWORD_CHANGE = "/user/password/change";
User.prototype.URL_PASSWORD_RESET = "/user/password/reset";
User.prototype.URL_PHOEN_CHANGE = "/user/phone/change";
User.prototype.URL_EMAIL_SEND = "/user/email/send";

User.prototype.URL_USER_NOTIFI = "/device/notifi/user";

User.prototype.URL_EMAIL_VALIDATE = "/user/email/validate";
User.prototype.URL_DETAIL_DOOR = "/user/detail/door/{id}";

//人脸识别
User.prototype.URL_UPLOAD_FACE = "/user/upload/face";
User.prototype.URL_QUERY_FACE = "/user/query/face";

//绑定NFC
User.prototype.URL_BINDINGNFC = "/user/nfc/binding";
//解绑NFC
User.prototype.URL_UNBINDNFC = "/user/nfc/unbind";
//查询NFC
User.prototype.URL_VIEWNFC = "/user/nfc/view";

User.prototype.Status = Status;
User.prototype.StatusMap = StatusMap;
User.prototype.StatusList = User.prototype.getStatusList();

User.prototype.registerEnum("UploadFaceType", UploadFaceTypeMap);


User.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "上次登录", "orderLastTime"),
		new Filter("INPUT", "关键字", "keyword"),
		new Filter("INPUT", "名字", "nickname")
	];
};

//获取用户头像的url.
User.prototype.getAvatarUrl = function () {
	if (this.avatar && this.avatar.url) {
		return this.avatar.url;
	} else if (this.avatarUrl) {
		return this.avatarUrl;
	} else {
		return require("../../assets/img/avatar.png");
	}
}


User.prototype.refreshMenus = function () {
	//this.refreshByMenus();
  this.byMenus = backyardMenu.getMenuByUser(this);
  this.groupMenus = groupMenus.getMenuByUser(this);
  this.userMenus = userMenu.getMenuByUser(this);

  this.developerMenus = developerMenu.getMenuByUser(this);
};


User.prototype.refreshByMenus = function () {


};

//We use this method to get the full js Object.
User.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);

	this.lastTime = str2Date(this.lastTime);

	this.renderEntity("role", UserRole);
  this.role.renderAccessMap();

	this.renderEntity("avatar", Tank);


	//渲染两个特殊的东西
	this.renderEntity("captcha", Captcha);
	this.renderEntity("phoneValidation", PhoneValidation);

}


//从本地存储中读取用户信息
User.prototype.renderFromLocalStorage = function () {

	try {
		let userString = readLocalStorage(this.getTAG());

		if (userString) {
			let json = JSON.parse(userString);
			this.render(json);
			//从本地加载user之后，可以去访问后台菜单了
			this.refreshMenus();
		}
  } catch (e) {
		removeLocalStorage(this.getTAG());
	}
}
//将用户信息存储在本地。
User.prototype.saveToLocalStorage = function (rawUserObject = null) {

	if (rawUserObject) {
		rawUserObject.isLogin = true;
	}
	saveToLocalStorage(this.getTAG(), JSON.stringify(rawUserObject));
}
//清除本地的user信息
User.prototype.clearLocalStorage = function () {

	removeLocalStorage(this.getTAG());
}
//更新本地持久化了的个别字段。
User.prototype.updateLocalStorage = function (opt = {}) {
	try {
		let userString = readLocalStorage(this.getTAG());


		if (userString) {
			let json = JSON.parse(userString);
			$.extend(json, opt);

			saveToLocalStorage(this.getTAG(), JSON.stringify(json));
		}

	} catch (e) {
		removeLocalStorage(this.getTAG());
	}
}

User.prototype.getForm = function () {

	return {
		id: this.id,
		email: this.email,
		description: this.description,
		avatarCode: this.avatar.code,
		roleId: this.role.id
	};
}
User.prototype.getForms = function () {
  return {
    id: this.id
  };
}

User.prototype.getLoginForm = function () {

	return {
		username: this.username,
		password: this.localPassword,
		token: this.captcha.token,
		captcha: this.captcha.value
	};
}
User.prototype.getRegisterForm = function () {

	return {
		email: this.email,
		phone: this.phone,
		password: this.password,
		nickname: this.nickname,
		phoneCode: this.phoneValidation.value
	};
}


User.prototype.validate = function () {

	if (!this.email) {
		this.errorMessage = "邮箱必填！";
		return false;
	}

	return true;
}
User.prototype.validateNFC = function () {

	if (!this.employeeNfc) {
		this.errorMessage = "NFC卡号必填！";
		return false;
	}

	return true;
}

User.prototype.loginValidate = function () {

	//validate first.
	if (!validateEmail(this.username)) {

		if (!validatePhone(this.username)) {
			this.errorMessage = "邮箱或手机格式不正确"
			return false;
		}

	}
	if (!this.localPassword) {
		this.errorMessage = "密码必填"
		return false;
	}
	if (this.captcha.visible) {
		if (!this.captcha.value) {
			this.errorMessage = "验证码必填"
			return false;
		}
	}
	return true;
}


//人脸上传
User.prototype.httpUploadFace = function(uploadFaceCode,successCallback, errorCallback){
  let that = this;
  let form = {
    uploadFaceCode : uploadFaceCode,
    id : that.id,
    website : "true"
  };
  let  image = new Image();
  image.src = that.uploadFace.url;
  image.onload = function () {
    if(image.width < 480 || image.height < 640){
      console.log("这儿来了")
      console.error(image.width, image.height);
      NotificationBox.success({
        message: "图片的宽高不低于480px和640px！"
      });
    } else {
      that.httpPost(that.URL_UPLOAD_FACE,form,function (response) {
        successCallback && successCallback(response)
      },errorCallback);
    }
  };
};
User.prototype.httpUpdateFace = function(successCallback, errorCallback){
  let form = {
    id : this.id
  };
  let that = this;
  this.httpPost(this.URL_QUERY_FACE,form,function (response) {
    let data = {
      uploadFaceType: "OK",
      uploadFace: new Tank()
    };
    data = response.data.data;
    that.uploadFaceType = data.uploadFaceType;

    if(!that.uploadFace){
      that.uploadFace = new Tank("image");
    }
    that.uploadFace.render(data.uploadFace);
    successCallback && successCallback(response)
  }, errorCallback);
};



User.prototype.registerValidate = function () {

	//validate first.
	if (!validateEmail(this.email)) {
		this.errorMessage = "邮箱格式不正确"
		return false;
	}

	//validate phone.
	if (!this.phone) {
		this.errorMessage = "手机必填"
		return false;
	}

	if (!this.nickname) {
		this.errorMessage = "姓名必填"
		return false;
	}
	if (!this.password) {
		this.errorMessage = "密码必填"
		return false;
	}
	if (this.password !== this.repassword) {
		this.errorMessage = "两次密码输入不一致"
		return false;
	}
	if (!this.phoneValidation.value) {
		this.errorMessage = "手机验证码必填"
		return false;
	}
	return true;
}


//local logout.
User.prototype.innerLogout = function () {

	this.render(new User());

	this.clearLocalStorage();

}

User.prototype.innerLogin = function (response) {
	let that = this;
	that.errorMessage = null;
	that.render(response.data.user);
	that.isLogin = true;

	//用户登陆后我们认为可以去访问后台菜单了
	this.refreshMenus();

	//登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
	this.saveToLocalStorage(response.data.user);

}

User.prototype.hasPermission = function (featureType) {

	if (this.role) {
		return this.role.hasPermission(featureType);
	} else {
		console.error("该用户没有角色，请及时排查。");
		return false;
	}
}


User.prototype.hasPartialPermission = function (moduleType) {

	if (this.role) {
		return this.role.hasPartialPermission(moduleType);
	} else {
		console.error("该用户没有角色，请及时排查。");
		return false;
	}
}

User.prototype.hasPermissionSpace = function(featureType,spaceRegional){
  if (this.role) {
    return this.role.hasPermissionSpace(featureType,spaceRegional);
  } else {
    console.error("该用户没有角色，请及时排查。");
    return false;
  }
};

User.prototype.hasPermissionAllSpace = function(featureType){
  if (this.role) {
    let space = false;
    $store.state.spaceRegionals.spaceRegionals.forEach(spaceRegional=>{
      if(this.role.hasPermissionSpace(featureType,spaceRegional.id)){
        space = true;
      }
    });
    if(space){
      return true
    }
  } else {
    console.error("该用户没有角色，请及时排查。");
    return false;
  }
};

User.prototype.httpLogin = function (successCallback, errorCallback) {

	let that = this;

	if (!this.loginValidate()) {
		return;
	}

	this.httpPost(this.URL_LOGIN, this.getLoginForm(), function (response) {

		that.innerLogin(response);

		//拉取消息
		Vue.store.state.messageManager.httpCount();

		successCallback && successCallback(response);
	}, errorCallback);
}

//自动登陆的更新用户信息
User.prototype.httpUpdateInfo = function (successCallback, errorCallback) {
  if(this.isLogin) {
    let that = this;
    this.httpPost(this.URL_UPDATE, {}, function (response) {
      that.innerLogin(response);
      successCallback && successCallback(response);
    }, errorCallback);
  }

}

User.prototype.httpLogout = function (successCallback, errorCallback) {

	let that = this;

	that.innerLogout();

	this.httpPost(this.URL_LOGOUT, {}, function (response) {


		successCallback && successCallback(response);
	}, errorCallback);
}

User.prototype.httpRegister = function (successCallback, errorCallback) {


	if (!this.registerValidate()) {
		return;
	}

	let that = this;
	this.httpPost(this.URL_REGISTER, this.getRegisterForm(), function (response) {

		that.innerLogin(response);

		successCallback && successCallback(response);
	}, errorCallback);
}


User.prototype.passwordResetValidate = function () {

	if (!this.newPassword) {
		this.errorMessage = "密码必填"
		return false;
	}

	if (this.newPassword !== this.reNewPassword) {
		this.errorMessage = "两次密码输入不一致"
		return false;
	}

	if (!this.phoneValidation.phone) {
		this.errorMessage = "手机必填"
		return false;
	}

	if (!this.phoneValidation.value) {
		this.errorMessage = "手机验证码必填"
		return false;
	}

	this.errorMessage = null;

	return true;
}


User.prototype.httpPasswordReset = function (successCallback, errorCallback) {


	if (!this.passwordResetValidate()) {
		return;
	}


	let form = {
		phone: this.phoneValidation.phone,
		phoneCode: this.phoneValidation.value,
		password: this.newPassword
	}

	let that = this;
	this.httpPost(this.URL_PASSWORD_RESET, form, successCallback, errorCallback);

}


User.prototype.httpPasswordChange = function (successCallback, errorCallback) {


	if (!this.password) {
		this.errorMessage = "旧密码必填";
		return;
	} else if (!this.newPassword) {
		this.errorMessage = "新密码必填";
		return;
	} else if (this.newPassword !== this.reNewPassword) {
		this.errorMessage = "两次密码输入不一致";
		return;
	}
	this.errorMessage = null;

	let form = {
		oldPassword: this.password,
		newPassword: this.newPassword
	};


	this.httpPost(this.URL_PASSWORD_CHANGE, form, successCallback, errorCallback);

}

User.prototype.httpPhoneChange = function (successCallback, errorCallback) {
	if (!this.phoneValidation.phone) {
		this.errorMessage = "新手机必填";
		return;
	}
	if (!this.phoneValidation.captcha.value) {
		this.errorMessage = "请填写图形验证码";
		return;
	}
	this.errorMessage = null;
	let form = {
		phoneCode: this.phoneValidation.value,
		phone: this.phoneValidation.phone
	};

	this.httpPost(this.URL_PHOEN_CHANGE, form, successCallback, errorCallback);
}

User.prototype.httpSave = function (successCallback, errorCallback) {

	let that = this;
	BaseEntity.prototype.httpSave.call(this, function (response) {

		if (Vue.store.state.user.id === that.id) {

			//修改用户之后可能会引起变化的字段。
			Vue.store.state.user.email = that.email;
			Vue.store.state.user.emailValidate = that.emailValidate;
			Vue.store.state.user.description = that.description;
			Vue.store.state.user.avatar = that.avatar;
			Vue.store.state.user.avatarUrl = that.avatarUrl;

		}
		successCallback && successCallback(response);
	}, errorCallback);


};

User.prototype.httpEmailSend = function (successCallback, errorCallback) {

	let form = {};


	this.httpPost(this.URL_EMAIL_SEND, form, successCallback, errorCallback);

}


User.prototype.httpEmailValidate = function (code, successCallback, errorCallback) {

	if (!code) {
		this.errorMessage = "验证code必填";
		return;
	}

	let form = {
		code: code
	};


	this.httpPost(this.URL_EMAIL_VALIDATE, form, successCallback, errorCallback);

}

User.prototype.httpDetailDoor = function (successCallback, errorCallback) {
  let that = this;
  this.detailLoading = true;
  this.httpGet(this.URL_DETAIL_DOOR, this.getForms(), function (response) {
    /* that.user.iSpaceDoorList = response.data();*/
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
}

//绑定NFC
User.prototype.httpBindingNFC = function (successCallback,errorCallback) {
  let that = this;
  if (!this.validateNFC()) {
    that.defaultErrorHandler(this.errorMessage, errorCallback);
    return;
  }
  let params = {
    id: this.id,
    employeeNfc: this.employeeNfc
  };
  this.httpPost(this.URL_BINDINGNFC,params,function (response) {
    let returnCode = response.data.jsonObject.returnCode;
    if (returnCode === '3006') {
      that.defaultErrorHandler(response.data.jsonObject.message, errorCallback);
      return;
    }
    successCallback && successCallback(response);
  },errorCallback);
};
//解绑NFC
User.prototype.httpUnbindNFC = function (successCallback,errorCallback) {
  let that = this;
  let params = {
    id: this.id
  };
  this.httpPost(this.URL_UNBINDNFC,params,function (response) {
    let returnCode = response.data.jsonObject.returnCode;
    if (returnCode === '3006') {
      that.defaultErrorHandler(response.data.jsonObject.message, errorCallback);
      return;
    }
    successCallback && successCallback(response);
  },errorCallback);
};
//查询NFC
User.prototype.httpViewNFC = function (successCallback,errorCallback) {
  let that = this;
  let params = {
    id: this.id
  };
  this.httpPost(this.URL_VIEWNFC,params,function (response) {
    successCallback && successCallback(response);
  },errorCallback);
};
