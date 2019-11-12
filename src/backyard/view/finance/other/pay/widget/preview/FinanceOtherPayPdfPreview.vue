<template>
	<div class="row finance-pay-preview">
		<div class="col-xs-12">
			<NbSlidePanel type="info">

					<span slot="heading" class="f16">
						<i class="fa fa-file-pdf-o"></i>
						付款通知书
					</span>
				<div slot="body">

          <Other :financeOtherPay="financeOtherPay"></Other>

				</div>
			</NbSlidePanel>

		</div>
	</div>
</template>

<script>
	import NbSlidePanel from "../../../../../../../common/widget/NbSlidePanel.vue"
  import Other from "./Other.vue"

	export default{
		data(){
			return {}
		},
		props: {
      financeOtherPay: {
				required: true
			}

		},

		components: {
			NbSlidePanel,
      Other
		}

	}


</script>
