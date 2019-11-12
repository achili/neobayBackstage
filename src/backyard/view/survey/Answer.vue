<template>
	<div class="animated fadeIn">

		<SurveyView :survey="surveyAnswer.content"/>

		<div class="text-right">
			<button class="btn btn-success" @click="$router.go(-1)">
				<i class="fa fa-arrow-left"></i>
				返回
			</button>
		</div>
	</div>

</template>
<script>
	import {Notification} from 'element-ui';
	import SurveyView from './widget/SurveyView';
	import Survey from "../../../common/model/survey/Survey";
	import SurveyAnswer from "../../../common/model/survey/SurveyAnswer";

	export default {

		data () {
			return {
				surveyAnswer: new SurveyAnswer()
			}
		},
		components: {
			SurveyView
		},
		methods: {},
		mounted(){

			let that = this;

			this.surveyAnswer.id = this.$store.state.route.params.surveyAnswerId;

			this.surveyAnswer.httpDetail(function () {
				that.surveyAnswer.setProcedure(Survey.prototype.Procedure.ANSWER_DISPLAY);
			});


		}
	}
</script>
