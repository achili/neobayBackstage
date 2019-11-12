<template>
  <div class="space_room_cell">
    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div class="bg-white p10 mt10 br4 cursor" v-for="spaceRoomMessage in pager.spaceRoomMessages">

          <div class="media">
            <div class="pull-right action-buttons">
              <a title="未处理" v-show="spaceRoomMessage.status === 'PROCESSED'" @click.stop.prevent="unlock(spaceRoomMessage)">
                <i class="fa fa-times text-primary f20"></i>
              </a>
              <a title="已处理" v-show="spaceRoomMessage.status === 'UNTREATED'" @click.stop.prevent="lock(spaceRoomMessage)">
                <i class="fa fa-check  text-warning f20"></i>
              </a>
              <a title="编辑" @click.stop.prevent="changeEditMode(spaceRoomMessage)" >
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="spaceRoomMessage.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">
              <div class="cell-title">
                <span>房间号: {{spaceRoomMessage.no}}</span>
                <span class="label" :class="'label-'+spaceRoomMessage.StatusMap[spaceRoomMessage.status].style">{{spaceRoomMessage.StatusMap[spaceRoomMessage.status].name}}</span>
              </div>
              <div class="cell-description f14i">
                <span v-if="spaceRoomMessage.projectMentor.name">社区经理：{{spaceRoomMessage.projectMentor.name}}</span>
                <span v-if="!spaceRoomMessage.projectMentor.name">社区经理：<span class="text-danger">未指定！</span></span>
                <span>园区地点：{{spaceRoomMessage.spaceRegional.name}}</span>
              </div>
              <div class="cell-description f14i">
                <span>面积：{{spaceRoomMessage.area}}</span>
                <span v-if="spaceRoomMessage.remark">备注：{{spaceRoomMessage.remark}}</span>
                <span v-if="!spaceRoomMessage.remark">备注：<span class="text-danger">未填写！</span></span>
              </div>
              <div class="cell-content f14i">
                <span v-if="spaceRoomMessage.project.id">关联的项目：{{spaceRoomMessage.project.name}}</span>
                <span v-if="!spaceRoomMessage.project.id">关联的项目：<span class="text-danger">未关联！</span></span>
                <span>负责人：{{spaceRoomMessage.projectLeader}}</span>
                <span>创建时间：{{spaceRoomMessage.createTime | date("yyyy-MM-dd") }}</span>
              </div>
            </div>
          </div>

          <NbExpanding>
            <div class="mt10" v-show="spaceRoomMessage.editMode==true">

              <div class="row ">
                <div class="col-md-2 mt5 compulsory">房间号</div>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="spaceRoomMessage.no"/>
                </div>
              </div>
              <div class="row mt10">
                <div class="col-md-2 mt5 compulsory">面积</div>
                <div class="col-md-10">
                  <input type="number" class="form-control" v-model="spaceRoomMessage.area"/>
                </div>
              </div>
              <div class="row mt10">
                <div class="col-md-2">分配项目</div>
                <div class="col-md-10">
                  <ProjectPagerSelection :activeProject="spaceRoomMessage.project" :initFilter="{'userId':user.id}"/>
                </div>
              </div>
              <div class="row mt10">
                <div class="col-md-2 mt5">项目负责人</div>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="spaceRoomMessage.projectLeader"/>
                </div>
              </div>
              <div class="row mt10">
                <div class="col-md-2 mt5">社区经理</div>
                <div class="col-md-10">
                  <ProjectMentorSelection :activeProjectMentor="spaceRoomMessage.projectMentor" />
                </div>
              </div>
              <div class="row mt10">
                <div class="col-md-2 mt5">备注</div>
                <div class="col-md-10">
                    <textarea class="form-control" rows="6" v-model="spaceRoomMessage.remark"
                              placeholder="此处填写备注……"></textarea>
                </div>
              </div>

              <div class="mt5" align="center">
                <button class="btn btn-success pv3" @click.stop.prevent="save(spaceRoomMessage)">
                  <i class="fa fa-floppy-o"></i>保存
                </button>
                <button class="btn btn-danger pv3" @click.stop.prevent="cancelEdit(spaceRoomMessage)">
                  <i class="fa fa-times"></i>取消
                </button>
              </div>
            </div>
          </NbExpanding>

        </div>

        <NbExpanding>
          <div class="mt10 border " v-show="isCreate">

            <div class="row ">
              <div class="col-md-2 mt5 compulsory">房间号</div>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="newSpaceRoomMessage.no"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5 compulsory">面积</div>
              <div class="col-md-10">
                <input type="number" class="form-control" v-model="newSpaceRoomMessage.area"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2">分配项目</div>
              <div class="col-md-10">
                <ProjectPagerSelection :activeProject="newSpaceRoomMessage.project" :initFilter="{'userId':user.id}"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">项目负责人</div>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="newSpaceRoomMessage.projectLeader"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">社区经理</div>
              <div class="col-md-10">
                <ProjectMentorSelection :activeProjectMentor="newSpaceRoomMessage.projectMentor"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">备注</div>
              <div class="col-md-10">
                    <textarea class="form-control" rows="6" v-model="newSpaceRoomMessage.remark"
                              placeholder="此处填写备注……"></textarea>
              </div>
            </div>

            <div class="mt5" align="center">
              <button class="btn btn-success pv3" @click.stop.prevent="save(newSpaceRoomMessage)">
                <i class="fa fa-floppy-o"></i>创建
              </button>
              <button class="btn btn-danger pv3" @click.stop.prevent="isCreate=false;isEdit=false">
                <i class="fa fa-times"></i>取消
              </button>
            </div>
          </div>
        </NbExpanding>

      </div>

      <div class="col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>

    </div>

    <button class="btn btn-block btn-default compose-mail pv3" @click="isCreate=true;isEdit=true">
      <i class="fa fa-send"></i>
      新建房间信息
    </button>

  </div>
