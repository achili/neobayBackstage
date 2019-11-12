<template>
    <div class="network-flor-content">
      <div>
        <BrokenLine></BrokenLine>
      </div>
    </div>
</template>

<script>
    import NetWork from "../../../../../common/model/ispace/network/NetWork";
    import BrokenLine from "./chart/BrokenLine"
    export default {
        name: "NetworkFlow",
      data(){
          return{

          }
      },
      components:{BrokenLine},
      mounted(){

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .network-flor-content{

  }
</style>
