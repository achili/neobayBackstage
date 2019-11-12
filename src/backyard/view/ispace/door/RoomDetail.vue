<template>
  <div class="animated fadeIn">
    <div class="row mb10">
      <div class="col-md-12 clearfix">
        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>门禁管理/绑定的房间</span>
        </div>
      </div>
    </div>
    <LoadingFrame :loading="doorDetail.detailLoading">
      <div class="row">
        <div class="col-xs-12">
          <NbSlidePanel>
            <span slot="heading" class="text-success f16">
                <i class="fa fa-leaf"></i>
                绑定的房间信息
            </span>
            <div slot="body">
              <div class="row mt10">
                <div class="col-xs-4">门名称：</div>
                <div class="col-xs-8">{{doorDetail.doorName}}</div>
              </div>
              <div class="row mt10">
                <div class="col-xs-4">门地址：</div>
                <div class="col-xs-8">{{doorDetail.doorAddress}}</div>
              </div>
              <!--<div class="row mt10">
                <div class="col-xs-4">设备列表：</div>
                <div class="col-xs-8">
                  {{doorDetail.deviceList}}
                </div>
              </div>-->
              <div class="row mt10" v-if="doorDetail.spaceRoom && doorDetail.spaceRoom.id">
                <div class="col-xs-4">绑订的房间：</div>
                <div class="col-xs-8 text-info cursor"
                     @click="$router.push('/by/space/room/detail/' + doorDetail.spaceRoom.id)">
                  {{doorDetail.spaceRoom.name}}
                </div>
              </div>
              <div class="row mt10" v-else-if="doorDetail.conferenceRoom && doorDetail.conferenceRoom.id">
                <div class="col-xs-4">绑订的会议室：</div>
                <div class="col-xs-8 text-info cursor"
                     @click="$router.push('/by/conference/room/detail?id=' + doorDetail.conferenceRoom.id)">
                  {{doorDetail.conferenceRoom.name}}
                </div>
              </div>
              <div class="row mt10" v-else>
                <div class="col-xs-4">绑订的房间：</div>
                <div class="col-xs-8 text-danger">
                  暂未绑定有房间或会议室
                </div>
              </div>
            </div>
          </NbSlidePanel>
        </div>
      </div>
    </LoadingFrame>
  </div>
</template>
<script>
  import IspaceDoor from "../../../../common/model/ispace/door/ISpaceDoor";
  import LoadingFrame from "../../widget/LoadingFrame";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel'
  import UserProfileLink from "../../../../backyard/view/widget/UserProfileLink.vue";

  export default {
    data() {
      return {
        doorDetail: new IspaceDoor()
      }
    },
    watch: {},
    methods: {
      isNoBound() {
        return (!this.doorDetail.conferenceRoom || !this.doorDetail.conferenceRoom.id) && (!this.doorDetail.spaceRoom || !this.doorDetail.spaceRoom.id);
      }
    },
    components: {
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink
    },
    mounted() {
      /*this.doorDetail.doorId = this.$store.state.route.params.doorId;*/
      this.doorDetail.doorId = this.$store.state.route.query.doorId;
      if (this.doorDetail.doorId) {
        this.doorDetail.httpDetail();
      }
    }
  }
</script>
