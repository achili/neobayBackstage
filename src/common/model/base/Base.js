import $ from "jquery";
import Vue from "vue";
import {Notification} from "element-ui";
import {lowerCamel, lowerSlash, startWith, toPlural} from "../../filter/str";
import {str2Date} from "../../filter/time";
import {validateNumeric} from "../../filter/validate";

let StatusMap = {}
let TypeMap = {}


export default function Base() {

	//local fields. Used in UI.
	this.errorMessage = null;
	this.editMode = false;
	this.loading = false;

	//加载详情时的loading，这是一种特殊的loading状态，只有详情加载好了，我们才展示整个页面，在LoadingFrame中有用到
	this.detailLoading = false;
	//序号
  this.baseIndex = 1;
}

Base.prototype.StatusMap = StatusMap;
Base.prototype.TypeMap = TypeMap;

Base.prototype.getStatusList = function () {

	if (!this.StatusMap) {
		console.error(this.getTAG() + "错误！未指定StatusMap!");
		return [];
	}

	let list = [];
	for (let key in this.StatusMap) {

		if (this.StatusMap.hasOwnProperty(key)) {
			list.push(this.StatusMap[key]);
		}

	}

	if (list.length === 0) {
		console.error(this.getTAG() + "StatusList为空，请检查");
	}

	return list;

}
Base.prototype.getStatusMap = function () {
	if (!this.StatusMap) {
		console.error(this.getTAG() + "错误！未指定StatusMap!");
		return {};
	} else {
		return this.StatusMap;
	}

}
Base.prototype.getStatusItem = function (status) {
	if (!this.StatusMap) {
		console.error(this.getTAG() + "错误！未指定StatusMap!");
		return {
			name: "未知状态",
			value: null,
			style: "danger",
			icon: "ban"
		};
	} else {
		let item = this.StatusMap[status];
		if (item) {
			return item;
		} else {
			return {
				name: "未知状态",
				value: null,
				style: "danger",
				icon: "ban"
			};
		}

	}

}

Base.prototype.getStatusName = function () {
	if (this.status && this.StatusMap) {
		let item = this.StatusMap[this.status];
		if (item) {
			return item.name;
		}

		console.error(this.getTAG() + " getStatusName 没有定义 " + this.status);
	} else {
		console.error(this.getTAG() + " getStatusName 没有定义 status");

	}

	return "未知状态";
};

Base.prototype.getStatusStyle = function () {

	if (this.status && this.StatusMap) {
		let item = this.StatusMap[this.status];
		if (item) {
			return item.style;
		}
		console.error(this.getTAG() + " getStatusStyle 没有定义 " + this.status);
	} else {
		console.error(this.getTAG() + " getStatusStyle 没有定义 status");
	}

	return "default";
};


Base.prototype.getStatusIcon = function () {

	if (this.status && this.StatusMap) {
		let item = this.StatusMap[this.status];
		if (item) {
			return item.icon;
		}
		console.error(this.getTAG() + " getStatusIcon 没有定义 " + this.status);
	} else {
		console.error(this.getTAG() + " getStatusIcon 没有定义 status");
	}

	return "ban";
};


Base.prototype.getTypeList = function () {

	if (!this.TypeMap) {
		console.error(this.getTAG() + "错误！未指定TypeMap!");
		return [];
	}

	let list = [];
	for (let key in this.TypeMap) {

		if (this.TypeMap.hasOwnProperty(key)) {
			list.push(this.TypeMap[key]);
		}

	}

	if (list.length === 0) {
		console.error(this.getTAG() + " TypeList为空，请检查");
	}

	return list;

}
Base.prototype.getOrsTypeList = function () {

  if (!this.OrsTypeMap) {
    console.error(this.getTAG() + "错误！未指定TypeMap!");
    return [];
  }

  let list = [];
  for (let key in this.OrsTypeMap) {

    if (this.OrsTypeMap.hasOwnProperty(key)) {
      list.push(this.OrsTypeMap[key]);
    }

  }

  if (list.length === 0) {
    console.error(this.getTAG() + " TypeList为空，请检查");
  }

  return list;

}
Base.prototype.getTypeMap = function () {
	if (!this.TypeMap) {
		console.error(this.getTAG() + "错误！未指定TypeMap!");
		return {};
	} else {
		return this.TypeMap;
	}

}

