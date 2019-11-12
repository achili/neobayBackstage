<template>
  <div class="animated fadeIn">

    <LoadingFrame :loading="print.detailLoading">
    <div class="row">

      <div class="col-xs-12">

        <NbSlidePanel v-show="!print.editMode" title="创建打印机">
          <div class="row">
            <label class="col-md-2 control-label mt5 compulsory">设备名称</label>
            <div class="col-md-10">
              <DeviceSelection :activeDevice="addedPrint"/>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">打印机名称</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="print.name">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">打印机地址</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="print.address">
            </div>
          </div>

          <div class="row mt10">
            <img class="thumb-lg pull-left m-r-md">
            <label class="control-label col-md-2 mt5 compulsory">打印机图片</label>
            <div class="col-md-10">
              <NbTank :tank="print.printPicture"/>
            </div>
          </div>


        </NbSlidePanel>

        <NbSlidePanel v-show="print.editMode" title="编辑打印机">
          <div class="row">
            <label class="col-md-2 control-label mt5 compulsory">设备名称</label>
            <div class="col-md-10">
              <DeviceSelection :activeDevice="addedPrint"/>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">打印机名称</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="print.name">
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">打印机地址</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="print.address">
            </div>
          </div>

          <div class="row mt10">
            <img class="thumb-lg pull-left m-r-md">
            <label class="control-label col-md-2 mt5 compulsory">打印机图片</label>
            <div class="col-md-10">
              <NbTank :tank="print.printPicture"/>
            </div>
          </div>


        </NbSlidePanel>
      </div>

      <div class="col-xs-12 mv10 text-right">
        <CreateSaveButton :entity="print" :callback="save"/>
      </div>

    </div>

    </LoadingFrame>

  </div>
</template>

<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import Notification from  "../../../../common/model/notification/Notification"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import NbDateRange from  "../../../../common/widget/NbDateRange.vue"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../widget/LoadingFrame";
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
  import NbTank from '../../../../common/widget/NbTank';
  import DeviceSelection from '../print/DeviceSelection.vue'
  import PrintInformation from "../../../../common/model/ispace/print/PrintInformation";
  import AddedPrint from "../../../../common/model/ispace/print/AddedPrint";

  export default{
    data(){
      return {
        Type: PrintInformation.prototype.Type,
        notification: new Notification(),
        print: new PrintInformation(),
        addedPrint: new AddedPrint(),
        innoTokenTypesList: []
      }
    },
    components: {
      NbSlidePanel,
      NbDateRange,
      CreateSaveButton,
      LoadingFrame,
      NbCheckbox,
      NbTank,
      DeviceSelection
    },
    computed: {},
    watch: {
      "addedPrint.id"(newVal){
        this.addedPrint.id = newVal;
      },
      "addedPrint.name"(newVal){
        this.addedPrint.name = newVal;
      },
      "addedPrint.deviceId"(newVal){
        this.addedPrint.deviceId = newVal;
      }
    },
    methods: {
      save(){
        let that = this;
        this.print.errorMessage = null;
        this.print.deviceId = this.addedPrint.deviceId;
        this.print.printId = this.addedPrint.id;
        this.print.deviceName =  this.addedPrint.name;
        if (!this.print.editMode) {
          this.print.status = "FREE";
        }
        this.print.httpSave(function (response) {
          NotificationBox.success({
            message: that.print.editMode ? '修改打印机信息成功！' : '创建打印机成功！'
          });
          that.$router.push("/by/ispace/print/list");
        });
      }
    },
    mounted(){
      let that = this;
      this.print.id = this.$store.state.route.query.print;
      if (this.print.id) {
        that.print.editMode = true;
        that.print.httpDetail(function () {
          that.addedPrint.id = that.print.printId;
          that.addedPrint.name = that.print.deviceName;
          that.addedPrint.render(that.addedPrint);
        });
      }
    }
  }
</script>


