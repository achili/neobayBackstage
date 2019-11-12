<template>
  <div>
    <div class="row demo-explain">
      <div class="col-xs-12">
        <div class="alert alert-info introduce">
          <h2>引用 Echarts.</h2>
          <p>封装成适合统计汇总</p>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-12">

        <BrokenLine></BrokenLine>

      </div>

      <div class="col-md-6">

        <PieRich></PieRich>

      </div>

      <div class="col-md-6">

        <BarGraph></BarGraph>

      </div>
    </div>

    <div>
      <button class="btn btn-primary" @click="click">请求数据</button>
    </div>

    <div class="row">
      <div class="col-md-12">

        <NbAnalysisCharts :summaryAnalysisResult="result"></NbAnalysisCharts>

      </div>
    </div>

  </div>
</template>

<script>

  import BrokenLine from '../../../common/widget/charts/BrokenLine.vue'
  import PieRich from '../../../common/widget/charts/PieRich'
  import BarGraph from '../../../common/widget/charts/BarGraph'
  import NbAnalysisCharts from '../../../common/widget/charts/NbAnalysisCharts'

  import SummaryAnalysisResult from "../../../common/model/summary/analysis/SummaryAnalysisResult"
  import SummaryAnalysis from "../../../common/model/summary/analysis/SummaryAnalysis"

  export default {
    data() {
      return {
        result: new SummaryAnalysisResult(),
        summaryAnalysis: new SummaryAnalysis()
      }
    },
    props: {},
    components: {
      BrokenLine,
      PieRich,
      BarGraph,
      NbAnalysisCharts
    },
    computed: {},
    watch: {},
    methods: {
      click() {
        let that = this;
        this.summaryAnalysis.httpReport(function (result) {
          that.result = result;
        })
      }
    },
    mounted() {}
  }
</script>

<style lang="less">

</style>
