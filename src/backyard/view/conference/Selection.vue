<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeConferenceRoom" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeConferenceRoom.name&&activeConferenceRoom.id">
					{{activeConferenceRoom.name}}
				</span>
				<span v-else>
					请选择一个会议室...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeConferenceRoom !== null && activeConferenceRoom.name !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="conferenceRoom in pager.conferenceRooms"
           @click.stop.prevent="clickItem(conferenceRoom)"
           :class="{'bg-white':conferenceRoom.id !== activeConferenceRoom.id,'bg-azure':conferenceRoom.id === activeConferenceRoom.id}"
           slot="cells">
        <div>
          <span class="f15">{{conferenceRoom.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import Pager from "../../../common/model/base/Pager";

  import NbPagerSelection from "../../../common/widget/NbPagerSelection";
  import ConferenceRoom from "../../../common/model/conference/ConferenceRoom";

  export default{
    data(){
      return {
        pager: new Pager(ConferenceRoom, 5),
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user
      }
    },
    props: {
      activeConferenceRoom: {
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
      clickItem(conferenceRoom){
        this.activeConferenceRoom.render(conferenceRoom);
      },
      clear(){
        this.activeConferenceRoom.render(new ConferenceRoom());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){


    }
  }
</script>
