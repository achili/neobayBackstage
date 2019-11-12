<template>
  <div class="box-p">
    <div class="broken-line">
      <div ref="main" class="main"></div>
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
            data: ["802.11ac(5GHz)","802.11gn(2.4GHz)"]//*******************
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
              data: [
                {value:2, name:"802.11ac(5GHz)"},
                {value:0, name:"802.11gn(2.4GHz)"}
                ],
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
        pieRighData:null,
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
        this.netWork.httpOasis(this.netWork.GET_TERMINAL_RADIO,{},function (response) {
          that.pieRighData = response.radioJsonArray.data;
          for(let k = 0; k < that.pieRighData.length; k++){
            if(that.pieRighData[k].radioMode === "802.11ac" || that.pieRighData[k].radioMode === "802.11an" || that.pieRighData[k].radioMode === "802.11a"){
              that.option.series[0].data[0].value = that.option.series[0].data[0].value + 1;
            }
            if(that.pieRighData[k].radioMode === "802.11gn" || that.pieRighData[k].radioMode === "802.11g" || that.pieRighData[k].radioMode === "802.11b"){
              that.option.series[0].data[1].value = that.option.series[0].data[1].value + 1;
            }
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
  .box-p{
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
