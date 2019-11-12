<template>
  <div class="network-people-content">
    <div class="network-people-card">
      <div class="title">
        <i class="fa fa-eye"></i>
        在线人数
      </div>
      <div class="content">
        {{peopleNumber}}
      </div>
    </div>
    <div class="network-people-list container">
      <div class="row">
        <div class="col-md-6">
          <PieRich></PieRich>
        </div>
        <div class="col-md-6">
          <PieRicg></PieRicg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import NetWork from "../../../../../common/model/ispace/network/NetWork";
    import PieRich from "./chart/PieRich"
    import PieRicg from "./chart/PieRicg"
    export default {
        name: "networkPeople",
      data(){
        return{
          netWork: new NetWork(),
          peopleNumber:0
        }
      },
      components:{PieRich,PieRicg},
      mounted(){
          let that = this;
          this.netWork.httpOasis(this.netWork.GET_ONLINE_NUMBER,{},function (response) {
            that.peopleNumber = response.onlineJsonArray.onlineCount;
          });
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../../../common/assets/css/global/variables";
  .network-people-content{
    .network-people-card {
      background-color: @neobay-light-yellow;
      margin: 10px 0;
      cursor: pointer;
      .title {
        color: white;
        background-color: @neobay-yellow;
        text-align: center;
        line-height: 44px;
        font-size: 18px;
      }
      .content {
        color: white;
        line-height: 100px;
        font-size: 42px;
        text-align: center;
      }

      &.blue {
        background-color: @neobay-light-blue;
        .title {
          background-color: @neobay-blue;
        }
      }
    }
    .network-people-list{
      width: 100% !important;
    }
  }
</style>
