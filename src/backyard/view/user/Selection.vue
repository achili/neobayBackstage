<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeUser" :initFilter="initFilter">

			<span slot="title">
				<span v-if="activeUser.nickname && activeUser.id">
					<img :src="activeUser.getAvatarUrl()" class="img-sm"/>
					<span class="ml10">{{activeUser.nickname}}</span>
				</span>
				<span v-else>
					请选择一位用户...
				</span>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="user in pager.users"
			     @click.stop.prevent="clickItem(user)"
			     :class="{'bg-white':user.id !== activeUser.id,'bg-azure':user.id === activeUser.id}"
			     slot="cells">
				<div>
					<div class="media">
						<div class="pull-left">
							<img class="img-rounded img-md" :src="user.getAvatarUrl()">
						</div>
						<div class="media-body">
							<div>
								<span class="f16 black hover-underline cursor">
									{{user.nickname}}
									<span v-if="user.id===currentUser.id"
									      class="text-danger">(It's you)</span>
								</span>
							</div>
							<div>
								<div class="mt5">
									{{user.role.name}}
								</div>
							</div>
							<div class="mv5 text-muted">
								{{user.description}}
							</div>

						</div>
					</div>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../common/model/base/Pager";
	import User from "../../../common/model/user/User";
	import NbPagerSelection from "../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				currentUser: this.$store.state.user,
				pager: new Pager(User, 5)
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
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
