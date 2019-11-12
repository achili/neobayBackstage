<template>

  <div class="network-facility-content">
    <div class="facility-space" ref="networkContent">

      <div class="row mb10">
        <div class="col-xs-12 clearfix">
          <div class="pull-right">
            <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/ispace/energy/create')">
              <i class="fa fa-plus"></i>
              <span>添加新设备</span>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <NbFilter :pager="pager" :callback="search"></NbFilter>
        </div>

        <div class="col-xs-12">
          <div v-for="energyPoint in pager.energyPoints" class="col-md-3 col-sm-4 col-xs-6">
            <div class="p10 bg-white mt10">
              <div class="mt10 cursor br6 text-center toast-top-full-width">
                <div class="media-body f12">
                  <div v-if="energyPoint.type === 'WATT_METER'" class="fa fa-bolt fa-3x"></div>
                  <div v-if="energyPoint.type === 'AIR_CONDITIONER'" class="fa fa-snowflake-o fa-3x"></div>
                  <div>设备名称：{{energyPoint.name}}</div>
                  <div v-if="energyPoint.type === 'WATT_METER'">电表读数：{{energyPoint.value}}</div>
                  <div v-if="energyPoint.type === 'AIR_CONDITIONER'">空调温度：{{energyPoint.value}}</div>
                  <div>采集时间：{{energyPoint.acqTime | humanTime}} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>


</template>
<script>
  import EnergyPoint from "../../../../../common/model/ispace/energy/EnergyPoint";
  import NbPager from '../../../../../common/widget/NbPager.vue';
  import Pager from  "../../../../../common/model/base/Pager";
  import NbFilter from '../../../../../common/widget/filter/NbFilter.vue'
  export default{
    data(){
      return {
        pager: new Pager(EnergyPoint),
        energyPoint: new EnergyPoint()
      }
    },
    watch: {},
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    components: {
      NbPager,
      NbFilter
    },
    mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .font-color{
    color: #1e88e5;
  }
  .img-md {
    width: 100px;
    height: 100px;
  }

</style>
