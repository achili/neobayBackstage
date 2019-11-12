<template>
  <NbSlidePanel  type="info">
    <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          发票领取信息
    </span>

    <div class="row mt10">
      <label class="col-md-3 control-label mt5">选择发票联系人类型:</label>
      <div class="col-md-9">
        <el-select v-model="invoiceContacts"
                   placeholder="请选择联系人"
                   @change="contactsTypeChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="row mt10">
      <label class="col-md-3 control-label mt5">负责人:</label>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="invoiceNameList" v-bind:readonly ="inputReadonly" >
      </div>
    </div>

    <div class="row mt10">
      <label class="col-md-3 control-label mt5">负责人联系方式:</label>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="invoicePhoneList" v-bind:readonly ="inputReadonly">
      </div>
    </div>

    <div class="row mt10">
      <label class="col-md-3 control-label mt5">负责人邮箱:</label>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="invoiceEmailList" v-bind:readonly ="inputReadonly">
      </div>
    </div>

    <div class="text-right mt10">
      <SubmitButton :loading="protocolSpace.loading" :title="SubmitButtonTitle" :callback="submit"/>
    </div>
  </NbSlidePanel>
</template>

<script>
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
  import ProtocolSpace from '../../../../../common/model/protocol/space/ProtocolSpace';
  import SubmitButton from "../../../widget/SubmitButton.vue";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
    export default {
        name: "ProtocolSpaceInvoiceCollection",
        data(){
          return{
            options:[
              {
              value: 'PROJECT',
              label: '项目负责人'
              },
              {
                value: 'FINANCE',
                label: '财务联系人'
              },
              {
                value: 'PROJECTANDFINANCE',
                label: '项目负责人及财务联系人'
              },{
                value: 'CUSTOM',
                label: '自定义'
              }
            ],
            inputReadonly:true,
            SubmitButtonTitle:"保存",
            invoiceContacts:"CUSTOM",
            invoiceNameList:'',
            invoicePhoneList:'',
            invoiceEmailList:""

          }
        },
        props: {
          protocolSpace: {
            type: ProtocolSpace,
            required: true
          }
        },
        watch: {},
        components:{NbSlidePanel,SubmitButton},
        methods:{
          submit(){
            let that = this;
            if(that.invoiceContacts){
              that.protocolSpace.httpSaveInvoice(that.invoiceContacts,that.invoiceNameList,that.invoicePhoneList,that.invoiceEmailList,function (res) {
                NotificationBox.success({
                  message: '保存成功！'
                });
              });
            }
          },
          contactsTypeChange(newVal){
            let that = this;
            this.inputReadonly = true;
            let invoiceNames,invoicePhones,invoiceEmails;
            if(newVal === 'PROJECT'){
              invoiceNames = that.protocolSpace.project.leader;
              invoicePhones = that.protocolSpace.project.leaderPhone;
              invoiceEmails = that.protocolSpace.project.leaderEmail;
            }else if(newVal === 'FINANCE'){
              invoiceNames = that.protocolSpace.dutyName;
              invoicePhones = that.protocolSpace.dutyPhone;
              invoiceEmails = that.protocolSpace.dutyEmail;
            }else if(newVal === 'PROJECTANDFINANCE'){
              invoiceNames = that.protocolSpace.project.leader + ';' + that.protocolSpace.dutyName + ';';
              invoicePhones = that.protocolSpace.project.leaderPhone + ';' + that.protocolSpace.dutyPhone + ';';
              invoiceEmails = that.protocolSpace.project.leaderEmail + ';' + that.protocolSpace.dutyEmail + ';';
            }else if(newVal === 'CUSTOM'){
              this.inputReadonly = false;
              if(that.protocolSpace.invoiceContactsType === "CUSTOM"){
                invoiceNames = that.protocolSpace.invoiceName;
                invoicePhones = that.protocolSpace.invoicePhone;
                invoiceEmails = that.protocolSpace.invoiceEmail;
              }else {
                invoiceNames = '';
                invoicePhones = '';
                invoiceEmails = '';
              }
            }
            that.invoiceNameList = invoiceNames;
            that.invoicePhoneList = invoicePhones;
            that.invoiceEmailList = invoiceEmails;
          }
        },
      mounted(){
        if(this.protocolSpace.invoiceContactsType){
          if(this.protocolSpace.invoiceContactsType === "CUSTOM"){
            this.inputReadonly = false;
          }
          this.invoiceContacts = this.protocolSpace.invoiceContactsType;
          this.invoiceNameList = this.protocolSpace.invoiceName;
          this.invoicePhoneList = this.protocolSpace.invoicePhone;
          this.invoiceEmailList = this.protocolSpace.invoiceEmail;
        }
      }

    }
</script>

<style scoped>

</style>
