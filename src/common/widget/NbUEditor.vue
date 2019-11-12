<template>
	<div>
		<div class="alert alert-danger" v-show="base.errorMessage">
			{{base.errorMessage}}
		</div>
		<div ref="iframe">
			<iframe id="ueditorIFrame" :src="iframeUrl"
			        width="100%" height="500"
			        allowTransparency="true" style="border: none;">
				您的浏览器不支持嵌入式框架，推荐使用Chrome浏览器获得最佳体验。
			</iframe>
		</div>

	</div>
</template>

<script>
	import "../../common/fork/messenger/messenger";
	import Base from "../../common/model/base/Base";

	export default {
		data(){
			return {
				base: new Base(),
				token: null,
				iframeUrl: null
			}
		},
		props: {
			value: {
				type: String,
				required: false
			}
		},
		computed: {},
		methods: {

			fetchToken(success, failure){
				let that = this;
				let url = "/tank/ueditor_token";
				this.base.httpPost(url, {}, function (response) {

					that.token = response["data"]["token"];
					if (success && typeof success === "function") {
						success(response["data"]["token"]);
					}
				});
			}
		},
		mounted(){
			let that = this;


			this.fetchToken(function (token) {

				that.token = token;


				that.iframeUrl = that.$store.state.tankHost + "/ueditor/iframe?token=" + that.token;


				let messenger = new Messenger('parent' + that.token, 'UeditorMessenger');
				let ueditorIFrame = document.getElementById('ueditorIFrame');

				messenger.listen(function (msg) {


					if (msg === "__loaded__") {
						if (that.value) {
							messenger.targets['child' + that.token].send(that.value);
						}
					} else {

						that.$emit('input', msg);
						//that.callback(msg);
					}

				});
				messenger.addTarget(ueditorIFrame.contentWindow, 'child' + that.token);


			});


		}
	}
</script>
