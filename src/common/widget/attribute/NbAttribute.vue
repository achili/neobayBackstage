<template>

	<div class="mail-template-attribute">

		<LevelBlock v-for="(attribute,index) in attributes" :key="attribute.name" :attribute="attribute" :index="index"
		            :container="attributes" :editMode="editMode"
		            :attributeClick="attributeClick"/>


		<div class="level add" @click.stop.prevent="addAttribute" v-show="editMode">
			<i class="fa fa-plus"></i>
			添加属性
		</div>

		<div class="usage">

			<div class="indicator">

				<a href="javascript:void(0)" v-show="!usageShow" @click.stop.prevent="usageShow=true">显示使用说明</a>
				<a href="javascript:void(0)" v-show="usageShow" @click.stop.prevent="usageShow=false">隐藏使用说明</a>

			</div>

			<NbExpanding>
				<div v-show="usageShow">
					<div class="content">

						<p>
							<span class="text-danger">在非编辑模式下点击上方的属性可以快速向编辑器中插入属性变量</span>
						</p>

						<div class="section">
							<p>
								<strong>图例：</strong>
							</p>
							<p>
								<span class="label-attribute">红色</span>表示复杂属性，其内部还包含若干属性。不可直接作为变量使用，必须结合其子属性使用。
							</p>
							<p>
								<span class="label-collection">黄色</span>表示是一个列表，这个列表中还包含其他属性。需要结合其子属性使用循环输出。
							</p>
							<p>
								<span class="label-field">蓝色</span>表示简单属性。可以通过其父属性的组合链式输出。
							</p>
						</div>

						<div class="section">
							<p>
								<strong>变量：</strong>
							</p>
							<p>
								使用点语法来输出变量
							</p>
							<div>
								<pre><code>{{ "\{\{ foo.bar \}\}" }}</code></pre>
							</div>
						</div>

						<div class="section">
							<p>
								<strong>循环：</strong>
							</p>
							<div>
							<pre><code>{% for article in articles %}
  {{ "\{\{ article.title \}\}" }}
  {{ "\{\{ article.content \}\}" }}
{% else %}
  There are no articles.
{% endfor %}</code></pre>
							</div>

						</div>

						<div class="section">
							<p>
								<strong>条件判断：</strong>
							</p>
							<div>
							<pre><code>{% if category == "news" %}
    {{ "\{\{ news \}\}" }}
{% elseif category == "sports" %}
    {{ "\{\{ sports \}\}" }}
{% else %}
    Please select a category
{% endif %}</code></pre>
							</div>

						</div>


					</div>
				</div>

			</NbExpanding>


		</div>

	</div>
</template>

<script>
	import Attribute from '../../model/template/Attribute'
	import LevelBlock from "./LevelBlock.vue"

	import NbExpanding from '../NbExpanding'

	export default {
		data(){
			return {
				usageShow: false
			}
		},
		props: {
			attributes: {
				type: Array,
				required: true
			},
			editMode: {
				type: Boolean,
				required: false,
				"default"(){
					return true;
				}
			},
			attributeClick: {
				type: Function,
				required: false
			}
		},
		components: {
			LevelBlock,
			NbExpanding
		},
		computed: {},
		watch: {},
		methods: {
			addAttribute(){
				let attribute = new Attribute();
				attribute.editMode = true;
				attribute.level = 0;
				this.attributes.push(attribute);
			}
		},
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.mail-template-attribute {

		@color-bg: #F8FAFF;
		@color-bg-highlight: #F4F6F7;
		@color-border: #DAE2EA;
		@color-border-highlight: #DCE2E8;
		@color-attribute: #d9534f;
		@color-attribute-highlight: #d91903;
		@color-field: #3F6AB2;
		@color-field-highlight: #0645b2;
		@color-collection: #b28813;
		@color-collection-highlight: #b26905;
		@color-add-btn: #999;
		@color-add-btn-highlight: #555;

		.usage {
			.indicator {

			}
			.content {
				border: 1px solid #aaaaaa;
				padding: 10px;

				.section {
					margin-top: 20px;
					&:first-child {
						margin-top: 0;
					}

				}
			}

		}
		.label-attribute {
			font-weight: bold;
			color: @color-attribute;
		}
		.label-field {
			font-weight: bold;
			color: @color-field;
		}
		.label-collection {
			font-weight: bold;
			color: @color-collection;
		}

		option:disabled {
			color: red;
		}
		.level-block {
			margin: 5px 0 5px 25px;
		}
		> .level-block {
			margin-left: 0;
		}

		.panel {
			margin-bottom: 0;
		}
		.panel-body {
			border-top: 1px solid #ddd;
		}
		.level, .panel-heading {

			border-color: transparent;

			&.error {
				border: 1px dashed red;
			}

			cursor: pointer;
			background: @color-bg;
			color: @color-attribute;
			&.primitive {
				color: @color-field;
			}
			&.collection {
				color: @color-collection;
			}
			text-decoration: none;
			font-weight: bold;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;

			//添加属性按钮
			&.add {

				min-height: 38px;
				margin: 5px 0;
				padding: 8px 12px;

				text-align: center;
				border: 1px dashed @color-add-btn;
				color: @color-add-btn;
			}

			&:hover {
				color: @color-attribute-highlight;
				&.primitive {
					color: @color-field-highlight;
				}
				&.collection {
					color: @color-collection-highlight;
				}

				background: @color-bg-highlight;
				&.add {
					border: 1px dashed @color-add-btn-highlight;
					color: @color-add-btn-highlight;
				}
			}
		}

	}
</style>
