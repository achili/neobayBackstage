<template>
	<div class="lb-user-register">
		<div class="lb-user-login-top-bar">
			<div class="bar container" style="padding: 20px;">
        <div style="margin-bottom: 20px;">
          <NbLogoBanner></NbLogoBanner>
        </div>
				<div class="bar-logo pull-left ml20">
					<span class="welcome pull-left">欢迎注册</span>
				</div>

				<div class="login-portal pull-right">已有账号？<span class="login pointer"
				                                                @click="$router.push('/login')">请登录</span></div>
			</div>
			<div class="coloured-ribbon">
				<div class="coloured-ribbon-light"></div>
			</div>
		</div>

		<div class="container">
			<div class="register-form text-center animated fadeIn" v-if="view==='REGISTER'">

				<div class="input-group input-box">
					<span class="input-group-addon"><i class="fa fa-envelope w14"></i></span>
					<input type="email" class="form-control" placeholder="邮箱" v-model="user.email" @keyup.enter="register">
				</div>

				<div class="input-group input-box">
					<span class="input-group-addon"><i class="fa fa-user w14"></i></span>
					<input type="email" class="form-control" placeholder="您的真实姓名，姓名一旦提交不可更改" v-model="user.nickname"
					       @keyup.enter="register">
				</div>
				<div class="input-group input-box">
					<span class="input-group-addon"><i class="fa fa-unlock-alt w14"></i></span>
					<input type="password" class="form-control" placeholder="密码" v-model="user.password" @keyup.enter="register">
				</div>
				<div class="input-group input-box">
					<span class="input-group-addon"><i class="fa fa-lock w14"></i></span>
					<input type="password" class="form-control" placeholder="确认密码" v-model="user.repassword"
					       @keyup.enter="register">
				</div>
				<div class="input-group input-box">
					<span class="input-group-addon"><i class="fa fa-mobile f20 w14"></i></span>
					<input type="email" class="form-control" placeholder="手机" v-model="phoneValidation.phone"
					       @keyup.enter="register">
				</div>
				<div class="input-box">
					<div class="row" v-if="captcha && captcha.visible">
						<div class="col-xs-7">
							<div class="input-group" style="margin-right: -20px">
								<span class="input-group-addon">图形验证码</span>
								<input type="text" class="form-control" placeholder="验证码" v-model="captcha.value"
								       @keyup.enter="phoneValidation.httpFetch()">
							</div>
						</div>
						<div class="col-xs-5">
							<NbCaptcha class="input-group" style="width:100px" :captcha="captcha"/>
						</div>
					</div>
				</div>
				<div class="input-box">
					<div class="row">
						<div class="col-xs-7">
							<div class="input-group" style="margin-right: -20px">
								<span class="input-group-addon">手机验证码</span>
								<input type="text" class="form-control" placeholder="验证码" v-model="phoneValidation.value"
								       @keyup.enter="register">
							</div>
						</div>
						<div class="col-xs-5">
							<div class="input-group">
								<button class="btn btn-info" @click.stop.prevent="phoneValidation.httpFetch()"
								        v-if="phoneValidation.coldingDown===0">获取验证码
								</button>
								<button class="btn btn-info" disabled
								        v-if="phoneValidation.coldingDown>0">{{phoneValidation.coldingDown}}s后重试
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="agreement">
					<NbCheckbox v-model="agree" class="pull-left"/>
					<span class="ml10">
           阅读并同意
          </span>
					<a class="pull" href="javascript:void(0)" @click.stop.prevent="view = 'PROTOCOL'">《零号湾用户注册协议》</a>
					<a class="pull" href="javascript:void(0)" @click.stop.prevent="view = 'PRIVACY'">《隐私政策》</a>
				</div>

				<div class="alert alert-danger text-left" v-show="user.phoneValidation.errorMessage">
					{{user.phoneValidation.errorMessage}}
				</div>
				<div class="alert alert-danger text-left" v-show="user.errorMessage">
					{{user.errorMessage}}
				</div>
				<div class="button-box">
					<div class="row">
						<div class="col-sm-6">
							<button class="btn btn-warning full-width" @click="register" :disabled="!agree">立即注册</button>
						</div>
						<div class="col-sm-6">
							<button class="btn btn-warning full-width" @click="$router.push('/login')">已有账号，立即登录</button>
						</div>
					</div>
				</div>

			</div>

			<div class="protocol-user animated fadeIn" v-if="view==='PROTOCOL'">
				<ProtocolView/>

				<div>
					<button class="btn btn-danger btn-lg wp100" @click.stop.prevent="view = 'REGISTER'">
						同意并继续
					</button>
				</div>

			</div>

			<div class="privacy-user animated fadeIn" v-if="view==='PRIVACY'">
				<PrivacyView/>
				<button class="btn btn-danger btn-lg wp100" @click.stop.prevent="view = 'REGISTER'">
					同意并继续
				</button>
			</div>
		</div>


		<FootBar></FootBar>

	</div>
