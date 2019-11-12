<template>

	<div>
		<NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-dot-circle-o"></i>
                  基本信息
                </span>
			<div slot="body">


				<div class="row">
					<div class="col-md-2">服务类型：</div>
					<div class="col-md-10 f18 bold">{{keeperBusiness.businessType.name}}</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2">创建者：</div>
					<div class="col-md-10 bold">
						<UserProfileLink :user="keeperBusiness.creator"/>
					</div>
				</div>

        <div class="row mt10">
          <div class="col-md-2">园区地点：</div>
          <div class="col-md-10 bold">{{keeperBusiness.spaceRegional.name}}</div>
        </div>

				<div class="row mt10">
					<div class="col-md-2">创建时间：</div>
					<div class="col-md-10 bold">{{keeperBusiness.createTime | humanTime}}</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2">状态：</div>
					<div class="col-md-10">
						<span :class="'label label-'+keeperBusiness.getStatusStyle()">{{keeperBusiness.getStatusName()}}</span>
						<span v-if="keeperBusiness.archive" class="label label-danger">已归档</span>
					</div>
				</div>

				<div class="row mt10"
				     v-show="keeperBusiness.status === keeperBusiness.Status.REJECT">
					<div class="col-md-2">驳回原因：</div>
					<div class="col-md-10">
						<span class="text-danger">{{keeperBusiness.reason}}</span>
					</div>
				</div>

				<div class="row mt10" v-if="user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,keeperBusiness.spaceRegional.id) || keeperBusiness.status === keeperBusiness.Status.PASS">
					<div class="col-md-2">pdf下载：</div>
					<div class="col-md-10">
						<a class="btn btn-success" target="_blank" :href="keeperBusiness.downloadPdfUrl()">
							<i class="fa fa-file-pdf-o"></i>
							下载
						</a>
					</div>
				</div>

				<div class="row mt15">
					<div class="col-md-2">服务机构：</div>
					<div class="col-md-10 bold">{{keeperBusiness.organization.name}}</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2">项目名称：</div>
					<div class="col-md-10">
						{{keeperBusiness.projectName}}
					</div>
				</div>


				<div class="row mt10">
					<div class="col-md-2">公司名称：</div>
					<div class="col-md-10">
						{{keeperBusiness.companyName}}
					</div>
				</div>
			</div>


		</NbSlidePanel>

		<NbSlidePanel>
              <span slot="heading" class="text-success f16">
                <i class="fa fa-dot-circle-o"></i>
                联系人信息
              </span>
			<div slot="body">

				<div class="row">
					<div class="col-md-2 ">联系人姓名：</div>
					<div class="col-md-10 ">{{keeperBusiness.leaderName}}</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2 ">联系人电话：</div>
					<div class="col-md-10 ">{{keeperBusiness.leaderPhone}}</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2 ">联系人邮箱</div>
					<div class="col-md-10 ">{{keeperBusiness.leaderEmail}}</div>
				</div>

			</div>
		</NbSlidePanel>


	</div>

</template>


<script>
	import KeeperBusiness from  "../../../../../common/model/keeper/business/KeeperBusiness"
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
  import UserProfileLink from "../../../widget/UserProfileLink";
	export default{
		data(){
			return {
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		props: {
			keeperBusiness: {
				type: KeeperBusiness,
				required: true
			}

		},

		components: {
			NbSlidePanel,
      UserProfileLink
		}

	}


</script>
