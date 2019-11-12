<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeProtocolSpace" :initFilter="initFilter">

			<span slot="title">
				{{activeProtocolSpace.name&&activeProtocolSpace.id?"#"+activeProtocolSpace.id+" "+activeProtocolSpace.name:"请选择一个租赁合同..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="protocolSpace in pager.protocolSpaces"
			     @click.stop.prevent="clickItem(protocolSpace)"
			     :class="{'bg-white':protocolSpace.id !== activeProtocolSpace.id,'bg-azure':protocolSpace.id === activeProtocolSpace.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{protocolSpace.id}} {{protocolSpace.name}}</span>

					<span :class="'label label-'+protocolSpace.getStatusStyle()">{{protocolSpace.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(ProtocolSpace, 5)
			}
		},
		props: {
			activeProtocolSpace: {
				type: ProtocolSpace,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(protocolSpace){
				this.activeProtocolSpace.render(protocolSpace);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
