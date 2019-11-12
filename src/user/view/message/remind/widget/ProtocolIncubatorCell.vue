<template>

	<div>


		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-if="messageRemind.messageNotify.action === Action.PROTOCOL_INCUBATOR_CREATE">

			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			创建了孵化协议

			<router-link :to="'/by/protocol/incubator/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


		</div>

		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.PROTOCOL_INCUBATOR_EDIT">

			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			修改了孵化协议

			<router-link :to="'/by/protocol/incubator/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


		</div>


		<div class="content" :class="{'read':messageRemind.read}" v-else>
			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			将孵化协议
			<router-link :to="'/by/protocol/incubator/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>

			的状态修改为
			<span :class="'label label-'+messageRemind.messageNotify.getActionStyle()">
				{{messageRemind.messageNotify.getActionName()}}
			</span>

			<span class="ml10" v-if="messageRemind.messageNotify.content">
				备注：{{messageRemind.messageNotify.content}}
			</span>
		</div>


		<UnknownCell v-else :messageRemind="messageRemind"/>




	</div>

</template>
<script>

	import MessageNotify from "../../../../../common/model/message/notify/MessageNotify";
	import MessageRemind from "../../../../../common/model/message/remind/MessageRemind";
	import UserProfileLink from "../../../../../backyard/view/widget/UserProfileLink.vue";
	import {
		FeatureType,
		FeatureTypeMap,
		FeatureTypeList,
		ModuleFeatureMap
	} from "../../../../../common/model/core/feature/FeatureType";
	import {EntityType, EntityTypeMap, EntityTypeList} from "../../../../../common/model/core/type/EntityType";
	import {Action, ActionMap, ActionList} from "../../../../../common/model/core/action/Action";
	import UnknownCell from  "./UnknownCell.vue";

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
			UnknownCell
		},
		mounted(){

		}
	}
</script>
