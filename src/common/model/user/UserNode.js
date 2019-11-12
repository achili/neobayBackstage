import BaseEntity from "../base/BaseEntity";

export default function UserNode() {
	
	BaseEntity.call(this, arguments);
	this.name = null;
	this.description = null;
	this.active = null;
}

UserNode.prototype = new BaseEntity();
UserNode.prototype.constructor = UserNode;

UserNode.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
}

UserNode.prototype.getForm = function () {
	let form = {
		name: this.name,
		description: description,
		active: active
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}