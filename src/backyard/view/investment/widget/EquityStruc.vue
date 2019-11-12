<template>
  <div class="wrapper wrapper-content">

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">股权结构</span>
    </span>
      <div slot="body">
        <NbSlidePanel type="primary" v-for="(investmentEquity,index) in this.investment.investmentEquities" :key="investmentEquity.name">
        <span slot="heading">
          <i class="fa fa-user"></i>
          #{{index + 1}} {{investmentEquity.shareholderType}}:{{investmentEquity.shareholderName}}
        </span>
          <div slot="body">
            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">股东类型</label>
                  <div class="col-md-8">
                    <select v-model="investmentEquity.shareholderType" class="form-control">
                      <option>中国公民</option>
                      <option>外籍公民</option>
                      <option>中国企业法人</option>
                      <option>外国企业法人</option>
                      <option>事业法人</option>
                      <option>社团法人</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">股东名称</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="investmentEquity.shareholderName"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">证件类型</label>
                  <div class="col-md-8">
                    <select v-model="investmentEquity.docType" class="form-control">
                      <option>身份证</option>
                      <option>军人证</option>
                      <option>护照</option>
                      <option>组织机构代码证</option>
                      <option>其他</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">证件号码</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="investmentEquity.idNo"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否上市公司</label>
                  <div class="col-md-8">
                    <div class="col-md-8">
                    <span>
                        <NbRadio v-model="investmentEquity.isList" :val="true" :name="'isList' + index"></NbRadio>
                        <label>是</label>
                    </span>
                      <span>
                        <NbRadio v-model="investmentEquity.isList" :val="false" :name="'isList' + index"></NbRadio>
                        <label>否</label>
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否入选千人计划</label>
                  <div class="col-md-8">
                    <div class="col-md-8">
                    <span>
                        <NbRadio v-model="investmentEquity.isThousandPlan" :val="true" :name="'isThousandPlan' + index"></NbRadio>
                        <label>是</label>
                    </span>
                      <span>
                        <NbRadio v-model="investmentEquity.isThousandPlan" :val="false" :name="'isThousandPlan' + index"></NbRadio>
                        <label>否</label>
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">所占股份</label>
                  <div class="col-md-8">
                    <NbNumberInput v-model="investmentEquity.stockProportion"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">投资总额（万元）</label>
                  <div class="col-md-8">
                    <NbNumberInput v-model="investmentEquity.totalInvestment"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否境外公司或外籍</label>
                  <div class="col-md-8">
                    <div class="col-md-8">
                    <span>
                        <NbRadio v-model="investmentEquity.isAbroad" :val="true" :name="'isAbroad' + index"></NbRadio>
                        <label>是</label>
                    </span>
                      <span>
                        <NbRadio v-model="investmentEquity.isAbroad" :val="false" :name="'isAbroad' + index"></NbRadio>
                        <label>否</label>
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">外资部分所占股份总和（%）</label>
                  <div class="col-md-8">
                    <NbNumberInput v-model="investmentEquity.foreignCapitalProportion"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">上市企业所占股份总额（%）</label>
                  <div class="col-md-8">
                    <NbNumberInput v-model="investmentEquity.listStockProportion"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">是否风险投资（基金公司）</label>
                  <div class="col-md-8">
                    <div class="col-md-8">
                    <span>
                        <NbRadio v-model="investmentEquity.isRiskInvestmentEnterprise" :val="true" :name="'isRiskInvestmentEnterprise' + index"></NbRadio>
                        <label>是</label>
                    </span>
                      <span>
                        <NbRadio v-model="investmentEquity.isRiskInvestmentEnterprise" :val="false" :name="'isRiskInvestmentEnterprise' + index"></NbRadio>
                        <label>否</label>
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">第一投资时间</label>
                  <div class="col-md-8">
                    <el-date-picker v-model="investmentEquity.firstInvestmentTime" type="date" placeholder="选择日期时间"></el-date-picker>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12 text-center mt10">
              <button class="btn btn-danger" role="button" @click="confirmDeleteEquity(investmentEquity)">
                <i class="fa fa-trash"></i>
                移除股东
              </button>
            </div>
          </div>
        </NbSlidePanel>
        <div class="text-center">
          <button class="btn btn-primary" role="button" @click="addEquity">
            <i class="fa fa-plus"></i>
            增加股东
          </button>
        </div>
      </div>
    </NbSlidePanel>
  </div>
</template>
<script>
  import {Notification, MessageBox} from 'element-ui';
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NbNumberInput from "../../../../common/widget/NbNumberInput.vue";
  import NbRadio from "../../../../common/widget/NbRadio.vue";
  import Investment from "../../../../common/model/investment/Investment";
  import InvestmentEquity from "../../../../common/model/investment/InvestmentEquity";

  export default{
    data () {
      return {}
    },
    components: {
      NbSlidePanel,
      NbNumberInput,
      NbRadio
    },
    props:{
      investment: {
        type: Investment,
        required:true
      }
    },
    computed: {},
    watch: {},
    methods: {
      addEquity() {
        let investmentEquity = new InvestmentEquity();
        this.investment.addEquity(investmentEquity);
      },
      confirmDeleteEquity(equity) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.investment.delEquity(equity);
        }, function () {
        });
      }
    },
//      validateFunc(obj){
//        if(!obj.shareholderType){
//          this.errorMessage = "股东类型必填！";
//          return false;
//        }
//        if(!obj.shareholderName){
//          this.errorMessage = "股东名称必填！";
//          return false;
//        }
//        if(!obj.stockProportion){
//          this.errorMessage = "所占股份必填！";
//          return false;
//        }
//        if(!obj.totalInvestment){
//          this.errorMessage = "投资总额必填！";
//          return false;
//        }
//        if(!obj.firstInvestmentTime){
//          this.errorMessage = "第一投资时间必填！";
//          return false;
//        }
//        if(!obj.docType){
//          this.errorMessage = "证件类型必填！";
//          return false;
//        }
//        if(!obj.idNo){
//          this.errorMessage = "证件号码必填！";
//          return false;
//        }
//        if(!obj.isList){
//          this.errorMessage = "是否上市公司必填！";
//          return false;
//        }
//        if(!obj.isThousandPlan){
//          this.errorMessage = "是否入选千人计划必填！";
//          return false;
//        }
//        if(!obj.isAbroad){
//          this.errorMessage = "是否境外公司或外籍必填！";
//          return false;
//        }
//        if(!obj.foreignCapitalProportion){
//          this.errorMessage = "外资部分所占股份总和必填！";
//          return false;
//        }
//        if(!obj.listStockProportion){
//          this.errorMessage = "上市企业所占股份总和必填！";
//          return false;
//        }
//        if(!obj.isRiskInvestmentEnterprise){
//          this.errorMessage = "必填！";
//          return false;
//        }
//
//        return true;
//      }
//		},
    mounted(){}
  }
</script>
