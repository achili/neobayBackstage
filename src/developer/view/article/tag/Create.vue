<template>
	<div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!articleTag.editMode">创建标签</span>
          <span v-show="articleTag.editMode">编辑标签</span>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label class="control-label"><span class="red">*</span>园区地点</label>
          <SpaceRegionalSelection :spaceRegional="articleTag.spaceRegional" :editMode="articleTag.editMode"></SpaceRegionalSelection>

        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label class="control-label"><span class="red">*</span>标签名称</label>
          <input v-model="articleTag.name" type="text" class="form-control">
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label class="control-label">标签描述</label>
          <input v-model="articleTag.description" type="text" class="form-control">
        </div>
      </div>
      <div class="col-md-12">

        <div class="mv10 text-right">
          <div class="alert alert-danger text-center" v-show="articleTag.errorMessage">
            {{articleTag.errorMessage}}
          </div>
          <CreateSaveButton :entity="articleTag" :callback="save" />
        </div>
      </div>


    </div>
  </div>

</template>
<script>

	import {simpleDateTime, str2Date} from '../../../../common/filter/time'
	import {Notification} from 'element-ui';
	import Article from '../../../../common/model/article/Article'
	import ArticleTag from '../../../../common/model/article/ArticleTag'
  import CreateSaveButton from "../../../../backyard/view/widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

	import $ from "jquery"

	export default {
		data () {
			return {
			articleTag: new ArticleTag()
			}
		},
		components: {
      CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
        let that = this;
				this.articleTag.httpSave(function (response) {

					Notification.success({
						message: that.articleTag.editMode ? '修改标签成功！' : '创建标签成功！'
					});
					that.$router.push("/developer/article/tag/detail/" + that.articleTag.id);

				});
			},
			fetchDetail(){
        this.articleTag.httpDetail();
			}
		},

		mounted(){
      let that = this;
			this.articleTag.id = this.$store.state.route.params.id;
			if (this.articleTag.id) {
				this.articleTag.editMode = true;
				this.fetchDetail();
			}

		}
	}
</script>
