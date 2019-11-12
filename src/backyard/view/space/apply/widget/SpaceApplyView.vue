<template>
	<div class="space-apply-widget-view">


		<div class="row">
			<div class="col-md-2">关联项目：</div>
			<div class="col-md-10 bold">
        <router-link
          :to="user.hasPermissionSpace($store.state.FeatureType.PROJECT_MANAGE,spaceApply.spaceRegional.id)? {path: '/by/project/detail', query: { id: spaceApply.project.id }}:{path: '/group/project/detail', query: { id: spaceApply.project.id }}">{{spaceApply.project.name}}
        </router-link>
			</div>
		</div>

		<div class="row mt10">
			<div class="col-md-2 ">创建者：</div>
			<div class="col-md-10 ">
				<UserProfileLink :user="spaceApply.creator"/>
			</div>
		</div>

    <div class="row mt10">
      <div class="col-md-2 ">园区地点：</div>
      <div class="col-md-10 ">
      {{spaceApply.spaceRegional.name}}
      </div>
    </div>

    <div class="row mt10">
			<div class="col-md-2 ">创建时间：</div>
			<div class="col-md-10 "><b>{{spaceApply.createTime | humanTime}}</b></div>
		</div>


		<div class="row mt10">
			<div class="col-md-2 ">名称：</div>
			<div class="col-md-10 "><b>{{spaceApply.name}}</b></div>
		</div>

		<div class="row mt10">
			<div class="col-md-2 ">状态：</div>
			<div class="col-md-10 ">
				<span :class="'label label-'+spaceApply.getStatusStyle()">{{spaceApply.getStatusName()}}</span>
				<span v-if="spaceApply.archive" class="label label-danger">已归档</span>
			</div>
		</div>

		<div class="row mt10">
			<div class="col-md-2 ">项目名称：</div>
			<div class="col-md-10 "><b>{{spaceApply.projectName}}</b></div>
		</div>


		<div class="row mt10">
			<div class="col-md-2 ">公司名：</div>
			<div class="col-md-10 "><b>{{spaceApply.companyName}}</b></div>
		</div>

		<div class="row mt10">
			<div class="col-md-2 ">联系人姓名：</div>
			<div class="col-md-10 "><b>{{spaceApply.leaderName}}</b></div>
		</div>


		<div class="row mt10">
			<div class="col-md-2 ">联系人手机：</div>
			<div class="col-md-10 "><b>{{spaceApply.leaderPhone}}</b></div>
		</div>


		<div class="row mt10">
			<div class="col-md-2 ">联系人邮箱：</div>
			<div class="col-md-10 "><b>{{spaceApply.leaderEmail}}</b></div>
		</div>

		<div class="row mt10">
			<div class="col-md-2 ">团队人数：</div>
			<div class="col-md-10 "><b>{{spaceApply.memberNum}}</b></div>
		</div>

		<div class="row mt10">
			<div class="col-md-2 ">申请场地类型：</div>
			<div class="col-md-10 "><span
				:class="'label label-'+spaceApply.getTypeStyle()">{{spaceApply.getTypeName()}}</span></div>
		</div>


		<div v-if="spaceApply.type === 'NURSERY'">
			<div class="row mt10">
				<div class="col-md-2 ">申请工位数：</div>
				<div class="col-md-10 "><b>{{spaceApply.seatNum}}</b></div>
			</div>

		</div>

		<div v-else>
			<div class="row mt10">
				<div class="col-md-2 ">申请面积(平方米)：</div>
				<div class="col-md-10 "><b>{{spaceApply.area}}</b></div>
			</div>

		</div>


		<div class="row mt10">
			<div class="col-md-2 ">场地用途：</div>
			<div class="col-md-10 "><b>{{spaceApply.spacePurpose}}</b></div>
		</div>


		<div class="row mt10">
			<div class="col-md-2 ">预计入驻日期：</div>
			<div class="col-md-10 "><b>{{spaceApply.estimatedTime | simpleDate}}</b></div>
		</div>


		<div class="row mt10" v-if="spaceApply.status === 'PASS'">
			<div class="col-md-2 ">批准场地：</div>
			<div class="col-md-10 "><b>{{spaceApply.address}}</b></div>
		</div>

		<div class="row mt10" v-if="spaceApply.status === 'PASS'">
			<div class="col-md-2 ">房产证编号：</div>
			<div class="col-md-10 "><b>{{spaceApply.propertyNo}}</b></div>
		</div>

		<div class="row mt10" v-if="spaceApply.type === 'NURSERY'">
			<div class="col-md-2 ">工位：</div>
			<div class="col-md-10 ">
				<div class="row">
					<div class="col-lg-4 col-md-6 mb10" v-for="(spaceSeat,index) in spaceApply.spaceSeats">
						<div class="border br4 p10 bg-azure">
							<div>
								<span class="f15">{{spaceSeat.name}}</span>
							</div>
							<small class="block m-t-xs m-b-xs text-muted">{{spaceSeat.description}}</small>
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="row mt10" v-if="spaceApply.type === 'INCUBATOR'
		 || spaceApply.type === 'ACCELERATOR' || spaceApply.type === 'CIRCULATE'">
			<div class="col-md-2 ">房间：</div>
			<div class="col-md-10 ">
				<div class="row">

					<div class="col-lg-4 col-md-6 mb10" v-for="(spaceRoom,index) in spaceApply.spaceRooms">
						<div class="border br4 p10">
							<SpaceRoomListInnerCell :spaceRoom="spaceRoom"/>
						</div>

					</div>

				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import SpaceApply from  "../../../../../common/model/space/SpaceApply"
	import Pager from  "../../../../../common/model/base/Pager";
	import Notification from  "../../../../../common/model/notification/Notification";

	import SpaceRoomListInnerCell from "../../room/widget/SpaceRoomListInnerCell";

	import {Notification as NotificationBox} from 'element-ui';
	import NbSlidePanel from '../../../../../common/widget/NbSlidePanel'
	import NbExpanding from  "../../../../../common/widget/NbExpanding.vue";
	import LoadingFrame from "../../../widget/LoadingFrame";
	import UserProfileLink from "../../../widget/UserProfileLink";
	import $ from "jquery";

	export default {

		data () {
			return {
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
				protocolFlipped: true
			}
		},
		props: {
			spaceApply: {
				type: SpaceApply,
				required: true
			}
		},
		computed: {},
		components: {
			NbSlidePanel,
			NbExpanding,
			LoadingFrame,
			UserProfileLink,
			SpaceRoomListInnerCell
		},
		methods: {},
		mounted(){

		}
	}
</script>

<style lang="less" rel="stylesheet/less">


</style>
