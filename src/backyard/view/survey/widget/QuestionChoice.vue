<template>

	<QuestionFrame :survey="survey" :index="index">

		<div class="row" slot="preview">
			<div v-for="(choice,choiceIndex) in question.choices" :class="'col-xs-'+choice.col">

				<div class="media mb15">
					<div class="pull-left">
						<NbRadio v-if="question.type === 'SINGLE_CHOICE'" :name="'question'+index"
						         :val="choiceIndex" v-model="question.value"/>
						<NbCheckbox v-if="question.type === 'MULTIPLE_CHOICE'" :val="choiceIndex"
						            v-model="question.values"/>
					</div>
					<div class="media-body">
						<div class="f14 bold">
							<div v-if="!choice.title">请在编辑区域输入选项文字...</div>
							<div>
								<div v-html="choice.title"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row" slot="editing">
			<div class="col-xs-12">
				<label>
					选项设置
				</label>

				<div v-for="(choice,choiceIndex) in question.choices" class="row">

					<div class="col-xs-6">
						<div class="form-group">
							<textarea class="form-control" rows="2" v-model="choice.title"
														          placeholder="请输入选项文字..."></textarea>
						</div>
					</div>
					<div class="col-xs-6 pt10">

						<ItemControl :question="question" :index="choiceIndex"/>
						<ColSelection class="ml5" v-model="choice.col"/>
					</div>
				</div>

			</div>
		</div>

	</QuestionFrame>

</template>

<script>

	import Survey from '../../../../common/model/survey/Survey'
	import SurveyQuestion from '../../../../common/model/survey/SurveyQuestion'

	import NbRadio from "../../../../common/widget/NbRadio";
	import NbCheckbox from "../../../../common/widget/NbCheckbox";
	import RowSelection from "./RowSelection";
	import ColSelection from "./ColSelection";
	import ItemControl from "./ItemControl";
	import QuestionFrame from "./QuestionFrame";

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
			NbRadio,
			NbCheckbox,
			RowSelection,
			ColSelection,
			ItemControl,
			QuestionFrame
		},
		watch: {

		},
		methods: {},
		mounted(){

		}
	}
</script>