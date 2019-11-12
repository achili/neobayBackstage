<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!officialHelp.editMode">发布帮助</span>
          <span v-show="officialHelp.editMode">编辑帮助</span>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <CreateSaveButton  :entity="officialHelp" :callback="save" />
      </div>
      <div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label">标题</label>
          <input type="text" class="form-control" v-model="officialHelp.name">
        </div>

        <div class="m-b-md" v-show="officialHelp.type!==officialHelp.Type.MENU">
          <label class="control-label">正文</label>
          <div>
            <NbEditor v-model="officialHelp.content" height="800px;"/>
          </div>
        </div>

      </div>
        <div class="col-xs-12 m-t-md">
          <div class="alert alert-danger" v-show="officialHelp.errorMessage">
            {{officialHelp.errorMessage}}

          </div>
          <div>
            <CreateSaveButton  :entity="officialHelp" :callback="save" />
          </div>
        </div>
    </div>
  </div>

</template>
<script>
  import NbTank from '../../../../common/widget/NbTank'
  import NbEditor from "../../../../common/widget/NbEditor"
  import NbBtnDropdown from '../../../../common/widget/NbBtnDropdown.vue'
  import {simpleDateTime, str2Date} from '../../../../common/filter/time'
  import {Notification} from 'element-ui';
  import OfficialHelp from  "../../../../common/model/official/OfficialHelp"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"

  import Pager from  "../../../../common/model/base/Pager"


  import $ from "jquery"

  export default {

    data () {
      return {
        name: "菜单",
        superMenu : false,
        officialHelp: new OfficialHelp()
      }
    },
    components: {
      NbTank,
      NbEditor,
      NbBtnDropdown,
      CreateSaveButton
    },
    computed: {},
    watch: {
    },
    methods: {
      save(){
        let that = this;
        this.officialHelp.httpSave(function (response) {
          Notification.success({
            message: that.officialHelp.editMode ? '修改帮助成功！' : '创建帮助成功！'
          });
          that.$router.push("/by/official/help/list");
        });
      }
    },
    mounted(){
      let that = this;
      this.officialHelp.id = this.$store.state.route.params.id;
      this.officialHelp.type = this.$store.state.route.query.type;
      this.officialHelp.creatorOfficialHelpId = this.$store.state.route.query.creatorHelp;
      if(!this.officialHelp.type) {
        this.officialHelp.type = this.officialHelp.Type.MENU;
      }
      if(!this.officialHelp.creatorOfficialHelpId){
        this.officialHelp.creatorOfficialHelpId = null
      }
      if (this.officialHelp.id) {
        this.officialHelp.editMode = true;
        this.officialHelp.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
