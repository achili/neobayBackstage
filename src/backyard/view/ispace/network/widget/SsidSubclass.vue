<template>
    <div class="ssid-sub-class-tiem row">
      <div v-for="item in subclassData" :key="item.apMAC" class="col-md-3 facility-item-col">
        <div class="facility-item-ionic">
          <div class="item-ionic">
            <img src="../../../../../common/assets/img/up.png" alt="">
          </div>
        </div>
        <div class="facility-item-title">
          名称： {{item}}
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "SsidSubclass",
      data(){
          return {

          }
      },
      props:{
        subclassData:{

        }
      },
      mounted(){

      },
      methods:{

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .ssid-sub-class-tiem{
    .facility-item-col{
    border: 1px solid #ccc;
    height: 110px;
    .facility-item-ionic{
      text-align: center;
      .item-ionic{
        width: 45px;
        height: 45px;
        position: absolute;
        top: 30px;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    .facility-item-title{
      text-align: center;
      line-height: 20px;
    }
  }
  }
</style>
