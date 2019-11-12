<template>

	<select class="form-control" v-model="innerValue">
		<option v-for="item in pager.getList()" :value="item.name">{{item.name}}</option>
	</select>

</template>

<script>
	import Pager from "../../common/model/base/Pager";
	import NbExpanding from '../../common/widget/NbExpanding'
	export default {
		//这个值是自定义v-model的关键所在。
		model: {
			prop: 'option',
			event: 'option'
		},
		data () {
			return {
				innerValue: this.option,
				pager: new Pager(this.Clazz, 50)
			}
		},
		props: {
			Clazz: {
				type: Function,
				required: true
			},
			option: {
				type: String | null,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			},
			callback: {
				type: Function,
				required: false
			}
		},
		components: {},
		watch: {
			"innerValue"(newVal, oldVal){
				this.$emit('option', newVal);

				if (typeof this.callback === "function") {
					this.callback(newVal);
				}
			},
			"option"(newVal, oldVal){
				if (newVal === this.innerValue) {
					//Event from inner.
				} else {
					//Event from outer
					this.innerValue = newVal;
				}
			}
		},
		computed: {},
		methods: {
			refresh(){
				this.pager.httpFastPage();
			}
		},
		mounted(){
			if (this.initFilter) {
				for (let key in this.initFilter) {
					this.pager.setFilter(key, this.initFilter[key]);
				}
			}
			this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">


</style>