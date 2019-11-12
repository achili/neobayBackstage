<template>
  <div class="invite-share-detail animated fadeIn">
    <div class="body">
      <div class="invite-share-header-title">
        邀请访问函
      </div>
      <div class="invite-share-header-picture"></div>
      <div class="invite-share-header-content">
        <div class="invite-share-header-content-first-cell">
          <span class="invite-share-header-content-first-cell-welcome">欢迎来到</span>
          <span class="invite-share-header-content-first-cell-name">零号湾</span>
        </div>
        <div class="invite-share-header-content-second-cell">
          {{inviteVisitor.spaceRegional.description}}
        </div>
      </div>

      <div style="padding-left: 20px;padding-right: 20px;">
        <div class="mt10">
          <div class="mb10">您的姓名</div>
          <div>
            <input type="text" class="form-control" v-model="inviteUser.name" style="-webkit-appearance: none;">
          </div>
        </div>
        <div class="mt10">
          <div class="mb10">您的手机号码</div>
          <div>
            <input type="text" class="form-control" v-model="inviteUser.phone" style="-webkit-appearance: none;">
          </div>
        </div>
        <div class="mt10" v-show="!isSuccess">
          <div class="mb10">您的验证码</div>
          <div style="position: relative;">
            <input type="text" class="form-control" placeholder="输入验证码" v-model="phoneValidation.value" style="-webkit-appearance: none;">

            <div @click.stop.prevent="fetchPhoneValidate" style="width: 90px;height: 34px;color: #52cae5;letter-spacing: 1px;
                  position: absolute;right: 0;top: 0;line-height: 34px;" v-if="phoneValidation.coldingDown===0">
              获取验证码
            </div>
            <div style="width: 90px;height: 34px;color: #52cae5;letter-spacing: 1px;
                  position: absolute;right: 0;top: 0;line-height: 34px;" v-if="phoneValidation.coldingDown>0">
              {{phoneValidation.coldingDown}}s后重试
            </div>
          </div>
        </div>
        <div class="mt20" v-show="!isSuccess">
          <button class="btn btn-info" style="padding: 5px 30px;font-size: 14px;background-color: #01B2E4;border-color: #01B2E4;color: #eeeeee;"
                  @click.stop.prevent="save">
            提交
          </button>
        </div>

        <div class="mt20" v-show="isSuccess">
          <button class="btn btn-info" style="padding: 5px 30px;font-size: 14px;background-color: #01B2E4;border-color: #01B2E4;color: #eeeeee;"
                  @click.stop.prevent="save">
            提交成功
          </button>
        </div>

        <div id="qrCode" class="w200 qr" v-show="qrCode" style="margin: 40px auto;text-align: center;color: red;" @click="refreshQrCode">

          <div v-show="lastTime.getTime() < inviteVisitor.invitingTime.getTime()">
            您预约的时间还未到，参观时间前15分钟即可获得通行证
            <div><i class="fa fa-refresh" :class="inviteUser.loading? 'fa-spin fa-fw':''"></i></div>
          </div>
          <div v-show="currentTime.getTime() > inviteVisitor.accessTime.getTime()">
            该预约参观已过期
          </div>
        </div>

        <div class="f16">
          地址
        </div>
        <div style="padding-top: 5px;font-size: 14px;color: #7b7b7b;padding-bottom: 10px;">
          {{inviteVisitor.spaceRegional.address}}
        </div>
        <div class="map-box">
          <div class="map" :style="'background: url(' + getStaticImage() + ') center'"></div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import { Message, Notification } from 'element-ui'
  import InviteVisitor from "../../common/model/invite/InviteVisitor"
  import QRCode from 'qrcodejs2'
  import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../common/util/Utils";
  import InviteUser from "../../common/model/invite/InviteUser";

  export default {
    data () {
      let startTime = new Date(new Date().getTime() - 15 * 60 * 1000);
      let endTime = new Date().getTime() + 15 * 60 * 1000;
      let a = new Date(endTime);
      return {
        inviteUser: new InviteUser(),//邀请访客用户
        inviteVisitor: new InviteVisitor(),//邀请访客
        phoneValidation: this.$store.state.user.phoneValidation,//短信验证码对象
        qrCode: false,//二维码生成器对象
        isSuccess: false,
        inviteUserIdKey: "neoBay_ivuser_",
        startTime: startTime,
        endTime: new Date(new Date().getTime() + 15 * 60 * 1000),
        currentTime: new Date(),
        lastTime:a,
        address: {
          lng: 121.422318,
          lat: 31.026331,
          text: "上海市闵行区剑川路951号零号湾1号楼"
        }
      }
    },
    methods: {
      getStaticImage(){  //&size=750*300 宽 * 高 this.inviteVisitor.spaceRegional.longitude / this.inviteVisitor.spaceRegional.latitude
        return 'http://restapi.amap.com/v3/staticmap?location=' + this.inviteVisitor.spaceRegional.longitude + ',' + this.inviteVisitor.spaceRegional.latitude + '&size=750*300&zoom=15&markers=mid,,A:' + this.inviteVisitor.spaceRegional.longitude + ',' + this.inviteVisitor.spaceRegional.latitude + '&key=0bc4ea1d32f89194bc7840b91afc7cc0';
      },
      fetchPhoneValidate() {
        this.phoneValidation.phone = this.inviteUser.phone;
        console.log(this.phoneValidation.phone + "this.phoneValidation.phone")
        if (this.phoneValidation.phone) {
          this.phoneValidation.httpShareFetch(this.phoneValidation.phone);
        } else {
          Message.error({
            message: '请填写手机号！'
          });
        }
      },
      createQrCode(){
        if(this.inviteUser.qrCode) {
          console.log(this.inviteUser.qrCode)
          if(!this.qrCoder) {
            this.qrCoder = new QRCode('qrCode', {
              width: 200,
              height: 200, // 高度
              text: this.inviteUser.qrCode// 二维码内容
            });
          } else {
            this.qrCoder.makeCode(this.inviteUser.qrCode);
          }

        }
      },
      save() {
        let that = this;
        if(that.qrCode) {
          return;
        }
        this.inviteVisitor.httpCreateUser(this.inviteVisitor.id,this.inviteUser.name,
          this.phoneValidation.phone,this.phoneValidation.value, function (response) {
            that.inviteUser.render(response.data.inviteUser);
            that.isSuccess = true;
            that.qrCode = true;
            that.createQrCode();
            saveToLocalStorage(that.inviteUserIdKey + that.inviteVisitor.id, that.inviteUser.id);
            Message.success({
              message: '认证成功~'
            });
          });
      },
      refreshQrCode() {
        let that = this;
        this.inviteUser.id = readLocalStorage(this.inviteUserIdKey + this.inviteVisitor.id);
        if(this.inviteUser.id && this.inviteUser.id !== 'undefined') {
          this.inviteUser.httpDetail(function () {
            that.isSuccess = true;
            that.createQrCode();
            that.qrCode = true;
            that.startTime = new Date(new Date().getTime() - 15 * 60 * 1000);
            that.endTime = new Date(new Date().getTime() + 105 * 60 * 1000);
          });
        }
      }
    },
    mounted(){
      //测试的时候用于清除本地存储
      // removeLocalStorage(this.inviteUserIdKey + this.inviteVisitor.uuid);

      this.inviteVisitor.id = this.$store.state.route.query.id;

      if(this.inviteVisitor.id){
        this.inviteVisitor.httpDetail();
      }
      this.refreshQrCode();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .invite-share-detail {
    .body{
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      .invite-share-header-title {
        padding: 10px 0;
        font-size: 20px;
        text-align: center;
      }
      .invite-share-header-picture {
        background: url("../../common/assets/img/invite.png") 100% 0;
        background-size: cover;
        height: 200px;
      }
      .invite-share-header-content {
        margin: -40px 20px 0 20px;
        padding: 15px;
        box-shadow: 1px 1px 1px 1px #ccc;
        background-color: #FFFFFF;
        border-radius: 8px;
        min-height: 150px;
        overflow: hidden;
        .invite-share-header-content-first-cell {
          padding-bottom: 10px;
          .invite-share-header-content-first-cell-welcome {
            font-size: 16px;
          }
          .invite-share-header-content-first-cell-name {
            font-size: 20px;
          }
        }
        .invite-share-header-content-second-cell {
          letter-spacing: 1px;
          line-height: 20px;
          color: #6f737b;
        }
      }
      .qr{
        max-height: 200px;
      }
      .map-box {
        padding-bottom: 30px;
        .map {
          height: 200px;
          width: 100%;
          background-size: cover!important;
        }
      }
    }
  }
</style>

