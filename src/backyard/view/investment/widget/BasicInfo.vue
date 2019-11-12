<template>
  <div class="wrapper wrapper-content">
    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-leaf"></i>
      孵化信息
    </span>
      <div slot="body">

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">企业名称</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.companyName"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">所属项目</label>
          <div class="col-md-9">
            <ProjectPagerSelection :activeProject="investment.project" :initFilter="{'userId':user.id}"/>
          </div>
        </div>

      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-building"></i>
      企业注册信息
    </span>
      <div slot="body">
        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">组织机构代码/社会信用码</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.organizationCode"/>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">登记注册类型</label>
          <div class="col-md-9">
            <select v-model="investment.registrationType" class="form-control">
              <option>国有企业</option>
              <option>集体企业</option>
              <option>股份合作企业</option>
              <option>国有联营企业</option>
              <option>集体联营企业</option>
              <option>国有与集体联营企业</option>
              <option>其他联营</option>
              <option>有限责任公司</option>
              <option>国有独资公司</option>
              <option>其他有限责任公司</option>
              <option>股份有限公司</option>
              <option>私营企业</option>
              <option>私营独资</option>
              <option>私营合伙</option>
              <option>私营有限责任公司</option>
              <option>私营股份有限公司</option>
              <option>与港、澳、台商合资经营企业</option>
              <option>与港、澳、台商合作经营企业</option>
              <option>港、澳、台商独资经营企业</option>
              <option>港、澳、台商独资股份有限公司</option>
              <option>港、澳、台商投资股份有限公司</option>
              <option>中外合资经营企业</option>
              <option>中外合作经营企业</option>
              <option>外资企业</option>
              <option>外商投资股份有限公司</option>
              <option>其他企业</option>
            </select>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">高新技术分类</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.highTechType"/>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">行业分类</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.industryType"/>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">创业企业特征</label>
          <div class="col-md-9">
            <select v-model="investment.enterpriseCharacteristics" class="form-control">
              <option>国家科技产业化基地内企业</option>
              <option>认定高新技术企业</option>
              <option>高等院校办的企业</option>
              <option>科研院所办的企业</option>
              <option>海外归国留学人员办的企业</option>
              <option>科研院所整体转制企业</option>
              <option>国家高新区内的企业</option>
              <option>孵化器内的企业</option>
              <option>其他</option>
            </select>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">专业技术方向</label>
          <div class="col-md-9">
            <select v-model="investment.skillDirection" class="form-control">
              <option>电子信息</option>
              <option>先进制造</option>
              <option>航空航天</option>
              <option>现代交通</option>
              <option>生物医疗与医疗器械</option>
              <option>新材料</option>
              <option>新能源与节能</option>
              <option>环境保护</option>
              <option>地球、空间与海洋</option>
              <option>核应用技术</option>
              <option>现代农业</option>
              <option>其他</option>
            </select>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">市场分类</label>
          <div class="col-md-9">
            <select v-model="investment.marketType" class="form-control">
              <option>大数据</option>
              <option>移动互联网</option>
              <option>大医疗</option>
              <option>智能硬件</option>
            </select>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">网站/APP</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.webOrApp"/>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">主营产品</label>
          <div class="col-md-9">
            <textarea rows="10" class="form-control" v-model="investment.mainProducts"></textarea>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">是否有关联公司</label>
          <div class="col-md-8">
            <span>
              <NbRadio v-model="investment.isAffiliatedCompany" :val="true" :name="'isAffiliatedCompany' "></NbRadio>
              <label>是</label>
            </span>
            <span>
              <NbRadio v-model="investment.isAffiliatedCompany" :val="false" :name="'isAffiliatedCompany'"></NbRadio>
              <label>否</label>
            </span>
          </div>
        </div>

      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-address-card"></i>
      负责人及联系人信息
    </span>
      <div slot="body">

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">实际负责人</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.principal"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">负责人电话</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.principalPhone"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">负责人邮箱</label>
          <div class="col-md-9">
            <input type="mail" class="form-control" v-model="investment.principalEmail"/>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">联系人</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.contacts"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">联系人电话</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.contactsPhone"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">联系人邮箱</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="investment.contactsEmail"/>
          </div>
        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel>
    <span slot="heading" class="text-success f16">
      <i class="fa fa-upload"></i>
      附件上传
    </span>
      <div slot="body">

        <div class="row mt10">
          <label class="col-md-3 control-label">行业简介</label>
          <div class="col-md-9">
            <NbTank :tank="investment.industryProfile"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label">竞争对手</label>
          <div class="col-md-9">
            <NbTank :tank="investment.competitor"/>
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-3 control-label">商业模式</label>
          <div class="col-md-9">
            <NbTank :tank="investment.businessModel"/>
          </div>
        </div>

      </div>
    </NbSlidePanel>

  </div>

</template>
<script>
  import NbTank from '../../../../common/widget/NbTank'
  import ProjectPagerSelection from "../../project/Selection.vue";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NbRadio from "../../../../common/widget/NbRadio.vue";
  import NbNumberInput from "../../../../common/widget/NbNumberInput.vue";
  import NbDistrict from "../../../../common/widget/NbDistrict.vue";
  import Investment from "../../../../common/model/investment/Investment";

  export default{
    data () {
      return {
        user: this.$store.state.user
      }
    },
    components: {
      NbTank,
      ProjectPagerSelection,
      NbSlidePanel,
      NbRadio,
      NbNumberInput,
      NbDistrict
    },
    props:{
      investment: {
        type: Investment,
        required: true
      }
    },
    computed: {},
    watch: {},
    methods: {},
    mounted(){}
  }

</script>
