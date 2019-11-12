<template>
  <div class="row maker-hotel-detail-cell">
    <div class="col-xs-12">

      <LoadingFrame :loading="makerHotel.detailLoading">
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
                      {{makerHotel.projectName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>企业名称：</span>
                      </div>
                      {{makerHotel.companyName}}
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
                      {{makerHotel.leaderName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>电话：</span>
                      </div>
                      {{makerHotel.leaderPhone}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>邮箱：</span>
                      </div>
                      {{makerHotel.leaderEmail}}
                    </div>

                  </div>
                </div>

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">入驻信息</span>
                  </div>
                  <div style="font-size: 14px;padding: 20px 100px;">
                    <div class="row">
                      <div class="col-md-3">
                        <span>房型：</span>
                      </div>
                      {{makerHotel.hotelStyle}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>入住人数：</span>
                      </div>
                      {{makerHotel.numberPerson}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>所需房间数量：</span>
                      </div>
                      {{makerHotel.numberHotel}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>入住日期：</span>
                      </div>
                      {{makerHotel.startTime | date("yyyy/MM/dd hh:ss")}}
                    </div>
                  </div>
                </div>

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">其他信息</span>
                  </div>
                  <div style="font-size: 14px;padding: 20px 100px;">
                    <div class="row">
                      <div class="col-md-3">
                        <span style="color: #1e88e5;padding: 10px;">*</span>申请单位是否属于零号湾在孵企业
                      </div>
                      {{makerHotel.isIncubatingEnterprise ? '是' : '否'}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span><span style="color: #1e88e5;padding: 10px;">*</span>申请人是否有出差任务</span>
                      </div>
                      {{makerHotel.isBusinessTravel ? '是' : '否'}}
                    </div>
                  </div>
                </div>

                <div align="center">
                  <div style="border-bottom: 1px solid #ff8d1d;padding-bottom: 8px;width: 80%;"></div>
                </div>
                <div class="row mt10" align="center" >
                  <div class="col-md-12">
                    <span style="color: #1e88e5;padding: 10px;">*</span>本人同意以上人才公寓管理条例，并将遵守人才公寓的规定，如有违规的行为，本人愿意承担相关责任。
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
  import MakerHotel from "../../../../../common/model/maker/MakerHotel";

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
      makerHotel:{
        type: MakerHotel,
        required: true
      }
    },
    methods:{},
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
