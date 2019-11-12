<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeSpaceRoom" :initFilter="initFilter">

			<span slot="title">
				<span v-if="activeSpaceRoom.name && activeSpaceRoom.id">
					<span>{{activeSpaceRoom.name}}</span>
				</span>
				<span v-else>
					请选择一个房间...
				</span>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="spaceRoom in pager.spaceRooms"
			     @click.stop.prevent="clickItem(spaceRoom)"
			     :class="{'bg-white':spaceRoom.id !== activeSpaceRoom.id,'bg-azure':spaceRoom.id === activeSpaceRoom.id}"
			     slot="cells">
				<div>
					<div class="media">
						<div class="media-body">
							<div>
								<span class="f16 black hover-underline cursor">
									{{spaceRoom.name}}
								</span>
							</div>
							<div>
								<div class="mt5">
									{{spaceRoom.address}}
								</div>
							</div>
							<div class="mv5 text-muted">
								{{spaceRoom.description}}
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
  import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";
  import SpaceRoom from "../../../../../common/model/space/SpaceRoom";

  export default{
		data(){
			return {
				pager: new Pager(SpaceRoom, 5)
			}
		},
		props: {
			activeSpaceRoom: {
				type: SpaceRoom,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		methods: {
			clickItem(spaceRoom){
				this.activeSpaceRoom.render(spaceRoom);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){}
	}
</script>
