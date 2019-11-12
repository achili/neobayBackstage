<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>火炬统计列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/torch2017/create')">
            <i class="fa fa-send"></i>
            <span>创建火炬申请表</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>


      <div class="col-xs-12">
        <div v-for="torch in pager.torch2017s" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push('/by/torch2017/detail/' + torch.id)">

          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑"  @click.stop.prevent="$router.push({ path: 'edit', query: { id: torch.id }})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="torch.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">
              <div class="cell-title">
                <span>企业名称：{{torch.businessName}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>

    </div>

  </div>
</template>

<script>

  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from "../../../../common/model/base/Pager"
  import Torch from "../../../../common/model/torch/Torch2017"

  export default {

    data () {
      return {
        pager: new Pager(Torch),
        torch: new Torch()
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {

      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();

      //默认按照时间倒序排列。
      if (this.pager.getFilter("orderId").isEmpty()) {
        this.pager.setFilter("orderId", "DESC");
      }

      this.refresh();
    }
  }

</script>