</template>

<script>

  import Pager from "../../../../common/model/base/Pager";
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import NbExpanding from "../../../../common/widget/NbExpanding";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue";
  import { Notification, MessageBox } from 'element-ui';
  import SpaceRoomMessage from "../../../../common/model/demand/SpaceRoomMessage";
  import ProjectMentorSelection from "../../project/mentor/Selection.vue";



  export default {
    data(){
      return {
        pager: new Pager(SpaceRoomMessage),
        spaceRoomMessage: new SpaceRoomMessage(),
        newSpaceRoomMessage: new SpaceRoomMessage(),
        user: this.$store.state.user,
        isCreate: false,
        isEdit: false
      }
    },
    comments:{},
    components:{
      ProjectPagerSelection,
      NbExpanding,
      NbFilter,
      NbPager,
      CreateSaveButton,
      ProjectMentorSelection
    },
    props:{},
    watch:{
      "spaceRoomMessage.project.id"(newVal, oldVal){
        this.spaceRoomMessage.projectLeader = this.spaceRoomMessage.project.leader;
      }
    },
    methods:{
      unlock(spaceRoomMessage){
        spaceRoomMessage.httpStatus(spaceRoomMessage.Status.UNTREATED, function () {
          spaceRoomMessage.status = spaceRoomMessage.Status.UNTREATED;
        });
      },
      lock(spaceRoomMessage){
        spaceRoomMessage.httpStatus(spaceRoomMessage.Status.PROCESSED, function () {
          spaceRoomMessage.status = spaceRoomMessage.Status.PROCESSED;
        });
      },
      save(spaceRoomMessage){
        let that = this;
        spaceRoomMessage.httpSave(function () {
          Notification.success({
            message: spaceRoomMessage.editMode ? "修改成功！" : "创建成功！"
          });
          that.refresh();
          that.isCreate = false;
          that.isEdit = false;
          that.newSpaceRoomMessage = new SpaceRoomMessage();
        });
      },
      changeEditMode(spaceRoomMessage) {
        if (this.isEdit) {
          return;
        }
        this.isEdit = true;
        spaceRoomMessage.editMode = !spaceRoomMessage.editMode;
      },
      cancelEdit(spaceRoomMessage) {
        this.isEdit = false;
        spaceRoomMessage.editMode = false;
      },
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        this.pager.httpFastPage();
      }
    },
    mounted(){
      if(this.pager.getFilter("status").isEmpty()){
        this.pager.setFilter("status",SpaceRoomMessage.prototype.Status.UNTREATED);
      }
      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .space_room_cell {
    .f14i {
      font-size: 14px!important;
    }

  }
</style>
