<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <h2><i class="fa fa-fire text-success"></i><span>园区地点列表</span></h2>
      </div>
      <div class="col-md-12">
        <div class="pull-right mb10">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/space/regional/create')">
            <i class="fa fa-plus"></i>
            <span>添加空间</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-md-12">
        <div v-for="spaceRegional in pager.spaceRegionals" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push('/by/space/regional/detail?id='+spaceRegional.id)">
          <div class="media">

            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push('/by/space/regional/edit?id='+spaceRegional.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="spaceRegional.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{spaceRegional.name}}</span>
              </div>
              <div class="cell-content list-text-restriction">描述:{{spaceRegional.description}}</div>
              <div class="cell-content">
                <span class="mr10">编码：{{spaceRegional.no }}</span>
              </div>
              <div class="mt10">
                地址：{{spaceRegional.address}}
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
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";

  export default{
    data(){
      return {
        pager: new Pager(SpaceRegional),
        spaceRegional: new SpaceRegional()
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
        let that = this;
        this.pager.httpFastPage();
      }
    },
    mounted(){
     //this.pager.enableHistory();
      this.refresh();
    }
  }

</script>
