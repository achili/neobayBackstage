<template>
	<li class="nav-item nav-first-level" :class="{active:menu.active}">
		<a href="javascript:void(0)" @click="menuClick(menu)">
			<i v-if="menu.icon" :class="menu.icon"></i>
			<span class="nav-label">{{menu.name}}</span>

			<i v-if="menu.children && menu.children.length" class="pull-right fa"
			   :class="{'fa-angle-left':!menu.active,'fa-angle-down':menu.active}"></i>

			<span class="label label-danger pull-right"
			      v-if="menu.name === '消息中心' && $store.state.messageManager.totalCount">
				{{$store.state.messageManager.totalCount}}
			</span>

		</a>

		<NbExpanding>
			<ul
				v-show="menu.active"
				v-if="menu.children && menu.children.length"
				class="nav nav-second-level"
			>
				<li v-for="(menu1, index1) in menu.children" :class="{active:menu1.active}">
					<a href="javascript:void(0)" @click="menuClick(menu1)">
						<i v-if="menu1.icon" :class="menu1.icon"></i>
						{{menu1.name}}
						<i v-if="menu1.children && menu1.children.length" class="pull-right fa"
						   :class="{'fa-angle-left':!menu1.active,'fa-angle-down':menu1.active}"></i>

						<span class="label label-warning pull-right"
						      v-if="menu1.name === '提醒' && $store.state.messageManager.remindCount">
							{{$store.state.messageManager.remindCount}}
						</span>

						<span class="label label-primary pull-right"
						      v-if="menu1.name === '站内信' && $store.state.messageManager.letterCount">
							{{$store.state.messageManager.letterCount}}
						</span>

					</a>


					<NbExpanding>
						<ul
							v-show="menu1.active"
							v-if="menu1.children && menu1.children.length"
							class="nav nav-third-level"
						>
							<li v-for="menu2 in menu1.children" :class="{active:menu2.active}">
								<a href="javascript:void(0)" @click="menuClick(menu2)">
									<i v-if="menu2.icon" :class="menu2.icon"></i>
									<span class="nav-label">{{menu2.name}}</span>
									<i v-if="menu2.children && menu2.children.length" class="pull-right fa"
									   :class="{'fa-angle-left':!menu2.active,'fa-angle-down':menu2.active}"></i>

								</a>

								<NbExpanding>
									<ul
										v-show="menu2.active"
										v-if="menu2.children && menu2.children.length"
										class="nav nav-fourth-level"
									>
										<li v-for="menu3 in menu2.children">
											<a href="javascript:void(0)" @click="menuClick(menu3)">
												<i v-if="menu3.icon" :class="menu3.icon"></i>
												<span class="nav-label">{{menu3.name}}</span>
											</a>

										</li>
									</ul>
								</NbExpanding>


							</li>
						</ul>
					</NbExpanding>

				</li>
			</ul>
		</NbExpanding>
	</li>
</template>
<script>

	import NbExpanding from "../widget/NbExpanding.vue";
	import Menu from "../model/lover/Menu";
  import {startWith} from "../../common/filter/str";

	import {mapGetters} from 'vuex'

	export default {
		props: {
			menu: {
				type: Menu,
				required: true
			}
		},
		computed: {
			...mapGetters({
				config: "getConfig"
			})
		},
		components: {
			NbExpanding
		},
		methods: {
			menuClick(menu){
        menu.active = !menu.active;
				if (!menu.children || menu.children.length === 0) {
					if (menu.router.path !== this.$store.state.route.fullPath) {
            if(!startWith(menu.router.path, '/')) {
              window.open(menu.router.path);
            } else {
              this.$router.push(menu.router.path);
            }

					}
				} else {
					//menu.active = !menu.active;
				}

			}
		},
		watch: {},
		mounted(){


		}
	}
</script>


<style lang="less" rel="stylesheet/less">

	.nav-item {
		i {
			width: 12px;
			text-align: center;
		}

	}


</style>
