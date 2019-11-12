<template>
  <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-users"></i>
      <span class="compulsory">比赛获奖信息</span>
    </span>
    <div slot="body">
      <NbSlidePanel type="primary" v-for="(investmentHonor, index) in this.investment.investmentHonors" :key="investmentHonor.name">
        <span slot="heading">
          <i class="fa fa-user"></i>
          #{{index + 1}} {{investmentHonor.honorInformation}}
        </span>
        <div slot="body">
          <div class="row">

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">荣誉信息</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" v-model="investmentHonor.honorInformation">
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">编号</label>
                <div class="col-md-8">
                  <input type="number" class="form-control" v-model="investmentHonor.no">
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">获奖年份</label>
                <div class="col-md-8">
                  <el-date-picker v-model="investmentHonor.awardTime" type="date"
                                  placeholder="选择日期时间"></el-date-picker>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">复核/验收年份</label>
                <div class="col-md-8">
                  <el-date-picker v-model="investmentHonor.checkTime" type="date"
                                  placeholder="选择日期时间"></el-date-picker>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row mt10">
                <label class="col-md-4 control-label mt5 compulsory">基本信息</label>
                <div class="col-md-8">
                  <textarea rows="2" class="form-control" v-model="investmentHonor.essentialInformation"></textarea>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-md-12 text-center mt10">
          <button class="btn btn-danger" role="button" @click="confirmDeleteCompanyInvestment(investmentHonor)">
            <i class="fa fa-trash"></i> 删除获奖信息
          </button>
        </div>
      </NbSlidePanel>
    </div>

    <div class="text-center">
      <button class="btn btn-success" role="button" @click="addCompanyInvestment">
        <i class="fa fa-plus"></i>
        增加获奖信息
      </button>
    </div>
  </NbSlidePanel>


</template>
<script>
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NbRadio from '../../../../common/widget/NbRadio.vue'
  import {Notification, MessageBox} from 'element-ui';
  import Investment from "../../../../common/model/investment/Investment";
  import InvestmentHonor from "../../../../common/model/investment/InvestmentHonor";

  export default{
    data () {
      return {}
    },
    components: {
      NbSlidePanel,
      NbRadio
    },
    props: {
      investment: {
        type: Investment,
        required: true
      }
    },
    computed: {},
    watch: {},
    methods: {
      confirmDeleteCompanyInvestment(investmentHonor) {
        let that = this;
        MessageBox.confirm('确定删除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.investment.delHonors(investmentHonor);
        }, function () {
        });
      },
      addCompanyInvestment() {
        let investmentHonor = new InvestmentHonor();
        this.investment.addHonors(investmentHonor);
      }
    },
    mounted(){
    }
  }

</script>
