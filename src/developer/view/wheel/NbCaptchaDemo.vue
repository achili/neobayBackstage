<template>
	<div>

		<h1>NbCaptcha Demo</h1>

		<NbCaptcha style="width: 80px;height: 40px;" :captcha="captcha"/>

		<p>点击验证码即可刷新</p>
	</div>

</template>
<script>

	import NbCaptcha from "../../../common/widget/NbCaptcha.vue";
	import Captcha from "../../../common/model/common/Captcha";
	export default{
		data(){
			return {
				captcha: new Captcha()
			}
		},
		watch: {},
		methods: {},
		components: {
			NbCaptcha
		},
		mounted(){

		}
	}
</script>
