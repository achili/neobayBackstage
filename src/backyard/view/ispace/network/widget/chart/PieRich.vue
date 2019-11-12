<template>
  <div class="box">
    <div class="broken-line">
      <div ref="main" class="main" v-show="isPosition"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import NetWork from "../../../../../../common/model/ispace/network/NetWork";

  export default {
    data() {
      return {
        option: {
          title: {
            text: '基于手机厂商统计'//*******************
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: []//*******************
          },
          series: [
            {
              type: 'pie',
              //饼图的半径
              radius: '65%',
              //饼图的中心（圆心）坐标
              center: ['50%', '50%'],
              //支持选中
              selectedMode: 'single',
              data: [],
              itemStyle: {
                emphasis: {
                  //阴影效果
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          }
        },
        isPosition:false,
        netWork:new NetWork(),
        pieRichData:null,
        legendArr:[]
      }
    },
    computed: {
      main(){
        return this.$refs["main"];
      }
    },
    methods: {
      init() {
        this.legendArr = this.myChart.getOption().series
        this.legendArr.forEach((data) => {
          data.selected = true;
        });
        window.addEventListener('resize', function() {
          this.myChart.resize()
        }.bind(this))
      },
      forData(){
        let that = this;
        let data = [];
        this.netWork.httpOasis(this.netWork.GET_DEVICE_MANUFACTURER,{},function (response) {
          that.pieRichData = response.ttoryvendorJsonArray.data;
          that.isPosition = true;
          for(let i = 0; i < that.pieRichData.length; i++){
            let item = {value:null, name:null};
            item.name = that.pieRichData[i].clientVendor;
            item.value = that.pieRichData[i].count;
            that.option.series[0].data.push(item);
            that.legendArr.push(that.pieRichData[i].clientVendor);
            that.option.legend.data.push(that.pieRichData[i].clientVendor);
          }
          //初始化echarts实例
          that.myChart = echarts.init(that.main, 'light');
          that.myChart.setOption(that.option);
          that.init()
        });
      }
    },
    components: {},
    mounted() {
      this.forData();
    }
  }

</script>


<style lang="less" rel="stylesheet/less">
  .box{
    .broken-line {
      height: 100%;
      //background url('http://youko.yinyinzuotong.com:8301/youko/2017-04-08/574.jpg') no-repeat
      //background #c1c1c1
      //background-size 100% 100%
      background-position: center;
      //background-size: cover;
      .main {
        width: 400px;
        height: 450px;
        div{
          width: 100%!important;
        }
      }
    }
  }
</style>
