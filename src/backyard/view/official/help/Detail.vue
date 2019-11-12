<template>
    <div class="by-article-detail animated fadeIn">

        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div class="mail-box-header">
                    <div class="pull-right">
                        <button title="编辑" class="btn btn-success"
                                @click.stop.prevent="$router.push('/by/official/help/edit/'+officialHelp.id)">
                            <i class="fa fa-pencil"></i>
                            编辑
                        </button>
                    </div>
                    <div class="mail-tools m-t-md">

                        <h3>
                            {{officialHelp.name}}
                        </h3>
                        <div>
                            <span>作者：{{officialHelp.name}}</span>
                            <span class="ml10">发布于：{{officialHelp.updateTime | simpleDateTime}}</span>
                        </div>

                    </div>
                </div>

                <div class="mail-box">

                    <div class="mail-body">
                      <div class="text-center" v-show="officialHelp.loading">
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                      </div>
                      <div v-html="officialHelp.content"></div>
                    </div>

               </div>
              
            </div>


        </div>


    </div>

</template>
<script>
  import {Notification} from 'element-ui';
  import OfficialHelp from  "../../../../common/model/official/OfficialHelp"

  export default {

    data () {
      return {
        officialHelp: new OfficialHelp()
      }
    },
    components: {},
    methods: {},
    mounted(){
      let that = this;
      this.officialHelp.id = this.$store.state.route.params.id;
      if (this.officialHelp.id) {
        this.officialHelp.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    .by-article-detail {

        .mail-body {
            img {
                max-width: 100%;
            }
        }
    }
</style>