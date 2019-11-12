<template>
	<div class="animated fadeIn">

    <h2 v-show="!template.editMode"><i class="fa fa-fire text-success"></i>创建模板</h2>
    <h2 v-show="template.editMode"><i class="fa fa-fire text-success"></i>编辑模板</h2>
		<div class="row">
			<div class="col-xs-12">
				<button v-show="!template.editMode" class="pull-right btn btn-success f16" @click="save">
					<i class="fa fa-plus"></i>
					创建
				</button>
				<button v-show="template.editMode" class="pull-right btn btn-primary f16" @click="save">
					<i class="fa fa-save"></i>
					保存
				</button>
			</div>

			<div class="col-xs-12 m-t-md">
				<div class="form-validation">

					<div class="form-group">
						<label class="control-label">标题</label>
						<input type="text" class="form-control" :readonly="template.editMode" v-model="template.name">
					</div>


					<div class="form-group">
						<label class="control-label">描述</label>
						<textarea class="form-control" rows="2" v-model="template.description"
						          placeholder="模板描述"></textarea>
					</div>

					<div class="form-group" v-if="!template.editMode">
						<label class="control-label">
							<span class="text-danger">*</span>
							模板类别
						</label><span class="italic">(不同模板类别用于生成不同类型的文本)</span>
						<select class="form-control m-b" v-model="template.type">
							<option v-for="type in template.getTypeList()" :value="type.value">
								{{type.name}}
							</option>
						</select>

					</div>


					<div class="form-group">
						<div>
							<label class="control-label">属性</label>
							<span>
									编辑模式
									<NbCheckbox v-model="attributeEditMode"/>
							</span>
						</div>
						<div>
							<NbAttribute :attributes="template.attributes"
							             :editMode="attributeEditMode"
							             :attributeClick="attributeClick"/>

						</div>
					</div>


					<div class="form-group">
						<label class="control-label">正文</label>
						<div v-if="template.type === 'PDF'">
							<NbCodeMirror ref="editor1" v-model="template.content"/>
						</div>
						<div v-if="template.type === 'MAIL'">
              <NbEditor ref="editor2" height="700px" v-model="template.content" :isAdvanced="true"/>
						</div>
						<div v-if="template.type === 'SMS'">
							<textarea ref="editor3" class="form-control" rows="5" v-model="template.content"
							          placeholder="请填写短信模板内容……"></textarea>

						</div>
					</div>

					<div class="form-group">
						<div class="template-create-preview">
							<div class="title clearfix">
								<label class="control-label">测试数据预览</label>
								<button class="btn btn-primary btn-sm pull-right" @click="preview">
									<i class="fa fa-eye"></i>
									预览测试数据样式
								</button>
							</div>

							<span v-show="!template.preview && !template.loading" class="italic">点击 预览测试数据样式 来进行预览</span>

							<div class="text-center" v-show="template.loading">
								<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
							</div>

							<div v-if="template.type!=='PDF'" class="content" v-show="template.preview"
							     v-html="template.preview"></div>

							<div v-if="template.type === 'PDF' && !previewDirty && !template.loading && template.preview">
								PDF预览需
								<button class="btn btn-primary" @click.stop.prevent="template.httpPreviewPdf">点击此处</button>
								在新窗口预览
							</div>

						</div>
					</div>

				</div>

			</div>
			<div class="col-xs-12 m-t-md">
				<div class="alert alert-danger" v-show="template.errorMessage">
					{{template.errorMessage}}
				</div>
				<div>
					<button v-show="!template.editMode" class="pull-right btn btn-success f16" @click="save">
						<i class="fa fa-plus"></i>
						创建
					</button>
					<button v-show="template.editMode" class="pull-right btn btn-primary f16" @click="save">
						<i class="fa fa-save"></i>
						保存
					</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import NbBtnDropdown from "../../../common/widget/NbBtnDropdown"
	import NbCodeMirror from "../../../common/widget/NbCodeMirror"
	import NbEditor from "../../../common/widget/NbEditor.vue"
	import {Notification} from 'element-ui'
	import Template from '../../../common/model/template/Template'
	import Pager from '../../../common/model/base/Pager'
	import NbCheckbox from "../../../common/widget/NbCheckbox.vue"
	import NbAttribute from "../../../common/widget/attribute/NbAttribute.vue"

	export default {
		data () {
			return {
				attributeEditMode: true,
				template: new Template(),
				//用来表示预览之后是否又修改了内容。
				previewDirty: true
			}
		},
		components: {
			NbBtnDropdown,
			NbCheckbox,
			NbCodeMirror,
			NbEditor,
			NbAttribute
		},
		watch: {
			"template.content"(){
				this.previewDirty = true;
			},
			"template.type"(){
			}
		},
		computed: {
			"editor1"(){
				return this.$refs.editor1;
			},
			"editor2"(){
				return this.$refs.editor2;
			},
			"editor3"(){
				return this.$refs.editor3;
			},

			"currentTypeMap"(){
				let map = this.template.TypeMap[this.template.type];
				if (!map) {
					map = {
						name: "请选择类别",
						value: null,
						style: "default"
					}
				}
				return map;
			}
		},
		methods: {

			changeType(typeMap){
				this.template.type = typeMap.value;
			},
			attributeClick(attribute){
				if (this.template.type === "PDF") {
					this.editor1.insert(attribute.getPebble());
				} else if (this.template.type === "MAIL") {
					this.editor2.insert(attribute.getPebble());
				} else if (this.template.type === "SMS") {
					let str = attribute.getPebble();
					let tclen = this.editor3.value.length;
					this.editor3.focus();
					if (typeof document.selection !== "undefined") {
						document.selection.createRange().text = str;
					} else {
						this.editor3.value = this.editor3.value.substr(0, this.editor3.selectionStart) + str + this.editor3.value.substring(this.editor3.selectionStart, tclen);
					}
					//此时还需要设置一下值方可。
					this.template.content = this.editor3.value;
				}

			},
			save(){
				let that = this;
				this.template.httpSave(function (response) {
						Notification.success({
							message: that.template.editMode ? '修改模板成功！' : '创建模板成功！'
						});
						that.$router.push("/developer/template/detail/" + that.template.id);
					},
				);
			},
			preview(){
				let that = this;
				this.template.httpPreview(function () {
					that.previewDirty = false;
				});
			}
		},

		mounted(){
			let that = this;

			this.template.id = this.$store.state.route.params.id;

			if (this.template.id) {
				this.template.editMode = true;
				this.template.httpDetail();
			}
		}

	}
</script>

<style lang="less" rel="stylesheet/less">

	.template-create-preview {

		.title {

		}

		.content {
			margin-top: 10px;
			background: white;
			padding: 10px;
			border-radius: 4px;

		}

	}


</style>




