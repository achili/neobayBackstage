<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="conferenceRoom.detailLoading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!conferenceRoom.editMode">创建会议室</span>
            <span v-show="conferenceRoom.editMode">修改会议室</span>
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
                <label class="col-md-3 control-label mt5 compulsory">会议室名称</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="conferenceRoom.name">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">联系人</label>
                <div class="col-md-9">
                  <UserPagerSelection :activeUser="conferenceRoom.contacts"/>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">所属楼栋</label>
                <div class="col-md-9">
                  <SpaceSelection :activeSpaceBuilding="conferenceRoom.spaceBuilding"/>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">图片</label>
                <div class="col-md-9">
                  <NbTank :tank="conferenceRoom.poster"></NbTank>
                </div>
              </div>

              <div class="row mt10" >
                <label class="col-md-3 control-label mt5 compulsory">详细介绍</label>
                <div class="col-md-9">
                  <textarea class="form-control" rows="3" v-model="conferenceRoom.introduce"
                            placeholder="此处填写详细介绍……"></textarea>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">详细地址</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="conferenceRoom.address">
                </div>
              </div>

              <div class="row mt10"  >
                <label class="col-md-3 control-label mt5 compulsory">每小时价格</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="conferenceRoom.price">
                </div>
              </div>

              <div class="row mt10" >
                <label class="col-md-3 control-label mt5 compulsory">可容纳人数</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="conferenceRoom.capacity">
                    <option v-for="capacity in conferenceRoom.CapacityMap" :value="capacity.value">
                      {{capacity.name}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mt10" >
                <label class="col-md-3 control-label mt5 compulsory">设施及服务</label>
                <div class="col-md-9">
                  <div v-for="item in ServicesMap">
                    <nobr>
                      <NbCheckbox  v-model="conferenceRoom.services" :val="item.val" />
                      <span class="f16 "> {{item.name}} </span>
                    </nobr>
                  </div>
                </div>
              </div>

              <div class="row mt10" >
                <label class="col-md-3 control-label mt5 compulsory">绑定房间</label>
                <div class="col-md-9">
                  <RoomSelection :activeSpaceRoom="conferenceRoom.spaceRoom" :initFilter="{'types':'MEETING_ROOM'}"></RoomSelection>
                </div>
              </div>

              <div class="alert alert-danger mt20" v-show="conferenceRoom.errorMessage">
                {{conferenceRoom.errorMessage}}
              </div>
            </div>
          </NbSlidePanel>
        </div>

        <div class="col-md-12">
          <CreateSaveButton :entity="conferenceRoom" :callback="save"/>
        </div>

      </div>
    </LoadingFrame>
  </div>
</template>

<script>
  import NbTank from '../../../common/widget/NbTank'
  import {Notification} from 'element-ui';
  import UserPagerSelection from "../user/Selection.vue";
  import NbSlidePanel from "../../../common/widget/NbSlidePanel.vue";
  import LoadingFrame from "../widget/LoadingFrame";
  import CreateSaveButton from "../widget/CreateSaveButton.vue"
  import NbDateRange from "../../../common/widget/NbDateRange.vue"
  import NbEditor from "../../../common/widget/NbEditor"
  import NbCheckbox from "../../../common/widget/NbCheckbox"
  import UserProfileLink from "../../../backyard/view/widget/UserProfileLink.vue";
  import ConferenceRoom from "../../../common/model/conference/ConferenceRoom";
  import SpaceSelection from "../space/building/Selection.vue";
  import RoomSelection from "../space/room/widget/Selection.vue";

  export default {
    data () {
      return {
        conferenceRoom: new ConferenceRoom(),
        ServicesMap: ConferenceRoom.prototype.ServicesMap
      }
    },
    components: {
      NbTank,
      NbSlidePanel,
      UserPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      NbDateRange,
      NbEditor,
      UserProfileLink,
      NbCheckbox,
      SpaceSelection,
      RoomSelection
    },
    computed: {},
    methods: {
      save(){
        let that = this;
        this.conferenceRoom.httpSave(function (response) {
          Notification.success({
            message: that.conferenceRoom.editMode ? '修改会议室！' : '创建会议室成功！'
          });
          that.$router.push({ path: 'detail', query: { id: that.conferenceRoom.id } });
        });
      }
    },
    mounted(){
      let that = this;
      this.conferenceRoom.id = this.$store.state.route.query.id;
      if (this.conferenceRoom.id) {
        this.conferenceRoom.editMode = true;
        this.conferenceRoom.httpDetail();
      }
    }
  }

</script>
