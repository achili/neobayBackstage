<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-xs-12">
                <NbSlidePanel>
                    <span slot="heading" class="text-success f16">
                       <i class="fa fa-dot-circle-o"></i>打印机信息详情</span>
                  <div class="media">
                    <div class="pull-left">
                      <img class="img-rounded img-md" v-if="print.printPicture && print.printPicture.url" :src="print.printPicture.url">
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">打印机名称：</div>
                    <div class="col-md-10 "><b>{{print.name}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">打印机状态：</div>
                    <div class="col-md-10 "><b><span :class="'label label-'+print.getStatusStyle()">
                          {{ print.getStatusName() }}</span></b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">打印机地址：</div>
                    <div class="col-md-10 "><b>{{print.address}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">创建时间：</div>
                    <div class="col-md-10 "><b>{{print.createTime | humanTime}}</b></div>
                  </div>

                  <div class="text-right mb10">
                    <button title="编辑" class="btn btn-success"
                            @click.stop.prevent="$router.push('/by/ispace/print/edit?print='+print.id)">
                      <i class="fa fa-pencil"></i>
                      修改打印机
                    </button>
                  </div>
                </NbSlidePanel>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="row">
              <div class="col-xs-12">
                <NbSlidePanel type="primary">
                  <span slot="heading" class="f16"><i class="fa fa-file-pdf-o"></i>打印历史</span>
                  <div class="col-xs-12">
                    <NbFilter :pager="pager" :callback="search"></NbFilter>
                  </div>

                  <div v-for="(printHistory,index) in pager.printHistories" class="bg-white p10 mt10 cursor br4">

                    <div class="row mt10">
                      <div class="col-md-2 ">文件状态：</div>
                      <div class="col-md-10 "><b><span :class="'label label-'+printHistory.getStatusStyle()">
                        {{ printHistory.getStatusName() }}</span></b></div>
                    </div>

                    <div class="row mt10">
                      <div class="col-md-2 ">文件份数：</div>
                      <div class="col-md-10 "><b>共{{printHistory.copies}}份</b></div>
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
      </div>

      <div class="col-md-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
        <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/ispace/print/printhistorycreate?print='+ print.id)">
          <span>添加打印文件</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  import {Notification} from 'element-ui';
  import NbTank from '../../../../common/widget/NbTank';
  import Pager from  "../../../../common/model/base/Pager"
  import NbPager from '../../../../common/widget/NbPager.vue'
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import PrintInformation from "../../../../common/model/ispace/print/PrintInformation"
  import PrintHistory from "../../../../common/model/ispace/print/PrintHistory"
  import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue"

    export default {
      data () {
        return {
          pager: new Pager(PrintHistory),
          print: new PrintInformation(),
          printfiles: new PrintHistory()
        }
      },
      components: {
        NbTank,
        NbPager,
        NbFilter,
        NbSlidePanel
      },
      methods: {
        search(){
          this.pager.page = 0;
          this.refresh()
        },
        refresh(){
          this.pager.setFilter('printInformation', this.$store.state.route.params.id);
          this.pager.showFilter('printInformation', false);
          this.pager.httpFastPage();
        }
      },
      mounted(){
        this.pager.enableHistory();
        if (this.pager.getFilter("orderCreateTime").isEmpty()) {
          this.pager.setFilter("orderCreateTime", "DESC");
        }
        this.refresh();
        let that = this;
        this.print.id = this.$store.state.route.params.id;
        if (this.print.id) {
          this.print.httpDetail();
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .by-article-detail {
    .mail-body {
      img {
        max-width: 100%;
      }
    }
  }
</style>
