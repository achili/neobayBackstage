<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="conferenceRoomReservation.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push({ path: 'edit', query: { id: conferenceRoomReservation.id }})">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-dot-circle-o"></i>
                    基本信息
                </span>
                <div slot="body">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">名称</label>
                    <div class="col-md-9">
                      {{conferenceRoomReservation.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">园区地点</label>
                    <div class="col-md-9">
                      {{conferenceRoomReservation.spaceRegional.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">预定时间</label>
                    <div class="col-md-9">
                      {{conferenceRoomReservation.startTime | simpleDateMinute}} 至 {{conferenceRoomReservation.endTime | simpleDateMinute}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3 control-label mt5 ">会议室价格</label>
                    <div class="col-md-9">
                      {{conferenceRoomReservation.price}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">会议室地点</label>
                    <div class="col-md-9">
                      {{conferenceRoomReservation.location}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3 control-label mt5">要求备注</label>
                    <div class="col-md-9">
                      <span v-show="conferenceRoomReservation.remarks">{{conferenceRoomReservation.remarks}}</span>
                      <span v-show="!conferenceRoomReservation.remarks" style="color: red;">未填写！</span>
                    </div>
                  </div>

                </div>
              </NbSlidePanel>

            </div>
          </div>
        </LoadingFrame>
      </div>
    </div>
    <div v-if="payPageShow">
      <payPageShow :closeCall="closeAllPopup" :conferenceRoomReservation="conferenceRoomReservation" :successCallback="successCallback"></payPageShow>
    </div>
    <div class="col-md-12 text-right" v-show="mustPay">
      <button v-if="conferenceRoomReservation.status === 'WAIT'" title="立即支付" class="btn btn-success" @click="openPayPage(conferenceRoomReservation)">
        立即支付
      </button>
      <button v-if="conferenceRoomReservation.status === 'CONFIRMATION' && isEnd" title="取消" class="btn btn-success" @click="cancelPay(conferenceRoomReservation)">
        取消
      </button>
      <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
        <i class="fa fa-arrow-left"></i>
        返回
      </button>
    </div>
  </div>
</template>

<script>

  import NbSlidePanel from '../../../../common/widget/NbSlidePanel'
  import LoadingFrame from "../../widget/LoadingFrame";
  import UserProfileLink from "../../widget/UserProfileLink";
  import payPageShow from "../reservation/PayPageShow";
  import {Notification, MessageBox} from 'element-ui';
  import ConferenceRoomReservation from "../../../../common/model/conference/ConferenceRoomReservation";

  export default {
    data () {
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        conferenceRoomReservation: new ConferenceRoomReservation(),
        payPageShow:false,
        mustPay:true,
        isEnd: true
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink,
      payPageShow
    },
    methods: {
      closeAllPopup() {
        this.payPageShow = false;
      },
      refresh(){
        this.conferenceRoomReservation.httpDetail();
      },
      openPayPage(item){
        this.entity = item;
        this.payPageShow = true;
        this.mustPay = false;
      },
      fetchDetail(){
        let that = this;
        this.conferenceRoomReservation.id = this.$store.state.route.query.id;
        if (this.conferenceRoomReservation.id) {
          this.conferenceRoomReservation.httpDetail(function (res) {
            console.log(res.data.conferenceRoomReservation.startTime)
            let date = new Date(res.data.conferenceRoomReservation.startTime);

            if (date.getTime() - new Date().getTime() < 7200) {
              that.isEnd = false;
            }
          });
        }
      },
      successCallback() {
        this.payPageShow = false;
        this.mustPay = true;
      },
      cancelPay(conferenceRoomReservation){
        let that = this;
        MessageBox.confirm('两小时前取消可全额退款，两小时后只可取消不可退款！', '退款提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(function () {
          that.conferenceRoomReservation.httpCancelPay(conferenceRoomReservation, function (res) {
            console.log(res);
            if(res.data.status === "success"){
              MessageBox.confirm('您已退款成功！', '提示', {
                showCancelButton:false,
                confirmButtonText: '确定',
                type: 'success'
              }).then(function () {
                that.refresh();
              }, function () {
                that.refresh();
              });
            }else if(res.data.status === "false"){
              MessageBox.confirm('您已完成退款，不能再次退款！', '提示', {
                showCancelButton:false,
                confirmButtonText: '确定',
                type: 'error'
              }).then(function () {
                that.refresh();
              }, function () {
                that.refresh();
              });
            }else{
              MessageBox.confirm('距离会议室使用时间不足两小时，不可退款！', '提示', {
                showCancelButton:false,
                confirmButtonText: '确定',
                type: 'error'
              }).then(function () {
                that.$router.push("/by/conference/room/reservation/list");
              }, function () {
                that.$router.push("/by/conference/room/reservation/list");
              });
            }
          })
        }, function () {
          MessageBox.confirm('您已取消退款', '提示', {
            showCancelButton:false,
            confirmButtonText: '确定',
            type: 'warning'
          }).then(function () {
            that.refresh();
          }, function () {
            that.refresh();
          });
        });

      }
    },
    mounted(){
      this.fetchDetail();
    }
  }
</script>

