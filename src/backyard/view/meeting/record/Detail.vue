<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12 text-right">
        <a title="编辑" class="btn btn-success" @click.stop.prevent="$router.push('/by/meeting/record/edit/'+ meetingRecord.id)">
          <i class="fa fa-pencil"></i>
          编辑
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h2 class="text-center">{{meetingRecord.meetingRoom.name}}  {{meetingRecord.date}}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 mt30">
        <span>预订团队：</span><span>{{meetingRecord.teamName}}</span>
      </div>
      <div class="col-xs-12 mt30">
        <span>申请人：</span><span>{{meetingRecord.memberName}}</span>
      </div>
      <div class="col-xs-12 mt30">
        <span>联系方式：</span><span>{{meetingRecord.phone}}</span>
      </div>
      <div class="col-xs-12 mt30">
        <span>邮件地址：</span><span>{{meetingRecord.mail}}</span>
      </div>
      <div class="col-xs-12 mt30">
        <span>会议室：</span><span>{{meetingRecord.meetingRoom.name}}</span>
      </div>
      <div class="col-xs-12 mt30">
        <span>预订时间：</span><span>{{(meetingRecord.beginTime - meetingRecord.beginTime % 2)/ 2 }}:{{meetingRecord.beginTime % 2 * 3}}0</span><span>--</span><span>{{(meetingRecord.endTime - meetingRecord.endTime % 2)/ 2}}:{{meetingRecord.endTime % 2 * 3}}0</span>
      </div>

      <div class="col-xs-12 text-center" v-show="meetingRecord.loading">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>

    </div>
  </div>

</template>
<script>
  import {Notification} from 'element-ui';
  import MeetingRecord from '../../../../common/model/meeting/MeetingRecord'

  export default {

    data () {
      return {
        meetingRecord: new MeetingRecord()
      }
    },

    mounted(){
      this.meetingRecord.id = this.$store.state.route.params.id;
      if (this.meetingRecord.id) {
        this.meetingRecord.httpDetail();
      }
    }
  }
</script>
