<template>
  <div class="row entry-apply-preview">
    <div class="col-xs-12">
      <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-file-pdf-o"></i>
        入驻申请表
      </span>
        <div slot="body">
          <div class="pdf-container">
  
            <table>
              <caption class="text-center">零号湾入驻申请</caption>
              <tr>
                <td colspan="3">项目名称</td>
                <td colspan="7">{{ entryApply.name }}</td>
                <td colspan="3">项目领域</td>
                <td colspan="7">{{ entryApply.fieldDescription }}</td>
              </tr>
              <tr>
                <td colspan="7">国家重点支持高新技术领域</td>
                <td colspan="13">{{ entryApply.field }}</td>
              </tr>
              <!--{% for member in entryApply.entryApplyMembers %}-->
              <tr v-for="member in entryApply.entryApplyMembers">
                <td colspan="3">团队成员</td>
                <td colspan="3">{{ member.name }}</td>
                <td colspan="3">联系方式</td>
                <td colspan="4">{{ member.phone }}</td>
                <td colspan="2">E-mail</td>
                <td colspan="5">{{ member.email }}</td>
              </tr>
              <!--{% endfor %}-->
              <tr>
              <td colspan="20">项目简介（300字左右）</td>
            </tr>
              <tr>
                <td colspan="20" height="200"> {{ entryApply.description }}</td>
              </tr>
              <tr>
                <td colspan="2" rowspan="2">主要创新点和难点</td>
      
                <td colspan="3">创新点</td>
                <td colspan="15">{{ entryApply.innovative }}</td>
              </tr>
              <tr>
                <td colspan="3">难点</td>
                <td colspan="15">{{ entryApply.difficulty }}</td>
              </tr>
              <tr>
                <td colspan="20">6个月内分阶段预期成果（每3个月为一个阶段）</td>
              </tr>
              <tr>
                <td colspan="20" height="200">{{ entryApply.expectedAchievement }}</td>
              </tr>
              <tr>
                <td colspan="20">可行性分析</td>
              </tr>
              <tr>
                <td colspan="20" height="200">{{ entryApply.feasibilityAnalysis }}</td>
              </tr>
              <tr>
                <td colspan="20">团队分析及股权结构</td>
              </tr>
              <tr>
                <td colspan="20" height="200">{{ entryApply.division }}</td>
              </tr>
              <tr>
                <td colspan="20">项目执行进度预计</td>
              </tr>
              <tr>
                <td colspan="20" height="200">{{ entryApply.expectedSchedule }}</td>
              </tr>
              <tr>
                <td colspan="3">场地需求</td>
                <td colspan="17">{{ entryApply.spaceRequirement }}</td>
              </tr>
              <tr>
                <td colspan="3">创业指导</td>
                <td colspan="17">{{ entryApply.guideRequirement }}</td>
              </tr>
              <tr>
                <td colspan="3">投资需求</td>
                <td colspan="17">{{ entryApply.investRequirement }}</td>
              </tr>
              <tr>
                <td colspan="3">政策需求</td>
                <td colspan="17">{{ entryApply.policyRequirement }}</td>
              </tr>
              <tr>
                <td colspan="3">其他服务需求</td>
                <td colspan="17">{{ entryApply.otherRequirement }}</td>
              </tr>
            </table>
            <p> 备注：该表格一式两份 </p>
            
          </div>
          
          <div class="logo-block">
            <a href="http://neobay.cn" target="_blank">
              <img class="logo" src="../../../../../common/assets/img/neobay1.png"/>
            </a>
          </div>
          
        </div>
      </NbSlidePanel>
    </div>
  </div>
</template>

<script>
  import EntryApply from  "../../../../../common/model/entry/apply/EntryApply"
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
  export default{
    data(){
      return {}
    },
    props: {
      entryApply: {
        type: EntryApply,
        required: true
      }
    },
    components: {
      NbSlidePanel
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  .entry-apply-preview {
    
    .pdf-container {
      font-family: "simsun", serif;
      padding: 0 40px 20px 40px;
      color: black;
      font-size: 18px;
    }
    a, a:hover {
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
      border-right: 1px solid #555;
      border-bottom: 1px solid #555;
    }
    td {
      border-left: 1px solid #555;
      border-top: 1px solid #555;
      padding: 5px 8px;
      text-align: left;
      vertical-align: top;
    }
    #hidden td {
      padding: 0 0;
      width: 5%;
      height: 0;
    }
    .logo-block {
      text-align: right;
      margin-top: 30px;
      margin-right: 27px;
    }
    .logo {
      width: 300px;
    }
  }
</style>
