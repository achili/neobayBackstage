<template>
	<span class="">
		<a href="javascript:void(0)" v-if="notification.id" title="通知详情" @click.stop.prevent="$router.push('/by/notification/detail/'+notification.id)">
			{{notification.name}}
		</a>
		<span class="mh5 " title="邮件" v-if="notification.mailEnable">
			 <span :class="'label label-'+notification.getStatusStyle(notification.mailStatus)">
				<i class="fa fa-at w15"></i>
				邮件{{notification.getStatusName(notification.mailStatus)}}
			 </span>
		</span>
		<span class="mh5 " title="站内信" v-if="notification.messageEnable">
			<span :class="'label label-'+notification.getStatusStyle(notification.messageStatus)">
				<i class="fa fa-envelope-o w15"></i>
				站内信{{notification.getStatusName(notification.messageStatus)}}
			</span>
		</span>
		<span class="mh5 " title="短信" v-if="notification.smsEnable">
			<span :class="'label label-'+notification.getStatusStyle(notification.smsStatus)">
				<i class="fa fa-mobile f15"></i>
				短信{{notification.getStatusName(notification.smsStatus)}}
			</span>
		</span>

	</span>

</template>

<script>
	import Notification from  "../../../../common/model/notification/Notification";
	import NbSwitcher from  "../../../../common/widget/NbSwitcher.vue";
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
	import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
	import NbEditor from  "../../../../common/widget/NbEditor.vue";
	import {Notification as NotificationBox} from 'element-ui'

	export default {
		data () {
			return {}
		},
		props: {
			notification: {
				type: Notification,
				required: true
			}
		},
		computed: {},
		components: {},
		methods: {},
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

</style>











