<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeConference" :initFilter="initFilter">

			<span slot="title">
				<span v-if="activeConference.name && activeConference.id">
					<span class="ml10">{{activeConference.name}}</span>
				</span>
				<span v-else>
					请选择会议室...
				</span>
        <i class="fa fa-trash-o fa-lg text-danger" v-show="activeConference !== null && activeConference.id" @click="clear"></i>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="conference in pager.conferenceRooms"
			     @click.stop.prevent="clickItem(conference)"
			     :class="{'bg-white':conference.id !== activeConference.id,'bg-azure':conference.id === activeConference.id}"
			     slot="cells">
				<div>
					<div class="media">
						<div class="media-body">
							<div>
								<span class="f16 black hover-underline cursor">
									会议室名称：{{conference.name}}
								</span>
							</div>
							<div class="mv5 text-muted">
								门名字：{{conference.doorName}}
							</div>
							<div class="mv5 text-muted">
								会议室地址：{{conference.address}}
							</div>
							<div class="mv5 text-muted">
								会议室描述：{{conference.description}}
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
  import ConferenceRoom from "../../../../../common/model/conference/ConferenceRoom";

	export default{
		data(){
			return {
				//currentUser: this.$store.state.user,
				pager: new Pager(ConferenceRoom, 5)
			}
		},
		props: {
      activeConference: {
				type: ConferenceRoom,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(conference){
				this.activeConference.render(conference);
			},
      clear(){
        this.activeConference.render(new ConferenceRoom());
      }
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
