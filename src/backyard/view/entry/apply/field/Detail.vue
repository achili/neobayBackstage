<template>

  <div class="row mv50">
    <div class="col-xs-12">

      <div class="row">
        <h5 class="col-xs-12 mt10 f16">
          <span>入驻领域类型详情</span>
        </h5>
        <div class="col-xs-12 mt10">领域类型名称:&nbsp;&nbsp;{{entryApplyField.name}}</div>
      </div>
    </div>
    <div class="col-xs-12 mv10 text-right">

      <button class="pull-right btn btn-primary"  @click.stop.prevent="$router.push('/by/entry/field/edit/'+entryApplyField.id)">
        <i class="fa fa-pencil"></i>
        修改
      </button>

    </div>
  </div>
</template>

<script>
  import {MessageBox, Notification} from 'element-ui'

  import EntryApplyField from  "../../../../../common/model/entry/apply/EntryApplyField"
  export default{
    data(){
      return {
        entryApplyField: new EntryApplyField()
      }
    },
    components: {},
		methods: {
			fetchDetail(){
				let that = this;
				this.entryApplyField.id = this.$store.state.route.params.id;
				if (this.entryApplyField.id) {
					this.entryApplyField.httpDetail();
				}
			}
		},
		mounted(){
			this.fetchDetail();
		}
  }

</script>




