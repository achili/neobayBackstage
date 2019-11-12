<template>

  <div>
    <!--v-if="makerApartment.status === Status.PROCESSING || makerApartment.status === Status.FINISH"-->
    <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          操作面板
      </span>

      <div slot="body">
        <div class="form-group clearfix">
          <div class="row">
            <label class="col-md-2 control-label">当前状态</label>
            <div class="col-md-10">
              <span :class="'label label-'+makerPark.getStatusStyle()">{{makerPark.getStatusName()}}</span>
            </div>
          </div>
          <!--<div class="row mt10" v-if="makerPark.status === Status.FINISH">-->
            <!--<label class="col-md-2 control-label">项目负责人</label>-->
            <!--<div class="col-md-10 ">-->
              <!--<UserProfileLink class="mr5" v-for="projectManager in makerPark.projectManagers" :user="projectManager" :show-portrait="true" :key="projectManager.id"/>-->
            <!--</div>-->
          <!--</div>-->
        </div>


        <div class="form-group clearfix">
          <div class="row">
            <label class="col-md-2 control-label">更改状态</label>
            <div class="col-md-10">
              <NbBtnDropdown :name="reviewStatusMap['name']" size="sm" :color="reviewStatusMap['style']">
                <ul>
                  <li v-for="(option, index) in makerPark.finishStatusList()">
                    <a href="javascript:void(0)"
                       @click="reviewStatus = option.value">{{option.name}}</a>
                  </li>
                </ul>
              </NbBtnDropdown>
              <i class="fa fa-info-circle ml10"></i>
              订单审核通过后状态不可再更改。
            </div>
          </div>

        </div>

        <!--<div v-if="reviewStatus === Status.FINISH">-->
          <!--<div class="row">-->
            <!--<label class="col-md-2 control-label">项目负责人</label>-->
            <!--<div class="col-md-10">-->
              <!--<div>-->
                <!--<UserSelections :users="makerPark.projectManagers"/>-->
              <!--</div>-->
              <!--<div>-->
                <!--<i class="fa fa-info-circle ml10"></i>-->
                <!--订单审核通过后状态不可再更改。-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->


        <div v-if="reviewStatus === Status.REFUSE">

          <div class="form-group clearfix">
            <div class="row">
              <label class="col-md-2 control-label">审核通过理由</label>
              <div class="col-md-10">
                <textarea class="form-control" rows="3" v-model="reviewReason" :disabled="makerPark.status === 'REFUSE'"
                          placeholder="请填写审核通过理由……"></textarea>
              </div>
            </div>

          </div>

        </div>

        <div class="mt10" v-show="makerPark.errorMessage">
          <div class="alert alert-danger">
            {{makerPark.errorMessage}}
          </div>
        </div>

        <div class="text-right mt10" v-if="makerPark.status !== 'FINISH'">
          <SubmitButton :loading="makerPark.loading" :callback="submit"/>
        </div>

      </div>

    </NbSlidePanel>

  </div>

</template>

<script>
  import MakerSimpleApply from "../../../../../../common/model/maker/MakerSimpleApply";
  import NbSlidePanel from "../../../../../../common/widget/NbSlidePanel.vue";
  import NbBtnDropdown from "../../../../../../common/widget/NbBtnDropdown.vue";
  import SubmitButton from "../../../../widget/SubmitButton.vue";
  import {MessageBox} from 'element-ui'
  import UserSelections from '../../../../../../backyard/view/user/Selections.vue';
  import UserProfileLink from "../../../../../../backyard/view/widget/UserProfileLink.vue";

  export default{
    data(){
      return {
        reviewStatus: MakerSimpleApply.prototype.Status.PROCESSING,
        reviewReason: "",
        submitErrorMessage: null,
        Status: MakerSimpleApply.prototype.Status,
        StatusMap: MakerSimpleApply.prototype.StatusMap,
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user,
        partyBTime: new Date(),
        partyATime: new Date()
      }
    },
    computed: {
      reviewStatusMap(){
        return this.makerPark.getStatusItem(this.reviewStatus);
      }
    },

    props: {
      makerPark: {
        type: MakerSimpleApply,
        required: true,
        validator: function (entity) {
          return true;
        }
      },
      successCallback: {
        type: Function,
        required: false
      }

    },
    watch: {
      "makerPark.status"(newVal, oldVal){
        this.updateReviewStatus();
      }
    },
    components: {
      NbSlidePanel,
      NbBtnDropdown,
      SubmitButton,
      UserSelections,
      UserProfileLink
    },
    methods: {
      updateReviewStatus(){
        let makerParkStatus = this.Status.PROCESSING;
        if (this.makerPark) {
          makerParkStatus = this.makerPark.status;
        }
        this.reviewReason = this.makerPark.reason;

        if (makerParkStatus === this.Status.PROCESSING) {
          this.reviewStatus = this.Status.FINISH;
        } else if(makerParkStatus === this.Status.FINISH){
          this.reviewStatus = this.Status.REFUSE;
        }else {
          this.reviewStatus = makerParkStatus;
        }
      },
      submit(){
        let that = this;
        this.makerPark.errorMessage = null;
        if(this.reviewStatus === MakerSimpleApply.prototype.Status.REFUSE){
          if (!this.reviewReason) {
            this.makerPark.errorMessage = "审核通过理由必填！";
            return false;
          }
        }
        // if(this.reviewStatus === MakerSimpleApply.prototype.Status.FINISH){
        //   if (this.makerPark.projectManagers.length <= 0) {
        //     this.makerPark.errorMessage = "请至少选择一个项目经理！";
        //     return false;
        //   }
        // }
        this.makerPark.httpStatus(this.reviewStatus, this.reviewReason,this.makerPark.projectManagers, this.successCallback);
      }
    },
    mounted(){
      this.updateReviewStatus();
    }

  }


</script>
