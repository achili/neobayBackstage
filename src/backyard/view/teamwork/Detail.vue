<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="teamwork.detailLoading">
          <div class="col-md-12 mb10">
            <a title="编辑" class="btn btn-success pull-right"
               @click.stop.prevent="$router.push({path: '/by/teamwork/edit/' + teamwork.id })">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-dot-circle-o"></i>
                    基本信息
                </span>
                <div slot="body">

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">
                      工作任务名称
                    </label>
                    <div class="col-md-9">
                      {{teamwork.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">
                      状态
                    </label>
                    <div class="col-md-9">
                      <span class="label" :class="'label-'+teamwork.StatusMap[teamwork.status].style">
                  {{teamwork.StatusMap[teamwork.status].name}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">
                      项目
                    </label>
                    <div class="col-md-9">
                      <span v-for="projects in teamwork.projects" class="mr5 label label-default">{{projects.name}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">
                      工作类型
                    </label>
                    <div class="col-md-9">
                      <span v-for="tag in teamwork.tags" class="mr5 label label-default">{{tag}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">
                      负责人
                    </label>
                    <div class="col-md-9">
                      {{teamwork.leader}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">
                      参与人
                    </label>
                    <div class="col-md-9">
                      <UserProfileLink class="mr5" v-for="participants in teamwork.participants" :user="participants" :show-portrait="true" :key="participants.id"/>
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3 control-label mt5">
                      预计完成时间
                    </label>
                    <div class="col-md-9">
                      {{teamwork.estimateTime | date("yyyy-MM-dd hh:mm:ss")}}
                    </div>
                  </div>

                  <div class="row mt10" v-if="teamwork.actualTime" >
                    <label class="col-md-3 control-label mt5">
                      实际完成时间
                    </label>
                    <div class="col-md-9">
                      {{teamwork.actualTime}}
                    </div>
                  </div>

                </div>
              </NbSlidePanel>
            </div>

          </div>
        </LoadingFrame>
      </div>
      <div class="col-md-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Notification as NotificationBox} from 'element-ui';
  import NbSlidePanel from '../../../common/widget/NbSlidePanel'
  import LoadingFrame from "../widget/LoadingFrame";
  import UserProfileLink from "../widget/UserProfileLink";
  import Reception from  "../../../common/model/reception/Reception"
  import NbTanks from "../../../common/widget/NbTanks"
  import Teamwork from "../../../common/model/teamwork/Teamwork";

  export default {
    data () {
      return {
        user: this.$store.state.user,
        teamwork: new Teamwork()
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink,
      NbTanks
    },
    methods: {
      fetchDetail(){
        let that = this;
        this.teamwork.id = this.$store.state.route.params.id;
        if (this.teamwork.id) {
          this.teamwork.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }
</script>

