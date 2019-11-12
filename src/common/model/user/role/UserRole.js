import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";
import UserAccess from "../access/UserAccess";

import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../core/feature/FeatureType";
import {isEmptyObject} from "../../../util/Utils";
import SpaceRegional from "../../space/SpaceRegional";

let Status = {
	OK: "OK",
	ERROR: "ERROR"
}
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
}


let Type = {
	PROGRAMMER: "PROGRAMMER",
	ADMINISTRATOR: "ADMINISTRATOR",
	USER: "USER",
	GUEST: "GUEST",
	CUSTOM: "CUSTOM",
  CONSUMER: "CONSUMER"
}
let TypeMap = {
	PROGRAMMER: {
		name: "网站维护人员",
		value: "PROGRAMMER",
		style: "success"
	},
	ADMINISTRATOR: {
		name: "超级管理员",
		value: "ADMINISTRATOR",
		style: "success"
	},
	USER: {
		name: "注册用户",
		value: "USER",
		style: "success"
	},
	GUEST: {
		name: "游客",
		value: "GUEST",
		style: "success"
	},
	CUSTOM: {
		name: "自定义角色",
		value: "CUSTOM",
		style: "success"
	},
  CONSUMER: {
		name: "第三方用户账号测试",
		value: "CONSUMER",
		style: "success"
	}
}


export default function UserRole(id = 3) {

	BaseEntity.call(this, arguments);

	this.id = id;
	this.name = null;
	this.description = null;

	this.special = false;
	this.type = Type.GUEST;
	this.accesses = [];

	//权限的二维数组。
	this.accessMap = {};

}


//extend BaseEntity
UserRole.prototype = new BaseEntity();
UserRole.prototype.constructor = UserRole;

UserRole.prototype.URL_PERMISSION = "/user/role/permission";


UserRole.prototype.Status = Status;
UserRole.prototype.StatusMap = StatusMap;
UserRole.prototype.StatusList = UserRole.prototype.getStatusList();

UserRole.prototype.Type = Type;
UserRole.prototype.TypeMap = TypeMap;
UserRole.prototype.TypeList = UserRole.prototype.getTypeList();


UserRole.prototype.getFilters = function () {
	return [
		new Filter("INPUT", "角色名", "name"),
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "创建时间", "orderCreateTime"),
    new Filter("SPACE_MULTI_SELECTION", "所属园区", "spaceRegionalIds", null, SpaceRegional)

  ];
};

//We use this method to get the full js Object.
UserRole.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);

	this.renderList("accesses", UserAccess);


	// this.renderAccessMap();
}


//渲染accessMap
UserRole.prototype.renderAccessMap = function () {

	this.accessMap = {};
  this.accesses.forEach(access => {
    if(!this.accessMap[access.spaceRegional.id]) {
      this.accessMap[access.spaceRegional.id] = {}
    }
    this.accessMap[access.spaceRegional.id][access.featureType] = access.active;
  });

}

//获取更改的accessMap
UserRole.prototype.getAccessMap = function() {
  let accessMap = {};
  this.accesses.forEach(access => {
    if(access.newActive !== access.active) {
      if(!accessMap[access.spaceRegional.id]) {
        accessMap[access.spaceRegional.id] = {}
      }
      accessMap[access.spaceRegional.id][access.featureType] = access.newActive;
    }
  });
  return accessMap;
}


UserRole.prototype.getForm = function () {

	let form = {
		name: this.name,
		description: this.description,
    spaceRegional:this.spaceRegional.id
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}


UserRole.prototype.validate = function () {
	if (!this.name) {
		this.errorMessage = "标题必填！";
		return false;
	}
	return true;
}


//快速查看对某一项功能点是否有权限
UserRole.prototype.hasPermission = function (featureType) {

	if (isEmptyObject(this.accessMap)) {
		console.error(this.accessMap);
		console.error("角色未渲染权限，请及时排查。");
		return false;
	} else if (!this.accessMap.hasOwnProperty(featureType)) {
		console.error("数据库中没有" + featureType + ",请及时排查");
		return false;
	} else {
		return this.accessMap[featureType];
	}

}

//查看对于某一个模块是否具有部分功能点
UserRole.prototype.hasPartialPermission = function (moduleType) {

	let that = this;

	if (!this.accessMap) {
		console.error("角色未渲染权限，请及时排查。");
		return false;
	} else {

		if (!ModuleFeatureMap[moduleType]) {
			console.error("没有定义" + moduleType + ",请及时排查");
			return false;
		} else {
			let featureTypes = ModuleFeatureMap[moduleType];
			featureTypes.forEach(featureType => {
				if (that.accessMap.hasOwnProperty(featureType)) {
					console.error("没有定义" + featureType + ",请及时排查");
					return false;
				} else {
					if (this.accessMap[featureType]) {
						return true;
					}
				}
			});

		}


		return false;
	}

}

//快速查看对某一项功能点是否有权限
UserRole.prototype.hasPermissionSpace = function (featureType,spaceRegional) {
  if(spaceRegional > 0 ){
    let access = this.accessMap[spaceRegional];
    // console.log(this.accessMap)
    if (isEmptyObject(this.accessMap)) {
      console.error(this.accessMap);
      console.error("角色未渲染权限，请及时排查。");
      return false;
    } else if (!this.accessMap.hasOwnProperty(spaceRegional)) {
      console.error("数据库中没有" + spaceRegional + "的权限,请及时排查");
      return false;
    } else if(!access || !access.hasOwnProperty(featureType)) {
      console.error("数据库中没有" + spaceRegional + "的" + featureType + ",请及时排查");
      return false;
    } else {
      return this.accessMap[spaceRegional][featureType];
    }
  }

};


//保存用户的权限。
UserRole.prototype.httpPermission = function (successCallback, errorCallback) {

	let that = this;

	let url = this.URL_PERMISSION;

	let accesses = this.getAccessMap();

	let form = {
		id: this.id,
		accessesInfo: JSON.stringify(accesses)
	};

	this.httpPost(url, form, function (response) {

		that.render(response.data[that.getTAG()]);

		successCallback && successCallback(response);


	}, errorCallback);

}
