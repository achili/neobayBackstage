<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="keeperBusinessOrganization.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push('/by/keeper/business/organization/edit/' + keeperBusinessOrganization.id)">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">
              <h2>
                <i class="fa fa-fire text-success"></i>
                <span>企业管家-合作机构详情</span>
              </h2>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 mt10">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                  基本信息
                </span>
                <div slot="body">
                  <div class="row mt10">
                    <div class="col-md-2">服务机构名称：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.name}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">园区地点：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.spaceRegional.name}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">创建时间：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.createTime | humanTime}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">所属十大服务类型：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.getTypeName()}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">服务类型：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.businessType.name}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">营业执照</div>
                    <div class="col-md-10">
                      <NbTank :tank="keeperBusinessOrganization.scanning"/>
                    </div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">Logo：</div>
                    <div class="col-md-10">
                      <NbTank :tank="keeperBusinessOrganization.logo"/>
                    </div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">单位名称：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.detailName}}</div>
                  </div>
                  <div v-if="keeperBusinessOrganization.isPageUrl">
                    <div class="row mt10">
                      <div class="col-md-2">详情页链接：</div>
                      <div class="col-md-10">{{keeperBusinessOrganization.url}}</div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="row mt10">
                      <div class="col-md-2">描述信息：</div>
                      <div class="col-md-10">{{keeperBusinessOrganization.description}}</div>
                    </div>
                  </div>

                </div>
              </NbSlidePanel>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 mt10">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                  页面內容信息
                </span>
                <div slot="body">
                  <div class="row mt10">
                    <div class="col-md-2">主标题：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.mainTitle}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">副标题：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.subheading}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">内容：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.content}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">图片：</div>
                    <NbTanks :tanks="keeperBusinessOrganization.multiplePictures" class="col-md-10"/>
                  </div>
                </div>
              </NbSlidePanel>
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
                  <div class="row mt10">
                    <div class="col-md-2">联系人单位：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.contactsCompany}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">联系人名称：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.contactsName}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">联系人电话：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.contactsPhone}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">地址：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.contactsAddress}}</div>
                  </div>
                  <div class="row mt10">
                    <div class="col-md-2">备注：</div>
                    <div class="col-md-10">{{keeperBusinessOrganization.contactsNote}}</div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
          </div>

        </LoadingFrame>

        <div v-if="user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)">
          <KeeperOrganizationOperationPanel :keeperBusinessOrganization="keeperBusinessOrganization"
                                            :successCallback="operationSuccessCallback"/>
        </div>

        <div v-show="!flipped && user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)">
          <NbSlidePanel type="primary">
                <span slot="heading" class="f16">
                  <i class="fa fa-cogs"></i>
                    评审通知
                </span>
            <span slot="actions">
                   <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
                </span>
            <div slot="body">
              <NotificationControlPanel :notification="notification" :successCallback="notificationFinish"/>
            </div>
          </NbSlidePanel>
        </div>
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
	import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import NbEditor from "../../../../../common/widget/NbEditor.vue"
  import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
  import KeeperBusinessOrganization from  "../../../../../common/model/keeper/business/KeeperBusinessOrganization"
  import LoadingFrame from "../../../widget/LoadingFrame";
  import Notification from  "../../../../../common/model/notification/Notification";
  import KeeperOrganizationOperationPanel from  "./widget/KeeperOrganizationOperationPanel"
  import NotificationControlPanel from  "../../../notification/widget/ControlPanel.vue";
  import NbTank from '../../../../../common/widget/NbTank';
  import NbTanks from '../../../../../common/widget/NbTanks'

  export default{
    data () {
      return {
        user: this.$store.state.user,
				keeperBusinessOrganization: new KeeperBusinessOrganization(),
        notification: new Notification(),
        flipped: true,
        FeatureType: this.$store.state.FeatureType
      }
    },
    components: {
      NbEditor,
      NbSlidePanel,
      LoadingFrame,
      KeeperOrganizationOperationPanel,
      NotificationControlPanel,
      NbTank,
      NbTanks
    },
    computed: {},
    watch: {},
    methods: {
			fetchDetail(){
				let that = this;
				this.keeperBusinessOrganization.id = this.$store.state.route.params.id;
				if (this.keeperBusinessOrganization.id) {
					this.keeperBusinessOrganization.httpDetail();
				}
			},
      operationSuccessCallback(response){
        let that = this;
        NotificationBox.success({
          message: '修改状态成功！'
        });
        that.flipped = false;
        that.notification.render(response.data.notification);
        that.notification.entityId = that.keeperBusinessOrganization.id;
        that.refreshEvent();
      },
      notificationFinish(response){
        let that = this;
        that.flipped = !that.flipped;
        if (typeof that.notificationSuccessCallback === "function") {
          that.notificationSuccessCallback(response);
        }

      }
    },
    mounted(){
			let that = this;
			this.keeperBusinessOrganization.id = this.$store.state.route.params.id;
			if (this.keeperBusinessOrganization.id) {
				this.keeperBusinessOrganization.editMode = true;
				this.fetchDetail();
			}
    }
  }

</script>
