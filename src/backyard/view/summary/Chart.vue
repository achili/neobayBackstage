<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <h2><i class="fa fa-fire text-success"></i><span>图表模板列表</span></h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-md-12">
        <div v-for="summaryAnalysis in pager.summaryAnalysises" class="bg-white p10 mt10 cursor br4"
              @click.stop.prevent="$router.push({path: '/by/summary/analysis',query: {id:summaryAnalysis.id }})">

          <div class="media">
            <div class="pull-right action-buttons">
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="summaryAnalysis.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">
              <div class="cell-title">
                <span>{{summaryAnalysis.title}}</span>
              </div>
              <div class="cell-content list-text-restriction">
                {{summaryAnalysis.note}}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="col-md-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>
    </div>

  </div>
</template>

<script>

  import {MessageBox, Notification} from 'element-ui'
  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../common/widget/NbPager.vue'
  import Pager from "../../../common/model/base/Pager";
  import SummaryAnalysis from "../../../common/model/summary/analysis/SummaryAnalysis";


  export default {
    data(){
      return {
        pager: new Pager(SummaryAnalysis)
      }
    },
    components:{
      NbFilter,
      NbPager
    },
    computed:{},
    watch:{},
    methods:{
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>
