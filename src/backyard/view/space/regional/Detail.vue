<template>
  <div class="animated fadeIn nursery-apply-detail">
    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="spaceRegional.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"  v-if="spaceRegional.canEdit()"
               @click.stop.prevent="$router.push({path: 'edit', query: { id: spaceRegional.id }})">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">

              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-dot-circle-o"></i>
                  园区地点详情
                </span>
                <div slot="body">
                  <div class="row">
                    <div class="col-md-12">
                      <label class="col-md-4 control-label">空间名称：</label>
                      <div class="col-md-8">{{spaceRegional.name}}</div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-12">
                      <label class="col-md-4 control-label">创建时间：</label>
                      <div class="col-md-8">{{spaceRegional.createTime | humanTime }}</div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-12">
                      <label class="col-md-4 control-label">描述：</label>
                      <div class="col-md-8">{{spaceRegional.description }}</div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-12">
                      <label class="col-md-4 control-label">坐标：</label>
                      <div class="col-md-8">（{{spaceRegional.longitude }}，{{spaceRegional.latitude }}）</div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-12">
                      <label class="col-md-4 control-label">地址：</label>
                      <div class="col-md-8">{{spaceRegional.address }}</div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-12">
                      <label class="col-md-4 control-label">编码：</label>
                      <div class="col-md-8">{{spaceRegional.no }}</div>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-12">
                      <label class="col-md-4 control-label">英文地址：</label>
                      <div class="col-md-8">{{spaceRegional.englishAddress }}</div>
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
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel'
  import LoadingFrame from "../../widget/LoadingFrame";
  import UserProfileLink from "../../widget/UserProfileLink";
  import MessageNotifyView from "../../message/notify/MessageNotifyView";
  import $ from "jquery";
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";

  export default {

    data () {
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        spaceRegional: new SpaceRegional()

      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink,
      MessageNotifyView
    },
    methods: {
      fetchDetail(){
        let that = this;
        this.spaceRegional.id = this.$store.state.route.query.id;
        if (this.spaceRegional.id) {
            this.spaceRegional.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nursery-apply-detail {

  }

</style>
