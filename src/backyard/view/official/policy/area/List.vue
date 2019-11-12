<template>
  <div class="animated fadeIn">
    <div class="row mb10">
      <div class="col-xs-12 clearfix">
        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>地区列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/official/policy/area/create')">
            <i class="fa fa-plus"></i>
            <span>地区创建</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="policyArea in pager.officialPolicyAreas" class="bg-white p10 br4 mt10">
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push('/by/official/policy/area/edit/' + policyArea.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="policyArea.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{policyArea.name}}</span>
                <span class="label label-info ml15">{{policyArea.status}}</span>
              </div>

              <div class="cell-content">
                <span class="text-xs mr10">#{{policyArea.id}}</span>
                <span>园区地点：{{policyArea.spaceRegional.name}}</span>
                <span class="text-xs mr10"><i class="fa fa-clock-o"></i> {{policyArea.createTime | simpleDateTime}}</span>
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
  import NbFilter from '../../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from "../../../../../common/model/base/Pager"
  import PolicyArea from "../../../../../common/model/official/OfficialPolicyArea"

  export default {
    data() {
      return {
        pager: new Pager(PolicyArea)
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
    mounted() {
      this.refresh();
    }
  }
</script>
