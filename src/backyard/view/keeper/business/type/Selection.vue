<template>
	<div>

		<NbPagerSelection  ref="refFresh" :pager="pager" :activeItem="activeKeeperBusinessType" :initFilter="initFilter">

			<span slot="title">
				{{activeKeeperBusinessType.id?"#"+activeKeeperBusinessType.id+" "+activeKeeperBusinessType.name:"请选择服务类型..."}}
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="keeperBusinessType in pager.keeperBusinessTypes"
			     @click.stop.prevent="clickItem(keeperBusinessType)"
			     :class="{'bg-white':keeperBusinessType.id !== activeKeeperBusinessType.id,'bg-azure':keeperBusinessType.id === activeKeeperBusinessType.id}"
			     slot="cells">

				<div class="media">

					<div class="media-body">
						<div>
							<span class="mr10">#{{keeperBusinessType.id}}</span>
							<span class="f15">{{keeperBusinessType.name}}</span>
						</div>
						<small class="block m-t-xs m-b-xs text-muted">{{keeperBusinessType.description}}</small>

						<span class="mr10">创建于:{{keeperBusinessType.createTime | simpleDate}}</span>
					</div>
				</div>

			</div>

		</NbPagerSelection>
	</div>

</template>
<script>
	import Pager from "../../../../../common/model/base/Pager";
	import KeeperBusinessType from "../../../../../common/model/keeper/business/KeeperBusinessType";
	import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(KeeperBusinessType, 5)

			}
		},
		props: {
			activeKeeperBusinessType: {
				type: KeeperBusinessType,
				required: true
			},
      initFilter: {
        type: Object,
        required: false
      }
		},
		watch: {},
    computed: {
      refFresh() {
        return this.$refs["refFresh"];
      }
    },
		methods: {
			clickItem(keeperBusinessType){
				this.activeKeeperBusinessType.render(keeperBusinessType);
			},
      refresh() {
        this.refFresh.refresh();
      }
		},
		components: {
			NbPagerSelection
		},
		mounted(){
      //隐藏筛选
      this.pager.showFilter("type", false);
		}
	}

</script>
