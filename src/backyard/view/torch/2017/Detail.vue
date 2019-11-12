<template>
  <div class="by-article-detail animated fadeIn">

    <div class="row">
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
        <div class="mail-box-header">
          <div class="pull-right">
            <button title="编辑" class="btn btn-success"
                    @click.stop.prevent="$router.push('/by/torch2017/edit/?id='+torch.id)">
              <i class="fa fa-pencil"></i>
              编辑
            </button>
          </div>
          <div class="mail-tools m-t-md">
            <h3>
              2017火炬统计表
            </h3>
            <div>
              <span>企业名称：{{torch.businessName}}</span>
              <span class="ml10">企业登记注册类型：{{torch.registrationType}}</span>
              <span class="ml10">企业成立时间：{{torch.businessStartTime | simpleDateTime}}</span>
            </div>

          </div>
        </div>
      </div>

    </div>

  </div>

</template>
<script>
  import {Notification} from 'element-ui';
  import Torch from "../../../../common/model/torch/Torch2017"

  export default {
    data () {
      return {
        torch: new Torch()
      }
    },
    components: {},
    methods: {},
    mounted(){
      let that = this;
      this.torch.id = this.$store.state.route.params.id;
      if (this.torch.id) {
        this.torch.httpDetail();
      }
    }
  }
</script>

