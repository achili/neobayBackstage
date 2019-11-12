<template>
  <div class="animated fadeIn">
    <div class="row mv50">
      <div class="col-xs-12">
        <div class="row">
          <h5 class="col-xs-12 mt10 f16">
            <span>标签详情</span>
          </h5>
          <div class="col-xs-12 mt10">标签名称: {{policyTag.name}}</div>
          <div class="col-xs-12 mt10">标签描述: {{policyTag.description}}</div>
        </div>
      </div>
      <div class="col-xs-12 mv10 text-right">
        <button class="pull-right btn btn-primary" @click.stop.prevent="$router.push('/by/official/policy/tag/edit/'+policyTag.id)">
          <i class="fa fa-pencil">
            修改
          </i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Notification} from 'element-ui';
  import PolicyTag from "../../../../../common/model/official/OfficialPolicyTag"
  import $ from "jquery"

  export default {
    data() {
      return {
        policyTag: new PolicyTag()
      }
    },
    components: {},
    methods: {
      fetchDetail() {
        let that = this;
        this.policyTag.id = this.$store.state.route.params.id;
        if (this.policyTag.id) {
          this.policyTag.httpDetail();
        }
      }
    },
    mounted() {
      this.fetchDetail();
    }
  }
</script>
