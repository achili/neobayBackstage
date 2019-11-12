<template>

	<QuestionFrame :survey="survey" :index="index">

		<div class="row" slot="preview">
			<div :class="'col-xs-'+question.input.col">
				<RichInput :input="question.input"/>
			</div>
		</div>

		<div class="row" slot="editing">
			<div class="col-xs-12">

				<TypeSelection class="ml5" v-model="question.input.type"/>
				<RowSelection v-if="question.input.type === 'TEXT'" class="ml5" v-model="question.input.row"/>
				<ColSelection class="ml5" v-model="question.input.col"/>



			</div>
		</div>

	</QuestionFrame>

</template>

<script>

	import Survey from '../../../../common/model/survey/Survey'
	import SurveyQuestion from '../../../../common/model/survey/SurveyQuestion'

	import RowSelection from "./RowSelection";
	import ColSelection from "./ColSelection";
	import TypeSelection from "./TypeSelection";
	import RichInput from "./RichInput";
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
			RowSelection,
			ColSelection,
			TypeSelection,
			RichInput,
			QuestionFrame
		},
		watch: {

		},
		methods: {},
		mounted(){

		}
	}
</script>
