<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!userRole.editMode">创建角色</span>
					<span v-show="userRole.editMode">编辑角色</span>
				</h2>
			</div>
		</div>


		<div class="row">

			<div class="col-xs-12 m-t-md">

				<NbSlidePanel>

					<span slot="heading" class="">
						<i class="fa fa-user-secret"></i>
						角色权限
					</span>

          <div class="form-group">
            <label class="control-label compulsory">园区地点</label>
            <SpaceRegionalSelection :spaceRegional="userRole.spaceRegional" :editMode="userRole.editMode"></SpaceRegionalSelection>
          </div>

					<div class="form-group">
						<label class="control-label compulsory">角色名称</label>
						<input type="text" class="form-control" v-model="userRole.name">
					</div>

					<div class="form-group">
            <label class="control-label compulsory">详情</label>
						<textarea class="form-control" rows="4" v-model="userRole.description"
						          placeholder="此处填写描述……"></textarea>
					</div>

					<div class="form-group">
						<div class="alert alert-danger" v-show="userRole.errorMessage">
							{{userRole.errorMessage}}
						</div>
						<div class="text-right">
							<CreateSaveButton :entity="userRole" :callback="save"/>
						</div>
					</div>
				</NbSlidePanel>

			</div>

		</div>
	</div>
</template>
<style>

</style>
<script>
	import {Notification} from 'element-ui';
	import UserRole from  "../../../../common/model/user/role/UserRole"
	import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
	import NbSwitcher from "../../../../common/widget/NbSwitcher.vue";
	import AccessColumn from  "../../../../common/model/user/AccessColumn";
	import CreateSaveButton from  "../../widget/CreateSaveButton.vue";
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

	export default{
		data(){
			return {
				userRole: new UserRole(),
				accessColumns: [],
				titles: [],
				titleToggles: {
					article: true,
					company: true
				},
				table: {},
				tan: true
			}
		},
		components: {
			NbSlidePanel,
			NbSwitcher,
			CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;
				this.userRole.httpSave(function (response) {

					Notification.success({
						message: that.userRole.editMode ? '修改角色成功！' : '创建角色成功！'
					});
					that.$router.push("/by/user/role/detail/" + that.userRole.id);

				});
			}
		},
		mounted(){
			let that = this;
			this.userRole.id = this.$store.state.route.params.id;
			if (this.userRole.id) {
				this.userRole.httpDetail();
			}
		}
	}
</script>


