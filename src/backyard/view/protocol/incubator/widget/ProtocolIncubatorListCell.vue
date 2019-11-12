<template>
	<div class="protocolIncubator-list-cell">

		<div class="bg-white p10 mt10 br4 cursor border"
		     @click.stop.prevent="$router.push('detail/'+protocolIncubator.id)">
			<div class="media">

				<div class="pull-right action-buttons" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,protocolIncubator.spaceRegional.id)">
					<a v-if="protocolIncubator.canEdit()" title="编辑"
					   @click.stop.prevent="$router.push('/by/protocol/incubator/edit/'+protocolIncubator.id)">
						<i class="fa fa-pencil text-info f20"></i>
					</a>
					<a v-if="protocolIncubator.canDel()" href="javascript:void(0)" title="删除"
					   @click.stop.prevent="protocolIncubator.confirmDel(refreshCallback)">
						<i class="fa fa-trash text-danger f20"></i>
					</a>
				</div>

				<div class="media-body">
					<div class="cell-title">
						<span>{{protocolIncubator.name}}</span>
						<span
							:class="'label label-'+protocolIncubator.getStatusStyle()">{{protocolIncubator.getStatusName()}}</span>
						<span v-if="protocolIncubator.archive" class="label label-danger">已归档</span>
					</div>
					<div class="cell-description">
            <div class="cell-content">
              {{protocolIncubator.description}}
            </div>
            <div class="cell-content">
              合同编号：{{protocolIncubator.no}}
              <span>园区地点：{{protocolIncubator.spaceRegional.name}}</span>
            </div>

					</div>
					<div class="cell-content">

						<span class="mr10">乙方用户: <UserProfileLink :user="protocolIncubator.user"/></span>

						<span
							class="mr10">起止时间:{{protocolIncubator.startTime | simpleDate}} 至 {{protocolIncubator.endTime | simpleDate}}</span>

						<span class="mr10">创建时间:{{protocolIncubator.createTime | humanTime}}</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import ProtocolIncubator from  "../../../../../common/model/protocol/incubator/ProtocolIncubator";
	import UserProfileLink from "../../../widget/UserProfileLink";
	export default {
		data () {
			return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType
      }
		},
		components: {
			UserProfileLink
		},
		props: {
			protocolIncubator: {
				type: ProtocolIncubator,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
			refreshCallback: {
				type: Function,
				required: true,
				validator: function (entity) {
					return true;
				}
			}
		},
		methods: {},
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">


</style>


