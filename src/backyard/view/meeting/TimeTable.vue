<template>
  <div ref="timetable"  >
    <div class="meetinGrrecorDtablE" >
      <div class="meetinGrecorDweeK ">Mon</div>
      <div class="meetinGrecorDweeK">Tue</div>
      <div class="meetinGrecorDweeK">Wed</div>
      <div class="meetinGrecorDweeK">Thu</div>
      <div class="meetinGrecorDweeK">Fri</div>
      <div class="meetinGrecorDweeK">Sat</div>
      <div class="meetinGrecorDweeK">Sun</div>
      <div class="meetinGrecorDiteM" style="background-color: #ffffff" v-for="m in 42"></div>
    </div>
  </div>

</template>

<script>
  import $ from "jquery"
  import TimeTable from "./TimeTable"
  import Pager from  "../../../common/model/base/Pager"
  import Filter from "../../../common/model/base/Filter";
  import MeetingRecord from  "../../../common/model/meeting/MeetingRecord"

  TimeTable($);

  export default {

    data() {
      return {
        pager: new Pager(MeetingRecord)
      }
    },

    props: {
      date: {
        type: Date,
        required: true
      },
      meetingRoom:{
        type: Number,
        required: true
      }
    },

    computed: {
      $timetable(){
        return $(this.$refs.timetable);
      }
    },

    watch: {
      date: function (newValue, oldValue) {
        this.fresh();
      },
      meetingRoom: function (newValue, oldValue) {
        this.fresh();
      }
    },

    methods: {
      callback(n){
        this.$router.push('/by/meeting/record/detail/' + n);
      },

      fresh(){
        this.pager.setFilter('month', this.date.getMonth());
        this.pager.setFilter('year', this.date.getFullYear());
        this.pager.setFilter('meetingRoomId', this.meetingRoom);

        this.pager.httpFastPage(this.refresh);
      },
      refresh(){
        this.$timetable.timetable(this.date,this.pager.meetingRecords,this.callback);
      }
    },

    mounted() {
      this.pager.enableHistory();
    }

  }

</script>
<style>
  .meetinGrecorDiteM{
    width: 14.05%;
    height: 150px;
    padding: 0;
    margin-left: 0.1%;
    margin-right: 0.1%;
    margin-bottom: 1px;
    margin-top: 1px;
    border-width: 0;
    float: left;
  }
  .meetinGrecorDweeK{
    background-color: #f3f3f4;
    text-align: right;
    height: 20px;
    width: 14.05%;
    padding: 0;
    margin-left: 0.1%;
    margin-right: 0.1%;
    margin-bottom: 1px;
    margin-top: 1px;
    border-width: 0;
    float: left;
  }
  .meetinGrrecorDtablE{
    margin: 1px;
    background-color: #edf0f0;
    width: 100%;
  }
  .meetinGrecorDiteMtexT{
    background-color: #a5e5ff;
    margin: 1px;
  }
  .meetinGrecorDiteMtexTreviewinG{
    background-color: #ffd4e7;
    margin: 1px;
  }
</style>
