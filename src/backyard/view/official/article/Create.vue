<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!article.editMode">发布资讯</span>
					<span v-show="article.editMode">编辑资讯</span>
				</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-12">
				<CreateSaveButton :entity="article" :callback="save"/>
			</div>
			<div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label compulsory">园区地点</label>
          <SpaceRegionalSelection :spaceRegional="article.spaceRegional" :editMode="article.editMode"></SpaceRegionalSelection>
        </div>

				<div class="form-group">
					<label class="control-label compulsory">标题</label>
					<input type="text" class="form-control" v-model="article.title">
				</div>
				<div class="form-group">
					<label class="control-label compulsory">标签</label>
					<NbTags :Clazz="OfficialArticleTag" :tags="article.tags" :spaceRegional="article.spaceRegional" />
				</div>

				<!--<div class="form-group">-->
					<!--<label class="control-label">资讯类型</label>-->
					<!--<div>-->
						<!--<select v-model="article.type" class="form-control">-->
							<!--<option :value="type.value" v-for="type in article.TypeList" v-if="type.value">{{type.name}}</option>-->
						<!--</select>-->
					<!--</div>-->
				<!--</div>-->

				<div class="form-group clear">
					<img class="thumb-lg pull-left m-r-md">
					<label class="control-label compulsory">图片</label>

					<div>
						<NbTank :tank="article.poster"/>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label compulsory">作者</label>
					<input type="text" class="form-control" v-model="article.author">
				</div>
				<div class="form-group">
					<label class="control-label compulsory">发布时间</label>
					<div>
						<el-date-picker
							v-model="article.releaseTime"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label compulsory">摘要</label>
					<textarea class="form-control" rows="6" v-model="article.digest"
					          placeholder="此处填写文章摘要……"></textarea>
				</div>
				<div class="m-b-md">
					<label class="control-label compulsory">正文</label>
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
					<CreateSaveButton :entity="article" :callback="save"/>

				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import NbTags from '../../../../common/widget/NbTags'
	import NbTank from '../../../../common/widget/NbTank'
	import NbEditor from "../../../../common/widget/NbEditor"
	import {simpleDateTime, str2Date} from '../../../../common/filter/time'
	import {Notification} from 'element-ui';
	import OfficialArticle from '../../../../common/model/official/OfficialArticle'
	import OfficialArticleTag from '../../../../common/model/official/OfficialArticleTag'
	import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'
	import Pager from  "../../../../common/model/base/Pager"

	import $ from "jquery"

	export default {

		data () {
			return {
				OfficialArticleTag,
				article: new OfficialArticle(),
				officialArticleTagPager: new Pager(OfficialArticleTag)
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
		watch: {
			"article.tags"(){
				this.changeTagsArray();
			},
			"article.editMode"(){
				this.changeTagsArray();
			}
		},
		methods: {

			save(){
				let that = this;

				this.article.httpSave(function (response) {

					Notification.success({
						message: that.article.editMode ? '修改文章成功！' : '创建文章成功！'
					});
					that.$router.push("/by/official/article/detail/" + that.article.id);

				});
			},
			refresh(){
        // let space = [];
        // space.push(this.article.spaceRegional.id)
        // this.officialArticleTagPager.setFilter("spaceRegionalIds",space)
			// 	this.officialArticleTagPager.pageSize = 50;
			// 	this.officialArticleTagPager.httpFastPage();

			},
			chooseTag(tagObj){
				if (tagObj.editMode) {
					//不选择
					tagObj.editMode = false;
					this.article.tags.splice(this.article.tags.indexOf(tagObj.name), 1);
				} else {
					//选择
					tagObj.editMode = true;
					this.article.tags.push(tagObj.name);
				}
			},
			changeTagsArray(){
				let that = this;
				if (this.officialArticleTagPager.officialArticleTags) {
					this.officialArticleTagPager.officialArticleTags.forEach(function (obj) {
						if (that.article.tags.indexOf(obj.name) >= 0) {
							obj.editMode = true;
						} else {
							obj.editMode = false;
						}
					})
				}
			},
      refreshArticle(){
        let that = this;

        this.article.id = this.$store.state.route.params.id;

        if (this.article.id) {

          this.article.editMode = true;
          this.article.httpDetail();
        } else {
          this.article.author = this.$store.state.user.nickname;
        }
      }
		},
		mounted(){

			this.refreshArticle();

			// this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.multi-tags-selection {
		margin: 0 5px;
		padding: 2px 5px;
		cursor: pointer;
		border: 1px solid #eaeaea;
		&:hover {
			border-color: #afcb9f;
		}
		&.choosed {
			background-color: #d6e9c4;
		}
	}
</style>
