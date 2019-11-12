<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!officialActivity.editMode">发布活动</span>
					<span v-show="officialActivity.editMode">编辑活动</span>
				</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-12 mb10">
				<CreateSaveButton :entity="officialActivity" :callback="save"/>
			</div>
			<div class="col-xs-12">

				<NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-leaf"></i>
              活动表单
            </span>
					<div slot="body">
						<div class="row">
							<label class="col-md-2 control-label compulsory">标题</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="officialActivity.title">
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">活动状态</label>
							<div class="col-md-10">

								<select class="form-control" v-model="officialActivity.status">
									<option v-for="item in officialActivity.StatusList" :value="item.value">
										{{item.name}}
									</option>
								</select>

							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">地址</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="officialActivity.address">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">海报</label>
							<div class="col-md-10">
								<NbTank :tank="officialActivity.poster"/>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">活动类型</label>
							<div class="col-md-10">
								<ActivityTypeSelection :activeOfficialActivityType="officialActivity.type"/>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">报名类型</label>
							<div class="col-md-10">
								<select class="form-control" v-model="officialActivity.category">
									<option v-for="item in officialActivity.CategoryList" :value="item.value">
										{{item.name}}
									</option>
								</select>
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">活动发起方</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="officialActivity.sponsor">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">报名起止时间</label>
							<div class="col-md-10">
								<NbDateRange type="datetimerange" :startTime="officialActivity.applyStartTime"
								             v-on:startTimeChange="officialActivity.applyStartTime = arguments[0]"
								             :endTime="officialActivity.applyEndTime"
								             v-on:endTimeChange="officialActivity.applyEndTime = arguments[0]"/>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">活动起止时间</label>
							<div class="col-md-10">
								<NbDateRange type="datetimerange" :startTime="officialActivity.startTime"
								             v-on:startTimeChange="officialActivity.startTime = arguments[0]"
								             :endTime="officialActivity.endTime"
								             v-on:endTimeChange="officialActivity.endTime = arguments[0]"/>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">活动最大人数</label>
							<div class="col-md-10">
								<input type="number" class="form-control" v-model="officialActivity.maxNum">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">发布日期</label>
							<div class="col-md-10">
								<el-date-picker
									v-model="officialActivity.releaseTime"
									type="datetime"
									placeholder="选择日期时间">
								</el-date-picker>
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">摘要</label>
							<div class="col-md-10">
								<textarea class="form-control" rows="6" v-model="officialActivity.digest"
								          placeholder="此处填写活动摘要……"></textarea>
							</div>
						</div>


						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">正文</label>
							<div class="col-md-10">
								<NbEditor v-model="officialActivity.content" height="400px;"/>
							</div>
						</div>


					</div>
				</NbSlidePanel>

			</div>
			<div class="col-xs-12 m-t-md">
				<div class="alert alert-danger" v-show="officialActivity.errorMessage">
					{{officialActivity.errorMessage}}

				</div>
				<div>
					<CreateSaveButton :entity="officialActivity" :callback="save"/>

				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import NbTank from '../../../../common/widget/NbTank'
	import NbEditor from "../../../../common/widget/NbEditor"
	import NbDateRange from "../../../../common/widget/NbDateRange"
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel"
	import {simpleDateTime, str2Date} from '../../../../common/filter/time'
	import {Notification} from 'element-ui';
	import OfficialActivity from  "../../../../common/model/official/OfficialActivity"
	import OfficialActivityType from  "../../../../common/model/official/OfficialActivityType"
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"
	import ActivityTypeSelection from "./type/Selection.vue";

	import Pager from  "../../../../common/model/base/Pager"

	import $ from "jquery"

	export default {

		data () {
			return {
				officialActivity: new OfficialActivity(),
				officialArticleTypePager: new Pager(OfficialActivityType)
			}
		},
		components: {
			NbTank,
			NbEditor,
			NbSlidePanel,
			NbDateRange,
			CreateSaveButton,
			ActivityTypeSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;

				this.officialActivity.httpSave(function (response) {

					Notification.success({
						message: that.officialActivity.editMode ? '修改活动成功！' : '创建活动成功！'
					});
					that.$router.push("/by/official/activity/detail/" + that.officialActivity.id);

				});
			},
			refresh(){
				this.officialArticleTypePager.pageSize = 50;
				this.officialArticleTypePager.httpFastPage();

			}
		},


		mounted(){

			let that = this;

			this.officialActivity.id = this.$store.state.route.params.id;

			if (this.officialActivity.id) {

				this.officialActivity.editMode = true;
				this.officialActivity.httpDetail();
			} else {
				this.officialActivity.author = this.$store.state.user.nickname;
			}

			this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

</style>
