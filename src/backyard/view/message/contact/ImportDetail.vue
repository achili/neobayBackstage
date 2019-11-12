<template>
  <div>
    <h2>
      <i class="fa fa-fire text-success"></i>
      <span>导入联系人</span>
    </h2>


    <div class="btn btn-default btn-file compose-mail mt10">
      <i class="fa fa-download"></i>
      <span>导入联系人</span>
      <input ref="refFile" type="file" name="avatar" @change.prevent.stop="fileChanged"/>
    </div>

    <div v-if="messageContactPager.messageContacts !== null">
      <div v-if="messageContactPager.messageContacts.length !== 0">

        <div class="mt20 text-danger">以下联系人因格式不正确，乱码，已存在联系方式或名字被退回，请检查后再重新提交！</div>

        <div class="mail-box">
          <table class="table table-hover table-mail mb0">
            <tbody>

            <tr v-for="messageContact in messageContactPager.messageContacts">

              <td class="mail-ontact">
              <span class="ml5">
                <img alt="image" class="img-circle w20 h20" :src="messageContact.user.getAvatarUrl()"/>
                <span v-if="messageContact.user.id===0">{{messageContact.nickname}}</span>
                <span v-else>{{messageContact.user.nickname}}</span>
              </span>
              </td>
              <td class="mail-subject">
                <span v-if="messageContact.user.id===0">{{messageContact.phone}}</span>
                <span v-else>{{messageContact.user.phone}}</span>
              </td>
              <td class="mail-subject">
                <span v-if="messageContact.user.id===0">{{messageContact.email}}</span>
                <span v-else>{{messageContact.user.email}}</span>
              </td>
            </tr>

            </tbody>
          </table>

        </div>

      </div>

      <div class="mt20 text-success" v-else>以全部导入成功！</div>
    </div>

  </div>
</template>


<script>
  import Pager from  "../../../../common/model/base/Pager"
  import MessageContact from  "../../../../common/model/message/contact/MessageContact"
  import { Notification, MessageBox } from 'element-ui';

  export default {
    data () {
      return {
        messageContactPager: new Pager(MessageContact),
        importCount: 0
      }
    },
    props: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
      fileChanged(){
        let that = this;
        let value = that.$refs["refFile"].value;
        if (!value) {
          return;
        }
        let messageContact = new MessageContact();
        messageContact.httpImportContacts(this.$refs["refFile"].files[0], function (response) {
          that.$refs["refFile"].files[0] = null;
          that.messageContactPager.render(response.data.pager);
          that.importCount = response.data.importCount;
          Notification.success({
            message: '成功添加 ' + that.importCount + ' 个联系人!'
          });
        });
      }
    },
    mounted(){

    }
  }

</script>
