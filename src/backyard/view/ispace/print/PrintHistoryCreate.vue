<template>
  <div class="animated fadeIn">

    <LoadingFrame :loading="printHistory.detailLoading">
      <div class="row">

        <div class="col-xs-12">

          <NbSlidePanel title="添加打印文件">
            <div class="row">
              <label class="col-md-2 control-label mt5 compulsory">打印机名称</label>
              <div class="col-md-10">
                <NbPagerSelection :pager="pager" :activeItem="printHistory.printInformation">
                  <span slot="title">
                    {{printHistory.printInformation.deviceName&&printHistory.printInformation.printId? printHistory.printInformation.deviceName:"请选择一个打印机id..."}}
                  </span>

                  <div class="mb10 p10 cursor br4 border" v-for="printInformation in pager.printInformations"
                       @click.stop.prevent="printHistory.printInformation.render(printInformation)"
                       :class="{'bg-white':printInformation.printId !== printHistory.printInformation.printId,'bg-azure':printInformation.printId === printHistory.printInformation.printId}"
                       slot="cells">
                    <div>
                      <span class="f15">{{printInformation.deviceName}}</span>

                      <span :class="'label label-'+printInformation.getStatusStyle()">{{printInformation.getStatusName()}}</span>
                    </div>
                  </div>

                </NbPagerSelection>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">打印方式</label>
              <span class="col-md-10">
                <span>
                  <NbRadio v-model="printHistory.type" val="SINGLE" name="type"></NbRadio>
                  <label>单面</label>
                </span>
                <!--<span>-->
                  <!--<NbRadio v-model="printHistory.type" val="DOUBLE_SIDED" name="type"></NbRadio>-->
                  <!--<label>双面</label>-->
                <!--</span>-->
              </span>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5">打印页码范围(选填)</label>
              <div class="col-md-10">
                <input type="text" class="form-control"  v-model="printHistory.ranges"
                       placeholder="填写示例：1-2,3,4-6......">
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



          </NbSlidePanel>
        </div>

        <div class="col-xs-12 mv10 text-right">
          <CreateSaveButton :entity="printHistory" :callback="save"/>
        </div>

      </div>

    </LoadingFrame>

  </div>
</template>

<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import NbDateRange from  "../../../../common/widget/NbDateRange.vue"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../widget/LoadingFrame";
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
  import NbTank from '../../../../common/widget/NbTank';
  import PrintInformation from "../../../../common/model/ispace/print/PrintInformation";
  import NbRadio from "../../../../common/widget/NbRadio.vue";
  import PrintHistory from "../../../../common/model/ispace/print/PrintHistory";
  import Pager from "../../../../common/model/base/Pager";
  import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

  export default{
    data(){
      return {
        printInformation: new PrintInformation(),
        printHistory: new PrintHistory(),
        innoTokenTypesList: [],
        pager: new Pager(PrintInformation)
      }
    },
    components: {
      NbSlidePanel,
      NbDateRange,
      CreateSaveButton,
      LoadingFrame,
      NbCheckbox,
      NbTank,
      NbRadio,
      NbPagerSelection
    },
    computed: {},
    watch: {},
    methods: {
      save(){
        let that = this;
        this.printHistory.httpSave(function (response) {
          NotificationBox.success({
            message: '添加打印文件成功！'
          });
          that.$router.push('/by/ispace/print/detail/' + that.printHistory.printInformation.id);
        });
      }
    },
    mounted(){
      this.pager.httpFastPage();
      this.pager.enableHistory();
      this.printHistory.printInformation.id = this.$store.state.route.query.print;
      let that = this;
      if(this.printHistory.printInformation.id) {
        that.printHistory.printInformation.httpDetail();
      }
    }
  }
</script>

