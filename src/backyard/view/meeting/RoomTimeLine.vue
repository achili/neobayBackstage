<template>
  <div>
    <button class="btn btn-success" @click.stop.prevent="dialogVisible = true">预订情况</button>
    <el-dialog title="预订情况" v-model="dialogVisible" size="small">
      <h3 class="text-center mb20">
        <span @click.stop.prevent="subWeek"> <i class="fa fa-chevron-left "></i></span>
        {{year}}年  第{{week}}周
        <span @click.stop.prevent="addWeek"> <i class="fa fa-chevron-right "></i></span>
      </h3>

      <div >
        <Timeline :instruction="1" :screenings="screenings[0]" :month="month[0]" :date="date[0]" :callback="callback"></Timeline>
        <Timeline v-for="n in 7"  :key="n" :instruction="0" :screenings="screenings[n-1]" :month="month[n-1]" :date="date[n-1]" :callback="callback"></Timeline>
      </div>
      <div>
        <span class="pull-right">选中时间：{{this.orderDate}}  {{this.orderTime}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-default" @click.stop.prevent="dialogVisible = false">取 消</button>
        <button class="btn btn-success" @click.stop.prevent="order">预 订</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Timeline from "./TimeLine.vue"
  import NbPager from '../../../common/widget/NbPager.vue'
  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import {MessageBox, Notification} from 'element-ui'
  import Pager from  "../../../common/model/base/Pager"
  import MeetingRecord from "../../../common/model/meeting/MeetingRecord"

  export default {
    data() {
      return {
        today: new Date(),
        pager: new Pager(MeetingRecord),
        year: 0,
        month: [0,0,0,0,0,0,0],
        week: 0,
        date: [0,0,0,0,0,0,0],
        time: [0,0,0,0,0,0,0],
        screenings: [[],[],[],[],[],[],[]],
        dialogVisible: false,
        orderDate: "",
        orderTime: ""
      }
    },

    components: {
      NbFilter,
      NbPager,
      Timeline
    },

    props: {
      meetingRoom: {
        type: Object,
        required: true
      }
    },

    computed: {
      pagerRecord() {
        return this.pager.meetingRecords;
      }
    },

    watch: {
      pagerRecord: function (oldValue, newValue) {
        this.assign();
      }
    },

    methods: {
      getWeek(){
        let d = new Date(this.today);
        d.setHours(0,0,0,0);
        d.setDate(d.getDate() - (d.getDay() || 7) + 1);
        let JanFourth = new Date(this.today.getFullYear() + ',1,4');
        JanFourth.setDate(JanFourth.getDate() - (JanFourth.getDay() || 7) + 1);
        this.week = (d.getTime() - JanFourth.getTime()) / (7 * 24 * 3600 * 1000) + 1;
        this.year = d.getFullYear();
        for (let i = 0; i < 7; i++){
          this.month[i] = d.getMonth() + 1;
          this.date[i] = d.getDate();
          d.setDate(d.getDate() + 1);
        }
      },

      addWeek(){
        this.today.setDate(this.today.getDate() + 7);
        this.refresh();
      },

      subWeek(){
        this.today.setDate(this.today.getDate() - 7);
        this.refresh();
      },

      callback(n, date, month){
        this.orderTime = (n + n % 2) / 2 + 7 + ":" + (n + 1) % 2 * 3 + '0';
        this.orderDate = month + "." + date;
      },


      order(){
        this.dialogVisible = false;
        this.$router.push("/by/meeting/record/create?meetingRoomId=" + this.meetingRoom.id);
//        this.$router.push("/by/meeting/record/create?orderDate=" + this.orderDate + "&orderTime=" + this.orderTime);
      },

      assign(){
        if (this.pager.meetingRecords !== null) {
          for (let record of this.pager.meetingRecords){
            let date = new Date(record.date);
            let loc = date.getDate() - this.date[0];
            if (this.screenings[loc] === undefined){
              this.screenings[loc] = [record];
            } else {
              (this.screenings[loc]).push(record);
            }
          }
        }
      },

      refresh() {
        this.getWeek();
        this.pager.setFilter('week', this.week);
        this.pager.setFilter('year', this.year);
        this.pager.setFilter('meetingRoomId', this.meetingRoom.id);
        this.pager.httpFastPage();
        this.screenings = [[],[],[],[],[],[],[]];
      }
    },

    mounted() {
      this.pager.enableHistory();
      this.refresh();
    }
  }



</script>

