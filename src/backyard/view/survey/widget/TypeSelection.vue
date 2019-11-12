<template>
	<span>
		<label>
			类型:
		</label>
		<label>
			<select class="form-control" v-model="val">
				<option value="TEXT">文本</option>
				<option value="TIME">时间</option>
				<option value="DATE">日期</option>
				<option value="DATETIME">日期时间</option>
				<option value="UPLOAD">上传</option>
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
				type: String,
				required: false,
				"default": 1
			}
		},
		computed: {},
		watch: {
			"val"(){
				this.$emit('input', this.val);
			}
		},
		methods: {},
		mounted(){
			this.val = this.value;
		}
	}
</script>