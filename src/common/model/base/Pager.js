import Base from "./Base";
import Vue from "vue";
import $ from "jquery";
import {isInteger} from "../../util/Utils";
import SpaceRegional from "../space/SpaceRegional";

export default function Pager(Clazz, pageSize = 10, page = 0) {

	//extend Base's Attributes.
	Base.call(this, arguments);

	this.pageSize = pageSize;
	this.page = page;
	this.totalItems = 0;
	this.keyName = null;
	this.listData = null;


	//this field means whether add filter query to the URL.
	this.history = null;
	//list attributes.
	if (Clazz && (Clazz.prototype instanceof Base)) {
		this.Clazz = Clazz;

		let tags = Clazz.prototype.getTAGS();
		if (tags) {
			this[Clazz.prototype.getTAGS()] = null;
			this.TAGS = tags;
		} else {
			console.error("The Clazz MUST define a prototype named 'TAGS'");
		}
		//考虑兼容模式，允许自定义URL_PAGE.
		let urlPage = Clazz.prototype.URL_PAGE;
		if (!urlPage) {
			urlPage = Clazz.prototype.getUrlPage();
		}
		if (urlPage) {
			this.URL_PAGE = urlPage;
		} else {
			console.error("The Clazz MUST define a prototype named 'URL_PAGE'");
		}

		if (Clazz.prototype.getFilters) {

			//这个地方的Filter不能用同一个，会出问题的。
			this.FILTERS = Clazz.prototype.getFilters();

		} else {
			console.error("The Clazz MUST define a prototype method named 'getFilters'");
		}

	}else if (Clazz === SpaceRegional){
    this.Clazz = Clazz;

    let tags = Clazz.prototype.getTAGS();
    if (tags) {
      this[Clazz.prototype.getTAGS()] = null;
      this.TAGS = tags;
    } else {
      console.error("The Clazz MUST define a prototype named 'TAGS'");
    }
    //考虑兼容模式，允许自定义URL_PAGE.
    let urlPage = Clazz.prototype.URL_PAGE;
    if (!urlPage) {
      urlPage = Clazz.prototype.getUrlPage();
    }
    if (urlPage) {
      this.URL_PAGE = urlPage;
    } else {
      console.error("The Clazz MUST define a prototype named 'URL_PAGE'");
    }

    if (Clazz.prototype.getFilters) {

      //这个地方的Filter不能用同一个，会出问题的。
      this.FILTERS = Clazz.prototype.getFilters();

    } else {
      console.info("This Clazz is SpaceRegional");
    }
  } else {
		console.info("You MUST specify a Clazz extended Base");
	}


}

//extend Base's methods.
Pager.prototype = new Base();
Pager.prototype.constructor = Pager;


//重置Filter。
Pager.prototype.resetFilter = function () {
	for (let i = 0; i < this.FILTERS.length; i++) {
		let filter = this.FILTERS[i];
		filter.reset();
	}
};

//手动设置过滤器的值
Pager.prototype.setFilter = function (key, value) {
	if (!this.FILTERS || !this.FILTERS.length) {
		return;
	}
	for (let i = 0; i < this.FILTERS.length; i++) {
		let filter = this.FILTERS[i];
		if (filter.key === key) {
			filter.putValue(value);
		}
	}
};

//根据key来删除某个Filter. 这个功能在某些特殊的NbPagerSelection中有用到。
Pager.prototype.removeFilter = function (key) {
	if (!this.FILTERS || !this.FILTERS.length) {
		return;
	}
	for (let i = 0; i < this.FILTERS.length; i++) {
		let filter = this.FILTERS[i];
		if (filter.key === key) {
			this.FILTERS.splice(i, 1);
			break;
		}
	}
};

//隐藏某个Filter，实际上我们可以根据这个filter来筛选，只不过不出现在NbFilter中而已。
Pager.prototype.showFilter = function (key, visible = true) {
	if (!this.FILTERS || !this.FILTERS.length) {
		return;
	}
	for (let i = 0; i < this.FILTERS.length; i++) {
		let filter = this.FILTERS[i];
		if (filter.key === key) {
			filter.visible = visible;
			break;
		}
	}
};


