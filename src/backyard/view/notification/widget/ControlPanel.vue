<template>
	<div>
		<div class="form-group">
			<label class="form-label compulsory">通知名称</label>
			<input type="text" class="form-control" v-model="notification.name"/>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">
				<NbSwitcher size="sm" v-model="notification.mailEnable"/>
				<label class="ml10">
					邮件通知
				</label>
			</div>
			<NbExpanding>


				<div class="panel-body" v-show="notification.mailEnable">

					<div class="form-group">
						<label class="form-label compulsory">发件人</label>
						<input type="text" class="form-control" readonly v-model="notification.mailFromAddress"/>
					</div>
					<div class="form-group">
            <label class="form-label compulsory">收件人</label>(可群发，用;分隔)
						<input type="text" class="form-control" v-model="notification.mailToAddress"/>
					</div>
					<div class="form-group">
						<label class="form-label compulsory">主题</label>
						<input type="text" class="form-control" v-model="notification.mailSubject"/>
					</div>
					<div class="form-group">
						<label class="form-label compulsory">内容</label>

            <NbEditor ref="insert" v-model="notification.mailContent" :isAdvanced="true" height="600px"/>

					</div>
				</div>
			</NbExpanding>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">
				<NbSwitcher size="sm" v-model="notification.messageEnable"/>
				<label class="ml10">
					站内信通知
				</label>
			</div>
			<NbExpanding>
				<div class="panel-body" v-show="notification.messageEnable">

					<div class="form-group">
						<label class="form-label compulsory">主题</label>
						<input type="text" class="form-control" v-model="notification.messageSubject"/>
					</div>
					<div class="form-group">
						<label class="form-label compulsory">内容</label>
            <NbEditor ref="insert2" v-model="notification.messageContent" :isAdvanced="true" height="600px"/>

					</div>
				</div>
			</NbExpanding>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">
				<NbSwitcher size="sm" v-model="notification.smsEnable"/>
				<label class="ml10">
					短信通知
				</label>
			</div>
			<NbExpanding>
				<div class="panel-body" v-show="notification.smsEnable">

					<div class="form-group">
						<label class="form-label compulsory">手机</label>(可群发，用;分隔)
						<input type="text" class="form-control" v-model="notification.smsPhone"/>
					</div>
					<div class="form-group">
						<label class="form-label compulsory">内容</label>
						<textarea class="form-control" rows="3" readonly v-model="notification.smsContent"
						          placeholder="短信内容"></textarea>
					</div>

				</div>
			</NbExpanding>
		</div>

		<div v-show="notification.errorMessage" class="alert alert-danger">
			{{notification.errorMessage}}


		</div>

		<StatusReport :notification="notification"/>

		<div class="text-right">
			<button class="btn btn-primary" @click.stop.prevent="sendNotification" v-show="!notification.loading">
				<i class="fa fa-send"></i>
				发送通知


			</button>
			<button class="btn btn-primary" disabled v-show="notification.loading">
				<i class="fa fa-spinner fa-spin"></i>
				正在发送中...


			</button>

		</div>

	</div>
</template>

<script>
	import Notification from  "../../../../common/model/notification/Notification";
	import NbSwitcher from  "../../../../common/widget/NbSwitcher.vue";
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
	import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
	import NbEditor from  "../../../../common/widget/NbEditor.vue";
	import StatusReport from "./StatusReport";
	import {Notification as NotificationBox} from 'element-ui'

	export default {
		data () {
			return {}
		},
		props: {
			notification: {
				type: Notification,
				required: true
			},
			//发送之前的前置方法
			beforeSendCallback: {
				type: Function,
				required: false
			},
			successCallback: {
				type: Function,
				required: false
			},
			errorCallback: {
				type: Function,
				required: false
			}
		},
		computed: {},
		components: {
			NbSwitcher,
			NbEditor,
			NbSlidePanel,
			NbExpanding,
			StatusReport
		},
		methods: {
			sendNotification(){

				let that = this;

				if (typeof this.beforeSendCallback === "function") {

					that.notification.loading = true;
					this.beforeSendCallback(function () {
						that.notification.loading = false;
						that.send();
					})
				} else {
					that.send();
				}

			},
			send(){
				let that = this;

				this.notification.id = null;

				this.notification.httpSave(function () {

					NotificationBox.success({
						message: '发送通知成功！'
					});

					if (typeof that.successCallback === "function") {
						that.successCallback();
					}
				}, that.errorCallback);
			}
		},
		mounted(){
      this.$refs.insert.insert(this.notification.mailContent)
      this.$refs.insert2.insert(this.notification.messageContent)
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

</style>











