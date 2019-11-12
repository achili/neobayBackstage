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
                  <input type="number" class="form-control" v-model="company.nationalProjectsNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">当年获得省级以上奖励（万元）</label>
                <div class="col-md-8">
                  <label>
                    <input type="number" class="form-control" v-model="company.provincialAwards">
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">购买（被许可）国外专利数</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.foreignPatentsNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">技术合同交易数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.technicalContractNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">技术合同交易额（万元）</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.technicalContractTradingValue">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">研发加计备案数</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.rdRecordNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">累计工程中心数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectCenterNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">其中累计国家级工程中心数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectCenterNationalNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">其中累计省级工程中心数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectCenterProvinceNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">其中累计市级工程中心数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectCenterCityNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">累计项目数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">其中累计国家级项目数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectNationalNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">其中累计省级项目数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectProvinceNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">其中累计市级项目数量</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.projectCityNum">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">累计获得国家资助经费金额</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.nationalFunding">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">累计获得省级资助经费金额</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.provinceFunding">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5">累计获得市级资助经费金额</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="company.cityFunding">
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

        <NbSlidePanel type="primary" v-for="companyIntellectualInformation in company.companyIntellectualInformations" :key="companyIntellectualInformation.year">
        <span slot="heading">
          <i class="fa fa-leaf"></i>
          年份：{{companyIntellectualInformation.year}}
        </span>
          <div slot="body">

            <div class="row">
              <div class="col-md-12">
                <div class="row">

                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">当年知识产权申请数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.intellectualApplyNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">其中发明专利申请数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.intellectualInventionApplyNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">当年知识产权授权数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.authorizationNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">其中发明专利授权数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.authorizationInventionNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">拥有有效知识产权数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.effectiveIntellectualNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">发明专利数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.effectiveIntellectualInventionNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">软件著作权登记数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.softwareCopyrightNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">植物新品种</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.newPlantNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">集成电路布图设计登记数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.integratedCircuitNum">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5">其他知识产权登记数</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="companyIntellectualInformation.otherPowerNum">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12 text-center mt10">
                <button class="btn btn-danger" role="button" @click="confirmDeleteIntellectualInformation(companyIntellectualInformation)">
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
            <button class="btn btn-success pull-left" role="button" @click="addCompanyIntellectualInformation">
              <i class="fa fa-plus"></i> 增加当年专利版权信息
            </button>

          </div>
        </div>
      </div>
    </NbSlidePanel>



  </div>

</template>
<script>
  import Company from '../../../../common/model/company/Company'
  import CompanyIntellectualInformation from '../../../../common/model/company/CompanyIntellectualInformation'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import {Notification, MessageBox} from 'element-ui';

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
      company: {
        type: Company,
        required: true
      }
		},
		computed: {},
		watch: {},
		methods: {
      showYear(year) {
        let isShow = true;
        this.company.companyIntellectualInformations.forEach(
          function (finance) {
            if(finance.year === year) {
              isShow = false;
              return;
            }
          });
        return isShow;
      },
      confirmDeleteIntellectualInformation(companyIntellectualInformation) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.company.delIntellectualInformation(companyIntellectualInformation);
        }, function () {
        });
      },
      addCompanyIntellectualInformation(){
        if(!this.currentYear || this.currentYear === '') {
          return;
        }
        let companyIntellectualInformation = new CompanyIntellectualInformation();
        companyIntellectualInformation.year = this.currentYear;
        this.company.addCompanyIntellectualInformation(companyIntellectualInformation);
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
