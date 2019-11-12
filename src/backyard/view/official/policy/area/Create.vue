<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!policyArea.editMode">创建地区</span>
          <span v-show="policyArea.editMode">地区编辑</span>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label class="control-label">园区地点</label>
          <SpaceRegionalSelection :spaceRegional="policyArea.spaceRegional" :editMode="policyArea.editMode"></SpaceRegionalSelection>
        </div>

        <div>
          <NbDistrict v-model="policyArea.name" :maxLevel="2"></NbDistrict>
        </div>

        <div class="col-xs-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="policyArea.errorMessage">
            {{policyArea.errorMessage}}
          </div>
          <CreateSaveButton :entity="policyArea" :callback="save" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {simpleDateTime, str2Date} from '../../../../../common/filter/time'
  import {Notification} from 'element-ui';
  import PolicyArea from '../../../../../common/model/official/OfficialPolicyArea'
  import CreateSaveButton from '../../../widget/CreateSaveButton.vue'
  import NbDistrict from '../../../../../common/widget/NbDistrict.vue'
  import $ from 'jquery'
  import SpaceRegionalSelection from '../../../../../backyard/view/space/regional/Selection'

  export default {
    data() {
      return {
        policyArea: new PolicyArea()
      }
    },
    components: {
      CreateSaveButton,
      NbDistrict,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {},
    methods: {
      save() {
        let that = this;
        this.policyArea.httpSave(function (response) {
          Notification.success({
            message: that.policyArea.editMode ? '修改地区成功' : '地区创建成功'
          });
          that.$router.push("/by/official/policy/area/detail/" + that.policyArea.id);
        });
      },
      fetchDetail() {
        this.policyArea.httpDetail();
      }
    },
    mounted() {
      let that = this;
      this.policyArea.id = this.$store.state.route.params.id;
      if (this.policyArea.id) {
        this.policyArea.editMode = true;
        this.fetchDetail();
      }
    }
  }
</script>
