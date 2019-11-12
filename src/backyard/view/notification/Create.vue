<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!notification.editMode">创建通知</span>
					<span v-show="notification.editMode">编辑通知</span>
				</h2>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">

			</div>
		</div>

	</div>

</template>
<script>
	import {Notification as NotificationBox} from 'element-ui';
	import Notification from '../../../common/model/notification/Notification'
	import NbTank from '../../../common/widget/NbTank'
	import ArticlePagerSelection from '../../../developer/view/article/Selection.vue'


	export default {

		data () {
			return {
				notification: new Notification()
			}
		},
		components: {
			NbTank,
			ArticlePagerSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;
				this.notification.httpSave(function (response) {


					NotificationBox.success({
						message: that.notification.editMode ? '修改通知成功！' : '创建通知成功！'
					});

					that.$router.push("/by/notification/list");

				});
			}
		},


		mounted(){

			let that = this;
			this.notification.editMode = true;
			this.notification.poster.privacy = false;
			this.notification.id = this.$store.state.route.params.id;
			if (this.notification.id) {
				this.notification.httpDetail();
			} else {
				this.notification.menus = [];
			}
		}
	}
</script>
