<template>
  <div class="row keeper-business-preview">
    <div class="col-xs-12">
      <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-file-pdf-o"></i>
        协议合作方业务办理联系单
      </span>
        <div slot="body">
          <div class="pdf-container">
            <table>
              <tr>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
                <td colspan="2" class="format-td"></td>
              </tr>
              <tr>
                <td colspan="20" class="text-center title"><b>协议合作方业务办理联系单</b></td>
              </tr>
              <tr class="dark1">
                <td colspan="5"><b>办理业务</b></td>
                <td colspan="15" class="tint"><a><u>{{ keeperBusiness.businessType.name }}</u></a></td>
              </tr>
              <tr>
                <td colspan="5"><b>编号</b></td>
                <td colspan="5"><a><u>{{ keeperBusiness.no }}</u></a></td>
                <td colspan="5"><b>日期</b></td>
                <td colspan="5"><a><u>{{ keeperBusiness.date | date("yyyy-MM-dd") }}</u></a></td>
              </tr>
              <tr class="dark2">
                <td colspan="20">
                  <div class="text-area">
                    <p style="margin-top: 5px"><b>致：<u>{{ keeperBusiness.organization.detailName }}</u>(单位)：</b></p>
                    <br/>
                    <br/>
                    <p>现有我方零号湾入驻项目
                        <u>{{ keeperBusiness.projectName }}</u>，
                        需向贵方申请办理<u>{{ keeperBusiness.businessType.name }}</u>，请予以支持协助为盼。
                        相关费用请根据贵方与我方签署的战略合作协议的约定计算。</p>
                    <br/>
                    <br/>
                    <p><b>项目联系人：<u>{{ keeperBusiness.leaderName }}</u></b></p>
                    <br/>
                    <br/>
                    <p><b>联系方式：<u>{{ keeperBusiness.leaderPhone }}</u></b></p>
                    <br/>
                    <br/>
                    <div class="seal">
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <div class="signature-box">
                        <p><b>上海零号湾创业投资有限公司(盖章)</b></p>
                      </div>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                    </div>

                  </div>
                </td>
              </tr>
              <tr class="dark1 bottom-bar">
                <td colspan="4" class="bottom-bar"><b>单位</b></td>
                <td colspan="2" class="bottom-bar"><b>联系人</b></td>
                <td colspan="4" class="bottom-bar"><b>联系方式</b></td>
                <td colspan="4" class="bottom-bar"><b>地址</b></td>
                <td colspan="6" class="bottom-bar"><b>备注</b></td>
              </tr>
              <tr>
                <td colspan="4" class="bottom-bar-content">{{ keeperBusiness.organization.contactsCompany }}</td>
                <td colspan="2" class="tint bottom-bar-content">{{ keeperBusiness.organization.contactsName }}</td>
                <td colspan="4" class="tint bottom-bar-content">{{ keeperBusiness.organization.contactsPhone }}</td>
                <td colspan="4" class="tint bottom-bar-content">{{ keeperBusiness.organization.contactsAddress }}</td>
                <td colspan="6" class="tint bottom-bar-content">{{ keeperBusiness.organization.contactsNote }}</td>
              </tr>
            </table>
          </div>
        </div>
      </NbSlidePanel>

    </div>
  </div>
</template>

<script>
  import KeeperBusiness from  "../../../../../common/model/keeper/business/KeeperBusiness"
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
  export default{
    data(){
      return {}
    },
    props: {
      keeperBusiness: {
        type: KeeperBusiness,
        required: true
      }

    },

    components: {
      NbSlidePanel

    }

  }
</script>

<style lang="less" rel="stylesheet/less">
  .keeper-business-preview {
    .pdf-container {
      font-family: "simsun", serif;
      padding: 20px 40px 20px 40px;
      color: black;
      font-size: 18px;
    }

    a, a:hover, b {
      color: black;
      text-decoration: none;
    }

    .text-center {
      text-align: center;
      margin-bottom: 15px;
      font-size: xx-large;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-right: 4px solid #d5dce5;
      border-bottom: 4px solid #d5dce5;
      margin-top: 40px;
    }

    td {
      border-left: 4px solid #d5dce5;
      border-top: 4px solid #d5dce5;
      padding: 10px 10px;
      text-align: center;
      vertical-align: middle;
      height: 80px;
    }

    .title {
      font-size: 18px;
    }

    .dark1 {
      background-color: #d4dee9;
    }

    .tint {
      border-left: 4px solid #f2f2f2;
    }

    .dark2 {
      background-color: #ddeaf6;
    }

    p {
      line-height: 32px;
      margin: 0;
      padding: 0;
    }

    .text-area {
      padding: 40px;
      text-align: left;
    }

    .seal {
      text-align: right;
    }

    .bottom-bar {
      height: 40px;
    }

    .bottom-bar-content {
      height: 90px;
      padding: 2px;
    }

    .format-td {
      width: 10%;
      height: 0px!important;
      padding: 0px;
      margin: 0px;
      border: 0px;
    }

    .signature-box {
      padding-top: 50px;
      position: relative;
      background-image: url(../../../../../common/assets/img/long_seal.png);
      background-position: right;
      background-size: contain;
      background-repeat: no-repeat;
      height: 4.2cm;
    }

  }
</style>
