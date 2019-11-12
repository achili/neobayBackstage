<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="makerOrganization.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerOrganization.id }})">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12 col-xs-12">
              <NbSlidePanel>
              <span slot="heading" class="text-success f16">
                <i class="fa fa-dot-circle-o"></i>
                服务机构详情
              </span>
                <div slot="body">

                  <div class="row mt10">
                    <div class="col-md-2 ">园区地点：</div>
                    <div class="col-md-10 "><b>{{makerOrganization.spaceRegional.name}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2">营业执照</div>
                    <div class="col-md-10">
                      <NbTank :tank="makerOrganization.scanning"/>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2">Logo</div>
                    <div class="col-md-10">
                      <NbTank :tank="makerOrganization.logo"/>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">名称：</div>
                    <div class="col-md-10 "><b>{{makerOrganization.name}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">类型：</div>
                    <div class="col-md-10 "><b>{{makerOrganization.getTypeName()}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">描述：</div>
                    <div class="col-md-10 "><b>{{makerOrganization.description}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">联系人姓名：</div>
                    <div class="col-md-10 "><b>{{makerOrganization.leaderName}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">联系人电话：</div>
                    <div class="col-md-10 "><b>{{makerOrganization.leaderPhone}}</b></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-2 ">联系人邮箱：</div>
                    <div class="col-md-10 "><b>{{makerOrganization.leaderEmail}}</b></div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>

            <div class="col-md-12 col-xs-12" v-if="user.hasPermissionAllSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE)">
              <MakerOrganizationOperationPanel :makerOrganization="makerOrganization"
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

            <div class="col-md-12 col-xs-12">
              <NbSlidePanel>
              <span slot="heading" class="text-success f16">
                <i class="fa fa-dot-circle-o"></i>
                评价评分
              </span>
                <div slot="body">
                  <div  v-for="assess in pager.investmentAssesses">
                    <div class="alert alert-danger">
                      <h4>{{assess.creator.nickname}}</h4>
                      <div>
                        服务:<span v-for="t in assess.service"><i class="fa fa-star f20 text-warning"></i></span>
                      </div>
                      <div v-show="assess.comment">评价：{{assess.comment}}</div>
                    </div>
                  </div>
                  <div class="col-xs-12 mt20">
                    <NbPager :pager="pager" :callback="refreshPager"></NbPager>
                  </div>
                </div>
              </NbSlidePanel>
            </div>

          </div>
        </LoadingFrame>
      </div>
      <div class="col-md-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import {Notification as NotificationBox} from 'element-ui'
  import LoadingFrame from "../../widget/LoadingFrame";
  import MessageNotifyView from "../../message/notify/MessageNotifyView";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue";
  import MakerOrganization from "../../../../common/model/maker/MakerOrganization";
  import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
  import Notification from  "../../../../common/model/notification/Notification";
  import NotificationControlPanel from  "../../notification/widget/ControlPanel.vue";
  import MakerOrganizationOperationPanel from  "./widget/MakerOrganizationOperationPanel";
  import Pager from "../../../../common/model/base/Pager";
  import InvestmentAssess from "../../../../common/model/investment/InvestmentAssess";
  import NbPager from '../../../../common/widget/NbPager.vue'
  import NbTank from '../../../../common/widget/NbTank'

  export default {
    data(){
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        makerOrganization: new MakerOrganization(),
        notification: new Notification(),
        flipped: true,
        pager: new Pager(InvestmentAssess,10)
      }
    },
    components:{
      LoadingFrame,
      MessageNotifyView,
      CreateSaveButton,
      NbSlidePanel,
      NotificationControlPanel,
      MakerOrganizationOperationPanel,
      NbPager,
      NbTank
    },
    computed:{},
    methods:{
      refreshEvent(){
        // this.$refs.messageNotifyView.refresh();
      },
      sendNotifySuccessCallback(){
        this.refreshEvent();
        // smoothScroll(this.$refs.flexFlow);
      },
      sendReminderSuccessCallback(){
        this.refreshEvent();
        // smoothScroll(this.$refs.flowNode);
      },
      sendReceiptSuccessCallback(){
        this.refresh();
        this.refreshEvent();
        // smoothScroll(this.$refs.flowNode);
      },
      archiveFinishCallback() {
        this.refreshEvent();
        // smoothScroll(this.$refs.flowNode);
      },
      operationSuccessCallback(response){
        let that = this;
        NotificationBox.success({
          message: '修改状态成功！'
        });
        that.flipped = false;
        that.notification.render(response.data.notification);
        that.notification.entityId = that.makerOrganization.id;
        that.refreshEvent();
      },
      refresh(){
        this.fetchDetail();
      },
      fetchDetail(){
        let that = this;
        this.makerOrganization.id = this.$store.state.route.query.id;
        if (this.makerOrganization.id) {
          this.makerOrganization.httpDetail();
        }
      },
      notificationFinish(response){
        let that = this;
        that.flipped = !that.flipped;
        if (typeof that.notificationSuccessCallback === "function") {
          that.notificationSuccessCallback(response);
        }

      },
      refreshPager(){
        this.pager.setFilter("makerOrganizationId",this.makerOrganization.id);
        this.pager.httpFastPage()
      }

    },
    mounted(){
      this.refresh();
      this.refreshEvent();
      this.refreshPager()
    }
  }
</script>
