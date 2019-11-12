<template>

	<div>

		<NbSlidePanel>

      <span slot="heading" class="text-success f16">
        <i class="fa fa-dot-circle-o"></i>
        基本信息
      </span>
			<div slot="body">

				<div class="row">
					<div class="col-md-2 mt10 bold">编号</div>
					<div class="col-md-10 mt10">
						{{protocolIncubator.no}}
						<span v-if="protocolIncubator.archive" class="label label-danger">已归档</span>
					</div>
				</div>

        <div class="row">
          <div class="col-md-2 mt10 bold">园区地点</div>
          <div class="col-md-10 mt10">
           {{protocolIncubator.spaceRegional.name}}
          </div>
        </div>

				<div class="row">
					<div class="col-md-2 mt10 bold">项目负责人</div>
					<div class="col-md-10 mt10">
						<UserProfileLink :user="protocolIncubator.user"/>
					</div>
				</div>

				<div class="row">
					<div class="col-md-2 mt10 bold">创建时间</div>
					<div class="col-md-10 mt10">{{protocolIncubator.createTime | humanTime}}</div>
				</div>


				<div class="row">
					<div class="col-md-2 mt10 bold">关联项目</div>
					<div class="col-md-10 mt10">
            <router-link
              :to="user.hasPermissionSpace($store.state.FeatureType.PROJECT_MANAGE,protocolIncubator.spaceRegional.id)? {path: '/by/project/detail', query: { id: protocolIncubator.project.id }}:{path: '/group/project/detail', query: { id: protocolIncubator.project.id }}">
              {{protocolIncubator.project.name}}
            </router-link>
					</div>
				</div>


				<div class="row">
					<div class="col-md-2 mt10 bold">孵化协议名称</div>
					<div class="col-md-10 mt10">{{protocolIncubator.name}}</div>
				</div>

				<div class="row">
					<div class="col-md-2 mt10 bold">状态</div>
					<div class="col-md-10 mt10">
                    <span :class="'label label-'+protocolIncubator.getStatusStyle()">
                      {{protocolIncubator.getStatusName()}}
                    </span>
					</div>
				</div>

				<div class="row">
					<div class="col-md-2 mt10 bold">甲方</div>
					<div class="col-md-10 mt10">{{protocolIncubator.partyA}}</div>
				</div>
				<div class="row">
					<div class="col-md-2 mt10 bold">乙方</div>
					<div class="col-md-10 mt10">{{protocolIncubator.partyB}}</div>
				</div>
				<div class="row">
					<div class="col-md-2 mt10 bold">合同年限</div>
					<div class="col-md-10 mt10">{{protocolIncubator.year}}</div>
				</div>
				<div class="row">
					<div class="col-md-2 mt10 bold">孵化协议日期范围</div>
					<div class="col-md-10 mt10">
						{{protocolIncubator.startTime | simpleDate}} 至 {{protocolIncubator.endTime | simpleDate}}
					</div>
				</div>

				<div class="row">
					<div class="col-md-2 mt10 bold">孵化协议描述</div>
					<div class="col-md-10 mt10">
						{{protocolIncubator.description}}
					</div>
				</div>

				<div class="row" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,protocolIncubator.spaceRegional.id)">
					<div class="col-md-2 mt10 bold">PDF下载</div>
					<div class="col-md-10 mt10">
						<a class="btn btn-success" :href="protocolIncubator.downloadPdfUrl()">
							<i class="fa fa-file-pdf-o"></i>
							下载
						</a>
					</div>
				</div>

        <div class="row mt10">
          <div class="col-md-2 ">其它附件：</div>
          <div class="col-md-10 ">
            <NbTanks :tanks="protocolIncubator.attachments" :edit="false"/>
          </div>
        </div>

      </div>
		</NbSlidePanel>

		<NbSlidePanel v-if="protocolIncubator.status !== protocolIncubator.Status.NEW && user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,protocolIncubator.spaceRegional.id)">

      <span slot="heading" class="text-success f16">
        <i class="fa fa-dot-circle-o"></i>
        签约信息
      </span>
			<div slot="body">

				<div class="row mt10">
					<div class="col-md-2 ">甲方代表人：</div>
					<div class="col-md-10 ">
						{{protocolIncubator.partyARepresentative}}
					</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2 ">甲方签署时间：</div>
					<div class="col-md-10 "><b>{{protocolIncubator.partyATime | humanTime}}</b></div>
				</div>

				<div class="row mt10">
					<div class="col-md-2 ">乙方代表人：</div>
					<div class="col-md-10 ">
						{{protocolIncubator.partyBRepresentative}}
					</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2 ">乙方签署时间：</div>
					<div class="col-md-10 "><b>{{protocolIncubator.partyBTime | humanTime}}</b></div>
				</div>

        <div class="row mt10">
          <div class="col-md-2 ">合同版本号：</div>
          <div class="col-md-10 "><b>{{protocolIncubator.contractNo}}</b></div>
        </div>

				<div class="row mt10">
					<div class="col-md-2 ">扫描件：</div>
					<div class="col-md-10 ">
						<NbTank :tank="protocolIncubator.scanning" :edit="false"/>
					</div>
				</div>

			</div>
		</NbSlidePanel>

	</div>

</template>


<script>
	import ProtocolIncubator from  "../../../../../common/model/protocol/incubator/ProtocolIncubator"
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
	import NbTank from  "../../../../../common/widget/NbTank.vue"
	import NbTanks from  "../../../../../common/widget/NbTanks.vue"
	import UserProfileLink from "../../../widget/UserProfileLink";
	export default{
		data(){
			return {
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		props: {
			protocolIncubator: {
				type: ProtocolIncubator,
				required: true
			}

		},

		components: {
			NbSlidePanel,
			UserProfileLink,
			NbTanks,
			NbTank
		}

	}


</script>
