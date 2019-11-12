<template>
  <div class="row maker-market-detail-cell">
    <div class="col-xs-12">

      <LoadingFrame :loading="makerApartment.detailLoading">
        <NbSlidePanel>
          <span slot="heading" class="text-success f16">
            <i class="fa fa-dot-circle-o"></i>
            基本信息
          </span>
          <div slot="body">
            <div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;">
              <div class="col-md-12" style="padding: 10px 30px;border: #ff8d1d solid 2px;">

                 <div>
                     <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                     <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">申请人信息</span>
                 </div>
                 <div class="f14" style="padding: 20px 100px;">
                   <div class="row">
                     <div class="col-md-3">
                       <span>服务机构:</span>
                     </div>
                     {{makerApartment.makerOrganization.name}}
                   </div>
                   <div class="row mt10">
                     <div class="col-md-3">
                        <span>申请人:</span>
                     </div>
                        {{makerApartment.applicantName}}
                   </div>
                   <div class="row mt10">
                     <div class="col-md-3">
                       <span>园区地点：</span>
                     </div>
                     {{makerApartment.spaceRegional.name}}
                   </div>
                   <div class="row mt10">
                     <div class="col-md-3">
                       <span>学历：</span>
                     </div>
                     {{makerApartment.education}}
                   </div>
                   <div class="row mt10">
                     <div class="col-md-3">
                       <span>目前住房情况：</span>
                     </div>
                     {{makerApartment.circumstances}}
                   </div>
                   <div class="row mt10">
                     <div class="col-md-3">
                       <span>申请房源：</span>
                     </div>
                     {{makerApartment.houseApply}}
                   </div>
                   <div class="row mt10">
                     <div class="col-md-3">
                       <span>联系地址：</span>
                     </div>
                     {{makerApartment.address}}
                   </div>
                   <div class="row mt10">
                     <div class="col-md-3">
                       <span>联系电话：</span>
                     </div>
                     {{makerApartment.phone}}
                   </div>
                  </div>
                 </div>

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">企业信息</span>
                  </div>
                  <div style="padding: 20px 100px;font-size: 14px;">
                    <div class="row">
                      <div class="col-md-3">
                        <span>企业名称：</span>
                      </div>
                      {{makerApartment.companyName}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>企业主导产业：</span>
                      </div>
                      {{makerApartment.mainProducts}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>企业经营地址：</span>
                      </div>
                      {{makerApartment.officeAddress}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>企业注册地址：</span>
                      </div>
                      {{makerApartment.registeredAddress}}
                    </div>
                    <!--
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>企业是否为高科技企业：</span>
                      </div>
                      {{makerApartment.isCompanyHighTech}}
                    </div>
                    -->
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>所在部门或岗位：</span>
                      </div>
                      {{makerApartment.department}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>职务：</span>
                      </div>
                      {{makerApartment.post}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>为企业服务年限：</span>
                      </div>
                      {{makerApartment.year}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>单位联系人：</span>
                      </div>
                      {{makerApartment.contacts}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-3">
                        <span>单位联系人电话：</span>
                      </div>
                      {{makerApartment.contactsPhone}}
                    </div>
                  </div>
                </div>

                <div>
                  <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #ffdddd;padding-bottom: 8px;">
                    <span style="border-bottom: #ff8d1d solid 2px;padding-bottom: 10px;">注意事项</span>
                  </div>
                  <div style="font-size: 14px;padding: 20px 100px;">
                    <div class="row">
                      <div class="col-md-5">
                        <span><span style="color: #1c84c6;padding: 2px">*</span>申请单位是否属于高科技产业企业：</span>
                      </div>
                      {{makerApartment.isHighTech ? '是' : '否'}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span><span style="color: #1c84c6;padding: 2px">*</span>申请人与企业签订一年以上工作合同并且在上海无住房：</span>
                      </div>
                      {{makerApartment.isNoHouse ? '是' : '否'}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span><span style="color: #1c84c6;padding: 2px">*</span>申请人具备大学本科以上学历：</span>
                      </div>
                      {{makerApartment.isBachelorDegree ? '是' : '否'}}
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span style="color: #1c84c6">所属附件如下：</span>
                      </div>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span>1. 申请人身份证</span>
                      </div>
                      <NbTank :tank="makerApartment.identityCard" :edit="false"/>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span>2. 申请人学历证书</span>
                      </div>
                      <NbTank :tank="makerApartment.diplomaCertificate" :edit="false"/>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span>3. 申请人与所在单位签订的聘用合同或劳动合同</span>
                      </div>
                      <NbTank :tank="makerApartment.laborContract" :edit="false"/>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span>4. 申请人本单位六个月以上的社保缴纳记录</span>
                      </div>
                      <NbTank :tank="makerApartment.billOfPayment" :edit="false"/>
                    </div>
                    <div class="row mt10">
                      <div class="col-md-5">
                        <span>5. 企业注册地与经营地一致的证明材料及高新企业认定材料</span>
                      </div>
                      <NbTanks :tanks="makerApartment.cognizanceMaterial" :edit="false"/>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </NbSlidePanel>
      </LoadingFrame>
    </div>
  </div>
</template>

<script>

  import LoadingFrame from "../../../widget/LoadingFrame";
  import MakerApartment from "../../../../../common/model/maker/MakerApartment";
  import NbSlidePanel from '../../../../../common/widget/NbSlidePanel'
  import NbTanks from "../../../../../common/widget/NbTanks"
  import NbTank from "../../../../../common/widget/NbTank"


  export default {
    data(){
      return {
      }
    },
    components:{
      LoadingFrame,
      NbSlidePanel,
      NbTanks,
      NbTank
    },
    computed:{},
    props:{
      makerApartment:{
        type: MakerApartment,
        required: true
      }
    },
    methods:{},
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
