<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="protocolIncubator.detailLoading">
      <div class="row">

        <div class="col-md-12">
          <h2 v-show="!protocolIncubator.editMode"><i class="fa fa-fire text-success"></i>创建孵化协议</h2>
          <h2 v-show="protocolIncubator.editMode"><i class="fa fa-fire text-success"></i>修改孵化协议</h2>
        </div>


        <div class="col-md-12">

          <NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-leaf"></i>
              基本信息
            </span>
            <div slot="body">
              <div class="row mt10">
                <label class="col-md-3 control-label compulsory">关联入驻申请</label>
                <div class="col-md-9">
                  <ProjectPagerSelection :activeProject="protocolIncubator.project"/>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label compulsory">名称</label>
                <div class="col-md-9">
                <input v-model="protocolIncubator.name" type="text" class="form-control">
                </div>
              </div>

              <div class="row mt10" v-if="protocolIncubator.editMode===true">
                <label class="col-md-3 control-label compulsory">编号</label>
                <div class="col-md-9">
                  <input v-model="protocolIncubator.no" type="text" class="form-control">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label">孵化协议描述</label>
                <div class="col-md-9">
                <textarea rows="5" class="form-control wp100"
                          v-model="protocolIncubator.description" placeholder="300字左右"></textarea>
                </div>
              </div>


              <div class="row mt10">
                <label class="col-md-3 control-label compulsory">甲方</label>
                <div class="col-md-9">
                <input v-model="protocolIncubator.partyA" type="text" class="form-control">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label compulsory">乙方</label>
                <div class="col-md-9">
                <input v-model="protocolIncubator.partyB" type="text" class="form-control">
                </div>
              </div>


              <div class="row mt10">
                <label class="col-md-3 control-label compulsory">合同年限（单位：年）</label>
                <div class="col-md-9">
                <input v-model="protocolIncubator.year" type="text" class="form-control">
                </div>
              </div>


              <div class="row mt10">
                <label class="col-md-3 control-label compulsory">孵化协议日期范围</label>
                <div class="col-md-9">
                  <NbDateRange :startTime="protocolIncubator.startTime" v-on:startTimeChange="protocolIncubator.startTime = arguments[0]" :endTime="protocolIncubator.endTime" v-on:endTimeChange="protocolIncubator.endTime = arguments[0]"/>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label">孵化空间</label>
                <div class="col-md-9">
                <input v-model="protocolIncubator.space" type="text" class="form-control">
                </div>
              </div>

            </div>
          </NbSlidePanel>


        </div>



        <div class="col-md-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="protocolIncubator.errorMessage">
            {{protocolIncubator.errorMessage}}
          </div>
          <CreateSaveButton :entity="protocolIncubator" :callback="save" />
        </div>
      </div>
    </LoadingFrame>

  </div>
</template>
<script>
	import {MessageBox, Notification} from 'element-ui'

	import ProtocolIncubator from  "../../../../common/model/protocol/incubator/ProtocolIncubator"
	import ProjectPagerSelection from  "../../project/Selection.vue";
	import TemplatePagerSelection from  "../../../../developer/view/template/Selection.vue";
	import NbDateRange from  "../../../../common/widget/NbDateRange.vue"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../widget/LoadingFrame";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import Preference from "../../../../common/model/preference/Preference";

	export default{
		data(){
			return {
				protocolIncubator: new ProtocolIncubator(),
        preference : new Preference()
			}
		},
		components: {
			ProjectPagerSelection,
			TemplatePagerSelection,
			NbDateRange,
      CreateSaveButton,
      LoadingFrame,
      NbSlidePanel
		},
		computed: {},
		watch: {

			"protocolIncubator.project.name"(newVal, oldVal){
				this.protocolIncubator.name = "零号湾孵化器孵化协议-" + this.protocolIncubator.project.name;
			},
      "protocolIncubator.project.id"(newVal, oldVal){
        if (this.protocolIncubator.editMode !== true || oldVal !== 0) {
          this.spaceUpdate();
        }

      }
		},
		methods: {
      spaceUpdate(){
        let that = this;
       this.preference.httpSearch(this.protocolIncubator.project.spaceRegional.id,function () {
         that.protocolIncubator.partyA = that.preference.party;
       })

      },
			save(){
				let that = this;
				if (!this.protocolIncubator.editMode) {
					this.protocolIncubator.status = "NEW";
				}
				this.protocolIncubator.httpSave(function (response) {
					Notification.success({
						message: that.protocolIncubator.editMode ? '修改孵化协议成功！' : '创建孵化协议成功！'
					});
					that.$router.push("/by/protocol/incubator/detail/" + that.protocolIncubator.id);
				});
			},
			fetchDetail(){
				let that = this;
				this.protocolIncubator.httpDetail();
			}
		},
		mounted(){
			let that = this;

			this.protocolIncubator.id = this.$store.state.route.params.id;
			if (this.protocolIncubator.id) {
				this.protocolIncubator.editMode = true;
				this.fetchDetail();
			}
		}
	}
</script>

