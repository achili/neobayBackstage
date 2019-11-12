<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

        <div class="col-xs-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span>一卡通申请详情</span>
          </h2>
        </div>
        <div class="text-right mb10">
          <a title="编辑" class="btn btn-success"
             @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerCard.id }})">
            <i class="fa fa-pencil"></i>
            编辑
          </a>
        </div>

        <div class="row">

          <div class="col-md-12">
            <MakerCardCell :makerCard="makerCard"/>
          </div>

          <div class="col-md-12 col-xs-12">
            <MakerCardOperationPanel :makerCard="makerCard"
                                          :successCallback="operationSuccessCallback"/>
          </div>

          <!--大事记录-->
          <!--<div class="col-md-12 col-xs-12" ref="flowNode">-->
            <!--<MessageNotifyView ref="messageNotifyView" :entity="makerCard"/>-->
          <!--</div>-->

          <div class="col-md-12 col-xs-12" v-show="!flipped">
            <NbSlidePanel type="primary">
                <span slot="heading" class="f16">
                  <i class="fa fa-cogs"></i>
                    评审通知
                </span>
              <span slot="actions">
                   <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
                </span>
              <div slot="body">
                <NotificationControlPanel :notification="notification" :successCallback="notificationFinish"/>
              </div>
            </NbSlidePanel>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

  import {Notification as NotificationBox} from 'element-ui'
  import MakerCardCell from "./widget/MakerCardCell";
  import MakerCard from "../../../../common/model/maker/card/MakerCard";
  import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
  import Notification from  "../../../../common/model/notification/Notification";
  import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue";
  import MakerCardOperationPanel from  "./widget/MakerCardOperationPanel";
  import MessageNotifyView from "../../message/notify/MessageNotifyView";
  import {smoothScroll} from "../../../../common/util/AnimationUtils";

  export default{
    data () {
      return {
        makerCard: new MakerCard(),
        user: this.$store.state.user,
        notification: new Notification(),
        flipped: true
      }
    },
    components: {
      MakerCardCell,
      MakerCardOperationPanel,
      NbSlidePanel,
      NotificationControlPanel,
      MessageNotifyView
    },
    computed: {},
    watch: {},
    methods: {
      fetchDetail(){
        let that = this;
        this.makerCard.id = this.$store.state.route.query.id;
        if (this.makerCard.id) {
          this.makerCard.httpDetail();
        }
      },
      operationSuccessCallback(response){
        let that = this;
        NotificationBox.success({
          message: '修改状态成功！'
        });
        that.flipped = false;
        that.notification.render(response.data.notification);
        that.notification.entityId = that.makerCard.id;
        that.refreshEvent();
      },
      refreshEvent(){
        this.$refs.messageNotifyView.refresh();
      },
      notificationFinish(response){
        let that = this;
        that.flipped = !that.flipped;
        //通知成功发送的回掉函数。通知成功了之后，必须去更新该条事件。
        smoothScroll(this.$refs.flowNode);
        that.refreshEvent();
        if (typeof that.notificationSuccessCallback === "function") {
          that.notificationSuccessCallback(response);
        }

      }
    },
    mounted(){
      this.fetchDetail();
    }
  }


</script>
