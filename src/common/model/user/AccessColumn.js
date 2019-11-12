import Base from "../base/Base";


export default function AccessColumn(title) {
	
	Base.call(this, arguments);
	this.toggle = false;
	this.title = title;
	this.accesses = [];
}

AccessColumn.prototype = new Base();
AccessColumn.prototype.constructor = AccessColumn;
AccessColumn.prototype.CHANGE_WHOLE_URL = "/user/access/whole";

/**
 * 更改整体权限
 */
AccessColumn.prototype.httpWholeChange = function (successCallback, failureCallback) {
	let that = this;
	let UserAccessesIdInfo = [];
	for(let i = 0; i < this.accesses.length; i++) {
		UserAccessesIdInfo.push(this.accesses[i].id);
	}
	let params = {
		userAccessesIdInfo : JSON.stringify(UserAccessesIdInfo),
		active: !this.toggle
	}
	this.httpPost(this.CHANGE_WHOLE_URL, params, function (response) {
		
		for(let i = 0; i < that.accesses.length; i++) {
			that.accesses[i].active = !that.toggle;
		}
		that.inspect();
		successCallback && successCallback(response);
	}, failureCallback);
}

/**
 *push
 */
AccessColumn.prototype.inspect = function () {
	let tampToggle = this.accesses[0].active;
	for (let i = 0; i < this.accesses.length; i++) {
		if (!this.accesses[i].active === tampToggle) {
			this.toggle = false;
			return;
		}
		this.toggle = tampToggle;
	}
}

AccessColumn.prototype.pushAccess = function (access) {
	this.accesses.push(access);
	this.inspect();
}