import Base from "../base/Base";
import Vue from "vue";
import Pager from "../base/Pager";

export default function Attribute() {

	//extend Base's Attributes.
	Base.call(this, arguments);

	this.name = null;
	this.description = null;

	this.isStatistically = null;
  this.isAnalysis = null;
  this.isClassification = null;
  this.isTimeInterval = null;

	this.level = 0;
	this.clazz = null;
	this.genericType = null;
	this.primitive = false;
	this.attributes = [];

	//父节点
	this.parent = null;

}

//extend SurveyComponent's Methods.
Attribute.prototype = new Base();
Attribute.prototype.constructor = Attribute;
Attribute.prototype.URL_PAGE = "/template/attributes";


Attribute.prototype.getFilters = function () {
	return [];
};

Attribute.prototype.render = function (obj) {

	Base.prototype.render.call(this, obj);

	this.renderList("attributes", Attribute);

}
Attribute.prototype.validate = function () {

	if (!this.name) {
		this.errorMessage = "请选择名称和clazz";

		return false;
	}
	if (!this.description) {
		this.errorMessage = "请输入描述";

		return false;
	}

	return true;
}

Attribute.prototype.getForm = function () {

	let info = [];
	if (!this.attributes) {
		this.attributes = [];
	}
	for (let i = 0; i < this.attributes.length; i++) {
		let attr = this.attributes[i];
		info.push(attr.getForm());
	}

	return {
		name: this.name,
		description: this.description,
		level: this.level,
		clazz: this.clazz,
		primitive: this.primitive,
		genericType: this.genericType,
		attributes: info
	}
}

Attribute.prototype.finish = function () {

	if (this.validate()) {
		this.errorMessage = null;
		this.editMode = false;
	}

}

Attribute.prototype.isComplexCollection = function () {

	if (!this.primitive) {
		if (this.genericType) {
			return true;
		}
	}

	return false;

}

Attribute.prototype.asParentClazz = function () {

	if (!this.primitive) {
		if (this.genericType) {
			return this.genericType;
		} else {
			return this.clazz;
		}
	}

	return null;

}


Attribute.prototype.toggleEdit = function () {

	if (this.editMode) {
		this.finish();
	} else {
		this.editMode = true;
	}

}

//添加一个子属性
Attribute.prototype.addField = function () {

	if (!this.primitive) {
		let attribute = new Attribute();
		attribute.editMode = true;
		attribute.level = this.level + 1;
		attribute.parent = this;

		if (!this.attributes) {
			this.attributes = [];
		}

		this.attributes.push(attribute);
	}

}

//添加全部子属性
Attribute.prototype.httpAddFields = function () {
	let that = this;
	if (!this.primitive) {
		if (!this.attributes) {
			this.attributes = [];
		}

		let asParentClazz = this.clazz;
		if (this.genericType) {
			asParentClazz = this.genericType;
		}

		this.httpGetCandidates(asParentClazz, null,function (candidates) {
			for (let i = 0; i < candidates.length; i++) {
				let candidateAttr = candidates[i];
				let unique = true;

				for (let j = 0; j < that.attributes.length; j++) {
					let originAttr = that.attributes[j];
					if (candidateAttr.name === originAttr.name) {
						unique = false;
						break;
					}
				}
				if (unique) {
					let attribute = new Attribute();
					attribute.render(candidateAttr);
					attribute.editMode = false;
					attribute.level = that.level + 1;
					attribute.description = candidateAttr.name;
					attribute.parent = that;
					that.attributes.push(attribute);
				}
			}

		});


	}

}


Attribute.prototype.httpGetCandidates = function (parentClazz, isSummary, successCallback) {

	let key = parentClazz;
	if (!parentClazz) {
		key = "0";
	}
  if(isSummary) {
    //这个是查询统计汇总的家伙
    key = "SUMMARY:" + key;
  }
	//做一个本地缓存而已。
	let candidates = Vue.store.state.attributeMap[key];

	if (!candidates) {
		//立即尝试去准备需要的select.只有用Vue.set才能进行动态双向绑定。
		Vue.set(Vue.store.state.attributeMap, key, [])

		let pager = new Pager(Attribute);
		let param = {};
		if (parentClazz) {
			param["clazz"] = parentClazz;
      if(isSummary) {
        //这个是查询统计汇总的家伙
        param["isSummaryController"] = true;
      }
		}

		pager.httpPage(param, function () {

			Vue.store.state.attributeMap[key].push.apply(Vue.store.state.attributeMap[key], pager.attributes);

			if (typeof successCallback === "function") {
				successCallback(Vue.store.state.attributeMap[key]);
			}

		});

		return Vue.store.state.attributeMap[key];

	} else {

		if (typeof successCallback === "function") {
			successCallback(candidates);
		}

		return candidates;
	}


}


//创建的时候选择了某个attribute的时候。
Attribute.prototype.select = function (attributes) {
	for (let i = 0; i < attributes.length; i++) {
		let attribute = attributes[i];
		if (this.name === attribute.name) {

			this.name = attribute.name;
			this.clazz = attribute.clazz;
			this.primitive = attribute.primitive;
			this.genericType = attribute.genericType;

      this.description = attribute.description;


			return;
		}
	}

	this.name = null;
	this.primitive = false;
	this.genericType = null;


}

//创建占位符 http://www.mitchellbosecke.com/pebble/documentation/guide/basic-usage
Attribute.prototype.fillHierarchy = function (parent) {

	this.parent = parent;

	if (this.attributes && this.attributes.length > 0) {

		for (let i = 0; i < this.attributes.length; i++) {
			let attr = this.attributes[i];
			attr.fillHierarchy(this);
		}
	}
}

//获取占位符，比如user.__pebble__用于子属性来使用。
Attribute.prototype.getPlaceholder = function () {

	if (this.isComplexCollection()) {

		let name = this.name;
		if (this.parent !== null) {
			name = this.parent.getPlaceholder().replace("__pebble__", this.name);
		}

		return "{% for item in " + name + " %}__pebble__{% endfor %}";
	}


	if (this.primitive) {
		if (this.parent === null) {
			return this.name;
		} else if (this.parent.isComplexCollection()) {
			return this.parent.getPlaceholder().replace("__pebble__", "{{ item." + this.name + " }}");
		} else {
			return this.parent.getPlaceholder().replace("__pebble__", this.name);
		}
	} else {
		if (this.parent === null) {
			return this.name + ".__pebble__";
		} else {
			return this.parent.getPlaceholder().replace("__pebble__", this.name + ".__pebble__");
		}
	}

}


Attribute.prototype.getPebble = function () {


	if (this.isComplexCollection()) {

		let itemsStr = "";
		for (let i = 0; i < this.attributes.length; i++) {
			let attr = this.attributes[i];
			if (attr.primitive) {
				itemsStr += "{{ item." + attr.name + " }}";
			}

		}
		return this.getPlaceholder().replace("__pebble__", itemsStr);
	}


	if (this.primitive) {
		if (this.parent === null) {
			return "{{ " + this.getPlaceholder() + " }}";
		} else if (this.parent.isComplexCollection()) {
			return this.getPlaceholder();
		} else {
			return "{{ " + this.getPlaceholder() + " }}";
		}
	} else {
		return "";
	}

}



/*
返回当前属性对应的对象
 */
Attribute.prototype.getClazz = function () {
  if(this.level !== 0) {
    return null;
  }
  return
}



