<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeRoom" :initFilter="initFilter">

			<span slot="title">
				<span v-if="activeRoom.name && activeRoom.id">
					<span class="ml10">{{activeRoom.name}}</span>
				</span>
				<span v-else>
					请选择房间...
				</span>
        <i class="fa fa-trash-o fa-lg text-danger" v-show="activeRoom !== null && activeRoom.id" @click="clear"></i>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="room in pager.spaceRooms"
			     @click.stop.prevent="clickItem(room)"
			     :class="{'bg-white':room.id !== activeRoom.id,'bg-azure':room.id === activeRoom.id}"
			     slot="cells">
				<div>
					<div class="media">
						<div class="media-body">
							<div>
								<span class="f16 black hover-underline cursor">
									房间名称：{{room.name}}
								</span>
							</div>
							<div class="mv5 text-muted">
								门名字：{{room.doorName}}
							</div>
							<div class="mv5 text-muted">
								房间地址：{{room.address}}
							</div>
							<div class="mv5 text-muted">
								房间描述：{{room.description}}
							</div>

						</div>
					</div>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../../common/model/base/Pager";
	import Room from "../../../../../common/model/space/SpaceRoom";
	import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				//currentUser: this.$store.state.user,
				pager: new Pager(Room, 5)
        /*FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user*/
			}
		},
		props: {
			activeRoom: {
				type: Room,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(room){
				this.activeRoom.render(room);
			},
      clear(){
        this.activeRoom.render(new Room());
      }
		},
		components: {
			NbPagerSelection
		},
    /*beforeMount() {
      if(!this.user.hasPermission(this.FeatureType.PROJECT_MANAGE)) {
        this.pager.removeFilter('projectMentorId');
      }
    },*/
		mounted(){


		}
	}
</script>
