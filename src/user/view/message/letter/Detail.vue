<template>

	<div class="by-message-letter-detail animated fadeIn">
		<div class="row">
			<div class="col-md-3">
				<NavigationMenus/>
			</div>
			<div class="col-md-9">
				<div class="mail-box-header">
					<div class="pull-right">
						<button class="btn btn-primary btn-sm"><i class="fa fa-reply"></i> 回复</button>
						<button class="btn btn-info btn-sm"><i class="fa fa-arrow-right"></i> 转发</button>
						<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i> 删除</button>
					</div>
					<div class="mail-tools m-t-md">

						<h3>
							{{messageLetter.subject}}
						</h3>
						<h5>
							<span class="font-noraml">收件人: </span>
							<span>
								<span v-for="user in messageLetter.receivers">{{user.nickname}}&lt;{{user.email}}&gt; &nbsp;</span>
							</span>
						</h5>
						<h5>
							<span class="pull-right font-noraml">{{messageLetter.createTime | simpleDateTime}}</span>
							<span class="font-noraml">发件人: </span>
							<span>{{messageLetter.sender.nickname}}&lt;{{messageLetter.sender.email}}&gt; &nbsp;</span>
						</h5>

					</div>
				</div>
				<div class="mail-box">

					<div class="mail-body">
						<div class="text-center" v-show="messageLetter.loading">
							<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
						</div>
						<div v-html="messageLetter.content"></div>
					</div>
					<div class="mail-attachment" v-if="messageLetter.attachments.length">
						<p>
							<span><i class="fa fa-paperclip"></i> {{messageLetter.attachments.length}} 附件 </span>
						</p>
						<div class="attachment clearfix">

							<div class="col-sm-6" v-for="tank in messageLetter.attachments">
								<NbTank :tank="tank" :edit="false"/>
							</div>

						</div>
					</div>

				</div>
			</div>

			<div class="col-xs-12 text-right">
				<button class="btn btn-success" @click="$router.go(-1)">
					<i class="fa fa-arrow-left"></i>
					返回
				</button>
			</div>
		</div>
	</div>

</template>


<script>
	import {Notification} from 'element-ui';
	import MessageLetter from '../../../../common/model/message/letter/MessageLetter'
	import NbTank from "../../../../common/widget/NbTank"
	import NavigationMenus from "./widget/NavigationMenus";
	export default {
		data () {
			return {

				messageLetter: new MessageLetter(),
				messageManager: this.$store.state.messageManager


			}
		},
		components: {
			NbTank,
			NavigationMenus
		},
		computed: {},
		watch: {},
		methods: {},
		mounted(){
			let that = this;
			this.messageLetter.id = this.$store.state.route.query.id;
			if (this.messageLetter.id) {
				this.messageLetter.httpDetail(function () {
					//此步骤操作可能使得badge的数量发生变化。
					that.messageManager.httpCount();
				});
			}
		}
	}
</script>


<style lang="less" rel="stylesheet/less">

	.by-message-letter-detail {

		.mail-body {
			img {
				max-width: 100%;
			}
		}

	}


</style>

