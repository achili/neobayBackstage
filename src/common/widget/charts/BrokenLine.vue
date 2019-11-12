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
          //标题
          title: {
            text: '折线图堆叠'//*******************
          },
          //图例
          legend: {
            data:['邮件营销', '联盟广告','视频广告','直接访问','搜索引擎']
          },
          //X轴
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']//**************时间间隔
          },
          //数据
          series: [
            {
              name:'邮件营销',//*******************
              type:'line',
              data:[120, 132, 101, 134, 90, 230, 210]//*******************
            },
            {
              name:'联盟广告',//*******************
              type:'line',
              data:[220, 182, 191, 234, 290, 330, 310]//*******************
            },
            {
              name:'视频广告',//*******************
              type:'line',
              data:[150, 232, 201, 154, 190, 330, 410]//*******************
            },
            {
              name:'直接访问',//*******************
              type:'line',
              data:[320, 332, 301, 334, 390, 330, 320]//*******************
            },
            {
              name:'搜索引擎',//*******************
              type:'line',
              data:[820, 932, 901, 934, 1290, 1330, 1320]//*******************
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
