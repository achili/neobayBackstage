<template>
	<div class="animated fadeIn">


		<NbSlidePanel>
			<span slot="heading" class="text-success">
        <i class="fa fa-user-circle-o"></i>
        编辑用户信息
      </span>

			<div>
				<div class="row">
					<label class="col-md-2 control-label mt5">头像</label>
					<div class="col-md-10">
						<NbTank :tank="user.avatar"/>
					</div>
				</div>

				<div class="row mt10"
				     v-if="currentUser.hasPermissionAllSpace($store.state.FeatureType.USER_ROLE_MANAGE) && currentUser.id != user.id">
					<label class="col-md-2 control-label mt5 compulsory">角色</label>
					<div class="col-md-10">

						<RoleSelection :activeUserRole="user.role"/>

					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">邮箱</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="user.email">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5">个人简介</label>
					<div class="col-md-10">
						<textarea class="form-control" rows="6" v-model="user.description"
						          placeholder="此处填写个人简介……"></textarea>
					</div>
				</div>

				<div class="alert alert-danger mt10" v-show="user.errorMessage">
					{{user.errorMessage}}
				</div>
				<div class="mt10">

					<CreateSaveButton :entity="user" :callback="save"/>

				</div>

			</div>

		</NbSlidePanel>


	</div>

</template>
<script>
	import {Notification} from 'element-ui';
	import NbTank from '../../../common/widget/NbTank';
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue';
	import User from '../../../common/model/user/User';
	import CreateSaveButton from "../widget/CreateSaveButton";
	import RoleSelection from "./role/Selection.vue";
	export default{
		data(){
			return {
				FeatureType: this.$store.state.FeatureType,
				currentUser: this.$store.state.user,
				user: new User()
			}
		},
		watch: {},
		methods: {
			save(){

				let that = this;
				this.user.httpSave(function (response) {

					Notification.success({
						message: '修改信息成功！'
					});
					that.$router.push("/by/user/profile/" + that.user.id );
					if(that.$store.state.user.id === that.user.id) {
            that.user.innerLogin(response);
          }
				});
			}
		},
		components: {
			NbTank,
			NbSlidePanel,
			CreateSaveButton,
			RoleSelection
		},
		mounted(){
			this.user.errorMessage = null;
			this.user.id = this.$store.state.route.params.id;
			if (this.user.id) {
				this.user.httpDetail();
			}
		}
	}
</script>
