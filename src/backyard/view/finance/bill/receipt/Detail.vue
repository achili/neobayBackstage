<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12">
        <LoadingFrame :loading="financeBillReceipt.detailLoading">
          <div class="text-right mb10" v-if="false">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push('/by/finance/bill/receipt/edit/' + financeBillReceipt.id)">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>


          <div class="row">

            <div class="col-xs-12">

              <NbSlidePanel>

                  <span slot="heading" class="text-success f16">
                    <i class="fa fa-dot-circle-o"></i>
                    已收账款详情
                  </span>
                <div slot="body">

                  <div class="row">
                    <div class="col-md-3">关联租赁协议：</div>
                    <div class="col-md-9 bold">
                      <router-link :to="'/by/protocol/space/detail/'+financeBillReceipt.protocolSpace.id">
                        {{financeBillReceipt.protocolSpace.name}}
                      </router-link>
                    </div>
                  </div>

                  <span v-if="financeBillReceipt.financePayInfo">
                    <div class="row mt10">
                      <div class="col-md-3">关联付款信息单：</div>
                      <div class="col-md-9 bold">
                        <router-link :to="'/by/finance/pay/info/detail/'+financeBillReceipt.financePayInfo.id">
                          {{financeBillReceipt.financePayInfo.name}}
                       </router-link>
                      </div>
                   </div>
                  </span>

                  <span v-if="financeBillReceipt.financeElectricPay.id">
                   <div class="row mt10">
                     <div class="col-md-3">关联电费付款信息单：</div>
                      <div class="col-md-9 bold">
                       <router-link :to="'/by/finance/electric/pay/detail/'+financeBillReceipt.financeElectricPay.id">
                          {{financeBillReceipt.financeElectricPay.name}}
                       </router-link>
                      </div>
                   </div>
                  </span>

                  <div class="row mt10">
                    <div class="col-md-3 ">名称：</div>
                    <div class="col-md-9 "><b>{{financeBillReceipt.name}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">通知用户：</div>
                    <div class="col-md-9 "><UserProfileLink :user="financeBillReceipt.user"/></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">付款方公司或负责人：</div>
                    <div class="col-md-9 "><b>{{financeBillReceipt.companyName}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">金额：</div>
                    <div class="col-md-9 "><b>{{financeBillReceipt.amount}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">收款时间：</div>
                    <div class="col-md-9 "><b>{{financeBillReceipt.receiveTime | humanTime}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">收款类别：</div>
                    <div class="col-md-9 ">
                      <span :class="'label label-'+financeBillReceipt.getCategoryStyle()">
                        {{financeBillReceipt.getCategoryName()}}
                      </span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">支付方式：</div>
                    <div class="col-md-9 ">
                      <span :class="'label label-'+financeBillReceipt.getTypeStyle()">
                        {{financeBillReceipt.getTypeName()}}
                      </span>
                    </div>
                  </div>

                  <div v-if="financeBillReceipt.type === financeBillReceipt.Type.BANK">
                    <div class="row mt10">
                      <div class="col-md-3 ">付款银行：</div>
                      <div class="col-md-9 "><b>{{financeBillReceipt.partyBBank}}</b></div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3 ">付款银行户名：</div>
                      <div class="col-md-9 "><b>{{financeBillReceipt.partyBBankAccount}}</b></div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3 ">付款银行账号：</div>
                      <div class="col-md-9 "><b>{{financeBillReceipt.partyBBankNo}}</b></div>
                    </div>

                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">备注：</div>
                    <div class="col-md-9 "><b>{{financeBillReceipt.remark}}</b></div>
                  </div>


                </div>
              </NbSlidePanel>

            </div>

          </div>
        </LoadingFrame>
      </div>
      <div class="col-xs-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>

  </div>
</template>
<script>
	import {MessageBox, Notification as NotificationBox} from 'element-ui'

	import FinanceBillReceipt from  "../../../../../common/model/finance/FinanceBillReceipt"
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
	import NbExpanding from  "../../../../../common/widget/NbExpanding.vue"
	import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue"
  import UserProfileLink from "../../../widget/UserProfileLink";
  import LoadingFrame from "../../../widget/LoadingFrame";

	export default{
		data(){
			return {
				financeBillReceipt: new FinanceBillReceipt()
			}
		},
		computed: {},
		components: {
			NbSlidePanel,
			NbExpanding,
			NbBtnDropdown,
      LoadingFrame,
      UserProfileLink
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.financeBillReceipt.id = this.$store.state.route.params.id;
				if (this.financeBillReceipt.id) {
					this.financeBillReceipt.httpDetail(function () {
						that.currentStatus = that.financeBillReceipt.status;
					});
				}
			}
		},
		mounted(){
			this.fetchDetail();
		}
	}
</script>
