<template>
  <div class="row maker-market-detail-cell">
    <div class="col-xs-12">

      <LoadingFrame :loading="makerMarket.detailLoading">
        <NbSlidePanel>
          <span slot="heading" class="text-success f16">
            <i class="fa fa-dot-circle-o"></i>
            基本信息
          </span>
          <div slot="body">

    <div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;">
      <div class="col-md-12" style="padding: 10px 30px;border: #ff8d1d solid 2px;">

        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
            <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">基本信息</span>
          </div>
          <div style="padding: 20px 100px;font-size: 14px;">
            <div class="row">
              <span>项目名称：{{makerMarket.projectName}}</span>
            </div>
            <div class="row mt10">
              <span>公司名称：{{makerMarket.companyName}}</span>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
           <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">联系人信息</span>
          </div>
          <div style="padding: 20px 100px;font-size: 14px;">
            <div class="row">
              <span>联系人名称：{{makerMarket.leaderName}}</span>
            </div>
            <div class="row mt5">
              <span>联系人电话：{{makerMarket.leaderPhone}}</span>
            </div>
            <div class="row mt5">
              <span>联系人邮件：{{makerMarket.leaderEmail}}</span>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
            <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">参展物品</span>
          </div>
          <div style="font-size: 14px;padding: 20px 100px;">
            <div class="row">
              <span>活动时间：{{makerMarket.startTime | date("yyyy/MM/dd hh:ss")}} - {{makerMarket.endTime | date("yyyy/MM/dd hh:ss")}}</span>
            </div>
            <div class="row mt5">
              <span>活动地点：{{makerMarket.activityAddress}}</span>
            </div>
            <div class="row mt5">
              <span>参展物品名称:</span>
            </div>
            <div class="row mt5">
              <span>{{makerMarket.title}}</span>
            </div>
            <div class="row mt5">
              <span>参展物品介绍:</span>
            </div>
            <div class="row mt5">
              <span>{{makerMarket.description}}</span>
            </div>
            <div class="row mt5">
              <span>参展物品照片：</span>
            </div>
            <div class="row mt5">
              <img :src="makerMarket.posterUrl"/>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
            <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">品牌推广</span>
          </div>
          <div style="font-size: 14px;padding: 20px 100px;">
            <div class="row">
              <span>品牌名：{{makerMarket.brandName}}</span>
            </div>
            <div class="row mt5">
              <span>品牌详情：</span>
            </div>
            <div class="row mt5">
              <div v-html="makerMarket.brandDetails"></div>
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
  import MakerMarket from "../../../../../common/model/maker/MakerMarket";
  import LoadingFrame from "../../../widget/LoadingFrame";
  import NbSlidePanel from '../../../../../common/widget/NbSlidePanel'


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
      makerMarket:{
        type: MakerMarket,
        required: true
      }
    },
    methods:{},
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
