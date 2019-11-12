<template>
	<div class="row space-room-multi-selection">

		<div class="col-md-12">
			<NbFilter :pager="pager" :callback="search"></NbFilter>
		</div>


		<div v-for="spaceRoom in pager.spaceRooms" class="col-lg-4 col-md-6">
			<div class="p10 mt10 cursor border br4"
			     :class="{'bg-white':!isActive(spaceRoom),'bg-azure':isActive(spaceRoom)}"
			     @click.stop.prevent="clickItem(spaceRoom)">
				<div class="media">

					<div class="pull-right" v-if="isActive(spaceRoom)">
						<i class="fa fa-check f30 mt15 olive"></i>
					</div>

					<div class="media-body">
						<SpaceRoomListInnerCell :spaceRoom="spaceRoom"/>
					</div>

				</div>
			</div>
		</div>


		<div class="col-xs-12 mt20">
			<NbPager :pager="pager" :callback="refresh"></NbPager>
		</div>

	</div>
</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import SpaceRoom from "../../../../common/model/space/SpaceRoom";
	import NbPager from '../../../../common/widget/NbPager.vue'
	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import SpaceRoomListInnerCell from "./widget/SpaceRoomListInnerCell";

  export default{
		data(){
			return {
        pager: new Pager(SpaceRoom, 21)
			}
		},
		props: {
			spaceRooms: {
				type: Array,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			search() {
				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
				let that = this;
				this.pager.setFilter("status", SpaceRoom.prototype.Status.FREE);
				this.pager.httpFastPage(function () {
				});
			},
			indexOfArray(spaceRoom){
				for (let i = 0; i < this.spaceRooms.length; i++) {
					let activeSpaceRoom = this.spaceRooms[i];
					if (spaceRoom.id === activeSpaceRoom.id) {
						return i;
					}
				}
				return -1;
			},
			isActive(spaceRoom){
				return this.indexOfArray(spaceRoom) !== -1;
			},
			clickItem(spaceRoom){

				let index = this.indexOfArray(spaceRoom);
				if (index === -1) {
					this.spaceRooms.push(spaceRoom);
				} else {
					this.spaceRooms.splice(index, 1);
				}
			}
		},
		components: {
			NbPager,
			NbFilter,
			SpaceRoomListInnerCell
		},
		mounted(){

			if (this.initFilter) {
				for (let key in this.initFilter) {
					this.pager.setFilter(key, this.initFilter[key]);
				}
			}

			this.refresh();
		}
	}

</script>
<style lang="less" rel="stylesheet/less">

	@import "../../../../common/assets/css/global/variables";

	.space-room-multi-selection {

	}


</style>
