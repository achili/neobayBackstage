<template>
	<div class="animated fadeIn">


		<div class="row">
			<div class="col-xs-12">
				<span class="f24 bold">
					{{survey.title}}
				</span>
				<span :class="'f16 label label-'+survey.getStatusStyle()">{{survey.getStatusName()}}</span>
			</div>

			<div class="col-xs-12 mt20">

				<button class="btn btn-success" title="下载" @click="survey.downloadCsv()">
					<i class="fa fa-download"></i>
					下载
				</button>


				<button v-show="!preview" class="btn btn-info" title="预览"
				        @click="preview = true">
					<i class="fa fa-eye"></i>
					预览
				</button>

				<button v-show="preview" class="btn btn-primary" title="收起"
				        @click="preview = false">
					<i class="fa fa-eye-slash"></i>
					收起
				</button>

				<button class="btn btn-success" title="发布" v-show="survey.status === 'NEW'"
				        @click="survey.httpStatus('RUNNING')">
					<i class="fa fa-play-circle-o"></i>
					发布
				</button>

				<button class="btn btn-danger" title="停止" v-show="survey.status === 'RUNNING'"
				        @click="survey.httpStatus('STOP')">
					<i class="fa fa-stop"></i>
					停止
				</button>

				<button class="btn btn-primary" title="运行" v-show="survey.status === 'STOP'"
				        @click="survey.httpStatus('RUNNING')">
					<i class="fa fa-play-circle"></i>
					运行
				</button>

				<button class="btn btn-info" title="编辑" @click="confirmEdit">
					<i class="fa fa-pencil"></i>
					编辑
				</button>
				<button class="btn btn-danger" href="javascript:void(0)" title="删除" @click="survey.confirmDel(refreshAnswers)">
					<i class="fa fa-trash"></i>
					删除
				</button>

			</div>

			<div class="col-xs-12 mt20" v-if="survey.status === survey.Status.RUNNING">
				作答地址：<a href="javascript:void(0)" @click.stop.prevent="$router.push('/by/survey/ready/' + survey.id)">{{answerUrl}}</a>
			</div>


		</div>

		<NbExpanding>
			<div v-show="preview">
				<SurveyView :survey="survey"></SurveyView>
			</div>
		</NbExpanding>


		<div class="row">
			<div class="col-xs-12">
				<h2>答卷列表</h2>
			</div>


			<div v-for="surveyAnswer in surveyAnswerPager.surveyAnswers" class="col-xs-12"
			     @click.stop.prevent="$router.push('/by/survey/answer/'+surveyAnswer.id)">
				<div class="bg-white p10 mt10 cursor">
					<div>
						<span class="f16">{{surveyAnswer.content.title}}</span>
					</div>
					<span class="mr10">#{{surveyAnswer.id}}</span>
					<span
						class="mr10"> <b>{{surveyAnswer.user.nickname}}</b> 回答于:{{surveyAnswer.createTime | simpleDateTime}}</span>
				</div>
			</div>

			<div class="col-xs-12 mt20">
				<NbPager :pager="surveyAnswerPager" :callback="refreshAnswers"></NbPager>
			</div>

		</div>
	</div>

</template>
<script>
	import NbPager from '../../../common/widget/NbPager.vue'
	import NbExpanding from "../../../common/widget/NbExpanding.vue"
	import {MessageBox, Notification} from 'element-ui';
	import Survey from "../../../common/model/survey/Survey";
	import SurveyAnswer from "../../../common/model/survey/SurveyAnswer";
	import Pager from "../../../common/model/base/Pager";

	import SurveyView from './widget/SurveyView';

	export default {

		data () {
			return {
				preview: false,
				survey: new Survey(),
				surveyAnswerPager: new Pager(SurveyAnswer)
			}
		},
		computed: {
			host(){

			},
			answerUrl(){
				let host = location.protocol + "//" + location.host;

				return host + "/by/survey/ready/" + this.survey.id;
			}
		},
		components: {
			NbPager,
			SurveyView,
			NbExpanding
		},
		methods: {

			refreshAnswers(){

				let that = this;
				let params = {
					pageSize: this.surveyAnswerPager.pageSize,
					page: this.surveyAnswerPager.page,
					surveyId: this.survey.id
				};

				this.surveyAnswerPager.httpPage(params);

			},

			confirmEdit(){

				if (this.survey.status === this.survey.Status.NEW) {
					this.gotoEdit();
					return;
				} else if (this.survey.status !== this.survey.Status.STOP) {

					Notification.error({
            message: "只有停止状态的表单才可以进行编辑"
					});
					return;

				}

				let that = this;
        MessageBox.confirm('编辑该表单将删除该表单下的所有答卷, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
						that.survey.httpStatus(that.survey.Status.NEW, function () {

							that.gotoEdit();

						});
					},
					function () {
					}
				);
			},
			gotoEdit(){
				this.$router.push('/by/survey/edit/' + this.survey.id);
			},
			fetchDetail(){

				let that = this;
        this.survey.id = this.$store.state.route.params.id;
				if (this.survey.id) {
					this.survey.httpDetail(function () {
						that.survey.setProcedure(that.survey.Procedure.SURVEY_DISPLAY);
					});
				}

			}
		},
		mounted(){

			this.surveyAnswerPager.enableHistory();
			this.fetchDetail();

			this.refreshAnswers();
		}
	}
</script>
