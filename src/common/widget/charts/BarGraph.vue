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
          xAxis : [
            {
              type : 'category',
              data : ['类1', '类2', '类3', '类4', '类5', '类6', '类7'],//*******************
              axisTick: {alignWithLabel: true}
            }
          ],
          series : [
            {
              name:'全部',//*******************
              type:'bar',
              data:[10, 52, 200, 334, 390, 330, 220]//*******************
            }
          ],
          yAxis : [{type : 'value'}],
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
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