Base.prototype.getTypeItem = function (type) {
	if (!this.TypeMap) {
		console.error(this.getTAG() + "错误！未指定TypeMap!");
		return {
			name: "未知状态",
			value: null,
			style: "danger",
			icon: "ban"
		};
	} else {
		let item = this.TypeMap[type];
		if (item) {
			return item;
		} else {
			return {
				name: "未知状态",
				value: null,
				style: "danger",
				icon: "ban"
			};
		}
	}
}

Base.prototype.getTypeName = function () {
	if (this.type && this.TypeMap) {
		let item = this.TypeMap[this.type];
		if (item) {
			return item.name;
		}

		console.error("没有定义 " + this.type);
	} else {
		console.error("没有定义 type");
	}


	return "未知类型";
};
Base.prototype.getOrsTypeName = function () {
  if (this.ors && this.OrsTypeMap) {
    let item = this.OrsTypeMap[this.ors];
    if (item) {
      return item.name;
    }

    console.error("没有定义 " + this.ors);
  } else {
    console.error("没有定义 type");
  }


  return "未知类型";
};
Base.prototype.getTypeStyle = function () {
	if (this.type && this.TypeMap) {
		let item = this.TypeMap[this.type];
		if (item) {
			return item.style;
		}

		console.error("没有定义 " + this.type);
	} else {

		console.error("没有定义 type");
	}

	return "default";
};
Base.prototype.getOrsTypeStyle = function () {
  if (this.ors && this.OrsTypeMap) {
    let item = this.OrsTypeMap[this.ors];
    if (item) {
      return item.style;
    }

    console.error("没有定义 " + this.ors);
  } else {

    console.error("没有定义 type");
  }

  return "default";
};

Base.prototype.getTypeIcon = function () {
	if (this.type && this.TypeMap) {
		let item = this.TypeMap[this.type];
		if (item) {
			return item.icon;
		}

		console.error("没有定义 " + this.type);
	} else {

		console.error("没有定义 type");
	}

	return "default";
}

//往某个实体的prototype中注册某个枚举类型。以Category为例，会注册以下属性和方法
//Category CategoryMap CategoryList getCategoryList() getCategoryMap()
// getCategoryItem() getCategoryStyle() getCategoryName() getCategoryIcon()
Base.prototype.registerEnum = function (EnumName, EnumMap) {

	if (!EnumName || !EnumMap) {
		console.error("注册枚举变量时参数错误！");
		return;
	}

	//首字母小写的键。
	let enumName = EnumName.replace(/(\w)/, function (v) {
		return v.toLowerCase()
	});
	let Enum = {};
	let EnumList = [];
	for (let key in EnumMap) {
		Enum[key] = key;
		EnumList.push(EnumMap[key]);
	}

	this[EnumName] = Enum;

	this[EnumName + "Map"] = EnumMap;
	this["get" + EnumName + "Map"] = function () {
		return EnumMap;
	};
	this[EnumName + "List"] = EnumList;
	this["get" + EnumName + "List"] = function () {
		return EnumList;
	};
	this["get" + EnumName + "Item"] = function () {
		if (this[enumName]) {
			let item = EnumMap[this[enumName]];
			if (item) {
				return item;
			}
			console.error("没有定义 " + this[enumName]);
		} else {

			console.error("没有定义 enum");
		}
		return {
			name: "未知枚举类型",
			value: null,
			style: "danger",
			icon: "ban"
		};
	};
	this["get" + EnumName + "Style"] = function () {
		if (this[enumName]) {
			let item = EnumMap[this[enumName]];
			if (item) {
				return item.style;
			}

			console.error("没有定义 " + this[enumName]);
		} else {

			console.error("没有定义 enum");
		}

		return "default";
	};
	this["get" + EnumName + "Name"] = function () {
		if (this[enumName]) {
			let item = EnumMap[this[enumName]];
			if (item) {
				return item.name;
			}

			console.error("没有定义 " + this[enumName]);
		} else {

			console.error("没有定义 enum");
		}

		return "未知枚举类型";
	};
	this["get" + EnumName + "Icon"] = function () {
		if (this[enumName]) {
			let item = EnumMap[this[enumName]];
			if (item) {
				return item.icon;
			}

			console.error("没有定义 " + this[enumName]);
		} else {

			console.error("没有定义 enum");
		}

		return "ban";
	};


	return "default";
};


