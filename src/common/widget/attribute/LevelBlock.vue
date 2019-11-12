<template>

	<div class="level-block">

		<div class="panel panel-default">
			<div class="panel-heading clearfix"
			     :class="{'primitive':attribute.primitive,'collection':attribute.isComplexCollection(),'error':attribute.errorMessage}"
			     @click.stop.prevent="levelClick(attribute)">
				<div class="pull-left">
					{{attribute.name?attribute.name:"请选择属性"}} : {{attribute.description?attribute.description:"请输入描述"}}
				</div>
				<div class="pull-right">

					<ActionButtons :index="index" :attribute="attribute" :container="container" :editMode="editMode"/>

				</div>

			</div>

			<NbExpanding>
				<PanelBody v-if="attribute.editMode" :attribute="attribute" :container="container"
				           :candidates="attribute.httpGetCandidates(parentClazz)"/>
			</NbExpanding>


		</div>

		<LevelBlock v-for="(attr,attrIndex) in attribute.attributes"
		            :key="attr.name" :attribute="attr" :index="attrIndex"
		            :container="attribute.attributes" :parentClazz="attribute.asParentClazz()"
		            :editMode="editMode" :attributeClick="attributeClick"/>

	</div>

</template>

<script>
	import Attribute from '../../model/template/Attribute'
	import ActionButtons from "./ActionButtons.vue"
	import PanelBody from "./PanelBody.vue"
	import NbExpanding from '../NbExpanding.vue'
	export default {
		//利用name，进行递归。
		name: 'LevelBlock',
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
				required: false
			},
			container: {
				type: Array,
				required: true
			},
			index: {
				type: Number,
				required: true
			},
			parentClazz: {
				type: String,
				required: false,
				"default": null
			},
			attributeClick: {
				type: Function,
				required: false
			}

		},
		components: {
			ActionButtons,
			PanelBody,
			NbExpanding
		},
		computed: {},
		watch: {},
		methods: {
			levelClick(attribute){
				if (this.editMode) {
					attribute.toggleEdit();
				} else {
					if (typeof this.attributeClick === "function") {
						this.attributeClick(attribute);
					}
				}
			}
		},
		mounted(){
		}
	}
</script>
