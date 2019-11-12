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
              <div class="col-md-2 mt5">机构</div>
              <div class="col-md-10">
                <input type="text" disabled class="form-control-sport" v-model="makerSimpleApply.makerOrganization.name"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">项目</div>
              <div class="col-md-10">
                <ProjectPagerSelection :activeProject="makerSimpleApply.project" :initFilter="{'userId':user.id}"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">项目名称</div>
              <div class="col-md-10">
                <input type="text" class="form-control-sport" v-model="makerSimpleApply.projectName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">公司名称</div>
              <div class="col-md-10">
                <input type="text" class="form-control-sport"
                       placeholder="请填写公司名称或要工商注册的公司名称"
                       v-model="makerSimpleApply.companyName"/>
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
                <input type="text" class="form-control-sport" v-model="makerSimpleApply.leaderName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">联系人电话</div>
              <div class="col-md-10">
                <input type="text" class="form-control-sport" v-model="makerSimpleApply.leaderPhone"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">联系人邮箱</div>
              <div class="col-md-10">
                <input type="text" class="form-control-sport" v-model="makerSimpleApply.leaderEmail"/>
              </div>
            </div>
          </div>
        </div>

        <div class="mt40 mb50 text-center">
          <div class="alert alert-danger" v-show="makerSimpleApply.errorMessage">
            {{makerSimpleApply.errorMessage}}
          </div>

          <SubmitButton :callback="save" :title="'提交'" :loading="makerSimpleApply.loading"
                        submitIcon="" submitClass="sport-submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Notification} from 'element-ui'
  import MakerSimpleApply from "../../../../common/model/maker/MakerSimpleApply"
  import MakerOrganization from "../../../../common/model/maker/MakerOrganization"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SubmitButton from "../../widget/SubmitButton.vue";

  export default{
    data () {
      return {
        makerSimpleApply: new MakerSimpleApply(),
        makerOrganizationId: null,
        user: this.$store.state.user
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
      "makerSimpleApply.project.id"(newVal, oldVal){
        this.makerSimpleApply.projectName = this.makerSimpleApply.project.name;
        this.makerSimpleApply.companyName = this.makerSimpleApply.project.registeredCompanyName;
      }
    },
    methods: {
      save(){
        let that = this;
        this.makerSimpleApply.httpSave(function (response) {
          //判断它的父亲，也就是前台中的页中页是否存在，再判断是否存在这个函数，如果都存在则执行这个函数
          //执行这个函数前台才可以跳转进后台list页面
          if (parent) {
            if (parent.SubmitCallBack) {
              parent.SubmitCallBack();
            }
          }
          // parent.SubmitCallBack();
          Notification.success({
            message: that.makerSimpleApply.editMode ? '修改第三方服务申请成功！' : '创建第三方服务申请成功！'
          });
          that.$router.push("/by/maker/simple/apply/list");
        });
      },
      fetchDetail(){
        this.makerSimpleApply.httpDetail();
      }
    },
    mounted(){
      let that = this;
      this.makerSimpleApply.type = this.$store.state.route.query.type;
      this.makerSimpleApply.id = this.$store.state.route.query.id;
      this.makerSimpleApply.leaderName = this.user.nickname;
      this.makerSimpleApply.leaderPhone = this.user.phone;
      this.makerSimpleApply.leaderEmail = this.user.email;
      if (this.makerSimpleApply.id) {
        this.makerSimpleApply.editMode = true;
        this.fetchDetail();
      } else {
        if(this.$store.state.route.query.makerOrganizationId) {
          this.makerSimpleApply.makerOrganization.id = this.$store.state.route.query.makerOrganizationId;
          this.makerSimpleApply.makerOrganization.httpDetail(function () {

          });
        }
        if(!this.makerSimpleApply.makerOrganization.id) {
          console.error("makerOrganizationId 未指定，不能创建！")
        }
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
