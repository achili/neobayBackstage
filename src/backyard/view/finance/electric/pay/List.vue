<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>电费付款信息列表</span>
        </div>
        <div class="pull-right" v-if="user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_MANAGE)">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/finance/electric/pay/create')">
            <i class="fa fa-plus"></i>
            <span>创建电费付款信息</span>
          </button>
        </div>
      </div>
    </div>
    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">

        <div v-for="financeElectricPay in pager.financeElectricPays" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push('detail/'+financeElectricPay.id)" >
          <div class="media">

            <div class="pull-right action-buttons">
              <a v-if="financeElectricPay.canEdit()" title="编辑"
                 @click.stop.prevent="$router.push('/by/finance/electric/pay/edit/'+financeElectricPay.id)">
                <i title="fa fa-pencil text-info f20"></i>
              </a>
              <a v-if="financeElectricPay.canDel()" href="javascript:void(0)" title="删除"
                 @click.stop.prevent="financeElectricPay.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{financeElectricPay.name}}</span>
                <span v-if="financeElectricPay.archive" class="label label-danger">已归档</span>
                <span :class="'label label-'+financeElectricPay.getStatusStyle()">{{financeElectricPay.getStatusName()}}</span>
              </div>
              <div class="cell-content">
                付款合同：
                <span class="text-success" @click.stop="$router.push('/by/protocol/space/detail/'+financeElectricPay.protocolSpace.id)">
                  {{financeElectricPay.protocolSpace.name}}
                </span>
                <span :class="'label label-'+financeElectricPay.protocolSpace.getStatusStyle()">{{financeElectricPay.protocolSpace.getStatusName()}}</span>
              </div>
              <div class="cell-content">
                付款所属日期：{{financeElectricPay.startTime | humanTime}} 到 {{financeElectricPay.endTime | humanTime}}
              </div>
              <div class="cell-control">
                <span class="mr10">被通知用户: <UserProfileLink :user="financeElectricPay.user"/></span>
                <span class="mr10"><i class="fa fa-clock-o"></i> {{financeElectricPay.createTime | humanTime}}</span>
                <span>园区地点:{{financeElectricPay.spaceRegional.name}}</span>
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
    import Pager from "../../../../../common/model/base/Pager";
    import FinanceElectricPay from "../../../../../common/model/finance/FinanceElectricPay";
    import {MessageBox, Notification} from 'element-ui'
    import NbFilter from '../../../../../common/widget/filter/NbFilter.vue'
    import NbPager from '../../../../../common/widget/NbPager.vue'
    import UserProfileLink from "../../../widget/UserProfileLink";


    export default {
       data(){
         return {
           user: this.$store.state.user,
           FeatureType: this.$store.state.FeatureType,
           pager: new Pager(FinanceElectricPay)
         }
       },
      computed:{},
      watch:{
        "$route"(){
          this.pager.page = 0;
          this.pager.resetFilter();
          this.pager.enableHistory();
          this.refresh();
        }
      },
      components:{
        NbFilter,
        NbPager,
        UserProfileLink
      },
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
        //默认按照时间倒序排列。
        if (this.pager.getFilter("orderId").isEmpty()) {
          this.pager.setFilter("orderId", "DESC");
        }
        this.pager.setFilter("archive", false);
        this.refresh();
      }

    }
</script>

<style scoped>

</style>
