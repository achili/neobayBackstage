<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-md-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>活动/接待列表</span>
        </div>
        <!--  -->
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/reception/create')" v-if="user.hasPermissionAllSpace(FeatureType.RECEPTION_MANAGE)">
            <i class="fa fa-plus"></i>
            <span>新建活动/接待</span>
          </button>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-12 clearfix">
        <NbFilter :pager="pager" :callback="search"/>
      </div>

      <div class="col-md-12">
        <div v-for="reception in pager.receptions" class="bg-white p10 mt10 cursor"
             @click.stop.prevent="$router.push({path: '/by/reception/detail/' + reception.id})">

          <div class="media">
            <div class="pull-right action-buttons" v-if="user.hasPermissionAllSpace(FeatureType.RECEPTION_MANAGE)">
              <a title="编辑" v-if="reception.canEdit()"
                 @click.stop.prevent="$router.push({path: '/by/reception/edit/' + reception.id})">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除"  v-if="reception.canDel()"
                 @click.stop.prevent="reception.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{reception.name}}</span>
                <span :class="'label label-'+reception.getTypeStyle()">{{reception.getTypeName()}}</span>
              </div>
              <div class="cell-content" v-if="reception.type === reception.Type.RECEPTION">
                来访单位名称：{{reception.visitingUnit}}
              </div>
              <div class="cell-content" v-if="reception.type === reception.Type.ACTIVITY">
                活动地点：{{reception.locale}}
              </div>

              <div class="cell-content" v-if="reception.type === reception.Type.RECEPTION">
                来访时间：{{reception.startTime | simpleDateMinute}} - {{reception.endTime | simpleDateMinute}}
              </div>
              <div class="cell-content" v-if="reception.type === reception.Type.ACTIVITY">
                活动时间：{{reception.startTime | simpleDateMinute}} - {{reception.endTime | simpleDateMinute}}
              </div>
              <div class="cell-content">
                <span>园区地点：{{reception.spaceRegional.name}}</span>
                <span class="mr10">创建者: <UserProfileLink :user="reception.creator"/></span>
                <span class="mr10"><i class="  fa-clock-o"></i> {{reception.createTime | simpleDateMinute}}</span>
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
  import Reception from  "../../../common/model/reception/Reception"
  import UserProfileLink from "../widget/UserProfileLink";
  import {simpleDateTime} from "../../../common/filter/time";

  export default {
    data(){
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        pager: new Pager(Reception)
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
