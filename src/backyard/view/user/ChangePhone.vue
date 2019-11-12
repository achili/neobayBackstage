<template>
	<div>

		<div class="row">

			<div class="col-xs-12">

				<NbSlidePanel>

						<span slot="heading" class="text-success">
							<i class="fa fa-lock"></i>
							修改手机
						</span>
					<div>

						<div class="row">
							<label class="col-md-2 control-label mt5 compulsory">新手机</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="phoneValidation.phone">
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">图片验证码</label>
							<div class="col-md-5">
								<input type="text" placeholder="图片验证码" class="form-control" v-model="captcha.value">
							</div>
							<div class="col-md-5">
								<NbCaptcha class="input-group" style="width:100px" :captcha="captcha"/>
							</div>
						</div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">手机验证码</label>
							<div class="col-md-5">
								<input type="text" class="form-control" placeholder="手机验证码" v-model="phoneValidation.value">
							</div>
							<div class="col-md-5">
								<button class="btn btn-info" @click.stop.prevent="phoneValidation.httpFetch()"
								        v-if="phoneValidation.coldingDown===0">获取验证码
								</button>
								<button class="btn btn-info" disabled
								        v-if="phoneValidation.coldingDown>0">{{phoneValidation.coldingDown}}s后重试
								</button>
							</div>
						</div>


						<div class="mt10">


							<div class="alert alert-danger " v-show="user.errorMessage">
								{{user.errorMessage}}
							</div>
							<div class="alert alert-danger " v-show="phoneValidation.errorMessage">
								{{phoneValidation.errorMessage}}
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
	import NbCaptcha from "../../../common/widget/NbCaptcha.vue";
	export default{
		data(){
			return {
				user: this.$store.state.user,
				phoneValidation: this.$store.state.user.phoneValidation,
				captcha: this.$store.state.user.phoneValidation.captcha
			}
		},
		watch: {},
		methods: {
			changePassword(){
				let that = this;
				this.user.errorMessage = "";
				this.user.httpPhoneChange(function (response) {
					Notification.success({
						message: "修改手机成功"
					});
					that.$router.push("/user/profile");
				});
			}
		},
		components: {
			NbSlidePanel,
			LoadingFrame,
			SubmitButton,
			NbCaptcha
		},
		mounted(){
			this.user.errorMessage = null;
			this.user.password = null
			this.user.newPassword = null;
			this.user.reNewPassword = null;

			this.phoneValidation.checkLogin = true;
			this.phoneValidation.checkNotLogin = false;

		}
	}
</script>
