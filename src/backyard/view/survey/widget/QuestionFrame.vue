<template>

	<div class="panel" :class="{'panel-default':!question.errorMessage || survey.procedure !== 'ANSWER_EDIT','panel-warning':question.errorMessage && survey.procedure === 'ANSWER_EDIT'}">

		<div class="panel-body">

			<div class="media">
				<div class="pull-left f16 bold">
					<span class="text-danger" v-show="question.required">*</span>
					<span>{{index+1}}</span>
				</div>
				<div class="media-body">
					<div class="f16 bold">
						<div v-if="!question.title">请在编辑区域输入标题...</div>
						<div>
							<div v-html="question.title"></div>
						</div>
					</div>
					<div class="mt15">

						<slot name="preview">
							这里是预览视图
						</slot>

					</div>
				</div>
			</div>

			<NbExpanding>
				<div class="ph15" v-if="(survey.procedure === 'SURVEY_CREATE' || survey.procedure === 'SURVEY_EDIT') && question.editMode">
					<div class="row bg-aliceblue pt15">
						<div class="col-xs-6">

							<div class="form-group">
								<label class="control-label">问题标题</label>
								<textarea class="form-control" rows="2" v-model="question.title"
								          placeholder="请输入标题"></textarea>
							</div>

						</div>
						<div class="col-xs-6">

							<div class="row">
								<div class="col-xs-12">
									<div>
										<label>
											<NbCheckbox v-model="question.required"/>
											必答题
										</label>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xs-12">

							<slot name="editing">
								这里是功能编辑区域
							</slot>

						</div>
					</div>
				</div>

			</NbExpanding>

		</div>

		<PanelHeading v-if="survey.procedure === 'SURVEY_CREATE' || survey.procedure === 'SURVEY_EDIT'" :survey="survey" :index="index"/>
		<div v-if="survey.procedure === 'ANSWER_EDIT'" class="panel-heading" v-show="question.errorMessage">
			{{question.errorMessage}}
		</div>


	</div>

</template>

<script>

	import Survey from '../../../../common/model/survey/Survey'
	import SurveyQuestion from '../../../../common/model/survey/SurveyQuestion'
	import NbExpanding from '../../../../common/widget/NbExpanding.vue'

	import NbCheckbox from "../../../../common/widget/NbCheckbox";
	import PanelHeading from "./PanelHeading";
	import ItemControl from "./ItemControl";

	export default {
		data(){
			return {
				val: 1
			}
		},
		props: {
			survey: {
				type: Survey,
				required: true
			},
			index: {
				type: Number,
				required: true
			}
		},
		computed: {
			question(){
				return this.survey.questions[this.index];
			}
		},
		components: {
			NbCheckbox,
			PanelHeading,
			ItemControl,
			NbExpanding
		},
		watch: {},
		methods: {},
		mounted(){

		}
	}
</script>