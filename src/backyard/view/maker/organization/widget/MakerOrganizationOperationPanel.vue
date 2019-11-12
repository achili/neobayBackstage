<template>

  <div>
    <!--v-if="makerOrganization.status === Status.PROCESSING || makerOrganization.status === Status.FINISH"-->
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
              <span :class="'label label-'+makerOrganization.getStatusStyle()">{{makerOrganization.getStatusName()}}</span>
            </div>
          </div>

        </div>
        <div class="form-group clearfix">
          <div class="row">
            <label class="col-md-2 control-label">更改状态</label>
            <div class="col-md-10">
              <NbBtnDropdown :name="reviewStatusMap['name']" size="sm" :color="reviewStatusMap['style']">
                <ul>
                  <li v-for="(option, index) in makerOrganization.finishStatusList()">
                    <a href="javascript:void(0)"
                       @click="reviewStatus = option.value">{{option.name}}</a>
                  </li>
                </ul>
              </NbBtnDropdown>

              <div class="mt5">
                <span v-if="reviewStatus === Status.FINISH">
									<i class="fa fa-info-circle ml10"></i>
									服务机构审核通过后状态不可再更改。
								</span>
              </div>

            </div>
          </div>

        </div>

        <div v-if="reviewStatus === Status.FINISH">

          <div class="form-group clearfix">
            <div class="row">
              <label class="col-md-2 control-label">审核通过理由</label>
              <div class="col-md-10">
                <textarea class="form-control" rows="3" v-model="reviewReason" :disabled="makerOrganization.status === 'FINISH'"
                          placeholder="请填写审核通过理由……"></textarea>
              </div>
            </div>

          </div>

        </div>

        <div class="mt10" v-show="makerOrganization.errorMessage">
          <div class="alert alert-danger">
            {{makerOrganization.errorMessage}}
          </div>
        </div>

        <div class="text-right mt10" v-if="makerOrganization.status !== 'FINISH'">
          <SubmitButton :loading="makerOrganization.loading" :callback="submit"/>
        </div>

      </div>

    </NbSlidePanel>

  </div>

</template>

<script>
  import MakerOrganization from "../../../../../common/model/maker/MakerOrganization";
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
  import NbBtnDropdown from  "../../../../../common/widget/NbBtnDropdown.vue";
  import SubmitButton from "../../../widget/SubmitButton.vue";
  import {MessageBox} from 'element-ui'

  export default{
    data(){
      return {
        reviewStatus: MakerOrganization.prototype.Status.PROCESSING,
        reviewReason: null,
        submitErrorMessage: null,
        Status: MakerOrganization.prototype.Status,
        StatusMap: MakerOrganization.prototype.StatusMap,
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user,
        partyBTime: new Date(),
        partyATime: new Date()
      }
    },
    computed: {
      reviewStatusMap(){
        return this.makerOrganization.getStatusItem(this.reviewStatus);
      }
    },

    props: {
      makerOrganization: {
        type: MakerOrganization,
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
      "makerOrganization.status"(newVal, oldVal){
        this.updateReviewStatus();
      }
    },
    components: {
      NbSlidePanel,
      NbBtnDropdown,
      SubmitButton
    },
    methods: {
      updateReviewStatus(){
        let makerOrganizationStatus = this.Status.PROCESSING;
        if (this.makerOrganization) {
          makerOrganizationStatus = this.makerOrganization.status;
        }
        this.reviewReason = this.makerOrganization.reason;

        if (makerOrganizationStatus === this.Status.PROCESSING) {
          this.reviewStatus = this.Status.FINISH;
        } else {
          this.reviewStatus = makerOrganizationStatus;
        }
      },
      submit(){
        let that = this;
        this.makerOrganization.errorMessage = null;
        if (!this.reviewReason) {
          this.makerOrganization.errorMessage = "审核通过理由必填！";
          return false;
        }
        this.makerOrganization.httpStatus(this.reviewStatus, this.reviewReason, this.successCallback);
      }
    },
    mounted(){
      this.updateReviewStatus();
    }

  }


</script>
