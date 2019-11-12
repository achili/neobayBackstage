<template>
  <div>
    <div class="mail-box-header">

      <div class="pull-right mail-search">
        <div class="input-group">
          <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                 v-model="messageContactPager.getFilter('keyword').value" @keyup.enter="search">
          <div class="input-group-btn">
            <button type="submit" class="btn btn-sm btn-primary" @click="search">
              搜索
            </button>
          </div>
        </div>
      </div>
      <h2>
        {{title}}
      </h2>


      <div class="mail-tools tooltip-demo m-t-md">

					<span class="mr10">
						<NbCheckbox v-model="allCheck"/>
						<span class="ml5">
							全选
						</span>
					</span>

        <button class="btn btn-white btn-sm" @click="search">
          <i class="fa fa-refresh fa-fw" :class="{'fa-spin':messageContactPager.loading}"></i> 刷新
        </button>

        <button class="btn btn-white btn-sm" @click="delMessageContact">
          <i class="fa fa-trash-o"></i> 删除
        </button>

        <NbBtnDropdown name="添加至" size="sm">
          <ul>
            <li v-for="messageContactGroup in messageContactGroupPage.messageContactGroups">
              <a @click.prevent="distributionGroup(messageContactGroup)">
                <i class="fa fa-eye"></i>
                <span class="ml5">{{messageContactGroup.name}}</span>
              </a>

            </li>
          </ul>
        </NbBtnDropdown>

        <CreateSaveButton
          createClass="btn btn-white btn-sm"
          createText="刷新项目联系人"
          createIcon="fa fa-refresh fa-fw"
          :entity="messageContactGroup"
          :callback="refreshProjectContacts">
        </CreateSaveButton>


        <button v-show="!this.messageContactPager.getFilter('MessageContactGroupId').value" class="btn btn-white btn-sm"
                @click.prevent="$router.push('/by/message/contact/create')">
          <i class="fa fa-wrench"></i> 添加新联系人
        </button>

      </div>
    </div>


    <div class="mail-box">
      <table class="table table-hover table-mail mb0">
        <tbody>

        <tr v-for="messageContact in messageContactPager.messageContacts">

          <td class="check-mail">
            <NbCheckbox v-model="messageContact.checked"/>
          </td>
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
          <td class="mail-subject">
            <span class="ml10 cell-description"><UserProfileLink :user="messageContact.user"/></span>
          </td>
        </tr>

        </tbody>
      </table>

      <div class="mv20">
        <NbPager :pager="messageContactPager" :callback="refresh"/>
      </div>

    </div>

  </div>
</template>


<script>
  import Pager from  "../../../../../common/model/base/Pager"
  import MessageContactGroup from  "../../../../../common/model/message/contact/group/MessageContactGroup"
  import NbCheckbox from '../../../../../common/widget/NbCheckbox.vue'
  import NbBtnDropdown from '../../../../../common/widget/NbBtnDropdown'
  import NbPager from '../../../../../common/widget/NbPager.vue'
  import UserProfileLink from "../../../widget/UserProfileLink";
  import { Notification, MessageBox } from 'element-ui';
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue"

  export default {
    data () {
      return {
        allCheck: false,
        messageContactGroup: new MessageContactGroup()
      }
    },
    props: {
      messageContactPager: {
        type: Pager,
        required: true
      },
      distributionGroup: {
        type: Function,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      messageContactGroupPage: {
        type: Pager,
        required: true
      }
    },
    components: {
      NbCheckbox,
      NbBtnDropdown,
      NbPager,
      UserProfileLink,
      CreateSaveButton
    },
    computed: {},
    watch: {
      "allCheck"(){
        for (let i = 0; i < this.messageContactPager.messageContacts.length; i++) {
          let messageContact = this.messageContactPager.messageContacts[i];
          messageContact.checked = this.allCheck;
        }
      },
      "messageContactPager.loading"() {
        this.allCheck = false
      }
    },
    methods: {
      refreshProjectContacts() {
        let that = this;
        this.messageContactGroup.refreshProjectContacts(function () {
          Notification.success({
            message: '刷新项目联系人成功!'
          });
          that.messageContactGroupPage.httpFastPage();
        });
      },
      delMessageContact() {
        let that = this;
        let groupId = this.messageContactPager.getFilter('MessageContactGroupId').value;
        if (groupId === null || groupId === '' || groupId === undefined) {
        } else {
          MessageBox.confirm('确定在本组中移除此联系人吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            let messageContactGroup = new MessageContactGroup();
            messageContactGroup.httpRemoveContacts(groupId, that.messageContactPager, function () {
              Notification.success({
                message: '移除联系人成功!'
              });
              that.search()
            });
          }, function () {
          });
        }

      },
      search() {
        this.messageContactPager.page = 0;
        this.refresh()
      },
      refresh() {
        this.allCheck = false;
        this.messageContactPager.httpFastPage();
      }
    },
    mounted(){

    }
  }

</script>
