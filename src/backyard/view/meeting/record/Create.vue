<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!meetingRecord.editMode">预订会议室</span>
          <span v-show="meetingRecord.editMode">编辑会议室预订记录</span>
        </h2>
      </div>
    </div>


    <div class="row">
      <div class="col-xs-12">
        <button v-show="!meetingRecord.editMode" class="pull-right btn btn-success f16" @click="save">
          <i class="fa fa-plus"></i>
          创建
        </button>
        <button v-show="meetingRecord.editMode" class="pull-right btn btn-primary f16" @click="save">
          <i class="fa fa-save"></i>
          保存
        </button>
      </div>
      <div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label">团队名称</label>
          <input type="text" class="form-control" v-model="meetingRecord.teamName">
        </div>

        <div class="form-group">
          <label class="control-label">申请人</label>
          <input type="text" class="form-control" v-model="meetingRecord.memberName">
        </div>

        <div class="form-group">
          <label class="control-label">联系电话</label>
          <input type="text" class="form-control" v-model="meetingRecord.phone">
        </div>

        <div class="form-group">
          <label class="control-label">邮件地址</label>
          <input type="text" class="form-control" v-model="meetingRecord.mail">
        </div>

        <div class="form-group">
          <label class="control-label">会议室</label>
          <div>
            <selection :activeRoom="active" :options="this.meetingRooms" :callback="setMeetingRoomId"></selection>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">预订时间</label>
          <div>
            <el-time-select placeholder="Start time" v-model="meetingRecord.beginTime" :picker-options="{
            start: '08:00',
            step: '00:30',
            end: '23:00'}">
            </el-time-select>
            <span>--</span>
            <el-time-select placeholder="End time" v-model="meetingRecord.endTime" :picker-options="{
            start: '08:30',
            step: '00:30',
            end: '23:30'
            }">
            </el-time-select>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">预订日期</label>
          <div>
            <el-date-picker
              v-model="meetingRecord.date"
              type="date"
              placeholder="选择日期时间"
              :picker-options="{disabledDate(time) {
              return ((time.getTime() < Date.now() - 8.64e7) || (time.getTime() > Date.now() + 30 * 24 * 3600 * 1000));
              }}"
            >
            </el-date-picker>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">使用说明</label>
          <textarea type="text" class="form-control" rows="3" v-model="meetingRecord.description"></textarea>
        </div>


      </div>
      <div class="col-xs-12 m-t-md">
        <div class="alert alert-danger" v-show="meetingRecord.errorMessage">
          {{meetingRecord.errorMessage}}
        </div>
        <div>
          <button v-show="!meetingRecord.editMode" class="pull-right btn btn-success f16" @click="save">
            <i class="fa fa-plus"></i>
            创建
          </button>
          <button v-show="meetingRecord.editMode" class="pull-right btn btn-primary f16" @click="save">
            <i class="fa fa-save"></i>
            保存
          </button>

        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import NbTank from '../../../../common/widget/NbTank'
  import {simpleDateTime, str2Date} from '../../../../common/filter/time'
  import {Notification} from 'element-ui'
  import MeetingRecord from "../../../../common/model/meeting/MeetingRecord"
  import MeetingRoom from "../../../../common/model/meeting/MeetingRoom"
  import $ from "jquery"
  import Pager from '../../../../common/model/base/Pager'

  export default {

    data () {
      return {
        meetingRecord: new MeetingRecord(),
        meetingRoomPager: new Pager(MeetingRoom),
        meetingRooms: [{
          name: "请选择会议室"
        }],
        active: 0
      }
    },

    components: {
      NbTank
    },

    methods: {
      save(){
        let that = this;
        if (that.meetingRecord.editMode){
          that.meetingRecord.date = new Date(that.meetingRecord.date);
        }
        this.meetingRecord.httpSave(function (response) {

          Notification.success({
            message: that.meetingRecord.editMode ? '修改会议室预订记录成功！' : '创建会议室预订记录成功！'
          });
          that.$router.push("/by/meeting/record/detail/" + that.meetingRecord.id);

        });
      },
      setMeetingRoomId(index){
        this.meetingRecord.meetingRoomId = this.meetingRooms[index].id;
      }
    },

    mounted(){
//
      let that = this;

      this.meetingRecord.id = this.$store.state.route.params.id;

      this.meetingRoomPager.httpPage(null,
        function (response) {
          that.meetingRooms = response.data.pager.meetingRooms;
          that.meetingRecord.meetingRoomId = that.meetingRooms[0].id;
          if (that.$store.state.route.query.meetingRoomId !== undefined){
            that.meetingRecord.meetingRoomId = that.$store.state.route.query.meetingRoomId;
            for(let i = 0; i < that.meetingRooms.length; i++){
              if((that.meetingRooms[i]).id - that.$store.state.route.query.meetingRoomId === 0){

                that.active = i;
              }
            }
          }
        },
        function (errorMessage) {
          Notification.error({
            message: errorMessage
          });
        });

      if (this.meetingRecord.id) {
        this.meetingRecord.editMode = true;
        this.meetingRecord.httpDetail(function() {
            let transfer = function (n) {
              if (n < 20){
                return '0' + (n - n % 2) / 2 + ':' + n % 2 * 3 + '0';
              } else {
                return (n - n % 2) / 2 + ':' + n % 2 * 3 + '0';
              }
            }
            that.meetingRecord.beginTime = transfer(that.meetingRecord.beginTime);
            that.meetingRecord.endTime = transfer(that.meetingRecord.endTime);
        }, null);
      }

//      if (this.$store.state.route.query.orderDate !== undefined){
//        this.meetingRecord.date = this.$store.state.route.query.orderDate.toString();
//        this.meetingRecord.beginTime = this.$store.state.route.query.orderTime + 15;
//        this.meetingRecord.endTime = this.$store.state.route.query.orderTime + 16;
//      }
    }
  }
</script>
