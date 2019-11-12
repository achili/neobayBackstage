<template>
  <div class="animated fadeIn">

    <LoadingFrame :loading="messageContact.detailLoading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!messageContact.editMode">新建联系人</span>
            <span v-show="messageContact.editMode">编辑联系人</span>
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 mt10">
          <NbSlidePanel>
            <span slot="heading" class="text-success f16">
              <i class="fa fa-leaf"></i>
              联系人信息

            </span>
            <div slot="body">

              <!--<div class="row">-->
              <!--<label class="col-md-2 control-label mt5 compulsory">关联用户</label>-->
              <!--<div class="col-md-10">-->
              <!--<UserPagerSelection :activeUser="messageContact.user"/>-->
              <!--</div>-->
              <!--</div>-->


              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">昵称</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="messageContact.nickname">
                </div>
              </div>


              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">电话</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="messageContact.phone">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">邮箱</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="messageContact.email">
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-12 m-t-md">
                  <CreateSaveButton :entity="messageContact" :callback="save"/>
                </div>
              </div>

            </div>
          </NbSlidePanel>
        </div>

      </div>
    </LoadingFrame>

  </div>
</template>
<script>
  import UserPagerSelection from "../../user/Selection.vue";
  import { simpleDateTime, str2Date } from '../../../../common/filter/time'
  import { Notification, MessageBox } from 'element-ui';
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import MessageContact from "../../../../common/model/message/contact/MessageContact"
  import $ from "jquery"

  export default {
    data () {
      return {
        messageContact: new MessageContact()
      }
    },
    components: {
      UserPagerSelection,
      NbSlidePanel,
      LoadingFrame,
      CreateSaveButton
    },
    computed: {},
    watch: {
      "messageContact.user.id"(){
        //选择了一位用户的时候，尝试去更新。
        if (!this.messageContact.editMode) {
          this.messageContact.nickname = this.messageContact.user.nickname;
          this.messageContact.email = this.messageContact.user.email;
          this.messageContact.phone = this.messageContact.user.phone;
        }
      }
    },
    methods: {
      save(){
        let that = this;
        this.messageContact.httpSave(function (response) {
          Notification.success({
            message: that.messageContact.editMode ? '修改联系人成功！' : '创建联系人成功！'
          });
          that.$router.push("/by/message/contact/list");
        });
      },
      fetchDetail(){
        let that = this;
        this.messageContact.httpDetail();
      }
    },
    mounted(){
      let that = this;
      this.messageContact.id = this.$store.state.route.params.id;
      if (this.messageContact.id) {
        this.messageContact.editMode = true;
        this.fetchDetail()
      }
    }
  }


</script>
