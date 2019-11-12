<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<h2><i class="fa fa-fire text-success"></i><span>房间分配</span></h2>
			</div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-md-12">
        <div v-for="spaceRoom in pager.spaceRooms" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push('/by/space/room/detail/'+spaceRoom.id)">
          <div class="media">
            <div class="media-body">
              <div class="cell-title">
                <span>{{spaceRoom.name}}</span>
                <span :class="'label label-'+spaceRoom.getTypeStyle()">{{spaceRoom.getTypeName()}}</span>
                <span :class="'label label-'+spaceRoom.getStatusStyle()">{{spaceRoom.getStatusName()}}</span>
              </div>

              <div class="cell-content list-text-restriction">{{spaceRoom.description}}</div>
              <div class="mr10">分配项目：{{spaceRoom.project.name}}
                <span class="mr10" v-if="!spaceRoom.project.name"><span class="text-danger">未分配！</span></span>
                <span>园区地点：{{spaceRoom.spaceRegional.name}}</span>
              </div>
              <div class="cell-content list-text-restriction">
                <span class="mr10" v-if="spaceRoom.remark">备注：{{spaceRoom.remark}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-md-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>


    </div>
	</div>
</template>

<script>
	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../../common/model/base/Pager"
	import SpaceRoom from  "../../../../common/model/space/SpaceRoom"

	export default{
		data(){
			return {
				pager: new Pager(SpaceRoom)
			}
		},
		components: {
			NbFilter,
			NbPager
		},
		computed: {},
		watch: {},
		methods: {
			search() {
				this.pager.page = 0;
				this.refresh();
			},
			refresh() {
				this.pager.httpFastPage();
			}
		},
		mounted(){
      this.pager.enableHistory();
			this.refresh();
		}
	}

</script>

























