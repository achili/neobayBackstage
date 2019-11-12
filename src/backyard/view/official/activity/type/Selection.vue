<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeOfficialActivityType" :initFilter="initFilter">

			<span slot="title">
				{{activeOfficialActivityType.id?"#"+activeOfficialActivityType.id+" "+activeOfficialActivityType.name:"请选择活动类别..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="officialActivityType in pager.officialActivityTypes"
			     @click.stop.prevent="clickItem(officialActivityType)"
			     :class="{'bg-white':officialActivityType.id !== activeOfficialActivityType.id,'bg-azure':officialActivityType.id === activeOfficialActivityType.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{officialActivityType.id}} {{officialActivityType.name}}</span> <span
					:class="'label label-'+officialActivityType.getStatusStyle()">{{officialActivityType.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../../common/model/base/Pager";
	import OfficialActivityType from "../../../../../common/model/official/OfficialActivityType";
	import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(OfficialActivityType, 5)
			}
		},
		props: {
			activeOfficialActivityType: {
				type: OfficialActivityType,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(officialActivityType){
				this.activeOfficialActivityType.render(officialActivityType);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
