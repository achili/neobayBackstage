<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeISpaceDoor" :initFilter="initFilter">

			<span slot="title">
				<span v-if="activeISpaceDoor.doorId">
					<span>你选择了 <span class="text-danger">{{activeISpaceDoor.doorName}}</span> ，点击按钮添加</span>
				</span>
				<span v-else>
					请选择一个门后点击按钮添加到列表...
				</span>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="iSpaceDoor in pager.iSpaceDoors" :key="iSpaceDoor.doorId"
			     @click.stop.prevent="clickItem(iSpaceDoor)"
           :class="{'bg-white':iSpaceDoor.doorId !== activeISpaceDoor.doorId,
           'bg-azure':iSpaceDoor.doorId === activeISpaceDoor.doorId}"
			     slot="cells">
				<div>
					<div class="media">
						<div class="media-body">
							<div>
								<span class="black hover-underline cursor">
									{{iSpaceDoor.doorName}}
								</span>
							</div>
							<div>
								<div class="mt5">地址：{{iSpaceDoor.doorAddress}}</div>
                <div class="mt5">
                  绑定房间：
                  <span v-if="iSpaceDoor.spaceRoom && iSpaceDoor.spaceRoom.id"
                        @click.stop.prevent="$router.push('/by/space/room/detail/' + iSpaceDoor.spaceRoom.id)">
                    {{iSpaceDoor.spaceRoom.name}}
                  </span>
                  <span v-else>暂未绑定任何房间</span>
                </div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../../../common/model/base/Pager";
	import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";
  import ISpaceDoor from "../../../../../common/model/ispace/door/ISpaceDoor";

	export default{
		data(){
			return {
				pager: new Pager(ISpaceDoor, 10)
			}
		},
		props: {
      activeISpaceDoor: {
				type: ISpaceDoor,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(iSpaceDoor){
				this.activeISpaceDoor.render(iSpaceDoor);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>
