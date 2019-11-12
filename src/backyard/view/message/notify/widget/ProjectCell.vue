<template>
	<div>
		<div class="f18 black">{{messageNotify.getActionName()}}</div>


		<div class="mv5" v-if="messageNotify.action === Action.PROJECT_CREATE">
			<UserProfileLink :user="messageNotify.sender"/>
			创建了项目
		</div>
		<div class="mv5" v-else-if="messageNotify.action === Action.PROJECT_EDIT">
			<UserProfileLink :user="messageNotify.sender"/>
			修改了项目信息
		</div>

		<div class="mv5" v-else-if="
		 messageNotify.action === Action.PROJECT_INCUBATING
		 || messageNotify.action === Action.PROJECT_QUIT
		 || messageNotify.action === Action.PROJECT_GRADUATION
		">
			<UserProfileLink :user="messageNotify.sender"/>
			将状态修改为
			<span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
			</span>
		</div>

    <div class="mv5" v-else-if="messageNotify.action === Action.PROJECT_ASSIGN_MENTOR">
      <UserProfileLink :user="messageNotify.sender"/>
    </div>
    <div class="mv5" v-else-if="messageNotify.action === Action.PROJECT_ASSIGN_CREATOR">
      <UserProfileLink :user="messageNotify.sender"/>重新指定了项目创建者
    </div>

    <div class="mv5"
         v-else-if="messageNotify.action === Action.PROJECT_ATTACHMENTS">
      <span v-html="messageNotify.content"></span>
    </div>

		<div class="mv5" v-if="messageNotify.content && messageNotify.action !== Action.PROJECT_ATTACHMENTS">
			<span>
				{{messageNotify.content}}
			</span>
		</div>

		<div class="mv5" v-if="messageNotify.remark && messageNotify.action !== Action.PROJECT_ASSIGN_MENTOR">
			<span>
				{{messageNotify.remark}}
			</span>
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
