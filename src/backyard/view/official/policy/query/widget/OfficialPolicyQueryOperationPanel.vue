<template>
<div>
    <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
        操作面板
      </span>

      <div slot="body">

        <div class="form-group clearfix">
          <label class="col-md-2 control-label">当前状态</label>
          <div class="col-md-10">
            <span :class="'label label-'+officialPolicyQuery.getStatusStyle()">{{officialPolicyQuery.getStatusName()}}</span>
          </div>
        </div>

        <div class="form-group clearfix">
          <label class="col-md-2 control-label">修改状态</label>
          <div class="col-md-10">
            <NbBtnDropdown :name="reviewStatusItem['name']" size="sm"
                           :color="reviewStatusItem['style']">
              <ul>
                <li v-for="(option, index) in StatusList">
                  <a href="javascript:void(0)" @click="reviewStatus = option.value">{{option.name}}</a>
                </li>
              </ul>
            </NbBtnDropdown>
          </div>
        </div>

        <div v-show="reviewStatus === officialPolicyQuery.Status.PROCESSED">
            <div class="row mt10">
            <div class="col-md-10">
              <textarea class="form-control" rows="3" v-model="officialPolicyQuery.remark"
                      placeholder="请填写备注信息……"></textarea>
            </div>
          </div>
        </div>

        <div class="form-group mt10" v-show="submitErrorMessage">
          <div class="alert alert-danger">
            {{submitErrorMessage}}
          </div>
        </div>

        <div class="form-group text-right mt10">
          <CreateSaveButton :entity="officialPolicyQuery" :callback="submit"/>
        </div>

      </div>


    </NbSlidePanel>
</div>
</template>

<script>

  import NbSlidePanel from '../../../../../../common/widget/NbSlidePanel'
  import NbBtnDropdown from  "../../../../../../common/widget/NbBtnDropdown.vue";
  import CreateSaveButton from "../../../../widget/CreateSaveButton.vue"
  import {Notification as NotificationBox} from 'element-ui';
  import OfficialPolicyQuery from "../../../../../../common/model/official/OfficialPolicyQuery";

  export default {
    data(){
      return {
        submitErrorMessage: null,
        Status: OfficialPolicyQuery.prototype.Status,
        StatusMap: OfficialPolicyQuery.prototype.StatusMap,
        StatusList: OfficialPolicyQuery.prototype.StatusList,
        reviewStatus: OfficialPolicyQuery.prototype.Status.UNTREATED
      }
    },
    computed :{
      reviewStatusItem(){
        return this.officialPolicyQuery.getStatusItem(this.reviewStatus);
      }
    },
    components:{
      NbSlidePanel,
      NbBtnDropdown,
      CreateSaveButton
    },
    props:{
      officialPolicyQuery:{
        type: OfficialPolicyQuery,
        required: true
      }
    },
    watch:{
      "officialPolicyQuery.status"(newVal,oldVal){
        this.updateReviewStatus();
      }
    },
    methods:{
      //自动装填审核状态。
        updateReviewStatus(){
          let officialPolicyQueryStatus = this.Status.UNTREATED;
          if (this.officialPolicyQuery) {
            officialPolicyQueryStatus = this.officialPolicyQuery.status;
          }
      },
      submit(){
        let that = this;
        let form = {
          "id": this.officialPolicyQuery.id,
          "status": this.reviewStatus,
          "remark": this.officialPolicyQuery.remark
        };
        if(!this.officialPolicyQuery.remark) {
          that.submitErrorMessage = "请填写备注！";
          return;
        }
        this.submitErrorMessage = null;
        this.officialPolicyQuery.httpStatus(form,function (response) {
          NotificationBox.success({
            message: '修改状态成功！'
          })
        });

      }
    },
    mounted(){
      this.updateReviewStatus();

    }
    }
</script>

<style scoped>

</style>
