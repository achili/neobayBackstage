<template>
  <div class="wrapper wrapper-content">

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-registered"></i>
      人员结构基本信息
    </span>
      <div slot="body">
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">上年年末从业人员总数</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.lastYearStaffNum"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">博士毕业人数</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.doctorsNum"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">留学归国人员数</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.overseasNum"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">千人计划数</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.thousandsPlanNum"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">应届毕业生</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.freshGraduateNum"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">大专以上毕业人数</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.higherCollegeDegreeNum"/>
          </div>
        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">核心团队人员情况</span>
    </span>
      <div slot="body">
        <NbSlidePanel type="primary" v-for="(companyCore,index) in this.company.companyCores" :key="companyCore.name">
        <span slot="heading">
          <i class="fa fa-user"></i>
          #{{index + 1}} {{companyCore.position}}:{{companyCore.name}}
        </span>
          <div slot="body">
            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">姓名</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.name">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">部门</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.department">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">职位</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.position">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">电话</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.telephone">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">传真</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.fax">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">手机</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.phone">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">证件类型</label>
                  <div class="col-md-8">
                    <select class="form-control" v-model="companyCore.docType">
                      <option>身份证</option>
                      <option>军人证</option>
                      <option>护照</option>
                      <option>其他</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">证件号码</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.docNo">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">电子邮件</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.mail">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">学历</label>
                  <div class="col-md-8">
                    <select class="form-control" v-model="companyCore.education">
                      <option>中专</option>
                      <option>大专</option>
                      <option>本科</option>
                      <option>硕士</option>
                      <option>博士</option>
                      <option>其他</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">目前最高职称</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.highestTitle"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">初次工作年份</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.firstWorkingYear"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否本公司股东</label>
                  <div class="col-md-8">
                    <span>
                        <NbRadio v-model="companyCore.isShareholder" :val="true" :name="'isShareholder' + index"></NbRadio>
                        <label>是</label>
                    </span>
                    <span>
                        <NbRadio v-model="companyCore.isShareholder" :val="false" :name="'isShareholder' + index"></NbRadio>
                        <label>否</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否实际负责人</label>
                  <div class="col-md-8">
                    <span>
                        <NbRadio v-model="companyCore.isPersonLiable" :val="true" :name="'isPersonLiable' + index"></NbRadio>
                        <label>是</label>
                      </span>
                    <span>
                        <NbRadio v-model="companyCore.isPersonLiable" :val="false" :name="'isPersonLiable' + index"></NbRadio>
                        <label>否</label>
                      </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否连续创业</label>
                  <div class="col-md-8">
                    <span>
                        <NbRadio v-model="companyCore.isContinuous" :val="true" :name="'isContinuous' + index"></NbRadio>
                        <label>是</label>
                      </span>
                    <span>
                        <NbRadio v-model="companyCore.isContinuous" :val="false" :name="'isContinuous' + index"></NbRadio>
                        <label>否</label>
                      </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">创业者特征</label>
                  <div class="col-md-8">
                    <select class="form-control" v-model="companyCore.features">
                      <option>大学生创业</option>
                      <option>留学归国人员</option>
                      <option>高校科研院人员</option>
                      <option>大企业离职人员</option>
                      <option>机关事业单位离职人员</option>
                      <option>其他</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否海外引进</label>
                  <div class="col-md-8">
                    <span>
                        <NbRadio v-model="companyCore.isOverseas" :val="true" :name="'isOverseas' + index"></NbRadio>
                        <label>是</label>
                      </span>
                    <span>
                        <NbRadio v-model="companyCore.isOverseas" :val="false" :name="'isOverseas' + index"></NbRadio>
                        <label>否</label>
                      </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否浦江人才</label>
                  <div class="col-md-8">
                    <span>
                        <NbRadio v-model="companyCore.isPujiangTalent" :val="true" :name="'isPujiangTalent' + index"></NbRadio>
                        <label>是</label>
                      </span>
                    <span>
                        <NbRadio v-model="companyCore.isPujiangTalent" :val="false" :name="'isPujiangTalent' + index"></NbRadio>
                        <label>否</label>
                      </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否千人计划</label>
                  <div class="col-md-8">
                    <span>
                        <NbRadio v-model="companyCore.isThousandPlan" :val="true" :name="'isThousandPlan' + index"></NbRadio>
                        <label>是</label>
                      </span>
                    <span>
                        <NbRadio v-model="companyCore.isThousandPlan" :val="false" :name="'isThousandPlan' + index"></NbRadio>
                        <label>否</label>
                      </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5">千人计划批次号</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyCore.thousandPlanCode"/>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否大学生科技企业</label>
                  <div class="col-md-8">
                    <span>
                        <NbRadio v-model="companyCore.isCollegeScience" :val="true" :name="'isCollegeScience' + index"></NbRadio>
                        <label>是</label>
                      </span>
                    <span>
                        <NbRadio v-model="companyCore.isCollegeScience" :val="false" :name="'isCollegeScience' + index"></NbRadio>
                        <label>否</label>
                      </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5">人才落户政策</label>
                  <div class="col-md-10">
                    <NbTank :tank="companyCore.settlePolicy"/>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5">其他人才政策</label>
                  <div class="col-md-10">
                    <NbTank :tank="companyCore.otherPolicy"/>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5">个人简历</label>
                  <div class="col-md-10">
                    <NbTank :tank="companyCore.resume"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 text-center mt10">
            <button class="btn btn-danger" role="button" @click="confirmDeleteCore(companyCore)">
              <i class="fa fa-trash"></i> 删除成员
            </button>
          </div>
        </NbSlidePanel>
      </div>

      <div class="text-center">
        <button class="btn btn-success" role="button" @click="addCompanyCore">
          <i class="fa fa-plus"></i>
          增加成员
        </button>
      </div>
    </NbSlidePanel>


    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-leaf"></i>
      人员分类信息
    </span>
      <div slot="body">
        <div>
          <label class="control-label mt5">按工作性质分</label>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">行政管理人员数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.administrativePersonnelNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">市场营销人员数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.marketingPersonaeNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">研发人员数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.researchPersonnelNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">加工制造人员数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.manufacturingPersonnelNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">其它人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.natureOtherNum"/>
            </div>
          </div>
        </div>

        <div>
          <div class="row mt10">
            <label class="col-md-12 control-label mt5">按学历分</label>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">硕士毕业人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.masterNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">本科毕业人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.undergraduateNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">中专毕业人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.technicalSecondaryNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">其它人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.educationOtherNum"/>
            </div>
          </div>
        </div>

        <div>
          <div class="row mt10">
            <label class="col-md-12 control-label mt5">按技术职称分</label>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">高级职称人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.seniorTitleNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">中级职称人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.intermediateTitleNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">初级职称人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.primaryTitleNum"/>
            </div>
          </div>
          <div class="row mt10">
            <span class="col-md-3 control-label mt5">其它人数</span>
            <div class="col-md-9">
              <NbNumberInput v-model="company.titleOtherNum"/>
            </div>
          </div>
        </div>
      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import {Notification, MessageBox} from 'element-ui';
  import Company from '../../../../common/model/company/Company'
  import CompanyCore from '../../../../common/model/company/CompanyCore'
  import NbTank from '../../../../common/widget/NbTank'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NbNumberInput from "../../../../common/widget/NbNumberInput.vue";
  import NbRadio from "../../../../common/widget/NbRadio.vue";

  export default{
    data () {
			return {}
		},
		components: {
      NbTank,
      NbSlidePanel,
      NbNumberInput,
      NbRadio
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
      addCompanyCore() {
        let companyCore = new CompanyCore();
        this.company.addCore(companyCore);
      },
      confirmDeleteCore(companyCore) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.company.delCore(companyCore);
        }, function () {
        });
      }
