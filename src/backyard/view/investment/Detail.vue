<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12">
        <LoadingFrame :loading="investment.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               v-if="investment.canEdit()"
               @click.stop.prevent="$router.push({path: 'edit', query: { id: investment.id }})">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                    <i class="fa fa-leaf"></i>
                    基本信息
                </span>
                <div slot="body">
                  <div class="col-md-6">
                    <div class="row mt10">
                      <div class="col-xs-4">公司名称：</div>
                      <div class="col-xs-8 f18 bold">{{investment.companyName}}</div>

                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">创建者：</div>
                      <div class="col-xs-8 bold"><UserProfileLink :user="investment.creator"/></div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">创建时间：</div>
                      <div class="col-xs-8 bold">{{investment.createTime | humanTime}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">关联项目：</div>
                      <div class="col-xs-8 bold">
                        <router-link :to="user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,investment.spaceRegional.id)? {path: '/by/project/detail', query: { id: investment.project.id }}: {path: '/group/project/detail', query: { id: investment.project.id }}">{{investment.project.name}}
                        </router-link>
                      </div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">组织机构代码/社会信用码：</div>
                      <div class="col-xs-8 bold">{{investment.organizationCode}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">实际负责人：</div>
                      <div class="col-xs-8 bold">{{investment.principal}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">负责人电话：</div>
                      <div class="col-xs-8 bold">{{investment.principalPhone}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">负责人邮箱：</div>
                      <div class="col-xs-8 bold">{{investment.principalEmail}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">联系人：</div>
                      <div class="col-xs-8 bold">{{investment.contacts}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">联系人电话：</div>
                      <div class="col-xs-8 bold">{{investment.contactsPhone}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">联系人邮箱：</div>
                      <div class="col-xs-8 bold">{{investment.contactsEmail}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">网站/APP：</div>
                      <div class="col-xs-8 bold">{{investment.webOrApp}}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <div class="col-xs-4">登记注册类型：</div>
                      <div class="col-xs-8 bold">{{investment.registrationType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">高新技术分类：</div>
                      <div class="col-xs-8 bold">{{investment.highTechType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">行业分类：</div>
                      <div class="col-xs-8 bold">{{investment.industryType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">创业企业特征：</div>
                      <div class="col-xs-8 bold">{{investment.enterpriseCharacteristics}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">专业技术方向：</div>
                      <div class="col-xs-8 bold">{{investment.skillDirection}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">主营产品：</div>
                      <div class="col-xs-8 bold">{{investment.mainProducts}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">市场分类：</div>
                      <div class="col-xs-8 bold">{{investment.marketType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">是否有关联公司：</div>
                      <div class="col-xs-8 bold">{{investment.isAffiliatedCompany === null ? "未填写" :
                        investment.isAffiliatedCompany ?"是":"否"}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">行业简介：</div>
                      <div class="col-xs-8 bold" v-show="investment.industryProfile.code"><NbTank :tank="investment.industryProfile" :edit="false"/></div>
                      <div class="col-xs-8 bold" style="color: red" v-show="!investment.industryProfile.code">未上传!</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">竞争对手：</div>
                      <div class="col-xs-8 bold" v-show="investment.competitor.code"><NbTank :tank="investment.competitor" :edit="false"/></div>
                      <div class="col-xs-8 bold" style="color: red" v-show="!investment.competitor.code">未上传!</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">商业模式：</div>
                      <div class="col-xs-8 bold" v-show="investment.businessModel.code"><NbTank :tank="investment.businessModel" :edit="false"/></div>
                      <div class="col-xs-8 bold" style="color: red" v-show="!investment.businessModel.code">未上传!</div>
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>

            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    股权结构
                </span>
                <div slot="body">
                  <NbSlidePanel type="primary" v-for="(equity,index) in investment.investmentEquities"  :key="equity.id">
                    <span slot="heading" class="">
                      <i class="fa"></i>
                      股权结构 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">股东类型</div>
                          <div class="col-xs-8 bold">{{equity.shareholderType}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">股东名称</div>
                          <div class="col-xs-8 bold">{{equity.shareholderName}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">证件类型</div>
                          <div class="col-xs-8 bold">{{equity.docType}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">证件号码</div>
                          <div class="col-xs-8 bold">{{equity.idNo}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">所占股份（股）</div>
                          <div class="col-xs-8 bold">{{equity.stockProportion}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">投资总额（万元）</div>
                          <div class="col-xs-8 bold">{{equity.totalInvestment}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">第一投资时间</div>
                          <div class="col-xs-8 bold">{{equity.firstInvestmentTime | humanTime}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row mt10">
                          <div class="col-xs-4">上市企业占股份总和（%）</div>
                          <div class="col-xs-8 bold">{{equity.listStockProportion}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">外资部分占股份总和</div>
                          <div class="col-xs-8 bold">{{equity.foreignCapitalProportion}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否入选千人计划: </div>
                          <div class="col-xs-8 bold">{{equity.isThousandPlan === null ? "未填写" :
                            equity.isThousandPlan ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否上市公司: </div>
                          <div class="col-xs-8 bold">{{equity.isList === null ? "未填写" :
                            equity.isList ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否风险投资: </div>
                          <div class="col-xs-8 bold">{{equity.isRiskInvestmentEnterprise === null ? "未填写" :
                            equity.isRiskInvestmentEnterprise ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否境外公司: </div>
                          <div class="col-xs-8 bold">{{equity.isAbroad === null ? "未填写" :
                            equity.isAbroad ?"是":"否"}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    人员结构
                </span>
                <div slot="body">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-xs-6">上年年末从业人员总数：</div>
                      <div class="col-xs-6 bold">{{investment.lastYearStaffNum}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-6">留学归国人数：</div>
                      <div class="col-xs-6 bold">{{investment.overseasNum}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-6">全职人员数：</div>
                      <div class="col-xs-6 bold">{{investment.fullTimeNum}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-6">兼职人数：</div>
                      <div class="col-xs-6 bold">{{investment.partTimeJobNum}}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <div class="col-xs-6">博士毕业人数：</div>
                      <div class="col-xs-6 bold">{{investment.doctorsNum}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-6">千人计划数：</div>
                      <div class="col-xs-6 bold">{{investment.thousandsPlanNum}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-6">大专以上毕业人数：</div>
                      <div class="col-xs-6 bold">{{investment.higherCollegeDegreeNum}}</div>
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    核心团队人员情况
                </span>
                <div slot="body">
                  <NbSlidePanel type="primary" v-for="(core,index) in investment.investmentCores" :key="core.id">
                    <span slot="heading" class="">
                        <i class="fa"></i>
                        团队成员 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">姓名</div>
                          <div class="col-xs-8 bold">{{core.name}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">部门</div>
                          <div class="col-xs-8 bold">{{core.department}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">职位</div>
                          <div class="col-xs-8 bold">{{core.position}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">电话</div>
                          <div class="col-xs-8 bold">{{core.telephone}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">传真</div>
                          <div class="col-xs-8 bold">{{core.fax}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">手机</div>
                          <div class="col-xs-8 bold">{{core.phone}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">证件类型</div>
                          <div class="col-xs-8 bold">{{core.docType}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">证件号码</div>
                          <div class="col-xs-8 bold">{{core.docNo}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">电子邮件</div>
                          <div class="col-xs-8 bold">{{core.mail}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">学历</div>
                          <div class="col-xs-8 bold">{{core.education}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">人才落户政策</div>
                          <div class="col-xs-8 bold"><NbTank :tank="core.settlePolicy" :edit="false"/></div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">其他人才政策</div>
                          <div class="col-xs-8 bold"><NbTank :tank="core.otherPolicy" :edit="false"/></div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">目前最高职称</div>
                          <div class="col-xs-8 bold">{{core.highestTitle}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">初次工作年份</div>
                          <div class="col-xs-8 bold">{{core.firstWorkingYear}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">创业者特征</div>
                          <div class="col-xs-8 bold">{{core.features}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">千人计划批次号</div>
                          <div class="col-xs-8 bold">{{core.thousandPlanCode}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否千人计划:</div>
                          <div class="col-xs-8 bold">{{core.isThousandPlan === null ? "未填写" :
                            core.isThousandPlan ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否本公司股东:</div>
                          <div class="col-xs-8 bold">{{core.isShareholder === null ? "未填写" :
                            core.isShareholder ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否实际负责人:</div>
                          <div class="col-xs-8 bold">{{core.isPersonLiable === null ? "未填写" :
                            core.isPersonLiable?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否连续创业:</div>
                          <div class="col-xs-8 bold">{{core.isContinuous === null ? "未填写" :
                            core.isContinuous ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否海外引进:</div>
                          <div class="col-xs-8 bold">{{core.isOverseas === null ? "未填写" :
                            core.isOverseas ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否浦江人才:</div>
                          <div class="col-xs-8 bold">{{core.isPujiangTalent === null ? "未填写" :
                            core.isPujiangTalent ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否大学生科技企业:</div>
                          <div class="col-xs-8 bold">{{core.isCollegeScience === null ? "未填写" :
                            core.isCollegeScience ?"是":"否"}}
                          </div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">个人简历</div>
                          <div class="col-xs-8 bold"><NbTank :tank="core.resume" :edit="false"/></div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    财务情况
                </span>
                <div slot="body" >
                  <NbSlidePanel type="primary" v-for="(finance,index) in investment.investmentFinances" :key="finance.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      财务详情 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="col-md-6">
                        <div class="row mt10">
                          <div class="col-xs-6">年份：</div>
                          <div class="col-xs-6 bold">{{finance.year}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">年末总资产（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.endYearAssets}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">年末负债总额（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.endYearLiabilities}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">年末固定资产总额（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.endYearFixedAssets}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">年末未完成固定资产投资额（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.endYearFixedInvestment}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">工业总产值（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.industryValue}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">高新技术产品产值（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.industryValueHigh}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">自主知识产权产品产值（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.industryValueKnowledge}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">出口创汇（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.exportEarnings}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">营业收入（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.businessIncome}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">主营业收入（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.businessIncomeMain}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">高新技术产品销售收入（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.businessIncomeHigh}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">增加值（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.addedValue}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">劳动者报酬（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.laborRemuneration}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">固定资产折旧（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.depreciation}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">生成税净额（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.generateTax}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row mt10">
                          <div class="col-xs-6">营业盈余（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.operatingSurplus}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">当年R&D投入（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.rdInvestment}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">当年高新技术产品出口额（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.rdInvestmentHighExports}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">税后利润（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.afterTaxProfit}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际上缴税费（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.taxPaid}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际上缴增值税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.taxPaidValueAdded}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际上缴营业税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.taxPaidBusiness}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际上缴所得税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.taxPaidIncome}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际上缴个人所得税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.taxPaidIndividualIncome}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际上缴其他税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.taxPaidOther}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际减免税费总额（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.reductionTax}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际减免增值税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.reductionTaxValueAdded}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际减免营业税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.reductionTaxBusiness}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">实际减免所得税（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.reductionTaxIncome}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">研发加计扣除减免（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.reductionTaxIndividualIncome}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">高新技术企业专项减免（万元）：</div>
                          <div class="col-xs-6 bold">{{finance.reductionTaxHigh}}</div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    专利产权
                </span>
                <div slot="body">

                  <NbSlidePanel type="primary">
                    <span slot="heading" >基本信息</span>
                    <div slot="body">
                      <div class="col-xs-6">
                        <div class="row mt10">
                          <div class="col-xs-6">当年承担国家级科技计划数：</div>
                          <div class="col-xs-6 bold">{{investment.nationalNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">当年获得省级以上奖励（万元）：</div>
                          <div class="col-xs-6 bold">{{investment.provincialAwards}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">购买（被许可）国外专利数：</div>
                          <div class="col-xs-6 bold">{{investment.foreignPatentsNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">技术合同交易数：</div>
                          <div class="col-xs-6 bold">{{investment.technicalContractNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">技术合同交易额（万元）：</div>
                          <div class="col-xs-6 bold">{{investment.technicalContractTradingValue}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">研发加计备案数：</div>
                          <div class="col-xs-6 bold">{{investment.rdRecordNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">累计工程中心数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectCenterNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">其中累计国家级工程中心数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectCenterNationalNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">其中累计省级工程中心数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectCenterProvinceNum}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row mt10">
                          <div class="col-xs-6">其中累计市级工程中心数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectCenterCityNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">累计项目数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">其中累计国家级项目数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectNationalNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">其中累计省级项目数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectProvinceNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">其中累计市级项目数量：</div>
                          <div class="col-xs-6 bold">{{investment.projectCityNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">累计获得国家资助经费金额：</div>
                          <div class="col-xs-6 bold">{{investment.nationalFunding}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">累计获得省级资助经费金额：</div>
                          <div class="col-xs-6 bold">{{investment.provinceFunding}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">累计获得市级资助经费金额：</div>
                          <div class="col-xs-6 bold">{{investment.cityFunding}}</div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>

                  <NbSlidePanel type="primary" v-for="(investmentPatentCopyright,index) in investment.investmentPatentCopyrights"  :key="investmentPatentCopyright.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      专利产权 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="row mt10">
                        <div class="col-xs-6">
                          <div class="col-xs-6 bold">年份：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.year}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row mt10">
                          <div class="col-xs-6">当年知识产权申请数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.intellectualApplyNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">当年知识产权授权数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.authorizationNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">拥有有效知识产权数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.effectiveIntellectualNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">软件著作权登记数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.softwareCopyrightNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">集成电路布图设计登记数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.integratedCircuitNum}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row mt10">
                          <div class="col-xs-6">其中发明专利申请数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.intellectualInventionApplyNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">其中发明专利授权数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.authorizationInventionNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">发明专利数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.effectiveIntellectualInventionNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">植物新品种：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.newPlantNum}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">其他知识产权登记数：</div>
                          <div class="col-xs-6 bold">{{investmentPatentCopyright.otherPowerNum}}</div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>

                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    投融资
                </span>
                <div slot="body">
                  <NbSlidePanel type="primary" v-for="(invest,index) in investment.investmentFinancings"  :key="invest.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      投融资详情 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-6">接受投资时间</div>
                          <div class="col-xs-6 bold">{{invest.investmentTime | humanTime}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">投资人</div>
                          <div class="col-xs-6 bold">{{invest.investmentPeople}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">投资金额（万元）</div>
                          <div class="col-xs-6 bold">{{invest.investmentValue}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-6">占股权比重</div>
                          <div class="col-xs-6 bold">{{invest.shareRatio}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">账面估值（万元）</div>
                          <div class="col-xs-6 bold">{{invest.valuation}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-6">是否属于孵化基金</div>
                          <div class="col-xs-6 bold">
                            {{invest.isHatchFund === null ? "未填写" :
                            invest.isHatchFund ?"是":"否"}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    知识产权
                </span>
                <div slot="body">
                  <NbSlidePanel type="primary" v-for="(intellect,index) in investment.investmentIntellectuals" :key="intellect.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      知识产权详情 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">知识产权类型</div>
                          <div class="col-xs-8 bold">{{intellect.intellectualType}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">发生时间</div>
                          <div class="col-xs-8 bold">{{intellect.occurrenceTime | humanTime}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">编号</div>
                          <div class="col-xs-8 bold">{{intellect.intellectualNo}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">附件</div>
                          <div class="col-xs-8 bold"><NbTank :tank="intellect.attachment" :edit="false"/></div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">名称</div>
                          <div class="col-xs-8 bold">{{intellect.intellectualName}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">状态</div>
                          <div class="col-xs-8 bold">{{intellect.intellectualStatus}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">是否有效:</div>
                          <div class="col-xs-8 bold">{{intellect.isEffective === null ? "未填写" :
                            intellect.isEffective ?"是":"否"}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>
                </div>
              </NbSlidePanel>
            </div>

            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                    <i class="fa fa-leaf"></i>
                    比赛获奖信息
                </span>
                <div slot="body">
                  <NbSlidePanel type="primary" v-for="(honor,index) in investment.investmentHonors" :key="honor.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      比赛获奖信息 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">荣誉信息</div>
                          <div class="col-xs-8 bold">{{honor.honorInformation}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">编号</div>
                          <div class="col-xs-8 bold">{{honor.no }}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">获奖年份</div>
                          <div class="col-xs-8 bold">{{honor.awardTime | humanTime }}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">复核/验收年份</div>
                          <div class="col-xs-8 bold">{{honor.checkTime | humanTime }}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">基本信息</div>
                          <div class="col-xs-8 bold">{{honor.essentialInformation}}</div>
                        </div>
                      </div>
                    </div>
                  </NbSlidePanel>
                </div>
              </NbSlidePanel>
            </div>

            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                    <i class="fa fa-leaf"></i>
                    上传FA协议
                </span>
                <div slot="body">
                  <div class="row">
                    <div class="col-xs-4 bold">上传FA协议:</div>
                    <div class="col-xs-8 ">
                      <NbTank :tank="investment.protocol"/>
                    </div>
                  </div>
                  <div class="row pull-right">
                    <div class="col-xs-12">
                      <SubmitButton :loading="investment.loading" :callback="upload"/>
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>

            <div class="col-xs-12">
              <div ref="flowNode">
                <MessageNotifyView ref="messageNotifyView" :entity="investment"/>
              </div>
            </div>

            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                    <i class="fa fa-registered"></i>
                    项目评分
                </span>
                <div slot="body">
                 <div class="col-xs-12" >
                   <div class="row">
                     <div class="col-xs-3 bold">团队</div>
                     <div class="col-xs-9 ">
                       <i style="padding-right: 8px;" v-for="(star,index) in teamStars" :class="star+' f20 '" @click="check(index)" track-by="index"></i><!--性能优化 track-by 数据不改变时不会重新渲染-->
                     </div>
                   </div>
                   <div class="row mt10">
                     <div class="col-xs-3 bold">行业</div>
                     <div class="col-xs-9 ">
                       <i style="padding-right: 8px;;" v-for="(star,index) in industryStars" :class="star+' f20 '" @click="checkIndustry(index)" track-by="index"></i><!--性能优化 track-by 数据不改变时不会重新渲染-->
                     </div>
                   </div>
                   <div class="row mt10">
                     <div class="col-xs-3 bold">技术</div>
                     <div class="col-xs-9">
                       <i style="padding-right: 8px;" v-for="(star,index) in technologyStars" :class="star+' f20 '" @click="checkTechnology(index)" track-by="index"></i><!--性能优化 track-by 数据不改变时不会重新渲染-->
                     </div>
                   </div>
                   <div class="row mt10">
                     <div class="col-xs-3 bold">财务</div>
                     <div class="col-xs-9 ">
                       <i style="padding-right: 8px;" v-for="(star,index) in financeStars" :class="star+' f20 '" @click="checkFinance(index)" track-by="index"></i><!--性能优化 track-by 数据不改变时不会重新渲染-->
                     </div>
                   </div>
                   <div class="row mt10">
                     <div class="col-xs-3 bold">评论</div>
                     <div class="col-xs-8 ">
                       <textarea rows="6" class="form-control" v-model="comment"></textarea>
                     </div>
                   </div>
                   <div class="row mt10" v-show="investment.errorMessage">
                     <div class="alert alert-danger">
                       {{investment.errorMessage}}
                     </div>
                   </div>
                   <div class="row mt10 pull-right">
                       <SubmitButton :loading="investment.loading" :callback="submit"/>
                   </div>

                 </div>

                    <div class="col-xs-12 mt10">
                      <div  v-for="assess in investment.investmentAssesses">
                        <div class="alert alert-danger">
                          <h4>{{assess.creator.nickname}}</h4>
                          <div>
                            团队:<span v-for="t in assess.team"><i class="fa fa-star f20 text-warning"></i></span>
                            行业:<span v-for="i in assess.industry"><i class="fa fa-star f20 text-warning"></i></span>
                            技术:<span v-for="c in assess.technology"><i class="fa fa-star f20 text-warning"></i></span>
                            财务:<span v-for="a in assess.finance"><i class="fa fa-star f20 text-warning"></i></span>
                          </div>
                          <div v-show="assess.comment">评价：{{assess.comment}}</div>
                        </div>
                      </div>
                    </div>

                </div>
              </NbSlidePanel>
            </div>

          </div>
          <div class="row">
            <div class="col-xs-12 text-center" v-if="investment.loading">
              <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            </div>
          </div>

        </LoadingFrame>
      </div>
      <div class="col-xs-12 text-right">
        <!--<a title="转发至QQ" charset="400-03-8" id="qq"-->
           <!--href="http://connect.qq.com/widget/shareqq/index.html?url=https://fontawesome.com/v4.7.0/icon/star-o/&site=QQ分享"-->
           <!--target="_blank"><i class="fa fa-quora f12"></i><i class="fa fa-quora f12"></i></a>-->
        <!--<a title="转发至新浪微博" charset="400-03-10" id="s_sina"-->
           <!--href="http://v.t.sina.com.cn/share/share.php?appkey=2684493555&url=https://fontawesome.com/v4.7.0/icon/star-o/&title= &source=&sourceUrl="-->
           <!--target="_blank"><img src="http://static.youku.com/v1.0.0691/v/img/ico_sina.gif" /></a>-->
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>

  </div>
</template>
<script>
  import {Notification,NotificationBox} from 'element-ui';
  import NbTank from '../../../common/widget/NbTank'
  import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'

  import LoadingFrame from "../widget/LoadingFrame";
  import UserProfileLink from "../widget/UserProfileLink";
  import Investment from "../../../common/model/investment/Investment";
  import SubmitButton from '../widget/SubmitButton.vue'
  import MessageNotifyView from "../message/notify/MessageNotifyView";


  export default {

    data () {
      return {
        investment: new Investment(),
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        comment:null,
        team: null,
        industry: null,
        technology:null,
        finance: null,
        score: 5,
        teamStars:["fa fa-star","fa fa-star","fa fa-star","fa fa-star","fa fa-star"],
        industryStars:["fa fa-star","fa fa-star","fa fa-star","fa fa-star","fa fa-star"],
        technologyStars:["fa fa-star","fa fa-star","fa fa-star","fa fa-star","fa fa-star"],
        financeStars:["fa fa-star","fa fa-star","fa fa-star","fa fa-star","fa fa-star"]
      }
    },
    components: {
      NbTank,
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink,
      SubmitButton,
      MessageNotifyView
    },
    computed:{

    },
    methods: {
      check(index){
        let result = [];
        for(let i = 0; i < this.score; i++){
          if(i < index + 1){
            this.star = "fa fa-star text-warning";
            result.push(this.star);
          }else{
            result.push("fa fa-star")
          }
        }
        this.teamStars = result;
        this.team = index + 1;
      },
      checkIndustry(index){
        let result = [];
        for(let i = 0; i < this.score; i++){
          if(i < index + 1){
            this.star = "fa fa-star text-warning";
            result.push(this.star);
          }else{
            result.push("fa fa-star")
          }
        }
        this.industryStars = result;
        this.industry = index + 1;
      },
      checkTechnology(index){
        let result = [];
        for(let i = 0; i < this.score; i++){
          if(i < index + 1){
            this.star = "fa fa-star text-warning";
            result.push(this.star);
          }else{
            result.push("fa fa-star")
          }
        }
        this.technologyStars = result;
        this.technology = index + 1;
      },
      checkFinance(index){
        let result = [];
        for(let i = 0; i < this.score; i++){
          if(i < index + 1){
            this.star = "fa fa-star text-warning";
            result.push(this.star);
          }else{
            result.push("fa fa-star")
          }
        }
        this.financeStars = result;
        this.finance = index + 1;
      },
      submit(){
        let that = this;
        if (!this.team) {
          this.investment.errorMessage = "请给团队评分！";
          return;
        }
        if (!this.industry) {
          this.investment.errorMessage  = "请给行业评分！";
          return;
        }
        if (!this.technology) {
          this.investment.errorMessage  = "请给技术评分！";
          return;
        }
        if (!this.finance) {
          this.investment.errorMessage  = "请给财务评分！";
          return;
        }
        this.investment.errorMessage = null;
        this.investment.httpAssess(this.team,this.industry,this.technology,this.finance,this.comment,function () {
          Notification.success({
            message:  '提交评价成功！'
          });
          that.refresh();
        })
      },
      upload(){
        let that = this;
        this.investment.httpUploadProtocol(function () {
          Notification.success({
            message: '附件修改成功！'
          });
          that.refresh();
        });
      },
      refresh(){
        let that = this;
        this.investment.id = this.$store.state.route.query.id;
        if (this.investment.id) {
          this.investment.httpDetail();
        }
      },
      refreshEvent(){
        this.$refs.messageNotifyView.refresh();
      }
    },
    mounted(){
      let that = this;
      this.refresh();
      this.refreshEvent();
    }
  }
</script>
