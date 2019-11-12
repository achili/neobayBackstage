<template>
  <div class="animated fadeIn maker-apartment-preview">

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>服务机构表</span>
        </h2>
      </div>

      <div class="pull-right mb10" style="margin-right: 15px;">
        <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/maker/organization/create')">
          <i class="fa fa-plus"></i>
          <span>添加新的服务机构表</span>
        </button>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="makerOrganization in pager.makerOrganizations" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: makerOrganization.id }})">
          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerOrganization.id }})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="makerOrganization.confirmDel(refresh)"
                 v-show="makerOrganization.type!=='PARK'">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
              <span>
                <a href="javascript:void(0)" title="添加申请" @click.stop.prevent="routerPush(makerOrganization)">
                <i class="fa fa-bookmark text-success f20"></i>
              </a>
              </span>
            </div>
            <div class="media-body">
              <div class="cell-title">
                <span class="mr20">名称: {{makerOrganization.name}}</span>
                <span class="mr20">类型: {{makerOrganization.getTypeName()}}</span>
                <span :class="'label label-'+makerOrganization.getStatusStyle()">{{makerOrganization.getStatusName()}}</span>
              </div>
              <div class="cell-description">
                <span>描述：{{makerOrganization.description}}</span>
              </div>
              <div class="cell-content">
                <span>园区地点：{{makerOrganization.spaceRegional.name}}</span>
              </div>
              <div class="cell-content">
                <span>联系人姓名：{{makerOrganization.leaderName}}</span>
                <span>联系人电话：{{makerOrganization.leaderPhone}}</span>
                <span>联系人邮箱：{{makerOrganization.leaderEmail}}</span>
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
  import Pager from  "../../../../common/model/base/Pager"
  import MakerOrganization from "../../../../common/model/maker/MakerOrganization";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'

  export default{
    data () {
      return {
        user: this.$store.state.user,
        pager: new Pager(MakerOrganization)
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
        this.pager.setFilter("orderId", "DESC");
        this.pager.httpFastPage();
      },
      routerPush(makerOrganization) {
        if (this.user.role.name !== '第三方用户账号') {
          if (makerOrganization.type !== 'APARTMENT') {
            this.$router.push("/by/maker/simple/apply/create?makerOrganizationId=" + makerOrganization.id);
          } else {
            this.$router.push("/by/maker/apartment/create?makerOrganizationId=" + makerOrganization.id);
          }
        } else {
          NotificationBox.error({
            message: '不能创建自己的订单！'
          });
        }
      }
    },
    mounted(){

      this.refresh();
    }
  }


</script>
<style lang="less" rel="stylesheet/less">

</style>
