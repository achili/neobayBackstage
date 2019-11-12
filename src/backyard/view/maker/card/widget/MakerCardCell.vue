<template>
  <div class="row maker-card-detail-cell">
    <div class="col-xs-12">

      <LoadingFrame :loading="makerCard.detailLoading">
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
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">申请人信息</span>
                  </div>
                  <div style="padding: 20px 100px;font-size: 14px;">
                    <div class="row">
                      <div class="col-md-3">
                        <span>项目名称:</span>
                      </div>
                      {{makerCard.projectName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>园区地点：</span>
                      </div>
                      {{makerCard.spaceRegional.name}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>企业名称：</span>
                      </div>
                      {{makerCard.companyName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>申请一卡通类型：</span>
                      </div>
                      {{makerCard.type}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3 f14 bold">授权门禁</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3"><nobr>一号楼:</nobr></div>
                        <span class="label label-default mr10" v-for="entranceGuardOne in makerCard.entranceGuardOne">
                        {{entranceGuardOne}}
                        </span>
                    </div>
                    <div class="row mt10">
                        <div class="col-md-3"><nobr>二号楼:</nobr></div>
                        <span class="label label-default mr10" v-for="entranceGuardTwo in makerCard.entranceGuardTwo">
                        {{entranceGuardTwo}}
                        </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">用户信息</span>
                  </div>
                  <div style="padding: 20px 100px;font-size: 14px;">
                    <div class="row">
                      <div class="col-md-3">
                        <span>联系人：</span>
                      </div>
                      {{makerCard.leaderName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>电话：</span>
                      </div>
                      {{makerCard.leaderPhone}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>邮箱：</span>
                      </div>
                      {{makerCard.leaderEmail}}
                    </div>

                  </div>
                </div>

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">申请人</span>
                  </div>
                  <div style="font-size: 14px;padding: 20px 100px;">
                    <div class="row" v-for="(makerCardMember, index) in makerCard.makerCardMembers" :key="makerCardMember.id">
                      <div class="row mt10">
                        <div class="col-md-2 mt5" >申请人{{index + 1}}:</div>
                        <div class="col-md-2 mt5">
                          {{makerCardMember.name}}
                        </div>
                        <div class="col-md-2 mt5" >身份证:</div>
                        <div class="col-md-2 mt5">
                          {{makerCardMember.idCard}}
                        </div>
                      </div>
                      <div style="border-bottom: 1px solid #000000;padding-bottom: 8px;width: 80%;"></div>
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

  import LoadingFrame from "../../../widget/LoadingFrame";
  import NbSlidePanel from '../../../../../common/widget/NbSlidePanel'
  import MakerCard from "../../../../../common/model/maker/card/MakerCard";

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
      makerCard:{
        type: MakerCard,
        required: true
      }
    },
    methods:{},
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
