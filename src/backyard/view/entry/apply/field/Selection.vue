<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeEntryApplyField" :initFilter="initFilter">

			<span slot="title">
				{{activeEntryApplyField.name&&activeEntryApplyField.id?"#"+activeEntryApplyField.id+" "+activeEntryApplyField.name:"请选择..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="entryApplyField in pager.entryApplyFields"
			     @click.stop.prevent="clickItem(entryApplyField)"
			     :class="{'bg-white':entryApplyField.id !== activeEntryApplyField.id,'bg-azure':entryApplyField.id === activeEntryApplyField.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{entryApplyField.id}} {{entryApplyField.name}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../../common/model/base/Pager";
	import EntryApplyField from "../../../../../common/model/entry/apply/EntryApplyField";
	import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(EntryApplyField, 20)
			}
		},
		props: {
			activeEntryApplyField: {
				type: EntryApplyField,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(entryApplyField){
				this.activeEntryApplyField.render(entryApplyField);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){
		}
	}
</script>
