<template>
    <div>

        <NbPagerSelection :pager="pager" :activeItem="activeSpaceBuilding">

			<span slot="title">
				{{activeSpaceBuilding.name&&activeSpaceBuilding.id?"#"+activeSpaceBuilding.id+" "+activeSpaceBuilding.name:"请选择所属大楼..."}}
			</span>

            <div class="mb10 p10 cursor br4 border" v-for="spaceBuilding in pager.spaceBuildings"
                 @click.stop.prevent="clickItem(spaceBuilding)"
                 :class="{'bg-white':spaceBuilding.id !== activeSpaceBuilding.id,'bg-azure':spaceBuilding.id === activeSpaceBuilding.id}"
                 slot="cells">

                <div class="media">

                    <div class="media-body">
                        <div>
                            <span class="mr10">#{{spaceBuilding.no}}</span>
                            <span class="f15">{{spaceBuilding.name}}</span>
                        </div>
                        <small class="block m-t-xs m-b-xs text-muted">{{spaceBuilding.description}}</small>
                    </div>
                </div>

            </div>

        </NbPagerSelection>
    </div>

</template>
<script>
	import Pager from "../../../../common/model/base/Pager";
	import SpaceBuilding from "../../../../common/model/space/SpaceBuilding";
	import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(SpaceBuilding, 5)

			}
		},
		props: {
			activeSpaceBuilding: {
				type: SpaceBuilding,
				required: true
			}
		},
		watch: {},
		methods: {
			clickItem(spaceBuilding){
				this.activeSpaceBuilding.render(spaceBuilding);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){

		}
	}

</script>
