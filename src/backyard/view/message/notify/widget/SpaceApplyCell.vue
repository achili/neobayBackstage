<template>
	<div>
		<div class="f18 black">{{messageNotify.getActionName()}}</div>

		<div class="mv5" v-if="messageNotify.action === Action.SPACE_APPLY_CREATE">
			<UserProfileLink :user="messageNotify.sender"/>
			申请了空间
		</div>

		<div class="mv5"
		     v-else-if="messageNotify.action === Action.SPACE_APPLY_ARCHIVE || messageNotify.action === Action.SPACE_APPLY_UNARCHIVE">
			<span>
				{{messageNotify.content}}
			</span>
		</div>

		<div class="mv5" v-else>
			<UserProfileLink :user="messageNotify.sender"/>
			将状态修改为
			<span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
			</span>
		</div>

		<div class="mv5"
		     v-if="messageNotify.action === Action.SPACE_APPLY_REJECT">
			<span>原因：</span>
			<span class="text-danger">{{messageNotify.content}}</span>
		</div>

		<div class="mv5"
		     v-if="messageNotify.notifications && messageNotify.notifications.length && user.hasPermissionAllSpace(FeatureType.SPACE_APPLY_MANAGE)">
			通知：
			<NotificationStatusReport v-for="notification in messageNotify.notifications" :key="notification.id"
			                          :notification="notification"/>
		</div>


		<div>
			<i class="fa fa-clock-o"></i>
      {{messageNotify.createTime | simpleDateMinute}}
		</div>
	</div>
</template>
<script>

	import MessageNotify from "../../../../../common/model/message/notify/MessageNotify";
	import UserProfileLink from "../../../widget/UserProfileLink.vue";
	import NotificationStatusReport from  "../../../notification/widget/StatusReport.vue";
	import {
		FeatureType,
		FeatureTypeMap,
		FeatureTypeList,
		ModuleFeatureMap
	} from "../../../../../common/model/core/feature/FeatureType";
	import {EntityType, EntityTypeMap, EntityTypeList} from "../../../../../common/model/core/type/EntityType";
	import {Action, ActionMap, ActionList} from "../../../../../common/model/core/action/Action";

	export default{
		data(){
			return {
				user: this.$store.state.user,
				FeatureType,
				EntityType,
				Action
			}
		},
		watch: {},
		props: {
			messageNotify: {
				type: MessageNotify,
				required: true
			}
		},
		methods: {},
		components: {
			UserProfileLink,
			NotificationStatusReport
		},
		mounted(){

		}
	}
</script>
