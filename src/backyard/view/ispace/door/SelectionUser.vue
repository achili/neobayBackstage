<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeUser" :initFilter="initFilter">

			<span slot="title">

				<span v-if="activeUser.nickname && activeUser.id">
					{{activeUser.nickname}}
				</span>
				<span v-else>
					请选择一个通知管理员...
				</span>
        <i class="fa fa-times-circle-o sort-close" v-show="activeUser !== null && activeUser.nickname !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="user in pager.users"
           @click.stop.prevent="clickItem(user)"
           :class="{'bg-white':user.id !== activeUser.id,'bg-azure':user.id === activeUser.id}"
           slot="cells">
        <div>
          <span class="f15">{{user.nickname}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import Pager from "../../../../common/model/base/Pager";

  import NbPagerSelection from "../../../../common/widget/NbPagerSelection";
  import User from "../../../../common/model/user/User";

  export default{
    data(){
      return {
        pager: new Pager(User, 5),
        FeatureType: this.$store.state.FeatureType
      }
    },
    props: {
      activeUser: {
        type: User,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(user){
        this.activeUser.render(user);
      },
      clear(){
        this.activeUser.render(new User());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){


    }
  }
</script>
