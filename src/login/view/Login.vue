<template>
	<div class="animated lb-user-login">

		<LoginFrame>
			<div>

				<div class="form-subject-logo">
					<span class="subject-logo-yellow">neo</span><span class="subject-logo-blue">Bay</span>
				</div>

				<!--输入框开始-->
				<div class="input-group m-b">
					<span class="input-group-addon"><i class="fa fa-user w14"></i></span>
					<input type="email" class="form-control" placeholder="邮箱或手机" v-model="user.username"
					       @keyup.enter="login">
				</div>

				<div class="input-group m-b">
					<span class="input-group-addon"><i class="fa fa-unlock-alt w14"></i></span>
					<input type="password" class="form-control" placeholder="密码" v-model="user.localPassword"
					       @keyup.enter="login">
				</div>

				<div class="row" v-if="user.captcha && user.captcha.visible">
					<div class="col-xs-7">
						<div class="input-group m-b">
							<span class="input-group-addon"><i class="fa fa-image w14"></i></span>
							<input type="text" class="form-control" placeholder="验证码" v-model="user.captcha.value"
							       @keyup.enter="login">
						</div>
					</div>
					<div class="col-xs-5">
						<NbCaptcha style="width:100px" :captcha="user.captcha"/>
					</div>
				</div>
				<div class="alert alert-danger text-left" v-show="user.errorMessage">
					{{user.errorMessage}}
				</div>

				<!--输入框结束-->

				<!--按钮-->
				<div class="row button-div">
					<div class="col-md-6">
						<button class="btn btn-primary button" @click="login">登录</button>
					</div>
					<div class="col-md-6">
						<button class="btn btn-success button" @click="$router.push('/login/register')">立即注册
						</button>
					</div>
				</div>

				<hr class="form-subject-division"/>
				<div class="form-subject-other">
					<span class="pointer" @click.stop.prevent="$router.push('/login/password/reset')">忘记密码</span>
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
	import {startWith} from "../../common/filter/str";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				redirect: this.$store.state.route.query.redirect
			}
		},
		components: {
			NbCaptcha,
			LoginFrame
		},
		methods: {
			login(){
				let that = this;
				this.user.httpLogin(function (response) {

					if (that.redirect) {

						if (startWith(that.redirect, "/by")) {
							that.$router.push(that.redirect);
						} else {
							location.href = that.redirect;
						}

					} else {
						location.href = "/";
					}

				}, function (response) {
					that.user.defaultErrorHandler(response);

					that.user.captcha.visible = true;
					that.user.captcha.refresh();

				});
			}
		},
		mounted(){
			this.user.errorMessage = null;
			this.user.captcha.visible = false;


		}
	}
</script>

<style lang="less" rel="stylesheet/less">

</style>
