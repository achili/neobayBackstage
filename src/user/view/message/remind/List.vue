<template>
	<div class="message-remind-list animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>全部消息</span>
				</div>

			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">

				<div class="cells" v-show="!pager.loading">


					<div v-for="(messageRemind,index) in pager.messageReminds" class="cell">

						<div class="time-area" v-if="needTimestamp(messageRemind,index)">
							{{messageRemind.messageNotify.createTime | simpleDate}}
						</div>

						<div v-if="messageRemind.messageNotify.entityType === EntityType.ENTRY_APPLY">
							<EntryApplyCell :messageRemind="messageRemind"/>
						</div>

						<div v-else-if="messageRemind.messageNotify.entityType === EntityType.KEEPER_BUSINESS">
							<KeeperBusinessCell :messageRemind="messageRemind"/>
						</div>



						<div v-else-if="messageRemind.messageNotify.entityType === EntityType.PROJECT">
							<ProjectCell :messageRemind="messageRemind"/>
						</div>

						<div v-else-if="messageRemind.messageNotify.entityType === EntityType.PROTOCOL_INCUBATOR">
							<ProtocolIncubatorCell :messageRemind="messageRemind"/>
						</div>



						<div v-else-if="messageRemind.messageNotify.entityType === EntityType.COMPANY">
							<CompanyCell :messageRemind="messageRemind"/>
						</div>


						<div v-else-if="messageRemind.messageNotify.entityType === EntityType.SPACE_APPLY">
							<SpaceApplyCell :messageRemind="messageRemind"/>
						</div>

						<div v-else>
							<UnknownCell :messageRemind="messageRemind"/>
						</div>


					</div>
				</div>
			</div>


			<div class="col-xs-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>

		</div>


	</div>

</template>
<script>

	import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'

	import Pager from  "../../../../common/model/base/Pager"
	import MessageRemind from  "../../../../common/model/message/remind/MessageRemind"
	import {Action} from "../../../../common/model/core/action/Action";
	import {EntityType} from "../../../../common/model/core/type/EntityType";
	import UserProfileLink from "../../../../backyard/view/widget/UserProfileLink.vue";

	import EntryApplyCell from  "./widget/EntryApplyCell";
	import ProjectCell from  "./widget/ProjectCell.vue";
	import ProtocolIncubatorCell from  "./widget/ProtocolIncubatorCell.vue";
	import CompanyCell from  "./widget/CompanyCell.vue";
	import KeeperBusinessCell from  "./widget/KeeperBusinessCell.vue";
	import SpaceApplyCell from  "./widget/SpaceApplyCell.vue";

	import UnknownCell from "./widget/UnknownCell";

	export default {

		data () {
			return {
				Action,
				EntityType,
				pager: new Pager(MessageRemind, 20),
				messageManager: this.$store.state.messageManager
			}
		},
		components: {
			NbFilter,
			NbPager,
			UserProfileLink,
			EntryApplyCell,
			ProjectCell,
			ProtocolIncubatorCell,
			CompanyCell,
			KeeperBusinessCell,
			SpaceApplyCell,
			UnknownCell
		},
		computed: {},
		watch: {},
		methods: {


			//是否有必要显示时间
			needTimestamp(messageRemind, index) {

				if (index === 0) {
					return true;
				}
				let preMessageRemind = this.pager.messageReminds[index - 1];
				let preCreateTime = preMessageRemind.messageNotify.createTime;
				let currentCreateTime = messageRemind.messageNotify.createTime;

				//前一条和当前这一条不在同一天就需要显示时间戳
				return preCreateTime.toDateString() !== currentCreateTime.toDateString();


			},
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				let that = this;
				this.pager.httpFastPage(function () {
					//此步骤操作可能使得badge的数量发生变化。
					that.messageManager.httpCount();

				});


			}
		},
		mounted(){
			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>

<style lang="less" rel="stylesheet/less">
	.message-remind-list {

		.cells {
			background-color: white;
			border-radius: 4px;

			.cell {

				.time-area {
					color: #555555;
					font-weight: bold;
					border-bottom: 1px solid #ddd;
					padding: 10px;
				}
				.content {
					padding: 10px 10px;
					border-bottom: 1px dashed #eeeeee;
					background-color: aliceblue;
					&.read {
						background-color: white;
					}
				}
			}
		}

	}

</style>
