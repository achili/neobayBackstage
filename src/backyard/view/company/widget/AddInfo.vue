<template>
  <div class="wrapper wrapper-content">

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-list-alt"></i>
      上市信息
    </span>
      <div slot="body">

        <div class="row mt10">
          <label class="col-md-3 control-label mt5">证券代码</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="company.listedSecurityCode"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">上市时间</label>
          <div class="col-md-9">
            <el-date-picker v-model="company.listedTime" type="date" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">上市市场</label>
          <div class="col-md-9">
            <select v-model="company.listedMarket" class="form-control">
              <option>深交所主板</option>
              <option>上交所</option>
              <option>新加坡</option>
              <option>香港</option>
              <option>纳斯达克</option>
              <option>纽约交易所</option>
              <option>日本</option>
              <option>英国</option>
              <option>其他</option>
              <option>深交所创业板</option>
              <option>新三板</option>
              <option>深交所中小板</option>
            </select>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">总股本（股）</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.listedStockNum"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">年底市值（万元）</label>
          <div class="col-md-9">
            <NbNumberInput v-model="company.listedMarketValue"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">退市时间</label>
          <div class="col-md-9">
            <el-date-picker v-model="company.listedDelistingTime" type="date" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">备注</label>
          <div class="col-md-9">
            <textarea rows="4" class="form-control" v-model="company.listedNotes"></textarea>
          </div>
        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-credit-card"></i>
      银行信息
    </span>
      <div slot="body">
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">开户银行</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="company.bank"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">开户名</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="company.bankAccountName"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">银行账号</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="company.bankAccountNo"/>
          </div>
        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-university"></i>
      税务信息
    </span>
      <div slot="body">
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">税务登记号</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="company.bankAccountNo"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">机构类型</label>
          <div class="col-md-9">
            <span>
              <NbRadio v-model="company.taxOrganizationType" val="总机构" name="gender"></NbRadio>
              <label>总机构</label>
            </span>
            <span>
              <NbRadio v-model="company.taxOrganizationType" val="分支机构" name="gender"></NbRadio>
              <label>分支机构</label>
            </span>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5">经营范围（按营业执照）</label>
          <div class="col-md-9">
            <textarea rows="4" class="form-control" v-model="company.taxBusinessScope"></textarea>
          </div>
        </div>
      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import Company from '../../../../common/model/company/Company'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NbRadio from "../../../../common/widget/NbRadio.vue";
  import NbNumberInput from "../../../../common/widget/NbNumberInput.vue";

  export default{
    data () {
			return {}
		},
		components: {
      NbSlidePanel,
      NbRadio,
      NbNumberInput
		},
		props:{
      company: {
        type: Company,
        required: true
      }
		},
		computed: {},
		watch: {},
		methods: {},
		mounted(){}
  }

</script>
