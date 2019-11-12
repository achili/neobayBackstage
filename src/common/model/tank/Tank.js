import BaseEntity from "../base/BaseEntity";
import {containStr, endWith, getExtension, humanFileSize, startWith} from "../../filter/str";
import Vue from "vue";
import Filter from "../base/Filter";
import Resumable from "../../fork/resumable/resumable";


let Status = {
	OK: "OK"
}

let StatusMap = {
	OK: {
		name: "OK",
		value: "OK",
		style: "info"
	}
}


//一种是大文件上传模式，一种是小文件上传模式，默认为NONE
let Mode = {
	NONE: "NONE",
	TINY: "TINY",
	HUGE: "HUGE"
};


//当前tank处于怎样的步骤中
let Procedure = {
	"FREE": "FREE",
	"FETCHING_UPLOAD_TOKEN": "FETCHING_UPLOAD_TOKEN",
	"UPLOADING": "UPLOADING",
	"FETCHING_DOWNLOAD_TOKEN": "FETCHING_DOWNLOAD_TOKEN",
	"DOWNLOADING": "DOWNLOADING"
}

export default function Tank(filter = "*", privacy = true, maxSize = 0, uploadHint = null) {

	//extend BaseEntity's Attributes.
	BaseEntity.call(this, arguments);

	this.user = null;
	this.name = null;
	this.code = null;
	this.size = null;
	this.type = null;
	this.filter = filter;
	this.privacy = privacy;
	this.url = null;
	this.status = Status.OK;
	this.width = null;
	this.height = null;

	//local fields
	//允许上传的最大大小。
	this.maxSize = maxSize;
	//给用户的提示文字
	this.uploadHint = uploadHint;
	this.uploadToken = null;
	this.downloadToken = null;
	//浏览器中选择好的原生file，未作任何处理。
	this.file = null;
	this.disabled = false;
	//文件上传的模式，小型文件，大型文件，以及无。
	this.mode = Mode.NONE;
	//当前文件处于哪一个步骤中
	this.procedure = Procedure.FREE;
	//当前上传进度的数值 0-1之间
	this.progress = 0;
	//实时上传速度 byte/s
	this.speed = 0;
	//分块的大小 1M
	this.chunkSize = 1 * 1024 * 1024;
	//用于分块上传的类
	this.resumable = null;


}

//extend BaseEntity
Tank.prototype = new BaseEntity();
Tank.prototype.constructor = Tank;

Tank.prototype.URL_DOWNLOAD = "/tank/download/{code}";
Tank.prototype.URL_TOKEN_UPLOAD = "/tank/token/upload";
Tank.prototype.URL_TANK_UPLOAD = "/file/upload";
Tank.prototype.URL_TANK_CHUNK = "/file/chunk";
Tank.prototype.URL_TANK_DOWNLOAD = "/file/download";
Tank.prototype.Mode = Mode;
Tank.prototype.Procedure = Procedure;
Tank.prototype.Status = Status;
Tank.prototype.StatusMap = StatusMap;
Tank.prototype.StatusList = Tank.prototype.getStatusList();


Tank.prototype.downloadUrl = function () {
	if (this.privacy) {
		return Vue.store.state.tankHost + this.URL_TANK_DOWNLOAD + "?code=" + this.code + "&token=" + this.downloadToken;
	} else {
		return this.url;
	}
}


Tank.prototype.download = function () {
	if (this.privacy) {
		let url = this.URL_DOWNLOAD.replace("{code}", this.code);
		window.open(Vue.http.options.root + url);
	} else {
		window.open(this.url);
	}

}

Tank.prototype.getFilters = function () {
	return [
		new Filter("SORT", "ID", "orderId"),
		new Filter("INPUT", "文件名", "name"),
		new Filter("CHECK", "私有", "privacy")
	];
};

