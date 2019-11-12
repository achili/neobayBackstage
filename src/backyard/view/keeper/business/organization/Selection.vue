<template>
	<div  class="mb20">

		<NbPagerSelection :pager="pager" :activeItem="activeKeeperBusinessOrganization" :initFilter="{'keeperBusinessTypeId':businessType.id}">

			<span slot="title">


				<div class="pull-left mr15">
					<img class="img-rounded img-md" :src="activeKeeperBusinessOrganization.logo.url">
				</div>
				{{activeKeeperBusinessOrganization.id?"#"+activeKeeperBusinessOrganization.id+" "+activeKeeperBusinessOrganization.name:"请选择服务机构..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="keeperBusinessOrganization in pager.keeperBusinessOrganizations"
			     @click.stop.prevent="clickItem(keeperBusinessOrganization)"
			     :class="{'bg-white':keeperBusinessOrganization.id !== activeKeeperBusinessOrganization.id,'bg-azure':keeperBusinessOrganization.id === activeKeeperBusinessOrganization.id}"
			     slot="cells">

				<div class="media">

					<div class="media-body">
						<div class="pull-left mr15">
							<img class="img-rounded img-md" :src="keeperBusinessOrganization.logo.url">
						</div>
						<div>
							<span class="mr10">#{{keeperBusinessOrganization.id}}</span>
							<span class="f15">{{keeperBusinessOrganization.name}}</span>
						</div>
						<small class="block m-t-xs m-b-xs text-muted">{{keeperBusinessOrganization.description}}</small>

						<span class="mr10">创建于:{{keeperBusinessOrganization.createTime | simpleDate}}</span>
					</div>
				</div>

			</div>

		</NbPagerSelection>
	</div>

</template>
<script>
	import Pager from "../../../../../common/model/base/Pager";
	import KeeperBusinessOrganization from "../../../../../common/model/keeper/business/KeeperBusinessOrganization";
	import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";
	import KeeperBusinessType from "../../../../../common/model/keeper/business/KeeperBusinessType";

	export default{
		data(){
			return {
				pager: new Pager(KeeperBusinessOrganization, 5)

			}
		},
		props: {
			activeKeeperBusinessOrganization: {
				type: KeeperBusinessOrganization,
				required: true
			},
			businessType: {
				type: KeeperBusinessType,
				required: true
			}
		},
		watch: {},
		methods: {
			clickItem(keeperBusinessOrganization){
				this.activeKeeperBusinessOrganization.render(keeperBusinessOrganization);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){
			this.pager.showFilter("keeperBusinessTypeId", false);
		}
	}

</script>
