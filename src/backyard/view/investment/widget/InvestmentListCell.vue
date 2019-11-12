<template>
  <div class="company-list-cell">

    <div class="bg-white p10 br4 mt10 cursor border"
         @click.stop.prevent="$router.push({path: 'detail', query: { id: investment.id }})">

      <div class="media">
        <div class="pull-right action-buttons">
          <a title="关注" v-show="investment.isFollow === false"   @click.stop.prevent="follow(investment)">
            <i class="fa fa-star-o text-warning  f18"></i>
          </a>
          <a title="取消关注" v-show="investment.isFollow === true"  @click.stop.prevent="remove(investment)">
            <i class="fa fa-star text-warning  f18"></i>
          </a>
          <a title="已申请" v-show="investment.status !== 'APPLY'" @click.stop.prevent="upApply(investment)">
            <i class="fa fa-pencil-square-o text-warning  f18"></i>
          </a>
          <a title="已对接" v-show="investment.status !== 'ALREADY_BUTTED'" @click.stop.prevent="upButted(investment)">
            <i class="fa fa-american-sign-language-interpreting text-info  f18"></i>
          </a>
          <a title="达成融资意向" v-show="investment.status !== 'REACH_FINANCING_INTENTION'" @click.stop.prevent="upIntention(investment)">
            <i class="fa fa-sign-language text-primary f18"></i>
          </a>
          <a title="已融资" v-show="investment.status !== 'ALREADY_FINANCING'" @click.stop.prevent="upFinancing(investment)">
            <i class="fa fa-hand-peace-o  text-danger f18"></i>
          </a>
          <a v-if="investment.canEdit()" title="编辑" @click.stop.prevent="$router.push({path: 'edit', query: { id: investment.id }})">
            <i class="fa fa-pencil text-info f20"></i>
          </a>
          <a v-if="investment.canDel()" href="javascript:void(0)" title="删除"
             @click.stop.prevent="investment.confirmDel(refreshCallback)">
            <i class="fa fa-trash text-danger f20"></i>
          </a>
        </div>
        <div class="media-body">
          <div class="cell-title">
            <span>{{investment.companyName}}</span>
            <span class="label" :class="'label-'+investment.StatusMap[investment.status].style">
                  {{investment.StatusMap[investment.status].name}}</span>
          </div>
          <div class="cell-description list-text-restriction">
            <span class="mr10">主营产品: {{investment.mainProducts}}</span>
          </div>
          <div class="cell-content">

            <span class="mr10">创建者:<UserProfileLink :user="investment.creator"/></span>
            <span class="mr10">联系人: {{investment.contacts}}</span>
            <span class="mr10">联系人电话: {{investment.contactsPhone}}</span>
            <span class="mr10"><i class="fa fa-clock-o"></i> {{investment.createTime | humanTime}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import UserProfileLink from "../../widget/UserProfileLink";
  import Investment from "../../../../common/model/investment/Investment";
  import {Notification} from 'element-ui';

  export default {
    data () {
      return {
        user: this.$store.state.user
      }
    },
    components: {
      UserProfileLink
    },
    props: {
      investment: {
        type: Investment,
        required: true,
        validator: function (entity) {
          return true;
        }
      },
      refreshCallback: {
        type: Function,
        required: true,
        validator: function (entity) {
          return true;
        }
      }
    },
    methods: {
      //将状态改为已申请
      upApply(investment){
        investment.httpStatus(investment.Status.APPLY, function () {
          investment.status = investment.Status.APPLY;
        });
      },
      //将状态改为已对接
      upButted(investment){
        investment.httpStatus(investment.Status.ALREADY_BUTTED, function () {
          investment.status = investment.Status.ALREADY_BUTTED;
        });
      },
      //将状态改为达成融资意向
      upIntention(investment){
        investment.httpStatus(investment.Status.REACH_FINANCING_INTENTION, function () {
          investment.status = investment.Status.REACH_FINANCING_INTENTION;
        });
      },
      //将状态改为已融资
      upFinancing(investment){
        investment.httpStatus(investment.Status.ALREADY_FINANCING, function () {
          investment.status = investment.Status.ALREADY_FINANCING;
        });
      },
      //关注
      follow(investment){
        investment.httpFollow(this.user.id,function () {
          Notification.success({
            message:  '关注成功！'
          });
        });
      },
      //取消关注
      remove(investment){
        investment.httpAbolish(this.user.id,function () {
          Notification.success({
            message:  '取消关注成功！'
          });
        });
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">


</style>


