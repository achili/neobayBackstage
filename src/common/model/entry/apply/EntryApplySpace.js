import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";

export default function EntryApplySpace() {

	BaseEntity.call(this, arguments);

	this.name = null;
}


EntryApplySpace.prototype = new BaseEntity();
EntryApplySpace.prototype.constructor = EntryApplySpace;

EntryApplySpace.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("INPUT", "空间类型名", "name")
	];
};

//We use this method to get the full js Object
EntryApplySpace.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

}

EntryApplySpace.prototype.getForm = function () {

	let form = {
		name: this.name
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


EntryApplySpace.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}

	return true;
}

