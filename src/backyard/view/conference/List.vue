<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-md-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>会议室列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/conference/room/create')">
            <i class="fa fa-plus"></i>
            <span>新建会议室</span>
          </button>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-12 clearfix">
        <NbFilter :pager="pager" :callback="search"/>
      </div>

      <div class="col-md-12">
        <div v-for="conferenceRoom in pager.conferenceRooms" class="bg-white p10 mt10 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: conferenceRoom.id }})">

          <div class="media">
            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push({ path: 'edit', query: { id: conferenceRoom.id }})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除" @click.stop.prevent="conferenceRoom.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{conferenceRoom.name}}</span>
              </div>
              <div class="cell-content" >
                <span>详细说明：{{conferenceRoom.introduce}}</span>
              </div>
              <div class="cell-content">
                <span>园区地点：{{conferenceRoom.spaceRegional.name}}</span>
                <span class="mr10">创建者: <UserProfileLink :user="conferenceRoom.creator"/></span>
                <span class="mr10"><i class="fa fa-clock-o"></i> {{conferenceRoom.createTime | humanTime}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-md-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>

    </div>
  </div>

</template>
<script>
  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'
  import Pager from  "../../../common/model/base/Pager"
  import UserProfileLink from "../widget/UserProfileLink";
  import ConferenceRoom from "../../../common/model/conference/ConferenceRoom";

  export default {
    data(){
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        pager: new Pager(ConferenceRoom)
      }
    },
    components: {
      NbFilter,
      NbPager,
      UserProfileLink
    },
    computed: {},
    watch: {},
    methods: {
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
      //默认按照时间倒序排列。
      if (this.pager.getFilter("orderId").isEmpty()) {
        this.pager.setFilter("orderId", "DESC");
      }
      this.refresh();
    }
  }

</script>
