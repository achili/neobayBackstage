import SurveyComponent from "./SurveyComponent";
export default function SurveyChoice() {

	//extend SurveyComponent's Attributes.
	SurveyComponent.call(this, arguments);

	this.title = null;
	this.col = 12;

}
//extend SurveyComponent
SurveyChoice.prototype = new SurveyComponent();
SurveyChoice.prototype.constructor = SurveyChoice;

SurveyChoice.prototype.getForm = function () {
	return {
		title: this.title,
		col: this.col
	}
}

