<template>
  <div class="guard-test-list">
    <div>

      <button class="btn btn-success ml15" @click="getDeviceList"><i class="fa fa-send"></i>请求盒子列表</button>
      <div class="p15">
        <div>
          <FormatJson :json="deviceTest.responseData"></FormatJson>
        </div>
      </div>

      <div class="p15">
        <div class="pre"><span class="f5">参数 :deviceId</span>
          <div><span class="mr150">key：</span><span>value：</span></div>
          <div v-for="(param,index) in devicePrintTest.keyValue" class="mt10">
            <input @click="devicePrintTest.addParam(index)" v-model="param.key"/>
            <input @click="devicePrintTest.addParam(index)" class="ml5" v-model="param.value"/>
            <button @click="devicePrintTest.subParam(param)"> - </button>
          </div>
        </div>
      </div>
      <div v-if="devicePrintTest.errorMessage" class="alert alert-danger mt10">
        {{devicePrintTest.errorMessage}}
      </div>
      <button class="btn btn-success ml15" @click="getDevicePrintList"><i class="fa fa-send"></i>请求盒子连接的打印机列表</button>
      <div class="p15">
        <div>
          <FormatJson :json="devicePrintTest.responseData"></FormatJson>
        </div>
      </div>

      <div class="p15">
        <div class="pre"><span class="f5">参数 :deviceId,model</span>
          <div><span class="mr150">key：</span><span>value：</span></div>
          <div v-for="(param,index) in printTest.keyValue" class="mt10">
            <input @click="printTest.addParam(index)" v-model="param.key"/>
            <input @click="printTest.addParam(index)" class="ml5" v-model="param.value"/>
            <button @click="printTest.subParam(param)"> - </button>
          </div>
        </div>
      </div>
      <div v-if="printTest.errorMessage" class="alert alert-danger mt10">
        {{printTest.errorMessage}}
      </div>
      <button class="btn btn-success ml15" @click="getPrintDriveList"><i class="fa fa-send"></i>请求打印机可用驱动列表</button>
      <div class="p15">
        <div>
            <FormatJson :json="printTest.responseData"></FormatJson>
        </div>
      </div>

      <div class="p15">
        <div class="pre"><span class="f5">参数 :deviceId,name(自定义),deviceUri,driveName</span>
          <div><span class="mr150">key：</span><span>value：</span></div>
          <div v-for="(param,index) in createPrintTest.keyValue" class="mt10">
            <input @click="createPrintTest.addParam(index)" v-model="param.key"/>
            <input @click="createPrintTest.addParam(index)" class="ml5" v-model="param.value"/>
            <button @click="createPrintTest.subParam(param)"> - </button>
          </div>
        </div>
      </div>
      <div v-if="createPrintTest.errorMessage" class="alert alert-danger mt10">
        {{createPrintTest.errorMessage}}
      </div>
      <button class="btn btn-success ml15" @click="createPrint"><i class="fa fa-floppy-o"></i>创建打印机</button>
      <div class="p15">
        <div>
          <FormatJson :json="createPrintTest.responseData"></FormatJson>
        </div>
      </div>

      <div class="p15">
        <div class="pre"><span class="f5">参数 :deviceId,addr,printerId</span>
          <div><span class="mr150">key：</span><span>value：</span></div>
          <div v-for="(param,index) in updatePrintResult.keyValue" class="mt10">
            <input @click="updatePrintResult.addParam(index)" v-model="param.key"/>
            <input @click="updatePrintResult.addParam(index)" class="ml5" v-model="param.value"/>
            <button @click="updatePrintResult.subParam(param)"> - </button>
          </div>
        </div>
      </div>
      <div v-if="updatePrintResult.errorMessage" class="alert alert-danger mt10">
        {{updatePrintResult.errorMessage}}
      </div>
      <button class="btn btn-success ml15" @click="updatePrint"><i class="fa fa-floppy-o"></i>更新打印结果地址</button>
      <div class="p15">
        <div>
          <FormatJson :json="updatePrintResult.responseData"></FormatJson>
        </div>
      </div>

      <div class="ml15 f18">
        <i class="fa fa-fire text-success"></i>
        <span>已创建的未使用的打印机列表:</span>
      </div>

      <div class="row mt15">
        <div class="col-xs-12">
          <NbFilter :pager="pager" :callback="search"></NbFilter>
        </div>
        <div class="col-xs-12">
          <div class="row">
            <div v-for="item in pager.addedPrints" :key="item.id" class="col-md-6">
              <div class="bg-white p10 mt10 cursor br4">
                <div class="pull-right action-buttons" >
                  <a href="javascript:void(0)" title="删除"
                     @click="deletePrint(item)">
                    <i class="fa fa-trash text-danger f20"></i>
                  </a>
                </div>
                <div class="media-body">
                  <div class="cell-title"><span class="f17">{{item.name}}</span></div>
                  <div class="cell-title">设备id:<span class="f17">{{item.deviceId}}</span></div>
                  <div class="cell-title">打印机id:<span class="f17">{{item.id}}</span></div>
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
  import PrintTest from "../../../common/model/print/PrintTest";
  import DevicePrintTest from "../../../common/model/print/DevicePrintTest";
  import DeviceTest from "../../../common/model/print/DeviceTest";
  import CreatePrintTest from "../../../common/model/print/CreatePrintTest";
  import AddedPrint from "../../../common/model/ispace/print/AddedPrint";
  import UpdatePrintResult from "../../../common/model/print/UpdatePrintResult";

  export default {
    data () {
      return {
        printTest: new PrintTest(),
        devicePrintTest: new DevicePrintTest(),
        deviceTest: new DeviceTest(),
        createPrintTest: new CreatePrintTest(),
        updatePrintResult: new UpdatePrintResult(),
        addedPrint: new AddedPrint(),
        pager: new Pager(AddedPrint)
      }
    },
    components: {
      NbFilter,
      NbPager,
      FormatJson
    },
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.setFilter("orderCreateTime", "DESC");
        this.pager.httpFastPage();
      },
      //获得设备列表
      getDeviceList(){
        this.deviceTest.httpGetDeviceList(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
      },
    //获得设备连接的打印机列表
      getDevicePrintList(){
        this.devicePrintTest.httpGetDevicePrintList(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
      },
      //获得打印机可用驱动列表
      getPrintDriveList(){
        this.printTest.httpGetPrintDriveList(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
      },
      //创建打印机
      createPrint(){
        this.createPrintTest.httpCreatePrint(function () {
          Notification.success({
            message: '发送成功！'
          });
        });
        this.refresh();
      },
      //删除打印机
      deletePrint(item){
        let that = this;
        this.printTest.httpDeletePrint(item,function () {
          Notification.success({
            message: '删除成功！'
          });
          that.refresh();
        });
      },
      //更新打印机结果
      updatePrint(){
        let that = this;
        this.updatePrintResult.httpUpdatePrint(function () {
          Notification.success({
            message: '更新成功！'
          });
          that.refresh();
        });
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

