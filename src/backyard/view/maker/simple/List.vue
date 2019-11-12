<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>创客无忧-第三方服务申请表</span>
        </h2>
      </div>

      <!--<div class="pull-right mb20" style="margin-right: 15px;">-->
        <!--<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/maker/simple/apply/create')">-->
          <!--<i class="fa fa-plus"></i>-->
          <!--<span>添加第三方服务申请表</span>-->
        <!--</button>-->
      <!--</div>-->
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="makerSimpleApply in pager.makerSimpleApplies" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: makerSimpleApply.id }})">
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerSimpleApply.id }})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="makerSimpleApply.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body" @click.stop.prevent="$router.push({ path: 'detail', query: { id: makerSimpleApply.id }})">

              <div class="cell-title">
                <span>编号：{{makerSimpleApply.no}}</span>
                <span>申请人: {{makerSimpleApply.leaderName}}</span>
                <span :class="'label label-'+makerSimpleApply.getStatusStyle()">{{makerSimpleApply.getStatusName()}}</span>
                <span v-if="makerSimpleApply.archive" class="label label-danger">已归档</span>
              </div>
              <div class="cell-description">
                <span>所在企业：{{makerSimpleApply.companyName}}</span>
              </div>
              <div class="cell-content">
                <span>项目名称：{{makerSimpleApply.projectName}}</span>
              </div>
              <div class="cell-content">
                <span class="">申请机构：
                  <span class="text-success" @click.stop="$router.push('/by/maker/organization/detail?id=' + makerSimpleApply.makerOrganization.id)">{{makerSimpleApply.makerOrganization.name}}</span>
                </span>
              </div>
              <div class="cell-content">
                <span>申请人电话：{{makerSimpleApply.leaderPhone}}</span>
                <span>创建时间：{{makerSimpleApply.createTime | humanTime }}</span>
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
  import MakerSimpleApply from "../../../../common/model/maker/MakerSimpleApply"

  export default{
    data () {
      return {
        user: this.$store.state.user,
        pager: new Pager(MakerSimpleApply)
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {

    },
    methods: {
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        this.pager.setFilter("orderCreateTime", "DESC");
        this.pager.httpFastPage();
      }
    },
    mounted(){

      this.refresh();
    }
  }


</script>
