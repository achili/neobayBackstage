<template>
	<div class="company-list-cell">

		<div class="bg-white p10 br4 mt10 cursor border"
		     @click.stop.prevent="$router.push({path: 'detail', query: { id: company.id }})">

			<div class="media">
				<div class="pull-right action-buttons">
					<a v-if="company.canEdit()" title="编辑" @click.stop.prevent="$router.push({path: 'detail', query: { id: company.id }})">
						<i class="fa fa-pencil text-info f20"></i>
					</a>
					<a v-if="company.canDel()" href="javascript:void(0)" title="删除"
					   @click.stop.prevent="company.confirmDel(refreshCallback)">
						<i class="fa fa-trash text-danger f20"></i>
					</a>
				</div>
				<div class="media-body">
					<div class="cell-title">
						<span>{{company.name}}</span>
					</div>
					<div class="cell-description list-text-restriction">
						<span class="mr10">主营产品: {{company.mainProducts}}</span>
					</div>
					<div class="cell-content">

						<span class="mr10">创建者:<UserProfileLink :user="company.creator"/></span>
						<span class="mr10">联系人: {{company.contacts}}</span>
						<span class="mr10">联系人电话: {{company.contactsPhone}}</span>
						<span class="mr10"><i class="fa fa-clock-o"></i> {{company.createTime | humanTime}}</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import Company from  "../../../../common/model/company/Company";
	import UserProfileLink from "../../widget/UserProfileLink";
	export default {
		data () {
			return {}
		},
		components: {
			UserProfileLink
		},
		props: {
			company: {
				type: Company,
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


