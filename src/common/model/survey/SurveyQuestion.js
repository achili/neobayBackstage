import SurveyComponent from "./SurveyComponent";
import SurveyChoice from "../survey/SurveyChoice";
import SurveyInput from "../survey/SurveyInput";
import SurveyGroup from "../survey/SurveyGroup";
import {isInteger} from "../../util/Utils";

let Type = {
	//单项选择
	SINGLE_CHOICE: "SINGLE_CHOICE",
	//多项选择
	MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
	//单项填空
	SINGLE_BLANK: "SINGLE_BLANK",
	//多项填空
	MULTIPLE_BLANK: "MULTIPLE_BLANK",
	//动态分组
	DYNAMIC_GROUP: "DYNAMIC_GROUP"
};


let TypeMap = {
	SINGLE_CHOICE: {
		name: "单项选择",
		value: Type.SINGLE_CHOICE,
		fa: "fa fa-dot-circle-o",
		style: "success"
	},
	MULTIPLE_CHOICE: {
		name: "多项选择",
		value: Type.MULTIPLE_CHOICE,
		fa: "fa fa-check-square-o",
		style: "success"
	},
	SINGLE_BLANK: {
		name: "单项填空",
		value: Type.SINGLE_BLANK,
		fa: "fa fa-pencil-square-o",
		style: "success"
	},
	MULTIPLE_BLANK: {
		name: "多项填空",
		value: Type.MULTIPLE_BLANK,
		fa: "fa fa-pencil-square",
		style: "success"
	},
	DYNAMIC_GROUP: {
		name: "动态分组",
		value: Type.DYNAMIC_GROUP,
		fa: "fa fa-snowflake-o",
		style: "success"
	}
};


export default function SurveyQuestion(type = Type.SINGLE_CHOICE) {

	//extend SurveyComponent's Attributes.
	SurveyComponent.call(this, arguments);

	this.title = null;
	this.type = type;
	//必答题
	this.required = true;
	//对于 SINGLE_CHOICE 有用
	this.value = null;
	//对于 MULTIPLE_CHOICE 有用
	this.values = [];
	this.choices = [];
	this.input = new SurveyInput();
	this.inputs = [];
	this.group = new SurveyGroup();

	if (type === Type.SINGLE_CHOICE) {

		this.choices = [];
		this.choices.push(new SurveyChoice());
		this.choices.push(new SurveyChoice());
		this.value = null;

	} else if (type === Type.MULTIPLE_CHOICE) {

		this.choices = [];
		this.choices.push(new SurveyChoice());
		this.choices.push(new SurveyChoice());
		this.values = [];
	} else if (type === Type.SINGLE_BLANK) {

		this.input = new SurveyInput();


	} else if (type === Type.MULTIPLE_BLANK) {
		this.inputs = [];
		this.inputs.push(new SurveyInput());
		this.inputs.push(new SurveyInput());
	} else if (type === Type.DYNAMIC_GROUP) {
		this.group = new SurveyGroup();

	}

}

//extend SurveyComponent's Methods.
SurveyQuestion.prototype = new SurveyComponent();
SurveyQuestion.prototype.constructor = SurveyQuestion;

SurveyQuestion.prototype.Type = Type;
SurveyQuestion.prototype.TypeMap = TypeMap;
SurveyQuestion.prototype.TypeList = SurveyQuestion.prototype.getTypeList();

SurveyQuestion.prototype.setProcedure = function (p) {

	this.procedure = p;

	if (this.input) {
		this.input.setProcedure(p);
	}

	if (this.inputs) {
		for (let i = 0; i < this.inputs.length; i++) {
			let input = this.inputs[i];
			input.setProcedure(p);
		}
	}

	if (this.choices) {
		for (let i = 0; i < this.choices.length; i++) {
			let choice = this.choices[i];
			choice.setProcedure(p);
		}
	}

	if (this.group) {
		this.group.setProcedure(p);
	}
}

SurveyQuestion.prototype.finish = function () {

	if (this.validate()) {
		this.editMode = false;
	}
}

SurveyQuestion.prototype.validate = function () {

	//check title
	if (!this.title) {
		this.errorMessage = "请输入标题!";
		return false;
	}

	if (this.type === Type.SINGLE_CHOICE || this.type === Type.MULTIPLE_CHOICE) {
		for (let i = 0; i < this.choices.length; i++) {
			let choice = this.choices[i];
			if (!choice.title) {
				this.errorMessage = "请输入选项" + (i + 1) + "的标题!";
				return false;
			}
		}
	} else if (this.type === Type.MULTIPLE_BLANK) {
		for (let i = 0; i < this.inputs.length; i++) {
			let input = this.inputs[i];
			if (!input.title) {
				this.errorMessage = "请输入文本框" + (i + 1) + "的标题!";
				return false;
			}
		}

	} else if (this.type === Type.DYNAMIC_GROUP) {
		for (let i = 0; i < this.group.inputs.length; i++) {
			let input = this.group.inputs[i];
			if (!input.title) {
				this.errorMessage = "请输入文本框" + (i + 1) + "的标题!";
				return false;
			}
		}

		if (!isInteger(this.group.min) || !isInteger(this.group.max)) {
			this.errorMessage = "最小组数和最大组数都必须是整数";
			return false;
		}
		if (this.group.min > this.group.max) {
			this.errorMessage = "最小组数不能大于最大组数！";
			return false;
		}

	}

	this.errorMessage = null;

	return true;
}

