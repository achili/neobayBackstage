<template>
	<div class="animated fadeIn">
    <div class="row mv50">
      <div class="col-xs-12">

        <div class="row">
          <h5 class="col-xs-12 mt10 f16">
            <span>标签详情</span>
          </h5>
          <div class="col-xs-12 mt10">标签名称: {{articleTag.name}}</div>
          <div class="col-xs-12 mt10">标签描述: {{articleTag.description}}</div>
        </div>
      </div>
      <div class="col-xs-12 mv10 text-right">

        <button class="pull-right btn btn-primary"  @click.stop.prevent="$router.push('/developer/article/tag/edit/'+articleTag.id)">
          <i class="fa fa-pencil"></i>
          修改
        </button>

      </div>
    </div>

	</div>

</template>
<script>
	import {Notification} from 'element-ui';
	import ArticleTag from  "../../../../common/model/article/ArticleTag"
  import $ from "jquery"

	export default {

		data () {
			return {
        articleTag: new ArticleTag()
			}
		},
		components: {},
		methods: {
      fetchDetail(){
				let that = this;
				this.articleTag.id = this.$store.state.route.params.id;
				if (this.articleTag.id) {
					this.articleTag.httpDetail();
				}
			}
		},
		mounted(){
      this.fetchDetail();
		}
	}
</script>
