<template>
  <div class="wrapper wrapper-content">

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-leaf"></i>
      基本信息
    </span>
      <div slot="body">
        <div class="row">

          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">当年承担国家级科技计划数</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.nationalNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">当年获得省级以上奖励（万元）</label>
              <div class="col-md-8">
                <label>
                  <input type="number" class="form-control" v-model="investment.provincialAwards">
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">购买（被许可）国外专利数</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.foreignPatentsNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">技术合同交易数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.technicalContractNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">技术合同交易额（万元）</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.technicalContractTradingValue">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">研发加计备案数</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.rdRecordNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">累计工程中心数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectCenterNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">其中累计国家级工程中心数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectCenterNationalNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">其中累计省级工程中心数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectCenterProvinceNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">其中累计市级工程中心数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectCenterCityNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">累计项目数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">其中累计国家级项目数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectNationalNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">其中累计省级项目数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectProvinceNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">其中累计市级项目数量</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.projectCityNum">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">累计获得国家资助经费金额</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.nationalFunding">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">累计获得省级资助经费金额</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.provinceFunding">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5">累计获得市级资助经费金额</label>
              <div class="col-md-8">
                <input type="number" class="form-control" v-model="investment.cityFunding">
              </div>
            </div>
          </div>


        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-leaf"></i>
      专利版权
    </span>
      <div slot="body">

        <NbSlidePanel type="primary" v-for="investmentPatentCopyright in investment.investmentPatentCopyrights" :key="investmentPatentCopyright.year">
        <span slot="heading">
          <i class="fa fa-leaf"></i>
          年份：{{investmentPatentCopyright.year}}
        </span>
          <div slot="body">

            <div class="row">
              <div class="col-md-12">
                <div class="row">

                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">当年知识产权申请数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.intellectualApplyNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">其中发明专利申请数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.intellectualInventionApplyNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">当年知识产权授权数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.authorizationNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">其中发明专利授权数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.authorizationInventionNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">拥有有效知识产权数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.effectiveIntellectualNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">发明专利数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.effectiveIntellectualInventionNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">软件著作权登记数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.softwareCopyrightNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">植物新品种</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.newPlantNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">集成电路布图设计登记数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.integratedCircuitNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">其他知识产权登记数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="investmentPatentCopyright.otherPowerNum">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12 text-center mt10">
                <button class="btn btn-danger" role="button" @click="confirmDeleteIntellectualInformation(investmentPatentCopyright)">
                  <i class="fa fa-trash"></i> 删除该年专利版权信息
                </button>
              </div>
            </div>
          </div>

        </NbSlidePanel>

        <div class="row">
          <div class="col-md-6">
            <select class="form-control w150 pull-right"  v-model="currentYear">
              <option value="">请选择年份</option>
              <option v-for="year in years" v-if="showYear(year)">{{year}}</option>
            </select>
          </div>
          <div class="col-md-6">
            <button class="btn btn-success pull-left" role="button" @click="addInvestmentPatent">
              <i class="fa fa-plus"></i> 增加当年专利版权信息
            </button>

          </div>
        </div>
      </div>
    </NbSlidePanel>



  </div>

</template>
<script>
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import {Notification, MessageBox} from 'element-ui';
  import Investment from "../../../../common/model/investment/Investment";
  import InvestmentPatentCopyright from "../../../../common/model/investment/InvestmentPatentCopyright";

  export default{
    data () {
      return {
        years: [],
        currentYear: ""
      }
    },
    components: {
      NbSlidePanel
    },
    props:{
      investment: {
        type: Investment,
        required: true
      }
    },
    computed: {},
    watch: {},
    methods: {
      showYear(year) {
        let isShow = true;
        this.investment.investmentPatentCopyrights.forEach(
          function (finance) {
            if(finance.year === year) {
              isShow = false;
              return;
            }
          });
        return isShow;
      },
      confirmDeleteIntellectualInformation(investmentPatentCopyright) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.investment.delPatent(investmentPatentCopyright);
        }, function () {
        });
      },
      addInvestmentPatent(){
        if(!this.currentYear || this.currentYear === '') {
          return;
        }
        let investmentPatentCopyright = new InvestmentPatentCopyright();
        investmentPatentCopyright.year = this.currentYear;
        this.investment.addPatent(investmentPatentCopyright);
        this.currentYear = "";
      }
    },
    mounted(){
      let currentYear = new Date().getFullYear();
      for(let i = 0; i < 5; i++) {
        this.years.push((currentYear - i) + '');
      }
    }
  }

</script>
