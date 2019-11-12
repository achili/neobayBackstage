<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeSpaceApply" :initFilter="initFilter">

			<span slot="title">
				{{activeSpaceApply.name&&activeSpaceApply.id?"#"+activeSpaceApply.id+" "+activeSpaceApply.name:"请选择一个空间申请..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="spaceApply in pager.spaceApplies"
			     @click.stop.prevent="clickItem(spaceApply)"
			     :class="{'bg-white':spaceApply.id !== activeSpaceApply.id,'bg-azure':spaceApply.id === activeSpaceApply.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{spaceApply.id}} {{spaceApply.name}}</span>

					<span :class="'label label-'+spaceApply.getTypeStyle()">{{spaceApply.getTypeName()}}</span>
					<span :class="'label label-'+spaceApply.getStatusStyle()">{{spaceApply.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import SpaceApply from "../../../../common/model/space/SpaceApply";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(SpaceApply, 5)
			}
		},
		props: {
			activeSpaceApply: {
				type: SpaceApply,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(spaceApply){
				this.activeSpaceApply.render(spaceApply);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){
      //隐藏筛选
      this.pager.showFilter("status", false);
		}
	}
</script>
