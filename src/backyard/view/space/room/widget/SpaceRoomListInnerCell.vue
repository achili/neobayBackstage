<template>
	<div class="space-room-list-cell">

		<div class="cell-title">
			<span>{{spaceRoom.name}} </span>
			<span :class="'label label-'+spaceRoom.getTypeStyle()">{{spaceRoom.getTypeName()}}</span>
			<span :class="'label label-'+spaceRoom.getStatusStyle()">{{spaceRoom.getStatusName()}}</span>
		</div>
		<div class="cell-description">
			{{spaceRoom.description}}
		</div>
		<div class="cell-content one-line">
			<span class="mr10">面积:{{spaceRoom.area}}</span>
			<span class="mr10">
              所属大楼: {{spaceRoom.spaceBuilding.name}} </span>
		</div>
		<div class="mt10 one-line">
			地址：{{spaceRoom.address}}
		</div>

	</div>
</template>

<script>

	import SpaceRoom from  "../../../../../common/model/space/SpaceRoom";
	import UserProfileLink from "../../../widget/UserProfileLink";
	export default {
		data () {
			return {}
		},
		components: {
			UserProfileLink
		},
		props: {
			spaceRoom: {
				type: SpaceRoom,
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

	.space-room-list-cell {
		.one-line {
			text-overflow: ellipsis;
			text-wrap: none;
			word-break: keep-all;
			white-space: nowrap;
			overflow: hidden;
		}
	}


</style>


