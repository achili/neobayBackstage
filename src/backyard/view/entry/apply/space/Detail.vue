<template>
  <div class="row mv50">
    <div class="col-xs-12">

      <div class="row">
        <h5 class="col-xs-12 mt10 f16">
          <span>空间类型详情</span>
        </h5>
        <div class="col-xs-12 mt10">空间类型名称:{{entryApplySpace.name}}</div>
      </div>
    </div>
    <div class="col-xs-12 mv10 text-right">

      <button class="pull-right btn btn-primary"  @click.stop.prevent="$router.push('/by/entry/space/edit/'+entryApplySpace.id)">
        <i class="fa fa-pencil"></i>
        修改
      </button>

    </div>
  </div>
</template>

<script>
  import {Notification, MessageBox} from 'element-ui';

  import EntryApplySpace from  "../../../../../common/model/entry/apply/EntryApplySpace"
  import $ from "jquery"

  export default{
    data(){
      return {
        entryApplySpace: new EntryApplySpace()
      }
    },
    components: {},
		methods: {
			fetchDetail(){
				let that = this;
				this.entryApplySpace.id = this.$store.state.route.params.id;
				if (this.entryApplySpace.id) {
					this.entryApplySpace.httpDetail();
				}
			}
		},
		mounted(){
			this.fetchDetail();
		}
  }
</script>


















