<template>
	<div class="animated fadeIn">

    <LoadingFrame :loading="spaceBuilding.detailLoading">
		<div class="row">
			<div class="col-md-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!spaceBuilding.editMode">创建楼栋</span>
					<span v-show="spaceBuilding.editMode">编辑楼栋</span>
				</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12 mt10">
				<NbSlidePanel>
					<span slot="heading" class="text-default">
						<i class="fa fa-dot-circle-o"></i>
						基本信息
					</span>
					<div class="row" slot="body">

            <div class="col-md-6">
              <div class="row ">
                <label class="col-md-4 control-label mt5 compulsory">园区地点</label>
                <div class="col-md-8">
                  <SpaceRegionalSelection :spaceRegional="spaceBuilding.spaceRegional" :editMode="spaceBuilding.editMode"></SpaceRegionalSelection>
                </div>
              </div>
            </div>

						<div class="col-md-6">
							<div class="row mt10">
								<label class="col-md-4 control-label mt5 compulsory">楼栋名称</label>
								<div class="col-md-8">
									<input type="text" class="form-control" v-model="spaceBuilding.name">
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="row mt10">
								<label class="col-md-4 control-label mt5 compulsory">楼栋编号</label>
								<div class="col-md-8">
									<input type="text" class="form-control" v-model="spaceBuilding.no">
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="row mt10">
								<label class="col-md-4 control-label mt5 compulsory">楼层数</label>
								<div class="col-md-8">
									<input type="number" class="form-control" v-model="spaceBuilding.floorNum">
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="row mt10">
								<label class="col-md-4 control-label mt5 compulsory">房间总数</label>
								<div class="col-md-8">
									<input type="number" class="form-control" v-model="spaceBuilding.capacity">
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="row mt10">
								<label class="col-md-4 control-label mt5 compulsory">使用中的房间数</label>
								<div class="col-md-8">
									<input type="number" class="form-control" v-model="spaceBuilding.roomNum">
								</div>
							</div>
						</div>


						<div class="col-md-6">
							<div class="row mt10">
								<label class="col-md-4 control-label mt5 compulsory">房产证编号</label>
								<div class="col-md-8">
									<input type="text" class="form-control" v-model="spaceBuilding.propertyNo">
								</div>
							</div>
						</div>


						<div class="col-md-12">
							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">地址</label>
								<div class="col-md-10">
									<input type="text" class="form-control" v-model="spaceBuilding.address">
								</div>
							</div>
						</div>



						<div class="col-md-12">
							<div class="row mt10">
								<label class="col-md-2 control-label mt5 compulsory">描述</label>
								<div class="col-md-10">
										<textarea class="form-control" rows="4" v-model="spaceBuilding.description"
										          placeholder="此处填写楼栋描述……"></textarea>
								</div>
							</div>
						</div>

						<div class="col-md-12  mt10">
							<div class="alert alert-danger" v-show="spaceBuilding.errorMessage">
								{{spaceBuilding.errorMessage}}
							</div>
						</div>


					</div>
				</NbSlidePanel>
			</div>
      <div class="col-md-12 text-right  mt10">
        <CreateSaveButton :entity="spaceBuilding" :callback="save" />
      </div>
		</div>
    </LoadingFrame>
	</div>
</template>

<script>
	import NumberInput from '../../../../common/widget/NbNumberInput'
	import {Notification, MessageBox} from 'element-ui';
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

	import SpaceBuilding from  "../../../../common/model/space/SpaceBuilding"
	import $ from "jquery"
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"

	export default{
		data(){
			return {
				spaceBuilding: new SpaceBuilding()
			}
		},
		components: {
			NumberInput,
			NbSlidePanel,
      LoadingFrame,
      CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;
				this.spaceBuilding.httpSave(function (response) {
					Notification.success({
						message: that.spaceBuilding.editMode ? '修改楼栋成功！' : '创建楼栋成功！'
					});
					that.$router.push("/by/space/building/detail/" + that.spaceBuilding.id);
				});
			},
			fetchDetail(){
				this.spaceBuilding.httpDetail();
			}
		},
		mounted(){
			let that = this;
			this.spaceBuilding.id = this.$store.state.route.params.id;
			if (this.spaceBuilding.id) {
				this.spaceBuilding.editMode = true;
				this.fetchDetail();
			}
		}
	}


</script>











