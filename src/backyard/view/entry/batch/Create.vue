<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="entryBatch.detailLoading">

      <div class="row">

        <div class="col-md-12">
          <h2 v-show="!entryBatch.editMode"><i class="fa fa-fire text-success"></i>创建入驻批次</h2>
          <h2 v-show="entryBatch.editMode"><i class="fa fa-fire text-success"></i>修改入驻批次</h2>
        </div>

        <div class="col-md-12">

          <NbSlidePanel title="入驻批次">

            <div class="row">
              <label class="col-md-2 control-label mt5 compulsory">园区地点</label>
              <div class="col-md-10">
                <SpaceRegionalSelection :spaceRegional="entryBatch.spaceRegional" :editMode="entryBatch.editMode"></SpaceRegionalSelection>
              </div>
            </div>

            <div class="row">
              <label class="col-md-2 control-label mt5 compulsory">批次名称</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="entryBatch.name">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">日期范围</label>
              <div class="col-md-10">
                <NbDateRange type="datetimerange" :startTime="entryBatch.startTime" v-on:startTimeChange="entryBatch.startTime = arguments[0]" :endTime="entryBatch.endTime" v-on:endTimeChange="entryBatch.endTime = arguments[0]"/>
              </div>
            </div>

            <div class="row mt10"  v-if="entryBatch.id">
              <label class="col-md-2 control-label mt5 compulsory">批次进度</label>
              <div class="col-md-10">
                <select class="form-control" v-model="entryBatch.status">
                  <option v-for="status in entryBatch.getStatusList()" :value="status.value">
                    {{status.name}}
                </option>
                </select>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5">备注</label>
              <div class="col-md-10">
              <textarea rows="5" class="form-control"
                        v-model="entryBatch.description" placeholder="备注"></textarea>
              </div>
            </div>

          </NbSlidePanel>

        </div>

        <div class="col-md-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="entryBatch.errorMessage">
            {{entryBatch.errorMessage}}
          </div>
          <CreateSaveButton :entity="entryBatch" :callback="save" />

        </div>
      </div>

    </LoadingFrame>
  </div>
</template>
<script>
	import {MessageBox, Notification} from 'element-ui'
	import {simpleDateTime, str2Date} from '../../../../common/filter/time'
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

	import EntryBatch from  "../../../../common/model/entry/batch/EntryBatch"
	import NbDateRange from  "../../../../common/widget/NbDateRange.vue"
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../widget/LoadingFrame";

	export default{
		data(){
			return {
				entryBatch: new EntryBatch()
			}
		},
		components: {
			NbDateRange,
			NbSlidePanel,
      CreateSaveButton,
      LoadingFrame,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;
				this.entryBatch.httpSave(function (response) {
					Notification.success({
						message: that.entryBatch.editMode ? '修改入驻领域类型成功！' : '创建入驻领域类型成功！'
					});
					that.$router.push("/by/entry/batch/detail/" + that.entryBatch.id);
				});
			},
			fetchDetail(){
				let that = this;
				this.entryBatch.httpDetail();
			}
		},
		mounted(){
			let that = this;
			this.entryBatch.id = this.$store.state.route.params.id;
			if (this.entryBatch.id) {
				this.fetchDetail();
			}
		}
	}
</script>

