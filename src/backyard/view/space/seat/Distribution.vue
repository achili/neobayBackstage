<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <h2><i class="fa fa-fire text-success"></i><span>工位分配</span></h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-md-12">
        <div v-for="spaceSeat in pager.spaceSeats" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push({ path: '/by/space/seat/detail', query: { id: spaceSeat.id }})">
          <div class="media">
            <div class="media-body">
              <div class="cell-title">
                <span>{{spaceSeat.name}}</span>
                <span :class="'label label-'+spaceSeat.getTypeStyle()">{{spaceSeat.getTypeName()}}</span>
                <span :class="'label label-'+spaceSeat.getStatusStyle()">{{spaceSeat.getStatusName()}}</span>
              </div>

              <div class="cell-content list-text-restriction">{{spaceSeat.description}}</div>
              <div class="mr10">分配项目：{{spaceSeat.project.name}}
                <span class="mr10" v-if="!spaceSeat.project.name"><span class="text-danger">未分配！</span></span>
                <span>园区地点：{{spaceSeat.spaceRegional.name}}</span>
              </div>
              <div class="cell-content list-text-restriction">
                <span class="mr10" v-if="spaceSeat.remark">备注：{{spaceSeat.remark}}</span>
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
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../../common/model/base/Pager"
  import SpaceSeat from  "../../../../common/model/space/SpaceSeat"

  export default{
    data(){
      return {
        pager: new Pager(SpaceSeat)
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
      this.pager.enableHistory();
      this.refresh();
    }
  }

</script>

























