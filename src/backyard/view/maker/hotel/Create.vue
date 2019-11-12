<template>
  <div class="animated fadeIn keeper-business-create">

    <div class="col-md-12" style="background-color: #FFFFFF;padding: 50px;">
      <div>
        <div>
          <div style="font-size: 24px;color: #ff8d1d;">
            基本信息
          </div>
          <div style="padding: 20px 80px;font-size: 18px;color: #333333;">
            <div class="row">
              <div class="col-md-2 mt5">项目 :</div>
              <div class="col-md-10">
                <ProjectPagerSelection :activeProject="makerHotel.project" :initFilter="{'userId':user.id}"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5">项目名称 :</div>
              <div class="col-md-4">
                <input type="text" class="form-control-sport" v-model="makerHotel.projectName"/>
              </div>
              <div class="col-md-2 mt5">公司名称 :</div>
              <div class="col-md-4">
                <input type="text" class="form-control-sport" v-model="makerHotel.companyName"/>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #ff8d1d;">
            联系人信息
          </div>
          <div style="padding: 20px 80px;font-size: 18px;color: #333333;">
            <div class="row">
              <div class="col-md-2 mt5">联系人姓名 :</div>
              <div class="col-md-4">
                <input type="text" class="form-control-sport" v-model="makerHotel.leaderName"/>
              </div>
              <div class="col-md-2 mt5">联系人电话 :</div>
              <div class="col-md-4">
                <input type="text" class="form-control-sport" v-model="makerHotel.leaderPhone"/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-2 mt5">联系人邮箱 :</div>
              <div class="col-md-10">
                <input type="text" class="form-control-sport" v-model="makerHotel.leaderEmail"/>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #ff8d1d;">
            入住信息
          </div>
          <div style="padding: 20px 80px;font-size: 18px;color: #333333;">
            <div class="row">
              <div class="col-md-2 mt5">房型 :</div>
              <div class="col-md-4">
                <input type="text" class="form-control-sport" v-model="makerHotel.hotelStyle"/>
              </div>
              <div class="col-md-2 mt5">入住人数 :</div>
              <div class="col-md-4">
                <input type="text" class="form-control-sport" v-model="makerHotel.numberPerson"/>
              </div>
            </div>

            <div class="row mt20">
              <div class="col-md-2 mt5">所需房间数量 :</div>
              <div class="col-md-4">
                <input type="text" class="form-control-sport" v-model="makerHotel.numberHotel"/>
              </div>
              <div class="col-md-2 mt5">入住日期 :</div>
              <div class="col-md-4">
                <NbDateRange type="datetimerange" :startTime="makerHotel.startTime"
                             v-on:startTimeChange="makerHotel.startTime = arguments[0]"
                             :endTime="makerHotel.endTime"
                             v-on:endTimeChange="makerHotel.endTime = arguments[0]"/>
              </div>
            </div>

          </div>
        </div>

        <div>
          <div style="font-size: 24px;color: #ff8d1d;">
            其他信息
          </div>
          <div style="padding: 20px 80px;font-size: 18px;color: #333333;">
            <div class="row">
              <div class="col-md-6 mt5"><span style="color: #1e88e5;padding: 10px;">*</span>申请单位是否属于零号湾在孵企业</div>
              <div class="col-md-6">
                <NbCheckbox :val="true" v-model="makerHotel.isIncubatingEnterprise" name="isIncubatingEnterprise"/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-6 mt5"><span style="color: #1e88e5;padding: 10px;">*</span>申请人是否有出差任务</div>
              <div class="col-md-6">
                <NbCheckbox :val="true" v-model="makerHotel.isBusinessTravel" name="isBusinessTravel"/>
              </div>
            </div>

            <div class="row mt50">
              <div class="col-md-1" align="right">
                <NbCheckbox :val="true" v-model="makerHotel.isAgree" name="isAgree"/>
              </div>
              <div class="col-md-11 mt5"><span style="color: #1e88e5;padding: 10px;">*</span>本人同意以上人才公寓管理条例，并将遵守人才公寓的规定，如有违规的行为，本人愿意承担相关责任。</div>
            </div>
          </div>
        </div>

        <div class="mt40 mb50" align="center">
          <div class="alert alert-danger" v-show="makerHotel.errorMessage">
            {{makerHotel.errorMessage}}
          </div>

          <SubmitButton :callback="save" :title="sportTitle" :loading="makerHotel.loading"
                        submitIcon="" submitClass="sport-submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Notification} from 'element-ui'
  import MakerHotel from "../../../../common/model/maker/MakerHotel"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SubmitButton from "../../widget/SubmitButton.vue";
  import NbDateRange from  "../../../../common/widget/NbDateRange.vue"
  import NbCheckbox from "../../../../common/widget/NbCheckbox"

  export default{
    data () {
      return {
        dateValue: null,
        makerHotel: new MakerHotel(),
        user: this.$store.state.user,
        sportTitle: "确认并提交"
      }
    },
    components: {
      NbSlidePanel,
      ProjectPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      SubmitButton,
      NbDateRange,
      NbCheckbox
    },
    computed: {},
    watch: {
      "makerHotel.project.id"(newVal, oldVal){
        this.makerHotel.projectName = this.makerHotel.project.name;
        this.makerHotel.companyName = this.makerHotel.project.registeredCompanyName;
      }
    },
    methods: {
      save(){
        let that = this;
        if (that.makerHotel.isAgree === true) {
          this.makerHotel.httpSave(function (response) {
            //判断它的父亲，也就是前台中的页中页是否存在，再判断是否存在这个函数，如果都存在则执行这个函数
            //执行这个函数前台才可以跳转进后台list页面
            if (parent) {
              if (parent.SubmitCallBack) {
                parent.SubmitCallBack();
              }
            }
            // parent.SubmitCallBack();
            Notification.success({
              message: that.makerHotel.editMode ? '修改服务申请成功！' : '创建服务申请成功！'
            });
            that.$router.push("/by/maker/hotel/list");
          });
        }
      },
      fetchDetail(){
        this.makerHotel.httpDetail();
      },
      //保存功能
      saveLocalData () {
        this.makerHotel.saveToLocalStorage();
        Notification.success({
          message: '保存成功！'
        });
      }
    },
    mounted(){
      let that = this;
      this.makerHotel.id = this.$store.state.route.query.id;
      this.makerHotel.leaderName = this.user.nickname;
      this.makerHotel.leaderPhone = this.user.phone;
      this.makerHotel.leaderEmail = this.user.email;
      if (this.makerHotel.id) {
        this.makerHotel.editMode = true;
        this.fetchDetail();
      } else {

      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .form-control-sport {
    width: 300px;
    border: none;
    outline: none;
    border-bottom: 1px solid #999999;
    height: 35px;
    padding: 0 10px;
  }
  .sport-submit {
    background: linear-gradient(135deg, #ff8a00 0%, #fda100 100%);
    border-radius: 6px;
    padding: 10px 30px;
    font-size: 16px;
    border: #f8ac59;
    color: #FFFFFF;
    outline: none;
  }
</style>
