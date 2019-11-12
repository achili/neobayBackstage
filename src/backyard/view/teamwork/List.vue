<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>协同工作任务列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/teamwork/create')" v-if="user.hasPermissionAllSpace(FeatureType.SPACE_TEAMWORK_MANAGE)" >
            <i class="fa fa-plus"></i>
            <span>创建协同工作任务</span>
          </button>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="teamwork in pager.teamworks" class="bg-white p10 br4 mt10 cursor"
             @click.stop.prevent="$router.push('/by/teamwork/detail/' + teamwork.id)">
          <div class="media">

            <div class="pull-right action-buttons">
              <a title="已完成" v-show="teamwork.status === 'OK'" @click.stop.prevent="unlock(teamwork)">
                <i class="fa fa-times text-primary f20"></i>
              </a>
              <a title="未完成" v-show="teamwork.status === 'FALSE'" @click.stop.prevent="lock(teamwork)">
                <i class="fa fa-check  text-warning f20"></i>
              </a>
              <a v-if="user.hasPermissionAllSpace(FeatureType.SPACE_TEAMWORK_MANAGE)" title="编辑" @click.stop.prevent="$router.push('/by/teamwork/edit/'+teamwork.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a v-if="user.hasPermissionAllSpace(FeatureType.SPACE_TEAMWORK_MANAGE)" href="javascript:void(0)" title="删除" @click.stop.prevent="teamwork.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>

            <div class="media-body">
              <div class="cell-title">
                <span>{{teamwork.name}}</span>
                <span class="label" :class="'label-'+teamwork.StatusMap[teamwork.status].style">
                  {{teamwork.StatusMap[teamwork.status].name}}</span>
              </div>
              <div class="cell-description">
                <span></span>
              </div>
              <div class="cell-content">
                <span>负责人：{{teamwork.leader}}</span>
                <span class="text-xs mr10"><i class="fa fa-clock-o"></i> {{teamwork.createTime | simpleDateTime}}</span>
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
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../common/model/base/Pager"
  import Teamwork from "../../../common/model/teamwork/Teamwork";
  export default {

    data () {
      return {
        pager: new Pager(Teamwork),
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user
      }
    },
    components: {
      NbFilter,
      NbPager

    },
    computed: {},
    watch: {},
    methods: {
      unlock(teamwork){
        teamwork.httpStatus(teamwork.Status.FALSE, function () {
          teamwork.status = teamwork.Status.FALSE;
        });
      },
      lock(teamwork){
        teamwork.httpStatus(teamwork.Status.OK, function () {
          teamwork.status = teamwork.Status.OK;
        });
      },
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        this.pager.httpFastPage();
      }
    },
    mounted() {
      this.refresh();
    }
  }

</script>
