<template>

	<div class="ibox float-e-margins">
		<div class="ibox-content mailbox-content">
			<div class="file-manager">
				<button class="btn btn-block btn-success compose-mail"
				        @click.stop.prevent="$router.push('create')">
					<i class="fa fa-send"></i>
					写私信
				</button>
				<div class="space-25"></div>
				<h5>文件夹</h5>
				<ul class="folder-list m-b-md" style="padding: 0">
					<li>
						<router-link to="inbox">
							<i class="fa fa-inbox "></i>
							收件箱
							<span class="label label-primary pull-right"
							      v-if="$store.state.messageManager.letterCount">
							{{$store.state.messageManager.letterCount}}
						</span>
						</router-link>
					</li>
					<li>
						<router-link to="outbox">
							<i class="fa fa-envelope-o"></i>
							发件箱

						</router-link>
					</li>
					<li>
						<router-link to="flag">
							<i class="fa fa-flag"></i>
							红旗

						</router-link>
					</li>
					<li>
						<router-link to="deleted">
							<i class="fa fa-trash-o"></i>
							已删除

						</router-link>
					</li>
				</ul>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
</template>


<script>

	export default {
		data () {
			return {}
		},
		components: {},
		computed: {},
		watch: {},
		methods: {},
		mounted(){

		}
	}

</script>
