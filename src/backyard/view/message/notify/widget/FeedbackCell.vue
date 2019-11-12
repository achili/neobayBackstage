<template>
	<div>
		<div class="f18 black">{{messageNotify.getActionName()}}</div>


		<div class="mv5" v-if="messageNotify.action === Action.FEEDBACK_CREATE">
			<UserProfileLink :user="messageNotify.sender"/>
			创建了反馈信息
		</div>

		<div class="mv5" v-if="messageNotify.action === Action.FEEDBACK_ARCHIVE || messageNotify.action === Action.FEEDBACK_UNARCHIVE">
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

		<div>
      {{messageNotify.createTime | simpleDateMinute}}
		</div>

	</div>

</template>
<script>

	import MessageNotify from "../../../../../common/model/message/notify/MessageNotify";
	import UserProfileLink from "../../../widget/UserProfileLink.vue";
	import NotificationStatusReport from  "../../../notification/widget/StatusReport.vue";
	import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../../common/model/core/feature/FeatureType";
	import {EntityType, EntityTypeMap, EntityTypeList} from "../../../../../common/model/core/type/EntityType";
	import {Action, ActionMap, ActionList} from "../../../../../common/model/core/action/Action";

	export default{
		data(){
			return {
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
