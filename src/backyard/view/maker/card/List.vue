<template>
  <div class="animated fadeIn maker-apartment-preview">

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>创客无忧-一卡通申请表</span>
        </h2>
      </div>

      <div class="pull-right mb20" style="margin-right: 15px;">
        <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/maker/card/create')">
          <i class="fa fa-plus"></i>
          <span>添加新的一卡通申请表</span>
        </button>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="makerCard in pager.makerCards" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: makerCard.id }})">
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerCard.id }})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="makerCard.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">

              <div class="cell-title">
                <span>一卡通申请: <span v-for="ss in makerCard.makerCardMembers" :key="ss.index">{{ss.name}}&nbsp;</span></span>
                <span :class="'label label-'+makerCard.getStatusStyle()">{{makerCard.getStatusName()}}</span>
              </div>
              <div class="cell-description">
                <span>所在企业：{{makerCard.companyName}}</span>
              </div>
              <div class="cell-description">
                <span>申请一卡通类型：{{makerCard.type}}</span>
                <span>园区地点：{{makerCard.spaceRegional.name}}</span>
              </div>
              <div class="cell-content">
                <span>创建者:<UserProfileLink :user="makerCard.creator"/></span>
                <span class="ml10">创建时间：{{makerCard.createTime | humanTime }}</span>
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
  import UserProfileLink from "../../widget/UserProfileLink";

  import Pager from  "../../../../common/model/base/Pager"
  import MakerCard from "../../../../common/model/maker/card/MakerCard";

  export default{
    data () {
      return {
        user: this.$store.state.user,
        pager: new Pager(MakerCard)
      }
    },
    components: {
      NbFilter,
      NbPager,
      UserProfileLink
    },
    computed: {

    },
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
