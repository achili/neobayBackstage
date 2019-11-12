<template>
  <div class="animated fadeIn">
    <div class="row">

        <div class="col-md-12">

          <LoadingFrame :loading="teamworkTag.detailLoading">
            <div class="col-md-12 mb10">
              <a title="编辑" class="btn btn-success pull-right"
                 @click.stop.prevent="$router.push('/by/teamwork/tag/edit/'+teamworkTag.id)">
                <i class="fa fa-pencil"></i>
                编辑
              </a>
            </div>

            <div class="row">
              <div class="col-md-12">
                <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-dot-circle-o"></i>
                    工作类型详情
                </span>
                  <div slot="body">

                    <div class="row mt10">
                      <label class="col-md-3 control-label mt5 ">
                        园区地点:
                      </label>
                      <div class="col-md-9">
                        {{teamworkTag.spaceRegional.name}}
                      </div>
                    </div>

                    <div class="row mt10">
                      <label class="col-md-3 control-label mt5 ">
                        <span>工作类型名称:</span>

                      </label>
                      <div class="col-md-9">
                        {{teamworkTag.name}}
                      </div>
                    </div>

                    <div class="row mt10">
                      <label class="col-md-3 control-label mt5">
                        <span>工作类型描述:</span>
                      </label>
                      <div class="col-md-9">
                        {{teamworkTag.description}}
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
  import {Notification} from 'element-ui';
  import $ from "jquery"
  import TeamworkTag from "../../../../common/model/teamwork/TeamworkTag";
  import LoadingFrame from "../../widget/LoadingFrame";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel'


  export default {

    data () {
      return {
        teamworkTag: new TeamworkTag()
      }
    },
    components: {
      LoadingFrame,
      NbSlidePanel
    },
    methods: {
      fetchDetail(){
        let that = this;
        this.teamworkTag.id = this.$store.state.route.params.id;
        if (this.teamworkTag.id) {
          this.teamworkTag.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }
</script>
