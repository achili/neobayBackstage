<template>
	<div>
		<div class="f18 black">{{messageNotify.getActionName()}}</div>

		<div class="mv5" v-if="messageNotify.action === Action.KEEPER_BUSINESS_CREATE">
			<UserProfileLink :user="messageNotify.sender"/>
			创建了服务申请
		</div>
		<div class="mv5" v-else-if="messageNotify.action === Action.KEEPER_BUSINESS_EDIT">
			<UserProfileLink :user="messageNotify.sender"/>
			修改了服务申请
		</div>

		<div class="mv5">
			<UserProfileLink :user="messageNotify.sender"/>
			将状态修改为
			<span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
			</span>
		</div>

		<div class="mv5" v-if="messageNotify.content">
			<span>
				{{messageNotify.content}}
			</span>
		</div>

		<div class="mv5" v-if="messageNotify.remark">
			<span>
				{{messageNotify.remark}}
			</span>
		</div>

		<div class="mv5" v-if="messageNotify.notifications && messageNotify.notifications.length && user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)">
			通知： <NotificationStatusReport v-for="notification in messageNotify.notifications" :key="notification.id" :notification="notification"/>
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
