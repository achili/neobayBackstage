<template>
	<span>
		<label>
			宽度:
		</label>
		<label>
			<select class="form-control" v-model="val">
				<option value="12">整行</option>
				<option value="6">半行</option>
				<option value="4">1/3行</option>
				<option value="3">1/4行</option>
				<option value="2">1/6行</option>
			</select>
		</label>
	</span>
</template>

<script>
	export default {
		data(){
			return {
				val: 1
			}
		},
		props: {
			value: {
				type: [Number, String],
				required: false,
				"default": 1
			}
		},
		computed: {},
		watch: {
			"val"(){
				this.$emit('input', parseInt(this.val));
			}
		},
		methods: {},
		mounted(){
			this.val = parseInt(this.value);
		}
	}
</script>