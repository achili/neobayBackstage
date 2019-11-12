<template>

	<div>
		<NbSlidePanel :type="entity.archive?'warning':'danger'">
			<span slot="heading" class="f16">
				<i :class="entity.archive?'fa fa-unlock':'fa fa-lock'"></i>
					{{entity.archive ? '解封面板' : '归档面板'}}
			</span>

			<div slot="body">
				<div>
					<i class="fa fa-info-circle"></i>
					<span v-if="entity.archive">
						解封将恢复归档前的状态。
					</span>
					<span v-else>
						归档后的将不能操作，默认不出现在列表中。
					</span>
				</div>
				<div class="mt10">

					<textarea class="form-control" placeholder="备注" v-model="reviewReason"></textarea>
				</div>

				<div class="mt10">
					<SubmitButton v-if="entity.archive" title="解封" :loading="entity.loading" :callback="archive"
					              submitClass="btn btn-warning" submitIcon="fa fa-unlock"/>
					<SubmitButton v-else title="归档" :loading="entity.loading" :callback="archive"
					              submitClass="btn btn-danger" submitIcon="fa fa-lock"/>
				</div>
			</div>

		</NbSlidePanel>
	</div>

</template>


<script>
	import BaseEntity from  "../../../common/model/base/BaseEntity";
	import NbSlidePanel from  "../../../common/widget/NbSlidePanel.vue";
	import SubmitButton from "./SubmitButton.vue";
	import {Notification as NotificationBox} from 'element-ui';

	export default{
		data(){
			return {
				reviewReason: null,
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		computed: {},

		props: {
			entity: {
				type: BaseEntity,
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
		watch: {},
		components: {
			NbSlidePanel,
			SubmitButton
		},
		methods: {
			archive(){

				let that = this;
				this.entity.httpArchive(this.reviewReason, function () {

					NotificationBox.success({
						message: '修改成功！'
					});
					if (typeof that.successCallback === "function") {
						that.successCallback();
					}

				});
			}
		}
	}


</script>
