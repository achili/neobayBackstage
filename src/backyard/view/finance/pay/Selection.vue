<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeFinancePayInfo" :initFilter="initFilter">

			<span slot="title">
				{{activeFinancePayInfo.name&&activeFinancePayInfo.id?"#"+activeFinancePayInfo.id+" "+activeFinancePayInfo.name:"请选择一个付款信息单..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="financePayInfo in pager.financePayInfos"
			     @click.stop.prevent="clickItem(financePayInfo)"
			     :class="{'bg-white':financePayInfo.id !== activeFinancePayInfo.id,'bg-azure':financePayInfo.id === activeFinancePayInfo.id}"
			     slot="cells">
				<div>
					<span class="f15">#{{financePayInfo.id}} {{financePayInfo.name}}</span>

					<span :class="'label label-'+financePayInfo.getStatusStyle()">{{financePayInfo.getStatusName()}}</span>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(FinancePayInfo, 5)
			}
		},
		props: {
			activeFinancePayInfo: {
				type: FinancePayInfo,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(financePayInfo){
				this.activeFinancePayInfo.render(financePayInfo);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