SurveyQuestion.prototype.answerValidate = function () {

	if (!this.required) {
		return true;
	}

	if (this.type === Type.SINGLE_CHOICE) {

		if (this.value === null) {
			this.errorMessage = "请选择内容";
			return false;
		}

	} else if (this.type === Type.MULTIPLE_CHOICE) {

		if (this.values === null || this.values.length === 0) {
			this.errorMessage = "请选择内容";
			return false;
		}

	} else if (this.type === Type.SINGLE_BLANK) {

		if (!this.input.answerValidate()) {
			this.errorMessage = this.input.errorMessage;
			return false;
		}
	} else if (this.type === Type.MULTIPLE_BLANK) {
		for (let i = 0; i < this.inputs.length; i++) {
			let input = this.inputs[i];
			if (!input.answerValidate()) {
				this.errorMessage = input.errorMessage;
				return false;
			}
		}
	} else if (this.type === Type.DYNAMIC_GROUP) {

		let inputsList = this.group.inputsList;

		for (let n = 0; n < inputsList.length; n++) {
			let inputs = inputsList[n];
			for (let i = 0; i < inputs.length; i++) {
				let input = inputs[i];
				if (!input.answerValidate()) {
					this.errorMessage = input.errorMessage;
					return false;
				}
			}
		}

	}

	this.errorMessage = null;

	return true;
}


SurveyQuestion.prototype.getItems = function () {
	if (this.type === Type.SINGLE_CHOICE || this.type === Type.MULTIPLE_CHOICE) {
		return this.choices;
	} else if (this.type === Type.MULTIPLE_BLANK) {
		return this.inputs;
	} else if (this.type === Type.DYNAMIC_GROUP) {
		return this.group.inputs;
	}
}
SurveyQuestion.prototype.newItem = function () {
	if (this.type === Type.SINGLE_CHOICE || this.type === Type.MULTIPLE_CHOICE) {
		return new SurveyChoice();
	} else if (this.type === Type.MULTIPLE_BLANK) {
		return new SurveyInput();
	} else if (this.type === Type.DYNAMIC_GROUP) {
		return new SurveyInput();
	}
}


SurveyQuestion.prototype.addItem = function (index) {

	this.getItems().splice(index + 1, 0, this.newItem());
}
SurveyQuestion.prototype.delItem = function (index) {
	this.getItems().splice(index, 1);
}
SurveyQuestion.prototype.upItem = function (index) {
	if (index !== 0) {
		let item = this.getItems()[index];
		this.getItems().splice(index, 1);
		this.getItems().splice(index - 1, 0, item);
	}
}
SurveyQuestion.prototype.downItem = function (index) {
	if (index < this.getItems().length - 1) {
		let item = this.getItems()[index];
		this.getItems().splice(index, 1);
		this.getItems().splice(index + 1, 0, item);
	}
}


SurveyQuestion.prototype.getForm = function () {

	let choicesInfo = [];
	if (this.choices) {
		for (let i = 0; i < this.choices.length; i++) {
			let choice = this.choices[i];
			choicesInfo.push(choice.getForm());
		}
	}

	let inputsInfo = [];
	if (this.inputs) {
		for (let i = 0; i < this.inputs.length; i++) {
			let input = this.inputs[i];
			inputsInfo.push(input.getForm());
		}
	}


	if (this.type === Type.SINGLE_CHOICE) {

		return {
			"title": this.title,
			"type": this.type,
			"required": this.required,
			"value": this.value,
			"choices": choicesInfo
		};

	} else if (this.type === Type.MULTIPLE_CHOICE) {

		return {
			"title": this.title,
			"type": this.type,
			"required": this.required,
			"values": this.values,
			"choices": choicesInfo
		};
	} else if (this.type === Type.SINGLE_BLANK) {

		let form = {
			"title": this.title,
			"type": this.type,
			"required": this.required,
			"input": this.input ? this.input.getForm() : null
		};

		return form;
	} else if (this.type === Type.MULTIPLE_BLANK) {
		return {
			"title": this.title,
			"type": this.type,
			"required": this.required,
			"inputs": inputsInfo
		};
	} else if (this.type === Type.DYNAMIC_GROUP) {
		return {
			"title": this.title,
			"type": this.type,
			"required": this.required,
			"group": this.group ? this.group.getForm() : null
		};
	}


}

SurveyQuestion.prototype.render = function (obj) {

	SurveyComponent.prototype.render.call(this, obj);

	this.renderList("choices", SurveyChoice);
	this.renderList("inputs", SurveyInput);

	if (this.group) {
		this.renderEntity("group", SurveyGroup);
	}
	if (this.input) {
		this.renderEntity("input", SurveyInput);
	}
}