Tank.prototype.fileIcon = function (inUeditor = false) {

	//给不同的文件准备不同的图标
	if (startWith(this.type, "application/pdf")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/9fc1b626a38e773bfed764474e66af4a/pdf.png";
		} else {
			return "fa fa-file-pdf-o color-pdf";
		}
	}
	if (startWith(this.type, "application/msword") || startWith(this.type, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/df876da59aee11299fe00b967e62b099/doc.png";
		} else {
			return "fa fa-file-word-o color-doc";
		}
	}
	if (startWith(this.type, "application/vnd.ms-powerpoint") || startWith(this.type, "application/vnd.openxmlformats-officedocument.presentationml.presentation")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/f333fe404d02940370802de7e1b5213e/ppt.png";
		} else {
			return "fa fa-file-powerpoint-o color-ppt";
		}
	}
	if (startWith(this.type, "application/vnd.ms-excel") || startWith(this.type, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/50af9d1134c7e28c462340b161a48571/xls.png";
		} else {
			return "fa fa-file-excel-o color-xls";
		}
	}
	if (startWith(this.type, "audio")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/17ed44946dbbbf204bd0c45502800708/audio.png";
		} else {
			return "fa fa-file-audio-o color-audio";
		}
	}
	if (startWith(this.type, "video")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/7285a52fa4025c5b4d6992a9a873a3da/video.png";
		} else {
			return "fa fa-file-movie-o color-video";
		}
	}
	if (startWith(this.type, "text")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/231bf79a1e374d48905ced08bed8edf9/text.png";
		} else {
			return "fa fa-file-text-o color-text";
		}
	}
	if (startWith(this.type, "image")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/2b3acde2323d8b2e6868df118ab8c9a4/image.png";
		} else {
			return "fa fa-file-image-o color-image";
		}
	}
	if (endWith(this.name, "zip") || endWith(this.name, "rar") || endWith(this.name, "7z") || endWith(this.name, "gz")) {
		if (inUeditor) {
			return "https://yctank.liyarou.com/f/jay/20170815/6fa2ea70f99ca0e5d9ad397e36a63096/archive.png";
		} else {
			return "fa fa-file-archive-o color-archive";
		}
	}

	if (inUeditor) {
		return "https://yctank.liyarou.com/f/jay/20170815/0b71631cda64805415fec20cd504e84e/file.png";
	} else {
		return "fa fa-file-o text-success";
	}

}

