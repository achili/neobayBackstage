<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!meetingRoom.editMode">添加会议室</span>
          <span v-show="meetingRoom.editMode">编辑会议室</span>
        </h2>
      </div>
    </div>


    <div class="row">
      <div class="col-xs-12">
        <button v-show="!meetingRoom.editMode" class="pull-right btn btn-success f16" @click="save">
          <i class="fa fa-plus"></i>
          创建
        </button>
        <button v-show="meetingRoom.editMode" class="pull-right btn btn-primary f16" @click="save">
          <i class="fa fa-save"></i>
          保存
        </button>
      </div>
      <div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label">房间号</label>
          <input type="text" class="form-control" v-model="meetingRoom.roomNum">
        </div>

        <div class="form-group">
          <label class="control-label">楼栋号</label>
          <input type="text" class="form-control" v-model="meetingRoom.buildingNum">
        </div>

        <div class="form-group">
          <label class="control-label">可容纳人数</label>
          <input type="text" class="form-control" v-model="meetingRoom.capacity">
        </div>


        <div class="form-group">
          <label class="control-label">会议室标签</label>
          <input type="text" class="form-control" v-model="meetingRoom.tags">
        </div>

        <div class="form-group clear">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label">图片</label>

          <div>
            <NbTank :tank="meetingRoom.image"/>
          </div>

        </div>
        <div class="form-group">
          <label class="control-label">可预订时间</label>
          <div>
            <el-time-select placeholder="Start time" v-model="meetingRoom.allowedBeginTime" :picker-options="{
            start: '06:00',
            step: '00:30',
            end: '20:00'}">
            </el-time-select>
            <el-time-select placeholder="End time" v-model="meetingRoom.allowedEndTime" :picker-options="{
            start: '12:00',
            step: '00:30',
            end: '23:30'}">
            </el-time-select>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">会议室描述</label>
          <textarea class="form-control" rows="6" v-model="meetingRoom.description"
                    placeholder="此处填写会议室描述……"></textarea>
        </div>


      </div>
      <div class="col-xs-12 m-t-md">
        <div class="alert alert-danger" v-show="meetingRoom.errorMessage">
          {{meetingRoom.errorMessage}}
        </div>
        <div>
          <button v-show="!meetingRoom.editMode" class="pull-right btn btn-success f16" @click="save">
            <i class="fa fa-plus"></i>
            创建
          </button>
          <button v-show="meetingRoom.editMode" class="pull-right btn btn-primary f16" @click="save">
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
  import MeetingRoom from '../../../../common/model/meeting/MeetingRoom'


  import $ from "jquery"

  export default {

    data () {
      return {
        meetingRoom: new MeetingRoom()
      }
    },

    components: {
      NbTank
    },

    methods: {
      save(){
        let that = this;
        this.meetingRoom.httpSave(function (response) {

          Notification.success({
            message: that.meetingRoom.editMode ? '修改会议室成功！' : '添加会议室成功！'
          });
          that.$router.push("/by/meeting/room/detail/" + that.meetingRoom.id);
        });
      }
    },


    mounted(){
      let that = this;

      this.meetingRoom.id = this.$store.state.route.params.id;

      if (this.meetingRoom.id) {
        this.meetingRoom.editMode = true;
        this.meetingRoom.httpDetail(function() {
          let transfer = function (n) {
            if (n < 20){
              return '0' + (n - n % 2) / 2 + ':' + n % 2 * 3 + '0';
            } else {
              return (n - n % 2) / 2 + ':' + n % 2 * 3 + '0';
            }
          }
          that.meetingRoom.allowedBeginTime = transfer(that.meetingRoom.allowedBeginTime);
          that.meetingRoom.allowedEndTime = transfer(that.meetingRoom.allowedEndTime);
        }, null);
      }
    }
  }
</script>
