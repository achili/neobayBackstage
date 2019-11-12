<template>

	<div>

		<div class="content"
		     v-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_CREATE"
		     :class="{'read':messageRemind.read}"
		>

			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			创建了入驻申请：
			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


		</div>

		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_EDIT">

			<UserProfileLink :user="messageRemind.messageNotify.sender"/>
			修改了
			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的入驻申请：
			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


		</div>

		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_REVIEWING">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的入驻申请

			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


			开始审核。

		</div>

		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_FIRST_REVIEW_PASS">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的入驻申请

			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


			通过初审。

		</div>


		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_FIRST_REVIEW_REJECT">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的入驻申请

			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>

			初审被驳回，原因是：
			<span class="text-danger">
							{{messageRemind.messageNotify.content}}
						</span>

		</div>


		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_FINAL_REVIEW_PASS">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的入驻申请

			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>


			通过终审。

		</div>

		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_FINAL_REVIEW_REJECT">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的入驻申请

			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>

			终审被驳回，原因是：

			<span class="text-danger">
							{{messageRemind.messageNotify.content}}
						</span>

		</div>

		<div class="content"
		     :class="{'read':messageRemind.read}"
		     v-else-if="messageRemind.messageNotify.action === Action.ENTRY_APPLY_ARCHIVE">

			<UserProfileLink :user="messageRemind.messageNotify.receiver"/>
			的入驻申请

			<router-link :to="'/by/entry/apply/detail/'+messageRemind.messageNotify.entity.id">
				{{messageRemind.messageNotify.entity.name}}
			</router-link>

			已经归档。


			<span  v-if="messageRemind.messageNotify.content">
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
	import UnknownCell from  "./UnknownCell.vue";

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
			UnknownCell
		},
		mounted(){

		}
	}
</script>
