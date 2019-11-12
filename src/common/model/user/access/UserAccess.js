import BaseEntity from "../../base/BaseEntity";
import UserRole from "../role/UserRole";
import UserFeature from "../feature/UserFeature";
import UserModule from "../module/UserModule";

export default function UserAccess() {

	BaseEntity.call(this, arguments);
	this.active = null;
	this.role = new UserRole();
	this.feature = new UserFeature();
	this.featureType = null;

  this.newActive = null;
}

UserAccess.prototype = new BaseEntity();
UserAccess.prototype.constructor = UserAccess;


UserAccess.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.renderEntity("role", UserRole);
	this.renderEntity("feature", UserFeature);
  this.newActive = this.active;
}

UserAccess.prototype.getForm = function () {
	let form = {
		active: this.active,
		roleId: this.role.id,
		nodeId: this.node.id
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}
