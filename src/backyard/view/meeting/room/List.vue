<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>会议室</span>
				</h2>
				<div class="pull-right mb5">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/meeting/room/create')">
						<i class="fa fa-send"></i>
						<span>添加会议室</span>
					</button>
				</div>
			</div>
		</div>


		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="meetingRoom in pager.meetingRooms" class="col-xs-12 col-sm-6 col-md-4 p10 cursor">
					<div class="media m5 p20 bg-white "
					     @click.stop.prevent="$router.push('/by/meeting/room/detail/' + meetingRoom.id)">
						<div>
							<div>
								<img class="center-block h200 m5" style="width: 98%" v-if="meetingRoom.image && meetingRoom.image.url"
								     :src="meetingRoom.image.url">
							</div>


							<div class="pull-right action-buttons">
								<a title="编辑" @click.stop.prevent="$router.push('/by/meeting/room/edit/'+meetingRoom.id)">
									<i class="fa fa-pencil text-info f20"></i>
								</a>
								<a href="javascript:void(0)" title="删除" @click.stop.prevent="meetingRoom.confirmDel(refresh)">
									<i class="fa fa-trash text-danger f20"></i>
								</a>
							</div>
							<div class="media-body m10 mb0 h100">
								<div class="cell-title">
									<span>{{meetingRoom.buildingNum}}号楼{{meetingRoom.roomNum}}</span>
									<span v-for="tag in meetingRoom.tags" class="mr5 label label-default">{{tag}}</span>
								</div>
								<div class="cell-description">

									<small>{{meetingRoom.description}}</small>
								</div>
								<div>

									<span class="mr10">#{{meetingRoom.id}}</span>
								</div>
							</div>
						</div>
						<span><RoomTimeLine class="pull-right" :meetingRoom="meetingRoom"></RoomTimeLine></span>
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
	import MeetingRoom from  "../../../../common/model/meeting/MeetingRoom"
	import MeetingRecord from "../../../../common/model/meeting/MeetingRecord"
	import RoomTimeLine from "../RoomTimeLine.vue"
	import Timeline from "../TimeLine.vue"


	export default {

		data () {
			return {
				pager: new Pager(MeetingRoom)
			}
		},

		components: {
			NbFilter,
			NbPager,
			Timeline,
			RoomTimeLine
		},

		methods: {
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>

