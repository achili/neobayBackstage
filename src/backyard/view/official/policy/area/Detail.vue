<template>
  <div class="animated fadeIn">
    <div class="row mv50">
      <div class="col-xs-12">
        <div class="row">
          <h5 class="col-xs-12 mt10 f16">
            <span>地区详情</span>
          </h5>
          <div class="col-xs-12 mt10">地区名称:  {{policyArea.name}}</div>
        </div>
      </div>

      <div class="col-xs-12 mv10 text-right">
        <button class="pull-right btn btn-primary" @click.stop.prevent="$router.push('/by/official/policy/area/edit/'+policyArea.id)">
          <i class="fa fa-pencil">
            修改
          </i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Notifition} from 'element-ui';
  import PolicyArea from "../../../../../common/model/official/OfficialPolicyArea"
  import $ from "jquery"

  export default {
    data() {
      return {
        policyArea: new PolicyArea()
      }
    },
    components: {},
    methods: {
      fetchDetail() {
        let that = this;
        this.policyArea.id = this.$store.state.route.params.id;
        if(this.policyArea.id) {
          this.policyArea.httpDetail();
        }
      }
    },
    mounted() {
      this.fetchDetail();
    }
  }
</script>
