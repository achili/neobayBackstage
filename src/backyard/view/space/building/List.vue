<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<h2>
					<i class="fa fa-fire text-success"></i><span>楼栋列表</span>
				</h2>
				<div class="pull-right mb10">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/space/building/create')">
						<i class="fa fa-plus"></i>
						<span>创建楼栋</span>
					</button>
				</div>
			</div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-md-12">
        <div v-for="spaceBuilding in pager.spaceBuildings" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push('/by/space/building/detail/'+spaceBuilding.id)">
          <div class="media">

            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push('/by/space/building/edit/'+spaceBuilding.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="spaceBuilding.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{spaceBuilding.name}}</span>
              </div>
              <div class="cell-description list-text-restriction">
                {{spaceBuilding.description}}
              </div>
              <div class="cell-content">
                <span class="mr10">容量:{{spaceBuilding.capacity}}</span>
                <span class="mr10">楼号:{{spaceBuilding.no}}</span>
                <span class="mr10">房间数:{{spaceBuilding.roomNum}}</span>
                <span class="mr10">楼层数:{{spaceBuilding.floorNum}}</span>
              </div>
              <div class="cell-content">
                地址：{{spaceBuilding.address}}
                <span>园区地点：{{spaceBuilding.spaceRegional.name}}</span>
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
	import SpaceBuilding from  "../../../../common/model/space/SpaceBuilding"

	export default{
		data(){
			return {
				pager: new Pager(SpaceBuilding)
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
			this.refresh();
		}
	}


</script>

