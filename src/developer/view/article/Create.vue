<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!article.editMode">发布文章</span>
					<span v-show="article.editMode">编辑文章</span>
				</h2>
			</div>
		</div>


		<div class="row">
			<div class="col-xs-12">
        <CreateSaveButton createText="发布" :entity="article" :callback="save"/>
			</div>
			<div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label">园区地点</label>
          <SpaceRegionalSelection :spaceRegional="article.spaceRegional" :editMode="article.editMode"></SpaceRegionalSelection>
        </div>

				<div class="form-group">
					<label class="control-label">标题</label>
					<input type="text" class="form-control" v-model="article.title">
				</div>

				<div class="form-group">
					<label class="control-label">标签名称</label>
					<NbTags :tags="article.tags" ></NbTags>
				</div>

				<div class="form-group clear">
					<img class="thumb-lg pull-left m-r-md">
					<label class="control-label">图片</label>

					<div>
						<NbTank :tank="article.poster"/>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label">作者</label>
					<input type="text" class="form-control" v-model="article.author">
				</div>
				<div class="form-group">
					<label class="control-label">发布时间</label>
					<div>
						<el-date-picker
							v-model="article.releaseTime"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label">摘要</label>
					<textarea class="form-control" rows="6" v-model="article.digest"
					          placeholder="此处填写文章摘要……"></textarea>
				</div>
				<div class="m-b-md">
					<label class="control-label">正文</label>
					<div>
						<NbEditor v-model="article.content" height="400px;"/>
					</div>
				</div>
			</div>
			<div class="col-xs-12 m-t-md">
				<div class="alert alert-danger" v-show="article.errorMessage">
					{{article.errorMessage}}

				</div>
				<div>
          <CreateSaveButton createText="发布" :entity="article" :callback="save"/>

				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import NbTags from '../../../common/widget/NbTags'
	import NbTank from '../../../common/widget/NbTank'
	import NbEditor from "../../../common/widget/NbEditor"
	import {simpleDateTime, str2Date} from '../../../common/filter/time'
	import {Notification} from 'element-ui';
	import Article from '../../../common/model/article/Article'
  import CreateSaveButton from "../../../backyard/view/widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'

	import $ from "jquery"

	export default {

		data () {
			return {
				article: new Article()
			}
		},
		components: {
			NbTags,
			NbTank,
			NbEditor,
      CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;

				this.article.httpSave(function (response) {

					Notification.success({
						message: that.article.editMode ? '修改文章成功！' : '创建文章成功！'
					});
					that.$router.push("/developer/article/detail/" + that.article.id);

				});
			}
		},


		mounted(){

			let that = this;

			this.article.id = this.$store.state.route.params.id;

			if (this.article.id) {

				this.article.editMode = true;
				this.article.httpDetail();
			}
		}
	}
</script>