//根据一个key来获取某个filter
Pager.prototype.getFilter = function (key) {
	if (!this.FILTERS || !this.FILTERS.length) {
		return null;
	}
	for (let i = 0; i < this.FILTERS.length; i++) {
		let filter = this.FILTERS[i];
		if (filter.key === key) {
			return filter;
		}
	}
};

//获取当前pager中的list
Pager.prototype.getList = function () {
	return this[this.TAGS];
};

Pager.prototype.isEmpty = function () {
	if (!this[this.TAGS]) {
		return true;
	}
	return this[this.TAGS].length === 0;

};

//该方法是在地址栏添加上query参数，参数就是FILTERS中的key和value.
//同时地址栏上有的参数也会自动读取到FILTERS中去
//因此，启用该方法后返回时可以停留在之前的页码中。
Pager.prototype.enableHistory = function () {
	this.history = true;

	let query = Vue.store.state.route.query;


	if (typeof query.page !== "undefined") {
		this.page = parseInt(query.page);
	}
	if (typeof query.pageSize !== "undefined") {
		this.pageSize = parseInt(query.pageSize);
	}

	if (!isInteger(this.page)) {
		this.page = 0;
	}
	if (!isInteger(this.pageSize)) {
		this.pageSize = 10;
	}


	//try to fill the filters by query.
	for (let i = 0; i < this.FILTERS.length; i++) {
		let filter = this.FILTERS[i];

		if (typeof query[filter.key] !== "undefined") {

			let value = query[filter.key];
			//check类型的要转成boolean.
			if (filter.type === filter.Type.CHECK) {
				if (value === "true") {
					value = true;
				} else if (value === "false") {
					value = false;
				} else {
					value = null;
				}
			}
			filter.putValue(value);

		}


	}
}

//you can specify the page url here.
Pager.prototype.httpCustomPage = function (url, params, successCallback, errorCallback) {
	let that = this;
	this.loading = true;
	this.errorMessage = null;

	if (this.history) {
		history.replaceState({}, "", Vue.store.state.route.path + "?" + $.param(params));
	}


	this.httpGet(url, params, function (response) {
		that.loading = false;
		that.render(response.data.pager);

		successCallback && successCallback(response);

	}, errorCallback);

};


//use default FILTERS as parameters..
Pager.prototype.httpFastPage = function (successCallback, errorCallback) {

	if (!isInteger(this.page)) {
		this.page = 0;
	}
	if (!isInteger(this.pageSize)) {
		this.pageSize = 10;
	}


	let params = {
		page: this.page,
		pageSize: this.pageSize
	};

	for (let i = 0; i < this.FILTERS.length; i++) {
		let filter = this.FILTERS[i];

		if (filter.getParam() !== null) {
			params[filter.key] = filter.getParam();
		}
	}


	this.httpCustomPage(this.URL_PAGE, params, successCallback, errorCallback);
};

//use default FILTERS as parameters..
Pager.prototype.httpFastPageSpace = function (successCallback, errorCallback) {

  if (!isInteger(this.page)) {
    this.page = 0;
  }
  if (!isInteger(this.pageSize)) {
    this.pageSize = 10;
  }

  let params = {
    page: this.page,
    pageSize: this.pageSize
  };

  for (let i = 0; i < this.FILTERS.length; i++) {
    let filter = this.FILTERS[i];

    if (filter.getParam() !== null) {
      params[filter.key] = filter.getParam();
    }
  }
  this.httpCustomPage(SpaceRegional.prototype.URL_PAGE, params, successCallback, errorCallback);

};

//use default url_page.
Pager.prototype.httpPage = function (params, successCallback, errorCallback) {

	this.httpCustomPage(this.URL_PAGE, params, successCallback, errorCallback);

};

//初始化page的序号
Pager.prototype.initIndex = function () {
  if(this[this.TAGS]) {
    this[this.TAGS].forEach((entity, index) => {
      entity.baseIndex = index + this.page * this.pageSize + 1;
    });
  }
};

Pager.prototype.render = function (obj) {

	Base.prototype.render.call(this, obj);
	this.renderList(this.TAGS, this.Clazz);

};



