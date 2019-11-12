import Base from "./Base";
import {str2Date} from "../../filter/time";
import Filter from "./Filter";
import {lowerSlash, startWith} from "../../filter/str";
import {MessageBox, Notification as NotificationBox} from 'element-ui'
import SpaceRegional from "../space/SpaceRegional";

export default function BaseEntity() {

	//extend Base's Attributes.
	Base.call(this, arguments);

	this.id = 0;
	this.sort = null;
	this.createTime = null;
	this.updateTime = null;
	this.deleted = false;
  this.spaceRegional = new SpaceRegional()
}

//extend Base's methods.
BaseEntity.prototype = new Base();
BaseEntity.prototype.constructor = BaseEntity;

//This is just a intermedia method.
BaseEntity.prototype.render = function (obj, one2one = false) {

	Base.prototype.render.call(this, obj);
	this.createTime = str2Date(this.createTime);
	this.updateTime = str2Date(this.updateTime);
  this.renderSpaceRegional("spaceRegional",SpaceRegional);

}

//直接render出一个SpaceRegional. field字段名，Clazz类名。
BaseEntity.prototype.renderSpaceRegional = function () {
  let sss = new SpaceRegional();
  sss.render(this.spaceRegional);
  this.spaceRegional = sss
};

//获取过滤器，必须每次动态生成，否则会造成filter逻辑混乱。
BaseEntity.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId")
	];
};

//获取当前类的EntityType
BaseEntity.prototype.getEntityType = function () {
	let originName = this.getTAG();
	let res = originName.replace(/([A-Z])/g, "_$1").toUpperCase();
	if (startWith(res, "_")) {
		res = res.substr(1, res.length);
	}

	return res;
}


//该实体目前是否能够编辑
BaseEntity.prototype.canEdit = function () {
	console.error("canEdit: you should override this base method.");
}

//该实体目前是否能够删除
BaseEntity.prototype.canDel = function () {
	console.error("canDel: you should override this base method.");
}


BaseEntity.prototype.getForm = function () {
	console.error("getForm: you should override this base method.");
}

BaseEntity.prototype.validate = function () {
	console.error("validate: you should override this base method.");
}

//common http detail methods.
BaseEntity.prototype.httpDetail = function (successCallback, errorCallback) {

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

}


BaseEntity.prototype.httpSave = function (successCallback, errorCallback) {

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

}

BaseEntity.prototype.httpDel = function (successCallback, errorCallback) {

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

}


BaseEntity.prototype.httpSort = function (id1, sort1, id2, sort2, successCallback, failureCallback) {

	let that = this;

	if (!id1 || !id2 || !sort1 || !sort2) {

		this.errorMessage = "参数不齐！";
		that.defaultErrorHandler(this.errorMessage, failureCallback);

		return;
	}

	let url = this.getUrlSort();

	if (!url) {

		that.defaultErrorHandler(this.errorMessage, failureCallback);
		return;
	}

	let params = {
		id1: id1,
		sort1: sort1,
		id2: id2,
		sort2: sort2
	};

	this.httpPost(url, params, successCallback, failureCallback);
}

//确认删除操作.
BaseEntity.prototype.confirmDel = function (successCallback, failureCallback) {

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
}


BaseEntity.prototype.getUrlCreate = function () {
	let prefix = this.getUrlPrefix();

	return prefix + "/create";
}

BaseEntity.prototype.getUrlDel = function (id = null) {
	let prefix = this.getUrlPrefix();

	if (id === null) {
		return prefix + "/del/{id}";
	} else {
		return prefix + "/del/" + id;
	}

}

BaseEntity.prototype.getUrlEdit = function () {
	let prefix = this.getUrlPrefix();

	return prefix + "/edit";
}

BaseEntity.prototype.getUrlDetail = function (id = null) {
	let prefix = this.getUrlPrefix();

	if (id === null) {
		return prefix + "/detail/{id}";
	} else {
		return prefix + "/detail/" + id;
	}

}

BaseEntity.prototype.getUrlPage = function () {
	let prefix = this.getUrlPrefix();

	return prefix + "/page";
}

BaseEntity.prototype.getUrlSort = function () {
	let prefix = this.getUrlPrefix();

	return prefix + "/sort";
}

