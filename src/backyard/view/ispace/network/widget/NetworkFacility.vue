<template>
    <div class="network-facility-content">
      <div class="facility-space" ref="networkContent">
        <div class="container facility-row">
          <div class="row facility-item">
            <div v-for="item in facility" :key="item.apMAC" class="col-md-3 facility-item-col">
              <div class="facility-item-ionic">
                <div v-if="item.apStatus === 1" class="item-ionic">
                  <img src="../../../../../common/assets/img/up.png" alt="">
                </div>
                <div v-if="item.apStatus === 2" class="item-ionic">
                  <img src="../../../../../common/assets/img/down.png" alt="">
                </div>
              </div>
              <div class="facility-item-title">
               名称： {{item.apName}}
              </div>
              <div class="facility-item-title">
                Mac： {{item.apMAC}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import NetWork from "../../../../../common/model/ispace/network/NetWork";
    import PerfectScrollbar from "perfect-scrollbar";
    export default {
      name: "NetworkFacility",
      data(){
          return{
            netWork:new NetWork(),
            facility:null
          }
      },
      mounted(){
        let that = this;
        PerfectScrollbar.initialize(that.$refs.networkContent);
        this.netWork.httpOasis(this.netWork.GET_DEVICE_LIST,{},function (response) {
          that.facility = response.allFacilityJsonArray.data;
        });
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .network-facility-content{
    width: 100%;
    .facility-space{
      width: 100%;
      .facility-row{
        width: 100% !important;
        .facility-item{
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
      }
    }
  }
</style>
