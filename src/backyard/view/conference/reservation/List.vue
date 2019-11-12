<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-md-12 clearfix">
        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>会议室申请列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/conference/room/reservation/create')">
            <i class="fa fa-plus"></i>
            <span>新建会议室申请</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 clearfix">
        <NbFilter :pager="pager" :callback="search"/>
      </div>
      <div class="col-md-12">
        <div v-for="conferenceRoomReservation in pager.conferenceRoomReservations" class="bg-white p10 mt10 cursor"
             @click.stop.prevent="$router.push({ path: 'detail', query: { id: conferenceRoomReservation.id }})">

          <div class="media">
            <div class="pull-right action-buttons">
              <a title="未处理" href="javascript:void(0)" v-show="conferenceRoomReservation.status === 'RECEIVE'" @click.stop.prevent="received(conferenceRoomReservation)">
                <i class="fa fa-times f20"></i>
              </a>
              <a title="已处理" href="javascript:void(0)" v-show="conferenceRoomReservation.status === 'NOT_RECEIVE'" @click.stop.prevent="reception(conferenceRoomReservation)">
                <i class="fa fa-check f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除"
                 @click.stop.prevent="conferenceRoomReservation.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{conferenceRoomReservation.name}}</span>
                <span :class="'label label-'+conferenceRoomReservation.getStatusStyle()">{{conferenceRoomReservation.getStatusName()}}</span>
              </div>
              <div class="cell-content" >
                申请时间： {{conferenceRoomReservation.startTime | simpleDateMinute}} 至 {{conferenceRoomReservation.endTime | simpleDateMinute}}
              </div>
              <div class="cell-content">
                <span>园区地点：{{conferenceRoomReservation.spaceRegional.name}}</span>
                <span class="mr10">创建者: <UserProfileLink :user="conferenceRoomReservation.creator"/></span>
                <span class="mr10"><i class="fa fa-clock-o"></i> {{conferenceRoomReservation.createTime | humanTime}}</span>
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
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'
  import Pager from  "../../../../common/model/base/Pager"
  import UserProfileLink from "../../widget/UserProfileLink";
  import ConferenceRoomReservation from "../../../../common/model/conference/ConferenceRoomReservation";

  export default {
    data(){
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        pager: new Pager(ConferenceRoomReservation)
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
      received(conferenceRoomReservation){
        MessageBox.confirm('此操作后用户可修改订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          conferenceRoomReservation.httpStatus(conferenceRoomReservation.Status.NOT_RECEIVE, function () {
            conferenceRoomReservation.status = conferenceRoomReservation.Status.NOT_RECEIVE;
          });
        },function () {})
      },
      reception(conferenceRoomReservation){
        MessageBox.confirm('此操作将发短信给用户（无法撤回）, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          conferenceRoomReservation.httpStatus(conferenceRoomReservation.Status.RECEIVE, function () {
            conferenceRoomReservation.status = conferenceRoomReservation.Status.RECEIVE;
          });
        },function () {})
      },
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
      if(this.pager.getFilter("status").isEmpty()){
        this.pager.setFilter("status",ConferenceRoomReservation.prototype.Status.WAIT);
      }
      this.refresh();
    }
  }

</script>
