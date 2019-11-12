import BaseEntity from "../../base/BaseEntity";
import Filter from "../../base/Filter";

export default function EntryApplyField() {

	BaseEntity.call(this, arguments);

	this.name = null;
}


EntryApplyField.prototype = new BaseEntity();
EntryApplyField.prototype.constructor = EntryApplyField;


EntryApplyField.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("SORT", "名称", "orderName"),
		new Filter("INPUT", "领域类型名", "name")
	];
};


//We use this method to get the full js Object
EntryApplyField.prototype.render = function (obj) {

	BaseEntity.prototype.render.call(this, obj);

}

EntryApplyField.prototype.getForm = function () {

	let form = {
		name: this.name
	};
	if (this.id) {
		form.id = this.id;
	}

	return form;

}


EntryApplyField.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "名称必填！";
		return false;
	}

	return true;
}