//      ,
//      validateFunc(obj){
//        if(!obj.name){
//          this.errorMessage = "成员名称必填！";
//          return false;
//        }
//        if(!obj.department){
//          this.errorMessage = "所在部门必填！";
//          return false;
//        }
//        if(!obj.position){
//          this.errorMessage = "职位必填！";
//          return false;
//        }
//        if(!obj.phone){
//          this.errorMessage = "手机必填！";
//          return false;
//        }
//        if(!obj.docType){
//          this.errorMessage = "证件类型必填！";
//          return false;
//        }
//        if(!obj.docNo){
//          this.errorMessage = "证件号码必填！";
//          return false;
//        }
//        if(!obj.mail){
//          this.errorMessage = "电子邮件必填！";
//          return false;
//        }
//        if(!obj.highestTitle){
//          this.errorMessage = "目前最高职称必填！";
//          return false;
//        }
//        if(!obj.isShareholder){
//          this.errorMessage = "是否本公司股东必填！";
//          return false;
//        }
//        if(!obj.isPersonLiable){
//          this.errorMessage = "是够实际负责人必填！";
//          return false;
//        }
//        if(!obj.isContinuous){
//          this.errorMessage = "是够连续创业必填！";
//          return false;
//        }
//        if(!obj.features){
//          this.errorMessage = "创业者特征必填！";
//          return false;
//        }
//        if(!obj.isOverseas){
//          this.errorMessage = "是否海外引进必填！";
//          return false;
//        }
//        if(!obj.isPujiangTalent){
//          this.errorMessage = "是否浦江人才必填！";
//          return false;
//        }
//        if(!obj.isThousandPlan){
//          this.errorMessage = "是否千人计划必填！";
//          return false;
//        }
//        if(!obj.isCollegeScience){
//          this.errorMessage = "是否大学生科技企业必填！";
//          return false;
//        }
//        return true;
//      }
    },
		mounted(){}
  }

</script>
