import BaseEntity from "../base/BaseEntity";
import Filter from "../base/Filter";
import Attribute from "./Attribute";
import Vue from "vue";

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
	//邮件模板
	MAIL: "MAIL",
	//pdf模板
	PDF: "PDF",
	//短信模板
	SMS: "SMS"
};


let TypeMap = {
	MAIL: {
		name: "邮件",
		value: Type.MAIL,
		style: "primary"
	},
	PDF: {
		name: "PDF",
		value: Type.PDF,
		style: "info"
	},
	SMS: {
		name: "短信",
		value: Type.SMS,
		style: "success"
	}
};


export default function Template() {
	BaseEntity.call(this, arguments);


	this.name = null;

	this.type = Type.MAIL;

	this.action = null;

	this.pdfType = null;

	this.description = null;

	this.attributes = [];

	//根据用户的content进行过预处理的，这个content是给模板引擎使用的。
	this.content = null;

	//预览content。使用测试数据装填好的用于给用户查看排错
	this.preview = null;

	this.status = Status.OK;


}


Template.prototype = new BaseEntity();
Template.prototype.constructor = Template;

Template.prototype.URL_PREVIEW = "/template/preview";
Template.prototype.URL_SWITCHER = "/template/switcher";
Template.prototype.URL_PDF_PREVIEW = "/template/pdf/preview";


Template.prototype.Type = Type;
Template.prototype.TypeMap = TypeMap;
Template.prototype.TypeList = Template.prototype.getTypeList();
Template.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "时间", "orderCreateTime"),
		new Filter("INPUT", "名称", "name"),
		new Filter("SELECTION", "类型", "type", this.getTypeList())
	];
};

//This is just a intermedia method.
Template.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);


	this.renderList("attributes", Attribute);


	this.fillHierarchy();
}


Template.prototype.getTypeStyle = function () {
	let item = TypeMap[this.type];
	if (item) {
		return item.style;
	} else {
		return "default";
	}
};
Template.prototype.getTypeName = function () {
	let item = TypeMap[this.type];
	if (item) {
		return item.name;
	} else {
		return "未知状态";
	}
};

//为每个Attribute准备层级关系。
Template.prototype.fillHierarchy = function () {

	if (this.attributes && this.attributes.length > 0) {
		for (let i = 0; i < this.attributes.length; i++) {
			let attr = this.attributes[i];
			attr.fillHierarchy(null);
		}
	}

}


Template.prototype.getForm = function () {

	let info = [];
	for (let i = 0; i < this.attributes.length; i++) {
		let attr = this.attributes[i];
		info.push(attr.getForm());
	}

	let form = {
		name: this.name,

		//根据用户的content进行过预处理的，这个content是给模板引擎使用的。
		content: this.content,

		description: this.description,

		type: this.type,
		action: this.action,
		pdfType: this.pdfType,
		status: this.status,
		attributes: JSON.stringify(info)
	}
	if (this.id) {
		form.id = this.id;
	}
	return form;
}


//重置所有errorMessage
Template.prototype.resetErrorMessage = function (attribute) {
	attribute.errorMessage = null;
	if (attribute.attributes && attribute.attributes.length !== 0) {

		for (let i = 0; i < attribute.attributes.length; i++) {
			let attr = attribute.attributes[i];

			this.resetErrorMessage(attr);
		}
	}
}

//递归验证每个attribute的合理性
Template.prototype.validateAttribute = function (attribute) {


	if (attribute.editMode) {
		this.errorMessage = "请确保所有属性处于非编辑状态。";
		attribute.errorMessage = "提交前请先关闭编辑状态！";

		return false;
	}

	if (!attribute.primitive) {

		if (!attribute.attributes || attribute.attributes.length === 0) {
			this.errorMessage = "对于非简单类型的属性请指定其子属性";
			attribute.errorMessage = "该属性为复合属性，提交前必须指定其子属性";

			return false;
		} else {

			for (let i = 0; i < attribute.attributes.length; i++) {
				let attr = attribute.attributes[i];

				let b = this.validateAttribute(attr);
				if (!b) {
					return b;
				}
			}
		}

	}

	attribute.errorMessage = null;
	return true;
}


Template.prototype.validate = function () {
	if (!this.name) {
		this.errorMessage = "标题必填！";
		return false;
	}

	if (!this.description) {
		this.errorMessage = "模板说明必填！";
		return false;
	}

	if (!this.content) {
		this.errorMessage = "正文必填！";
		return false;
	}

	//reset all the errorMessages.
	for (let i = 0; i < this.attributes.length; i++) {
		let attr = this.attributes[i];

		this.resetErrorMessage(attr);
	}

	for (let i = 0; i < this.attributes.length; i++) {
		let attr = this.attributes[i];

		let b = this.validateAttribute(attr);
		if (!b) {
			return b;
		}
	}

	this.errorMessage = null;
	return true;
}


BaseEntity.prototype.httpPreview = function (successCallback, errorCallback) {

	let that = this;
	let url = this.URL_PREVIEW;
	if (!this.validate()) {
		that.defaultErrorHandler(this.errorMessage, errorCallback);
		return;
	}
	this.httpPost(url, this.getForm(), function (response) {
		that.render(response.data[that.getTAG()]);
		successCallback && successCallback(response);
	}, errorCallback);

}

//改变激活状态
BaseEntity.prototype.httpSwitcher = function (successCallback, errorCallback) {

	let that = this;
	let url = this.URL_SWITCHER;

	this.httpPost(url, {"id": this.id, "active": !this.active}, function (response) {
		that.active = !that.active;
		successCallback && successCallback(response);
	}, errorCallback);

}

BaseEntity.prototype.previewPdfUrl = function () {
	return Vue.http.options.root + this.URL_PDF_PREVIEW.replace("{id}", this.id);
}

BaseEntity.prototype.httpPreviewPdf = function () {

	if (this.type !== Type.PDF) {
		console.error("只能在新窗口预览PDF.");
		return;
	}

	let param = {
		content: this.preview
	}
	let tempForm = document.createElement("form");
	tempForm.action = this.previewPdfUrl();
	tempForm.target = "_blank";
	tempForm.method = "post";
	tempForm.style.display = "none";
	for (let x in param) {
		let opt = document.createElement("textarea");
		opt.name = x;
		opt.value = param[x];
		tempForm.appendChild(opt);
	}
	document.body.appendChild(tempForm);
	tempForm.submit();
	document.body.removeChild(tempForm);
}

