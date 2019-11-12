<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="keeperBusiness.detailLoading">
					<div class="text-right mb10">
						<a title="编辑" class="btn btn-success"
						   @click.stop.prevent="$router.push({ path: 'edit', query: { id: keeperBusiness.id }})">
							<i class="fa fa-pencil"></i>
							编辑
						</a>
					</div>

					<div class="row">
						<div class="col-md-12">
							<KeeperBusinessView :keeperBusiness="keeperBusiness"/>
						</div>
						<!--pdf预览-->
						<div class="col-md-12"
						     v-if="user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,keeperBusiness.spaceRegional.id) || user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MINE,keeperBusiness.spaceRegional.id) || keeperBusiness.status === keeperBusiness.Status.PASS">
							<KeeperBusinessInfoPdfPreview :keeperBusiness="keeperBusiness"/>
						</div>
					</div>
					<!--大事记录-->
					<div ref="flowNode">
						<MessageNotifyView ref="messageNotifyView" :entity="keeperBusiness"/>
					</div>

					<!--操作面板-->
					<div v-if="user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,keeperBusiness.spaceRegional.id)">
						<NbExpanding>
							<NbSlidePanel type="info" v-show="flipped">
					      <span slot="heading" class="f16">
					        <i class="fa fa-cogs"></i>
					          操作面板
					      </span>
								<span slot="actions">
					        <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					      </span>
								<div slot="body">
									<KeeperBusinessOperationPanel :keeperBusiness="keeperBusiness"
									                              :successCallback="operationSuccessCallback"/>
								</div>
							</NbSlidePanel>
						</NbExpanding>

            <div v-if="keeperBusiness.status === 'PASS'">
              <NbExpanding>
    <!--              v-show="!flipped"-->
                <NbSlidePanel type="primary" >
                  <span slot="heading" class="f16">
                    <i class="fa fa-cogs"></i>
                      评审通知
                  </span>
                  <span slot="actions">
                    <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
                  </span>
                  <div slot="body">

                    <el-tabs v-model="tabStatus">
                      <el-tab-pane label="发送给客户" name="CUSTOM_NOTIFY">
                        <NotificationControlPanel :notification="customNotification"
                                                  :beforeSendCallback="beforeSendCustomCallback"
                                                  :successCallback="customNotificationFinish"/>
                      </el-tab-pane>

                      <el-tab-pane v-if="keeperBusiness.organization.creator" label="发送给机构创建者" name="CHARGE_NOTIFY">
                        <NotificationControlPanel :notification="chargeNotification"
                                                  :beforeSendCallback="beforeSendChargeCallback"
                                                  :successCallback="chargeNotificationFinish"/>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </NbSlidePanel>
              </NbExpanding>
            </div>
					</div>

					<!--归档面板-->
					<ArchivePanel  v-if="user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,keeperBusiness.spaceRegional.id) || user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MINE,keeperBusiness.spaceRegional.id)" :entity="keeperBusiness" :successCallback="archiveSuccessCallback"/>


				</LoadingFrame>
			</div>
		</div>

	</div>
</template>
<script>
	import KeeperBusiness from  "../../../../common/model/keeper/business/KeeperBusiness"
	import LoadingFrame from "../../widget/LoadingFrame";
	import KeeperBusinessView from "./widget/KeeperBusinessView";
	import MessageNotifyView from "../../message/notify/MessageNotifyView";
	import KeeperBusinessOperationPanel from "./widget/KeeperBusinessOperationPanel";
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
	import Notification from  "../../../../common/model/notification/Notification";
	import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
	import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue";
	import NotificationStatusReport from  "../../notification/widget/StatusReport.vue";
	import KeeperBusinessInfoPdfPreview from  "./widget/KeeperBusinessPdfPreview.vue";
	import $ from "jquery";
  import {Action} from  "../../../../common/model/core/action/Action"
	import {Notification as NotificationBox} from 'element-ui'
	import {smoothScroll} from "../../../../common/util/AnimationUtils";
	import ArchivePanel from "../../widget/ArchivePanel";

	export default{
		data () {
			return {
        tabStatus: null,
				keeperBusiness: new KeeperBusiness(),
				flipped: true,
				notification: new Notification(),
        customNotification: new Notification(),
        chargeNotification: new Notification(),
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		components: {
			NbSlidePanel,
			NbExpanding,
			NotificationControlPanel,
			KeeperBusinessView,
			MessageNotifyView,
			KeeperBusinessOperationPanel,
			ArchivePanel,
			NotificationStatusReport,
			KeeperBusinessInfoPdfPreview,
			LoadingFrame
		},
		computed: {},
		watch: {
      "tabStatus"(newVal, oldVal) {
        if (newVal === 'CHARGE_NOTIFY') {
          this.refreshChargeNotification();
        } else {
          this.refreshCustomNotification();
        }
      }
    },
		methods: {
      refreshCustomNotification() {
        let that = this;
        this.keeperBusiness.httpNotification(Action.KEEPER_BUSINESS_PASS, function (response) {
          that.customNotification.render(response.data.notification);
        })
      },
      refreshChargeNotification() {
        let that = this;
        this.keeperBusiness.httpNotification(Action.KEEPER_BUSINESS_CHARGE_PASS, function (response) {
          that.chargeNotification.render(response.data.notification);
        })
      },
			fetchDetail(){
				let that = this;
				this.keeperBusiness.id = this.$store.state.route.query.id;
        console.log(this.keeperBusiness.organization.name)

				if (this.keeperBusiness.id) {
					this.keeperBusiness.httpDetail(function () {
            if(that.keeperBusiness.leaderName){
              that.tabStatus = 'CUSTOM_NOTIFY'
            }else {
              that.tabStatus = 'CHARGE_NOTIFY'
            }
          });
				}
			},
			refreshEvent(){
				this.$refs.messageNotifyView.refresh();
			},
			operationSuccessCallback(response){
				let that = this;

				NotificationBox.success({
					message: '修改状态成功！'
				});

				that.flipped = false;
				that.notification.render(response.data.notification);
				that.notification.entityId = that.keeperBusiness.id;
				that.refreshEvent();

			},
      customNotificationFinish(){
				//通知成功发送的回掉函数。通知成功了之后，必须去更新该条事件。
        this.refreshEvent();
        smoothScroll(this.$refs.flowNode);
			},
      chargeNotificationFinish(){
        //通知成功发送的回掉函数。通知成功了之后，必须去更新该条事件。
        this.refreshEvent();
        smoothScroll(this.$refs.flowNode);
      },
      beforeSendChargeCallback(callback){
        let that = this;

        this.keeperBusiness.httpNotify(Action.KEEPER_BUSINESS_CHARGE_PASS, function (response) {

          that.chargeNotification.messageNotify.render(response.data.messageNotify);

          if (typeof callback === "function") {
            callback();
          }
        });
      },
      beforeSendCustomCallback(callback){
        let that = this;

        this.keeperBusiness.httpNotify(Action.KEEPER_BUSINESS_PASS, function (response) {

          that.customNotification.messageNotify.render(response.data.messageNotify);

          if (typeof callback === "function") {
            callback();
          }
        });
      },
			archiveSuccessCallback(){

				let that = this;
				NotificationBox.success({
					message: '修改成功！'
				});
				that.refreshEvent();
				smoothScroll(this.$refs.flowNode);
			}
		},
		mounted(){
      let that = this;
			this.fetchDetail(function () {
        that.refreshChargeNotification();
        that.refreshCustomNotification();
      });
			this.refreshEvent();
		}
	}


</script>
