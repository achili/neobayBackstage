<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!policyTag.editMode">创建标签</span>
          <span v-show="policyTag.editMode">编辑标签</span>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">

        <div class="form-group">
          <label class="control-label">园区地点</label>
          <SpaceRegionalSelection :spaceRegional="policyTag.spaceRegional" :editMode="policyTag.editMode"></SpaceRegionalSelection>
        </div>

        <div class="form-group">
          <label class="control-label"><span class="red">*</span>标签名称</label>
          <input type="text" v-model="policyTag.name" class="form-control">
        </div>

        <div class="form-group">
          <label class="control-label">标签描述</label>
          <input type="text" v-model="policyTag.description" class="form-control">
        </div>

        <div class="col-xs-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="policyTag.errorMessage">
            {{policyTag.errorMessage}}
          </div>
          <CreateSaveButton :entity="policyTag" :callback="save" />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import {simpleDateTime, str2Date} from '../../../../../common/filter/time'
  import {Notification} from 'element-ui';
  import PolicyTag from '../../../../../common/model/official/OfficialPolicyTag'
  import CreateSaveButton from '../../../widget/CreateSaveButton.vue'
  import SpaceRegionalSelection from '../../../../../backyard/view/space/regional/Selection'

  import $ from 'jquery'

  export default {
    data() {
      return {
        policyTag: new PolicyTag()
      }
    },
    components: {
      CreateSaveButton,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {},
    methods: {
      save() {
        let that = this;
        this.policyTag.httpSave(function (response) {
          Notification.success({
            message: that.policyTag.editMode ? '修改标签成功！' : '创建标签成功'
          });
          that.$router.push("/by/official/policy/tag/detail/" + that.policyTag.id);
        });
      },
      fetchDetail() {
        this.policyTag.httpDetail();
      }
    },
    mounted() {
      let that = this;
      this.policyTag.id = this.$store.state.route.params.id;
      if (this.policyTag.id) {
        this.policyTag.editMode = true;
        this.fetchDetail();
      }
    }
  }
</script>
