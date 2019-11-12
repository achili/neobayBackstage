<template>
  <div class="animated fadeIn maker-apartment-create">

    <div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;overflow-y: scroll;height: 600px;">
      <div style="padding: 10px 30px;border: 2px solid #ff8d1d;">
        <div>
          <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">申请人</span>
          </div>
          <div style="padding: 20px 50px;font-size: 16px;color: #666666;">
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">申请人</div>
              <div class="col-md-10">
                <input type="text" class="form-control-apartment" v-model="makerApartment.applicantName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">学历</div>
              <div class="col-md-3">
                <select class="form-control-apartment" v-model="makerApartment.education">
                  <option>博士</option>
                  <option>硕士</option>
                  <option>本科</option>
                  <option>大专</option>
                  <option>中专</option>
                  <option>其他</option>
                </select>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">目前住房情况</div>
              <div class="col-md-3">
                <input type="text" class="form-control-apartment" v-model="makerApartment.circumstances"/>
              </div>
              <div class="col-md-2 mt5" align="right">申请房源</div>
              <div class="col-md-5">
                <select class="form-control-apartment" v-model="makerApartment.houseApply">
                  <option>小间（约20平）</option>
                  <option>中间（约30平）</option>
                  <option>大间（约40平）</option>
                </select>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">联系地址</div>
              <div class="col-md-3">
                <input type="text" class="form-control-apartment" v-model="makerApartment.address"/>
              </div>
              <div class="col-md-2 mt5" align="right">联系电话</div>
              <div class="col-md-5">
                <input type="text" class="form-control-apartment" v-model="makerApartment.phone"/>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">企业信息</span>
          </div>
          <div style="padding: 20px 50px;font-size: 16px;color: #666666;">
            <div class="row">
              <div class="col-md-2 mt5" align="right">所在企业</div>
              <div class="col-md-10">
                <CompanyPagerSelection :activeCompany="makerApartment.company"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">企业主导产业</div>
              <div class="col-md-5">
                <input type="text" class="form-control-apartments" v-model="makerApartment.mainProducts"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">企业经营地址</div>
              <div class="col-md-10">
                <input type="text" class="form-control-apartments"  v-model="makerApartment.officeAddress"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">企业注册地址</div>
              <div class="col-md-10">
                <input type="text" class="form-control-apartments"  v-model="makerApartment.registeredAddress"/>
              </div>
            </div>
            <!--
            <div class="row mt10">
              <div class="col-md-3 mt5" align="right">企业是否为高科技产业企业：</div>
              <div class="col-md-5">
                <div class="col-xs-2">
                  <NbRadio v-model="makerApartment.isCompanyHighTech" val="是" name="isCompanyHighTech"/>
                  <label>是</label>
                </div>
                <div class="col-xs-2">
                  <NbRadio v-model="makerApartment.isCompanyHighTech" val="否" name="isCompanyHighTech"/>
                  <label>否</label>
                </div>
              </div>
            </div>
            -->
            <div class="row mt50"></div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">所在部门或岗位</div>
              <div class="col-md-3">
                <input type="text" class="form-control-apartment" v-model="makerApartment.department"/>
              </div>
              <div class="col-md-2 mt5" align="right">职务</div>
              <div class="col-md-5">
                <input type="text" class="form-control-apartment" v-model="makerApartment.post"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">为企业服务年限</div>
              <div class="col-md-3">
                <input type="number" class="form-control-apartment" v-model="makerApartment.year">
              </div>
              <div class="col-md-2 mt5" align="right">单位联系人</div>
              <div class="col-md-5">
                <input type="text" class="form-control-apartment" v-model="makerApartment.contacts"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">单位联系电话</div>
              <div class="col-md-3">
                <input type="text" class="form-control-apartment" v-model="makerApartment.contactsPhone"/>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">注意事项</span>
          </div>
          <div style="padding: 20px 120px;font-size: 16px;color: #666666;">
            <div class="row">
              <div class="col-md-8 mt5"><span style="color: #1e88e5;padding: 10px;">*</span>申请单位是否属于高科技产业企业</div>
              <div class="col-md-4">
                <NbCheckbox :val="true" v-model="makerApartment.isHighTech" name="isHighTech"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5"><span style="color: #1e88e5;padding: 10px;">*</span>申请人与企业签订一年以上工作合同并且在上海无住房</div>
              <div class="col-md-4">
                <NbCheckbox :val="true" v-model="makerApartment.isNoHouse" name="isNoHouse"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5"><span style="color: #1e88e5;padding: 10px;">*</span>申请人具备大学本科以上学历</div>
              <div class="col-md-4">
                <NbCheckbox :val="true" v-model="makerApartment.isBachelorDegree" name="isBachelorDegree"/>
              </div>
            </div>
            <div class="row mt30"></div>
            <div class="row mt10">
              <div class="col-md-10 mt5"><span style="color: #1e88e5;padding: 10px;">所属上传附件如下：</span></div>
              <div class="col-md-2">

              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5"><span style="padding: 5px;"></span>1. 申请人身份证</div>
              <div class="col-md-4">
                <NbTank  :tank="makerApartment.identityCard"  />
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5"><span style="padding: 5px;"></span>2. 申请人学历证书</div>
              <div class="col-md-4">
                <NbTank  :tank="makerApartment.diplomaCertificate" />
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5"><span style="padding: 5px;"></span>3. 申请人与所在单位签订的聘用合同或劳动合同</div>
              <div class="col-md-4">
                <NbTank  :tank="makerApartment.laborContract"  />
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5"><span style="padding: 5px;"></span>4. 申请人本单位六个月以上的社保缴纳记录</div>
              <div class="col-md-4">
                <NbTank  :tank="makerApartment.billOfPayment"  />
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5"><span style="padding: 5px;"></span>5. 企业注册地与经营地一致的证明材料及高新企业认定材料</div>
              <div class="col-md-4">
                <NbTanks :tanks="makerApartment.cognizanceMaterial" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt40 mb50 text-center">
          <div class="alert alert-danger" v-show="makerApartment.errorMessage">
            {{makerApartment.errorMessage}}
          </div>
          <SubmitButton :callback="save" :title="sportTitle" :loading="makerApartment.loading"
                          submitIcon="" submitClass="sport-submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Notification} from 'element-ui'
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import CompanyPagerSelection from "../../company/Selection.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SubmitButton from "../../widget/SubmitButton.vue";
  import NbTanks from "../../../../common/widget/NbTanks"
  import NbRadio from "../../../../common/widget/NbRadio"
  import NbTank from "../../../../common/widget/NbTank"
  import Tank from "../../../../common/model/tank/Tank";
  import MakerApartment from "../../../../common/model/maker/MakerApartment";
  import NbCheckbox from "../../../../common/widget/NbCheckbox"


  export default{
    data () {
      return {
        makerApartment: new MakerApartment(),
        user: this.$store.state.user,
        sportTitle: "提交"
      }
    },
    components: {
      NbSlidePanel,
      CompanyPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      SubmitButton,
      NbTanks,
      NbTank,
      NbRadio,
      NbCheckbox
    },
    computed: {},
    watch: {
      "makerApartment.company.id"(newVal, oldVal){
        this.makerApartment.companyName = this.makerApartment.company.name;
        this.makerApartment.mainProducts = this.makerApartment.company.mainProducts;
        this.makerApartment.officeAddress = this.makerApartment.company.officeAddress;
        this.makerApartment.registeredAddress = this.makerApartment.company.registeredAddress;
      }
    },
    methods: {
      save(){
        let that = this;
        this.makerApartment.httpSave(function (response) {
          if (parent) {
            if (parent.SubmitCallBack) {
              parent.SubmitCallBack();
            }
          }
          Notification.success({
            message: that.makerApartment.editMode ? '修改人才公寓申请成功！' : '创建人才公寓申请成功！'
          });
          that.$router.push("/by/maker/apartment/list");
        });
      },
      fetchDetail(){
        this.makerApartment.httpDetail();
      }
    },
    mounted(){
      let that = this;
      this.makerApartment.id = this.$store.state.route.query.id;
      this.makerApartment.applicantName = this.user.nickname;
      this.makerApartment.phone = this.user.phone;
      if (this.makerApartment.id) {
        this.makerApartment.editMode = true;
        this.fetchDetail();
      }else {
        let houseApply = this.$store.state.route.query.name;
        this.makerApartment.houseApply = houseApply;
        if(this.$store.state.route.query.makerOrganizationId) {
          this.makerApartment.makerOrganization.id = this.$store.state.route.query.makerOrganizationId;
          this.makerApartment.makerOrganization.httpDetail(function () {

          });
        }
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .maker-apartment-create {
    .form-control-apartment {
      width: 200px;
      border: 1px solid #a7b1c2;
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
    }
    .form-control-apartments {
      width: 360px;
      border: 1px solid #a7b1c2;
      height: 35px;
      padding: 0 10px;
    }

  }
</style>
