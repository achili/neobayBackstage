<template>
	<div class="animated fadeIn">

		<LoadingFrame :loading="financeBillReceipt.detailLoading">
			<div class="row">

				<div class="col-xs-12">
					<h2 v-show="!financeBillReceipt.editMode"><i class="fa fa-fire text-success"></i>创建付款信息</h2>
					<h2 v-show="financeBillReceipt.editMode"><i class="fa fa-fire text-success"></i>修改付款信息</h2>
				</div>

				<div class="col-xs-12">

					<NbSlidePanel title="付款信息">
						<div>
              <CreateView :financeBillReceipt="financeBillReceipt" :successCallback="createSuccess"/>
						</div>


					</NbSlidePanel>

				</div>

			</div>
		</LoadingFrame>

	</div>
</template>
<script>
	import {MessageBox, Notification as NotificationBox} from 'element-ui'
	import {simpleDateTime, str2Date} from '../../../../../common/filter/time'
	import FinanceBillReceipt from  "../../../../../common/model/finance/FinanceBillReceipt"

	import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
	import CreateView from "./widget/CreateView.vue";
	import LoadingFrame from "../../../widget/LoadingFrame";

	export default{
		data(){
			return {
				financeBillReceipt: new FinanceBillReceipt()
			}
		},
		components: {
			NbSlidePanel,
			CreateView,
			LoadingFrame
		},
		computed: {},
		watch: {},
		methods: {
			fetchDetail(){
				let that = this;
				this.financeBillReceipt.httpDetail();
			},
			createSuccess(){
        this.$router.push('/by/finance/bill/receipt/detail/' + this.financeBillReceipt.id)
			},
			createError(){

			}
		},
		mounted(){
			let that = this;

			this.financeBillReceipt.id = this.$store.state.route.params.id;
			if (this.financeBillReceipt.id) {
				this.financeBillReceipt.editMode = true;
				this.fetchDetail();
			}
		}
	}
</script>

