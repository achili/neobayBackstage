<template>
  <div class="message-contact-navigation">

    <h5>联系人分组</h5>

    <ul class="folder-list mt20" style="padding: 0">
      <li class="point mv15" @click="changeGrup('user')">
        <i class="fa fa-floppy-o"></i>
        站内联系人
      </li>
      <li class="point mv15" @click="changeGrup(null)">
        <i class="fa fa-floppy-o"></i>
        自定义联系人
      </li>
      <li class="point mv15" v-for="messageContactGroup in messageContactGroupPage.messageContactGroups"
          @click="changeGrup(messageContactGroup)">
        <div>
          <i class="fa fa-users"></i>
          {{messageContactGroup.name}}
          <i class="fa fa-trash-o btn-action pull-right " :class="isTouch? '':'del'" title="删除"
             @click.stop.prevent="delMessageContactGroup(messageContactGroup)">
          </i>
          <i class="fa fa-pencil btn-action pull-right" :class="isTouch? '':'del'" title="编辑"
             @click.stop.prevent="changeEditMode(messageContactGroup)">
          </i>
        </div>

        <NbExpanding>
          <div class="ml20" v-show="messageContactGroup.editMode==true">
            <div class="md10">
              <input class="form-control f13" v-model="messageContactGroup.currentName"
                     @keydown.enter="saveMessageContactGroup(messageContactGroup)"/>
            </div>

            <div class="mt5">
              <button class="btn btn-success pv3" @click.stop.prevent="saveMessageContactGroup(messageContactGroup)"><i
                class="fa fa-floppy-o"></i>保存
              </button>
              <button class="btn btn-danger pv3" @click.stop.prevent="cancelEdit(messageContactGroup)"><i
                class="fa fa-times"></i>取消
              </button>
            </div>
          </div>
        </NbExpanding>
      </li>
      <NbExpanding>
        <li class="mv10" v-show="isCreate">
          <div class="md10">
            <input class="form-control f13" v-model="newMessageContactGroup.currentName"
                   @keydown.enter="saveMessageContactGroup(newMessageContactGroup)"/>
          </div>

          <div class="mt5">
            <button class="btn btn-success pv3" @click.stop.prevent="saveMessageContactGroup(newMessageContactGroup)"><i
              class="fa fa-floppy-o"></i>创建
            </button>
            <button class="btn btn-danger pv3" @click.stop.prevent="isCreate=false;isEdit=false"><i
              class="fa fa-times"></i>取消
            </button>
          </div>

        </li>
      </NbExpanding>
    </ul>

    <button class="btn btn-block btn-default compose-mail pv3" @click="isCreate=true;isEdit=true">
      <i class="fa fa-send"></i>
      新建分组
    </button>


    <button class="btn btn-block btn-default compose-mail pv3"
            @click="$router.push('/by/message/contact/import/detail')">
      <i class="fa fa-download"></i>
      批量导入联系人
    </button>

  </div>
</template>


<script>
  import Pager from  "../../../../../common/model/base/Pager"
  import MessageContactGroup from  "../../../../../common/model/message/contact/group/MessageContactGroup"
  import MessageContact from  "../../../../../common/model/message/contact/MessageContact"
  import { Notification, MessageBox } from 'element-ui';
  import NbExpanding from  "../../../../../common/widget/NbExpanding.vue";
  import CreateSaveButton from  "../../../widget/CreateSaveButton.vue";

  export default {
    data () {
      return {
        newMessageContactGroup: new MessageContactGroup(),
        isCreate: false,
        isEdit: false,
        isTouch: false
      }
    },
    props: {
      changeGrup: {
        type: Function,
        required: true
      },
      messageContactGroupPage: {
        type: Pager,
        required: true
      }
    },
    components: {
      NbExpanding,
      CreateSaveButton
    },
    computed: {},
    watch: {},
    methods: {
      refresh(){
        this.messageContactGroupPage.httpFastPage();
      },
      changeEditMode(messageContactGroup) {
        if (this.isEdit) {
          return;
        }
        messageContactGroup.currentName = messageContactGroup.name;
        this.isEdit = true;
        messageContactGroup.editMode = !messageContactGroup.editMode;
      },
      cancelEdit(messageContactGroup) {
        this.isEdit = false;
        messageContactGroup.editMode = false;
      },
      saveMessageContactGroup(messageContactGroup) {
        let that = this;
        messageContactGroup.httpSave(function () {

          Notification.success({
            message: messageContactGroup.editMode ? "修改分组成功！" : "创建新分组成功"
          });
          that.refresh();
          that.isCreate = false;
          that.isEdit = false;
          that.newMessageContactGroup = new MessageContactGroup();
        });
      },
      delMessageContactGroup(messageContactGroup){
        let that = this;
        MessageBox.confirm('确认要删除该分组吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            messageContactGroup.httpDel(function () {
              Notification.success({
                message: '成功删除分组!'
              });
              that.refresh();
            }, that.refresh());
          }
        );
      }
    },
    mounted(){
      this.refresh();
      if ('ontouchstart' in window || navigator.maxTouchPoints) {
        this.isTouch = true;
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">

  .message-contact-navigation {
    .point {
      cursor: pointer;
      .del {
        display: none;
      }
      &:hover {
        .del {
          display: inline-block;
        }
      }
    }
    .folder-list {
      .btn {
        i {
          color: white;
        }
      }
    }
  }

</style>
