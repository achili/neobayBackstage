<template>
	<div class="template-detail animated fadeIn">

		<div class="row">
			<div class="col-xs-12 text-right">
				<a title="编辑" class="btn btn-success"
				   @click.stop.prevent="$router.push('/developer/template/edit/'+template.id)">
					<i class="fa fa-pencil"></i>
					编辑
				</a>
			</div>
		</div>
		<div>
			<span class="f20 ml5">{{template.name}}</span>
		</div>
		<div class="mt20">
			<p>
				<strong>创建于：</strong>
			</p>
			<p>
				<span>{{template.createTime | simpleDateTime}}</span>
			</p>
		</div>
		<div class="mt20">
			<div>

				<p>
					<strong>模板类型：</strong>
				</p>
				<p>
					<span>{{template.name}}</span>
				</p>
				<a href="javascript:void(0)" v-show="!typeShow" @click.stop.prevent="typeShow=true">显示属性</a>
				<a href="javascript:void(0)" v-show="typeShow" @click.stop.prevent="typeShow=false">隐藏属性</a>
			</div>
			<NbExpanding>
				<div v-show="typeShow">
					<NbAttribute :attributes="template.attributes" :editMode="false"/>
				</div>
			</NbExpanding>
		</div>
		<div class="mt20">
			<p>
				<strong>描述：</strong>
			</p>
			<p>
				<span>{{template.description}}</span>
			</p>
		</div>
		<div class="mt20">
			<p>
				<strong>正文：</strong>
			</p>
			<NbCodeMirror v-if="template.type==='PDF'" v-model="template.content" :readOnly="true"></NbCodeMirror>

			<div class="bg-white p10 br4" v-else >
				<div v-html="template.content"></div>
			</div>

		</div>
		<div class="mt20">
			<p>
				<strong>预览：</strong>
			</p>


			<div v-if="template.type!=='PDF' && template.preview" class="bg-white p10 br4">
				<div v-html="template.preview"></div>
			</div>

			<div v-if="template.type === 'PDF' && !template.loading && template.preview">
				PDF预览需
				<button class="btn btn-primary" @click.stop.prevent="template.httpPreviewPdf">点击此处</button>
				在新窗口预览
			</div>

		</div>

	</div>

</template>
<script>
	import {Notification} from 'element-ui';
	import Template from '../../../common/model/template/Template'
	import NbAttribute from "../../../common/widget/attribute/NbAttribute.vue"
	import NbExpanding from '../../../common/widget/NbExpanding'
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
	import NbCodeMirror from '../../../common/widget/NbCodeMirror.vue'

	export default {

		data () {
			return {
				template: new Template(),
				typeShow: false
			}
		},
		components: {
			NbAttribute,
			NbExpanding,
			NbSlidePanel,
			NbCodeMirror
		},
		mounted(){

			this.template.id = this.$store.state.route.params.id;

			this.template.httpDetail();
		}
	}
</script>


<style lang="less" rel="stylesheet/less">

	.template-detail {

		.html-block {
			padding: 10px;
			border: 1px solid #ddd;
			background: white;
			border-radius: 4px;
		}

	}


</style>
