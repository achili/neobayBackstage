<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="spaceBuilding.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push('/by/space/building/edit/' + spaceBuilding.id)">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-default">
                  <i class="fa fa-building-o"></i>
                  楼栋详情
                </span>
                <div slot="body">

                  <div class="row">
                    <div class="col-md-4">大楼名称：</div>
                    <div class="col-md-8 f18 bold">{{spaceBuilding.name}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-4">园区地点：</div>
                    <div class="col-md-8 bold">
                      {{spaceBuilding.spaceRegional.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-4">楼栋编号：</div>
                    <div class="col-md-8 bold">
                      {{spaceBuilding.no}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-4">楼层数量：</div>
                    <div class="col-md-8 bold">
                      {{spaceBuilding.floorNum}}
                    </div>
                  </div>


                  <div class="row mt10">
                    <div class="col-md-4">房间总数：</div>
                    <div class="col-md-8 bold">
                      {{spaceBuilding.capacity}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-4">使用中房间数量：</div>
                    <div class="col-md-8 bold">
                      {{spaceBuilding.roomNum}}
                    </div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-4">房产证编号：</div>
                    <div class="col-md-8 bold">{{spaceBuilding.propertyNo}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-4">地址：</div>
                    <div class="col-md-8 bold">
                      {{spaceBuilding.address}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-4">备注：</div>
                    <div class="col-md-8">
                      {{spaceBuilding.description}}
                    </div>
                  </div>


                </div>
              </NbSlidePanel>
            </div>

            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-default">
                  <i class="fa fa-list"></i>
                  房间列表
                </span>
                <div class="row" slot="body">

                  <div class="col-md-12">
                    <div v-for="spaceRoom in roomPager.spaceRooms" class="bg-white p10 mt10 cursor br4 border"
                         @click.stop.prevent="$router.push('/by/space/room/detail/'+spaceRoom.id)">
                      <div class="media">

                        <div class="media-body">
                          <div>
                            <span class="f15">{{spaceRoom.name}}</span>
                            <span :class="'label label-'+spaceRoom.getTypeStyle()">{{spaceRoom.getTypeName()}}</span>
                          </div>
                          <small class="block m-t-xs m-b-xs text-muted">{{spaceRoom.description}}</small>
                          <span class="mr10">#{{spaceRoom.id}}</span>
                          <span class="mr10">面积:{{spaceRoom.area}}</span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-12 mt20">
                    <NbPager :pager="roomPager" :callback="refresh"></NbPager>
                  </div>


                </div>
              </NbSlidePanel>

            </div>

          </div>

        </LoadingFrame>
      </div>
      <div class="col-md-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>

  </div>
</template>

<script>
	import {Notification} from 'element-ui';
	import SpaceBuilding from  "../../../../common/model/space/SpaceBuilding"
	import SpaceRoom from  "../../../../common/model/space/SpaceRoom"
	import Pager from  "../../../../common/model/base/Pager"
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
  import LoadingFrame from "../../widget/LoadingFrame";

	export default{
		data(){
			return {
				spaceBuilding: new SpaceBuilding(),
				roomPager: new Pager(SpaceRoom)
			}
		},
		components: {
			NbSlidePanel,
			NbPager,
      LoadingFrame
		},
		methods: {
			refresh() {
				this.roomPager.httpFastPage();
			},
			fetchDetail(){
				let that = this;
				this.spaceBuilding.id = this.$store.state.route.params.id;
				if (this.spaceBuilding.id) {
					this.spaceBuilding.httpDetail();
				}


				this.roomPager.setFilter("spaceBuildingId", this.spaceBuilding.id);
				this.roomPager.httpFastPage();


			}
		},
		mounted(){
			this.fetchDetail();
		}
	}


</script>











