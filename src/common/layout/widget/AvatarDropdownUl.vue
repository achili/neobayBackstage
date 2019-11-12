<template>

	<ul class="dropdown-menu">
		<li v-if="user.byMenus && user.byMenus.length !== 0">
			<a href="javascript:void(0)" @click.prevent="$router.push('/by/index')">
				<i class="fa fa-cogs w20 text-center"></i>
				管理中心
			</a>
		</li>

    <li v-if="user.groupMenus && user.groupMenus.length !== 0">
      <a href="javascript:void(0)" @click.prevent="$router.push('/group/index')">
        <i class="fa fa-support w20 text-center"></i>
        项目管理
      </a>
    </li>

    <li v-if="user.byMenus && user.developerMenus.length !== 0">
      <a href="javascript:void(0)" @click.prevent="$router.push('/developer/index')">
        <i class="fa fa-star-half-o w20 text-center"></i>
        开发者中心
      </a>
    </li>

		<li>
			<a href="javascript:void(0)" @click.prevent="$router.push('/user/profile')">
				<i class="fa fa-user-circle w20 text-center"></i>
				个人中心
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" @click.prevent="$router.push('/user/message/letter/list/inbox')">
				<i class="fa fa-envelope-o w20 text-center"></i>
				消息中心
			</a>
		</li>
		<li class="divider"></li>
		<li>
			<a href="javascript:void(0)" @click.prevent="logout()">
				<i class="fa fa-power-off w20 text-center"></i>
				退出
			</a>
		</li>
	</ul>
</template>

<script>
  import { Notification } from 'element-ui';

	export default {
		data () {
			return {
				user: this.$store.state.user
			}
		},
		props: {},
		computed: {},
		methods: {
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

</style>
