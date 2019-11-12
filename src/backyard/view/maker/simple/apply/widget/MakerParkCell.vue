<template>
  <div class="row maker-park-detail-cell">
    <div class="col-xs-12">

      <LoadingFrame :loading="makerPark.detailLoading">
        <NbSlidePanel>
          <span slot="heading" class="text-success f16">
            <i class="fa fa-dot-circle-o"></i>
            基本信息
          </span>
          <div slot="body">
            <div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;">
              <div class="col-md-12" style="padding: 10px 30px;border: #ff8d1d solid 2px;">

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">基本信息</span>
                  </div>
                  <div style="padding: 20px 100px;font-size: 14px;">
                    <div class="row">
                      <div class="col-md-3">
                        <span>项目名称:</span>
                      </div>
                      {{makerPark.projectName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>企业名称：</span>
                      </div>
                      {{makerPark.companyName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>机构：</span>
                      </div>
                      {{makerPark.makerOrganization.name}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>编号：</span>
                      </div>
                      {{makerPark.no}}
                    </div>
                  </div>
                </div>

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">联系人信息</span>
                  </div>
                  <div style="padding: 20px 100px;font-size: 14px;">
                    <div class="row">
                      <div class="col-md-3">
                        <span>联系人：</span>
                      </div>
                      {{makerPark.leaderName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>电话：</span>
                      </div>
                      {{makerPark.leaderPhone}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>邮箱：</span>
                      </div>
                      {{makerPark.leaderEmail}}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </NbSlidePanel>
      </LoadingFrame>
    </div>
  </div>
</template>

<script>

  import LoadingFrame from "../../../../widget/LoadingFrame";
  import NbSlidePanel from '../../../../../../common/widget/NbSlidePanel'
  import MakerSimpleApply from "../../../../../../common/model/maker/MakerSimpleApply";

  export default {
    data(){
      return {
      }
    },
    components:{
      LoadingFrame,
      NbSlidePanel
    },
    computed:{},
    props:{
      makerPark:{
        type: MakerSimpleApply,
        required: true
      }
    },
    methods:{},
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
