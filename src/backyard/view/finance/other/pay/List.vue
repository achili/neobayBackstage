<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>其他付款信息列表</span>
        </div>

        <div class="pull-right" >
          <button class="btn btn-primary" @click.stop.prevent="$router.push('create/')" v-if="user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_MANAGE)">
            <i class="fa fa-plus"></i>
            <span>创建其他付款信息</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">


        <div v-for="financeOtherPay in pager.financeOtherPays" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push('detail/'+financeOtherPay.id)">
          <div class="media">

            <div class="pull-right action-buttons">
              <a v-if="financeOtherPay.canEdit()" title="编辑"
                 @click.stop.prevent="$router.push('/by/finance/other/pay/edit/'+financeOtherPay.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a v-if="financeOtherPay.canDel()" href="javascript:void(0)" title="删除"
                 @click.stop.prevent="financeOtherPay.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{financeOtherPay.name}}</span>
                <span :class="'label label-'+financeOtherPay.getStatusStyle()">{{financeOtherPay.getStatusName()}}</span>
              </div>

              <span class="cell-content mt5">
                  付款项目：
                  <router-link
                    :to="user.hasPermissionSpace($store.state.FeatureType.PROJECT_MANAGE,financeOtherPay.spaceRegional.id)? {path: '/by/project/detail', query: { id: financeOtherPay.project.id }}:{path: '/group/project/detail', query: { id: financeOtherPay.project.id }}">{{financeOtherPay.project.name}}
                  </router-link>
                </span>

              <div class="cell-content">
                应付余额：{{financeOtherPay.surplusTotal}}
              </div>

              <div class="cell-content" v-show="financeOtherPay.remarks">
                备注：{{financeOtherPay.remarks}}
              </div>

              <div class="cell-content">
                <span class="mr10">通知用户: <UserProfileLink :user="financeOtherPay.user"/></span>
                <span class="mr10"><i class="fa fa-clock-o"></i> {{financeOtherPay.createTime | humanTime}}</span>
                <span>园区地点：{{financeOtherPay.spaceRegional.name}}</span>
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

  import Pager from  "../../../../../common/model/base/Pager"
  import FinanceOtherPay from "../../../../../common/model/finance/FinanceOtherPay"
  import UserProfileLink from "../../../widget/UserProfileLink";

  export default{
    data() {
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        pager: new Pager(FinanceOtherPay)
      }
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
    components: {
      NbFilter,
      NbPager,
      UserProfileLink
    },
    mounted() {
      this.pager.enableHistory();
      //默认按照时间倒序排列。
      if (this.pager.getFilter("orderId").isEmpty()) {
        this.pager.setFilter("orderId", "DESC");
      }
      this.refresh();
    }
  }
</script>

