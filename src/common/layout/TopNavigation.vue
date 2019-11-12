<template>
	<div class="top-navigation-bar">
		<nav class="navbar">
			<div class="navbar-header">
				<button class="btn btn-success "
				        @click.stop.prevent="$store.state.config.showDrawer=!$store.state.config.showDrawer">
					<i class="fa fa-bars"></i>
				</button>
			</div>

      <NbLogoBanner></NbLogoBanner>

			<ul class="nav navbar-right">
        <li>
          <a href="javascript:void(0)" @click.stop.preven="chooseZH" v-show="!isZH" class="btn">
            <span>中文</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click.stop.preven="chooseEN" v-show="isZH"  class="btn">
            <span>English</span>
          </a>
        </li>

				<li>
					<a class="message-info" href="javascript:void(0)"
					   @click.stop.prevent="$router.push('/user/message/remind/list')">
						<i class="fa fa-bell"></i>
						<span class="label label-warning"
						      v-if="$store.state.messageManager.remindCount">{{$store.state.messageManager.remindCount}}</span>
					</a>
				</li>

				<li>
					<a class="message-info" href="javascript:void(0)"
					   @click.stop.prevent="$router.push('/user/message/letter/list/inbox')">
						<i class="fa fa-envelope"></i>
						<span class="label label-primary"
						      v-if="$store.state.messageManager.letterCount">{{$store.state.messageManager.letterCount}}</span>
					</a>
				</li>


				<li is="AvatarNaviBarDropdown"></li>


			</ul>
		</nav>
	</div>
</template>
<script>
	import AvatarNaviBarDropdown from "./widget/AvatarNaviBarDropdown.vue";
	import Dropdown from "./widget/AvatarSideNaviDropdown";
	import NbLogoBanner from '../../common/widget/NbLogoBanner';
  import {saveToLocalStorage} from "../util/Utils";
  import Vue from 'vue'

	export default {
		data () {
			return {
				user: this.$store.state.user,
        language: 0,
        isZH: false,
        lang: [{
          label: this.$t('message.zh'),       //模板语法的一种
          value: 0
        }, {
          label: this.$t('message.en'),
          value: 1
        }]
			}
		},
		components: {
			AvatarNaviBarDropdown,
			Dropdown,
      NbLogoBanner
		},
		methods: {
			logout(){
				this.user.httpLogout();
				this.$router.push("/login");
			},
      chooseZH() {
        this.$i18n.locale = 'zh';
        this.isZH = true;
        Vue.set(this.lang, 0, {label: this.$t('message.zh'), value: 0});
        saveToLocalStorage('appLocale', 'zh')
      },
      chooseEN() {
        this.$i18n.locale = 'en';
        this.isZH = false;
        Vue.set(this.lang, 1, {label: this.$t('message.en'), value: 1});
        saveToLocalStorage('appLocale', 'en')
      }
		},
    mounted(){
      console.log(this.$i18n.locale);
      this.$i18n.locale === 'zh' ? this.language = 0 : this.language = 1;
      this.$i18n.locale === 'zh' ? this.isZH = true : this.isZH = false
    }
	}
</script>


<style lang="less" rel="stylesheet/less">

	@import "../assets/css/global/variables";

	//上方的导航栏
	.top-navigation-bar {

		height: @top-navigation-height;
		background-color: white;
		border-bottom: 1px solid #eeeeee;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;

		/*.navbar-title {*/
			/*float: left;*/
			/*cursor: pointer;*/
			/*img {*/
        /*display: block;*/
        /*-webkit-font-smoothing: antialiased;*/
				/*@media (min-width: 768px) {*/
					/*height: 60px;*/
					/*//margin-left: 200px;*/
				/*}*/
				/*@media (max-width: 768px) {*/
					/*margin-top: 5px;*/
					/*height: 50px;*/
				/*}*/

			/*}*/
		/*}*/

		.navbar-header {
			display: inline;
			float: left;
      margin: 10px;
		}

		.navbar-right {

			> li {
				display: inline-block;
				&:last-child {
					margin-right: 15px;
				}
				a {
					color: #999c9e;
					font-size: 14px;
					padding: 6px 12px;
				}
			}

			@media (min-width: 768px) {
				float: right !important;
				margin-right: 0px;
			}

			.message-info {
				position: relative;
				line-height: 52px;

				.label {

					line-height: 12px;
					padding: 2px 5px;
					position: absolute;
					left: 50%;
					bottom: 50%;

				}
			}
		}

		//小屏幕
		@media (min-width: @screen-sm-min) {
			.navbar-header {
				display: none;
			}
		}
		//手机屏幕
		@media (max-width: @screen-xs-max) {

			.navbar-right {
				display: none;
			}
		}

	}

  .nav-title {
    text-align: center;
    cursor: pointer;
  }

  .nav-bar1 {
    float: left;
    margin-right: 7px;
    margin-top: 10px;
  }

  .neo-yellow {
    color: #F5A722;
  }

  .neo-blue {
    color: #1773C3;
  }


  @media (max-width: 466px) {
    .nav-bar2 {
      display: none;
    }
  }
</style>
