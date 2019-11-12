<template>

	<div class="animated fadeIn row">

		<div class="col-xs-12 mb10 text-right">
			<button class="pull-right btn btn-primary"
			        @click.stop.prevent="resend">
				<i class="fa fa-pencil"></i>
				重新发送
			</button>
		</div>

		<div class="col-xs-12">

			<div class="f14 bold mb20">
				{{notification.name}}
			</div>

			<NbSlidePanel v-if="notification.mailEnable">

				<span slot="heading">
					<i class="fa fa-at w15"></i>
					邮件通知
				</span>
				<div slot="body">

					<div class="row">
						<div class="col-xs-2">
							状态
						</div>
						<div class="col-xs-10">
							<span :class="'label label-'+notification.getStatusStyle(notification.mailStatus)">{{notification.getStatusName(notification.mailStatus)}}</span>
						</div>
					</div>

					<div class="row mt10" v-if="notification.mailStatus !== 'OK' ">
						<div class="col-xs-2">
							错误
						</div>
						<div class="col-xs-10">
							<span class="text-danger" v-if="notification.mailResult">
								{{notification.mailResult}}
							</span>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-xs-2">
							发件人
						</div>
						<div class="col-xs-10 bold">
							{{notification.mailFromAddress}}
						</div>
					</div>

					<div class="row mt10">
						<div class="col-xs-2">
							收件人
						</div>
						<div class="col-xs-10 bold">
							{{notification.mailToAddress}}
						</div>
					</div>

					<div class="row mt10">
						<div class="col-xs-2">
							主题
						</div>
						<div class="col-xs-10 bold">
							{{notification.mailSubject}}
						</div>
					</div>
					<div class="row mt10">
						<div class="col-xs-12">
							内容
						</div>
						<div class="col-xs-12 mt10">
							<div class="border br4 p10">
								<div v-html="notification.mailContent"></div>
							</div>
						</div>
					</div>

				</div>

			</NbSlidePanel>

			<NbSlidePanel  v-if="notification.messageEnable">

				<span slot="heading">
					<i class="fa fa-envelope-o w15"></i>
					站内信通知
				</span>
				<div slot="body">

					<div class="row">
						<div class="col-xs-2">
							状态
						</div>
						<div class="col-xs-10">
							<span :class="'label label-'+notification.getStatusStyle(notification.messageStatus)">{{notification.getStatusName(notification.messageStatus)}}</span>
						</div>
					</div>


					<div class="row mt10" v-if="notification.messageStatus !== 'OK' ">
						<div class="col-xs-2">
							错误
						</div>
						<div class="col-xs-10">
							<span class="text-danger" v-if="notification.messageResult">
								{{notification.messageResult}}
							</span>
						</div>
					</div>

					<div class="row mt10">
						<div class="col-xs-2">
							主题
						</div>
						<div class="col-xs-10 bold">
							{{notification.messageSubject}}
						</div>
					</div>
					<div class="row mt10">
						<div class="col-xs-12">
							内容
						</div>
						<div class="col-xs-12 mt10">
							<div class="border br4 p10">
								<div v-html="notification.messageContent"></div>
							</div>
						</div>
					</div>

				</div>

			</NbSlidePanel>


			<NbSlidePanel v-if="notification.smsEnable">

				<span slot="heading">
					<i class="fa fa-mobile-phone w15"></i>
					短信通知
				</span>
				<div slot="body">

					<div class="row">
						<div class="col-xs-2">
							状态
						</div>
						<div class="col-xs-10">
							<span :class="'label label-'+notification.getStatusStyle(notification.smsStatus)">{{notification.getStatusName(notification.smsStatus)}}</span>
						</div>
					</div>

					<div class="row mt10" v-if="notification.smsStatus !== 'OK' ">
						<div class="col-xs-2">
							错误
						</div>
						<div class="col-xs-10">
							<span class="text-danger" v-if="notification.smsResult">
								{{notification.smsResult}}
							</span>
						</div>
					</div>


					<div class="row mt10">
						<div class="col-xs-2">
							手机
						</div>
						<div class="col-xs-10 bold">
							{{notification.smsPhone}}
						</div>
					</div>
					<div class="row mt10">
						<div class="col-xs-12">
							内容
						</div>
						<div class="col-xs-12 mt10">
							<div class="border br4 p10">
								<div v-html="notification.smsContent"></div>
							</div>
						</div>
					</div>

				</div>

			</NbSlidePanel>


		</div>

	</div>

</template>
<script>
	import {MessageBox, Notification as NotificationBox} from 'element-ui'

	import Notification from  "../../../common/model/notification/Notification"
	import NbSlidePanel from  "../../../common/widget/NbSlidePanel.vue"
	import NbExpanding from  "../../../common/widget/NbExpanding.vue";
  import {EntityType} from "../../../common/model/core/type/EntityType";

	export default{
		data(){
			return {
				notification: new Notification()
			}
		},
		components: {
			NbSlidePanel,
			NbExpanding
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.notification.id = this.$store.state.route.params.id;
				if (this.notification.id) {
					this.notification.httpDetail();
				}
			},
      resend(){
        let that = this;
        this.notification.httpResend(function () {
          NotificationBox.success({
            message: '重新发送通知成功！'
          });

          if(that.notification.messageNotify.entityType === EntityType.FINANCE_PAY_INFO){
            that.$router.push("/by/finance/pay/info/detail/" + that.notification.messageNotify.entityId);
          }else if (that.notification.messageNotify.entityType === EntityType.FINANCE_ELECTRIC_PAY){
            that.$router.push("/by/finance/electric/pay/detail/" + that.notification.messageNotify.entityId);
          }

        });
      }
		},
		mounted(){
			this.fetchDetail();
		}
	}
</script>
