<template>
	<span>
    <img @click="preventBubbles" v-show="showPortrait" alt="image" class="img-circle w30 h30 cursor" :src="user.getAvatarUrl()"/>
		<a @click="preventBubbles">
			{{user.nickname}}
		</a>
	</span>
</template>
<script>

	/**
	 * 该控件是提供用户的超链接的。
	 */
	import User from "../../../../../common/model/user/User";

	export default{
		data(){
			return {
        ownUser: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType
      }
		},
		watch: {},
		props: {
			user: {
				type: User,
				required: true
			},
      showPortrait: {
        type: Boolean,
        required: false,
        default: false
      }
		},
    methods: {
      preventBubbles (e) {
        if(!this.ownUser.hasPermissionAllSpace(this.FeatureType.USER_MANAGE)) {
          return
        }
        this.$router.push('/by/user/profile/' + this.user.id)
        if (e && e.stopPropagation) {
          e.stopPropagation()
        } else {
          window.event.cancelBubble = true
        }
      }
    },
		components: {},
		mounted(){

		}
	}
</script>
