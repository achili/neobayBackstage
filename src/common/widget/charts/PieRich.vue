<template>
  <div class="broken-line">

    <div ref="main" class="main"></div>

  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        option: {
          title: {
            text: '天气情况统计'//*******************
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: ['西凉', '益州', '兖州', '荆州', '幽州']//*******************
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
                {value: 1548, name: '幽州'},//*******************
                {value: 535, name: '荆州'},//*******************
                {value: 510, name: '兖州'},//*******************
                {value: 634, name: '益州'},//*******************
                {value: 735, name: '西凉'}//*******************
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
        }
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
        })
        window.addEventListener('resize', function() {
          this.myChart.resize()
        }.bind(this))
      }
    },
    components: {},
    mounted() {
      //初始化echarts实例
      this.myChart = echarts.init(this.main, 'light');
      this.myChart.setOption(this.option);
      this.init()
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
      height: 500px;
    }
  }
</style>
