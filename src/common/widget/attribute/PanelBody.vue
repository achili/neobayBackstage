<template>

	<div class="panel-body">

		<div class="form-group">
			<div class="col-xs-12">
				<div class="row">
					<label class="col-md-2 control-label mt5">名称 - clazz</label>
					<div class="col-md-10">
						<i class="fa fa-spinner fa-spin fa-2x" v-show="!candidates || !candidates.length"></i>
						<select class="form-control" :disabled="attribute.attributes && attribute.attributes.length!==0"
						        v-show="candidates && candidates.length"
						        v-model="attribute.name" @change="attribute.select(candidates)">
							<option :value="null">
								请选择名称
							</option>
							<option v-for="entity in candidates" :disabled="exist(entity)" :value="entity.name">
								{{entity.name}} - {{entity.clazz}}
							</option>
						</select>
					</div>
				</div>
			</div>

			<div class="col-xs-12 mt10">
				<div class="row">
					<label class="col-md-2 control-label mt5">描述</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="attribute.description"/>
					</div>
				</div>
			</div>

			<div class="col-xs-12">
				<div class="alert alert-info mt10 mb0"
				     v-show="attribute.editMode && attribute.attributes && attribute.attributes.length!==0">
					该属性包含子属性，此时不能修改名称和clazz.
				</div>
				<div class="alert alert-danger mt10 mb0" v-show="attribute.errorMessage">
					{{attribute.errorMessage}}
				</div>
			</div>


		</div>


	</div>

</template>

<script>
	import Attribute from '../../model/template/Attribute'

	export default {
		data(){
			return {}
		},
		props: {
			attribute: {
				type: Attribute,
				required: true
			},
			candidates: {
				type: Array,
				required: false
			},
			container: {
				type: Array,
				required: true
			}

		},
		computed: {

			uniqueCandidates(){


				let temp = [];

				for (let i = 0; i < this.candidates.length; i++) {
					let a = this.candidates[i];
					let exist = false;
					for (let j = 0; j < this.container.length; j++) {
						let b = this.container[j];
						if (a.clazz === b.clazz) {
							exist = true;
							break;
						}
					}
					if (!exist) {
						temp.push(a);
					}
				}

				return temp;

			}
		},
		watch: {},
		methods: {
			exist(entity){
				for (let j = 0; j < this.container.length; j++) {
					let b = this.container[j];
					if (entity.name === b.name && b.name !== this.attribute.name) {
						return true;
					}
				}
				return false;
			}
		},
		mounted(){
		}
	}
</script>