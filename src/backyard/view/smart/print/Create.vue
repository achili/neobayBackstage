<template>
  <div class="animated fadeIn">

    <LoadingFrame :loading="printHistory.detailLoading">
      <div class="row">

        <div class="col-xs-12">
          <h2 v-show="!printHistory.editMode"><i class="fa fa-fire text-success"></i>创建打印文件</h2>
        </div>

        <div class="col-xs-12">
          <NbSlidePanel title="创建打印文件">
            <div class="row">
              <label class="col-md-2 control-label mt5 compulsory">打印机ID</label>
              <div class="col-md-10">
                <label class="p3">#{{printHistory.printInformation.id}}</label>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">打印方式</label>
              <span class="col-md-10">
                <span>
                  <NbRadio v-model="printHistory.type" val="SINGLE" name="type"></NbRadio>
                  <label>单面</label>
                </span>
                <span>
                  <NbRadio v-model="printHistory.type" val="DOUBLE_SIDED" name="type"></NbRadio>
                  <label>双面</label>
                </span>
              </span>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">打印页码范围</label>
              <div class="col-md-10">
                <input type="text" class="form-control"  v-model="printHistory.pageRange"
                       placeholder="填写示例：1-2,3-6......">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">打印份数</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="printHistory.copies"
                       placeholder="只需填写数字，例：1,2......">
              </div>
            </div>

            <div class="row mt10">
              <img class="thumb-lg pull-left m-r-md">
              <label class="control-label col-md-2 mt5 compulsory">上传打印文件</label>
              <div class="col-md-10">
                <NbTank :tank="printHistory.printFile"/>
              </div>
            </div>
            <div class="col-xs-12 mv10 text-right">
              <CreateSaveButton :entity="printHistory" :callback="save"/>
            </div>
          </NbSlidePanel>

        </div>

        <div class="col-md-12">
          <div class="row">
            <div class="col-xs-12">
              <NbSlidePanel type="primary">
                <span slot="heading" class="f16"><i class="fa fa-file-pdf-o"></i>打印队列</span>

                <div v-for="(printHistory,index) in pager.printHistories" class="bg-white cursor br4">

                  <div class="row mt10">
                    <div class="col-md-2 ">文件状态：</div>
                    <div class="col-md-10 "><b><span :class="'label label-'+printHistory.getStatusStyle()">
                        {{ printHistory.getStatusName() }}</span></b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">文件页数：</div>
                    <div class="col-md-10 "><b>共{{printHistory.getPageSize()}}页</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">创建时间：</div>
                    <div class="col-md-10 "><b>{{printHistory.createTime | humanTime}}</b></div>
                  </div>
                  <hr v-show="index !== pager.printHistories.length - 1"/>
                </div>
                <div class="col-xs-12 mt20">
                  <NbPager :pager="pager" :callback="refresh"></NbPager>
                </div>
              </NbSlidePanel>
            </div>
          </div>
        </div>
      </div>

    </LoadingFrame>

  </div>
</template>

<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../widget/LoadingFrame";
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
  import NbTank from '../../../../common/widget/NbTank';
  import PrintInformation from "../../../../common/model/ispace/print/PrintInformation";
  import NbRadio from "../../../../common/widget/NbRadio.vue";
  import PrintHistory from "../../../../common/model/ispace/print/PrintHistory";
  import Pager from "../../../../common/model/base/Pager";
  import NbPager from '../../../../common/widget/NbPager.vue'

  export default{
    data(){
      return {
        print: new PrintInformation(),
        printHistory: new PrintHistory(),
        innoTokenTypesList: [],
        pager: new Pager(PrintHistory)
      }
    },
    components: {
      NbSlidePanel,
      CreateSaveButton,
      LoadingFrame,
      NbCheckbox,
      NbTank,
      NbRadio,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {
      save(){
        let that = this;
        this.printHistory.httpSave(function (response) {
          NotificationBox.success({
            message: that.printHistory.editMode ? '修改打印文件成功！' : '添加打印文件成功！'
          });
          that.$router.push("/group/smart/print/list");
        });
      },
      refresh(){
        this.pager.setFilter('printInformation', this.$store.state.route.params.id);
        this.pager.showFilter('printInformation', false);
        this.pager.setFilter('status', PrintHistory.prototype.Status.WAITING);
        this.pager.httpFastPage();
      }
    },

    mounted(){
      this.refresh();
      this.pager.enableHistory();
      this.printHistory.printInformation.id = this.$store.state.route.params.id
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
</style>

