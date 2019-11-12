<template>
  <div class="row">
    <div class="col-xs-12">
      <NbSlidePanel>
        <span slot="heading" class="text-success f16">
            <i class="fa fa-dot-circle-o"></i>
            政策咨询信息详情
        </span>
        <div slot="body">

          <div class="row mt10">
            <div class="col-md-2 ">状态：</div>
            <div class="col-md-10 ">
              <span :class="'label label-'+officialPolicyQuery.getStatusStyle()">{{officialPolicyQuery.getStatusName()}}</span>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-2 ">主要问题：</div>
            <div class="col-md-10 "><b>{{officialPolicyQuery.title}}</b></div>
          </div>


          <div class="row mt10">
            <div class="col-md-2 ">电话：</div>
            <div class="col-md-10 "><b>{{officialPolicyQuery.phone }}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-2 ">创建时间：</div>
            <div class="col-md-10 "><b>{{officialPolicyQuery.createTime | humanTime}}</b></div>
          </div>

          <div class="row mt10" v-if="officialPolicyQuery.remark">
            <div class="col-md-2 ">备注：</div>
            <div class="col-md-10 "><b>{{officialPolicyQuery.remark }}</b></div>
          </div>

          <div class="mail-box mt10">
            <div class="mail-body">
              <div class="text-center" v-show="officialPolicyQuery.loading">
                <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              </div>
              <div v-html="officialPolicyQuery.content"></div>
            </div>
          </div>

        </div>
      </NbSlidePanel>
    </div>
  </div>
</template>

<script>

  import NbSlidePanel from  "../../../../../../common/widget/NbSlidePanel.vue"
  import OfficialPolicyQuery from "../../../../../../common/model/official/OfficialPolicyQuery";

    export default {
      data(){
        return {

        }
      },
      components:{
        NbSlidePanel
      },
      props:{
        officialPolicyQuery:{
          type: OfficialPolicyQuery,
          required: true
        }
      },
      computed:{}
    }
</script>

<style scoped>

</style>
