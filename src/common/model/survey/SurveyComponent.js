import Base from "../base/Base";

export default function SurveyComponent() {

	//extend Base's Attributes.
	Base.call(this, arguments);

	this.forAnswer = null;

	this.required = null;

	this.procedure = null;


}

//extend Base's methods.
SurveyComponent.prototype = new Base();
SurveyComponent.prototype.constructor = SurveyComponent;

SurveyComponent.prototype.setProcedure = function (p) {

	this.procedure = p;
}
