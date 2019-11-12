<template>
	<div class="protocolSpace-list-cell">

		<div class="bg-white p10 mt10 br4 cursor border"
		     @click.stop.prevent="$router.push('detail/'+protocolSpace.id)">
			<div class="media">

				<div class="pull-right action-buttons" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,protocolSpace.spaceRegional.id)">
					<a v-if="protocolSpace.canEdit()" title="编辑" @click.stop.prevent="$router.push('/by/protocol/space/edit/'+protocolSpace.id)">
						<i class="fa fa-pencil text-info f20"></i>
					</a>
					<a v-if="protocolSpace.canDel()" href="javascript:void(0)" title="删除" @click.stop.prevent="protocolSpace.confirmDel(refreshCallback)">
						<i class="fa fa-trash text-danger f20"></i>
					</a>
				</div>

				<div class="media-body">
					<div class="cell-title">
						<span>{{protocolSpace.name}}</span>
						<span :class="'label label-'+protocolSpace.getStatusStyle()">{{protocolSpace.getStatusName()}}</span>
						<span v-if="protocolSpace.archive" class="label label-danger">已归档</span>
            <span :class="'label label-'+protocolSpace.getTypeStyle()">
              {{ protocolSpace.getTypeName() }}
            </span>
					</div>
					<div class="cell-content">
						房屋地址：{{protocolSpace.address}}
					</div>
					<div class="cell-content">
						合同编号：{{protocolSpace.no}}
            <span>园区地点：{{protocolSpace.spaceRegional.name}}</span>
					</div>

					<div class="cell-content">
						<span class="mr10">乙方用户:<UserProfileLink :user="protocolSpace.user"/></span>
						<span class="mr10">起止时间：</span><span>{{protocolSpace.startTime | simpleDate}} 至 {{protocolSpace.endTime | simpleDate}}</span>
						<span class="mr10">创建时间 {{protocolSpace.createTime | humanTime}}</span>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import ProtocolSpace from  "../../../../../common/model/protocol/space/ProtocolSpace";
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
			protocolSpace: {
				type: ProtocolSpace,
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


