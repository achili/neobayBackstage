<template>
  <div class="animated fadeIn">

    <LoadingFrame :loading="investment.detailLoading">
      <div class="row">
        <div class="col-xs-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!investment.editMode">申请投融资</span>
            <span v-show="investment.editMode">编辑申请投融资</span>
          </h2>

          <CreateSaveButton :entity="investment" :callback="save"/>
        </div>
      </div>

      <div class="row">

        <div class="col-xs-12 ml10">
          <button v-for="type in investment.Types" class="btn ml10 mb5 mt5"
                  :class="{'btn-success': selected===type.index,'btn-default': selected!==type.index}"
                  @click="chooseType(type.index)">
            <span :class="{'compulsory':type.compulsory}"></span>
            <i :class="type.fa"></i>
            <span>
              {{type.name}}
            </span>
          </button>

          <BasicInfo v-show="selected === 0" :investment="investment"/>
          <EquityStruc v-show="selected === 1" :investment="investment"/>
          <CoreStruc v-show="selected === 2" :investment="investment"/>
          <FinancingInfo v-show="selected === 3" :investment="investment"/>
          <HonorInfo v-show="selected === 4" :investment="investment"/>
          <FinanceInfo v-show="selected === 5" :investment="investment"/>
          <PatentInfo v-show="selected === 6" :investment="investment"/>
          <IntellectInfo v-show="selected === 7" :investment="investment"/>

        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 m-t-md">
          <div class="alert alert-danger" v-show="investment.errorMessage">
            {{investment.errorMessage}}
          </div>
          <div class="pull-right">
            <button class="mr5 btn btn-success" @click="saveLocalData">
              <i class="fa fa-save"></i>
              本地保存
            </button>
            <CreateSaveButton :entity="investment" :callback="save"/>
          </div>
        </div>
      </div>
    </LoadingFrame>

  </div>
</template>
<script>
  import NbTank from '../../../common/widget/NbTank'
  import {simpleDateTime, str2Date} from '../../../common/filter/time'
  import {Notification} from 'element-ui'
  import CreateSaveButton from "../widget/CreateSaveButton.vue"
  import LoadingFrame from "../widget/LoadingFrame";
  import BasicInfo from './widget/BasicInfo';
  import FinanceInfo from './widget/FinanceInfo';
  import IntellectInfo from './widget/IntellectInfo';
  import PatentInfo from './widget/PatentInfo';
  import CoreStruc from './widget/CoreStruc';
  import EquityStruc from './widget/EquityStruc';
  import FinancingInfo from './widget/FinancingInfo';
  import HonorInfo from './widget/HonorInfo';
  import $ from "jquery"
  import Investment from "../../../common/model/investment/Investment";

  export default {
    data () {
      return {
        selected: 0,
        investment: new Investment()

      }
    },
    components: {
      NbTank,
      BasicInfo,
      FinancingInfo,
      CoreStruc,
      EquityStruc,
      FinanceInfo,
      IntellectInfo,
      HonorInfo,
      PatentInfo,
      CreateSaveButton,
      LoadingFrame
    },
    computed: {},
    watch: {},
    methods: {
      //保存功能
      saveLocalData () {
        this.investment.saveToLocalStorage();
        Notification.success({
          message: '保存成功！'
        });
      },
      save(){
        let that = this;
        that.investment.httpSave(function (response) {
          Notification.success({
            message: that.investment.editMode ? '修改投融资成功！' : '创建投融资成功！'
          });
          that.$router.push({path: 'detail', query: { id: that.investment.id }});
        });
      },
      chooseType(num) {
        this.selected = num;
      },
      fetchDetail(){
        this.investment.httpDetail();
      }
    },
    mounted(){
      let that = this;
      this.investment.id = that.$store.state.route.query.id;
      if (that.investment.id) {
        that.investment.editMode = true;
        that.fetchDetail();
      } else {
        this.investment.renderFromLocalStorage()
      }
    }
  }


</script>
