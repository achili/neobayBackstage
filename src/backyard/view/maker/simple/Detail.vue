<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

        <div class="text-right mb10">
          <a title="编辑" class="btn btn-success"
             @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerPark.id }})">
            <i class="fa fa-pencil"></i>
            编辑
          </a>
        </div>

        <div class="row">
          <div class="col-md-12">
            <MakerParkCell :makerPark="makerPark"/>
          </div>

          <div v-if="user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE,makerPark.spaceRegional.id)" class="col-md-12 col-xs-12">
            <MakerParkOperationPanel :makerPark="makerPark"
                                          :successCallback="operationSuccessCallback"/>
          </div>

<!--          <div class="col-md-12 col-xs-12" v-show="!flipped">-->
<!--            <NbSlidePanel type="primary">-->
<!--                <span slot="heading" class="f16">-->
<!--                  <i class="fa fa-cogs"></i>-->
<!--                    评审通知-->
<!--                </span>-->
<!--              <span slot="actions">-->
<!--                   <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>-->
<!--                </span>-->
<!--              <div slot="body">-->
<!--                <NotificationControlPanel :notification="notification" :successCallback="notificationFinish"/>-->
<!--              </div>-->
<!--            </NbSlidePanel>-->
<!--          </div>-->

          <!--大事记录-->
          <div class="col-md-12">
            <div ref="flowNode">
              <MessageNotifyView ref="messageNotifyView" :entity="makerPark"/>
            </div>
          </div>

          <!-- 评审通知 -->
          <div class="col-md-12 col-xs-12">
            <NbExpanding>
              <NbSlidePanel type="primary" >
                <span slot="heading" class="f16">
                  <i class="fa fa-cogs"></i>
                  评审通知
                </span>
                <span slot="actions">
                    <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
                </span>
                <div slot="body" v-if="user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE,makerPark.spaceRegional.id)" >
                  <el-tabs v-model="tabStatus">
                    <el-tab-pane  label="发送给客户" name="CUSTOM_NOTIFY">
                      <NotificationControlPanel :notification="customNotification"
                                                :beforeSendCallback="beforeSendCustomCallback"
                                                :successCallback="customNotificationFinish"/>
                    </el-tab-pane>
                    <el-tab-pane v-if="makerPark.makerOrganization.creator.id"  label="发送给机构创建者" name="CHARGE_NOTIFY">
                      <NotificationControlPanel :notification="chargeNotification"
                                                :beforeSendCallback="beforeSendChargeCallback"
                                                :successCallback="chargeNotificationFinish"/>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </NbSlidePanel>
            </NbExpanding>
          </div>

          <div class="col-md-12 col-xs-12">
            <MakerParkComment :makerPark="makerPark"
                                     :commentSuccessCallback="commentCallback"/>
          </div>
        </div>
        <ArchivePanel  v-if="user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,makerPark.spaceRegional.id) || user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MINE,makerPark.spaceRegional.id)" :entity="makerPark" :successCallback="archiveSuccessCallback"/>
      </div>
    </div>

  </div>
</template>
<script>
  import MakerSimpleApply from "../../../../common/model/maker/MakerSimpleApply"
  import MakerParkCell from "./apply/widget/MakerParkCell";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import Notification from "../../../../common/model/notification/Notification";
  import NbExpanding from "../../../../common/widget/NbExpanding.vue";
  import MakerParkOperationPanel from "./apply/widget/MakerParkOperationPanel"
  import NotificationControlPanel from "../../notification/widget/ControlPanel.vue";
  import MakerParkComment from "./apply/widget/MakerParkComment"
  import MessageNotifyView from "../../message/notify/MessageNotifyView";

  import {Action} from  "../../../../common/model/core/action/Action";
  import {smoothScroll} from "../../../../common/util/AnimationUtils";
  import LoadingFrame from "../../widget/LoadingFrame";
  import NotificationStatusReport from  "../../notification/widget/StatusReport.vue";
  import ArchivePanel from "../../widget/ArchivePanel";
  export default{
    data () {
      return {
        tabStatus: null,
        customNotification: new Notification(),
        chargeNotification: new Notification(),
        FeatureType: this.$store.state.FeatureType,

        makerPark: new MakerSimpleApply(),
        user: this.$store.state.user,
        notification: new Notification(),
        flipped: true
      }
    },
    components: {
      NbSlidePanel,
      NbExpanding,
      MakerParkCell,
      MakerParkOperationPanel,
      NotificationControlPanel,
      MakerParkComment,
      MessageNotifyView,
      ArchivePanel,
      LoadingFrame,
      NotificationStatusReport
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
        this.makerPark.httpNotification(Action.MAKER_SIMPLE_APPLY_PASS, function (response) {
          that.customNotification.render(response.data.notification);
        })
      },
      refreshChargeNotification() {
        let that = this;
        this.makerPark.httpNotification(Action.MAKER_SIMPLE_APPLY_CHARGE_PASS, function (response) {
          that.chargeNotification.render(response.data.notification);
        })
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

        this.makerPark.httpNotify(Action.MAKER_SIMPLE_APPLY_CHARGE_PASS, function (response) {

          that.chargeNotification.messageNotify.render(response.data.messageNotify);

          if (typeof callback === "function") {
            callback();
          }
        });
      },
      beforeSendCustomCallback(callback){
        let that = this;

        this.makerPark.httpNotify(Action.MAKER_SIMPLE_APPLY_PASS, function (response) {

          that.customNotification.messageNotify.render(response.data.messageNotify);

          if (typeof callback === "function") {
            callback();
          }
        });
      },

      fetchDetail(){
        let that = this;
        this.makerPark.id = this.$store.state.route.query.id;
        if (this.makerPark.id) {
          this.makerPark.httpDetail(function () {
            if(that.makerPark.leaderName){
              that.tabStatus = 'CUSTOM_NOTIFY'
            }else {
              that.tabStatus = 'CHARGE_NOTIFY'
            }
          });
        }
      },
      commentCallback(){
        this.fetchDetail();
        this.refreshEvent();
      },
      operationSuccessCallback(response){
        let that = this;
        NotificationBox.success({
          message: '修改状态成功！'
        });
        that.flipped = false;
        that.notification.render(response.data.notification);
        that.notification.entityId = that.makerPark.id;
        that.refreshEvent();
      },
      notificationFinish(response){
        let that = this;
        that.flipped = !that.flipped;
        if (typeof that.notificationSuccessCallback === "function") {
          that.notificationSuccessCallback(response);
        }

      },
      refreshEvent(){
        this.$refs.messageNotifyView.refresh();
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
