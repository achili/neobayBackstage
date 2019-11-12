<template>
  <div class="network-authentication-content">
    {{Authentication}}
  </div>
</template>

<script>
    import NetWork from "../../../../../common/model/ispace/network/NetWork";

    export default {
        name: "NetworkAuthentication",
      data(){
          return{
            netWork:new NetWork(),
            Authentication:null
          }
      },
      mounted(){
          let that = this;
        this.netWork.httpOasis(this.netWork.GET_CLOUD_LOCATION,{},function (response) {
          that.Authentication = response;
        });
      }
    }
</script>

<style scoped>

</style>
