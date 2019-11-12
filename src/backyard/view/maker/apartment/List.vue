<template>
  <div class="animated fadeIn maker-apartment-preview">

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>创客无忧-人才公寓申请表</span>
        </h2>
      </div>

      <!--<div class="pull-right mb20" style="margin-right: 15px;">-->
        <!--<button class="btn btn-primary" @click.stop.prevent="$router.push('/by/maker/apartment/create')">-->
          <!--<i class="fa fa-plus"></i>-->
          <!--<span>添加新的人才公寓申请表</span>-->
        <!--</button>-->
      <!--</div>-->
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="makerApartment in pager.makerApartments" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: makerApartment.id }})">
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerApartment.id }})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="makerApartment.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">

              <div class="cell-title">
                <span>申请人: {{makerApartment.applicantName}}</span>
                <span :class="'label label-'+makerApartment.getStatusStyle()">{{makerApartment.getStatusName()}}</span>
              </div>
              <div class="cell-description">
                <span>所在企业：{{makerApartment.companyName}}</span>
                <span>园区地点：{{makerApartment.spaceRegional.name}}</span>
              </div>
              <div class="cell-content">
                <span>申请人房源：{{makerApartment.houseApply}}</span>
                <span>目前住房情况：{{makerApartment.circumstances}}</span>
              </div>
              <div class="cell-content">
                <span>申请人电话：{{makerApartment.phone}}</span>
                <span>创建时间：{{makerApartment.createTime | date("yyyy-MM-dd HH:ss") }}</span>
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
</template>
<script>
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../../common/model/base/Pager"
  import MakerApartment from "../../../../common/model/maker/MakerApartment";

  export default{
    data () {
      return {
        user: this.$store.state.user,
        pager: new Pager(MakerApartment)
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {

    },
    methods: {
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        this.pager.setFilter("orderCreateTime", "DESC");
        this.pager.httpFastPage();
      }
    },
    mounted(){

      this.refresh();
    }
  }


</script>
<style lang="less" rel="stylesheet/less">

</style>
