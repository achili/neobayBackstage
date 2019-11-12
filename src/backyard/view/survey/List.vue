<template>
	<div class="animated fadeIn">


		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
          <span>表单管理</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/survey/create')">
						<i class="fa fa-plus"></i>
            <span>发布表单</span>
					</button>
				</div>
			</div>
		</div>


		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="survey in pager.surveys" class="bg-white p10 br4 mt10 cursor"
				     @click.stop.prevent="$router.push('/by/survey/detail/'+survey.id)">

					<div class="media">
						<div class="pull-right mt5 action-buttons">

							<a title="下载XLS" @click.stop.prevent="survey.downloadXls()">
								<i class="fa fa-file-excel-o text-success f20"></i>
							</a>

							<a title="下载CSV" @click.stop.prevent="survey.downloadCsv()">
								<i class="fa fa-file-o text-success f20"></i>
							</a>

							<a title="发布" v-show="survey.status === 'NEW'" @click.stop.prevent="survey.httpStatus('RUNNING')">
								<i class="fa fa-play-circle-o text-success f20"></i>
							</a>

							<a title="停止" v-show="survey.status === 'RUNNING'" @click.stop.prevent="survey.httpStatus('STOP')">
								<i class="fa fa-stop text-danger f20"></i>
							</a>

							<a title="运行" v-show="survey.status === 'STOP'" @click.stop.prevent="survey.httpStatus('RUNNING')">
								<i class="fa fa-play-circle text-primary f20"></i>
							</a>

							<a title="编辑" @click.stop.prevent="confirmEdit(survey)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="survey.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span>{{survey.title}}</span>
								<span :class="'label label-'+survey.getStatusStyle()">{{survey.getStatusName()}}</span>
							</div>
							<div class="cell-description" v-if="survey.status === survey.Status.RUNNING">
								作答地址：{{host}}/by/survey/ready/{{survey.id}}
							</div>


							<div class="cell-content">
								#{{survey.id}}
                <span>园区地点：{{survey.spaceRegional.name}}</span>
								<span class="mr10">创建于:{{survey.createTime | simpleDateTime}}</span>
							</div>

						</div>
					</div>
				</div>
			</div>


			<div class="col-xs-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>

		</div>

	</div>

</template>
<script>
	import NbPager from '../../../common/widget/NbPager.vue'
	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import {MessageBox, Notification} from 'element-ui';

	import Pager from "../../../common/model/base/Pager";
	import Survey from "../../../common/model/survey/Survey";


	export default {

		data () {
			return {
				pager: new Pager(Survey)
			}
		},
		components: {
			NbPager,
			NbFilter
		},
		computed: {
			host(){
				return location.protocol + "//" + location.host;
			}
		},
		watch: {},
		methods: {

			search(){
				this.pager.page = 0;
				this.refresh();
			},
			refresh(){

				let that = this;
				this.pager.httpFastPage();

			},

			confirmEdit(survey){

				if (survey.status === survey.Status.NEW) {
					this.gotoEdit(survey);
					return;
				} else if (survey.status !== survey.Status.STOP) {

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
						survey.httpStatus(survey.Status.NEW, function () {

							that.gotoEdit(survey);

						});
					},
					function () {
					}
				);
			},
			gotoEdit(survey){
				this.$router.push('/by/survey/edit/' + survey.id);
			}
		},
		mounted(){

			//默认按照时间倒序排列。
			if (this.pager.getFilter("orderId").isEmpty()) {
				this.pager.setFilter("orderId", "DESC");
			}


			this.pager.enableHistory();
			this.refresh();




		}
	}

</script>