Tank.prototype.publicImgUrl = function () {
	if (!this.exist()) {
		return null;
	}
	if (!this.tank.privacy) {
		if (startWith(this.tank.type, "image")) {
			return this.tank.url;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

//验证过滤器有没有误填写，这个方法主要给开发者使用。
Tank.prototype.validateFilter = function () {

	let filter = this.filter;
	if (filter === null || filter === "") {
		this.errorMessage = "过滤器设置错误，请检查";
		console.error("过滤器设置错误，请检查.");
		return false;
	}
	if (filter !== "*") {
		let regex1 = /^(image|audio|video|text)(\|(image|audio|video|text))*$/g;
		let regex2 = /^(\.[\w]+)(\|\.[\w]+)*$/g;
		// 测试几种特殊类型 image|audio|video|text
		if (!regex1.test(filter)) {
			//测试后缀名
			if (!regex2.test(filter)) {
				this.errorMessage = "过滤器设置错误，请检查";
				console.error("过滤器设置错误，请检查.");
				return false;
			}
		}
	}

	//validate privacy
	let privacy = this.privacy;
	if (privacy !== true) {
		if (privacy !== false) {
			this.errorMessage = "privacy属性为Boolean类型";
			console.error("privacy属性为Boolean类型.");
			return false;
		}
	}

	return true;
}


//上传之前的验证工作。
Tank.prototype.validate = function () {
	if (!this.file) {
		console.error("请选择文件！");
		return false;
	}

	if (this.maxSize > 0) {
		if (this.file.size > this.maxSize) {
			this.errorMessage = "文件大小不能超过" + humanFileSize(this.maxSize) + "，当前文件大小为" + humanFileSize(this.file.size);
			return false;
		}
	}

	if (this.file.size > this.chunkSize) {
		this.mode = Mode.HUGE;
	} else {
		this.mode = Mode.TINY;
	}


	//下面验证选择的文件和过滤器是否吻合。
	let filename = this.file.name;
	let type = this.file.type;
	if (!this.validateFilter()) {
		return false;
	}
	if (this.filter === "*") {
		this.errorMessage = null;
		return true;
	}

	if (containStr(this.filter, getExtension(filename))) {
		this.errorMessage = null;
		return true;
	}

	let simpleType = type.substr(0, type.indexOf("/"));
	if (simpleType) {
		if (containStr(this.filter, simpleType)) {
			this.errorMessage = null;
			return true;
		}
	}

	this.errorMessage = "只允许上传以下类型的文件：" + this.filter;
	return false;

}


Tank.prototype.publicImgUrl = function () {
	if (!this.exist()) {
		return null;
	}
	if (!this.privacy) {
		if (startWith(this.type, "image")) {
			return this.url;
		} else {
			return null;
		}
	} else {
		return null;
	}
}
//具有了这最基本的四种属性，才能叫做“存在”
Tank.prototype.exist = function () {
	return this.name && this.code && this.size && this.type;
}

Tank.prototype.httpTokenUpload = function (successCallback, failureCallback) {

	let that = this;

	//保证有了file才去获取TokenUpload，否则白跑一趟。
	if (!this.validate()) {
		this.defaultErrorHandler(this.errorMessage, failureCallback);
		return;
	}

	let form = {
		filter: this.filter,
		privacy: this.privacy
	}

	that.procedure = Procedure.FETCHING_UPLOAD_TOKEN;
	this.httpPost(this.URL_TOKEN_UPLOAD, form, function (response) {

		that.uploadToken = response.data.token;

		if (typeof successCallback === "function") {
			successCallback(response);
		}

	}, function (response) {
		that.procedure = Procedure.FREE;

		that.defaultErrorHandler(response, failureCallback);

	});
}


//小文件上传。
Tank.prototype.httpUpload = function (successCallback, failureCallback) {

	let that = this;

	if (!this.validate()) {
		this.defaultErrorHandler(this.errorMessage, failureCallback);
		return;
	}

	let formData = new FormData();

	formData.append('file', this.file);
	formData.append("token", this.uploadToken);
	formData.append("privacy", this.privacy);


	that.procedure = Procedure.UPLOADING;

	this.httpPost(Vue.store.state.tankHost + this.URL_TANK_UPLOAD, formData, function (response) {

		that.procedure = Procedure.FREE;

		that.render(response["data"]["file"]);


		if (typeof successCallback === "function") {
			successCallback(response);
		}

	}, function (response) {

		that.procedure = Procedure.FREE;

		that.defaultErrorHandler(response, failureCallback);

	});
}

//大文件上传。
Tank.prototype.httpChunk = function (successCallback, failureCallback) {

	let that = this;

	if (!this.validate()) {
		this.defaultErrorHandler(this.errorMessage, failureCallback);
		return;
	}

	let url = Vue.store.state.tankHost + this.URL_TANK_CHUNK;

	this.resumable = new Resumable({
		target: url,
		query: {
			token: this.uploadToken,
			privacy: this.privacy
		},


		//,
		//XDEBUG_SESSION_START: 15736
		//分块大小为1M
		chunkSize: that.chunkSize
	});

	// Resumable.js isn't supported, fall back on a different method
	if (!this.resumable.support) {
		console.error("不支持分块上传");
		this.errorMessage = "您的浏览器不支持分块上传，推荐使用Chrome浏览器进行操作";
		that.procedure = Procedure.FREE;
		return;
	}
	this.resumable.on('fileAdded', function (file) {
		that.procedure = Procedure.UPLOADING;

		that.progress = 0;
		that.speed = 0;
		that.resumable.upload();
	});
	this.resumable.on('fileSuccess', function (file, message) {


		let fileJson = {};
		try {
			fileJson = JSON.parse(message)["file"];
		} catch (e) {
			that.errorMessage = "返回File信息错误";
			if (message) {
				that.errorMessage = message;
			}
			that.defaultErrorHandler(that.errorMessage, failureCallback);
			return;
		}

		that.render(fileJson);

		that.procedure = Procedure.FREE;

		if (typeof successCallback === "function") {
			successCallback();
		}

	});
	this.resumable.on('fileError', function (file, message) {


		that.errorMessage = "上传过程中出现错误，请稍后重试";
		if (message) {
			that.errorMessage = message;
		}
		console.error(message);

		that.procedure = Procedure.FREE;
		//清空一些东西。
		that.defaultErrorHandler(that.errorMessage, failureCallback);

	});

	//ms
	let lastTimeStamp = (new Date()).getTime();
	let lastSize = 0;
	this.resumable.on('fileProgress', function (file) {
		that.progress = file.progress();
		let currentTime = (new Date()).getTime();
		let deltaTime = currentTime - lastTimeStamp;


		//每2s计算一次速度
		if (deltaTime > 2000) {
			lastTimeStamp = currentTime;

			let currentSize = that.resumable.getSize() * that.progress;
			let deltaSize = currentSize - lastSize;
			lastSize = currentSize;


			that.speed = (deltaSize / (deltaTime / 1000)).toFixed(0);
		}

	});

	this.resumable.addFile(this.file);

}

//用户选择好了文件，就开始上传了。
Tank.prototype.upload = function (successCallback, failureCallback) {
	let that = this;

	this.httpTokenUpload(function () {


		if (that.mode === Mode.TINY) {
			that.httpUpload(function () {

				if (typeof successCallback === "function") {
					successCallback();
				}

			}, function (response) {

				that.defaultErrorHandler(response, failureCallback);

			});
		} else if (that.mode === Mode.HUGE) {
			that.httpChunk(function () {

				if (typeof successCallback === "function") {
					successCallback();
				}

			}, function (response) {

				that.defaultErrorHandler(response, failureCallback);

			});
		} else {
			console.error("mode错误，请检查");
		}


	}, function (response) {

		that.defaultErrorHandler(response, failureCallback);

	});

}

//在上传的途中，清空一切，从头开始。
Tank.prototype.clear = function () {

	this.user = null;
	this.name = null;
	this.code = null;
	this.size = 0;
	this.type = null;
	//this.filter = "*";
	//this.privacy = true;
	this.url = null;
	//this.status = Status.OK;
	this.uploadToken = null;
	this.downloadToken = null;
	this.file = null;
	this.mode = Mode.NONE;
	this.procedure = Procedure.FREE;
	this.progress = 0;

	if (this.resumable) {
		this.resumable.cancel();
		this.resumable = null;
	}

}
//提供不同类型的测试数据。
Tank.prototype.mockDataDocxPrivacy = function () {
	this.user = null;
	this.name = "TestDocFile.docx";
	this.code = "57e3f0127a588bb4e78c61cf7329ce6d";
	this.size = 11958;
	this.type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
	this.filter = ".doc|.docx|.pdf";
	this.privacy = true;
	this.url = null;
	this.status = "OK";
}


Tank.prototype.mockDataPptxPrivacy = function () {
	this.user = null;
	this.name = "TestPPTFile.pptx";
	this.code = "f747e80ddf01b9b74a8cec4d4bce601b";
	this.size = 32245;
	this.type = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
	this.filter = ".ppt|.pptx|.pdf";
	this.privacy = true;
	this.url = null;
	this.status = "OK";
}

Tank.prototype.mockDataPdfPrivacy = function () {
	this.user = null;
	this.name = "ProjectDemands.pdf";
	this.code = "3ec72928f34a0939ae1b8f9cb4fffc90";
	this.size = 4819098;
	this.type = "application/pdf";
	this.filter = ".ppt|.pptx|.pdf";
	this.privacy = true;
	this.url = null;
	this.status = "OK";
}

Tank.prototype.mockDataImage = function () {
	this.id = 69;
	this.user = null;
	this.name = "1383154-55218731c91b91cc.jpg";
	this.code = "bee61e0ef64f34306e49379767b4c548";
	this.size = 24864;
	this.type = "image/jpeg";
	this.filter = "*";
	this.privacy = false;
	this.url = "http://tank.neobay.cn/f/jay/20161226/bee61e0ef64f34306e49379767b4c548/1383154-55218731c91b91cc.jpg";
	this.status = "OK";
}




