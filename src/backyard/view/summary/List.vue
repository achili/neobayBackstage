<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <h2><i class="fa fa-fire text-success"></i><span>汇总统计清单</span></h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-md-12">
        <div v-for="summary in pager.summaries" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push({ path: '/by/summary/result', query: { id: summary.id }})">
          <div class="media">
            <div class="media-body">
              <div class="cell-title">
                <span>{{summary.name}}</span>
              </div>
              <div class="cell-content list-text-restriction">
                {{summary.description}}
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
  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../common/model/base/Pager"
  import Summary from  "../../../common/model/summary/Summary"

  export default{
    data(){
      return {
        pager: new Pager(Summary)
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory()
      this.refresh();
    }
  }

</script>

























