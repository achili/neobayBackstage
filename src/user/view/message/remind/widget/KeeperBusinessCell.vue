<template>

	<div>


		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-if="messageRemind.messageNotify.action === Action.KEEPER_BUSINESS_CREATE">

			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			创建了一个企业管家下的服务：
			<router-link :to="'/by/keeper/business/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.projectName}}
			</router-link>
		</div>


		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.KEEPER_BUSINESS_PASS">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的服务

			<router-link :to="'/by/keeper/business/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


			通过审核。


		</div>


		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.KEEPER_BUSINESS_REJECT">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的服务

			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>

			被驳回，原因是：

			<span class="text-danger">
							{{messageRemind.messageNotify.content}}
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
