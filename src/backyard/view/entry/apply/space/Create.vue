<template>
  <div>

    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!entryApplySpace.editMode">创建入驻空间类型</span>
          <span v-show="entryApplySpace.editMode">编辑入驻空间类型</span>
        </h2>

      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <form class="form-validation" name="articleForm">
          <div class="form-group">
            <label class="control-label"><span class="red">*</span>空间类型名称</label>
            <input v-model="entryApplySpace.name" type="text" class="form-control">
          </div>

        </form>
      </div>

      <div class="col-xs-12 mv10 text-right">
        <div class="alert alert-danger text-center" v-show="entryApplySpace.errorMessage">
          {{entryApplySpace.errorMessage}}
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
  import {Notification, MessageBox} from 'element-ui';

  import EntryApplySpace from  "../../../../../common/model/entry/apply/EntryApplySpace"
  import $ from "jquery"

  export default{
    data(){
      return{
        entryApplySpace: new EntryApplySpace()
      }
    },
    components: {},
    computed: {},
		watch: {},
    methods:{
      save(){
				let that = this;
				this.entryApplySpace.httpSave(function (response) {
					Notification.success({
						message: that.entryApplySpace.editMode ? '修改入驻空间类型成功！' : '创建入驻空间类型成功！'
					});
					that.$router.push("/by/entry/space/detail/" + that.entryApplySpace.id);
				});
			},
			fetchDetail(){
        this.entryApplySpace.httpDetail();
			}
    },
    mounted(){
      let that = this;
			this.entryApplySpace.id = this.$store.state.route.params.id;
			if (this.entryApplySpace.id) {
				this.entryApplySpace.editMode = true;
				this.fetchDetail();
			}
    }
  }
</script>

