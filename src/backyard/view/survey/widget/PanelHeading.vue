<template>
	<div class="panel-heading clearfix">
		<div class="pull-left">
			<span class="text-danger lh30 bold">{{question.errorMessage}}</span>
		</div>
		<div class="pull-right">

			<button v-show="question.editMode" class="btn btn-warning btn-sm btn-outline"
			        @click="question.finish()">
				<i class="fa fa-check"></i>
				完成
			</button>

			<button v-show="!question.editMode" class="btn btn-warning btn-sm btn-outline"
			        @click="question.editMode=true">
				<i class="fa fa-pencil"></i>
				编辑
			</button>

			<button class="btn btn-primary btn-sm btn-outline"
			        @click="survey.copyQuestion(index)">
				<i class="fa fa-copy"></i>
				复制
			</button>

			<button class="btn btn-primary btn-sm btn-outline"
			        @click="survey.upQuestion(index)">
				<i class="fa fa-arrow-up"></i>
				上移
			</button>

			<button class="btn btn-primary btn-sm btn-outline"
			        @click="survey.downQuestion(index)">
				<i class="fa fa-arrow-down"></i>
				下移
			</button>

			<button class="btn btn-danger btn-sm btn-outline" @click="survey.delQuestion(index)">
				<i class="fa fa-trash"></i>
				删除
			</button>

		</div>
	</div>
</template>

<script>
	import Survey from '../../../../common/model/survey/Survey'
	import SurveyQuestion from '../../../../common/model/survey/SurveyQuestion'
	export default {
		data(){
			return {}
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
		watch: {},
		methods: {},
		mounted(){

		}
	}
</script>