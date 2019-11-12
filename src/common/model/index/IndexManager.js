import Base from "../base/Base";

export default function IndexManager(id = null, name = null, description = null) {

	//extend Base's Attributes.
	Base.call(this, arguments);
	this.userCount = 0;
	this.activeUserCount = 0;
	this.projectCount = 0;
	this.companyCount = 0;
	this.protocolIncubatorCount = 0;
	this.protocolSpaceCount = 0;
	this.keeperBusinessCount = 0;

}


//extend Base's methods.
IndexManager.prototype = new Base();
IndexManager.prototype.constructor = IndexManager;
IndexManager.prototype.URL_STATISTIC = "/index/statistic";

//We use this method to get the full js Object.
IndexManager.prototype.render = function (obj) {

	Base.prototype.render.call(this, obj);

}


IndexManager.prototype.httpStatistic = function (space,successCallback, errorCallback) {

	let that = this;
  let form = {
    spaceRegional:space
  };
	this.httpGet(this.URL_STATISTIC, form, function (response) {

		that.render(response.data[that.getTAG()]);

		successCallback && successCallback(response);

	});

}
