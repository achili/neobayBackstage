<template>
  <div class="wrapper wrapper-content">

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">总机构</span>
    </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5 compulsory">控股母公司</label>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="company.parentCompany">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5 compulsory">纳税人识别号</label>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="company.parentTaxpayerCode">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mt10">
              <label class="col-md-4 control-label mt5 compulsory">地址</label>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="company.parentAddress">
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">经营范围（按营业执照）</label>
              <div class="col-md-10">
                <textarea rows="8" class="form-control" v-model="company.parentBusinessScope"></textarea>
              </div>
            </div>
          </div>

        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">分支机构</span>
    </span>
      <div slot="body">
        <NbSlidePanel type="primary" v-for="(companyBranche, index) in this.company.companyBranches" :key="companyBranche.name">
        <span slot="heading">
          <i class="fa fa-user"></i>
          #{{index + 1}} {{companyBranche.name}}
        </span>
          <div slot="body">
            <div class="row">

              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">名称</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyBranche.name">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">地址</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyBranche.address">
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="col-md-12 text-center mt10">
            <button class="btn btn-danger" role="button" @click="confirmDeleteCompanyBranch(companyBranche)">
              <i class="fa fa-trash"></i> 删除投融资信息
            </button>
          </div>
        </NbSlidePanel>
      </div>

      <div class="text-center">
        <button class="btn btn-success" role="button" @click="addCompanyBranch">
          <i class="fa fa-plus"></i>
          增加投融资信息
        </button>
      </div>
    </NbSlidePanel>



  </div>
</template>
<script>
  import Company from '../../../../common/model/company/Company'
  import CompanyBranch from '../../../../common/model/company/CompanyBranch'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import {Notification, MessageBox} from 'element-ui';

  export default{
    data () {
			return {}
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
      confirmDeleteCompanyBranch(companyBranch) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.company.delBranch(companyBranch);
        }, function () {
        });
      },
      addCompanyBranch() {
        let companyBranch = new CompanyBranch();
        this.company.addBranch(companyBranch);
      }
//
//      validateFunc(obj){
//        if(!obj.name){
//          this.errorMessage = "公司名称必填！";
//          return false;
//        }
//        if(!obj.address){
//          this.errorMessage = "公司地址必填！";
//          return false;
//        }
//        return true;
//      }
		},
		mounted(){}
  }


</script>
