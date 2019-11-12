<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-md-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!officialStar.editMode">创建明星项目</span>
					<span v-show="officialStar.editMode">编辑明星项目</span>
				</h2>
			</div>
		</div>


		<div class="row">
			<div class="col-md-12 mt10">
				<NbSlidePanel>
	      <span slot="heading" class="text-success f16">
						<i class="fa fa-diamond"></i>
						基本信息
	      </span>
					<div slot="body">
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">园区地点</label>
              <div class="col-md-10">
                <SpaceRegionalSelection :spaceRegional="officialStar.spaceRegional" :editMode="officialStar.editMode"></SpaceRegionalSelection>
              </div>
            </div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">项目名称</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="officialStar.name">
							</div>
						</div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">项目评分</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="officialStar.score">
              </div>
            </div>

            <div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">项目类型</label>
							<div class="col-md-10">
								<input type="text" class="form-control" v-model="officialStar.category">
							</div>
						</div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5">项目专访链接文本</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="officialStar.interviewLinkText">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5">项目专访链接</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="officialStar.interviewLink">
              </div>
            </div>

						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">项目图片</label>
							<div class="col-md-10">
								<NbTank :tank="officialStar.poster"/>
							</div>
						</div>
						<div class="row mt10">
							<label class="col-md-2 control-label compulsory">项目轮播图片:</label>
							<div class="col-md-10">
								<NbTanks :tanks="officialStar.carousel" :templateTank="templateTank"/>
							</div>
						</div>
						<div class="row mt10">
							<label class="col-md-2 control-label mt5 compulsory">项目内容</label>
							<div class="col-md-10">
								<NbEditor v-model="officialStar.content"/>
							</div>
						</div>


						<div class="row mt10">
							<div class="col-md-12">

								<div class="alert alert-danger" v-show="officialStar.errorMessage">
									{{officialStar.errorMessage}}
								</div>

							</div>
							<div class="col-md-12">

								<CreateSaveButton :entity="officialStar" :callback="save"/>
							</div>
						</div>

					</div>
				</NbSlidePanel>
			</div>
		</div>
	</div>

</template>
<script>

	import {simpleDateTime, str2Date} from '../../../../common/filter/time'
	import {Notification} from 'element-ui';
	import OfficialStar from  "../../../../common/model/official/OfficialStar"
	import Tank from  "../../../../common/model/tank/Tank"
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
	import NbTank from "../../../../common/widget/NbTank"
	import NbTanks from "../../../../common/widget/NbTanks"
	import NbEditor from "../../../../common/widget/NbEditor.vue"
	import CreateSaveButton from "../../../view/widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

	import $ from "jquery"

	export default {
		data () {
			return {
				officialStar: new OfficialStar(),
				templateTank: new Tank("image", false, 1024 * 1024, "请保证每张图片尺寸相同，大小不超过1M.")
			}
		},
		components: {
			NbSlidePanel,
			NbTank,
			NbTanks,
			NbEditor,
			CreateSaveButton,
      SpaceRegionalSelection
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;
				this.officialStar.httpSave(function (response) {

					Notification.success({
						message: that.officialStar.editMode ? '修改明星成功！' : '创建明星成功！'
					});
					that.$router.push("/by/official/star/detail/" + that.officialStar.id);

				});
			},
			fetchDetail(){
				this.officialStar.httpDetail();
			}
		},

		mounted(){
			let that = this;
			this.officialStar.id = this.$store.state.route.params.id;
			if (this.officialStar.id) {
				this.officialStar.editMode = true;
				this.fetchDetail();
			}

		}
	}


</script>
