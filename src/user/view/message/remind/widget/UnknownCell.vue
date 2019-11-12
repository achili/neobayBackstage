<template>

	<div class="content"
	     :class="{'read':messageRemind.read}">

							<span class="text-danger">
								一条未知状态的提醒通知，请及时排查
							</span>

		sender：
		<UserProfileLink :user="messageRemind.messageNotify.sender"/>

		receiver：
		<UserProfileLink :user="messageRemind.messageNotify.receiver"/>

		entity：{{messageRemind.messageNotify.entity.name}}

		action：{{messageRemind.messageNotify.action}}

	</div>


</template>
<script>

	import MessageNotify from "../../../../../common/model/message/notify/MessageNotify";
	import MessageRemind from "../../../../../common/model/message/remind/MessageRemind";
	import UserProfileLink from "../../../../../backyard/view/widget/UserProfileLink.vue";
	import NotificationStatusReport from  "../../../../../backyard/view/notification/widget/StatusReport.vue";
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
			messageRemind: {
				type: MessageRemind,
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
