<template>
  <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">企业资质</span>
    </span>
    <div slot="body">
      <NbSlidePanel type="primary" v-for="(companyQualification, index) in this.company.companyQualifications" :key="companyQualification.name">
        <span slot="heading">
          <i class="fa fa-user"></i>
          #{{index + 1}} {{companyQualification.identificationMechanism}}
        </span>
        <div slot="body">
          <div class="row">

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">认定机构</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" v-model="companyQualification.identificationMechanism">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">编号</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" v-model="companyQualification.identificationNo">
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">认定年份</label>
                <div class="col-md-8">
                  <el-date-picker v-model="companyQualification.identificationTime" type="date" placeholder="选择日期时间"></el-date-picker>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">复核/验收年份</label>
                <div class="col-md-8">
                  <el-date-picker v-model="companyQualification.reviewTime" type="date" placeholder="选择日期时间"></el-date-picker>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">资助资金（万元）</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="companyQualification.grantFunds">
                </div>
              </div>
            </div>




          </div>
        </div>

        <div class="col-md-12 text-center mt10">
          <button class="btn btn-danger" role="button" @click="confirmDeleteCompanyQualification(companyQualification)">
            <i class="fa fa-trash"></i> 删除投融资信息
          </button>
        </div>
      </NbSlidePanel>
    </div>

    <div class="text-center">
      <button class="btn btn-success" role="button" @click="addCompanyQualification">
        <i class="fa fa-plus"></i>
        增加投融资信息
      </button>
    </div>
  </NbSlidePanel>
</template>
<script>
  import Company from '../../../../common/model/company/Company'
  import CompanyQualification from '../../../../common/model/company/CompanyQualification'
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
		props:{
      company: {
        type: Company,
        required:true
      }
		},
		computed: {},
		watch: {},
		methods: {
      confirmDeleteCompanyQualification(companyQualification) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.company.delQualifications(companyQualification);
        }, function () {
        });
      },
      addCompanyQualification() {
        let companyQualification = new CompanyQualification();
        this.company.addQualifications(companyQualification);
      }

//
//      validateFunc(obj){
//        if(!obj.identificationMechanism){
//          this.errorMessage = "认定机构必填！";
//          return false;
//        }
//        if(!obj.identificationNo){
//          this.errorMessage = "编号必填！";
//          return false;
//        }
//        if(!obj.identificationTime){
//          this.errorMessage = "认定年份必填！";
//          return false;
//        }
//        if(!obj.reviewTime){
//          this.errorMessage = "复核/验收年份必填！";
//          return false;
//        }
//        if(!obj.grantFunds){
//          this.errorMessage = "资助资金必填！";
//          return false;
//        }
//        return true;
//      }
		},
		mounted(){}
  }

</script>
