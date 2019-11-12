<template>
	<div>
    <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          预分配社区经理
      </span>
      <div slot="body">

        <div class="form-group clearfix">
          <label class="col-md-2 control-label">预分配项目经理</label>

          <div class="col-md-10">
            <ProjectMentorSelection :activeProjectMentor="entryApply.presetProjectMentor"/>
          </div>
        </div>

        <div class="form-group mt10" v-show="entryApply.errorMessage">
          <div class="alert alert-danger">
            {{entryApply.errorMessage}}
          </div>
        </div>

        <div class="form-group text-right mt10">

          <CreateSaveButton :entity="entryApply" :callback="submit"/>

        </div>
      </div>

    </NbSlidePanel>
	</div>

</template>


<script>
	import EntryApply from  "../../../../../common/model/entry/apply/EntryApply";
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
	import CreateSaveButton from "../../../widget/CreateSaveButton.vue";
	import {Notification as NotificationBox} from 'element-ui';
  import ProjectMentorSelection from  "../../../project/mentor/Selection.vue";

	export default{
		data(){
			return {
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user
      }
		},
		computed: {},
		props: {
			entryApply: {
				type: EntryApply,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
      presetMentorSuccessCallback: {
        type: Function,
        required: false
      }


		},
		watch: {},
		components: {
			NbSlidePanel,
			CreateSaveButton,
      ProjectMentorSelection
		},
		methods: {
			submit(){
        let that = this;
        this.entryApply.httpPresetMentor(that.entryApply.presetProjectMentor.id, function (response) {
          NotificationBox.success({
            message:  '预分项目经理成功！'
          });
          if (typeof that.presetMentorSuccessCallback === "function") {
            that.presetMentorSuccessCallback(response);
          }
        });
			}
		},
		mounted(){}
	}
</script>
