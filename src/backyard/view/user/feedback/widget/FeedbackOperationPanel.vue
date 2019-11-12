<template>
	<div>
		<NbSlidePanel type="info">
			<span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          操作面板
      </span>

			<div slot="body">
				<div class="row">
					<label class="col-md-2 control-label">当前状态{{feedback.status}}</label>
					<div class="col-md-10">
							<span
								:class="'label label-'+feedback.getStatusStyle()">{{feedback.getStatusName()}}</span>
					</div>
				</div>

				<div class="row">
					<label class="col-md-2 control-label">更改状态</label>
					<div class="col-md-10">
						<NbBtnDropdown :name="reviewStatusMap['name']" size="sm" :color="reviewStatusMap['style']">
							<ul>
								<li v-for="(option, index) in feedback.StatusList">
									<a href="javascript:void(0)"
									   @click="reviewStatus = option.value">{{option.name}}</a>
								</li>
							</ul>
						</NbBtnDropdown>

						<div class="mt5">

								<span v-if="reviewStatus === Status.NEW">
									<i class="fa fa-info-circle ml10"></i>
									反馈还未修复
								</span>
								<span v-if="reviewStatus === Status.OK">
									<i class="fa fa-info-circle ml10"></i>
									反馈已经修复
								</span>
						</div>

					</div>
				</div>

				<div class="row"
				     v-show="reviewStatus === 'FINISH'">

					<label class="col-md-2 control-label">Bug原因</label>

					<div class="col-md-10">

							<textarea class="form-control" rows="3" v-model="reviewReason"
							          placeholder="请填写出现原因……"></textarea>

					</div>
				</div>

				<div class="mt10" v-show="feedback.errorMessage">
					<div class="alert alert-danger">
						{{feedback.errorMessage}}
					</div>
				</div>

				<div class="text-right mt10">
					<SubmitButton :loading="feedback.loading" :callback="submit"/>
				</div>
			</div>
		</NbSlidePanel>
	</div>
</template>

<script>
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
  import NbTanks from '../../../../../common/widget/NbTanks'
  import Feedback from  "../../../../../common/model/user/feedback/Feedback"
  import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue"
  import SubmitButton from "../../../widget/SubmitButton.vue"

	export default{
    data(){
      return{
        reviewStatus: Feedback.prototype.Status.NEW,
        reviewReason: null,
        submitErrorMessage: null,
        Status: Feedback.prototype.Status,
        StatusMap: Feedback.prototype.StatusMap,
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user
      }
    },
		computed:{
      reviewStatusMap(){
        return this.feedback.getStatusItem(this.reviewStatus);
      }
		},
		props:{
      feedback:{
        type: Feedback,
        required: true,
        validator: function (entity) {
          return true;
        }
      },
      successCallback: {
        type: Function,
        required: false
      }

		},
		watch:{
      "feedback.status"(newVal, oldVal){
        this.reviewStatus = newVal;
      }
		},
		components:{
      NbSlidePanel,
      NbTanks,
      NbBtnDropdown,
      SubmitButton
		},
		methods:{

      submit(){
        let that = this;

        if (this.reviewStatus === Feedback.prototype.Status.FINISH) {
          if (!this.reviewReason) {
            this.feedback.errorMessage = "请填写理由";
            return;
          }
        }
        this.feedback.errorMessage = null;

        that.feedback.httpStatus(this.reviewStatus, this.reviewReason, this.successCallback);
      }
		}
	}
</script>