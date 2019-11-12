<template>

	<QuestionFrame :survey="survey" :index="index">

		<div class="row" slot="preview">
			<div v-for="(input,inputIndex) in question.inputs" :class="'col-xs-'+input.col">

				<div class="form-group">
					<RichInput :input="input" :title="input.title?input.title:'请在编辑区域输入该项标题...'"/>

				</div>

			</div>
		</div>


		<div class="row" slot="editing">
			<div class="col-xs-12">

				<label>
					文本框设置
				</label>

				<div v-for="(input,inputIndex) in question.getItems()"
				     class="row">

					<div class="col-xs-6">
						<div class="form-group">
							<input type="text" class="form-control" v-model="input.title" placeholder="请输入文本框标题..."/>
						</div>
					</div>

					<div class="col-xs-6">
						<ItemControl :question="question" :index="inputIndex"/>
						<TypeSelection class="ml5" v-model="input.type"/>
						<RowSelection v-if="input.type === 'TEXT'" class="ml5" v-model="input.row"/>
						<ColSelection class="ml5" v-model="input.col"/>

					</div>

				</div>

			</div>


		</div>


	</QuestionFrame>

</template>

<script>

	import Survey from '../../../../common/model/survey/Survey'
	import SurveyQuestion from '../../../../common/model/survey/SurveyQuestion'

	import TypeSelection from "./TypeSelection";
	import ItemControl from "./ItemControl";
	import RowSelection from "./RowSelection";
	import ColSelection from "./ColSelection";
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
			TypeSelection,
			ItemControl,
			RowSelection,
			ColSelection,
			RichInput,
			QuestionFrame
		},
		watch: {},
		methods: {},
		mounted(){

		}
	}
</script>