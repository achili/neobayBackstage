<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>企业列表</span>
				</h2>
			</div>
			<div class="col-xs-12">
				<div class="pull-right mb10">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('create')">
						<i class="fa fa-plus"></i>
						<span>创建企业</span>
					</button>
				</div>
			</div>

		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<CompanyListCell v-for="company in pager.companies" :key="company.name" :company="company"
				:refreshCallback="refresh"/>
			</div>


			<div class="col-xs-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>

		</div>
	</div>

</template>
<script>
	import NbFilter from '../../../common/widget/filter/NbFilter.vue'
	import NbPager from '../../../common/widget/NbPager.vue'
	import {MessageBox, Notification} from 'element-ui'
	import UserProfileLink from "../widget/UserProfileLink";

	import Pager from  "../../../common/model/base/Pager"
	import Company from  "../../../common/model/company/Company"

	import CompanyListCell from "./widget/CompanyListCell";

	export default {

		data () {
			return {
				pager: new Pager(Company)
			}
		},
		components: {
			NbFilter,
			NbPager,
			UserProfileLink,
			CompanyListCell
		},
		computed: {},
		watch: {},
		methods: {

			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>
