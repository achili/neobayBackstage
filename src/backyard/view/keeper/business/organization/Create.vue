<template>
	<div class="animated fadeIn">

		<LoadingFrame :loading="keeperBusinessOrganization.detailLoading">

			<div class="row">
				<div class="col-md-12">
					<h2>
						<i class="fa fa-fire text-success"></i>
						<span v-show="!keeperBusinessOrganization.editMode">创建合作机构</span>
						<span v-show="keeperBusinessOrganization.editMode">编辑合作机构</span>
					</h2>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<CreateSaveButton :entity="keeperBusinessOrganization" :callback="save"/>
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
								<label class="col-md-2 control-label mt5 compulsory">合作机构名称</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="keeperBusinessOrganization.name">
								</div>
							</div>
              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">单位名称</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="keeperBusinessOrganization.detailName">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">所属十大服务类型:</label>
                <div class="col-md-10">
                  <select class="form-control" v-model="keeperBusinessOrganization.type">
                    <option v-for="Type in keeperBusinessOrganization.getTypeList()" :value="Type.value">
                      {{Type.name}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mt10" v-show="isChoose">
                <label class="col-md-2 control-label mt5 compulsory">所属服务类型</label>
                <div class="col-md-10">
                  <keeperBusinessTypeSelection :activeKeeperBusinessType="keeperBusinessOrganization.businessType"
                                               :initFilter="filter" ref="refFilter"/>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">营业执照</label>
                <div class="col-md-10">
                  <NbTank :tank="keeperBusinessOrganization.scanning"/>
                </div>
              </div>

							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">Logo</label>
								<div class="col-md-10">
									<NbTank :tank="keeperBusinessOrganization.logo"/>
								</div>
							</div>
              <div class="form-group">
                <label class="control-label compulsory torch-select">是否有详情页</label>
                <div class="row">
                  <div class="col-md-3 col-xs-3">
                    <NbRadio v-model="keeperBusinessOrganization.isPageUrl" :val="true" :name="'isPageUrl'"></NbRadio>
                    <label>是</label>
                  </div>
                  <div class="col-md-3 col-xs-3">
                    <NbRadio v-model="keeperBusinessOrganization.isPageUrl" :val="false" :name="'isPageUrl'"></NbRadio>
                    <label>否</label>
                  </div>
                </div>
              </div>
							<div class="row mt10" v-if="!keeperBusinessOrganization.isPageUrl">
								<label class="col-md-2 control-label mt5 compulsory">描述信息</label>
								<div class="col-md-10">
                <textarea class="form-control" rows="4" v-model="keeperBusinessOrganization.description"
                          placeholder="此处填写描述信息……"></textarea>
								</div>
							</div>
              <div class="row mt10" v-if="keeperBusinessOrganization.isPageUrl">
                <label class="col-md-2 control-label mt5 compulsory">详情页链接</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="keeperBusinessOrganization.url">
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
						<i class="fa fa-vcard"></i>
						详情页内容
					  </span>
            <div slot="body">
              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">主标题</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="keeperBusinessOrganization.mainTitle">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-2 control-label mt5">副标题</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="keeperBusinessOrganization.subheading">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">内容</label>
                <div class="col-md-10">
                  <textarea class="form-control"  rows="3" v-model="keeperBusinessOrganization.content"></textarea>
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">图片</label>
                <div class="col-md-10">
                  <NbTanks :tanks="keeperBusinessOrganization.multiplePictures" :templateTank="templateTank"/>
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
						<i class="fa fa-vcard"></i>
						联系人信息
					</span>
						<div slot="body">
							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">联系人单位</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="keeperBusinessOrganization.contactsCompany">
								</div>
							</div>
							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">联系人姓名</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="keeperBusinessOrganization.contactsName">
								</div>
							</div>
							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">联系方式</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="keeperBusinessOrganization.contactsPhone">
								</div>
							</div>
							<div class="row mt10">
								<label class="col-md-2 control-label mt5">地址</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="keeperBusinessOrganization.contactsAddress">
                  <div class="limit-hints">43字以内</div>
								</div>
							</div>
							<div class="row mt10">
								<label class="col-md-2 control-label mt5">备注</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="keeperBusinessOrganization.contactsNote">
                  <div class="limit-hints">43字以内</div>
								</div>
							</div>
						</div>
					</NbSlidePanel>
				</div>
			</div>

      <div class="row" v-if="user.hasPermissionSpace(FeatureType.OTHER,keeperBusinessOrganization.spaceRegional.id)">
        <div class="col-md-12 mt10">
          <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                  展示页面浏览
                </span>
            <div class="m-b-md">
              <div>
                <NbEditor v-model="keeperBusinessOrganization.showDetail" height="400px;"/>
              </div>
            </div>
          </NbSlidePanel>
        </div>
      </div>

			<div class="row">
				<div class="col-md-12 m-t-md">
					<div class="alert alert-danger" v-show="keeperBusinessOrganization.errorMessage">
						{{keeperBusinessOrganization.errorMessage}}
					</div>
					<div>
						<CreateSaveButton :entity="keeperBusinessOrganization" :callback="save"/>
					</div>
				</div>
			</div>

		</LoadingFrame>

	</div>
</template>
<script>
	import NbTank from '../../../../../common/widget/NbTank';
  import NbTanks from '../../../../../common/widget/NbTanks'
  import NbEditor from "../../../../../common/widget/NbEditor"
	import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
	import {Notification} from 'element-ui';
	import KeeperBusinessOrganization from  "../../../../../common/model/keeper/business/KeeperBusinessOrganization";
	import KeeperBusinessTypeSelection from  "../type/Selection";
	import CreateSaveButton from "../../../widget/CreateSaveButton.vue"
	import LoadingFrame from "../../../widget/LoadingFrame";
  import NbRadio from "../../../../../common/widget/NbRadio";
  import Tank from '../../../../../common/model/tank/Tank'

	export default {
		data () {
			return {
				keeperBusinessOrganization: new KeeperBusinessOrganization(),
        templateTank: new Tank("image", false, 1024 * 1024, "请上传1MB以内的图片"),
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        isChoose: false,
        filter: {
          type: ''
        }
			}
		},
		components: {
			NbTank,
      NbEditor,
			KeeperBusinessTypeSelection,
			NbSlidePanel,
			LoadingFrame,
			CreateSaveButton,
      NbRadio,
      NbTanks
		},
		computed: {
      refFilter() {
        return this.$refs["refFilter"];
      }
    },
		watch: {
      "keeperBusinessOrganization.isPageUrl"(newVal, oldVal) {
        this.keeperBusinessOrganization.isPageUrl = newVal;
      },
      "keeperBusinessOrganization.type"(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.filter.type = newVal;
          this.isChoose = true;
          this.refFilter.refresh();
        } else {
          this.isChoose = false;
        }
      }
    },
		methods: {
			save(){
				let that = this;
				that.keeperBusinessOrganization.httpSave(function (response) {
					Notification.success({
						message: that.keeperBusinessOrganization.editMode ? '修改合作机构信息成功！' : '创建合作机构信息成功！'
					});
					that.$router.push("/by/keeper/business/organization/detail/" + that.keeperBusinessOrganization.id);
				});
			}
		},
		mounted(){
			let that = this;
			that.keeperBusinessOrganization.id = that.$store.state.route.params.id;
			if (that.keeperBusinessOrganization.id) {
				that.keeperBusinessOrganization.editMode = true;
				that.keeperBusinessOrganization.httpDetail();
			}
		}
	}
</script>
