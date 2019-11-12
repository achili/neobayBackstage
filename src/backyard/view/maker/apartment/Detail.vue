<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

        <div class="col-xs-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span>人才公寓申请详情</span>
          </h2>
        </div>
        <div class="text-right mb10">
          <a title="编辑" class="btn btn-success"
             @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerApartment.id }})">
            <i class="fa fa-pencil"></i>
            编辑
          </a>
        </div>

        <div class="row">

          <div class="col-md-12">
            <MakerApartmentCell :makerApartment="makerApartment"/>
          </div>

          <div class="col-md-12 col-xs-12">
            <MakerApartmentOperationPanel :makerApartment="makerApartment"
                                             :successCallback="operationSuccessCallback"/>
          </div>

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

          <!--大事记录-->
          <div class="col-md-12">
            <div ref="flowNode">
              <MessageNotifyView ref="messageNotifyView" :entity="makerApartment"/>
            </div>
          </div>

          <div class="col-md-12 col-xs-12">
            <MakerApartmentComment :makerApartment="makerApartment"
                              :commentSuccessCallback="commentCallback"/>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
<script>

  import {Notification as NotificationBox} from 'element-ui'
  import MakerApartmentCell from "./widget/MakerApartmentCell";
  import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
  import Notification from  "../../../../common/model/notification/Notification";
  import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue";
  import MakerApartment from "../../../../common/model/maker/MakerApartment";
  import MakerApartmentOperationPanel from  "./widget/MakerApartmentOperationPanel";
  import MessageNotifyView from "../../message/notify/MessageNotifyView";
  import MakerApartmentComment from "../apartment/widget/MakerApartmentComment"

  export default{
    data () {
      return {
        makerApartment: new MakerApartment(),
        user: this.$store.state.user,
        notification: new Notification(),
        flipped: true
      }
    },
    components: {
      MakerApartmentCell,
      MakerApartmentOperationPanel,
      NbSlidePanel,
      NotificationControlPanel,
      MessageNotifyView,
      MakerApartmentComment
    },
    computed: {},
    watch: {},
    methods: {
      fetchDetail(){
        let that = this;
        this.makerApartment.id = this.$store.state.route.query.id;
        if (this.makerApartment.id) {
          this.makerApartment.httpDetail();
        }
      },
      operationSuccessCallback(response){
        let that = this;
        NotificationBox.success({
          message: '修改状态成功！'
        });
        that.flipped = false;
        that.notification.render(response.data.notification);
        that.notification.entityId = that.makerApartment.id;
        that.refreshEvent();
      },
      notificationFinish(response){
        let that = this;
        that.flipped = !that.flipped;
        if (typeof that.notificationSuccessCallback === "function") {
          that.notificationSuccessCallback(response);
        }

      },
      commentCallback(){
        this.fetchDetail();
        this.refreshEvent();
      },
      refreshEvent(){
        this.$refs.messageNotifyView.refresh();
      }
    },
    mounted(){
      this.fetchDetail();
      this.refreshEvent();

    }
  }


</script>
