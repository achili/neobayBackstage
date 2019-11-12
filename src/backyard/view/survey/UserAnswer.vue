<template>
	<div class="animated fadeIn">


		<SurveyView :survey="surveyAnswer.content"></SurveyView>


		<div class="row mb30">
			<div class="col-xs-12 mt20 text-right">

				<button class="btn btn-primary" @click="answer">
					<i class="fa fa-send"></i>
					提交表单
				</button>

			</div>
		</div>

	</div>

</template>
<script>
	import {Notification} from 'element-ui';
	import SurveyView from './widget/SurveyView.vue';
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
		methods: {

			answer(){
				let that = this;
				this.surveyAnswer.httpSave(function (response) {
					Notification.success({
						message: "表单提交成功！"
					});

					that.$router.push("list");

				});

			}
		},
		mounted(){

			let that = this;

			let surveyId = this.$store.state.route.params.surveyId;
			if(!surveyId) {
        surveyId = this.$store.state.route.query.id;
      }

			this.surveyAnswer.httpReady(surveyId);


		}
	}
</script>
