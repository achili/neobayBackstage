<template>
  <div class="animated fadeIn keeper-business-create">

        <div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;">
          <div style="padding: 10px 30px;border: 2px solid #ff8d1d;">
            <div>
              <div style="font-size: 24px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
                <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">基本信息</span>
              </div>
              <div style="padding: 20px 120px;font-size: 18px;color: #666666;">
                <div class="row">
                  <div class="col-md-2 mt5">项目</div>
                  <div class="col-md-10">
                    <ProjectPagerSelection :activeProject="makerSport.project" :initFilter="{'userId':user.id}"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5">项目名称</div>
                  <div class="col-md-10">
                    <input type="text" class="form-control-sport" v-model="makerSport.projectName"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5">公司名称</div>
                  <div class="col-md-10">
                    <input type="text" class="form-control-sport"
                           placeholder="请填写公司名称或要工商注册的公司名称"
                           v-model="makerSport.companyName"/>
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
                    <input type="text" class="form-control-sport" v-model="makerSport.leaderName"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5">联系人电话</div>
                  <div class="col-md-10">
                    <input type="text" class="form-control-sport" v-model="makerSport.leaderPhone"/>
                  </div>
                </div>
                <div class="row mt10">
                  <div class="col-md-2 mt5">联系人邮箱</div>
                  <div class="col-md-10">
                    <input type="text" class="form-control-sport" v-model="makerSport.leaderEmail"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt40 mb50">
              <div class="alert alert-danger" v-show="makerSport.errorMessage">
                {{makerSport.errorMessage}}
              </div>

              <button class="sport-submit mr100" @click="saveLocalData" style="margin-left: 280px;">
                保存
              </button>

              <SubmitButton :callback="save" :title="sportTitle" :loading="makerSport.loading"
                            submitIcon="" submitClass="sport-submit"/>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
  import {MessageBox, Notification} from 'element-ui'
  import MakerSport from "../../../../common/model/maker/MakerSport"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SubmitButton from "../../widget/SubmitButton.vue";

  export default{
    data () {
      return {
        makerSport: new MakerSport(),
        user: this.$store.state.user,
        sportTitle: "提交"
      }
    },
    components: {
      NbSlidePanel,
      ProjectPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      SubmitButton
    },
    computed: {},
    watch: {
      "makerSport.project.id"(newVal, oldVal){
        this.makerSport.projectName = this.makerSport.project.name;
        this.makerSport.companyName = this.makerSport.project.registeredCompanyName;
      }
    },
    methods: {
      save(){
        let that = this;
        this.makerSport.httpSave(function (response) {
          if (parent) {
            if (parent.SubmitCallBack) {
              parent.SubmitCallBack();
            }
          }
          Notification.success({
            message: that.makerSport.editMode ? '修改服务申请成功！' : '创建服务申请成功！'
          });
          that.$router.push("/by/maker/sport/list");
        });
      },
      fetchDetail(){
        this.makerSport.httpDetail();
      },
      //保存功能
      saveLocalData () {
        this.makerSport.saveToLocalStorage();
        Notification.success({
          message: '保存成功！'
        });
      }
    },
    mounted(){
      let that = this;
      this.makerSport.id = this.$store.state.route.query.id;
      this.makerSport.leaderName = this.user.nickname;
      this.makerSport.leaderPhone = this.user.phone;
      this.makerSport.leaderEmail = this.user.email;
      if (this.makerSport.id) {
        this.makerSport.editMode = true;
        this.fetchDetail();
      } else {

      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .form-control-sport {
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
</style>