</template>

<script>
	import Vue from 'vue'
	import {Notification} from 'element-ui';
	import NbCaptcha from "../../../common/widget/NbCaptcha.vue";
	import Captcha from "../../../common/model/common/Captcha";
	import FootBar from "../../widget/loginFrame/widget/FootBar.vue";
	import ProtocolView from "./widget/Protocol.vue";
	import PrivacyView from "./widget/Privacy.vue";
	import NbCheckbox from "../../../common/widget/NbCheckbox.vue";
	import {startWith} from "../../../common/filter/str";
  import NbLogoBanner from '../../../common/widget/NbLogoBanner';

	export default{
		data(){
			return {
				view: "REGISTER",
				agree: false,
				user: this.$store.state.user,
				phoneValidation: this.$store.state.user.phoneValidation,
				captcha: this.$store.state.user.phoneValidation.captcha
			}
		},
		components: {
			NbCaptcha,
			FootBar,
			NbCheckbox,
			ProtocolView,
			PrivacyView,
      NbLogoBanner
		},
		watch: {
			"phoneValidation.phone"(newVal, oldVal){
				this.user.phone = newVal;
			}
		},
		methods: {
			register(){
				this.user.errorMessage = '';
				let that = this;
				this.user.httpRegister(function (response) {
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
					that.user.captcha.refreshTime = new Date();
				});
			}
		},
		mounted(){
			this.user.errorMessage = null;
			this.phoneValidation.checkLogin = true;
			this.phoneValidation.reset();

		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.lb-user-register {
		@input-height: 40px;
		background-color: white;
		.lb-user-login-top-bar {
			background-color: white;
			.bar {
				margin-bottom: 0;
				.bar-logo {
					position: relative;
					img {
						margin-top: 10px;
						margin-bottom: 5px;
						height: 64px;
						width: auto;
						cursor: pointer;
						@media (max-width: 768px) {
							height: 55px;
						}
						@media (max-width: 366px) {
							height: 45px;
						}
					}
					.welcome {
						margin-top: -14px;
						font-size: 28px;
						@media (max-width: 768px) {
							display: none;
						}
					}
				}
				.login-portal {
					font-size: 15px;
					/*margin-top: 35px;*/
					@media (max-width: 508px) {
						margin-top: 0;
					}
					.login {
						font-weight: 600;
					}
				}
			}
			.coloured-ribbon {
				height: 6px;
				width: 100%;
				position: relative;
				background-color: #0078c1;
				.coloured-ribbon-light {
					position: absolute;
					top: 0;
					height: 6px;
					width: 50%;
					background-color: #f4a322;
				}
			}
		}
		.register-form {
			max-width: 400px;
			margin: 60px auto;

		}
		.agreement {
			text-align: left;
			margin-bottom: 10px;
			a {
				line-height: 22px;
			}
		}
		.input-box {
			margin: 15px 0 15px 0;
			height: @input-height;
			.form-control {
				height: @input-height;
			}
			.btn {
				height: @input-height;
			}
		}
		.button-box {
			margin: 5px 0 15px 0;
			height: @input-height;
			.btn {
				height: @input-height;
			}
			@media (max-width: 768px) {
				height: @input-height;
				.btn {
					height: 40px;
					margin-top: 10px;
				}
			}

		}

		.pointer {
			cursor: pointer;
			&:hover {
				color: #444444;
			}
		}
	}
</style>
