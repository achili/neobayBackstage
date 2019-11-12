<template>
    <div class="row">
      <div class="col-xs-12">
        <NbSlidePanel>
          <span slot="heading" class="text-success f16">
            <i class="fa fa-dot-circle-o"></i>
            电费付款信息详情
          </span>
          <div slot="body">
            <div class="row">
              <div class="col-md-2">关联的租赁合同：</div>
              <div class="col-md-10 bold">
                  <router-link :to="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,financeElectricPay.spaceRegional.id)? '/by/protocol/space/detail/'+financeElectricPay.protocolSpace.id:'/group/protocol/space/detail/'+financeElectricPay.protocolSpace.id">
                    {{financeElectricPay.protocolSpace.name}}
                  </router-link>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">园区地点：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.spaceRegional.name}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">创建时间：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.createTime | humanTime}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">用户：</div>
              <div class="col-md-10 "><UserProfileLink :user="financeElectricPay.user"/></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">合同编号：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.protocolNo}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">租赁空间：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.spaceName}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">名称：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.name}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">承租团队或企业名称：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.companyName}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">合同签约时间：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.signTime | humanTime }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">初始电表读数：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.initialMeter}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">上期电表读数：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.lastMeter}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">本期电表读数：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.currentMeter}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">本期应缴电费度数：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.paymentMeter}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">本期应缴电费金额：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.currentMoney}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">付款所属日期：</div>
              <div class="col-md-10 ">
                <b>
                  {{financeElectricPay.startTime |  date("yyyy/MM/dd")}}
                  -
                  {{financeElectricPay.endTime |  date("yyyy/MM/dd")}}
                </b>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">应付合计：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.paymentTotal }}</b></div>
            </div>

            <div class="row mt10">
                <div class="col-md-2 ">从履约保证金中扣除：</div>
                <div class="col-md-10 "><b>{{financeElectricPay.deduction}}</b></div>
            </div>

            <div class="row mt10">
                <div class="col-md-2 ">应付余额：</div>
                <div class="col-md-10 "><b>{{financeElectricPay.remainTotal }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">开户银行：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.bank }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">银行户名：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.bankAccount }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">银行账号：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.bankNo }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">落款时间：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.notifyTime | humanTime }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">解入银行时间：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.bankTime | humanTime }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">财务部联系人：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.dutyName }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">财务部联系电话：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.dutyPhone }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">财务部地址：</div>
              <div class="col-md-10 "><b>{{financeElectricPay.dutyAddress }}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">状态：</div>
              <div class="col-md-10 ">
                <span :class="'label label-'+financeElectricPay.getStatusStyle()">{{financeElectricPay.getStatusName()}}</span>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 ">PDF下载：</div>
              <div class="col-md-10 ">
                <a class="btn btn-success" target="_blank" :href="financeElectricPay.downloadPdfUrl()">
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

  import NbSlidePanel from  "../../../../../../common/widget/NbSlidePanel.vue"
  import UserProfileLink from "../../../../widget/UserProfileLink";
  import FinanceElectricPay from "../../../../../../common/model/finance/FinanceElectricPay";

    export default {
      data(){
        return{
          user:this.$store.state.user,
          FeatureType: this.$store.state.FeatureType
        }
      },
      computed:{},
      components:{
        NbSlidePanel,
        UserProfileLink
      },
      props:{
        financeElectricPay:{
          type: FinanceElectricPay,
          required:true
        }
      }
    }
</script>

<style scoped>

</style>
