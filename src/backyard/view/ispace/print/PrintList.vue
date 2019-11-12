<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">

        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/ispace/print/printcreate')">
            <i class="fa fa-plus"></i>
            <span>创建打印机</span>
          </button>
        </div>

      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="print in pager.printInformations" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push('/by/ispace/print/detail/' + print.id)">

          <div class="media">
            <div class="pull-left">
              <img class="img-rounded print-img-md" v-if="print.printPicture && print.printPicture.url" :src="print.printPicture.url">
            </div>

            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push('/by/ispace/print/edit?print='+print.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除"
                 @click.stop.prevent="print.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{print.name}}</span>
                <span :class="'label label-'+print.getStatusStyle()">
                        {{ print.getStatusName() }}</span>
              </div>
            </div>

            <div class="cell-content">
              打印机地址：<span class="mr10 font-color">{{print.address}}</span>
            </div>

            <div class="cell-content">
              <span class="mr10">创建时间：<i class="fa fa-clock-o"></i>{{print.createTime | humanTime}}</span>
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

  import NbTank from '../../../../common/widget/NbTank';
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import Pager from  "../../../../common/model/base/Pager"
  import PrintInformation from "../../../../common/model/ispace/print/PrintInformation"
  import Base from "../../../../common/model/base/Base";

  export default {
    name: "Print",
    data(){
      return {
        pager: new Pager(PrintInformation),
        print: new PrintInformation()
      }
    },
    computed:{},
    watch:{},
    components:{
      NbTank,
      NbFilter,
      NbPager
    },
    methods:{
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();
      if (this.pager.getFilter("orderCreateTime").isEmpty()) {
        this.pager.setFilter("orderCreateTime", "DESC");
      }
      this.refresh();
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .font-color{
    color: #1e88e5;
  }
  .print-img-md {
    width: 75px;
    height: 75px;
    margin-bottom: 2px;
  }
</style>
