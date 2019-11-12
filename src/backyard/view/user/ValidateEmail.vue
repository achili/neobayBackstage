<template>
	<div>

		<div class="row">

			<div class="col-xs-12">

				<NbSlidePanel>

					<span slot="heading" class="text-success">
						<i class="fa fa-lock"></i>
						验证邮箱
					</span>
					<div>


						<div v-if="validating">
							<div>
								您的邮箱是：<span class="bold f16">{{user.email}}</span>

								正在验证中...
							</div>
						</div>
						<div v-else>

							<div v-if="user.emailValidate">
								<div>
									您的邮箱是：<span class="bold f16">{{user.email}}</span>
									<span class="text-primary ml10">
									<i class="fa fa-check-square-o f16"></i>
									已验证
								</span>
								</div>
							</div>
							<div v-else>
								<div>
									您的邮箱是：<span class="bold f16">{{user.email}}</span>
								</div>
								<div class="alert alert-danger mt10" v-show="user.errorMessage">
									{{user.errorMessage}}
								</div>
								<div class="alert alert-info mt10" v-show="infoMessage">
									{{infoMessage}}
								</div>
								<div class="mt10">
									<SubmitButton :title="btnTitle" :callback="validateEmail" :loading="user.loading"/>
								</div>
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
	import SubmitButton from "../widget/SubmitButton.vue";
	import {Notification, MessageBox} from 'element-ui';
	export default{
		data(){
			return {
				infoMessage: null,
				btnTitle: "点击验证",
				user: this.$store.state.user,
				validating: false
			}
		},
		watch: {},
		methods: {
			validateEmail(){
				let that = this;
				this.user.httpEmailSend(function (response) {
					that.infoMessage = "验证链接已发到您的邮箱了，请查收。";
					that.btnTitle = "没收到邮件，再次发送";
				}, function (response) {

					that.user.defaultErrorHandler(response);

					that.infoMessage = null;
					that.btnTitle = "点击验证";

				});
			}
		},
		components: {
			NbSlidePanel,
			SubmitButton
		},
		mounted(){
			let that = this;
			let code = this.$store.state.route.query.code;
			if (code) {

				this.validating = true;
				that.user.httpEmailValidate(code, function () {
					that.validating = false;

					//修改了用户信息，会对本地持久化的user产生影响。
					that.user.emailValidate = true;

					that.user.updateLocalStorage({emailValidate: true});

				});

			}


		}
	}
</script>
