<template>
	<div>

		<h2>
			{{content}}
		</h2>


		<div class="row">
			<div class="col-xs-12">

				<div>
					<NbRadio v-model="gender" val="male" name="gender"></NbRadio>
					<label>男</label>
				</div>
				<div>
					<NbRadio v-model="gender" val="female" name="gender"></NbRadio>
					<label>女</label>
				</div>
				<div>
					{{gender}}
				</div>
			</div>
			<div class="col-xs-12 mt20">
				<div>
					<NbCheckbox v-model="checked"></NbCheckbox>
					<label>自动登录</label>
				</div>
				<div>
					<NbCheckbox v-model="checked"></NbCheckbox>
					<label>自动登录</label>
				</div>
				<div>
					{{checked}}
				</div>
			</div>
			<div class="col-xs-12 mt20">
				<div>
					<label>喜欢的科目</label>
				</div>
				<div>
					<NbCheckbox val="Chinese" v-model="courses"></NbCheckbox>
					<label>语文</label>
					<NbCheckbox val="Math" v-model="courses"></NbCheckbox>
					<label>数学</label>
					<NbCheckbox val="English" v-model="courses"></NbCheckbox>
					<label>英语</label>
					<NbCheckbox val="Physics" v-model="courses"></NbCheckbox>
					<label>物理</label>
					<NbCheckbox val="Chemistry" v-model="courses"></NbCheckbox>
					<label>化学</label>
					<NbCheckbox val="Biology" v-model="courses"></NbCheckbox>
					<label>生物</label>
				</div>
				<div>
					{{courses}}
				</div>

			</div>
			<div class="col-xs-12 mt20">
				<div>
					<label>喜欢的数字</label>
				</div>
				<div>
					<span v-for="n in 10">
						<NbCheckbox :val="n" v-model="numbers"></NbCheckbox>
						<label>{{n}}</label>
					</span>


				</div>
				<div>
					{{numbers}}
				</div>

			</div>

		</div>


	</div>

</template>
<script>

	import NbRadio from "../../../common/widget/NbRadio.vue";
	import NbCheckbox from "../../../common/widget/NbCheckbox.vue";

	export default{
		data(){
			return {
				content: null,
				gender: "female",
				checked: true,
				courses: ["Chinese"],
				numbers: []
			}
		},
		watch: {
			"gender"(newValue, oldValue){
			},
			"checked"(newValue, oldValue){
			}

		},
		methods: {
			setContent(content){
				this.content = content;
			}
		},
		components: {
			NbRadio,
			NbCheckbox
		},
		mounted(){

		}
	}
</script>
