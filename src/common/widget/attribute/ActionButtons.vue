<template>
	<span v-show="editMode">
		<a class="btn-action" title="完成" v-show="attribute.editMode" @click.stop.prevent="attribute.toggleEdit">
			<i class="fa fa-check text-warning f18"></i>
		</a>

		<a class="btn-action" title="编辑" v-show="!attribute.editMode"
		   @click.stop.prevent="attribute.toggleEdit">
			<i class="fa fa-pencil text-warning f18"></i>
		</a>

		<a class="btn-action" title="添加一个子属性" v-show="!attribute.editMode && !attribute.primitive && attribute.level<5"
		   @click.stop.prevent="attribute.addField">
			<i class="fa fa-plus text-success f18"></i>
		</a>

		<a class="btn-action" title="添加全部子属性" v-show="!attribute.editMode && !attribute.primitive && attribute.level<5"
		   @click.stop.prevent="attribute.httpAddFields">
			<i class="fa fa-plus-circle text-success f18"></i>
		</a>

		<a class="btn-action" title="上移" v-show="!attribute.editMode" @click.stop.prevent="up">
			<i class="fa fa-arrow-up f18"></i>
		</a>

		<a class="btn-action" title="下移" v-show="!attribute.editMode" @click.stop.prevent="down">
			<i class="fa fa-arrow-down f18"></i>
		</a>

		<a class="btn-action" title="删除" @click.stop.prevent="del">
			<i class="fa fa-trash text-danger f18"></i>
		</a>

	</span>
</template>

<script>
	import Attribute from '../../model/template/Attribute'
	import {MessageBox, Notification} from 'element-ui';
	export default {
		data(){
			return {}
		},
		props: {
			editMode: {
				type: Boolean,
				required: false,
				"default": false
			},
			attribute: {
				type: Attribute,
				required: true
			},
			container: {
				type: Array,
				required: true
			},
			index: {
				type: Number,
				required: true
			}


		},
		computed: {},
		watch: {},
		methods: {
			up(){
				if (this.index !== 0) {
					this.container.splice(this.index, 1);
					this.container.splice(this.index - 1, 0, this.attribute);
				}
			},
			down(){

				if (this.index !== this.container.length - 1) {
					this.container.splice(this.index, 1);
					this.container.splice(this.index + 1, 0, this.attribute);
				}

			},
			del(){
				let that = this;
				MessageBox.confirm('此操作该属性及其子属性，确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
						that.container.splice(that.index, 1);
					}
				);

			}
		},
		mounted(){
		}
	}
</script>