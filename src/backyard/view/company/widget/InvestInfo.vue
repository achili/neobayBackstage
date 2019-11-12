<template>
  <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">投融资</span>
    </span>
    <div slot="body">
      <NbSlidePanel type="primary" v-for="(companyInvestment, index) in this.company.companyInvestments" :key="companyInvestment.name">
        <span slot="heading">
          <i class="fa fa-user"></i>
          #{{index + 1}} {{companyInvestment.investmentPeople}}
        </span>
        <div slot="body">
          <div class="row">

            <div class="col-md-12">
              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">接受投资时间</label>
                <div class="col-md-4">
                  <el-date-picker v-model="companyInvestment.investmentTime" type="date"
                                  placeholder="选择日期时间"></el-date-picker>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">投资人</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" v-model="companyInvestment.investmentPeople">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">投资金额（万元）</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="companyInvestment.investmentValue">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">占股权比重</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="companyInvestment.shareRatio">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">账面估值（万元）</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="companyInvestment.valuation">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">是否属于孵化基金</label>
                <div class="col-md-8">
                  <label class="checkbox-inline">
                    <NbRadio :name="'isHatchFund' + index" :val="true" v-model="companyInvestment.isHatchFund"/>是
                  </label>
                  <label class="checkbox-inline">
                    <NbRadio :name="'isHatchFund' + index" :val="false" v-model="companyInvestment.isHatchFund"/>否
                  </label>
                </div>
              </div>
            </div>


          </div>
        </div>

        <div class="col-md-12 text-center mt10">
          <button class="btn btn-danger" role="button" @click="confirmDeleteCompanyInvestment(companyInvestment)">
            <i class="fa fa-trash"></i> 删除投融资信息
          </button>
        </div>
      </NbSlidePanel>
    </div>

    <div class="text-center">
      <button class="btn btn-success" role="button" @click="addCompanyInvestment">
        <i class="fa fa-plus"></i>
        增加投融资信息
      </button>
    </div>
  </NbSlidePanel>


</template>
<script>
	import Company from '../../../../common/model/company/Company'
	import CompanyInvestment from '../../../../common/model/company/CompanyInvestment'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NbRadio from '../../../../common/widget/NbRadio.vue'
  import {Notification, MessageBox} from 'element-ui';

	export default{
		data () {
			return {}
		},
		components: {
      NbSlidePanel,
      NbRadio
    },
		props: {
			company: {
				type: Company,
				required: true
			}
		},
		computed: {},
		watch: {},
		methods: {
      confirmDeleteCompanyInvestment(companyInvestment) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.company.delInvest(companyInvestment);
        }, function () {
        });
      },
      addCompanyInvestment() {
        let companyInvestment = new CompanyInvestment();
        this.company.addInvest(companyInvestment);
      }
//
//			validateFunc(obj){
//				if (!obj.investmentTime) {
//					this.errorMessage = "接受投资时间必填！";
//					return false;
//				}
//				if (!obj.investmentPeople) {
//					this.errorMessage = "投资人必填！";
//					return false;
//				}
//				if (!obj.investmentValue) {
//					this.errorMessage = "投资金额必填！";
//					return false;
//				}
//				if (!obj.shareRatio) {
//					this.errorMessage = "占股权比重必填！";
//					return false;
//				}
//				if (!obj.valuation) {
//					this.errorMessage = "账面估值必填！";
//					return false;
//				}
//				if (!obj.isHatchFund) {
//					this.errorMessage = "是否属于孵化基金必填！";
//					return false;
//				}
//				return true;
//			}
		},
		mounted(){
		}
	}

</script>
