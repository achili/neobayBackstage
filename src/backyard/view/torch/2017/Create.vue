<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span>2017年火炬统计填报表</span>
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
          <ol>
            <li>
              <span class="torch-title">企业登记注册类型：</span>企业应根据国家统计局与国家工商行政管理局联合制定的《关于划分企业登记注册类型的规定》按本企业在工商行政管理部门登记注册的类型填写。
            </li>
            <li>
              <span class="torch-title">行业类别：</span>主要反映企业经济活动性质。按照《国民经济行业分类与代码》（国家标准）填写。多种经济活动并存时，请填写最主要的一类。
            </li>
            <li>
              <span class="torch-title">高新技术企业：</span>指经省、自治区、直辖市、计划单列市高新技术企业认定管理机构认定，获得高新技术企业证书，并在有效期内的企业。
            </li>
            <li>
              <span class="torch-title">连续创业者：</span>指创业超过一次以上的创业者。
            </li>
            <li>
              <span class="torch-title">净利润：</span>指企业报告期实现的利润在上缴国家所得税后的剩余部份（亏损以“－”表示）。
            </li>
            <li>
              <span class="torch-title">出口总额：</span>指企业在报告期内，企业出售给外贸部门或直接出售给外商的产品或商品的总金额。包括来料加工装配出口、境外技术合同实现金额及在国内以外汇计价的商品出售额等。
            </li>
            <li>
              <span class="torch-title">研究与实验发展经费（R&D）经费支出：</span>指企业在报告期内，企业科技活动经费支出中用于基础研究、应用研究和实验发展三类项目以及这三类项目的管理和服务费用的总支出。不论何种经费来源，只要实际用于上述三类项目经费支出都应计算在内。
            </li>
            <li>
              <span class="torch-title">实际上缴税费：</span>指企业在报告期内实际上缴的各项税金、特种基金和附加费等。
            </li>
            <li>
              <span class="torch-title">人员数目：</span>
              <ul type="disc">
                <li>
                  <span class="torch-title">从业人员：</span>指企业在报告期内，企业的工作人员总数。
                </li>
                <li>
                  <span class="torch-title">吸纳应届大学毕业生：</span>指企业在报告期内，企业内聘用的应届大专以上学历的人员总数。
                </li>
              </ul>
            </li>
            <li>
              <span class="torch-title">知识产权专利：</span>
              <ul type="disc">
                <li>
                  <span class="torch-title">当年知识产权申请数：</span>指企业在报告期内，企业申报各类知识产权保护的总数。
                </li>
                <li>
                  <span class="torch-title">当年知识产权授权数：</span>指企业在报告期内，企业获批准的各类知识产权保护的总数。
                </li>
                <li>
                  <span class="torch-title">拥有有效知识产权数：</span>指报告期末企业拥有的经国内外知识产权行政部门授权且在有效期内的各类知识产权的总数。
                </li>
                <li>
                  <span class="torch-title">发明专利：</span>指报告期末企业拥有的经国内外知识产权行政部门授权且在有效期内的发明专利的总数
                </li>
                <li>
                  <span class="torch-title">软件著作权：</span>指报告期末企业拥有的经国务院知识产权行政部门按照《中华人民共和国计算机软件保护条例》对计算机程序和文档授予的著作权的总数。
                </li>
                <li>
                  <span class="torch-title">购买国外专利：</span>指企业在报告期内,购买的全部国外的技术专利数。
                </li>
              </ul>
            </li>
            <li>
              <span class="torch-title">技术合同交易数量：</span>指企业在报告期内在科技部门和商务部门进行认定和登记的技术合同数量。技术合同的类型包括四类：技术开发、技术转让、技术咨询和技术服务。技术合同的类型不包括获得国家和省市各类支持计划所签订的合同。
            </li>
            <li>
              <span class="torch-title">技术合同交易额：</span>指企业在报告期内在科技部门和商务部门进行认定和登记的技术合同成交项目的总金额。技术合同的类型包括四类：技术开发、技术转让、技术咨询和技术服务。技术合同的类型不包括获得国家和省市各类支持计划所签订的合同。
            </li>
            <li>
              <span class="torch-title">当年承担国家级科技计划项目数：</span>指企业在报告期内承担中央政府部门下达的科技项目数量。中央政府部门下达的科技项目种类，包含国家科技重大专项，国家自然科学基金，国家重点研发计划，技术创新引导专项（基金）以及基地和人才专项，不包括地方审批的各类项目。
            </li>
            <li>
              <span class="torch-title">当年获得省级以上奖励：</span>指企业在报告期内，获得各类省级以上科技奖励的数量。
            </li>
          </ol>
        </div>
        <div>
          PS
          <ul>
            <li>2017年国民经济行业类型。<a href="http://www.stats.gov.cn/tjsj/tjbz/hyflbz/201710/P020171220358908336080.pdf">http://www.stats.gov.cn/tjsj/tjbz/hyflbz/201710/P020171220358908336080.pdf</a> </li>
            <li>企业登记注册类型<a href="http://www.gov.cn/zwgk/2011-11/17/content_1995548.htm">http://www.gov.cn/zwgk/2011-11/17/content_1995548.htm</a> </li>
            <li>金额单位为<b>“千元”</b>，请勿混乱。</li>
          </ul>
        </div>
      </NbSlidePanel>

      <NbSlidePanel v-if="selectProjectShow">
        <span slot="heading" class="text-success f16">
            <i class="fa fa-leaf"></i>
            选择项目
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
          <label class="control-label compulsory">5 企业登记注册类型</label>
          <input type="text" class="form-control" v-model="torch.registrationType">
        </div>

        <div class="form-group torch-select">
          <div>
            <label class="control-label compulsory">6 行业分类</label>
          </div>

          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="节能环保" name="9"></NbRadio>
            <label>节能环保</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="新兴信息产业" name="9"></NbRadio>
            <label>新兴信息产业</label>
          </div>

          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="生物医药" name="9"></NbRadio>
            <label>生物医药</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="新能源" name="9"></NbRadio>
            <label>新能源</label>
          </div>

          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="新能源汽车" name="9"></NbRadio>
            <label>新能源汽车</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="高端装备制造业" name="9"></NbRadio>
            <label>高端装备制造业</label>
          </div>

          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="新材料" name="9"></NbRadio>
            <label>新材料</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="人工智能" name="9"></NbRadio>
            <label>人工智能</label>
          </div>

          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="大健康" name="9"></NbRadio>
            <label>大健康</label>
          </div>
          <div class="col-xs-6 torch-select">
            <NbRadio v-model="torch.industryCategory" val="电子信息" name="9"></NbRadio>
            <label>电子信息</label>
          </div>

          <div class="col-xs-12 torch-select">
            <NbRadio v-model="torch.industryCategory" val="其它" name="9"></NbRadio>
            <label>其它</label>
          </div>

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
            <NbRadio v-model="torch.technicalField" val="其它" name="7"></NbRadio>
            <label>其它</label>
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
            <div class="col-md-8 mt20">
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
          <div>
            <label class="control-label compulsory torch-select">13 企业主要负责人创业特征</label>
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
            <label class="control-label compulsory torch-select">14 企业主要负责人是否为连续创业者</label>
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
          <label class="control-label compulsory torch-select">15 企业主要负责人性别</label>
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
          <label class="control-label compulsory torch-select">16 获得天使或风险投资额（千元）</label>
          <input type="text" class="form-control" v-model="torch.investmentAmount">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">17 占用孵化器场地面积（平方米）</label>
          <input type="text" class="form-control" v-model="torch.incubatorArea">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">18 企业成立时注册资本（千元）</label>
          <input type="text" class="form-control" v-model="torch.registeredCapital">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">19 在孵企业总收入（千元）</label>
          <input type="text" class="form-control" v-model="torch.totalIncome">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">20 在孵企业净利润（千元）</label>
          <input type="text" class="form-control" v-model="torch.netProfit">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">21 在孵企业出口总额（千元）</label>
          <input type="text" class="form-control" v-model="torch.totalImport">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">22 在孵企业研究与实验发展（R&D）经费支出（千元）</label>
          <input type="text" class="form-control" v-model="torch.expenditure">
        </div>

        <div class="form-group">
          <label class="control-label compulsory torch-select">23 在孵企业实际上缴税费（千元）</label>
          <input type="text" class="form-control" v-model="torch.payFees">
        </div>

        <div class="form-group">
          <div>
            <label class="form-group compulsory">24 企业从业人员情况（个）</label>
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
            <label class="form-group compulsory torch-select">25 企业知识产权情况（件）</label>
          </div>
          <div class="col-xs-4">
            <label class="control-label">当年知识产权申请数（件）</label>
            <input type="text" class="form-control" v-model="torch.applicationNumber">
          </div>
          <div class="col-xs-4">
            <label class="control-label">当年知识产权授权数（件）</label>
            <input type="text" class="form-control" v-model="torch.authorizedNumber">
          </div>
          <div class="col-xs-4">
            <label class="control-label">拥有有效知识产权数（件）</label>
            <input type="text" class="form-control" v-model="torch.propertyRightNumber">
          </div>

          <div class="col-xs-4">
            <label class="control-label">发明专利（件）</label>
            <input type="text" class="form-control" v-model="torch.patent">
          </div>
          <div class="col-xs-4">
            <label class="control-label">软件著作权（件）</label>
            <input type="text" class="form-control" v-model="torch.softwareCopyRight">
          </div>
          <div class="col-xs-4">
            <label class="control-label">植物新品种（个）</label>
            <input type="text" class="form-control" v-model="torch.plantVariety">
          </div>

          <div class="col-xs-4">
            <label class="control-label">集成电路布图（个）</label>
            <input type="text" class="form-control" v-model="torch.circuitLayout">
          </div>
          <div class="col-xs-4">
            <label class="control-label">购买国外专利数（件）</label>
            <input type="text" class="form-control" v-model="torch.patentNumber">
          </div>
          <div class="col-xs-4">
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
            <label class="form-group compulsory torch-select">26 统计信息</label>
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
  import Torch from '../../../../common/model/torch/Torch2017'
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
