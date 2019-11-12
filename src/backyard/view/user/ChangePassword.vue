<template>
	<div>

		<div class="row">

			<div class="col-xs-12">

				<NbSlidePanel>

						<span slot="heading" class="text-success">
							<i class="fa fa-lock"></i>
							修改密码
						</span>
					<div>

						<div class="row">
							<label class="col-md-2 control-label mt5 compulsory">旧密码</label>
							<div class="col-md-10">
								<input type="password" class="form-control" v-model="user.password">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">新密码</label>
							<div class="col-md-10">
								<input type="password" class="form-control" v-model="user.newPassword">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">确认新密码</label>
							<div class="col-md-10">
								<input type="password" class="form-control" v-model="user.reNewPassword">
							</div>
						</div>

						<div class="mt10">


							<div class="alert alert-danger " v-show="user.errorMessage">
								{{user.errorMessage}}
							</div>

							<div class="text-right">
								<SubmitButton :loading="user.loading" :callback="changePassword"/>

							</div>
						</div>

					</div>

				</NbSlidePanel>
			</div>
		</div>
	</div>

</template>
<script>
	import User from '../../../common/model/user/User'
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
	import LoadingFrame from "../widget/LoadingFrame";
	import SubmitButton from "../widget/SubmitButton.vue";
	import {Notification, MessageBox} from 'element-ui';
	export default{
		data(){
			return {

				user: this.$store.state.user
			}
		},
		watch: {},
		methods: {
			changePassword(){
				let that = this;
				this.user.httpPasswordChange(function (response) {
					Notification.success({
						message: "修改密码成功"
					});

					that.$router.push("/user/profile");

				});
			}
		},
		components: {
			NbSlidePanel,
			LoadingFrame,
			SubmitButton
		},
		mounted(){

			this.user.errorMessage = null;

			this.user.password = null
			this.user.newPassword = null;
			this.user.reNewPassword = null;

		}
	}
</script>
