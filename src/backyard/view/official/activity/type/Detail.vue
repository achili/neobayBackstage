<template>
	<div class="by-article-detail animated fadeIn">

		<div class="row">
			<div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
				<div class="mail-box-header">
					<div class="pull-right">
						<button title="编辑" class="btn btn-success"
						        @click.stop.prevent="$router.push('/by/official/activity/type/edit/'+officialActivityType.id)">
							<i class="fa fa-pencil"></i>
							编辑
						</button>
					</div>
					<div class="mail-tools m-t-md">

						<h3>
							{{officialActivityType.name}}
						</h3>

					</div>
				</div>

			</div>


		</div>


	</div>

</template>
<script>
  import {Notification} from 'element-ui';
  import Article from '../../../../../common/model/official/OfficialArticle'
  import OfficialActivityType from  "../../../../../common/model/official/OfficialActivityType"

  export default {

    data () {
      return {
        officialActivityType: new OfficialActivityType()
      }
    },
    components: {},
    methods: {},
    mounted(){
      let that = this;
      this.officialActivityType.id = this.$store.state.route.params.id;
      if (this.officialActivityType.id) {
        this.officialActivityType.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.by-article-detail {

		.mail-body {
			img {
				max-width: 100%;
			}
		}
	}
</style>