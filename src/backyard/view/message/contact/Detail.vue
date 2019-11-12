<template>
  <div class="animated fadeIn project-mentor-detail">


    <NbSlidePanel>

			<span slot="heading" class="text-success">
				<i class="fa fa-user"></i>
				基本信息
			</span>

      <div>
        <LoadingFrame :loading="messageContact.detailLoading">

          <div class="media">
            <div class="pull-left">
              <img class="img-rounded img-lg" src="../../../../common/assets/img/avatar.png">
            </div>

            <div class="pull-right">
              <button class="btn btn-sm btn-primary"
                      @click="$router.push('/by/message/contact/edit/'+ messageContact.id)">
                <i class="fa fa-pencil"></i>
                编辑
              </button>
            </div>
            <div class="media-body">
              <div class="f18 bold mt10">
                {{messageContact.nickname}}
              </div>

              <div class="mv10">
                关联用户：
                <UserProfileLink :user="messageContact.user"/>
              </div>
              <div class="mv10">
                电话：{{messageContact.phone}}
              </div>
              <div class="mv10">
                邮箱：{{messageContact.email}}
              </div>

            </div>
          </div>

        </LoadingFrame>
      </div>


    </NbSlidePanel>

  </div>
</template>

<script>
  import { Notification } from 'element-ui';
  import MessageContact from '../../../../common/model/message/contact/MessageContact'
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import LoadingFrame from "../../widget/LoadingFrame";
  import UserProfileLink from "../../widget/UserProfileLink.vue";

  export default {

    data () {
      return {
        user: this.$store.state.user,
        messageContact: new MessageContact()
      }
    },
    components: {
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink
    },
    methods: {},
    mounted(){
      let that = this;
      this.messageContact.id = this.$store.state.route.params.id;
      if (this.messageContact.id) {
        this.messageContact.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .project-mentor-detail {
    .section-title {
      font-size: 17px;
      color: #333;
      font-weight: bold;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .description {
      text-indent: 2em;
      line-height: 22px;
    }
  }
</style>
