<template>
  <div class="officialHelp-list-cell" :style="'margin-left:'+(officialHelp.level-1)*20+'px'">

    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <div class="pull-left text-success">
          {{officialHelp.name?officialHelp.name:"请填写菜单信息"}}
        </div>

        <div class="pull-right">

          <div v-if="officialHelp.type===officialHelp.Type.MENU">
            <a class="btn-action" title="完成" @click.stop.prevent="save" >
              <i v-show="!officialHelp.loading" class="fa fa-check text-warning f18"></i>
              <i v-show="officialHelp.loading" class="fa fa-spinner fa-spin f18"></i>
            </a>
          </div>

        </div>

      </div>

      <NbExpanding>
        <div  class="p20">

          <div class="row">
            <label class="col-md-2 control-label mt5">名称</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="officialHelp.name"/>
            </div>
          </div>


        </div>
      </NbExpanding>


    </div>

  </div>
</template>

<script>
  import OfficialHelp from  "../../../../../common/model/official/OfficialHelp";
  import NbExpanding from '../../../../../common/widget/NbExpanding.vue'
  import {MessageBox, Notification} from 'element-ui';

  export default {
    data () {
      return {}
    },
    components: {
      NbExpanding
    },
    props: {
      officialHelp: {
        type: OfficialHelp,
        required: true
      },
      refreshCallback: {
        type: Function,
        required: true
      }
    },
    methods: {
      save() {
        let that = this;
        this.officialHelp.httpSave(function () {
          that.refreshCallback();
        });
      }
    },
    mounted(){
      this.officialHelp.level = 1;
      this.officialHelp.type = this.officialHelp.Type.MENU;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  .officialHelp-list-cell {
    .panel {
      margin-bottom: 5px;
    }
    .panel-heading {
      border-color: transparent;
      cursor: pointer;
      background: #F8FAFF;
      text-decoration: none;
      font-weight: bold;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
  }

</style>


