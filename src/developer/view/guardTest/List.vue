<template>
  <div class="guard-test-list">
    <div>
      <div class="p15">
        <div class="pre"><span class="f5">url：</span><input class="" size="40px" v-model="guardTest.url"/></div>
      </div>

      <div class="p15">
        <div class="pre"><span class="f5">参数 :</span>
          <div><span class="mr150">key：</span><span>value：</span></div>
          <div v-for="(param,index) in guardTest.keyValue" class="mt10">
            <input @click="guardTest.addParam(index)" v-model="param.key"/>
            <input @click="guardTest.addParam(index)" class="ml5" v-model="param.value"/>
            <button @click="guardTest.subParam(param)"> - </button>
          </div>
        </div>
      </div>
      <div class="p15">
        <div class="pre">
          <span class="f5">名称：</span><input class="" size="40px" v-model="guardTest.name"/>
          <span class="f5">描述：</span><input class="" size="40px" v-model="guardTest.tips"/>
        </div>
      </div>

      <div v-if="guardTest.errorMessage" class="alert alert-danger mt10">
        {{guardTest.errorMessage}}
      </div>
      <button class="btn btn-success ml15" @click="send"><i class="fa fa-send"></i>发送</button>
      <button class="btn btn-success" @click="save"><i class="fa fa-floppy-o"></i>保存</button>
      <div class="p15">
        <div>
            <FormatJson :json="guardTest.responseData"></FormatJson>
        </div>
      </div>

      <div class="row mt15">
        <div class="col-xs-12">
          <NbFilter :pager="pager" :callback="search"></NbFilter>
        </div>
        <div class="col-xs-12">
          <div class="row">
            <div v-for="item in pager.guardTests" :key="item.id" class="col-md-6"  @click.stop.prevent="huitian(item)">
              <div class="bg-white p10 mt10 cursor br4">
                <div class="pull-right action-buttons" >
                  <a href="javascript:void(0)" title="删除"
                     @click.stop.prevent="item.confirmDel(refresh)">
                    <i class="fa fa-trash text-danger f20"></i>
                  </a>
                </div>
                <div class="media-body">
                  <div class="cell-title"><span class="f17">{{item.name}}</span></div>
                  <div class="cell-description">{{item.tips? item.tips:"无描述"}}</div>
                  <div class="cell-description">URL：{{item.url}}</div>
                  <div class="cell-description max-h"><span class="f10" v-for="p in item.keyValue">[{{p.key}}:{{p.value}}]</span></div>
                  <div class="cell-content"><span class="mr10"><i class="fa fa-clock-o"></i> 创建时间：{{item.createTime | humanTime}}</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="col-xs-12 mt20">
          <NbPager :pager="pager" :callback="refresh"></NbPager>
        </div>
      </div>
    </div>
    </div>
</template>



<script>
  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../common/widget/NbPager.vue'
  import FormatJson from './widget/JsonFormat'
  import {Notification} from 'element-ui'

  import Pager from  "../../../common/model/base/Pager"
  import GuardTest from "../../../common/model/guard/test/GuardTest";

  export default {
    data () {
      return {
        guardTest: new GuardTest(),
        pager: new Pager(GuardTest)
      }
    },
    components: {
      NbFilter,
      NbPager,
      FormatJson
    },
    methods: {
      huitian(i) {
        this.guardTest.render(i);
      },
      //门禁测试
      send() {
        this.guardTest.httpSendTest(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
      },
      //门禁测试保存
      save(){
        let that = this;
        this.guardTest.id = 0;
        this.guardTest.editMode = false;
        this.guardTest.httpSave(function () {
          that.refresh();
          Notification.success({
            message: '保存成功！'
          });
        });
      },

      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.setFilter("orderCreateTime", "DESC");
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>




<style lang="less" rel="stylesheet/less">
  .guard-test-list {
    .pre {
      padding: 9.5px;
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.42857143;
      color: #333333;
      background-color: #e5f5f0;
      border: 1px solid #cca4aa;
      border-radius: 4px;
    }
    .max-h {
      max-height: 34px;
      height: 34px;
      line-height: 17px;
      overflow: hidden;
    }
  }

</style>

