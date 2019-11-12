<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12 text-right">
        <a title="编辑" class="btn btn-success" @click.stop.prevent="$router.push('/by/meeting/room/edit/'+meetingRoom.id)">
          <i class="fa fa-pencil"></i>
          编辑
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">零号湾{{meetingRoom.buildingNum}}号楼</h2>
        <h2 class="text-center">{{meetingRoom.roomNum}}会议室</h2>
      </div>
    </div>

    <div class="row">
      <div class="media">
        <div>
          <img class="img-rounded center-block" style="width: 95%; height: 30%" v-if="meetingRoom.image && meetingRoom.image.url" :src="meetingRoom.image.url">
        </div>
      </div>

      <div class="col-xs-12 mt30">
        <span>可容纳人数：</span><span>{{meetingRoom.capacity}}</span>
      </div>

      <div class="col-xs-12 mt5">
        <span>开放时间：</span><span>{{meetingRoom.allowedBeginTime / 2}}:{{meetingRoom.allowedBeginTime % 2 * 3}}0</span><span>--</span><span>{{meetingRoom.allowedEndTime / 2}}:{{meetingRoom.allowedEndTime % 2 * 3}}0</span>
      </div>

      <div class="col-xs-12 mt30">
        <span>会议室描述：</span><span>{{meetingRoom.description}}</span>
      </div>

      <div class="col-xs-12 text-center" v-show="meetingRoom.loading">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>

      <div class="col-xs-12" v-if="meetingRoom.tags">
        标签：<span >{{meetingRoom.tags}}</span>
      </div>

    </div>


  </div>

</template>
<script>
  import {Notification} from 'element-ui';
  import MeetingRoom from '../../../../common/model/meeting/MeetingRoom'

  export default {

    data () {
      return {
        meetingRoom: new MeetingRoom()
      }
    },

    mounted(){
      let that = this;
      this.meetingRoom.id = this.$store.state.route.params.id;
      if (this.meetingRoom.id) {
        this.meetingRoom.httpDetail();
      }
    }
  }
</script>
