<template>
  <div class="animated fadeIn">
    <div class="row mb10">
      <div class="col-md-12">
        <div class="pull-left f24">
          <i class="fa fa-home" aria-hidden="true"></i>
          <span>权限赋予</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <NbSlidePanel>
          <span slot="heading" class="text-success">
            <i class="fa fa-tasks" aria-hidden="true"></i>
            权限赋予设置
          </span>

          <div>
            <!--<div class="form-group">
              <label class="control-label">创建者</label>
              <div>
                <span class="f16 black">
                  <UserProfileLink :user="user" :showPortrait="true"></UserProfileLink>
                </span>
              </div>
            </div>-->
            <div class="row mt10">
              <div class="col-md-3">
                <label class="control-label">被赋予权限者</label>
              </div>
              <div class="col-md-9">
                <UserPagerSelection :activeUser="iSpaceGrantAuthority.user"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">
                <label class="control-label">是否允许进入</label>
              </div>
              <div class="col-md-9">
                <NbSwitcher :val="untoggle" v-model="iSpaceGrantAuthority.type" type="info" size="lg"></NbSwitcher>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">
                <label class="control-label">开始日期时间</label>
              </div>
              <div class="col-md-9">
                <el-date-picker v-model="iSpaceGrantAuthority.startDateTime" type="datetime"
                                placeholder="选择开始日期"></el-date-picker>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">
                <label class="control-label">结束日期时间</label>
              </div>
              <div class="col-md-9">
                <el-date-picker v-model="iSpaceGrantAuthority.endDateTime" type="datetime"
                                placeholder="选择结束日期时间"></el-date-picker>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">
                <label class="control-label">房间</label>
              </div>
              <div class="col-md-9">
                <RoomPagerSelection :activeRoom="iSpaceGrantAuthority.room"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">
                <label class="control-label">会议室</label>
              </div>
              <div class="col-md-9">
                <ConferencePagerSelection :activeConference="iSpaceGrantAuthority.conference"/>
              </div>
            </div>

            <!--<div class="form-group m-t-md p-h-sm">
              <div>
                <label class="control-label">门禁ID集合</label>
              </div>
              <div class="control-label">
                <div>
                  &lt;!&ndash; 这里的 $event 是将当前对象传入进去，具体详情请参照vue官方文档 &ndash;&gt;
                  <input id="quan" type="checkbox" @click="checkAll($event)" style="cursor:pointer;"> 全选
                </div>
                <div v-if="!iSpaceGrantAuthority.loading" v-for="item in iSpaceDoorPager.iSpaceDoors" :key="item.id" class="col-md-4"  style="margin: 5px;">
                  &lt;!&ndash; v-model 双向数据绑定命令 &ndash;&gt;
                  <NbCheckbox :val="item.doorId" v-model="iSpaceGrantAuthority.doorList"/>{{item.doorName}}
                </div>
                <div class="col-xs-12" v-show="false">{{iSpaceGrantAuthority.doorList.toString()}}</div>
              </div>
            </div>-->
          </div>
        </NbSlidePanel>
      </div>

      <div class="col-xs-12">
        <CreateSaveButton createText="创建开门权限" :entity="iSpaceGrantAuthority" :callback="save"/>
      </div>
    </div>

  </div>
