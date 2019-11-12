<template>
	<div class="user-profile">
		<div class="row">
			<div class="col-xs-12">
				<LoadingFrame :loading="user.detailLoading">
					<NbSlidePanel>
					<span slot="heading" class="text-success">
						<i class="fa fa-id-card-o"></i>
						基本信息
					</span>
						<div class="media">
							<div class="pull-left">
								<img class="img-rounded img-lg" :src="user.getAvatarUrl()">
							</div>
							<div class="pull-right"
							     v-if="currentUser.hasPermissionAllSpace(FeatureType.USER_MANAGE) || user.id === currentUser.id">
								<NbBtnDropdown name="操作" :alignRight="true" v-if="$route.path.indexOf('by/') === -1">
									<ul>
										<li>
											<a href="javascript:void(0)" @click="$router.push('/user/edit/'+ user.id)">
												<i class="fa fa-pencil"></i>
												编辑个人资料
											</a>
										</li>
										<li>
											<a href="javascript:void(0)" @click="$router.push('/user/change/password')">
												<i class="fa fa-lock"></i>
												修改密码
											</a>
										</li>
										<li>
											<a href="javascript:void(0)" @click="$router.push('/user/change/phone')">
												<i class="fa fa-phone-square"></i>
												修改手机
											</a>
										</li>
										<li>
											<a href="javascript:void(0)" @click="$router.push('/user/validate/email')">
												<i class="fa fa-check-square-o"></i>
												验证邮箱
											</a>
										</li>
									</ul>
								</NbBtnDropdown>
							</div>
							<div class="media-body">
								<div>
								<span class="black">
									{{user.nickname}}
									<span v-if="user.id===currentUser.id" class="text-danger">(It's you)</span>
								</span>
								</div>
								<div>
									<div class="mt5">
										{{user.role.name}}
									</div>
									<div class="mt5">
										<i class="fa fa-envelope text-success"></i>
										{{user.email}} <i class="fa fa-check-square-o text-primary ml5" v-if="user.emailValidate"></i>
									</div>
									<div class="mt5"
									     v-if="currentUser.hasPermissionAllSpace(FeatureType.USER_MANAGE) || user.id === currentUser.id">
										<i class="fa fa-phone text-info"></i>
										{{user.phone}} <i class="fa fa-check-square-o text-primary ml5"></i>
									</div>
								</div>
								<div class="mv5 text-muted">
									{{user.description}}
								</div>
								<div v-if="currentUser.hasPermissionAllSpace(FeatureType.USER_MANAGE) || user.id === currentUser.id">
									<span class="mr10">上次登录: {{user.lastTime | humanTime}}</span>
									<span class="mr10">上次IP: {{user.lastIp}}</span>
								</div>
							</div>
						</div>
					</NbSlidePanel>
          <NbSlidePanel>
            <span slot="heading" class="text-success">
                <i class="fa fa-home"></i>
                用户开门权限(房间)
            </span>
            <div>
              <div class="col-xs-4 md4 text-info cursor f12" v-for="item in user.spaceRoomList" :key="item.id"
                   @click="$router.push('/by/space/room/detail/' + item.id)">
                <i class="fa fa-address-card-o" aria-hidden="true"></i>  {{item.name}}
              </div>
            </div>
          </NbSlidePanel>
          <NbSlidePanel>
            <span slot="heading" class="text-success">
                <i class="fa fa-info-circle"></i>
                用户进出记录
            </span>
            <div>
              <div class="col-xs-12">
                <NbFilter :pager="userDoorLogPager" :callback="userDoorLogPagerSearch"></NbFilter>
              </div>
              <div class="p15">
                <div class="row mt101">
                  <div v-for="item in userDoorLogPager.userDoorLogs" class="col-md-6">
                    <div class="bg_self p10 mt10 cursor br4">
                      <div class="media-body">
                        <div class="cell-title f16">姓名：{{item.employeeName}}
                        </div>
                        <div class="cell-description f13">门名称：{{item.doorName}}
                        </div>
                        <div class="cell-description f13">进出时间：{{item.recordTime}}
                        </div>
                        <div class="cell-description f13">进出方式：{{item.recordType}}
                        </div>
                      </div>
                      <!--<div class="text-info f13" @click.stop.prevent="$router.push('/by/room/detail?doorId='+ item.doorId)">-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 mt20">
                <NbPager :pager="userDoorLogPager" :callback="userDoorLogPagerRefresh"></NbPager>
              </div>
            </div>
          </NbSlidePanel>
          <NbSlidePanel>
            <span slot="heading" class="text-success">
                <i class="fa fa-user"></i>
                人脸上传<span :class="'ml5 label label-'+user.getUploadFaceTypeStyle()">{{user.getUploadFaceTypeName()}}</span>
            </span>
            <div>
              <NbTank :tank="user.uploadFace" :preview="true"></NbTank>
            </div>
            <div>
              <div class="col-xs-12">
                <button class="pull-right btn btn-success" @click="save">
                  <i class="fa fa-upload mr5"></i><span>{{user.uploadFace&&user.uploadFace.url? "人脸上传":"删除人脸"}}</span>

                </button>
              </div>
            </div>
          </NbSlidePanel>

          <div v-if="currentUser.hasPermission($store.state.FeatureType.OTHER)">
            <NbSlidePanel>
            <span slot="heading" class="text-success">
              <i class="fa fa-credit-card-alt"></i>
              NFC/IC卡
            </span>
            <div slot="body">
              <div class="row mt10">
                <div>
                  <label class="col-md-3">员工NFC:</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="user.employeeNfc">
                  </div>
                </div>
                <div class="mt20 mr20">
                  <CreateSaveButton saveText="绑定NFC" :entity="user" :callback="send" saveIcon="fa fa-send"/>
                </div>
              </div>
              <div v-if="jsonObject.data" class="row mt10">
                <div>
                  <span class="col-md-3">员工姓名:</span>
                  <div class="col-md-9">
                    {{jsonObject.data.employeeName}}
                  </div>
                </div>
                <div>
                  <span class="col-md-3">员工NFC卡:</span>
                  <div class="col-md-9">
                    {{jsonObject.data.employeeNfc}}
                  </div>
                </div>
                <div class="mt20 mr20">
                  <CreateSaveButton saveText="解绑NFC" :entity="user" :callback="del" saveIcon="fa fa-trash-o"/>
                </div>
              </div>
            </div>
          </NbSlidePanel>
          </div>
				</LoadingFrame>
			</div>
		</div>
	</div>
</template>
<script>
  import User from '../../../common/model/user/User';
  import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue';
  import NbBtnDropdown from '../../../common/widget/NbBtnDropdown.vue';
  import NbTank from '../../../common/widget/NbTank.vue'
  import LoadingFrame from "../widget/LoadingFrame";
  import {Message, Notification} from 'element-ui'
  import CreateSaveButton from "../../../backyard/view/widget/CreateSaveButton.vue"
  import Pager from "../../../common/model/base/Pager";
  import UserDoorLog from "../../../common/model/user/UserDoorLog";
  import NbFilter from '../../../common/widget/filter/NbFilter.vue';
  import NbPager from '../../../common/widget/NbPager.vue';

  export default{
		data(){
			return {
				user: new User(),
				FeatureType: this.$store.state.FeatureType,
				currentUser: this.$store.state.user,
        jsonObject: {data:{}},
        userDoorLogPager: new Pager(UserDoorLog)
			}
		},
		watch: {},
		components: {
			NbSlidePanel,
			LoadingFrame,
			NbBtnDropdown,
      NbTank,
      CreateSaveButton,
      NbFilter,
      NbPager
		},
    methods:{
      save(){
        let that = this;
        if(this.user.uploadFace.code){
          this.user.httpUploadFace(this.user.uploadFace.code, function () {
            that.user.httpUpdateFace();
            Notification.success({
              message: "上传人脸成功！请等待人脸认证..."
            });
          });
        }else {
          this.user.httpUploadFace(null, function () {
            that.user.httpUpdateFace();
            Notification.success({
              message: "删除人脸成功！"
            });
          });
        }
      },
      send(){
        let that = this;
        this.user.httpBindingNFC(function () {
          that.refresh();
          Notification.success({
            message: '发送成功！'
          });
        });
      },
      del(){
        let that = this;
        this.user.httpUnbindNFC(function () {
          that.refresh();
          Notification.success({
            message: '发送成功！'
          });
        });
      },
      refresh(){
        let that = this;
        this.user.httpViewNFC(function (res) {
          that.jsonObject = res.data.jsonObject;
        });
      },
      userDoorLogPagerSearch() {
        this.userDoorLogPager.page = 0;
        this.userDoorLogPagerRefresh()
      },
      userDoorLogPagerRefresh(){
        this.userDoorLogPager.httpFastPage();
      }
    },
		mounted(){
			let id = this.$store.state.route.params.id;
			this.user.id = id;
			//没有传id默认显示自己
			if (id) {
				if (this.user.id === this.$store.state.user.id) {
					this.user = this.$store.state.user;
				}
				this.user.httpDetail();
			} else {
				this.user = this.$store.state.user;
			}
      this.user.httpUpdateFace();
      if(id){
        if (this.user.id === this.$store.state.user.id) {
          this.user = this.$store.state.user;
        }
        this.user.httpDetailDoor();
      }
      this.refresh();
      this.userDoorLogPager.setFilter("userId", this.user.id)
      this.userDoorLogPager.httpFastPage();

		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	@import "../../../common/assets/css/global/variables";
	.user-profile {
		.media-body {
			min-height: 110px;
		}
	}
  .bg_self {
    background-color: #f8f8f8;
  }
</style>
