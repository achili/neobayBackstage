<template>

	<div>

		<div class="content"
		     v-if="messageRemind.messageNotify.action === Action.COMPANY_CREATE"
		     :class="{'read':messageRemind.read}"
		>

			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			创建了企业：
			<router-link :to="'/by/company/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


		</div>

		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.COMPANY_EDIT">
			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			修改了
			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的企业：
			<router-link :to="'/by/company/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>
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
