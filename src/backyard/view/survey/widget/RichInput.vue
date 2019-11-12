<template>
	<div class="form-group" :class="{'has-warning':input.errorMessage}">
		<div>
			<label v-if="title">{{title}}</label>
		</div>
		<input v-if="input.type === 'TEXT' && input.row === 1" type="text" class="form-control"
		       v-model="input.value"
		       :placeholder="placeholder"/>
		<textarea v-if="input.type === 'TEXT' && input.row > 1" class="form-control" :rows="input.row"
		          v-model="input.value"
		          :placeholder="placeholder"></textarea>
		<NbTimePicker v-if="input.type === 'TIME'" v-model="input.time"/>

		<el-date-picker
			v-if="input.type === 'DATE'"
			v-model="input.date"
			type="date"
			placeholder="选择日期"/>

		<el-date-picker
			v-if="input.type === 'DATETIME'"
			v-model="input.datetime"
			type="datetime"
			placeholder="选择日期"/>

		<NbTank v-if="input.type === 'UPLOAD'" :tank="input.tank" :edit="input.procedure !== 'ANSWER_DISPLAY'"/>

	</div>
</template>

<script>

	import Survey from "../../../../common/model/survey/Survey";
	import SurveyInput from '../../../../common/model/survey/SurveyInput'
	import NbTimePicker from '../../../../common/widget/NbTimePicker'
	import NbTank from '../../../../common/widget/NbTank'

	export default {
		data(){
			return {}
		},
		props: {
			title: {
				type: String,
				required: false,
				"default": null
			},
			input: {
				type: SurveyInput,
				required: true
			}
		},
		computed: {
			placeholder(){
				if (this.input.procedure === Survey.prototype.Procedure.SURVEY_CREATE ||
					this.input.procedure === Survey.prototype.Procedure.SURVEY_EDIT
				) {
					return "用户将在此输入内容...";
				} else {
					if (this.title) {
						return this.title;
					} else {
						return "请输入内容";
					}
				}
			}
		},
		components: {
			NbTimePicker,
			NbTank
		},
		watch: {},
		methods: {},
		mounted(){

		}
	}
</script>
