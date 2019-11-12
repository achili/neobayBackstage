<template>
	<div>
		<div class="f18 black">{{messageNotify.getActionName()}}</div>


		<div class="mv5" v-if="messageNotify.action === Action.FINANCE_PAY_INFO_CREATE">
			<UserProfileLink :user="messageNotify.sender"/>
			创建了付款信息单
		</div>

		<div class="mv5" v-else-if="messageNotify.action === Action.FINANCE_PAY_INFO_EDIT">
			<UserProfileLink :user="messageNotify.sender"/>
			编辑了付款信息单
		</div>

		<div class="mv5" v-else-if="messageNotify.action === Action.FINANCE_PAY_INFO_NOTIFY">
			<UserProfileLink :user="messageNotify.sender"/>
			发送了一次付款通知
		</div>

		<div class="mv5" v-else-if="messageNotify.action === Action.FINANCE_PAY_INFO_REMINDER">
			<UserProfileLink :user="messageNotify.sender"/>
			发起了一次催款
		</div>

    <div class="mv5" v-else-if="messageNotify.action === Action.FINANCE_PAY_INFO_INVOICE">
      <UserProfileLink :user="messageNotify.sender"/>
      发起了一次发票通知
    </div>

		<div class="mv5" v-else-if="messageNotify.action === Action.FINANCE_PAY_INFO_PAYING">
			<div>
				<UserProfileLink :user="messageNotify.sender"/>
				收到一笔款项
			</div>
			<div>
				{{messageNotify.content}}
			</div>
		</div>

		<div class="mv5" v-else-if="messageNotify.action === Action.FINANCE_PAY_INFO_FINISH">
			<div>
				<UserProfileLink :user="messageNotify.sender"/>
				收到剩余款项
			</div>
			<div>
				{{messageNotify.content}}
			</div>
		</div>

    <div class="mv5"
         v-else-if="messageNotify.action === Action.FINANCE_PAY_INFO_ARCHIVE || messageNotify.action === Action.FINANCE_PAY_INFO_UNARCHIVE">
			<div>
        操作员：<UserProfileLink :user="messageNotify.sender"/>
        <div>备注：{{messageNotify.content}}</div>
			</div>
    </div>


		<div class="mv5" v-else>
			<UserProfileLink :user="messageNotify.sender"/>
			将状态修改为
			<span :class="'label label-'+messageNotify.getActionStyle()">
				{{messageNotify.getActionName()}}
			</span>
		</div>

		<div class="mv5"
		     v-if="user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_MANAGE) && messageNotify.notifications && messageNotify.notifications.length">
			通知：
			<NotificationStatusReport v-for="notification in messageNotify.notifications" :key="notification.id"
			                          :notification="notification"/>
		</div>

		<div class="mv5" v-if="user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_MANAGE) && messageNotify.remark">
			收款单：
			<a href="javascript:void(0)"
			   @click.stop.prevent="$router.push('/by/finance/bill/receipt/detail/'+getBillReceipt(messageNotify.remark).id)">
				{{getBillReceipt(messageNotify.remark).name}}
			</a>
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
		methods: {
			getBillReceipt(remark){
				if (remark) {
					return JSON.parse(remark);
				} else {
					return {
						id: 0,
						name: "未知错误！"
					}
				}
			}
		},
		components: {
			UserProfileLink,
			NotificationStatusReport
		},
		mounted(){

		}
	}
</script>
