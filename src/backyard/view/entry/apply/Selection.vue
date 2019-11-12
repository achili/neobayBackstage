<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeEntryApply" :initFilter="initFilter">

			<span slot="title">
				{{activeEntryApply.name&&activeEntryApply.id?"#"+activeEntryApply.id+" "+activeEntryApply.name:"请选择入驻申请..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="entryApply in pager.entryApplies"
			     @click.stop.prevent="clickItem(entryApply)"
			     :class="{'bg-white':entryApply.id !== activeEntryApply.id,'bg-azure':entryApply.id === activeEntryApply.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{entryApply.id}} {{entryApply.name}}</span> <span
					:class="'label label-'+entryApply.getStatusStyle()">{{entryApply.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import EntryApply from "../../../../common/model/entry/apply/EntryApply";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(EntryApply, 5)
			}
		},
		props: {
			activeEntryApply: {
				type: EntryApply,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(entryApply){
				this.activeEntryApply.render(entryApply);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
