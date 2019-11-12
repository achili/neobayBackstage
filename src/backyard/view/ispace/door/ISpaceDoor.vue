<template>
  <div class="animated fadeIn">
    <div class="row mb10">
      <div class="col-md-12 clearfix">
        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>门禁管理</span>
        </div>
      </div>
    </div>
    <div class="mb20">
      <div>
        <NbTabs :tabSelectedCallback="tabSelectedCallback" :activeTab="tab" :initActiveTab="tab"
                class="text-shadow:5px 5px 2px rgba(50, 98, 64, 0.78);">
          <NbTabPanel label="门禁列表">
            <div>
              <div class="col-xs-12">
                <NbFilter :pager="iSpaceDoorPager" :callback="iSpaceDoorPagerSearch"></NbFilter>
              </div>
              <div class="row mt101">
                <div v-for="item in iSpaceDoorPager.iSpaceDoors" :key="item.doorId" class="col-md-6"
                     @click.stop.prevent="$router.push({path:'/by/door/detail',query: {doorId: item.doorId,syncEndTime:!item.deviceList[0]? null:item.deviceList[0].syncEndTime}})">
                     <!--@click.stop.prevent="$router.push('/by/door/detail?doorId='+ item.doorId)">-->
                     <!--@click.stop.prevent="$router.push('/by/door/detail/'+ item.doorId)">-->
                  <div class="bg-white p10 mt10 cursor br4">
                    <div class="media-body">
                      <div class="cell-title"><span class="f16">门名称：{{item.doorName}}</span></div>
                      <!--<div class="cell-description f13">在线状态：{{item.deviceList[0].online}}</div>-->
                      <div v-if="item.deviceList.length > 0">
                        <div class="cell-description f13"
                             v-if="parseInt((currentTime.getTime() - new Date(item.deviceList[0].syncEndTime).getTime())/1000) <= 10*60">
                          <span>在线状态：</span>
                          <span class="text-info">
                            在线
                          </span>
                        </div>
                        <div class="cell-description f13" v-else>
                          <span>在线状态：</span>
                          <span class="text-danger">
                            不在线
                          </span>
                        </div>
                      </div>
                      <div class="cell-description f13" v-else>
                        <span>在线状态：</span>
                        <span class="text-danger">
                            无在线状态（设备列表为空）
                        </span>
                      </div>

                      <div class="cell-description f13">门ID：{{item.doorId}}</div>
                      <div class="cell-description f13">门地址：{{item.doorAddress}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 mt20">
                <NbPager :pager="iSpaceDoorPager" :callback="iSpaceDoorPagerRefresh"></NbPager>
              </div>
            </div>
          </NbTabPanel>
          <NbTabPanel label="权限赋予">
            <div>
              <div class="row mb10">
                <div class="col-xs-12 clearfix">
                  <div class="pull-right f24">
                    <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/grant/authority/create')">
                      <i class="fa fa-send"></i>
                      <span>赋予权限</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div v-for="item in iSpaceGrantAuthority.iSpaceGrantAuthorities" :key="item.id"
                       class="col-md-6"
                       @click.stop.prevent="$router.push('/by/grant/authority/detail?id=' + item.id)">
                      <!-- @click.stop.prevent="$router.push('/by/grant/authority/detail/' + item.id)">-->
                    <div class="bg-white p10 mt10 cursor br4">
                      <div class="media">
                        <div class="pull-right action-buttons">
                          <!--<a title="编辑" @click.stop.prevent="$router.push('/by/grant/authority/edit/'+item.id)">-->
                          <a title="编辑" @click.stop.prevent="$router.push('/by/grant/authority/edit?id='+item.id)">
                            <i class="fa fa-pencil text-info f20"></i>
                          </a>
                          <a href="javascript:void(0)" title="删除"
                             @click.stop.prevent="item.confirmDel(refresh)">
                            <i class="fa fa-trash text-danger f20"></i>
                          </a>
                        </div>
                        <div class="media-body">
                          <div class="cell-title">
                            <span class="f16">创建者:{{item.users.nickname}}</span>
                          </div>
                          <div class="cell-content f13">
                            <span class="mt10">被赋予开门权限者：{{item.user.nickname}}</span>
                          </div>
                          <div class="cell-content">
                            <div class="f13" v-if="item.room && item.room.id">
                              <span>房间：</span>
                              <span>{{item.room.name}}</span>
                            </div>
                            <div class="f13" v-else-if="item.conference && item.conference.id">
                              <span>会议室：</span>
                              <span>{{item.conference.name}}</span>
                            </div>
                          </div>
                          <div class="cell-content f13">
                            <!--<span class="mr10">是否允许进入:{{item.type}}</span>-->
                            <span class="mr10">是否允许进入:
                              <span v-if="item.type">是</span>
                              <span v-else>否</span>
                            </span>
                          </div>
                          <div class="cell-content f13">
                            <span class="mr10">开始日期时间:{{item.startDateTime | simpleDateTime}}</span>
                          </div>
                          <div class="cell-content f13">
                            <span class="mr10">结束日期时间:{{item.endDateTime | simpleDateTime}}</span>
                          </div>
                          <!--<div class="cell-content">
                            <span class="mr10">门禁ID集合:{{item.doorList}}</span>
                          </div>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 mt20">
                <NbPager :pager="iSpaceGrantAuthority" :callback="iSpaceGrantAuthorityRefresh"></NbPager>
              </div>
            </div>
          </NbTabPanel>
          <NbTabPanel label="进出记录">
            <div>
              <div class="col-xs-12">
                <NbFilter :pager="iSpaceDoorLogPager" :callback="iSpaceDoorLogPagerSearch"></NbFilter>
              </div>
              <div class="p15">
                <div class="row mt101">
                  <div v-for="item in iSpaceDoorLogPager.iSpaceDoorLogs" class="col-md-6" @click.stop.prevent="detail">
                    <div class="bg-white p10 mt10 cursor br4">
                      <div class="media-body">
                        <div class="cell-title f16">姓名：{{item.employeeName}}
                        </div>
                        <div class="cell-description f13">门名称：{{item.doorName}}
                        </div>
                        <div class="cell-description f13">进出时间：{{item.recordTime}}
                        </div>
                        <div class="cell-description f13">进出方式：{{item.recordType}}
                        </div>
                      </div>
                      <!--<div class="text-info" @click.stop.prevent="$router.push('/by/room/detail/'+ item.doorId)">-->
                      <div class="text-info f13" @click.stop.prevent="$router.push('/by/room/detail?doorId='+ item.doorId)">
                        <i class="fa fa-asterisk" aria-hidden="true"></i>
                        <span class="btn-action">点击查看 绑定的房间及详情</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 mt20">
                <NbPager :pager="iSpaceDoorLogPager" :callback="iSpaceDoorLogPagerRefresh"></NbPager>
              </div>
            </div>
          </NbTabPanel>
          <NbTabPanel label="报警记录">
            <div>
              <div class="p15">
                <!--<div>   不用分页查询查询数据
                  <FormatJson :json="door.resData"></FormatJson>   格式化json数据
                </div>
                <div class="row mt101">
                  <div v-for="item in door.resData" :key="item.id" class="col-md-6"  @click.stop.prevent="detail">
                    <div class="bg-white p10 mt10 cursor br4">
                      <div class="media-body">
                        <div class="cell-description"><span class="f17"><i class="fa fa-university" aria-hidden="true"></i> 门名称 ：{{item.doorName}}</span></div>
                        <div class="cell-description">进出时间 <i class="fa fa-clock-o" aria-hidden="true"></i>：{{item.recordTime}}</div>
                        <div class="cell-description">进出方式 <i class="fa fa-key" aria-hidden="true"></i>：{{item.recordType}}</div>
                        <div class="cell-title"><span class="f10">门ID <i class="fa fa-id-badge" aria-hidden="true"></i>：{{item.doorId}}</span></div>
                      </div>
                    </div>
                  </div>
                </div>-->
                <div class="row mt101">
                  <div v-for="item in iSpaceAlarmLogPager.iSpaceAlarmLogs" class="col-md-6"
                       @click.stop.prevent="detail">
                    <div class="bg-white p10 mt10 cursor br4">
                      <div class="media-body">
                        <div class="cell-description"><span class="f17"><i class="fa fa-university"
                                                                           aria-hidden="true"></i> 门名称 ：{{item.doorName}}</span>
                        </div>
                        <div class="cell-description">进出时间 <i class="fa fa-clock-o" aria-hidden="true"></i>：{{item.recordTime}}
                        </div>
                        <div class="cell-description">进出方式 <i class="fa fa-key" aria-hidden="true"></i>：{{item.recordType}}
                        </div>
                        <div class="cell-title"><span class="f10">门ID <i class="fa fa-id-badge" aria-hidden="true"></i>：{{item.doorId}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 mt20">
                <NbPager :pager="iSpaceAlarmLogPager" :callback="iSpaceAlarmLogPagerRefresh"></NbPager>
              </div>
            </div>
          </NbTabPanel>
          <NbTabPanel label="任务通知">
            <div class="animated fadeIn">
              <div class="row mb10">
                <div class="col-xs-12 clearfix">
                  <!--<div class="pull-left f24">
                    <i class="fa fa-fire text-success"></i>
                    <span>任务通知</span>
                  </div>-->
                  <div class="pull-right f24">
                    <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/task/info/create')">
                      <i class="fa fa-send"></i>
                      <span>新建任务通知</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div v-for="item in iSpaceTaskInfo.iSpaceTaskInfos" :key="item.templateId"
                       class="col-md-6"
                       @click.stop.prevent="$router.push('/by/task/info/detail?templateId=' + item.templateId)">
                       <!--@click.stop.prevent="$router.push('/by/task/info/detail/' + item.templateId)">-->
                    <div class="bg-white p10 mt10 cursor br4">
                      <div class="media">
                        <div class="pull-right action-buttons">
                          <!--<a title="编辑" @click.stop.prevent="$router.push('/by/task/info/edit/'+item.templateId)">-->
                          <a title="编辑" @click.stop.prevent="$router.push('/by/task/info/edit?templateId='+item.templateId)">
                            <i class="fa fa-pencil text-info f20"></i>
                          </a>
                          <a href="javascript:void(0)" title="删除"
                             @click.stop.prevent="item.confirmDelete(refresh)">
                            <i class="fa fa-trash text-danger f20"></i>
                          </a>
                        </div>
                        <div class="media-body">
                          <div class="cell-title">
                            <span class="f16">主题ID:{{item.templateId}}</span>
                          </div>
                          <div class="cell-content f13">
                            <span class="mr10">开始日期时间:{{item.broadStartDateTime | simpleDateTime}}</span>
                          </div>
                          <div class="cell-content f13">
                            <span class="mr10">结束日期时间:{{item.broadEndDateTime | simpleDateTime}}</span>
                          </div>
                          <!--<div class="cell-content">
                            <span class="mr10">门禁ID集合:{{item.doorList}}</span>
                          </div>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 mt20">
                <NbPager :pager="iSpaceTaskInfo" :callback="iSpaceTaskInfoRefresh"></NbPager>
              </div>
            </div>
          </NbTabPanel>

          <NbTabPanel label="门禁报警">
            <NbSlidePanel>
              <span slot="heading" class="text-success f16">
                <i class="fa fa-leaf"></i>
                管理员基本信息
					    </span>
              <div class="col-md-12">
                <CreateSaveButton :entity="doorDisnetInform"  :callback="save"/>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">选择通知管理员：</label>
                <div class="col-md-9">
                  <SelectionUser :activeUser = "doorDisnetInform.notifyUser" />
                </div>
              </div>
            </NbSlidePanel>

            <NbSlidePanel>
              <span slot="heading" class="text-success f16">
                <i class="fa fa-leaf"></i>
                忽略门基本信息
					    </span>

              <div class="col-md-12 text-right mt10">
                <CreateSaveButton :entity="doorDisnetInform" :callback="doorSave" />
              </div>

              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label">门列表：</label>
                  <div class="col-md-10">
                    <div class="row" v-if="doorDisnetInform.ignoreDoors && doorDisnetInform.ignoreDoors.length > 0">
                      <div class="col-md-8">
                        <span>门名称</span>
                      </div>
                      <div class="col-md-4" >操作</div>
                    </div>
                    <div v-for="door in doorDisnetInform.ignoreDoors" :key="door.doorId">
                      <div class="row">
                        <div class="col-md-8">
                          <span class="text-danger">{{door.doorName}}</span>
                        </div>
                        <div class="col-md-4" >
                          <a title="删除" @click.stop.prevent="goDel(door)">
                            <i class="fa fa-trash-o fa-lg text-danger"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div v-if="!doorDisnetInform.ignoreDoors || doorDisnetInform.ignoreDoors.length === 0">暂未忽略任何门</div>

                    <DoorSelection class="mt5" :activeISpaceDoor="door"/>

                    <button class="f12 pull-right btn btn-info" @click="addChoiceISpaceDoor">
                      <i class="fa fa-sort-asc mr5 mt5"></i>添加至门列表
                    </button>

                  </div>

                </div>
              </div>

            </NbSlidePanel>

          </NbTabPanel>
        </NbTabs>
      </div>
    </div>
  </div>
</template>
<script>
  import NbTabs from "../../../../common/widget/NbTabs.vue";
  import NbTabPanel from "../../../../common/widget/NbTabPanel.vue";
  import {Notification} from 'element-ui';
  import Pager from "../../../../common/model/base/Pager";
  import FormatJson from '../../../../developer/view/guardTest/widget/JsonFormat';
  import ISpaceDoor from "../../../../common/model/ispace/door/ISpaceDoor";
  import ISpaceGrantAuthority from "../../../../common/model/ispace/door/ISpaceGrantAuthority";
  import ISpaceDoorLog from "../../../../common/model/ispace/door/ISpaceDoorLog";
  import ISpaceAlarmLog from "../../../../common/model/ispace/door/ISpaceAlarmLog";
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue';
  import NbPager from '../../../../common/widget/NbPager.vue';
  import ISpaceTaskInfo from "../../../../common/model/ispace/door/ISpaceTaskInfo";
  import SelectionUser from "./SelectionUser";
  import User from "../../../../common/model/user/User";
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue";
  import SubmitButton from "../../widget/SubmitButton.vue";

  import SpaceRoom from  "../../../../common/model/space/SpaceRoom";
  import DoorSelection from "../../space/room/widget/DoorSelection.vue";
  import DoorDisnetInform from "../../../../common/model/ispace/door/DoorDisnetInform"


  export default {
    data() {
      return {
        currentTime: new Date(),
        door: new ISpaceDoor(),
        iSpaceDoorPager: new Pager(ISpaceDoor),
        iSpaceGrantAuthority: new Pager(ISpaceGrantAuthority),
        iSpaceDoorLogPager: new Pager(ISpaceDoorLog),
        iSpaceAlarmLogPager: new Pager(ISpaceAlarmLog),
        iSpaceTaskInfo: new Pager(ISpaceTaskInfo),
        user: new User(),
        tab: 1,
        spaceRoom: new SpaceRoom(),
        doorDisnetInform: new DoorDisnetInform()
        //choiceISpaceDoor: new ISpaceDoor()
      }
    },
    computed: {},
    watch: {
      "$route"() {
        this.tab = parseInt(this.$store.state.route.query.tab);
      }
    },
    methods: {
      detail() {
        console.log('详情')
      },
      /*findAlarmLogs() {
        this.door.httpFindAlarmLogs(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
      },*/
      iSpaceDoorPagerSearch() {
        this.iSpaceDoorPager.page = 0;
        this.iSpaceDoorPagerRefresh()
      },
      iSpaceDoorLogPagerSearch() {
        this.iSpaceDoorLogPager.page = 0;
        this.iSpaceDoorLogPagerRefresh()
      },
      refresh() {
        this.iSpaceDoorPager.httpFastPage();
        this.iSpaceGrantAuthority.httpFastPage();
        this.iSpaceDoorLogPager.httpFastPage();
        this.iSpaceAlarmLogPager.httpFastPage();
        this.iSpaceTaskInfo.httpFastPage();

      },
      iSpaceDoorPagerRefresh(){
        this.iSpaceDoorPager.httpFastPage();
      },
      iSpaceGrantAuthorityRefresh(){
        this.iSpaceGrantAuthority.httpFastPage();
      },
      iSpaceDoorLogPagerRefresh(){
        this.iSpaceDoorLogPager.httpFastPage();
      },
      iSpaceAlarmLogPagerRefresh(){
        this.iSpaceAlarmLogPager.httpFastPage();
      },
      iSpaceTaskInfoRefresh(){
        this.iSpaceTaskInfo.httpFastPage();
      },
      tabSelectedCallback(index) {
        this.tab = index;
        this.$router.push({query: {tab: this.tab}})
      },

      save(){
        let that = this;
        this.doorDisnetInform.saveUser(function (response) {
          Notification.success({
            message: that.user.editMode ? '保存失败！' : "保存成功！"
          });
        });
      },

      goDel(iSpaceDoor) {
        this.doorDisnetInform.ignoreDoors.splice(this.doorDisnetInform.ignoreDoors.indexOf(iSpaceDoor), 1);
      },
      addChoiceISpaceDoor() {
        if(!this.door.doorId){
          Notification.error({
            message:  '请选择要忽略的门后再添加至门列表！'
          });
          return
        }
        if(!this.doorDisnetInform.ignoreDoors){
          this.doorDisnetInform.ignoreDoors = [];
        }
        for(let i = 0; i < this.doorDisnetInform.ignoreDoors.length; i++) {
          if(this.doorDisnetInform.ignoreDoors[i].doorId === this.door.doorId) {
            Notification.error({
              message:  '不能重复添加门！'
            });
            return
          }
        }
        let tempISpaceDoor = new ISpaceDoor();
        tempISpaceDoor.render(this.door);
        this.doorDisnetInform.ignoreDoors.push(tempISpaceDoor);
        this.door.render(new ISpaceDoor());
      },
      doorSave(){
        let that = this;
        this.doorDisnetInform.saveIgnoreDoor(function () {
          Notification.success({
            message: that.spaceRoom.editMode ?  '保存失败！' : "保存成功！"
          });
        });
      }
    },
    components: {
      NbTabs,
      NbTabPanel,
      FormatJson,
      NbFilter,
      NbPager,
      SelectionUser,
      NbSlidePanel,
      CreateSaveButton,
      SubmitButton,
      DoorSelection
    },
    mounted() {
      this.refresh();
      this.iSpaceDoorPager.enableHistory();
      this.iSpaceGrantAuthority.enableHistory();
      this.iSpaceDoorLogPager.enableHistory();
      this.iSpaceAlarmLogPager.enableHistory();
      this.iSpaceTaskInfo.enableHistory();
      /*this.findAlarmLogs();*/
      this.tab = parseInt(this.$store.state.route.query.tab);

      if (this.user.id) {
        this.user.httpDetail();
      }
       this.doorDisnetInform.id = 1;
      let that = this;
      console.log(that.doorDisnetInform.notifyUser)
      this.doorDisnetInform.httpDetail(function () {
        console.log(that.doorDisnetInform.notifyUser)
      });
     // this.loaderData();
    }
  }
</script>

