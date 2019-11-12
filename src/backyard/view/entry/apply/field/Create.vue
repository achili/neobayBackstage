<template>
  <div>

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!entryApplyField.editMode">创建入驻领域类型</span>
          <span v-show="entryApplyField.editMode">编辑入驻领域类型</span>
        </h2>

      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <form class="form-validation" name="articleForm">
          <div class="form-group">
            <label class="control-label"><span class="red">*</span>入驻领域类型名称</label>
            <input v-model="entryApplyField.name" type="text" class="form-control">
          </div>
        </form>
      </div>

      <div class="col-xs-12 mv10 text-right">
        <div class="alert alert-danger text-center" v-show="entryApplyField.errorMessage">
          {{entryApplyField.errorMessage}}
        </div>

        <button class="pull-right btn btn-primary" @click="save">
          <i class="fa fa-send"></i>
          提交
        </button>
      </div>

    </div>

  </div>

</template>

<script>
	import {MessageBox, Notification} from 'element-ui'

  import EntryApplyField from  "../../../../../common/model/entry/apply/EntryApplyField"
  export default{
    data(){
      return{
        entryApplyField: new EntryApplyField()
      }
    },
    components: {},
    computed: {},
		watch: {},
    methods:{
      save(){
				let that = this;
				this.entryApplyField.httpSave(function (response) {
					Notification.success({
						message: that.entryApplyField.editMode ? '修改入驻领域类型成功！' : '创建入驻领域类型成功！'
					});
					that.$router.push("/by/entry/field/detail/" + that.entryApplyField.id);
				});
			},
			fetchDetail(){
        this.entryApplyField.httpDetail();
			}
    },
    mounted(){
      let that = this;
			this.entryApplyField.id = this.$store.state.route.params.id;
			if (this.entryApplyField.id) {
				this.entryApplyField.editMode = true;
				this.fetchDetail();
			}
	  }
  }
</script>