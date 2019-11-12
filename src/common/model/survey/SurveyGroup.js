import SurveyComponent from "./SurveyComponent";
import SurveyInput from "../survey/SurveyInput";
import Survey from "./Survey";

export default function SurveyGroup() {

	//extend SurveyComponent's Attributes.
	SurveyComponent.call(this, arguments);

	this.title = null;
	this.max = 10;
	this.min = 1;

	this.inputs = [];
	this.inputs.push(new SurveyInput());

	//Array little trick. Use the same object with inputs in Creation stage.
	this.inputsList = [];
	this.inputsList.push(this.inputs);

}
//extend SurveyComponent
SurveyGroup.prototype = new SurveyComponent();
SurveyGroup.prototype.constructor = SurveyGroup;


SurveyGroup.prototype.setProcedure = function (p) {

	this.procedure = p;

	if (p === Survey.prototype.Procedure.SURVEY_CREATE || p === Survey.prototype.Procedure.SURVEY_EDIT) {
		this.inputsList = [];
		this.inputsList.push(this.inputs);
	}

	if (this.inputs) {
		for (let i = 0; i < this.inputs.length; i++) {
			let input = this.inputs[i];
			input.setProcedure(p);
		}
	}

	if (this.inputsList) {
		for (let j = 0; j < this.inputsList.length; j++) {
			let inputs = this.inputsList[j];
			if (inputs) {
				for (let i = 0; i < inputs.length; i++) {
					let input = inputs[i];
					input.setProcedure(p);
				}
			}
		}
	}


}

SurveyGroup.prototype.getForm = function () {

	let inputsListInfo = [];
	for (let i = 0; i < this.inputsList.length; i++) {
		let inputs = this.inputsList[i];
		let inputsInfo = [];
		for (let j = 0; j < inputs.length; j++) {
			let input = inputs[j];
			inputsInfo.push(input.getForm());
		}
		inputsListInfo.push(inputsInfo);
	}

	let inputsInfo = [];
	for (let j = 0; j < this.inputs.length; j++) {
		let input = this.inputs[j];
		inputsInfo.push(input.getForm());
	}

	return {
		title: this.title,
		max: this.max,
		min: this.min,
		col: this.col,
		inputsList: inputsListInfo,
		inputs: inputsInfo
	}
}

SurveyGroup.prototype.render = function (obj) {

	SurveyComponent.prototype.render.call(this, obj);

	let inputsListInfo = [];
	for (let i = 0; i < this.inputsList.length; i++) {
		let inputs = this.inputsList[i];
		let inputsInfo = [];
		for (let j = 0; j < inputs.length; j++) {
			let input = inputs[j];
			let clazz = new SurveyInput();

			clazz.render(input);

			inputsInfo.push(clazz);
		}
		inputsListInfo.push(inputsInfo);
	}
	this.inputsList = inputsListInfo;


	let inputsInfo = [];
	for (let j = 0; j < this.inputs.length; j++) {
		let input = this.inputs[j];
		let clazz = new SurveyInput();

		clazz.render(input);

		inputsInfo.push(clazz);
	}
	this.inputs = inputsInfo;

}

SurveyGroup.prototype.newInputs = function (inputs) {

	if (!inputs) {
		inputs = this.inputs;
	}

	let inputsInfo = [];
	for (let j = 0; j < inputs.length; j++) {
		let input = inputs[j];
		let clazz = new SurveyInput();

		clazz.setProcedure(this.procedure);


		clazz.render(input.getForm());

		if (clazz.type === "TIME") {
		}


		inputsInfo.push(clazz);
	}

	return inputsInfo;
}


SurveyGroup.prototype.canAdd = function (index) {
	return this.inputsList.length < this.max;
}

SurveyGroup.prototype.addGroup = function (index) {

	if (this.canAdd(index)) {
		this.inputsList.splice(index + 1, 0, this.newInputs());
	}


}

SurveyGroup.prototype.canCopy = function (index) {
	return this.inputsList.length < this.max;
}
SurveyGroup.prototype.copyGroup = function (index) {
	if (this.canCopy(index)) {
		let inputs = this.inputsList[index];
		this.inputsList.push(this.newInputs(inputs));
	}

}

SurveyGroup.prototype.canUp = function (index) {
	return index > 0;
}
SurveyGroup.prototype.upGroup = function (index) {
	if (index !== 0) {
		let item = this.inputsList[index];
		this.inputsList.splice(index, 1);
		this.inputsList.splice(index - 1, 0, item);
	}
}

SurveyGroup.prototype.canDown = function (index) {
	return index < this.inputsList.length - 1;
}

SurveyGroup.prototype.downGroup = function (index) {
	if (index < this.inputsList.length - 1) {
		let item = this.inputsList[index];
		this.inputsList.splice(index, 1);
		this.inputsList.splice(index + 1, 0, item);
	}
}

SurveyGroup.prototype.canDel = function (index) {
	return this.inputsList.length > this.min;
}
SurveyGroup.prototype.delGroup = function (index) {
	if (this.inputsList.length > this.min) {
		this.inputsList.splice(index, 1);
	}

}



