<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="inviteVisitor.detailLoading">

          <div class="row">
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-default">
                  <i class="fa fa-home"></i>
                  邀请访客详情
                </span>
                <div slot="body">

                  <div class="row">
                    <div class="col-md-3">邀请人姓名：</div>
                    <div class="col-md-9 f18 bold">{{inviteVisitor.name}}</div>
                  </div>

                  <div class="row">
                    <div class="col-md-3">邀请人用户名：</div>
                    <div class="col-md-9">
                      {{inviteVisitor.inviteName}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">园区地点：</div>
                    <div class="col-md-9 bold">
                      {{inviteVisitor.spaceRegional.name }}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">来访时间：</div>
                    <div class="col-md-9 bold">
                      {{inviteVisitor.invitingTime | simpleDateMinute }}- {{inviteVisitor.accessTime | simpleDateMinute }}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">访问人数：</div>
                    <div class="col-md-9 bold">
                      {{inviteVisitor.visitorsNum}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">备注：</div>
                    <div class="col-md-9">
                      {{inviteVisitor.remark}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">创建时间：</div>
                    <div class="col-md-9 bold">{{inviteVisitor.createTime | humanTime }}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">创建人：</div>
                    <div class="col-md-9">
                      {{inviteVisitor.user.nickname}}
                    </div>
                  </div>

                </div>
              </NbSlidePanel>
            </div>

            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-default">
                  <i class="fa fa-diamond"></i>
                  邀请用户
                </span>
                <div slot="body">
                  <div v-for="inviteUser in inviteUserPager.inviteUsers" :key="inviteUser.id">
                    <div class="media-body">
                      <div class="cell-title">
                        被邀请用户名：{{inviteUser.name}}
                      </div>
                      <div class="cell-content">
                        被邀请电话：{{inviteUser.phone}}
                      </div>
                    </div>
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
  import {Notification} from 'element-ui'
  import SpaceRoom from  "../../../common/model/space/SpaceRoom"
  import Pager from '../../../common/model/base/Pager'
  import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
  import LoadingFrame from "../widget/LoadingFrame";
  import ProjectPagerSelection from "../project/Selection.vue";
  import CreateSaveButton from "../../../backyard/view/widget/CreateSaveButton.vue"
  import NbBtnDropdown from '../../../common/widget/NbBtnDropdown'
  import InviteVisitor from "../../../common/model/invite/InviteVisitor";
  import InviteUser from "../../../common/model/invite/InviteUser";

  export default{
    data(){
      return {
        inviteVisitor: new InviteVisitor(),
        inviteUserPager: new Pager(InviteUser),
        remark:SpaceRoom.prototype.remark
      }
    },
    components: {
      NbSlidePanel,
      LoadingFrame,
      ProjectPagerSelection,
      CreateSaveButton,
      NbBtnDropdown
    },
    methods: {
      fetchDetail(){
        let that = this;
        this.inviteVisitor.id = this.$store.state.route.query.id;
        if (this.inviteVisitor.id) {
          this.inviteVisitor.httpDetail(function (rep) {

          })
        }
      },
      refresh(){
        this.inviteUserPager.setFilter("inviteVisitorId", this.inviteVisitor.id);
        this.inviteUserPager.httpFastPage();
      }

    },
    computed: {},
    props:{},
    mounted(){
      this.fetchDetail();
      this.refresh();
    }
  }

</script>



