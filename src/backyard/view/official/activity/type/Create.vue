<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!officialActivityType.editMode">发布资讯</span>
					<span v-show="officialActivityType.editMode">编辑资讯</span>
				</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-12">
				<CreateSaveButton  :entity="officialActivityType" :callback="save" />
			</div>
			<div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label">园区地点</label>
          <SpaceRegionalSelection :spaceRegional="officialActivityType.spaceRegional" :editMode="officialActivityType.editMode"></SpaceRegionalSelection>
        </div>

				<div class="form-group">
					<label class="control-label">标题</label>
					<input type="text" class="form-control" v-model="officialActivityType.name">
				</div>

				<div class="col-xs-12 m-t-md">
					<div class="alert alert-danger" v-show="officialActivityType.errorMessage">
						{{officialActivityType.errorMessage}}
					</div>
				</div>

			</div>
			<div class="col-xs-12">
				<CreateSaveButton  :entity="officialActivityType" :callback="save" />
			</div>
		</div>
	</div>

</template>
<script>
  import NbTank from '../../../../../common/widget/NbTank'
  import NbEditor from "../../../../../common/widget/NbEditor"
  import {Notification} from 'element-ui';
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../../../backyard/view/space/regional/Selection'
  import OfficialActivityType from  "../../../../../common/model/official/OfficialActivityType"

  import $ from "jquery"

  export default {

    data () {
      return {
        officialActivityType: new OfficialActivityType()
      }
    },
    components: {
      NbTank,
      NbEditor,
      CreateSaveButton,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {

    },
    methods: {
      save(){
        let that = this;

        this.officialActivityType.httpSave(function (response) {

          Notification.success({
            message: that.officialActivityType.editMode ? '修改文章成功！' : '创建文章成功！'
          });
          that.$router.push("/by/official/activity/type/detail/" + that.officialActivityType.id);

        });
      }
    },


    mounted(){

      let that = this;

      this.officialActivityType.id = this.$store.state.route.params.id;

      if (this.officialActivityType.id) {

        this.officialActivityType.editMode = true;
        this.officialActivityType.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
