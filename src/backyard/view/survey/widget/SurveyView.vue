<template>

	<div class="row mv20">

		<div class="col-xs-12">
			<h2 class="text-center">{{survey.title}}</h2>
		</div>

		<div class="col-xs-12 mt20">
			<div class="">
				<div v-html="survey.description"></div>
			</div>
		</div>

    <div class="col-xs-12 mt20">
      <div class="">
        <div >{{survey.spaceRegional.name}}</div>
      </div>
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


	</div>

</template>

<script>
	import Survey from "../../../../common/model/survey/Survey";

	import QuestionChoice from "./QuestionChoice";
	import QuestionSingleBlank from "./QuestionSingleBlank";
	import QuestionMultipleBlank from "./QuestionMultipleBlank";
	import QuestionDynamicGroup from "./QuestionDynamicGroup";

	export default {
		data(){
			return {}
		},
		components: {
			QuestionChoice,
			QuestionSingleBlank,
			QuestionMultipleBlank,
			QuestionDynamicGroup
		},
		props: {
			survey: {
				type: Survey,
				required: true
			}
		},
		computed: {},
		methods: {},
		mounted(){

		}
	}
</script>
