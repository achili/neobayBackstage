<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="feedback.detailLoading">
					<!--<div class="text-right mb10">-->
						<!--<a class="btn btn-success" @click.stop.prevent="$router.push('/by/user/feedback/edit/' + feedback.id)">-->
							<!--<i class="fa fa-pencil"></i>-->
							<!--编辑-->
						<!--</a>-->
					<!--</div>-->

					<div class="row">
						<!--详情展示-->
						<div class="col-md-12">
							<FeedbackView :feedback="feedback"/>
						</div>
						<!--事件流程-->
						<div class="col-md-12">
							<MessageNotifyView ref="messageNotifyView" :entity="feedback"/>
						</div>
						<!--操作面板-->
						<div class="col-md-12">
							<FeedbackOperationPanel :feedback="feedback" :successCallback="feedbackSuccessCallback"/>
						</div>
					</div>
				</LoadingFrame>
			</div>
		</div>
	</div>
</template>
<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import Feedback from  "../../../../common/model/user/feedback/Feedback"
  import Pager from  "../../../../common/model/base/Pager";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue";
  import NbTanks from '../../../../common/widget/NbTanks';
  import Notification from  "../../../../common/model/notification/Notification";
  import FeedbackView from "./widget/FeedbackView"
  import FeedbackOperationPanel from "./widget/FeedbackOperationPanel"
  import LoadingFrame from "../../widget/LoadingFrame";
  import MessageNotifyView from "../../message/notify/MessageNotifyView";

  export default {

    data () {
      return {
        feedback: new Feedback(),
        notification: new Notification()
      }
    },
		components: {
			NbSlidePanel,
      NbTanks,
      NotificationControlPanel,
      FeedbackView,
      FeedbackOperationPanel,
      LoadingFrame,
      MessageNotifyView
    },
    methods: {
      fetchDetail(){
        let that = this;
        this.feedback.id = this.$store.state.route.params.id;
        if (this.feedback.id) {
          this.feedback.httpDetail();
        }
      },
      refreshEvent(){
        this.$refs.messageNotifyView.refresh();
      },
      feedbackSuccessCallback(response){
        let that = this;

        NotificationBox.success({
          message: '修改状态成功！'
        });

        that.flipped = false;
        that.notification.render(response.data.notification);
        that.notification.entityId = that.feedback.id;
        that.refreshEvent();
      }
    },
    mounted(){
      this.fetchDetail();
      this.refreshEvent();
    }
  }



</script>
