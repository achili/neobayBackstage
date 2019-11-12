<template>
  <div class="animated fadeIn clearfix">
    <h2 class="text-center">{{this.date.format('yyyy-MM')}} {{this.meetingRoom}}</h2>
    <div class="row">
      <div class="col-xs-6 col-md-3">
        <el-date-picker v-model="date" type="month" placeholder="选择月">
        </el-date-picker>
      </div>
      <div class="col-md-7"></div>
      <div class="col-xs-6 col-md-2">
        <selection :options="this.meetingRooms" :callback="setMeetingRoomId" :activeRoom="active"></selection>
      </div>
    </div>
    <div class="row col-md-12  col-xs-12">
      <div>
        <timetable :date="date" :meetingRoom="meetingRoomId"></timetable>
      </div>
    </div>
  </div>
</template>
<script>
  import Timetable from "../TimeTable.vue"
  import Pager from  "../../../../common/model/base/Pager"
  import MeetingRoom from "../../../../common/model/meeting/MeetingRoom"

  export default {
    data() {
      return {
        date: new Date(),
        meetingRoomPager: new Pager(MeetingRoom),
        meetingRoomId: 0,
        meetingRoom: '',
        meetingRooms: [{
          name: "请选择会议室"
        }],
        active: 0
      }
    },


    components: {
      Timetable

    },

    methods: {
      setMeetingRoomId(index){
        this.meetingRoomId = this.meetingRooms[index].id;
        this.meetingRoom = this.meetingRooms[index].name;
      }
    },

    mounted(){
      let that = this;
      this.meetingRoomPager.httpPage(null,
        function (response) {
          that.meetingRooms = response.data.pager.meetingRooms;
          that.meetingRoomId = that.meetingRooms[0].id;
          that.meetingRoom = that.meetingRooms[0].name;
        },
        function (errorMessage) {
          Notification.error({
            message: errorMessage
          });
        });
    }

  }

</script>
