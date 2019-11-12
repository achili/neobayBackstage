<template>

	<li class="dropdown" :class="{'open':open}" ref="dropdown" @mouseover="mouseOver" @mouseout="mouseOut">
		<a href="javascript:void(0)" @blur="loseFocus">
			<img alt="image" class="img-circle w50 h50" :src="user.getAvatarUrl()"/>
		</a>

		<AvatarDropdownUl ref="avatarDropdownUl" @mouseover="mouseOver" @mouseout="mouseOut"/>

	</li>


</template>

<script>

	import $ from "jquery";
	import AvatarDropdownUl from "./AvatarDropdownUl";

	export default {
		data () {
			return {
				user: this.$store.state.user,
				clickMode: false,
				open: false,
				isInside: false
			}
		},
		props: {
			name: {
				type: String,
				required: false,
				"default"() {
					return ""
				}
			}
		},
		components: {
			AvatarDropdownUl
		},
		computed: {

			$dropdown(){
				return $(this.$refs.dropdown);
			}
		},
		methods: {
			toggle(){
				this.open = !this.open;
			},
			click(){

				if (this.clickMode) {
					this.open = !this.open;
				} else {
					this.clickMode = true;
					this.open = true;
				}

			},
			loseFocus(){
				this.open = false;
				this.clickMode = false;
			},
			mouseOver(){
				let that = this;

				//非点击模式下使用悬浮出菜单
				if (!this.clickMode) {
					this.isInside = true;

					if (this.isInside) {
						this.open = true;
					}
				}

			},
			mouseOut(){
				let that = this;

				if (!this.clickMode) {
					this.isInside = false;

					setTimeout(function () {
						if (!that.isInside) {
							that.open = false;
						}
					}, 200);
				}

			},
			logout(){
				this.user.httpLogout();
				this.$router.push("/login");
			}
		},
		mounted(){
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.avatar-navi-bar-dropdown {

	}
</style>
