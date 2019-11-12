<template>


	<NbSlidePanel type="primary">
					<span slot="heading" class="f16">
						<i class="fa fa-random"></i>
							大事记录
					</span>
		<span slot="actions">

				</span>
		<div slot="body">

			<div>
				<div id="vertical-timeline" class="vertical-container dark-timeline">
					<div class="vertical-timeline-block"
					     v-for="(messageNotify,index) in messageNotifyPager.messageNotifies">
						<div class="vertical-timeline-icon" :class="'bg-'+messageNotify.getActionStyle()">
							<i class="fa" :class="'fa-'+messageNotify.getActionIcon()"></i>
						</div>

						<div class="vertical-timeline-content">
							<EntryApplyCell v-if="messageNotify.entityType === EntityType.ENTRY_APPLY"
							                :messageNotify="messageNotify"/>
							<FeedbackCell v-else-if="messageNotify.entityType === EntityType.FEEDBACK"
							              :messageNotify="messageNotify"/>
							<FinancePayInfoCell v-else-if="messageNotify.entityType === EntityType.FINANCE_PAY_INFO"
							                    :messageNotify="messageNotify"/>
              <FinancePayInfoCell v-else-if="messageNotify.entityType === EntityType.FINANCE_ELECTRIC_PAY"
                                  :messageNotify="messageNotify"/>
              <FinancePayInfoCell v-else-if="messageNotify.entityType === EntityType.FINANCE_OTHER_PAY"
                                  :messageNotify="messageNotify"/>
							<KeeperBusinessCell v-else-if="messageNotify.entityType === EntityType.KEEPER_BUSINESS"
							                    :messageNotify="messageNotify"/>
							<ProjectCell v-else-if="messageNotify.entityType === EntityType.PROJECT" :messageNotify="messageNotify"/>
							<ProtocolIncubatorCell v-else-if="messageNotify.entityType === EntityType.PROTOCOL_INCUBATOR"
							                       :messageNotify="messageNotify"/>
							<ProtocolSpaceCell v-else-if="messageNotify.entityType === EntityType.PROTOCOL_SPACE"
							                   :messageNotify="messageNotify"/>
							<SpaceApplyCell v-else-if="messageNotify.entityType === EntityType.SPACE_APPLY"
							                :messageNotify="messageNotify"/>
              <InvestmentCell v-else-if="messageNotify.entityType === EntityType.INVESTMENT"
                              :messageNotify="messageNotify"/>
              <MakerSimpleApplyCell v-else-if="messageNotify.entityType === EntityType.MAKER_SIMPLE_APPLY"
                              :messageNotify="messageNotify"/>
              <MakerApartmentCell v-else-if="messageNotify.entityType === EntityType.MAKER_APARTMENT"
                                    :messageNotify="messageNotify"/>
							<div v-else>
								<span class="text-danger">一条未定义的消息类型，请及时排查 {{messageNotify.action}}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="mv20">
					<NbPager :pager="messageNotifyPager" :callback="refresh"></NbPager>
				</div>

			</div>


		</div>
	</NbSlidePanel>


</template>


<script>
	import MessageNotify from  "../../../../common/model/message/notify/MessageNotify";
	import EntryApply from  "../../../../common/model/entry/apply/EntryApply"
	import BaseEntity from  "../../../../common/model/base/BaseEntity"
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue"
	import UserProfileLink from "../../widget/UserProfileLink";
	import Pager from  "../../../../common/model/base/Pager";
	import NbPager from  "../../../../common/widget/NbPager.vue";
	import NotificationStatusReport from  "../../notification/widget/StatusReport.vue";
	import {EntityType, EntityTypeMap, EntityTypeList} from "../../../../common/model/core/type/EntityType";

	import EntryApplyCell from "./widget/EntryApplyCell.vue";
	import FeedbackCell from "./widget/FeedbackCell.vue";
	import FinancePayInfoCell from "./widget/FinancePayInfoCell.vue";
	import ProjectCell from "./widget/ProjectCell.vue";
	import KeeperBusinessCell from "./widget/KeeperBusinessCell.vue";
	import ProtocolIncubatorCell from "./widget/ProtocolIncubatorCell.vue";
	import ProtocolSpaceCell from "./widget/ProtocolSpaceCell.vue";
	import SpaceApplyCell from "./widget/SpaceApplyCell.vue";
  import InvestmentCell from "./widget/InvestmentCell.vue";
  import MakerSimpleApplyCell from "./widget/MakerSimpleApplyCell.vue";
  import MakerApartmentCell from "./widget/MakerApartmentCell.vue";

	export default{
		data(){
			return {
				EntityType,
        messageNotifyPager: new Pager(MessageNotify, 5),
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		props: {
			entity: {
				type: BaseEntity,
				required: true
			}
		},

		methods: {
			refresh(){
				this.messageNotifyPager.setFilter("entityId", this.entity.id);
				this.messageNotifyPager.setFilter("entityType", this.entity.getEntityType());

        let that = this
        this.messageNotifyPager.httpFastPage(function () {
          that.messageNotifyPager.messageNotifies = that.messageNotifyPager.messageNotifies.reverse()
        })

			}
		},
		components: {
			NbSlidePanel,
			UserProfileLink,
			NbPager,
			NotificationStatusReport,
			EntryApplyCell,
			FeedbackCell,
			FinancePayInfoCell,
			ProjectCell,
			KeeperBusinessCell,
			ProtocolIncubatorCell,
			ProtocolSpaceCell,
			SpaceApplyCell,
      InvestmentCell,
      MakerSimpleApplyCell,
      MakerApartmentCell
		},
		mounted(){
		}

	}


</script>
