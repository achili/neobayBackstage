<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>2018年火炬统计填报表</span>
          <span>编辑火炬统计表</span>
        </h2>
      </div>
    </div>


    <div class="row mb20">
      <div class="col-xs-12 text-right">
        <CreateSaveButton createClass="btn btn-warning" createText="保存" saveClass="btn btn-warning" :entity="torch"
                          :callback="save"/>
      </div>
    </div>

    <div>
      <NbSlidePanel>
        <span slot="heading" class="text-success f16">
            <i class="fa fa-leaf"></i>
            填写须知
        </span>
        <div slot="body">
          <div class="f18 mb10">如没有找到所关联的项目，请联系您的社区经理。</div>


          <p>
            <b><font size="3">指标解释</font></b>
          </p>
          <ol>
            <li>
              <b>统一社会信用代码</b>&nbsp; 指按照《国务院关于批转发展改革委等部门法人和其他组织统一社会信用代码制度建设总体方案的通知》（国发〔2015〕33号）规定，由赋码主管部门给每一个法人单位和其他组织颁发的在全国范围内唯一的、终身不变的法定身份识别码，由十八位的阿拉伯数字或大写英文字母（不使用I、O、Z、S、V）组成。已经领取了统一社会信用代码的法人单位必须填写统一社会信用代码。在填写时，要按照《营业执照》（证书）上的统一社会信用代码填写。
            </li>
            <li><b>组织机构代码</b> &nbsp;指根据中华人民共和国国家标准《全国组织机构代码编制规则》（GB11714-1997），由组织机构代码登记主管部门给每个企业、事业单位、机关、社会团体和民办非企业等单位颁发的在全国范围内唯一的、始终不变的法定代码。组织机构代码共9位，由八位无属性的数字和一位校验码组成。</li>
            <li><b>企业成立时间</b>&nbsp; 指企业向工商行政管理部门进行登记，领取法人营业执照的时间。</li>
            <li><b>企业入驻时间</b> &nbsp;指被孵化企业正式入驻到科技企业孵化器内的时间。</li>
            <li><b>企业登记注册类型</b>&nbsp; 企业应根据国家统计局与国家工商行政管理局联合制定的《关于划分企业登记注册类型的规定》按本企业在工商行政管理部门登记注册的类型填写。</li>
            <li><b>行业类别</b> &nbsp;主要反映企业经济活动性质。对照《国民经济行业分类》（GB/T 4754－2017）所选行业类别，填写行业小类代码。</li>
            <li><b>高新技术企业</b>&nbsp; 指经省、自治区、直辖市、计划单列市高新技术企业认定管理机构认定，获得高新技术企业证书，并在有效期内的企业。</li>
            <li><b>科技型中小企业</b>&nbsp; 指获得全国科技型中小企业信息库入库登记编码，并在有效期内的企业。</li>
            <li><b>大企业离职人员</b>&nbsp; 大企业指符合《关于印发中小企业划型标准规定的通知》工信部联企业[2011]300号，第七条“中型企业标准上限即为大型企业标准的下限”要求的企业</li>
            <li><b>连续创业者</b> &nbsp;指创业超过一次以上的创业者。</li>
            <li><b>获天使或风险投资额</b>&nbsp; 指企业在报告期内，企业获得的天使投资或风险投资总额。</li>
            <li><b>占用孵化器场地面积</b> 指企业在科技企业孵化器内实际占用的面积，包括办公及厂房等面积之和。</li>
            <li><b>企业成立时注册资本</b> &nbsp;指企业成立时的注册资金总额。</li>
            <li><b>总收入</b> &nbsp;指企业在报告期内，企业所实现的技、工、贸等各种收入之和。</li>
            <li><b>净利润</b> &nbsp;指企业报告期实现的利润在上缴国家所得税后的剩余部份（亏损以“－”表示）。</li>
            <li><b>出口总额</b> &nbsp;指企业在报告期内，企业出售给外贸部门或直接出售给外商的产品或商品的总金额。包括来料加工装配出口、境外技术合同实现金额及在国内以外汇计价的商品出售额等。</li>
            <li><b>研究与实验发展经费（R&amp;D）经费支出 </b>&nbsp;指企业在报告期内，企业科技活动经费支出中用于基础研究、应用研究和实验发展三类项目以及这三类项目的管理和服务费用的总支出。不论何种经费来源，只要实际用于上述三类项目经费支出都应计算在内。</li>
            <li><b>实际上缴税费</b> &nbsp;指企业在报告期内实际上缴的各项税金、特种基金和附加费等。</li>
            <li><b>从业人员</b> &nbsp;指企业在报告期内，企业的工作人员总数。 </li>
            <li><b>吸纳应届大学毕业生</b> &nbsp;指企业在报告期内，企业内聘用的应届大专以上学历的人员总数。</li>
            <li><b>当年知识产权申请数</b> &nbsp;指企业在报告期内，企业申报各类知识产权保护的总数。</li>
            <li><b>当年知识产权授权数</b> &nbsp;指企业在报告期内，企业获批准的各类知识产权保护的总数。发明专利 指在本统计年度内，企业获得批准的发明专利件数。</li>
            <li><b>拥有有效知识产权数</b> &nbsp;指报告期末企业拥有的经国内外知识产权行政部门授权且在有效期内的各类知识产权的总数。<b>发明专利</b> 指报告期末企业拥有的经国内外知识产权行政部门授权且在有效期内的发明专利的总数。<b>软件著作权</b> 指报告期末企业拥有的经国务院知识产权行政部门按照《中华人民共和国计算机软件保护条例》对计算机程序和文档授予的著作权的总数。<b>集成电路布图</b> 指报告期末企业拥有的经国务院知识产权行政部门按照《中华人民共和国集成电路布图设计保护条例》授予的对集成电路中至少有一个是有源元件的两个以上元件和部分或者全部互连线路的三维配置，或者为制造集成电路而准备的上述三维配置的布图专有权。<b>植物新品种</b> 指企业在报告期末拥有的，由国务院农业或林业行政部门按照《中华人民共和国植物新品种保护条例》授予的经过人工培育的或者对发现的野生植物加以开发，具备新颖性、特异性、一致性和稳定性并有适当命名的植物新品种的植物新品种权。</li>
            <li><b>购买国外专利</b> &nbsp;指企业在报告期内,购买的全部国外的技术专利数。</li>
            <li><b>技术合同交易数量</b> &nbsp;指企业在报告期内在科技部门和商务部门进行认定和登记的技术合同数量。技术合同的类型包括四类：技术开发、技术转让、技术咨询和技术服务。技术合同的类型不包括获得国家和省市各类支持计划所签订的合同。</li>
            <li><b>技术合同交易额</b> &nbsp;指企业在报告期内在科技部门和商务部门进行认定和登记的技术合同成交项目的总金额。技术合同的类型包括四类：技术开发、技术转让、技术咨询和技术服务。技术合同的类型不包括获得国家和省市各类支持计划所签订的合同。</li>
            <li><b>当年承担国家级科技计划项目数</b>&nbsp; 指企业在报告期内承担中央政府部门下达的科技项目数量。中央政府部门下达的科技项目种类，包含国家科技重大专项，国家自然科学基金，国家重点研发计划，技术创新引导专项（基金）以及基地和人才专项，不包括地方审批的各类项目。</li>
            <li><b>当年获得省级以上奖励</b> &nbsp;指企业在报告期内，获得各类省级以上科技奖励的数量。</li></ol><div>PS</div><ul><li>2017年国民经济行业类型。<a href="http://www.stats.gov.cn/tjsj/tjbz/hyflbz/201710/P020171220358908336080.pdf" target="_blank"><u><font color="#0066cc">http://www.stats.gov.cn/tjsj/tjbz/hyflbz/201710/P020171220358908336080.pdf</font></u></a></li>
          <li>金额单位为千元，请勿混乱。</li></ul>
        </div>
      </NbSlidePanel>

      <NbSlidePanel v-if="selectProjectShow">
        <span slot="heading" class="text-success f16">
            <i class="fa fa-leaf"></i>
            选择您的项目
        </span>
        <div slot="body">
          <div class="row mt10">
            <label class="col-md-3 control-label mt5 compulsory">项目</label>
            <div class="col-md-9">
              <ProjectPagerSelection :activeProject="project" :initFilter="{'userId':user.id}"/>
            </div>
          </div>
        </div>
      </NbSlidePanel>

      <NbSlidePanel v-show="isHasProject">
        <span slot="heading" class="text-success f16">
            <i class="fa fa-leaf"></i>
            填写表格
        </span>
        <div slot="body">
          <label class="control-label compulsory">1 企业名称</label>
          <input type="text" class="form-control" v-model="torch.businessName">
        </div>

        <div class="form-group torch-select">
          <label class="control-label compulsory">2 组织机构代码或统一社会信用代码</label>
          <input type="text" class="form-control" v-model="torch.organizationCode">
        </div>

        <div class="form-group torch-select">
          <div class="row">
            <label class="col-md-4 mt5 control-label compulsory">3 企业成立时间</label>
            <div class="col-md-8">
              <el-date-picker v-model="torch.businessStartTime" type="date"
                              placeholder="选择日期时间"></el-date-picker>
            </div>
          </div>
        </div>

        <div class="form-group torch-select">
          <div class="row">
            <label class="col-md-4 mt5 control-label compulsory">4 企业入驻时间</label>
            <div class="col-md-8">
              <el-date-picker v-model="torch.businessEntryTime" type="date"
                              placeholder="选择日期时间"></el-date-picker>
            </div>
          </div>
        </div>

        <div class="form-group torch-select">
          <div>
            <label class="control-label compulsory">5 企业登记注册类型</label>
          </div>


          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="110" name="95"></NbRadio>
            <label>国有</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="120" name="95"></NbRadio>
            <label>集体</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="130" name="95"></NbRadio>
            <label>股份合作</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="141" name="95"></NbRadio>
            <label>国有联营</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="142" name="95"></NbRadio>
            <label>集体联营</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="143" name="95"></NbRadio>
            <label>国有与集体联营</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="149" name="95"></NbRadio>
            <label>其他联营</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="151" name="95"></NbRadio>
            <label>国有独资公司</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="159" name="95"></NbRadio>
            <label>其他有限责任公司</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="160" name="95"></NbRadio>
            <label>股份有限公司</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="171" name="95"></NbRadio>
            <label>私营独资</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="172" name="95"></NbRadio>
            <label>私营合伙</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="173" name="95"></NbRadio>
            <label>私营有限责任公司 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="174" name="95"></NbRadio>
            <label>私营股份有限公司 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="190" name="95"></NbRadio>
            <label>其他 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="210" name="95"></NbRadio>
            <label>与港澳台商合资经营 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="220" name="95"></NbRadio>
            <label>与港澳台商合作经营 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="230" name="95"></NbRadio>
            <label>港澳台商独资 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="240" name="95"></NbRadio>
            <label>港澳台商投资股份有限公司 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="290" name="95"></NbRadio>
            <label>其他港澳台投资 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="310" name="95"></NbRadio>
            <label>中外合资经营 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="320" name="95"></NbRadio>
            <label>中外合作经营 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="330" name="95"></NbRadio>
            <label>外资企业 </label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.registrationType" val="340" name="95"></NbRadio>
            <label>外商投资股份有限公司 </label>
          </div>
          <div class="col-xs-12 torch-select">
            <NbRadio v-model="torch.registrationType" val="390" name="95"></NbRadio>
            <label>其他外商投资 </label>
          </div>
        </div>

        <div class="form-group torch-select">
          <div>
            <label class="control-label compulsory mt20">6 行业分类代码</label>
          </div>
          <input type="text" class="form-control" placeholder="请对照《国民经济行业分类》（见“填写须知”中链接）行业类别，填写4位行业小类代码。" v-model="torch.industryCategory">
        </div>

        <div class="form-group">
          <div>
            <label class="control-label compulsory torch-select">7 企业所属技术领域</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="电子信息" name="7"></NbRadio>
            <label>电子信息</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="先进制造" name="7"></NbRadio>
            <label>先进制造</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="航空航天" name="7"></NbRadio>
            <label>航空航天</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="现代交通" name="7"></NbRadio>
            <label>现代交通</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="生物医药与医疗器械" name="7"></NbRadio>
            <label>生物医药与医疗器械</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="新材料" name="7"></NbRadio>
            <label>新材料</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="新能源与节能" name="7"></NbRadio>
            <label>新能源与节能</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="环境保护" name="7"></NbRadio>
            <label>环境保护</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="地球、空间与海洋" name="7"></NbRadio>
            <label>地球、空间与海洋</label>
          </div>

          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="核应用技术" name="7"></NbRadio>
            <label>核应用技术</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="现代农业" name="7"></NbRadio>
            <label>现代农业</label>
          </div>
          <div class="col-xs-4 torch-select">
            <NbRadio v-model="torch.technicalField" val="文化创意" name="7"></NbRadio>
            <label>文化创意</label>
          </div>

        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">8 企业纳税人类型</label>
          <div class="col-xs-12">
            <div class="col-xs-6">
              <NbRadio v-model="torch.taxpayerType" val="一般纳税人" name="1"></NbRadio>
              <label>一般纳税人</label>
            </div>
            <div class="col-xs-6">
              <NbRadio v-model="torch.taxpayerType" val="小规模纳税人" name="1"></NbRadio>
              <label>小规模纳税人</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">9 是否与创业导师建立辅导关系</label>
          <div class="col-xs-12">

            <div class="col-xs-6">
              <NbRadio v-model="torch.coachRelationship" val="是" name="2"></NbRadio>
              <label>是</label>
            </div>
            <div class="col-xs-6">
              <NbRadio v-model="torch.coachRelationship" val="否" name="2"></NbRadio>
              <label>否</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">10 是否毕业企业</label>
          <div class="col-xs-12">

            <div class="col-xs-6">
              <NbRadio v-model="torch.graduateEnterprise" val="是" name="3"></NbRadio>
              <label>是</label>
            </div>
            <div class="col-xs-6">
              <NbRadio v-model="torch.graduateEnterprise" val="否" name="3"></NbRadio>
              <label>否</label>
            </div>
          </div>
        </div>

        <div class="form-group" v-show="torch.graduateEnterprise==='是'">
          <div class="row">
            <label class="col-md-4 mt30 control-label compulsory">11 毕业时间</label>
            <div class="col-md-8 mt10">
              <el-date-picker v-model="torch.graduateTime" type="date"
                              placeholder="选择日期时间"></el-date-picker>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">12 是否高新技术企业</label>
          <div class="col-xs-12">

            <div class="col-xs-6">
              <NbRadio v-model="torch.technologyEnterprises" val="是" name="4"></NbRadio>
              <label>是</label>
            </div>
            <div class="col-xs-6">
              <NbRadio v-model="torch.technologyEnterprises" val="否" name="4"></NbRadio>
              <label>否</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">13 是否是科技型中小企业</label>
          <div class="col-xs-12">

            <div class="col-xs-6">
              <NbRadio v-model="torch.technologyScience" val="是" name="13"></NbRadio>
              <label>是</label>
            </div>
            <div class="col-xs-6">
              <NbRadio v-model="torch.technologyScience" val="否" name="13"></NbRadio>
              <label>否</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div>
            <label class="control-label compulsory torch-select">14 企业主要负责人创业特征</label>
          </div>

          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.entrepreneurialCharacteristics" val="大学生创业" name="8"></NbRadio>
            <label>大学生创业</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.entrepreneurialCharacteristics" val="留学归国人员" name="8"></NbRadio>
            <label>留学归国人员</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.entrepreneurialCharacteristics" val="高校科研院所人员" name="8"></NbRadio>
            <label>高校科研院所人员</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.entrepreneurialCharacteristics" val="大企业离职人员" name="8"></NbRadio>
            <label>大企业离职人员</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.entrepreneurialCharacteristics" val="机关事业单位离职人员" name="8"></NbRadio>
            <label>机关事业单位离职人员</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.entrepreneurialCharacteristics" val="其它" name="8"></NbRadio>
            <label>其它</label>
          </div>
        </div>

        <div class="form-group">
          <div>
            <label class="control-label compulsory torch-select">15 企业主要负责人是否为连续创业者</label>
          </div>
          <div class="col-xs-12">
            <div class="col-xs-6">
              <NbRadio v-model="torch.continuousEntrepreneur" val="是" name="5"></NbRadio>
              <label>是</label>
            </div>
            <div class="col-xs-6">
              <NbRadio v-model="torch.continuousEntrepreneur" val="否" name="5"></NbRadio>
              <label>否</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">16 企业主要负责人性别</label>
          <div class="col-xs-12">
            <div class="col-xs-6">
              <NbRadio v-model="torch.sex" val="男" name="6"></NbRadio>
              <label>男</label>
            </div>
            <div class="col-xs-6">
              <NbRadio v-model="torch.sex" val="女" name="6"></NbRadio>
              <label>女</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">17 获得天使或风险投资额（千元）</label>
          <input type="text" class="form-control" v-model="torch.investmentAmount">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">18 占用孵化器场地面积（平方米）</label>
          <input type="text" class="form-control" v-model="torch.incubatorArea">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">19 企业成立时注册资本（千元）</label>
          <input type="text" class="form-control" v-model="torch.registeredCapital">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">20 企业年度总收入（千元）</label>
          <input type="text" class="form-control" v-model="torch.totalIncome">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">21 企业年度净利润（千元）</label>
          <input type="text" class="form-control" v-model="torch.netProfit">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">22 企业年度出口总额（千元）</label>
          <input type="text" class="form-control" v-model="torch.totalImport">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">23 企业年度研究与实验发展（R&D）经费支出（千元）</label>
          <input type="text" class="form-control" v-model="torch.expenditure">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">24 企业年度实际上缴税费（千元）</label>
          <input type="text" class="form-control" v-model="torch.payFees">
        </div>

        <div class="form-group">
          <div>
            <label class="form-group compulsory">25 企业从业人员情况（个）</label>
          </div>
          <div class="col-xs-6">
            <label class="control-label">在孵企业从业人员（个）</label>
            <input type="text" class="form-control" v-model="torch.employeesInBusiness">
          </div>
          <div class="col-xs-6">
            <label class="control-label">博士（个）</label>
            <input type="text" class="form-control" v-model="torch.doctor">
          </div>
          <div class="col-xs-6">
            <label class="control-label">大专以上（个）</label>
            <input type="text" class="form-control" v-model="torch.juniorCollege">
          </div>
          <div class="col-xs-6">
            <label class="control-label">留学人员（个）</label>
            <input type="text" class="form-control" v-model="torch.abroadStudent">
          </div>
          <div class="col-xs-6">
            <label class="control-label">千人计划人数（个）</label>
            <input type="text" class="form-control" v-model="torch.thousandPlan">
          </div>
          <div class="col-xs-6">
            <label class="control-label">吸纳应届大学毕业生（个）</label>
            <input type="text" class="form-control" v-model="torch.graduates">
          </div>
        </div>

        <div class="form-group">
          <div>
            <label class="form-group compulsory torch-select">26 企业知识产权情况（件）</label>
          </div>
          <div class="col-xs-6">
            <label class="control-label">当年知识产权申请数（件）</label>
            <input type="text" class="form-control" v-model="torch.applicationNumber">
          </div>
          <div class="col-xs-6">
            <label class="control-label">当年知识产权授权数（件）</label>
            <input type="text" class="form-control" v-model="torch.authorizedNumber">
          </div>
          <div class="col-xs-6">
            <label class="control-label">当年知识产权授权数：发明专利（件）</label>
            <input type="text" class="form-control" v-model="torch.inventionNumber">
          </div>
          <div class="col-xs-6">
            <label class="control-label">拥有有效知识产权数（件）</label>
            <input type="text" class="form-control" v-model="torch.propertyRightNumber">
          </div>

          <div class="col-xs-6">
            <label class="control-label">拥有有效知识产权数：发明专利（件）</label>
            <input type="text" class="form-control" v-model="torch.patent">
          </div>
          <div class="col-xs-6">
            <label class="control-label">拥有有效知识产权数：软件著作权（件）</label>
            <input type="text" class="form-control" v-model="torch.softwareCopyRight">
          </div>
          <div class="col-xs-6">
            <label class="control-label">拥有有效知识产权数：植物新品种（个）</label>
            <input type="text" class="form-control" v-model="torch.plantVariety">
          </div>

          <div class="col-xs-6">
            <label class="control-label">拥有有效知识产权数：集成电路布图（个）</label>
            <input type="text" class="form-control" v-model="torch.circuitLayout">
          </div>
          <div class="col-xs-6">
            <label class="control-label">购买国外专利数（件）</label>
            <input type="text" class="form-control" v-model="torch.patentNumber">
          </div>
          <div class="col-xs-6">
            <label class="control-label">技术合同交易数量（项）</label>
            <input type="text" class="form-control" v-model="torch.transactionNumber">
          </div>


          <div class="col-xs-12">
            <label class="control-label">技术合同交易额（千元）</label>
            <input type="text" class="form-control" v-model="torch.transactionForehead">
          </div>

          <div class="col-xs-6">
            <label class="control-label">当年承担国家级科技计划项目数（项）</label>
            <input type="text" class="form-control" v-model="torch.nationalProject">
          </div>

          <div class="col-xs-6">
            <label class="control-label">当年获得省级以上奖励（项）</label>
            <input type="text" class="form-control" v-model="torch.provincialAward">
          </div>

        </div>

        <div class="form-group">
          <div>
            <label class="form-group compulsory torch-select">27 统计信息</label>
          </div>
          <div class="col-xs-6">
            <label class="control-label">单位负责人</label>
            <input type="text" class="form-control" v-model="torch.unitHead">
          </div>
          <div class="col-xs-6">
            <label class="control-label">统计负责人</label>
            <input type="text" class="form-control" v-model="torch.statisticsHead">
          </div>
          <div class="col-xs-6">
            <label class="control-label">填表人</label>
            <input type="text" class="form-control" v-model="torch.fillForm">
          </div>
          <div class="col-xs-12">
            <label class="control-label">联系电话</label>
            <input type="text" class="form-control" v-model="torch.phone">
          </div>
        </div>
      </NbSlidePanel>


      <NbSlidePanel v-show="!isHasProject">
        <span slot="heading" class="text-success f16">
            <i class="fa fa-leaf"></i>
            填写表格
        </span>
        <div slot="body">
          <label class="control-label compulsory">你还没有项目，不能填写火炬统计,请联系您的社区经理。</label>
        </div>

      </NbSlidePanel>

    </div>

    <div class="col-xs-12 m-t-md">
      <div class="alert alert-danger" v-show="torch.errorMessage">
        {{torch.errorMessage}}
      </div>
      <div class="pull-right">
        <CreateSaveButton createClass="btn btn-warning" createText="保存" saveClass="btn btn-warning" :entity="torch"
                          :callback="save"/>
      </div>
    </div>
  </div>


