<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<h2><i class="fa fa-fire text-success"></i><span>房间列表</span></h2>
			</div>
			<div class="col-md-12">
				<div class="pull-right mb10">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/space/room/create')">
						<i class="fa fa-plus"></i>
						<span>创建房间</span>
					</button>
				</div>
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

            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push('/by/space/room/edit/'+spaceRoom.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="spaceRoom.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{spaceRoom.name}}</span>
                <span :class="'label label-'+spaceRoom.getTypeStyle()">{{spaceRoom.getTypeName()}}</span>
                <span :class="'label label-'+spaceRoom.getStatusStyle()">{{spaceRoom.getStatusName()}}</span>
              </div>

              <div class="cell-content list-text-restriction">{{spaceRoom.description}}</div>
              <div class="cell-content">
                <span class="mr10">面积:{{spaceRoom.area}}</span>
                <span class="mr10"
                      @click.stop.prevent="$router.push('/by/space/building/detail/'+spaceRoom.spaceBuilding.id)">
              所属大楼:<a>{{spaceRoom.spaceBuilding.name}}</a></span>
              </div>
              <div class="mt10">
                地址：{{spaceRoom.address}}
                <span>园区地点：{{spaceRoom.spaceRegional.name}}</span>
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
      this.pager.enableHistory()
			this.refresh();
		}
	}

</script>

























