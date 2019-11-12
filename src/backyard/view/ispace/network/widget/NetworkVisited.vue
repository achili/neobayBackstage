<template>
  <div class="network-visited-content">
      {{visited}}
  </div>
</template>

<script>
    import NetWork from "../../../../../common/model/ispace/network/NetWork";

    export default {
        name: "NetworkVisited",
      data(){
          return{
            netWork:new NetWork(),
            visited:null
          }
      },
      mounted(){
        let that = this;
        this.netWork.httpOasis(this.netWork.GET_VISITING_HISTORY,{},function (response) {
          that.visited = response;
        });
      }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
