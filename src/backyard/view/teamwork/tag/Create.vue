<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!teamworkTag.editMode">创建标签</span>
          <span v-show="teamworkTag.editMode">编辑标签</span>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">

        <div class="form-group">
          <label class="control-label compulsory">园区地点</label>
          <SpaceRegionalSelection :spaceRegional="teamworkTag.spaceRegional" :editMode="teamworkTag.editMode"></SpaceRegionalSelection>
        </div>

        <div class="form-group">
          <label class="control-label compulsory">类型名称</label>
          <input v-model="teamworkTag.name" type="text" class="form-control">
        </div>

        <div class="form-group">
          <label class="control-label">类型描述</label>
          <input v-model="teamworkTag.description" type="text" class="form-control">
        </div>


        <div class="col-xs-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="teamworkTag.errorMessage">
            {{teamworkTag.errorMessage}}
          </div>
          <CreateSaveButton :entity="teamworkTag" :callback="save"/>
        </div>


      </div>
    </div>
  </div>

</template>
<script>

  import {simpleDateTime, str2Date} from '../../../../common/filter/time'
  import {Notification} from 'element-ui';
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

  import $ from "jquery"
  import TeamworkTag from "../../../../common/model/teamwork/TeamworkTag";

  export default {
    data () {
      return {
        teamworkTag: new TeamworkTag()
      }
    },
    components: {
      CreateSaveButton,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {},
    methods: {
      save(){
        let that = this;
        this.teamworkTag.httpSave(function (response) {

          Notification.success({
            message: that.teamworkTag.editMode ? '修改标签成功！' : '创建标签成功！'
          });
          that.$router.push("/by/teamwork/tag/detail/" + that.teamworkTag.id);

        });
      },
      fetchDetail(){
        this.teamworkTag.httpDetail();
      }
    },

    mounted(){
      let that = this;
      this.teamworkTag.id = this.$store.state.route.params.id;
      if (this.teamworkTag.id) {
        this.teamworkTag.editMode = true;
        this.fetchDetail();
      }

    }
  }
</script>
