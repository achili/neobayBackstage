<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
          <span v-show="!feedback.editMode">提交反馈</span>
					<span v-show="feedback.editMode">编辑反馈</span>
				</h2>
			</div>
		</div>


		<div class="row">
			<div class="col-xs-12">
        <CreateSaveButton createText="提交" :entity="feedback" :callback="save"/>
			</div>
			<div class="col-xs-12 m-t-md">

				<div class="form-group">
					<label class="control-label">标题</label>
					<input type="text" class="form-control" v-model="feedback.name">
				</div>

				<div class="form-group clear">
					<label class="control-label">图片</label>
					<NbTanks :tanks="feedback.tanks" :templateTank="templateTank"/>
				</div>
				<div class="m-b-md">
					<label class="control-label">主要情况</label>
					<textarea class="form-control" rows="6" v-model="feedback.description"
					          placeholder="此处填写描述信息……"></textarea>
				</div>
			</div>
			<div class="col-xs-12 m-t-md">
				<div class="alert alert-danger" v-show="feedback.errorMessage">
					{{feedback.errorMessage}}

				</div>
				<div>
          <CreateSaveButton createText="提交" :entity="feedback" :callback="save"/>

				</div>
			</div>
		</div>
	</div>

</template>
<script>
  import NbTanks from '../../../../common/widget/NbTanks'
  import Tank from '../../../../common/model/tank/Tank'
  import NbEditor from "../../../../common/widget/NbEditor"
  import { simpleDateTime, str2Date } from '../../../../common/filter/time'
  import { Notification } from 'element-ui';
  import Feedback from '../../../../common/model/user/feedback/Feedback'
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"

  import $ from "jquery"

  export default {

    data () {
      return {
        feedback: new Feedback(),
        templateTank: new Tank("image", false, 1024 * 1024, "请上传1MB以内的图片")
      }
    },
    components: {
      NbTanks,
      NbEditor,
      CreateSaveButton
    },
    computed: {},
    watch: {},
    methods: {
      save(){
        let that = this;

        this.feedback.httpSave(function (response) {

          Notification.success({
            message: that.feedback.editMode ? '修改反馈成功！' : '创建反馈成功！'
          });
          that.$router.push("detail/" + that.feedback.id);

        });
      }
    },

    mounted(){

      let that = this;

      this.feedback.id = this.$store.state.route.params.id;

      if (this.feedback.id) {

        this.feedback.editMode = true;
        this.feedback.httpDetail();
      }
    }
  }
</script>
