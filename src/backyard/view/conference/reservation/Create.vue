<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="conferenceRoomReservation.detailLoading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!conferenceRoomReservation.editMode">创建会议室预定</span>
            <span v-show="conferenceRoomReservation.editMode">修改会议室预定</span>
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 m-t-md">
          <NbSlidePanel>
					<span slot="heading" class="text-success f16">
						<i class="fa fa-leaf"></i>
						基本信息
					</span>
            <div slot="body">
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">会议室</label>
                <div class="col-md-9">
                  <ConferenceRoomSelection :activeConferenceRoom="conferenceRoomReservation.conferenceRoom"/>
                </div>
              </div>

              <div class="row mt10" >
                <label class="col-md-3 control-label mt5 compulsory">预定时间</label>
                <div class="col-md-9">
                  <el-date-picker
                    v-model="conferenceRoomReservation.startTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                  <el-date-picker
                    v-model="conferenceRoomReservation.endTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">会议室价格</label>
                <div class="col-md-9">
                  <input type="text" disabled class="form-control" v-model="conferenceRoomReservation.price">
                </div>
              </div>

              <div class="row mt10"  >
                <label class="col-md-3 control-label mt5 compulsory">会议室地点</label>
                <div class="col-md-9">
                  <input type="text" disabled class="form-control" v-model="conferenceRoomReservation.location">
                </div>
              </div>

              <div class="row mt10" >
                <label class="col-md-3 control-label mt5 ">要求备注</label>
                <div class="col-md-9">
                  <textarea class="form-control" rows="3" v-model="conferenceRoomReservation.remarks"
                            placeholder="此处填写备注……"></textarea>
                </div>
              </div>

              <div class="alert alert-danger mt20" v-show="conferenceRoomReservation.errorMessage">
                {{conferenceRoomReservation.errorMessage}}
              </div>
            </div>
          </NbSlidePanel>
        </div>

        <div class="col-md-12">
          <CreateSaveButton :entity="conferenceRoomReservation" :callback="save"/>
        </div>

      </div>
    </LoadingFrame>
  </div>
</template>

<script>

  import {Notification} from 'element-ui';
  import UserPagerSelection from "../../user/Selection.vue";
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import NbDateRange from  "../../../../common/widget/NbDateRange.vue"
  import NbEditor from "../../../../common/widget/NbEditor"
  import NbCheckbox from "../../../../common/widget/NbCheckbox"
  import UserProfileLink from "../../../../backyard/view/widget/UserProfileLink.vue";
  import ConferenceRoomReservation from "../../../../common/model/conference/ConferenceRoomReservation";
  import ConferenceRoomSelection from "../../../view/conference/Selection"


  export default {
    data () {
      return {
        conferenceRoomReservation: new ConferenceRoomReservation(),
        dateValue: null
      }
    },
    components: {
      NbSlidePanel,
      UserPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      NbDateRange,
      NbEditor,
      UserProfileLink,
      NbCheckbox,
      ConferenceRoomSelection
    },
    computed: {},
    watch: {
      "conferenceRoomReservation.conferenceRoom.id"(newVal, oldVal){
        this.conferenceRoomReservation.price = this.conferenceRoomReservation.conferenceRoom.price;
        this.conferenceRoomReservation.location = this.conferenceRoomReservation.conferenceRoom.address;
      }
    },
    methods: {
      save(){
        let that = this;
        this.conferenceRoomReservation.httpSave(function (response) {
          Notification.success({
            message: that.conferenceRoomReservation.editMode ? '修改会议室预定成功！' : '创建会议室预订成功！'
          });
          that.$router.push({ path: 'detail', query: { id: that.conferenceRoomReservation.id } });
        });
      }
    },
    mounted(){
      let that = this;
      this.conferenceRoomReservation.id = this.$store.state.route.query.id;
      if (this.$store.state.route.query.roomId) {
        this.conferenceRoomReservation.conferenceRoom.id = this.$store.state.route.query.roomId;
        this.conferenceRoomReservation.conferenceRoom.httpDetail();
      }
      if (this.conferenceRoomReservation.id) {
        this.conferenceRoomReservation.editMode = true;
        this.conferenceRoomReservation.httpDetail();
      }
    }
  }

</script>
