<template>
	<div class="row">
		<div class="col-md-3">
			<NavigationMenus/>

		</div>
		<div class="col-md-9">
			<div class="mail-box-header">

        <CreateSaveButton createText="发送" :entity="messageLetter" :callback="send" createIcon="fa fa-send"/>

				<h2>
					写私信
				</h2>
			</div>
			<div class="mail-box">

				<div class="mail-body">

					<div class="form-horizontal">

						<div class="form-group">
							<label class="col-sm-2 control-label">收信人:</label>
							<div class="col-sm-10">
								<UserSelections :users="messageLetter.receivers"/>
							</div>
						</div>

						<div class="form-group">
							<label class="col-sm-2 control-label">主题:</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" v-model="messageLetter.subject">
							</div>
						</div>

						<div class="form-group">
							<label class="col-sm-2 control-label">附件:</label>
							<div class="col-sm-10">

								<NbTanks :tanks="messageLetter.attachments"/>

							</div>
						</div>

					</div>

				</div>

				<div class="mail-text mh15 mb15">

					<NbEditor v-model="messageLetter.content"/>
					<div v-if="messageLetter.errorMessage" class="alert alert-danger mt10">
						{{messageLetter.errorMessage}}
					</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
	import NbEditor from "../../../../common/widget/NbEditor.vue"
	import NavigationMenus from "./widget/NavigationMenus";
	import MessageLetter from '../../../../common/model/message/letter/MessageLetter'
	import UserSelections from '../../../../backyard/view/user/Selections.vue';
	import {Notification} from 'element-ui';
	import NbTank from "../../../../common/widget/NbTank"
	import NbTanks from "../../../../common/widget/NbTanks"
	import CreateSaveButton from "../../../../backyard/view/widget/CreateSaveButton.vue"
	export default {

		data () {
			return {
				messageLetter: new MessageLetter()
			}
		},
		components: {
			NavigationMenus,
			UserSelections,
			NbEditor,
			NbTank,
			NbTanks,
			CreateSaveButton
		},
		computed: {},
		watch: {},
		methods: {
			send(){
				let that = this;
				this.messageLetter.httpSave(function () {

					Notification.success({
						message: '发送成功！'
					});
					that.$router.push("outbox");

				});
			}
		},


		mounted(){

			let that = this;

		}
	}

</script>
