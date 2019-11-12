<template>
	<div class="animated lb-user-login">

		<LoginFrame>

			<div>
				<div class="f18 mb20">重置密码</div>

				<div class="input-group m-b">
					<span class="input-group-addon"><i class="fa fa-mobile f20 w14"></i></span>
					<input type="email" class="form-control" placeholder="手机" v-model="phoneValidation.phone" @keyup.enter="resetPassword">
				</div>

				<div class="input-group m-b">
					<span class="input-group-addon"><i class="fa fa-unlock-alt w14"></i></span>
					<input type="password" class="form-control" placeholder="请输入新密码" v-model="user.newPassword" @keyup.enter="resetPassword">
				</div>

				<div class="input-group m-b">
					<span class="input-group-addon"><i class="fa fa-lock w14"></i></span>
					<input type="password" class="form-control" placeholder="确认新密码" v-model="user.reNewPassword" @keyup.enter="resetPassword">
				</div>


				<div class="row" v-if="captcha && captcha.visible">
					<div class="col-xs-7">
						<div class="input-group m-b" style="margin-right: -20px">
							<span class="input-group-addon">图形验证码</span>
							<input type="text" class="form-control" placeholder="验证码" v-model="captcha.value"  @keyup.enter="resetPassword">
						</div>
					</div>
					<div class="col-xs-5">
						<NbCaptcha style="width:100px" :captcha="captcha"/>
					</div>

				</div>

				<div class="row">
					<div class="col-xs-7">
						<div class="input-group m-b" style="margin-right: -20px">
							<span class="input-group-addon">手机验证码</span>
							<input type="text" class="form-control" placeholder="验证码" v-model="phoneValidation.value"  @keyup.enter="resetPassword">
						</div>
					</div>
					<div class="col-xs-5">
						<button class="btn btn-info" @click.stop.prevent="phoneValidation.httpFetch()"
						        v-if="phoneValidation.coldingDown===0">获取验证码
						</button>
						<button class="btn btn-info" disabled
						        v-if="phoneValidation.coldingDown>0">{{phoneValidation.coldingDown}}s后重试
						</button>
					</div>

				</div>


				<div class="alert alert-danger text-left" v-show="user.phoneValidation.errorMessage">
					{{user.phoneValidation.errorMessage}}
				</div>

				<div class="alert alert-danger text-left" v-show="user.errorMessage">
					{{user.errorMessage}}
				</div>


				<div class="row">
					<div class="col-xs-12">
						<button class="btn btn-primary full-width" @click="resetPassword">重置密码</button>
					</div>
				</div>

				<div class="row mt10">
					<div class="col-sm-6">
						<button class="btn btn-warning full-width" @click="$router.push('/login/register')">前往注册</button>
					</div>
					<div class="col-sm-6">
						<button class="btn btn-warning full-width" @click="$router.push('/login')">前往登录</button>
					</div>
				</div>

			</div>

		</LoginFrame>

	</div>
</template>

<script>
	import Vue from 'vue'
	import {Notification} from 'element-ui';

	import NbCaptcha from "../../common/widget/NbCaptcha.vue";
	import Captcha from "../../common/model/common/Captcha";
	import {validateEmail} from "../../common/filter/validate";
  import LoginFrame from "../widget/loginFrame/LoginFrame.vue";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				phoneValidation: this.$store.state.user.phoneValidation,
				captcha: this.$store.state.user.phoneValidation.captcha
			}
		},
		components: {
			NbCaptcha,
			LoginFrame
		},
		watch: {
			"phoneValidation.phone"(newVal, oldVal){
				this.user.phone = newVal;
			}
		},
		methods: {
			resetPassword(){
				let that = this;
				this.user.httpPasswordReset(function (response) {
					Notification.success({
						message: "重置密码成功，请使用新密码进行登陆"
					});

					that.$router.push("/login");
				})
			}
		},
		mounted(){
			this.user.errorMessage = null;
			this.captcha.visible = true;
			this.phoneValidation.checkLogin = false;
			this.phoneValidation.checkNotLogin = true;
			this.phoneValidation.reset();


			this.user.phone = null;


		}
	}
</script>