</template>
<script>
  import {Notification} from 'element-ui';
  import NbEditor from "../../../../common/widget/NbEditor.vue"
  import Torch from '../../../../common/model/torch/Torch2018'
  import NbRadio from "../../../../common/widget/NbRadio.vue";
  import NbDateRange from "../../../../common/widget/NbDateRange.vue";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import Project from "../../../../common/model/project/Project";
  import Pager from "../../../../common/model/base/Pager";
  import Company from "../../../../common/model/company/Company";
  import ProjectPagerSelection from "../../project/Selection.vue";

  export default {

    data () {
      return {
        torch: new Torch(),
        project: new Project(),
        pager: new Pager(Project),
        company: new Company(),
        cPager: new Pager(Company),
        selectProjectShow: false,
        user: this.$store.state.user,
        isHasProject: true
      }
    },
    components: {
      NbEditor,
      NbRadio,
      NbDateRange,
      NbSlidePanel,
      NbCheckbox,
      CreateSaveButton,
      ProjectPagerSelection
    },
    computed: {},
    watch: {
      "project.id"(newVal, oldVal) {
        let that = this;
        this.project.httpDetail(function () {
          that.torch.project.render(that.project);
          that.torch.unitHead = that.project.leader;
          that.torch.businessName = that.project.registeredCompanyName;
          that.torch.businessStartTime = that.project.registeredCompanyTime;
        });
        console.log("设置企业ID" + newVal);
        this.cPager.setFilter("projectId", newVal);
        this.cPager.httpFastPage(function () {
          if (that.cPager.totalItems === 0) {
            console.log("该项目没有企业！")
          } else {
            let companyId = that.cPager.companies[0].id;
            console.log("companyId" + companyId);
            that.company.id = companyId;
            that.company.httpDetail(function () {
              //如果该项目有企业，则将企业信息的数据回填进表单
              that.torch.businessName = that.company.name;
              that.torch.organizationCode = that.company.organizationCode;
              that.torch.businessStartTime = that.company.establishTime;
              that.torch.registrationType = that.company.registrationType;
              that.torch.technicalField = that.company.skillDirection;
              that.torch.registeredCapital = that.company.registeredCapital * 10;
              that.torch.expenditure = that.company.nationalFunding * 10;
              that.torch.employeesInBusiness = that.company.lastYearStaffNum;
              that.torch.doctor = that.company.doctorsNum;
              that.torch.juniorCollege = that.company.higherCollegeDegreeNum;
              that.torch.abroadStudent = that.company.overseasNum;
              that.torch.thousandPlan = that.company.thousandsPlanNum;
              that.torch.patentNumber = that.company.foreignPatentsNum;
              that.torch.transactionNumber = that.company.technicalContractNum;
              that.torch.transactionForehead = that.company.technicalContractTradingValue;
              that.torch.nationalProject = that.company.nationalProjectsNum;
              that.torch.provincialAward = that.company.provincialAwards;
            },function () {
              console.error("查询企业失败！");
            });
          }

        });
        if(newVal) {
          this.torch.httpDetailByProject(newVal, function () {},function () {});
        }

      }

    },
    methods: {
      save(){
        this.torch.httpSave(function () {

          Notification.success({
            message: '提交表单成功！'
          });

        });
      }
    },
    mounted(){
      //回填写关联单向字段3
      //统计负责人 单位负责人 填表人 联系电话
      this.torch.statisticsHead = this.user.nickname;
      this.torch.fillForm = this.user.nickname;
      this.torch.phone = this.user.phone;
      this.torch.id = this.$store.state.route.query.id;
      console.log(this.torch.id);
      if (this.torch.id) {
        this.torch.httpDetail(function () {
        });
      } else {
        let that = this;
        if (!that.torch.editMode) {
          this.pager.httpFastPage(function () {
            if (that.pager.totalItems === 0) {
              Notification.error({
                message: '你还没有项目，不能填写火炬统计,请联系您的社区经理。'
              });
              that.isHasProject = false;
            } else if (that.pager.totalItems > 1) {
              Notification.success({
                message: '检查到您有多个项目，请先选择项目。'
              });
              that.selectProjectShow = true;
            } else {
              let projectId = that.pager.projects[0].id;
              console.log("projectId" + projectId);
              that.project.id = projectId;
            }
          });
        } else {


        }
      }



    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  .torch-select {
    margin-top: 20px;
  }

  .torch-title {
    font-weight: bold;
  }

</style>
