<template>
  <div class="broken-line">

    <div ref="main" class="main"></div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import NetWork from "../../../../../../common/model/ispace/network/NetWork";
  import {simpleMinute} from "../../../../../../common/filter/time";

  export default {
    data() {
      return {
        option: {
          //标题
          title: {
            text: '设备流量(单位Mbps)'//*******************
          },
          //图例
          legend: {
            data:['上行速率', '下行速率']
          },
          //X轴
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []//**************时间间隔
          },
          //数据
          series: [
            {
              name:'上行速率',//*******************
              type:'line',
              data:[]//*******************
            },
            {
              name:'下行速率',//*******************
              type:'line',
              data:[]//*******************
            }
          ],
          //Y轴
          yAxis: {type: 'value'},
          //鼠标悬浮提示
          tooltip: {
            trigger: 'axis'
          },
          //下载图片按钮
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          //极坐标位置
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          }
        },
        flor:null,
        netWork:new NetWork()
    }
    },
    computed: {
      main(){
        return this.$refs["main"];
      }
    },
    methods: {
      init() {
        this.legendArr = this.myChart.getOption().series;
        this.legendArr.forEach((data) => {
          data.selected = true;
        });
        window.addEventListener('resize', function() {
          this.myChart.resize()
        }.bind(this))
      },
      dataFor(){
        let that = this;
        this.netWork.httpOasis(this.netWork.GET_DEVICE_FLOW,{},function (response) {
          that.flor = response.rateData.data;
          for(let i = 0; i < that.flor.length; i++){
            that.option.series[0].data.push((response.rateData.data[i].speedUp / 1000).toFixed(1));
            that.option.series[1].data.push((response.rateData.data[i].speedDown / 1000).toFixed(1));
            that.option.xAxis.data.push(simpleMinute(new Date(response.rateData.data[i].updateTime)));
          }
          //初始化echarts实例
          that.myChart = echarts.init(that.main, 'light');
          that.myChart.setOption(that.option);
          that.init();
        });
      }
    },
    components: {},
    mounted() {
      this.dataFor();
    }
  }

</script>


<style lang="less">
  .broken-line {
    height: 100%;
    //background url('http://youko.yinyinzuotong.com:8301/youko/2017-04-08/574.jpg') no-repeat
    //background #c1c1c1
    //background-size 100% 100%
    background-position: center;
    //background-size: cover;
    .main {
      width: 100%;
      height: 180px;
    }
  }
</style>
