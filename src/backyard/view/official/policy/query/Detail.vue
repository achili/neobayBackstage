<template>
	<div class="by-article-detail animated fadeIn">

		<div class="row">
			<div class="col-md-12">
		    <LoadingFrame :loading="officialPolicyQuery.detailLoading">
          <div class="row">

            <!--政策咨询详情-->
            <div class="col-md-12">
             <OfficialPolicyQueryCell :officialPolicyQuery="officialPolicyQuery" />
            </div>

            <!--操作面板-->
            <div class="col-md-12">
              <OfficialPolicyQueryOperationPanel :officialPolicyQuery="officialPolicyQuery" />
            </div>

          </div>

        </LoadingFrame>
			</div>

		</div>

	</div>
</template>
<script>
  import {Notification} from 'element-ui';
  import OfficialPolicyQuery from  "../../../../../common/model/official/OfficialPolicyQuery"
  import OfficialPolicyQueryOperationPanel from "./widget/OfficialPolicyQueryOperationPanel";
  import OfficialPolicyQueryCell from "./widget/OfficialPolicyQueryCell";
  import LoadingFrame from "../../../widget/LoadingFrame";


  export default {

    data () {
      return {
        officialPolicyQuery: new OfficialPolicyQuery()
      }
    },
    components: {
      OfficialPolicyQueryOperationPanel,
      OfficialPolicyQueryCell,
      LoadingFrame
    },
    methods: {
      refresh(){
        let that = this;
        this.officialPolicyQuery.id = this.$store.state.route.params.id;
        if (this.officialPolicyQuery.id) {
          this.officialPolicyQuery.httpDetail();
        }
      }
    },
    mounted(){
      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.by-article-detail {



	}
</style>
