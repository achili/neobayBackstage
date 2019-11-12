<template>
  <div class="animated fadeIn maker-market-preview">

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>创客无忧-园区市集申请表(只能让一个参展物品生效)</span>
        </h2>
      </div>

      <div class="pull-right mb20" style="margin-right: 15px;">
        <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/maker/market/create')">
          <i class="fa fa-plus"></i>
          <span>添加新的园区市集申请表</span>
        </button>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="makerMarket in pager.makerMarkets" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: makerMarket.id }})">
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="激活" v-show="makerMarket.status === 'DISABLED'" @click.stop.prevent="unlock(makerMarket)">
                <i class="fa fa-unlock text-primary f20"></i>
              </a>
              <a title="关闭" v-show="makerMarket.status === 'OK'" @click.stop.prevent="lock(makerMarket)">
                <i class="fa fa-lock text-warning f20"></i>
              </a>
              <a title="编辑" @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerMarket.id }})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="makerMarket.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">

              <div class="cell-title">
                <span>项目名称: {{makerMarket.projectName}}</span>
                <span class="label" :class="'label-'+makerMarket.StatusMap[makerMarket.status].style">{{makerMarket.StatusMap[makerMarket.status].name}}</span>
              </div>
              <div class="cell-description">
                <span>参展物品名称：{{makerMarket.title}}</span>
                <span>参展物品介绍：{{makerMarket.description}}</span>
              </div>
              <div class="cell-content">
                <span>申请人：{{makerMarket.leaderName}}</span>
                <span>申请人电话：{{makerMarket.leaderPhone}}</span>
                <span>创建时间：{{makerMarket.createTime | date("yyyy-MM-dd HH:ss") }}</span>
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
  import MakerMarket from "../../../../common/model/maker/MakerMarket";

  export default{
    data () {
      return {
        user: this.$store.state.user,
        pager: new Pager(MakerMarket)
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
      unlock(makerMarket){
        makerMarket.httpStatus(makerMarket.Status.OK, function () {
          makerMarket.status = makerMarket.Status.OK;
        });
      },
      lock(makerMarket){
        makerMarket.httpStatus(makerMarket.Status.DISABLED, function () {
          makerMarket.status = makerMarket.Status.DISABLED;
        });
      },
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
  .maker-market-preview {
    .cell-description {
      margin-top: 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      position: relative;
      line-height: 18px;
      max-height: 72px;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
    }
  }
</style>
