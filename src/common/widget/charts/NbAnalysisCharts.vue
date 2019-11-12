<template>
  <div class="nb-analysis-charts">
    <div class="row mt10">
      <div class="col-md-12">
        <CreateSaveButton :entity="summaryAnalysis" @click="refresh" createText="生成图表" saveText="生成图表" createIcon="fa fa-check"  :callback="refresh"></CreateSaveButton>
      </div>
    </div>

    <div class="f16"><i class="fa fa-bar-chart"></i>图表：</div>

    <div>
      <button v-show="result.type === result.Type.PIE_RICH" class="btn btn-primary" @click="changeBar"><i class="fa fa-exchange"></i>柱状图</button>
      <button v-show="result.type === result.Type.BAR_GRAPH" class="btn btn-primary" @click="changePie"><i class="fa fa-exchange"></i>饼图</button>
    </div>

    <div class="wp100 h-300" v-show="summaryAnalysis.loading">
      <div class="mt100 text-center">
        <i class="f50 fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>
      <div class="mt10 text-center">
        正在拼命计算中...
      </div>
    </div>

    <div v-show="!summaryAnalysis.loading">

      <div class="card blue" v-show="result.type === result.Type.NONE && !isShow">
        <div class="title">
          <i class="fa fa-user"></i>
          {{result.title}}
        </div>
        <div class="content">
          {{result.option.value}}
        </div>
      </div>

    </div>

    <div  ref="main" v-show="isShow" class="main"></div>



  </div>
</template>

<script>
  import echarts from 'echarts'
  import SummaryAnalysisResult from "../../model/summary/analysis/SummaryAnalysisResult"
  import SummaryAnalysis from "../../model/summary/analysis/SummaryAnalysis"
  import CreateSaveButton from "../../../backyard/view/widget/CreateSaveButton.vue"

  export default {
    data() {
      return {
        result: new SummaryAnalysisResult(),
        isShow: true
      }
    },
    props: {
      summaryAnalysis: {
        type: SummaryAnalysis,
        required: true
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
      },
      refresh() {

        let that = this;
        this.summaryAnalysis.httpReport(function (result) {
          that.result = result;
          if(that.result.type !== that.result.Type.NONE) {
            that.isShow = true;
            that.myChart = echarts.init(that.main, 'light');
            that.myChart.setOption(that.result.option, true);

            setTimeout(function () {
              that.myChart.resize();
            }, 200);

          } else {
            that.isShow = false;
          }
        })
      },
      sss() {
        this.myChart.resize();
      },
      changeBar() {
        this.result.type =  this.result.Type.BAR_GRAPH;
        this.result.getOption();
        this.myChart.setOption(this.result.option, true);
        this.init()
      },
      changePie() {
        this.result.type =  this.result.Type.PIE_RICH;
        this.result.getOption();
        this.myChart.setOption(this.result.option, true);
        this.init()
      }
    },
    components: {
      CreateSaveButton
    },
    mounted() {

    }
  }

</script>


<style lang="less">
  @import "../../../common/assets/css/global/variables";
  .nb-analysis-charts {

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
    .card {
      max-width: 400px;
      background-color: @neobay-light-yellow;
      margin: 10px 0;
      cursor: pointer;

      .title {
        color: white;
        background-color: @neobay-yellow;
        text-align: center;
        line-height: 44px;
        font-size: 18px;
      }
      .content {
        color: white;
        line-height: 100px;
        font-size: 42px;
        text-align: center;
      }

      &.blue {
        background-color: @neobay-light-blue;
        .title {
          background-color: @neobay-blue;
        }
      }
    }

  }
</style>


