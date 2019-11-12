<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-3">

        <NavigationMenus :changeGrup="changeGrup" :messageContactGroupPage="messageContactGroupPage"/>
      </div>

      <div class="col-md-9" v-if="!isUser">
        <ListCell :messageContactPager="pager" :title="title" :messageContactGroupPage="messageContactGroupPage"
                  :distributionGroup="distributionGroup"/>
      </div>
      <div class="col-md-9" v-if="isUser">
        <ListUserCell :distributionGroup="distributionGroup" :messageContactGroupPage="messageContactGroupPage"/>
      </div>
    </div>

  </div>
</template>
<script>
  import NavigationMenus from './widget/NavigationMenus.vue'
  import ListCell from './widget/ListCell.vue'
  import ListUserCell from './widget/ListUserCell.vue'
  import MessageContactGroup from  "../../../../common/model/message/contact/group/MessageContactGroup"
  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import Pager from  "../../../../common/model/base/Pager"
  import NbBtnDropdown from '../../../../common/widget/NbBtnDropdown'
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
  import MessageContact from  "../../../../common/model/message/contact/MessageContact"
  import UserProfileLink from "../../widget/UserProfileLink";
  import { Notification, MessageBox } from 'element-ui';

  export default{
    data () {
      return {
        pager: new Pager(MessageContact),
        messageContactGroupPage: new Pager(MessageContactGroup, 20),
        title: "联系人",
        isUser: true
      }
    },
    components: {
      NbFilter,
      NbPager,
      UserProfileLink,
      NbBtnDropdown,
      NbCheckbox,
      NavigationMenus,
      ListCell,
      ListUserCell
    },
    computed: {},
    watch: {},
    methods: {
      reset(){
        this.pager.page = 0;
        this.pager.resetFilter();
        this.pager.enableHistory();
      },
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      },
      changeGrup(messageContactGroup) {
        if (messageContactGroup === 'user') {
          this.isUser = true;
          return;
        }
        this.isUser = false;
        if (messageContactGroup === null) {
          this.pager.setFilter('MessageContactGroupId', null);
          this.title = "自定义联系人";
        } else {
          this.pager.setFilter('MessageContactGroupId', messageContactGroup.id);
          this.title = messageContactGroup.name;
        }
        this.search();
      },
      distributionGroup(messageContactGroup, userPager) {
        if (userPager === undefined) {
          messageContactGroup.httpAddContacts(this.pager, function () {
            Notification.success({
              message: '操作成功!'
            });
          });
        } else {
          messageContactGroup.httpAddUsers(userPager, function () {
            Notification.success({
              message: '操作成功!'
            });
          });
        }
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>




















