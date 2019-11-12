<template>
  <div>
    <LoadingFrame :loading="spaceSeat.detailLoading">
    <div class="row">
      <div class="col-xs-12">

          <NbSlidePanel>
            <span slot="heading" class="text-default">
              <i class="fa fa-dot-circle-o"></i>
              工位详情
            </span>
            <div slot="body">

              <div class="row">
                <div class="col-md-3">工位编号：</div>
                <div class="col-md-9 f18 bold">{{spaceSeat.name}}</div>
              </div>
              <div class="row mt10">
                <div class="col-md-3">园区地点：</div>
                <div class="col-md-9 bold">{{spaceSeat.spaceRegional.name}}</div>
              </div>
              <div class="row mt10">
                <div class="col-md-3">工位名称：</div>
                <div class="col-md-9 bold">{{spaceSeat.no}}</div>
              </div>
              <div class="row mt10">
                <div class="col-md-3">房产证编号：</div>
                <div class="col-md-9 bold">{{spaceSeat.propertyNo}}</div>
              </div>
              <div class="row mt10">
                <div class="col-md-3">地址：</div>
                <div class="col-md-9 bold">{{spaceSeat.address}}</div>
              </div>


              <div class="row mt10">
                <div class="col-md-3">状态：</div>
                <div class="col-md-9">
                  <span :class="'label label-'+spaceSeat.getStatusStyle()">{{spaceSeat.getStatusName()}}</span>
                </div>
              </div>

              <!--<div class="row mt10" v-if="spaceSeat.status === spaceSeat.Status.OCCUPIED">-->
                <!--<div class="col-md-2">相关申请：</div>-->
                <!--<div class="col-md-10 bold">-->
                  <!--<router-link :to="'/by/space/apply/nursery/detail/'+spaceSeat.spaceApply.id">-->
                    <!--{{spaceSeat.spaceApply.projectName}}-->

                  <!--</router-link>-->
                <!--</div>-->
              <!--</div>-->


              <div class="row mt10">
                <div class="col-md-3">描述：</div>
                <div class="col-md-9">{{spaceSeat.description}}</div>
              </div>


            </div>
          </NbSlidePanel>


        <NbSlidePanel>
          <span slot="heading" class="text-default">
            <i class="fa fa-diamond"></i>
            空间预分配
          </span>
          <div slot="body">

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">项目</label>
                <div class="col-md-9">
                  <ProjectPagerSelection :activeProject="spaceSeat.project" />
                </div>
              </div>
              <div class="row mt10">
                <div class="col-md-3">备注</div>
                <div class="col-md-9">
													<textarea rows="5" class="form-control wp100" v-model="spaceSeat.remark"
                                    placeholder="备注"></textarea>
                </div>
              </div>

            <div class="mt10">
              <CreateSaveButton saveText="保存" :entity="spaceSeat" :callback="saveRemarks" saveIcon="fa fa-save"/>
            </div>
          </div>
        </NbSlidePanel>

      </div>
      </div>
    </LoadingFrame>
  </div>
</template>

<script>
  import {Notification} from 'element-ui';
  import SpaceSeat from  "../../../../common/model/space/SpaceSeat"
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import CreateSaveButton from "../../../../backyard/view/widget/CreateSaveButton.vue"
  import NbBtnDropdown from '../../../../common/widget/NbBtnDropdown'

  import ProjectPagerSelection from "../../project/Selection.vue";
  import Project from "../../../../common/model/project/Project";
  import LoadingFrame from "../../widget/LoadingFrame";

  export default{
    data(){
      return {
        spaceSeat: new SpaceSeat(),
        project: new Project(),
        remark:SpaceSeat.prototype.remark
      }
    },
    components: {
      NbSlidePanel,
      LoadingFrame,
      CreateSaveButton,
      NbBtnDropdown,
      ProjectPagerSelection
    },
    methods: {
      fetchDetail(){
        let that = this;
        this.spaceSeat.id = this.$store.state.route.query.id;
        if (this.spaceSeat.id) {
          this.spaceSeat.httpDetail();
        }
      },
      saveRemarks() {
        let that = this;
        let form = {
          id: this.spaceSeat.id,
          project:this.spaceSeat.project.id,
          remark: this.spaceSeat.remark
        };
        this.spaceSeat.httpDistribution(form,function (response) {
          Notification.success({
            message: '分配成功！'
          });

        });
      }
    },
    computed: {},
    props:{},
    mounted(){
      this.fetchDetail();
    }
  }

</script>
