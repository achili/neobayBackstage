<template>
  <div>
    <div class="p15">
      <div class="row mt101">
        <div v-for="print in pager.printInformations" class="col-md-4">
          <div class="p20 bg-white">
            <div class="p10 mt10 cursor br6 text-center toast-top-full-width">
              <div class="media-body">
                <img class="img-rounded img-md" v-if="print.printPicture && print.printPicture.url" :src="print.printPicture.url">
                <div class="cell-title">{{print.name}}
                  <span :class="'label label-'+print.getStatusStyle()">
                        {{ print.getStatusName() }}</span>
                </div>
                <div class="cell-description">打印机地点：{{print.address}}</div>
              </div>
            </div>
          </div>
          <div class="text-center media mb20">
            <button class="btn btn-success" @click.stop.prevent="$router.push('/group/smart/print/create/' + print.id)">
              <span><i class="fa fa-print"></i>我要打印</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>

  import NbTank from '../../../../common/widget/NbTank';
  import NbPager from '../../../../common/widget/NbPager.vue'
  import Pager from  "../../../../common/model/base/Pager"
  import PrintInformation from "../../../../common/model/ispace/print/PrintInformation"
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
        this.refresh();
      }
    }
</script>


<style lang="less" rel="stylesheet/less">
  .font-color{
    color: #1e88e5;
  }
  .img-md {
    width: 100px;
    height: 100px;
  }

</style>
