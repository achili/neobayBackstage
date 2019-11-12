<template>
  <div class="space_investment_cell">
    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
          <div class="bg-white p10 mt10 br4 cursor" v-for="spaceInvestment in pager.spaceInvestments">

            <div class="media">
              <div class="pull-right action-buttons">
                <a title="未处理" v-show="spaceInvestment.status === 'PROCESSED'" @click.stop.prevent="unlock(spaceInvestment)">
                  <i class="fa fa-times text-primary f20"></i>
                </a>
                <a title="已处理" v-show="spaceInvestment.status === 'UNTREATED'" @click.stop.prevent="lock(spaceInvestment)">
                  <i class="fa fa-check  text-warning f20"></i>
                </a>
                <a title="编辑" @click.stop.prevent="changeEditMode(spaceInvestment)" >
                <i class="fa fa-pencil text-info f20"></i>
                </a>
                <a href="javascript:void(0)" title="删除" @click.stop.prevent="spaceInvestment.confirmDel(refresh)">
                  <i class="fa fa-trash text-danger f20"></i>
                </a>
              </div>
              <div class="media-body">
                <div class="cell-title">
                  <span>项目名称: {{spaceInvestment.projectName}}</span>
                  <span class="label" :class="'label-'+spaceInvestment.StatusMap[spaceInvestment.status].style">{{spaceInvestment.StatusMap[spaceInvestment.status].name}}</span>
                </div>
                <div class="f14i cell-description">
                  <div>
                    <span>园区地点：{{spaceInvestment.spaceRegional.name}}</span>
                  </div>
                  <div>
                    <span v-if="spaceInvestment.spaceArea">空间需求面积：{{spaceInvestment.spaceArea}}</span>
                    <span v-if="!spaceInvestment.spaceArea">空间需求面积：<span class="text-danger">未填写！</span></span>
                    <span class="ml5" v-if="spaceInvestment.remark">备注：{{spaceInvestment.remark}}</span>
                    <span class="ml5"  v-if="!spaceInvestment.remark">备注：<span class="text-danger">未填写！</span></span>
                  </div>
                </div>
                <div class="cell-content f14i">
                  <span v-if="!spaceInvestment.project.id">关联的项目：<span class="text-danger">未关联！</span></span>
                  <span>负责人：{{spaceInvestment.projectLeader}}</span>
                  <span>创建时间：{{spaceInvestment.createTime | date("yyyy-MM-dd") }}</span>
                </div>
              </div>
            </div>

            <NbExpanding>
              <div class="mt10" v-show="spaceInvestment.editMode==true">

                <div class="row">
                  <div class="col-md-2">项目</div>
                  <div class="col-md-10">
                    <ProjectPagerSelection :activeProject="spaceInvestment.project" :initFilter="{'userId':user.id}"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5 compulsory">项目名称</div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="spaceInvestment.projectName"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5 compulsory">项目负责人</div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="spaceInvestment.projectLeader"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5">空间所需面积</div>
                  <div class="col-md-10">
                    <input type="number" class="form-control" v-model="spaceInvestment.spaceArea"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5">备注</div>
                  <div class="col-md-10">
                    <textarea class="form-control" rows="6" v-model="spaceInvestment.remark"
                              placeholder="此处填写备注……"></textarea>
                  </div>
                </div>

                <div class="mt5" align="center">
                  <button class="btn btn-success pv3" @click.stop.prevent="save(spaceInvestment)">
                    <i class="fa fa-floppy-o"></i>保存
                  </button>
                  <button class="btn btn-danger pv3" @click.stop.prevent="cancelEdit(spaceInvestment)">
                    <i class="fa fa-times"></i>取消
                  </button>
                </div>
              </div>
            </NbExpanding>

          </div>

        <NbExpanding>
          <div class="mt10 border " v-show="isCreate">

            <div class="row">
              <div class="col-md-2">项目</div>
              <div class="col-md-10">
                <ProjectPagerSelection :activeProject="newSpaceInvestment.project" :initFilter="{'userId':user.id}"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5 compulsory">项目名称</div>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="newSpaceInvestment.projectName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5 compulsory">项目负责人</div>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="newSpaceInvestment.projectLeader"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">空间所需面积</div>
              <div class="col-md-10">
                <input type="number" class="form-control" v-model="newSpaceInvestment.spaceArea"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">备注</div>
              <div class="col-md-10">
                    <textarea class="form-control" rows="6" v-model="newSpaceInvestment.remark"
                              placeholder="此处填写备注……"></textarea>
              </div>
            </div>

            <div class="mt5" align="center">
              <button class="btn btn-success pv3" @click.stop.prevent="save(newSpaceInvestment)">
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
      新建空间需求
    </button>

  </div>
</template>

<script>

  import Pager from "../../../../common/model/base/Pager";
  import SpaceInvestment from "../../../../common/model/demand/SpaceInvestment";
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import NbExpanding from "../../../../common/widget/NbExpanding";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue";
  import { Notification, MessageBox } from 'element-ui';


  export default {
      data(){
        return {
          pager: new Pager(SpaceInvestment),
          spaceInvestment: new SpaceInvestment(),
          newSpaceInvestment: new SpaceInvestment(),
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
        CreateSaveButton
      },
      props:{},
      watch:{
        "spaceInvestment.project.id"(newVal, oldVal){
          this.spaceInvestment.projectName = this.spaceInvestment.project.name;
          this.spaceInvestment.projectLeader = this.spaceInvestment.project.leader;
         }
      },
      methods:{
        unlock(spaceInvestment){
          spaceInvestment.httpStatus(spaceInvestment.Status.UNTREATED, function () {
            spaceInvestment.status = spaceInvestment.Status.UNTREATED;
          });
        },
        lock(spaceInvestment){
            spaceInvestment.httpStatus(spaceInvestment.Status.PROCESSED, function () {
            spaceInvestment.status = spaceInvestment.Status.PROCESSED;
          });
        },
        save(spaceInvestment){
          let that = this;
          spaceInvestment.httpSave(function () {
            Notification.success({
              message: spaceInvestment.editMode ? "修改成功！" : "创建新空间招商成功！"
            });
            that.refresh();
            that.isCreate = false;
            that.isEdit = false;
            that.newSpaceInvestment = new SpaceInvestment();
          });
        },
        changeEditMode(spaceInvestment) {
          if (this.isEdit) {
            return;
          }
          this.isEdit = true;
          spaceInvestment.editMode = !spaceInvestment.editMode;
        },
        cancelEdit(spaceInvestment) {
          this.isEdit = false;
          spaceInvestment.editMode = false;
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
          this.pager.setFilter("status",SpaceInvestment.prototype.Status.UNTREATED);
        }
        this.refresh();
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .space_investment_cell {
    .f14i {
      font-size: 14px!important;
    }

  }
</style>
