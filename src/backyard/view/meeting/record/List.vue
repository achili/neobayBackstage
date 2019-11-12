<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">

				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>会议室预订记录列表</span>
				</h2>
				<div class="pull-right mb5">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/meeting/record/create')">
						<i class="fa fa-send"></i>
						<span>添加预订记录</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="meetingRecord in pager.meetingRecords" class="col-xs-12 bg-white pv10 mt10 cursor"
				     @click.stop.prevent="$router.push('/by/meeting/record/detail/' + meetingRecord.id)">

					<div class="media">


						<div class="pull-right action-buttons">
							<a href="javascript:void(0)" title="通过" @click.stop.prevent="confirmPass(meetingRecord)">
								<i class="fa fa-check text-success f20"></i>
							</a>
							<a href="javascript:void(0)" title="拒绝" @click.stop.prevent="confirmReject(meetingRecord)">
								<i class="fa fa-close text-danger f20"></i>
							</a>
							<!--<a title="编辑" @click.stop.prevent="$router.push('/by/meeting/record/edit/'+ meetingRecord.id)">-->
							<!--<i class="fa fa-pencil text-info f20"></i>-->
							<!--</a>-->
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="meetingRecord.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body">
							<div class="cell-title">
								<span class="f15">{{meetingRecord.teamName}}</span>
								<span :class="'label label-' + meetingRecord.getStatusStyle()">{{meetingRecord.getStatusName()}}</span>
							</div>
							<div class="cell-content">
								<span class="mr10">{{meetingRecord.date}}</span>
								<span class="mr10"><span>{{meetingRecord.meetingRoom.name}}</span>
									<span>{{(meetingRecord.beginTime - meetingRecord.beginTime % 2) / 2}}:{{meetingRecord.beginTime % 2 * 3}}0</span><span>--</span><span>{{(meetingRecord.endTime - meetingRecord.endTime % 2) / 2}}:{{meetingRecord.endTime % 2 * 3}}0</span></span>

							</div>
							<div class="cell-content">
								<span class="mr10">#{{meetingRecord.id}}</span>
								<span class="mr10">申请人:{{meetingRecord.memberName}}</span>
								<span class="mr10">联系方式:{{meetingRecord.phone}}</span>
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

	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../../common/model/base/Pager"
	import MeetingRecord from  "../../../../common/model/meeting/MeetingRecord"
	import Filter from  "../../../../common/model/base/Filter"
	export default {

		data () {
			return {
				pager: new Pager(MeetingRecord)
			}
		},

		components: {
			NbFilter,
			NbPager
		},

		methods: {

			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			},
			confirmPass(meetingRecord){
				let that = this;
				if (meetingRecord.status !== 'OK') {
					Notification.success({
						message: '已经经过审核!'
					});
					return;
				}
				MessageBox.confirm('此操作将通过该会议室预订, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
						that.fetchPass(meetingRecord);
					},
					function () {
					}
				);
			},
			confirmReject(meetingRecord){
				let that = this;
				if (meetingRecord.status !== 'OK') {
					Notification.success({
						message: '已经经过审核!'
					});
					return;
				}
				MessageBox.confirm('此操作将拒绝该会议室预订, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
						that.fetchReject(meetingRecord);
					},
					function () {
					}
				);
			},
			fetchPass(meetingRecord){
				let that = this;
				meetingRecord.httpPass(function () {
					Notification.success({
						message: '成功批准该会议室预订!'
					});
					that.refresh();
				});
			},
			fetchReject(meetingRecord){
				let that = this;
				meetingRecord.httpReject(function () {
					Notification.success({
						message: '成功拒绝该会议室预订记录!'
					});
					that.refresh();
				});
			}
		},

		mounted(){
			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>
