<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="spaceRoom.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push('/by/space/room/edit/' + spaceRoom.id)">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-default">
                  <i class="fa fa-home"></i>
                  房间详情
                </span>
                <div slot="body">


                  <div class="row">
                    <div class="col-md-3">房间名称：</div>
                    <div class="col-md-9 f18 bold">{{spaceRoom.name}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">园区地点：</div>
                    <div class="col-md-9">
                     {{spaceRoom.spaceRegional.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">占用状态：</div>
                    <div class="col-md-9">
                      <span v-if="spaceRoom.status" :class="'label label-'+spaceRoom.getStatusStyle()">{{spaceRoom.getStatusName()}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">房间类型：</div>
                    <div class="col-md-9">
                      <span v-if="spaceRoom.status" :class="'label label-'+spaceRoom.getTypeStyle()">{{spaceRoom.getTypeName()}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">房间编号：</div>
                    <div class="col-md-9 bold">
                      {{spaceRoom.no}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">所属大楼：</div>
                    <div class="col-md-9 bold">
                      <a @click.stop.prevent="$router.push('/by/space/building/detail/'+spaceRoom.spaceBuilding.id)">
                        {{spaceRoom.spaceBuilding.name}}</a>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">面积(m2)：</div>
                    <div class="col-md-9">
                      {{spaceRoom.area}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">房产证编号：</div>
                    <div class="col-md-9 bold">{{spaceRoom.propertyNo}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">地址：</div>
                    <div class="col-md-9">
                      {{spaceRoom.address}}
                    </div>
                  </div>



                  <div class="row mt10">
                    <div class="col-md-3">描述：</div>
                    <div class="col-md-9">
                      {{spaceRoom.description}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">绑定门列表：</div>
                    <div class="col-md-9">
                      <div class="text-info cursor" v-for="item in spaceRoom.doors"
                           @click.stop.prevent="$router.push('/by/door/detail?doorId='+ item.doorId)">
                        {{item.doorName}}
                      </div>
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-md-12">
              <NbSlidePanel>
              <span slot="heading" class="text-default">
                  <i class="fa fa-bars" aria-hidden="true"></i>
                  门常开和门密码设置
              </span>
                <div v-if="doorCheck">
                  <div class="row mt10">
                    <div class="col-md-3">密码验证:</div>
                    <div class="col-md-9">
                      <input type="password" v-model="spaceRoom.password"/>
                      <span class="text-danger">{{spaceRoom.msg}}</span>
                    </div>
                    <div class="pull-right" style="width: 103px">
                      <el-button round type="success" @click="doorCheckMethod">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i> 发送
                      </el-button>
                    </div>
                  </div>
                </div>
                <div v-if="doorSetUp">
                  <div class="col-md-12">
                      <span slot="heading" class="text-default">
                          <i class="fa fa-bars" aria-hidden="true"></i>
                          门常开设置
                      </span>
                      <div slot="body">
                        <div class="row mt10">
                          <label class="col-md-3">开关</label>
                          <div class="col-md-9">
                            <NbSwitcher :val="untoggle" v-model="spaceRoom.flags" type="info" size="lg"></NbSwitcher>
                          </div>
                        </div>

                        <div class="row mt10">
                          <label class="col-md-3">选择时间范围:</label>
                          <div class="col-md-9">
                            <el-time-picker
                              v-model="spaceRoom.startTime"
                              :picker-options="{}"
                              placeholder="任意时间点">
                            </el-time-picker>
                            <el-time-picker
                              arrow-control
                              v-model="spaceRoom.endTime"
                              :picker-options="{}"
                              placeholder="任意时间点">
                            </el-time-picker>
                          </div>
                        </div>
                        <div class="row mt10">
                          <label class="col-md-3">选择星期范围:</label>
                          <div class="col-md-9">
                            <el-select v-model="spaceRoom.weeks" multiple placeholder="请选择" size = "47px">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </div>
                        </div>
                        <div class="mt10">
                          <CreateSaveButton saveText="发送" :entity="spaceRoom" :callback="send" saveIcon="fa fa-send"/>
                        </div>
                      </div>
                  </div>
                  <div class="col-md-12">
                      <span slot="heading" class="text-default">
                          <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                          门密码修改
                      </span>
                      <div slot="body">
                        <div class="row mt10">
                          <label class="col-md-3">开门密码1</label>
                          <div class="col-md-9">
                            <input type="text" class="form-control" v-model="spaceRoom.pwd1">
                          </div>
                        </div>
                        <div class="row mt10">
                          <label class="col-md-3">开门密码2</label>
                          <div class="col-md-9">
                            <input type="text" class="form-control" v-model="spaceRoom.pwd2">
                          </div>
                        </div>
                        <div class="row mt10">
                          <label class="col-md-3">管理密码:</label>
                          <div class="col-md-9">
                            <input type="text" class="form-control" v-model="spaceRoom.manager">
                          </div>
                        </div>
                        <div class="mt10">
                          <CreateSaveButton saveText="发送" :entity="spaceRoom" :callback="reset" saveIcon="fa fa-send"/>
                        </div>
                      </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-md-12">
              <NbSlidePanel>
              <span slot="heading" class="text-default">
                  <i class="fa fa-user"></i>
                  开门用户管理员组
              </span>
                <div slot="body">
                  <div class="row">
                    <div class="col-md-3 col-sm-4 mt5" v-for="user in iSpaceDoors.users">
                      <UserProfileLink :user="user" :showPortrait="true"></UserProfileLink> <!--:showPortrait 表示显示头像-->
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-md-12">
              <NbSlidePanel>
              <span slot="heading" class="text-default">
                  <i class="fa fa-user"></i>
                  开门用户用户组
              </span>
                <div slot="body">
                  <div class="row">
                    <div class="col-md-3 col-sm-4 mt5" v-for="user in iSpaceDoor.consumer">
                      <ConsumerProfileLink :user="user" :showPortrait="true"></ConsumerProfileLink> <!--:showPortrait 表示显示头像-->
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-md-12">
              <NbSlidePanel>
              <span slot="heading" class="text-default">
                  <i class="fa fa-info-circle"></i>
                  房间的门进出记录
              </span>
                <div>
                  <div class="col-xs-12">
                    <NbFilter :pager="spaceDoorLogPager" :callback="spaceDoorLogPagerSearch"></NbFilter>
                  </div>
                  <div class="p15">
                    <div class="row mt101">
                      <div v-for="item in spaceDoorLogPager.spaceDoorLogs" class="col-md-6">
                        <div class="bg_self p10 mt10 cursor br4">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 mt20">
                    <NbPager :pager="spaceDoorLogPager" :callback="spaceDoorLogPagerRefresh"></NbPager>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-default">
                  <i class="fa fa-diamond"></i>
                  占用合同
                </span>
                <div slot="body">
                  <div v-for="protocolSpace in protocolSpacePager.list" :key="protocolSpace.id">
                    <div class="media-body">
                      <div class="cell-title">
                        <a
                          @click="$router.push('/by/protocol/space/detail/' + protocolSpace.id)">{{protocolSpace.name}}</a>
                      </div>
                      <div class="cell-content">
                        房屋地址：{{protocolSpace.address}}
                      </div>
                      <div class="cell-content">
                        合同编号：{{protocolSpace.no}}
                      </div>

                    </div>
                  </div>

                </div>
              </NbSlidePanel>
            </div>
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-default">
                  <i class="fa fa-diamond"></i>
                  空间预分配
                </span>
                <div slot="body">

                    <div class="row mt10">
                      <label class="col-md-3 control-label mt5 compulsory">项目</label>
                      <div class="col-md-9">
                        <ProjectPagerSelection :activeProject="spaceRoom.project"/>
                      </div>
                    </div>

                    <div class="row mt10">
                      <div class="col-md-3">备注</div>
                      <div class="col-md-9">
													<textarea rows="5" class="form-control wp100" v-model="spaceRoom.remark"
                                    placeholder="备注"></textarea>
                      </div>
                    </div>

                  <div class="mt10">
                    <CreateSaveButton saveText="保存" :entity="spaceRoom" :callback="saveRemarks" saveIcon="fa fa-save"/>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
          </div>
        </LoadingFrame>
      </div>
      <div class="col-md-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Notification} from 'element-ui'
  import SpaceRoom from  "../../../../common/model/space/SpaceRoom"
  import Pager from '../../../../common/model/base/Pager'
  import ProtocolSpace from '../../../../common/model/protocol/space/ProtocolSpace'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import LoadingFrame from "../../widget/LoadingFrame";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import Project from "../../../../common/model/project/Project";
  import CreateSaveButton from "../../../../backyard/view/widget/CreateSaveButton.vue"
  import NbBtnDropdown from '../../../../common/widget/NbBtnDropdown';
  import UserProfileLink from "../../../../backyard/view/widget/UserProfileLink.vue";
  import ConsumerProfileLink from "../room/widget/ConsumerProfileLink.vue";
  import ISpaceDoor from "../../../../common/model/ispace/door/ISpaceDoor";
  import NbSwitcher from "../../../../common/widget/NbSwitcher.vue";
  import SpaceDoorLog from "../../../../common/model/space/SpaceDoorLog";
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue';
  import NbPager from '../../../../common/widget/NbPager.vue';
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue';
  import {str2Date} from "../../../../common/filter/time";

  export default{
    data(){
      return {
        spaceRoom: new SpaceRoom(),
        protocolSpacePager: new Pager(ProtocolSpace),
        project: new Project(),
        remark:SpaceRoom.prototype.remark,
        iSpaceDoors: new ISpaceDoor(),
        iSpaceDoor: new ISpaceDoor(),
        untoggle: false,
        spaceDoorLogPager: new Pager(SpaceDoorLog),
        doorCheck: true,
        doorSetUp: false,
        options: [{
          value: '0',
          label: '星期一'
        }, {
          value: '1',
          label: '星期二'
        }, {
          value: '2',
          label: '星期三'
        }, {
          value: '3',
          label: '星期四'
        }, {
          value: '4',
          label: '星期五'
        }, {
          value: '5',
          label: '星期六'
        }, {
          value: '6',
          label: '星期日'
        }]
      }
    },
    components: {
      NbSlidePanel,
      LoadingFrame,
      ProjectPagerSelection,
      CreateSaveButton,
      NbBtnDropdown,
      UserProfileLink,
      ConsumerProfileLink,
      NbSwitcher,
      NbFilter,
      NbPager,
      NbCheckbox
    },
    methods: {
      doorCheckMethod(){
        let that = this;
        this.spaceRoom.httpDoorCheckMethod(function (res) {
          that.doorCheck = false;
          that.doorSetUp = true;
        });
      },
      fetchDetail(){
				let that = this;
				this.spaceRoom.id = this.$store.state.route.params.id;
				if (this.spaceRoom.id) {
          this.spaceRoom.httpDetail(function (rep) {
            that.protocolSpacePager.render(rep.data.protocolSpaces)
          })
				}
			},
      saveRemarks(){
        let that = this;
        let form = {
          id: this.spaceRoom.id,
          project:this.spaceRoom.project.id,
          remark: this.spaceRoom.remark
        };
        this.spaceRoom.httpDistribution(form,function (response) {
          Notification.success({
            message: '分配成功！'
          });
        });
      },
      send(){
        let that = this;
        this.spaceRoom.id = this.$store.state.route.params.id;
        this.spaceRoom.httpOpenDoorSwitch(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
      },
      reset(){
        let that = this;
        this.spaceRoom.id = this.$store.state.route.params.id;
        this.spaceRoom.httpResetPassword(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
      },
      spaceDoorLogPagerSearch() {
        this.spaceDoorLogPager.page = 0;
        this.spaceDoorLogPagerRefresh();
      },
      spaceDoorLogPagerRefresh(){
        this.spaceDoorLogPager.httpFastPage();
      }
    },
    computed: {},
    props:{},
    mounted(){
      let that = this;
      that.fetchDetail();
      that.iSpaceDoors.httpManagerOpenDoorUsers();
      that.iSpaceDoor.roomId =  that.$store.state.route.params.id;
      that.iSpaceDoor.httpConsumerOpenDoorUsers();
      that.spaceDoorLogPager.setFilter("id", that.$store.state.route.params.id);
      that.spaceDoorLogPager.httpFastPage();
      that.spaceRoom.httpOpenDoorSwitchQuery(
        function (res) {
          if(res.body.jsonObject.data[0] !== null){
            if(res.body.jsonObject.data[0].status === "0"){
              that.spaceRoom.flags = true;
              that.spaceRoom.startTime = ("2019-01-01 " + res.body.jsonObject.data[0].settingsList[0].startTime);
              that.spaceRoom.endTime = ("2019-01-01 " + res.body.jsonObject.data[0].settingsList[0].endTime);
              that.spaceRoom.weeks = res.body.jsonObject.data[0].settingsList[0].weeks.split(",");
            }
            if(res.body.jsonObject.data[0].status === "1"){
              that.spaceRoom.flags = false;
              that.spaceRoom.startTime = ("2019-01-01 " + res.body.jsonObject.data[0].settingsList[0].startTime);
              that.spaceRoom.endTime = ("2019-01-01 " + res.body.jsonObject.data[0].settingsList[0].endTime);
              that.spaceRoom.weeks = res.body.jsonObject.data[0].settingsList[0].weeks.split(",");
            }
          }
        }
      );
      that.spaceRoom.httpResetPasswordQuery(
        function (res) {
          if(res.body[0] !== null){
            that.spaceRoom.pwd1 = res.body[0].password1;
            that.spaceRoom.pwd2 = res.body[0].password2;
            that.spaceRoom.manager = res.body[0].manager;
          }
        }
      );
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .bg_self {
    background-color: #f8f8f8;
  }
</style>

