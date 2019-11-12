<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="reception.detailLoading">
          <div class="text-right mb10"  v-if="user.hasPermissionSpace(FeatureType.RECEPTION_MANAGE,reception.spaceRegional.id)">
            <a title="编辑" class="btn btn-success"  v-if="reception.canEdit()"
               @click.stop.prevent="$router.push({path: '/by/reception/edit/' + reception.id })">
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
                      类型
                    </label>
                    <div class="col-md-9">
                      <span :class="'label label-'+reception.getTypeStyle()">
                        {{ reception.getTypeName() }}
                      </span>
                    </div>
                  </div>
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">
                      来源
                    </label>
                    <div class="col-md-9">
                      <span :class="'label label-'+reception.getOrsTypeStyle()">
                        {{ reception.getOrsTypeName() }}
                      </span>
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3 control-label mt5 ">园区地点</label>
                    <div class="col-md-9">
                      {{reception.spaceRegional.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 "><span v-show="reception.type === reception.Type.ACTIVITY">活动</span><span v-show="reception.type === reception.Type.RECEPTION">接待</span>名称</label>
                    <div class="col-md-9">
                      {{reception.name}}
                    </div>
                  </div>

                  <div class="row mt10"  v-show="reception.type === reception.Type.RECEPTION">
                    <label class="col-md-3 control-label mt5 ">
                      来访单位名称
                    </label>
                    <div class="col-md-9">
                      {{reception.visitingUnit}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 "><span v-show="reception.type === reception.Type.ACTIVITY">活动</span><span v-show="reception.type === reception.Type.RECEPTION">来访</span>时间</label>
                    <div class="col-md-9">
                      {{reception.startTime | simpleDateTime}} 至 {{reception.endTime | simpleDateTime}}
                    </div>
                  </div>

                  <div class="row mt10"  v-show="reception.type === reception.Type.ACTIVITY">
                    <label class="col-md-3 control-label mt5 ">
                      活动地点
                    </label>
                    <div class="col-md-9">
                      {{reception.locale}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">
                      工作人员
                    </label>
                    <div class="col-md-9">
                      <UserProfileLink class="mr5" v-for="personnel in reception.personnels" :user="personnel" :show-portrait="true" :key="personnel.id"/>
                    </div>
                  </div>

                  <div class="row mt10" v-show="reception.type === reception.Type.ACTIVITY">
                    <label class="col-md-3 control-label mt5" >
                      相关附件
                    </label>
                    <div class="col-md-9">
                      <NbTanks :tanks="reception.attachments" :edit="false"/>
                    </div>
                  </div>
                </div>
              </NbSlidePanel>

              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                  <span v-show="reception.type === reception.Type.ACTIVITY">活动</span><span v-show="reception.type === reception.Type.RECEPTION">接待</span>详情
                </span>
                <div slot="body" style="min-height: 300px">
                  <div v-html="reception.detailsHtml"></div>
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

  export default {
    data () {
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        reception: new Reception()
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
        this.reception.id = this.$store.state.route.params.id;
        if (this.reception.id) {
          this.reception.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }
</script>

