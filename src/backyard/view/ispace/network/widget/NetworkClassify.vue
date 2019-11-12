<template>
  <div class="network-classify-content">
    <div class="classify-space" ref="classifyContent">
      <div class="container classify-row">
        <div class="row">
          <NbTabs :tabSelectedCallback="subClass">
            <NbTabPanel v-for="ssid in ssidData" :key="ssid.SSIDName" :label="ssid.spName">
              <SsidSubclass :subclassData="subclassData"></SsidSubclass>
            </NbTabPanel>
          </NbTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NbTabs from "../../../../../common/widget/NbTabs";
  import NbTabPanel from "../../../../../common/widget/NbTabPanel";
  import NetWork from "../../../../../common/model/ispace/network/NetWork";
  import PerfectScrollbar from "perfect-scrollbar";
  import SsidSubclass from "./SsidSubclass"
    export default {
      name: "NetworkClassify",
      data(){
          return {
            netWork:new NetWork(),
            ssidData:null,
            subclassData:null
          }
      },
      components:{
        NbTabs,
        NbTabPanel,
        SsidSubclass
      },
      methods:{
        subClass(index){
          let that = this;
          let form = {
            ssid:this.ssidData[index].SSIDName
          };
          this.netWork.httpOasis(that.netWork.GET_NET_SUB_CLASS,form,function (response) {
            that.subclassData = response.SubclassData.data;
          });
        }
      },
      mounted(){
        let that = this;
        PerfectScrollbar.initialize(that.$refs.classifyContent);
        this.netWork.httpOasis(this.netWork.GET_NET_CLASS,{},function (response) {
          that.ssidData = response.ssidData.data;
        });
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .network-classify-content{
    width: 100%;
    .classify-space{
      width: 100%;
      .classify-row{
        width: 100% !important;
      }
    }
  }
</style>
