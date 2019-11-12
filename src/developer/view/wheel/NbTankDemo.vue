<template>
	<div>
		<div class="alert alert-info">
			<p><b>NbTank可以传入两个参数</b></p>
			<ul>
				<li>
					tank就是一个文件Tank.js类型
				</li>
				<li>
					edit true:表示是编辑模式，用户可以重新上传。 false：表示非编辑模式，只能下载
				</li>
			</ul>
			<p><b>tank中可以设置的属性有</b></p>
			<ul>
				<li>
					<span>
						filter 允许上传的文件类型
					</span>
					<ol>
						<li>* 表示允许所有类型</li>
						<li>可以上传的文件后缀名， 用|分隔，如：.pdf|.doc|.ppt</li>
						<li>可以上传的文件类型，text,audio,video,image 四种的组合，用|分隔，如：image|audio</li>
					</ol>
				</li>
				<li>
					<span>privacy</span>
					<ol>
						<li>false表示无需授权任何人均可访问该文件</li>
						<li>true表示必须授权才能访问该文件</li>
					</ol>
				</li>
			</ul>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<b>
					上传演示
				</b>
			</div>
			<div class="col-xs-3">
				<NbTank :tank="tank"/>
			</div>
			<div class="col-xs-12" style="word-wrap:break-word;">
				{{JSON.stringify(tank)}}
			</div>
		</div>

		<div class="row mt20">
			<div class="col-xs-12">
				<b>
					仅下载演示
				</b>
			</div>
			<div class="col-xs-12">
				<NbTank :tank="remoteTank" :edit="false"/>
			</div>
		</div>


		<div class="row mt30">
			<div class="col-xs-12">
				<label>docx,docx,pdf私有文件演示</label>
			</div>
			<div class="col-xs-12">
				<NbTank :tank="docPrivacyTank"/>
			</div>
		</div>

		<div class="row mt30">
			<div class="col-xs-12">
				<label>多文件上传</label>
			</div>
			<div class="col-xs-12">
				<NbTanks :tanks="tanks" :templateTank="templateTank"/>
			</div>
		</div>

	</div>


</template>
<script>

	import NbTank from "../../../common/widget/NbTank.vue";
	import NbTanks from "../../../common/widget/NbTanks.vue";
	import Tank from "../../../common/model/tank/Tank";

	export default{
		data(){
			return {
				tank: new Tank("*", false),
				remoteTank: new Tank("*"),
				docPrivacyTank: new Tank(".doc|.docx|.pdf"),
				pptPrivacyTank: new Tank(".ppt|.pptx|.pdf"),
				tanks: [],
				templateTank: new Tank("image|video", false, 10 * 1024 * 1024, "最大不超过10M")
			}
		},
		watch: {},
		methods: {},
		components: {
			NbTank,
			NbTanks
		},
		mounted(){

			
			this.docPrivacyTank.uploadHint = "只允许上传doc,docx,pdf文件。大小不超过2M";
			this.docPrivacyTank.maxSize = 1024 * 1024 * 2;

			this.pptPrivacyTank.uploadHint = "只允许上传ppt,pptx,pdf文件。大小不超过3M";
			this.pptPrivacyTank.maxSize = 1024 * 1024 * 3;



		}
	}
</script>
