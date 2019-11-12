<template>
	<div class="row">
		<div class="col-xs-12">
			<NbSlidePanel>

					<span slot="heading" class="text-success f16">
						<i class="fa fa-dot-circle-o"></i>
						付款信息详情
					</span>
				<div slot="body">
          <div class="row">
            <div class="col-md-3">付款项目：</div>
            <div class="col-md-9 bold">
              <router-link :to="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,financeOtherPay.spaceRegional.id)? '/by/project/detail?id='+financeOtherPay.project.id:'/user/project/detail?id='+financeOtherPay.project.id">
                {{financeOtherPay.project.name}}
              </router-link>
            </div>
          </div>

					<div class="row mt10" v-if="financeOtherPay.protocolSpace">
						<div class="col-md-3">关联租赁合同：</div>
						<div class="col-md-9 bold">
							<router-link :to="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,financeOtherPay.spaceRegional.id)? '/by/protocol/space/detail/'+financeOtherPay.protocolSpace.id:'/group/protocol/space/detail/'+financeOtherPay.protocolSpace.id">
								{{financeOtherPay.protocolSpace.name}}
							</router-link>
						</div>
					</div>

          <div class="row mt10">
            <div class="col-md-3 ">园区地点：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.spaceRegional.name}}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 ">创建时间：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.createTime | humanTime}}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 ">通知用户：</div>
            <div class="col-md-9 "><UserProfileLink :user="financeOtherPay.user"/></div>
          </div>

					<div class="row mt10">
						<div class="col-md-3 ">名称：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.name}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-3 ">公司名或负责人：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.companyName}}</b></div>
					</div>

          <div class="row mt10">
            <div class="col-md-3 ">备注：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.remarks}}</b></div>
          </div>

          <!--付款信息-->
					<div class="row mt10">
						<div class="col-md-3 ">收款项名称：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.beneficiaryName }}</b></div>
					</div>

          <div class="row mt10">
            <div class="col-md-3 ">应付合计：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.paymentTotal }}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 ">已付金额：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.rentalPaid }}</b></div>
          </div>

          <div class="row mt10" v-if="financeOtherPay.protocolSpace">
            <div class="col-md-3 ">从履约保证金中扣除：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.deduction }}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 ">应付余额：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.surplusTotal }}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 ">落款时间：</div>
            <div class="col-md-9 "><b>{{financeOtherPay.notifyTime | humanTime }}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 ">状态：</div>
            <div class="col-md-9 ">
              <span :class="'label label-'+financeOtherPay.getStatusStyle()">{{financeOtherPay.getStatusName()}}</span>
            </div>
          </div>
          <!--付款信息-->

					<div class="row mt10">
						<div class="col-md-3 ">开户银行：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.bank }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-3 ">银行户名：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.bankAccount }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-3 ">银行账号：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.bankNo }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-3 ">财务部联系人：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.dutyName }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-3 ">财务部联系电话：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.dutyPhone }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-3 ">财务部地址：</div>
						<div class="col-md-9 "><b>{{financeOtherPay.dutyAddress }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-3 ">PDF下载：</div>
						<div class="col-md-9 ">
							<a class="btn btn-success" target="_blank" :href="financeOtherPay.downloadPdfUrl()">
								<i class="fa fa-file-pdf-o"></i>
								下载
							</a>
						</div>
					</div>

				</div>
			</NbSlidePanel>

		</div>
	</div>
</template>

<script>
	import FinanceOtherPay from  "../../../../../../common/model/finance/FinanceOtherPay"
	import NbSlidePanel from  "../../../../../../common/widget/NbSlidePanel.vue"
  import UserProfileLink from "../../../../widget/UserProfileLink";
	export default{
		data(){
			return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType
			}
		},
		props: {
      financeOtherPay: {
				type: FinanceOtherPay,
				required: true
			}

		},

		components: {
			NbSlidePanel,
      UserProfileLink
		}

	}


</script>
