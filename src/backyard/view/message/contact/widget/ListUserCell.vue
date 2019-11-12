<template>
  <div>
    <div class="mail-box-header">

      <div class="pull-right mail-search">
        <div class="input-group">
          <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                 v-model="userPager.getFilter('keyword').value" @keyup.enter="search">
          <div class="input-group-btn">
            <button type="submit" class="btn btn-sm btn-primary" @click="search">
              搜索
            </button>
          </div>
        </div>
      </div>
      <h2>
        站内联系人
      </h2>


      <div class="mail-tools tooltip-demo m-t-md">

					<span class="mr10">
						<NbCheckbox v-model="allCheck"/>
						<span class="ml5">
							全选
						</span>
					</span>

        <button class="btn btn-white btn-sm" @click="search">
          <i class="fa fa-refresh fa-fw" :class="{'fa-spin':userPager.loading}"></i> 刷新
        </button>

        <NbBtnDropdown name="添加至" size="sm">
          <ul>
            <li v-for="messageContactGroup in messageContactGroupPage.messageContactGroups">
              <a @click.prevent="distributionUserGroup(messageContactGroup)">
                <i class="fa fa-eye"></i>
                <span class="ml5">{{messageContactGroup.name}}</span>
              </a>

            </li>
          </ul>
        </NbBtnDropdown>
      </div>
    </div>


    <div class="mail-box">
      <table class="table table-mail mb0">
        <tbody>

        <tr v-for="user in userPager.users">

          <td class="check-mail">
            <NbCheckbox v-model="user.checked"/>
          </td>
          <td class="mail-ontact">
            <img alt="image" class="img-circle w20 h20" :src="user.getAvatarUrl()"/>
            <span href="javascript:void(0)" class="ml5">
              {{user.nickname}}
            </span>
          </td>
          <td class="mail-subject">
            <span href="javascript:void(0)">{{user.phone}}</span>
          </td>
          <td class="mail-subject">
            <span href="javascript:void(0)">{{user.email}}</span>
          </td>
          <td class="mail-subject">
            <span class="ml10 cell-description"><UserProfileLink :user="user"/></span>
          </td>
        </tr>

        </tbody>
      </table>

      <div class="mv20">
        <NbPager :pager="userPager" :callback="refresh"/>
      </div>

    </div>

  </div>
</template>


<script>
  import Pager from  "../../../../../common/model/base/Pager"
  import User from  "../../../../../common/model/user/User"
  import NbCheckbox from '../../../../../common/widget/NbCheckbox.vue'
  import NbBtnDropdown from '../../../../../common/widget/NbBtnDropdown'
  import NbPager from '../../../../../common/widget/NbPager.vue'
  import UserProfileLink from "../../../widget/UserProfileLink";
  import { Notification, MessageBox } from 'element-ui';

  export default {
    data () {
      return {
        allCheck: false,
        userPager: new Pager(User)
      }
    },
    props: {
      distributionGroup: {
        type: Function,
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
      UserProfileLink
    },
    computed: {},
    watch: {
      "allCheck"(){
        for (let i = 0; i < this.userPager.users.length; i++) {
          let user = this.userPager.users[i];
          user.checked = this.allCheck;
        }
      }
    },
    methods: {
      distributionUserGroup(messageContactGroup) {
        this.distributionGroup(messageContactGroup, this.userPager)
      },
      delMessageContact() {
      },
      search() {
        this.userPager.page = 0;
        this.refresh()
      },
      refresh() {
        this.userPager.httpFastPage();
      }
    },
    mounted(){
      this.refresh();
    }
  }

</script>
