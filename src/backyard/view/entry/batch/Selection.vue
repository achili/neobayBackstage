<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeEntryBatch" :initFilter="initFilter">

			<span slot="title">
				{{activeEntryBatch.id?"#"+activeEntryBatch.id+" "+activeEntryBatch.name:"请选择入驻批次..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="entryBatch in pager.entryBatches"
			     @click.stop.prevent="clickItem(entryBatch)"
			     :class="{'bg-white':entryBatch.id !== activeEntryBatch.id,'bg-azure':entryBatch.id === activeEntryBatch.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{entryBatch.id}} {{entryBatch.name}}</span> <span
					:class="'label label-'+entryBatch.getStatusStyle()">{{entryBatch.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import EntryBatch from "../../../../common/model/entry/batch/EntryBatch";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(EntryBatch, 5)
			}
		},
		props: {
			activeEntryBatch: {
				type: EntryBatch,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(entryBatch){
				this.activeEntryBatch.render(entryBatch);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
