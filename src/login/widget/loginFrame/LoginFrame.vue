<template>

	<div>
		<div class="lb-user-login-top-bar">
			<div class="bar container">
				<div class="bar-logo" style="padding-bottom: 70px; margin-left: 140px;margin-right: 7px;margin-top: 10px;">
          <NbLogoBanner></NbLogoBanner>
				</div>
			</div>
		</div>

		<div class="user-login-subject text-center">
			<!--登陆内容主体-->
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<div class="login-subject-banner text-center">
							<div class="subject-banner-title">从<span class="banner-title-big">零</span>启航</div>
							<div class="subject-banner-subtitle">
								<div class="banner-subtitle-content">
									<span class="subtitle-content-text">零号湾为“从零起步”的创业团队和企业提供全面的支持服务</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="login-subject-form">
							<div class="subject-form-subject">
								<slot></slot>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<FootBar></FootBar>
	</div>

</template>

<script>
	import FootBar from "./widget/FootBar.vue";
  import NbLogoBanner from '../../../common/widget/NbLogoBanner';

	export default{
		data(){
			return {}
		},
		components: {
			FootBar,
      NbLogoBanner
		},
		methods: {
			openMail(url){
				window.location.href = url;
			},
			open(url){
				window.open(url);
			}
		},
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.lb-user-login-top-bar {
		background-color: white;
		.bar {
			margin-bottom: 0;
			.bar-logo {
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
			}
		}
	}

	.lb-user-login {
		.user-login-subject {
			background: url(../../../common/assets/img/login_background.jpg) 30% 0;
			background-size: cover;
			min-height: 660px;
			.login-subject-banner {
				margin-top: 200px;
				@media (max-width: 768px) {
					margin-top: 20px;
				}
				.subject-banner-title {
					color: #2d79bc;
					font-family: '微软雅黑', serif;
					font-size: 70px;
					font-weight: 900;
					opacity: 0.8;
					.banner-title-big {
						font-size: 85px;
					}
				}
				.subject-banner-subtitle {
					margin-top: 6px;
					font-size: 16px;
					font-weight: 500;
					color: white;
					position: relative;
					background: -webkit-linear-gradient(left, rgba(110, 182, 245, 0), rgba(110, 182, 245, 0.80) 50%, rgba(110, 182, 245, 0));
					.subtitle-content-text {
						line-height: 27px;
					}
				}
			}
			.login-subject-form {
				margin-top: 115px;
				margin-bottom: 60px;
				padding: 17px;
				background-color: rgba(255, 255, 255, 0.15);
				border: transparent;
				border-radius: 10px;
				@media (max-width: 768px) {
					margin-top: 20px;
				}
				.subject-form-subject {
					padding: 28px 45px 15px 45px;
					background-color: white;
					@media (max-width: 991px) {
						padding: 28px 15px 15px 15px;
					}
					.form-subject-logo {
						font-size: 35px;
						font-weight: 600;
						margin-bottom: 20px;
						.subject-logo-yellow {
							color: #f4a322;
						}
						.subject-logo-blue {
							color: #0078c1;
						}
					}
					.button-div {
						button {
							margin-top: 10px;
							width: 100%;
						}
					}

				}
				.form-subject-division {
					margin: 30px 0 15px 0;
				}
				.form-subject-other {
					span {
						margin: 0 10px 0 10px;
					}
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