</template>
<script>
  import NbEditor from "../../../../common/widget/NbEditor";
  import NbTank from '../../../../common/widget/NbTank';
  import {Notification} from 'element-ui';
  import CreateSaveButton from "../../../../backyard/view/widget/CreateSaveButton.vue";
  import ISpaceDoor from "../../../../common/model/ispace/door/ISpaceDoor";
  import Pager from "../../../../common/model/base/Pager";
  import ISpaceDoorNbCheckbox from "../door/widget/ISpaceDoorNbCheckbox.vue";
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
  import ISpaceGrantAuthority from "../../../../common/model/ispace/door/ISpaceGrantAuthority";
  import User from "../../../../common/model/user/User";
  import NbSwitcher from "../../../../common/widget/NbSwitcher.vue";
  import UserProfileLink from "../../../../backyard/view/widget/UserProfileLink.vue";
  import UserPagerSelection from "../../../../backyard/view/user/Selection.vue";
  import RoomPagerSelection from "./widget/RoomSelection.vue";
  import ConferencePagerSelection from "./widget/ConferenceSelection.vue";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue';
  import SpaceRoom from  "../../../../common/model/space/SpaceRoom";
  import ConferenceRoom from "../../../../common/model/conference/ConferenceRoom";

  export default {
    data() {
      return {
        ISpaceDoor,
        user: new User(),
        users: new User(),
        currentUser: this.$store.state.user,
        room: new SpaceRoom(),
        conference: new ConferenceRoom(),
        iSpaceGrantAuthority: new ISpaceGrantAuthority(),
        //iSpaceDoorPager: new Pager(ISpaceDoor),
        untoggle: false
        /*spaceRoomPager: new Pager(SpaceRoom),
        conferenceRoomPager: new Pager(ConferenceRoom)*/
      }
    },
    components: {
      NbEditor,
      CreateSaveButton,
      NbTank,
      ISpaceDoorNbCheckbox,
      NbCheckbox,
      NbSwitcher,
      UserProfileLink,
      UserPagerSelection,
      RoomPagerSelection,
      ConferencePagerSelection,
      NbSlidePanel
    },
    computed: {},
    watch: {
      /*checkData: { // 监视双向绑定的数组变化
        handler(){
          if(this.iSpaceGrantAuthority.doorList.length === this.iSpaceDoorPager.length){
            document.querySelector('#quan').checked = true;
          }else {
            document.querySelector('#quan').checked = false;
          }
        },
        deep: true
      }*/
    },
    methods: {
      /*checkAll($event){ // 点击全选事件
        if($event.target.checked){
          let that = this;
          this.iSpaceDoorPager.iSpaceDoors.forEach(item=>{
            // 数组里没有这一个value才push，防止重复push
            if(that.iSpaceGrantAuthority.doorList.indexOf(item.doorId) === -1){
              that.iSpaceGrantAuthority.doorList.push(item.doorId);
            }
          });
        }else { // 全不选选则清空绑定的数组
          this.iSpaceGrantAuthority.doorList = [];
        }
      },*/
      save(){
        let that = this;
        that.iSpaceGrantAuthority.users.id = that.user.id;
        this.iSpaceGrantAuthority.httpSave(function (response) {
          Notification.success({
            message: that.iSpaceGrantAuthority.editMode ? '成功修改权限！' : '成功创建权限！'
          });
          /*that.$router.push("/by/grant/authority/detail/" + that.iSpaceGrantAuthority.id);*/
          that.$router.push("/by/grant/authority/detail?id=" + that.iSpaceGrantAuthority.id);
        });
      },
      search(){
        this.iSpaceGrantAuthority.page = 0;
        this.refresh()
      },
      refresh() {
        //this.iSpaceDoorPager.httpFastPage();
        /*this.spaceRoomPager.httpFastPage();
        this.conferenceRoomPager.httpFastPage();*/
      }
    },
    mounted() {
      this.refresh();
      /*负责显示创建和编辑的时候的创建者*/
      let id = this.$store.state.route.params.id;  //数据库id
      this.user.id = id;
      //没有传id默认显示自己
      if (id) {
        if (this.user.id === this.$store.state.user.id) {
          this.user = this.$store.state.user;
        }
        this.user.id = this.$store.state.user.id
        this.user.httpDetail();
      } else {
        this.user = this.$store.state.user;
      }

    /*负责编辑的时候反填内容*/
      let that = this;
      /*this.iSpaceGrantAuthority.id = this.$store.state.route.params.id;*/
      this.iSpaceGrantAuthority.id = this.$store.state.route.query.id;
      console.log(33333);
      console.log(this.iSpaceGrantAuthority.id );
      if (this.iSpaceGrantAuthority.id) {
        this.iSpaceGrantAuthority.editMode = true;
        this.iSpaceGrantAuthority.httpDetail(
          /*反填得时候只填门的ID，所以具体得数据需要处理如下*/
         /* function () {
            if (that.iSpaceGrantAuthority.doorList.length > 1){
              let resDoorList = JSON.parse(that.iSpaceGrantAuthority.doorList);
              for (let i in resDoorList) {
                that.iSpaceGrantAuthority.doorEditList[i] = resDoorList[i].doorId;
              }
              that.iSpaceGrantAuthority.doorList = that.iSpaceGrantAuthority.doorEditList;
            }
          }*/
        );
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
</style>
