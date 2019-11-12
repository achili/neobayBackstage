<template>
  <div class="officialHelp-list-cell" :style="'margin-left:'+(officialHelp.level-1)*20+'px'" @click="entryDetails(officialHelp)">

    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <div class="pull-left" :class="officialHelp.type===officialHelp.Type.MENU?'text-success':'text-danger'">
          {{officialHelp.name?officialHelp.name:"请填写菜单信息"}}
        </div>

        <div class="pull-right">

          <div v-if="officialHelp.type===officialHelp.Type.MENU">
            <div v-if="officialHelp.editMode">
              <a class="btn-action" title="完成" @click.stop.prevent="save" >
                <i v-show="!officialHelp.loading" class="fa fa-check text-warning f18"></i>
                <i v-show="officialHelp.loading" class="fa fa-spinner fa-spin f18"></i>
              </a>
            </div>
            <div v-else>
              <a class="btn-action" title="编辑" @click.stop.prevent="officialHelp.open = !officialHelp.open;officialHelp.editMode = !officialHelp.editMode">
                <i class="fa fa-pencil text-warning f18"></i>
              </a>

              <a class="btn-action" title="添加一个子菜单" @click.stop.prevent="$router.push({path: '/by/official/help/create/', query: { creatorHelp: officialHelp.id }})">
                <i class="fa fa-plus text-success f18"></i>
              </a>

              <a class="btn-action" title="添加一项内容" @click.stop.prevent="$router.push({path: '/by/official/help/create/', query: { creatorHelp: officialHelp.id, type: 'CONTENT'}})">
                <i class="fa fa-plus-circle text-success f18"></i>
              </a>

              <a class="btn-action" title="上移" @click.stop.prevent="up(officialHelp)">
                <i v-show="officialHelp.loading" class="fa fa-spinner fa-spin f18"></i>
                <i v-show="!officialHelp.loading" class="fa fa-arrow-up f18"></i>
              </a>
              <a class="btn-action" title="删除" @click.stop.prevent="del">
                <i class="fa fa-trash text-danger f18"></i>
              </a>
            </div>
          </div>

          <div v-else>
            <a class="btn-action" title="编辑" @click.stop.prevent="$router.push('/by/official/help/edit/' + officialHelp.id)">
              <i class="fa fa-pencil text-warning f18"></i>
            </a>
            <a class="btn-action" title="上移" @click.stop.prevent="up">
              <i class="fa fa-arrow-up f18"></i>
            </a>
            <a class="btn-action" title="删除" @click.stop.prevent="del">
              <i class="fa fa-trash text-danger f18"></i>
            </a>
          </div>

        </div>

      </div>

      <NbExpanding>
        <div  class="p20" v-show="officialHelp.open">
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
      up() {
        let that = this;
        this.officialHelp.httpUp(function () {
          that.refreshCallback();
        });
      },
      del() {
        let that = this;
        MessageBox.confirm('确定删除此项及他的子项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.officialHelp.httpDel(function () {
            that.refreshCallback();
          });
        }, function () {
        });
      },
      save() {
        let that = this;
        this.officialHelp.httpSave(function () {
          that.refreshCallback();
        });
      },
      entryDetails(officialHelp) {
        if(officialHelp.type === 'CONTENT') {
          this.$router.push('/by/official/help/detail/' + officialHelp.id)
        }

      }
    },
    mounted(){
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


