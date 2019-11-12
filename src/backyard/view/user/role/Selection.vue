<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeUserRole" :initFilter="initFilter">

			<span slot="title">
				{{activeUserRole.id?"#"+activeUserRole.id+" "+activeUserRole.name:"请选择角色..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="userRole in pager.userRoles"
			     @click.stop.prevent="clickItem(userRole)"
			     :class="{'bg-white':userRole.id !== activeUserRole.id,'bg-azure':userRole.id === activeUserRole.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{userRole.id}} {{userRole.name}}</span> <span
					:class="'label label-'+userRole.getStatusStyle()">{{userRole.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import UserRole from "../../../../common/model/user/role/UserRole";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(UserRole, 20)
			}
		},
		props: {
			activeUserRole: {
				type: UserRole,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(userRole){
				this.activeUserRole.render(userRole);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
