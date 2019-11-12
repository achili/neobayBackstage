<template>
  <div class="wrapper wrapper-content">

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">知识产权</span>
    </span>
      <div slot="body">
        <NbSlidePanel type="primary" v-for="(companyIntellectual, index) in this.company.companyIntellectuals" :key="companyIntellectual.name">
        <span slot="heading">
          <i class="fa fa-user"></i>
          #{{index + 1}} {{companyIntellectual.intellectualName}}
        </span>
          <div slot="body">
            <div class="row">
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">知识产权类型</label>
                  <div class="col-md-8">
                    <select v-model="companyIntellectual.intellectualType" class="form-control">
                      <option>商标</option>
                      <option>专利（外观）</option>
                      <option>专利（发明）</option>
                      <option>专利（使用）</option>
                      <option>著作权</option>
                      <option>集成电路布局</option>
                      <option>植物新品种</option>
                      <option>技术秘密</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">发生时间</label>
                  <div class="col-md-8">
                    <div>
                      <el-date-picker v-model="companyIntellectual.occurrenceTime" type="date" placeholder="选择日期时间"></el-date-picker>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">编号</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyIntellectual.intellectualNo">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">名称</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="companyIntellectual.intellectualName">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">状态</label>
                  <div class="col-md-8">
                    <select v-model="companyIntellectual.intellectualStatus" class="form-control">
                      <option>受理</option>
                      <option>驳回</option>
                      <option>驳回复审</option>
                      <option>初审公告</option>
                      <option>异议</option>
                      <option>异议复审</option>
                      <option>注册公告</option>
                      <option>失效</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">是否有效</label>
                  <div class="col-md-8">
                    <label class="checkbox-inline">
                      <NbRadio :name="'isEffective' + index" :val="true" v-model="companyIntellectual.isEffective"/>是
                    </label>
                    <label class="checkbox-inline">
                      <NbRadio :name="'isEffective' + index" :val="false" v-model="companyIntellectual.isEffective"/>否
                    </label>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div class="col-md-12 text-center mt10">
            <button class="btn btn-danger" role="button" @click="confirmDeleteCompanyIntellectual(companyIntellectual)">
              <i class="fa fa-trash"></i> 删除该知识产权
            </button>
          </div>
        </NbSlidePanel>
      </div>

      <div class="text-center">
        <button class="btn btn-success" role="button" @click="addCompanyIntellectual">
          <i class="fa fa-plus"></i>
          增加知识产权信息
        </button>
      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import Company from '../../../../common/model/company/Company'
  import CompanyIntellectual from '../../../../common/model/company/CompanyIntellectual'
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
      confirmDeleteCompanyIntellectual(companyIntellectual) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.company.delIntellect(companyIntellectual);
        }, function () {
        });
      },
      addCompanyIntellectual() {
        let companyIntellectual = new CompanyIntellectual();
        this.company.addIntellect(companyIntellectual);
      }
//      validateFunc(obj){
//        if(!obj.intellectualType){
//          this.errorMessage = "知识产权类型必填！";
//          return false;
//        }
//        if(!obj.occurrenceTime){
//          this.errorMessage = "发生时间必填！";
//          return false;
//        }
//        if(!obj.intellectualNo){
//          this.errorMessage = "编号必填！";
//          return false;
//        }
//        if(!obj.intellectualName){
//          this.errorMessage = "名称必填！";
//          return false;
//        }
//        if(!obj.intellectualStatus){
//          this.errorMessage = "状态必填！";
//          return false;
//        }
//        if(!obj.isEffective){
//          this.errorMessage = "是否有效必填！";
//          return false;
//        }
//        return true;
//      }
		},
		mounted(){}
  }

</script>
