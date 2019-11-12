<template>
    <div class="is-space-network-content container">
      <div class="network-tab">
        <NbTabs>
          <span @click.stop.prevent="open('https://oasis.h3c.com/oasis/stable/mix/frame/index.html#/global/content/network/branchsite')"
                slot="more" class="text-info f15 btn btn-action">
					点击进入网络中心 <i class="fa fa-caret-square-o-right"></i>
				  </span>
          <NbTabPanel label="所有设备">
            <NetworkFacility></NetworkFacility>
          </NbTabPanel>
          <NbTabPanel label="在线用户">
            <NetworkPeople></NetworkPeople>
          </NbTabPanel>
          <NbTabPanel label="网络分类">
            <NetworkClassify></NetworkClassify>
          </NbTabPanel>
        </NbTabs>
      </div>
      <div class="network-flow">
        <NetworkFlow></NetworkFlow>
      </div>
    </div>
</template>

<script>
  import NbTabs from "../../../../common/widget/NbTabs";
  import NbTabPanel from "../../../../common/widget/NbTabPanel";
  import NetworkPeople from "./widget/NetworkPeople";
  import NetworkFacility from "./widget/NetworkFacility";
  import NetworkVisited from "./widget/NetworkVisited";
  import NetworkFlow from "./widget/NetworkFlow";
  import NetworkAuthentication from "./widget/NetworkAuthentication"
  import NetworkClassify from "./widget/NetworkClassify";
    export default {
      name: "network",
      data(){
          return{

          }
      },
      components:{NbTabs,NbTabPanel,NetworkPeople,NetworkFacility,NetworkVisited,NetworkFlow,NetworkAuthentication,NetworkClassify},
      methods:{
        open(url){
          window.open(url);
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
.is-space-network-content{
  width: 100%;
  .network-tab{
  padding-bottom: 180px;
  }
  .network-flow{
    width: 88%;
    height: 180px;
    position: fixed;
    bottom: 0;
    left:220px;
    background: #F3F3F4;
  }
}
</style>
