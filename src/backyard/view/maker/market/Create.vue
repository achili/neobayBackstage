<template>
  <div class="animated fadeIn maker-market-create">

    <div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;overflow-y: scroll;height: 600px;">
      <div style="padding: 10px 30px;border: 2px solid #ff8d1d;">
        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">基本信息</span>
          </div>
          <div style="padding: 20px 120px;font-size: 18px;color: #666666;">
            <div class="row">
              <div class="col-md-2 mt5">项目</div>
              <div class="col-md-10">
                <ProjectPagerSelection :activeProject="makerMarket.project" :initFilter="{'userId':user.id}"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">项目名称</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market" v-model="makerMarket.projectName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">公司名称</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market"
                       placeholder="请填写公司名称或要工商注册的公司名称"
                       v-model="makerMarket.companyName"/>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">联系人信息</span>
          </div>
          <div style="padding: 20px 120px;font-size: 18px;color: #666666;">
            <div class="row">
              <div class="col-md-2 mt5">联系人姓名</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market" v-model="makerMarket.leaderName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">联系人电话</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market" v-model="makerMarket.leaderPhone"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">联系人邮箱</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market" v-model="makerMarket.leaderEmail"/>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">参展物品</span>
          </div>
          <div style="padding: 20px 120px;font-size: 18px;color: #666666;">
            <div class="row">
              <div class="col-md-2 mt5">活动时间</div>
              <div class="col-md-10">
                <NbDateRange type="datetimerange" :startTime="makerMarket.startTime"
                             v-on:startTimeChange="makerMarket.startTime = arguments[0]"
                             :endTime="makerMarket.endTime"
                             v-on:endTimeChange="makerMarket.endTime = arguments[0]"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">活动地点</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market" v-model="makerMarket.activityAddress"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">参展物品名称</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market" v-model="makerMarket.title"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">参展物品介绍</div>
              <div class="col-md-10">
                <textarea class="form-control" rows="6" v-model="makerMarket.description"
                          placeholder="此处填写介绍……"></textarea>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">上传参展物品照片</div>
              <div class="col-md-10">
                <NbTank :tank="makerMarket.poster" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">品牌推广</span>
          </div>
          <div style="padding: 20px 120px;font-size: 18px;color: #666666;">
            <div class="row">
              <div class="col-md-2 mt5">品牌名</div>
              <div class="col-md-10">
                <input type="text" class="form-control-market" v-model="makerMarket.brandName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">品牌详情</div>
              <div class="col-md-10">
                <textarea class="form-control" rows="6" v-model="makerMarket.brandDetails"
                          placeholder="此处填写介绍……"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="mt40 mb50">
          <div class="alert alert-danger" v-show="makerMarket.errorMessage">
            {{makerMarket.errorMessage}}
          </div>

          <button class="sport-submit mr100" @click="saveLocalData" style="margin-left: 280px;">
            保存
          </button>

          <SubmitButton :callback="save" :title="sportTitle" :loading="makerMarket.loading"
                        submitIcon="" submitClass="sport-submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Notification} from 'element-ui'
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SubmitButton from "../../widget/SubmitButton.vue";
  import MakerMarket from "../../../../common/model/maker/MakerMarket";
  import Tank from "../../../../common/model/tank/Tank";
  import NbTank from "../../../../common/widget/NbTank"
  import NbDateRange from  "../../../../common/widget/NbDateRange.vue"



  export default{
    data () {
      return {
        makerMarket: new MakerMarket(),
        user: this.$store.state.user,
        sportTitle: "提交"
      }
    },
    components: {
      NbSlidePanel,
      ProjectPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      SubmitButton,
      NbDateRange,
      NbTank
    },
    computed: {},
    watch: {
      "makerMarket.project.id"(newVal, oldVal){
        this.makerMarket.projectName = this.makerMarket.project.name;
        this.makerMarket.companyName = this.makerMarket.project.registeredCompanyName;
        this.makerMarket.activityAddress = this.makerMarket.project.registeredCompanyAddress;
      }
    },
    methods: {
      save(){
        let that = this;
        this.makerMarket.httpSave(function (response) {
          if (parent) {
            if (parent.SubmitCallBack) {
              parent.SubmitCallBack();
            }
          }
          Notification.success({
            message: that.makerMarket.editMode ? '修改服务申请成功！' : '创建服务申请成功！'
          });
          that.$router.push("/by/maker/market/list");
        });
      },
      fetchDetail(){
        this.makerMarket.httpDetail();
      },
      //保存功能
      saveLocalData () {
        this.makerMarket.saveToLocalStorage();
        Notification.success({
          message: '保存成功！'
        });
      }
    },
    mounted(){
      let that = this;
      this.makerMarket.id = this.$store.state.route.query.id;
      this.makerMarket.leaderName = this.user.nickname;
      this.makerMarket.leaderPhone = this.user.phone;
      this.makerMarket.leaderEmail = this.user.email;
      if (this.makerMarket.id) {
        this.makerMarket.editMode = true;
        this.fetchDetail();
      }else{
        this.makerMarket.renderFromLocalStorage();

      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">

  .maker-market-create {

    .form-control-market {
      width: 350px;
      border: 1px solid #999999;
      height: 36px;
      padding: 10px;
    }
    .sport-submit {
      background: linear-gradient(135deg, #ff8a00 0%, #fda100 100%);
      border-radius: 6px;
      padding: 10px 30px;
      font-size: 16px;
      border: #f8ac59;
      color: #FFFFFF;
    }
    .form-control {
      width: 350px;
    }
  }
</style>