//We use this method to get the full js Object.
//对于一对一的情况，会出现无穷递归，我们使用 one2one 参数来标识这个字段是否是另外一个对象的one2one字段。
Base.prototype.render = function (obj, one2one = false) {
	if (obj) {
		$.extend(this, obj);
	}
}

//如果自己仅仅是作为一个列表中的属性渲染的话，那么我们只关心个别关键字段。
//比如在SpaceApply中SpaceSeats，这个如果使用render的话，那么页面加载速度将非常慢。
Base.prototype.simpleRender = function (obj, one2one = false) {
	this.render(obj, one2one);
}


/**
 *
 * @param field 字段名
 * @param Clazz 类型名
 * @param simpleRender 是否使用极简的渲染方式。
 */
Base.prototype.renderList = function (field, Clazz, simpleRender = true) {

	let beans = this[field];
	if (!beans) {
		//维持默认值
		this[field] = (new this.constructor())[field];
		return;
	}
	//如果是数数字则表示这个数数组的大小(汇总)
	if(validateNumeric(beans)) {
    return;
  }

	if (!Clazz) {
		return
	}

	this[field] = [];

	for (let i = 0; i < beans.length; i++) {
		let bean = beans[i];
		let clazz = new Clazz();

		if (simpleRender) {
			clazz.simpleRender(bean);
		} else {
			clazz.render(bean);
		}

		this[field].push(clazz);
	}
}

//直接render出一个Entity. field字段名，Clazz类名。
Base.prototype.renderEntity = function (field, Clazz, one2one = false) {

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


//we provide a default error handing method. handle with specific errorCallback.
Base.prototype.defaultErrorHandler = function (response, errorCallback) {

	let msg = this.getErrorMessage(response);

	if (typeof errorCallback === "function") {
		errorCallback(response);
	} else {
		Notification.error({
			title: "错误",
			message: msg
		});
	}
}


//专门捕捉没有登录这种错误。return true -> 有错误（已经处理掉了）  false -> 没错误 （什么都没干）
Base.prototype.loginErrorHandler = function (response) {

	let temp = response["data"];
	if (temp !== null && typeof temp === "object") {
		if (temp["status"] === "LOGIN") {

			//登录页面出现的未登录信息一律不管。
			let fullPath = Vue.store.state.route.fullPath;
			if (!startWith(fullPath, "/login")) {

				//加锁，一次性只展示一个登录信息。
				if (!Base.showLoginError) {
					Base.showLoginError = true;
					Notification.error({
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

}

//get errorMessage from response and wrap the value to this.errorMessage.
Base.prototype.getErrorMessage = function (response) {


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
}

//Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
//opts中可以传递一些特殊的选项。具体参考：https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
Base.prototype.httpGet = function (url, params = {}, successCallback, errorCallback, opts = {}) {

	let that = this;
	let fullUrl = url;
	if (!startWith(url, "http")) {
		fullUrl = Vue.http.options.root + url;
	}

	let options = $.extend({}, opts);
	options["params"] = params

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

}

//Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
//url is something like this: /article/detail/1
//opts中可以传递一些特殊的选项。具体参考：https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
Base.prototype.httpPost = function (url, params, successCallback, errorCallback, opts = {}) {
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

}


//获取到当前类的单数标签。比如 Project便得到 project
Base.prototype.getTAG = function () {

	let className = this.constructor.name;

	return lowerCamel(className);
}


//获取到当前类的复数标签。比如 Project便得到 projects
Base.prototype.getTAGS = function () {

	return toPlural(this.getTAG());
}


//获取到当前实体的url前缀。
Base.prototype.getUrlPrefix = function () {
	return lowerSlash(this.getTAG());
}
