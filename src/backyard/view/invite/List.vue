<template>
  <div class="animated fadeIn maker-apartment-preview">

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>邀请访客</span>
        </h2>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="inviteVisitor in pager.inviteVisitors" class="bg-white p10 mt10 br4 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: inviteVisitor.id }})">
          <div class="media">
            <div class="media-body">

              <div class="cell-title">
                邀请人用户名：{{inviteVisitor.inviteName}}
              </div>
              <div class="cell-description">
                <span>邀请人姓名：{{inviteVisitor.name}}</span>
              </div>
              <div class="cell-description">
                <span>邀请时间：{{inviteVisitor.invitingTime | humanTime}}</span>
                <span>园区地点：{{inviteVisitor.spaceRegional.name}}</span>
              </div>
              <div class="cell-content">
                <span>创建者:<UserProfileLink :user="inviteVisitor.user"/></span>
                <span class="ml10">创建时间：{{inviteVisitor.createTime | humanTime }}</span>
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
  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../common/widget/NbPager.vue'
  import UserProfileLink from "../widget/UserProfileLink";

  import Pager from  "../../../common/model/base/Pager"
  import InviteVisitor from "../../../common/model/invite/InviteVisitor";

  export default{
    data () {
      return {
        pager: new Pager(InviteVisitor)
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
