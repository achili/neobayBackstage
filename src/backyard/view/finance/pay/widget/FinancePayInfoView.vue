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
						<div class="col-md-2">关联租赁合同：</div>
						<div class="col-md-10 bold">
							<router-link :to="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,financePayInfo.spaceRegional.id)? '/by/protocol/space/detail/'+financePayInfo.protocolSpace.id:'/group/protocol/space/detail/'+financePayInfo.protocolSpace.id">
								{{financePayInfo.protocolSpace.name}}
							</router-link>
						</div>
					</div>

          <div class="row mt10">
            <div class="col-md-2 ">园区地点：</div>
            <div class="col-md-10 "><b>{{financePayInfo.spaceRegional.name}}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-2 ">创建时间：</div>
            <div class="col-md-10 "><b>{{financePayInfo.createTime | humanTime}}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-2 ">用户：</div>
            <div class="col-md-10 "><UserProfileLink :user="financePayInfo.user"/></div>
          </div>


					<div class="row mt10">
						<div class="col-md-2 ">合同编号：</div>
						<div class="col-md-10 "><b>{{financePayInfo.protocolNo}}</b></div>
					</div>

          <div class="row mt10">
            <div class="col-md-2 ">租赁房屋：</div>
            <div class="col-md-10 "><b>{{financePayInfo.spaceName}}</b></div>
          </div>


					<div class="row mt10">
						<div class="col-md-2 ">名称：</div>
						<div class="col-md-10 "><b>{{financePayInfo.name}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">公司名或负责人：</div>
						<div class="col-md-10 "><b>{{financePayInfo.companyName}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">收款计算方式：</div>
						<div class="col-md-10 "><b>{{financePayInfo.getTypeName()}}</b></div>
					</div>



					<div class="row mt10" v-if="financePayInfo.type === Type.MONTH">
						<div class="col-md-2 ">几个月账单：</div>
						<div class="col-md-10 "><b>{{financePayInfo.month}}</b></div>
					</div>

					<div class="row mt10" v-if="financePayInfo.type === Type.DAY">
						<div class="col-md-2 ">几天账单：</div>
						<div class="col-md-10 "><b>{{financePayInfo.day}}</b></div>
					</div>


					<div class="row mt10">
						<div class="col-md-2 ">合同签约时间：</div>
						<div class="col-md-10 "><b>{{financePayInfo.signTime | humanTime}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">租金起算时间：</div>
						<div class="col-md-10 "><b>{{financePayInfo.rentStartTime | humanTime}}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">履约保证金：</div>
						<div class="col-md-10 "><b>{{financePayInfo.deposit}}</b></div>
					</div>

					<div class="row mt10" v-if="financePayInfo.deposit">
						<div class="col-md-2 ">履约保证金时间范围：</div>
						<div class="col-md-10 ">
							<b>
								{{financePayInfo.depositStartTime | humanTime}}
								-
								{{financePayInfo.depositEndTime | humanTime}}
							</b>
						</div>
					</div>


					<div class="row mt10">
						<div class="col-md-2 ">租金/{{financePayInfo.type === Type.MONTH?"月":"天"}}：</div>
						<div class="col-md-10 "><b>{{financePayInfo.rental }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">租金时间范围：</div>
						<div class="col-md-10 ">
							<b>
								{{financePayInfo.startTime | humanTime}}
								-
								{{financePayInfo.endTime | humanTime}}
							</b>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 " v-if="financePayInfo.type === Type.MONTH">{{financePayInfo.month}}个月租金：</div>
						<div class="col-md-2 " v-if="financePayInfo.type === Type.DAY">{{financePayInfo.day}}天租金：</div>
						<div class="col-md-10 "><b>{{financePayInfo.rentalTotal }}</b></div>
					</div>

					<div class="row mt10" v-if="financePayInfo.deposit">
						<div class="col-md-2 ">保证金,租金小计：</div>
						<div class="col-md-10 "><b>{{financePayInfo.stepTotal }}</b></div>
					</div>

					<!--<div class="row mt10">-->
						<!--<div class="col-md-2 ">抵扣金额/{{financePayInfo.type === Type.MONTH?"月":"天"}}：</div>-->
						<!--<div class="col-md-10 "><b>{{financePayInfo.innoToken }}</b></div>-->
					<!--</div>-->
					<div class="row mt10">
						<!--<div class="col-md-2 " v-if="financePayInfo.type === Type.MONTH">{{financePayInfo.month}}个月抵扣金额：</div>-->
						<!--<div class="col-md-2 " v-if="financePayInfo.type === Type.DAY">{{financePayInfo.day}}天抵扣金额：</div>-->
						<div class="col-md-2 ">抵扣总额：</div>
						<div class="col-md-10 "><b>{{financePayInfo.innoTokenTotal}}</b></div>
					</div>

          <div class="row mt10">
            <div class="col-md-2 ">抵扣类型：</div>
            <div class="col-md-10 "><b>{{financePayInfo.innoTokenTypes}}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-2 ">抵扣备注：</div>
            <div class="col-md-10 "><b>{{financePayInfo.innoTokenRemarks}}</b></div>
          </div>

          <div class="row mt10">
            <div class="col-md-2 ">合计：</div>
            <div class="col-md-10 "><b>{{financePayInfo.total }}</b></div>
          </div>


					<div class="row mt10">
						<div class="col-md-2 ">合计：</div>
						<div class="col-md-10 "><b>{{financePayInfo.total }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">大写合计：</div>
						<div class="col-md-10 "><b>{{financePayInfo.capitalTotal }}</b></div>
					</div>



					<div class="row mt10">
						<div class="col-md-2 ">开户银行：</div>
						<div class="col-md-10 "><b>{{financePayInfo.bank }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">银行户名：</div>
						<div class="col-md-10 "><b>{{financePayInfo.bankAccount }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">银行账号：</div>
						<div class="col-md-10 "><b>{{financePayInfo.bankNo }}</b></div>
					</div>


					<div class="row mt10">
						<div class="col-md-2 ">落款时间：</div>
						<div class="col-md-10 "><b>{{financePayInfo.notifyTime | humanTime }}</b></div>
					</div>


					<div class="row mt10">
						<div class="col-md-2 ">财务部联系人：</div>
						<div class="col-md-10 "><b>{{financePayInfo.dutyName }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">财务部联系电话：</div>
						<div class="col-md-10 "><b>{{financePayInfo.dutyPhone }}</b></div>
					</div>

					<div class="row mt10">
						<div class="col-md-2 ">财务部地址：</div>
						<div class="col-md-10 "><b>{{financePayInfo.dutyAddress }}</b></div>
					</div>


					<div class="row mt10">
						<div class="col-md-2 ">状态：</div>
						<div class="col-md-10 ">
							<span :class="'label label-'+financePayInfo.getStatusStyle()">{{financePayInfo.getStatusName()}}</span>
						</div>
					</div>


					<div class="row mt10">
						<div class="col-md-2 ">PDF下载：</div>
						<div class="col-md-10 ">
							<a class="btn btn-success" target="_blank" :href="financePayInfo.downloadPdfUrl()">
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
	import FinancePayInfo from  "../../../../../common/model/finance/FinancePayInfo"
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
  import UserProfileLink from "../../../widget/UserProfileLink";
	export default{
		data(){
			return {
				Type: FinancePayInfo.prototype.Type,
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType
			}
		},
		props: {
			financePayInfo: {
				type: FinancePayInfo,
				required: true
			}

		},

		components: {
			NbSlidePanel,
      UserProfileLink
		}

	}


</script>
