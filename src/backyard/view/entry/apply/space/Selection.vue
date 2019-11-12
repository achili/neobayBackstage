<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeEntryApplySpace" :initFilter="initFilter">

			<span slot="title">
				{{activeEntryApplySpace.name&&activeEntryApplySpace.id?"#"+activeEntryApplySpace.id+" "+activeEntryApplySpace.name:"请选择..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="entryApplySpace in pager.entryApplySpaces"
			     @click.stop.prevent="clickItem(entryApplySpace)"
			     :class="{'bg-white':entryApplySpace.id !== activeEntryApplySpace.id,'bg-azure':entryApplySpace.id === activeEntryApplySpace.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{entryApplySpace.id}} {{entryApplySpace.name}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../../common/model/base/Pager";
	import EntryApplySpace from "../../../../../common/model/entry/apply/EntryApplySpace";
	import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(EntryApplySpace, 20)
			}
		},
		props: {
			activeEntryApplySpace: {
				type: EntryApplySpace,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(entryApplySpace){
				this.activeEntryApplySpace.render(entryApplySpace);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){
		}
	}
</script>
