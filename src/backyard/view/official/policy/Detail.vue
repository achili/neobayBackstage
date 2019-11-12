<template>
	<div class="by-policy-detail animated fadeIn">

		<div class="row">
			<div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
				<div class="mail-box-header">
					<div class="pull-right">
						<button title="编辑" class="btn btn-success"
						        @click.stop.prevent="$router.push('/by/official/policy/edit/' + policy.id)">
							<i class="fa fa-pencil"></i>
							编辑
						</button>
					</div>
					<div class="mail-tools m-t-md">
						<h3>
							{{policy.title}}
						</h3>
						<div>
							<span>作者：{{policy.author}}</span>
							<span class="ml10">发布于：{{policy.releaseTime | simpleDateTime}}</span>
              <span>地区：{{policy.area.name}}</span>
						</div>
            <h5>摘要： {{policy.digest}}</h5>
            <div>
              <span>园区地点：{{policy.spaceRegional.name}}</span>
            </div>
					</div>
				</div>
				<div class="mail-box">

					<div class="mail-body">
						<div class="text-center" v-show="policy.loading">
							<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
						</div>
            政策内容
						<div v-html="policy.content"></div>

            <div class="mt20">
              标签： <span v-for="tag in policy.tags" class="mr5 label label-default">{{tag}}</span>
            </div>
					</div>

				</div>
			</div>


		</div>


	</div>

</template>
<script>
  import {Notification} from 'element-ui';
  import Policy from  "../../../../common/model/official/OfficialPolicy"

  export default {

    data () {
      return {
        policy: new Policy()
      }
    },
    components: {},
    methods: {},
    mounted(){
      let that = this;
      this.policy.id = this.$store.state.route.params.id;
      if(this.policy.id) {
        this.policy.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	.by-policy-detail {

		.mail-body {
			img {
				max-width: 100%;
			}
		}
	}
</style>
