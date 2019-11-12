<template>
	<div class="by-article-detail animated fadeIn">

		<div class="row">
			<div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
				<div class="mail-box-header">
					<div class="pull-right">
						<button title="编辑" class="btn btn-success"
						        @click.stop.prevent="$router.push('/by/official/article/edit/'+article.id)">
							<i class="fa fa-pencil"></i>
							编辑
						</button>
					</div>
					<div class="mail-tools m-t-md">

						<h3>
							{{article.title}}
						</h3>
						<div>
							<span>作者：{{article.author}}</span>
							<span class="ml10">点击：{{article.hit}}</span>
							<span class="ml10">发布于：{{article.releaseTime | simpleDateTime}}</span>
              <span class="ml10">园区地点：{{article.spaceRegional.name}}</span>
						</div>

					</div>
				</div>
				<div class="mail-box">

					<div class="mail-body">
						<div class="text-center" v-show="article.loading">
							<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
						</div>
						<div v-html="article.content"></div>

						<div class="mt20">
							标签：<span v-for="tag in article.tags" class="mr5 label label-default">{{tag}}</span>
						</div>
					</div>

				</div>
			</div>


		</div>


	</div>

</template>
<script>
  import {Notification} from 'element-ui';
  import Article from '../../../../common/model/official/OfficialArticle'

  export default {
    data () {
      return {
        article: new Article()
      }
    },
    components: {},
    methods: {},
    mounted(){
      let that = this;
      this.article.id = this.$store.state.route.params.id;
      if (this.article.id) {
        this.article.httpDetail();
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
