<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="survey.procedure === 'SURVEY_CREATE'">发布表单</span>
					<span v-show="survey.procedure === 'SURVEY_EDIT'">编辑表单</span>
				</h2>
			</div>
		</div>


		<div class="row">
			<div class="col-xs-12 text-right">
				<CreateSaveButton createClass="btn btn-warning" createText="发布" saveClass="btn btn-warning" :entity="survey"
				                  :callback="save"/>
			</div>

		</div>
		<div class="col-xs-12 m-t-md">
			<div class="form-group">
				<label class="control-label">标题</label>
				<input type="text" class="form-control" v-model="survey.title">
			</div>
			<div class="form-group">
				<label class="control-label">描述</label>
				<NbEditor v-model="survey.description"/>
			</div>
      <div class="form-group">
        <label class="control-label">园区地点</label>
        <SpaceRegionalSelection :spaceRegional="survey.spaceRegional" :editMode="survey.editMode"></SpaceRegionalSelection>
      </div>
		</div>
		<div class="col-xs-12">
			<div class="form-group">
				<label class="control-label">问题设计</label>
			</div>
		</div>
		<div class="col-xs-12">
			<button v-for="type in SurveyQuestion.prototype.getTypeList()" class="btn btn-primary mr5"
			        @click="survey.addQuestion(type.value)">
				<i :class="type.fa"></i>
				{{type.name}}
			</button>
		</div>

		<div class="col-xs-12 mt20">

			<div v-for="(question,index) in survey.questions">

				<QuestionChoice v-if="question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE'"
				                :survey="survey" :index="index"/>
				<QuestionSingleBlank v-if="question.type === 'SINGLE_BLANK'"
				                     :survey="survey" :index="index"/>
				<QuestionMultipleBlank v-if="question.type === 'MULTIPLE_BLANK'"
				                       :survey="survey" :index="index"/>
				<QuestionDynamicGroup v-if="question.type === 'DYNAMIC_GROUP'"
				                      :survey="survey" :index="index"/>


			</div>
		</div>


		<div class="col-xs-12">
			<button v-for="type in SurveyQuestion.prototype.getTypeList()" class="btn btn-primary mr5"
			        @click="survey.addQuestion(type.value)">
				<i :class="type.fa"></i>
				{{type.name}}
			</button>
		</div>

		<div class="col-xs-12 m-t-md">
			<div class="alert alert-danger" v-show="survey.errorMessage">
				{{survey.errorMessage}}
			</div>
			<div class="pull-right">
				<CreateSaveButton createClass="btn btn-warning" createText="发布" saveClass="btn btn-warning" :entity="survey"
				                  :callback="save"/>
			</div>
		</div>
	</div>


</template>
<script>
	import {Notification} from 'element-ui';
	import NbEditor from "../../../common/widget/NbEditor.vue"
	import Survey from '../../../common/model/survey/Survey'
	import SurveyQuestion from '../../../common/model/survey/SurveyQuestion'

	import QuestionChoice from "./widget/QuestionChoice";
	import QuestionSingleBlank from "./widget/QuestionSingleBlank";
	import QuestionMultipleBlank from "./widget/QuestionMultipleBlank";
	import QuestionDynamicGroup from "./widget/QuestionDynamicGroup";
	import CreateSaveButton from "../widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'

	export default {

		data () {
			return {
				SurveyQuestion,
				survey: new Survey()
			}
		},
		components: {
			NbEditor,
			QuestionChoice,
			QuestionSingleBlank,
			QuestionMultipleBlank,
			QuestionDynamicGroup,
			CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			setContent(content){
				this.survey.description = content;
			},
			save(){
				let that = this;
				this.survey.httpSave(function () {

					Notification.success({
						message: that.survey.id ? '修改表单成功！' : '创建表单成功！'
					});
					that.$router.push("/by/survey/detail/" + that.survey.id);

				});
			}
		},
		mounted(){

			let that = this;

			this.survey.id = this.$store.state.route.params.id;

			if (this.survey.id) {

				this.survey.httpDetail(function () {
					that.survey.setProcedure(that.survey.Procedure.SURVEY_EDIT);
				});
			} else {
				this.survey.setProcedure(this.survey.Procedure.SURVEY_CREATE);
			}
		}
	}
</script>
