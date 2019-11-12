<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">

				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>用户列表</span>
				</h2>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="user in pager.users" class="bg-white p10 mt10 br4">

					<div class="media">
						<!--<div class="pull-left">-->
							<!--<img class="img-rounded img-md" :src="user.getAvatarUrl()">-->
						<!--</div>-->
            <div class="pull-left">
              <NbPhotoFrame :picture="user.getAvatarUrl()" :proportion="100" :width="80"></NbPhotoFrame>
            </div>

						<div class="pull-right action-buttons">
							<a title="编辑" @click.stop.prevent="$router.push('/by/user/edit/'+user.id)">
								<i class="fa fa-pencil text-info f20"></i>
							</a>
							<a href="javascript:void(0)" title="删除" @click.stop.prevent="user.confirmDel(refresh)">
								<i class="fa fa-trash text-danger f20"></i>
							</a>
						</div>
						<div class="media-body cursor"
						     @click.stop.prevent="$router.push('/by/user/profile/' + user.id)">
							<div>
								<span class="f16 black hover-underline cursor">
									{{user.nickname}}
									<span v-if="user.id===currentUser.id"
									      class="text-danger">(It's you)</span>
								</span>
							</div>
							<div>
								<div class="mt5">
									{{user.role.name}}
								</div>
								<div class="mt5">
									<i class="fa fa-envelope text-success"></i>
									{{user.email}}
								</div>
								<div class="mt5">
									<i class="fa fa-phone text-info"></i>
									{{user.phone}}
								</div>
							</div>
							<div class="mv5 text-muted">
								{{user.description}}
							</div>
							<div>
								<span class="mr10">上次登录: {{user.lastTime | humanTime}}</span>
								<span class="mr10">上次IP: {{user.lastIp}}</span>
							</div>

						</div>
					</div>
				</div>

			</div>


			<div class="col-xs-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>

		</div>


	</div>

</template>
<script>

	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../common/widget/NbPager.vue'
  import NbPhotoFrame from '../../../common/widget/NbPhotoFrame'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../common/model/base/Pager"
	import User from  "../../../common/model/user/User"

	export default {

		data () {
			return {
				pager: new Pager(User),
				currentUser: this.$store.state.user
			}
		},
		components: {
			NbFilter,
			NbPager,
      NbPhotoFrame
		},
		computed: {},
		watch: {},
		methods: {

			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>
