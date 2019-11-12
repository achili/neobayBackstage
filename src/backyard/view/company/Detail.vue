<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-xs-12">
        <LoadingFrame :loading="company.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               v-if="company.canEdit()"
               @click.stop.prevent="$router.push({path: 'edit', query: { id: company.id }})">
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
                      <div class="col-xs-8 f18 bold">{{company.name}}</div>
                    </div>

                    <div class="row mt10">
                      <div class="col-xs-4">创建者：</div>
                      <div class="col-xs-8 bold"><UserProfileLink :user="company.creator"/></div>
                    </div>

                    <div class="row mt10">
                      <div class="col-xs-4">创建时间：</div>
                      <div class="col-xs-8 bold">{{company.createTime | humanTime}}</div>
                    </div>

                    <div class="row mt10">
                      <div class="col-xs-4">关联项目：</div>
                      <div class="col-xs-8 bold">
                        <router-link :to="user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,company.spaceRegional.id)? {path: '/by/project/detail', query: { id: company.project.id }}: {path: '/group/project/detail', query: { id: company.project.id }}">{{company.project.name}}
                        </router-link>
                      </div>
                    </div>

                    <div class="row mt10">
                      <div class="col-xs-4">组织机构代码/社会信用码：</div>
                      <div class="col-xs-8 bold">{{company.organizationCode}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">实际负责人：</div>
                      <div class="col-xs-8 bold">{{company.responsiblePerson}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">负责人电话：</div>
                      <div class="col-xs-8 bold">{{company.responsiblePersonPhone}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">负责人邮箱：</div>
                      <div class="col-xs-8 bold">{{company.responsiblePersonMail}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">联系人：</div>
                      <div class="col-xs-8 bold">{{company.contacts}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">联系人电话：</div>
                      <div class="col-xs-8 bold">{{company.contactsPhone}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">联系人邮箱：</div>
                      <div class="col-xs-8 bold">{{company.contactsMail}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">租赁面积：</div>
                      <div class="col-xs-8 bold">{{company.leaseArea}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">登记注册类型：</div>
                      <div class="col-xs-8 bold">{{company.registrationType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">网站/APP：</div>
                      <div class="col-xs-8 bold">{{company.webOrApp}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">法人代表姓名：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonName}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">法人代表性别：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonSex === null ? "未填写" :
                            company.legalPersonSex === "female" ? "女":"男"}}</div>
                      </div>
                    <div class="row mt10">
                      <div class="col-xs-4">法人证件类型：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonDocType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">法人证件号：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonDocNo}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">法人身份证住址：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonIdentityCardAddress}}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row mt10">
                      <div class="col-xs-4">法人联系电话：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonPhone}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">法人任职时间：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonServingTime | humanTime}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">法人最高学历：</div>
                      <div class="col-xs-8 bold">{{company.legalPersonDegree}}</div>
                    </div>
<!--                    <div class="row mt10">-->
<!--                      <div class="col-xs-4">法人简历：</div>-->
<!--                      <div class="col-xs-8 bold"><NbTank :tank="company.legalPersonTrade" :edit="false"/></div>-->
<!--                    </div>-->
                    <div class="row mt10">
                      <div class="col-xs-4">注册地区/县：</div>
                      <div class="col-xs-8 bold">{{company.registeredArea}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">注册资金：</div>
                      <div class="col-xs-8 bold">{{company.registeredCapital}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">办公地址：</div>
                      <div class="col-xs-8 bold">{{company.officeAddress}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">高新技术分类：</div>
                      <div class="col-xs-8 bold">{{company.highTechType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">创业企业特征：</div>
                      <div class="col-xs-8 bold">{{company.enterpriseCharacteristics}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">专业技术方向：</div>
                      <div class="col-xs-8 bold">{{company.skillDirection}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">主营产品：</div>
                      <div class="col-xs-8 bold">{{company.mainProducts}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">基本信息备注：</div>
                      <div class="col-xs-8 bold">{{company.basicNotes}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">成立时间：</div>
                      <div class="col-xs-8 bold">{{company.establishTime | humanTime}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">注册地址: </div>
                      <div class="col-xs-8 bold">{{company.registeredAddress}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">所属基地：</div>
                      <div class="col-xs-8 bold">{{company.subordinateBase}}</div>
                    </div>

                    <div class="row mt10">
                      <div class="col-xs-4">办公地邮政编码：</div>
                      <div class="col-xs-8 bold">{{company.officePostcode}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">行业分类：</div>
                      <div class="col-xs-8 bold">{{company.industryType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">市场分类：</div>
                      <div class="col-xs-8 bold">{{company.marketType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">孵化状态：</div>
                      <div class="col-xs-8 bold">{{company.hatchState}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">品牌商标：</div>
                      <div class="col-xs-8 bold"><NbTank :tank="company.brandTrademark" :edit="false"/></div>
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                    <i class="fa fa-leaf"></i>
                    附加信息
                </span>
                <div slot="body">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-xs-4">证券代码：</div>
                      <div class="col-xs-8 bold">{{company.listedSecurityCode}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">上市时间：</div>
                      <div class="col-xs-8 bold">{{company.listedTime | humanTime}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">上市市场：</div>
                      <div class="col-xs-8 bold">{{company.listedMarket}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">总股本（股）：</div>
                      <div class="col-xs-8 bold">{{company.listedStockNum}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">年底市值（万元）：</div>
                      <div class="col-xs-8 bold">{{company.listedMarketValue}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">机构类型：</div>
                      <div class="col-xs-8 bold">{{company.taxOrganizationType}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">经营范围（按营业执照）：</div>
                      <div class="col-xs-8 bold">{{company.taxBusinessScope}}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-xs-4">退市时间：</div>
                      <div class="col-xs-8 bold">{{company.listedDelistingTime | humanTime}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">开户银行：</div>
                      <div class="col-xs-8 bold">{{company.bank}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">开户名：</div>
                      <div class="col-xs-8 bold">{{company.bankAccountName}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">银行账号：</div>
                      <div class="col-xs-8 bold">{{company.bankAccountNo}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">税务登记号：</div>
                      <div class="col-xs-8 bold">{{company.taxCode}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">备注：</div>
                      <div class="col-xs-8 bold">{{company.listedNotes}}</div>
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
                  <NbSlidePanel type="primary" v-for="(equity,index) in company.companyEquities"  :key="equity.id">
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
                          <div class="col-xs-8 bold">{{equity.isRiskInvestmentEnterprisen === null ? "未填写" :
                            equity.isRiskInvestmentEnterprisen ?"是":"否"}}
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
                        <div class="col-xs-6 bold">{{company.lastYearStaffNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">应届毕业生：</div>
                        <div class="col-xs-6 bold">{{company.freshGraduateNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">留学归国人数：</div>
                        <div class="col-xs-6 bold">{{company.overseasNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">大专以上毕业人数：</div>
                        <div class="col-xs-6 bold">{{company.higherCollegeDegreeNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">博士毕业人数：</div>
                        <div class="col-xs-6 bold">{{company.doctorsNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">硕士毕业人数：</div>
                        <div class="col-xs-6 bold">{{company.masterNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">本科毕业人数：</div>
                        <div class="col-xs-6 bold">{{company.undergraduateNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">中专毕业人数：</div>
                        <div class="col-xs-6 bold">{{company.technicalSecondaryNum}}</div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row mt10">
                        <div class="col-xs-6">行政管理人员数：</div>
                        <div class="col-xs-6 bold">{{company.administrativePersonnelNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">市场营销人员数：</div>
                        <div class="col-xs-6 bold">{{company.marketingPersonaeNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">研发人员数：</div>
                        <div class="col-xs-6 bold">{{company.researchPersonnelNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">加工制造人员数：</div>
                        <div class="col-xs-6 bold">{{company.manufacturingPersonnelNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">千人计划数：</div>
                        <div class="col-xs-6 bold">{{company.thousandsPlanNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">高级职称人数：</div>
                        <div class="col-xs-6 bold">{{company.seniorTitleNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">中级职称人数：</div>
                        <div class="col-xs-6 bold">{{company.intermediateTitleNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">初级职称人数：</div>
                        <div class="col-xs-6 bold">{{company.primaryTitleNum}}</div>
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
                  <NbSlidePanel type="primary" v-for="(core,index) in company.companyCores" :key="core.id">
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
                  <NbSlidePanel type="primary" v-for="(finance,index) in company.companyFinances" :key="finance.id">
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
                    专利版权
                </span>
                <div slot="body">
                  <div v-for="companyIntellectualInformation in company.companyIntellectualInformations"  :key="companyIntellectualInformation.id">
                    <div class="col-md-6">
                      <div class="row mt10">
                        <div class="col-xs-6">年份：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.year}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">当年知识产权申请数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.intellectualApplyNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中发明专利申请数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.intellectualInventionApplyNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">当年知识产权授权数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.authorizationNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中发明专利授权数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.authorizationInventionNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">拥有有效知识产权数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.effectiveIntellectualNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">发明专利数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.effectiveIntellectualInventionNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">软件著作权登记数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.softwareCopyrightNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">植物新品种：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.newPlantNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">集成电路布图设计登记数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.integratedCircuitNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其他知识产权登记数：</div>
                        <div class="col-xs-6 bold">{{companyIntellectualInformation.otherPowerNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">当年承担国家级科技计划数：</div>
                        <div class="col-xs-6 bold">{{company.nationalProjectsNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">当年获得省级以上奖励（万元）：</div>
                        <div class="col-xs-6 bold">{{company.provincialAwards}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">购买（被许可）国外专利数：</div>
                        <div class="col-xs-6 bold">{{company.foreignPatentsNum}}</div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row mt10">
                        <div class="col-xs-6">技术合同交易数：</div>
                        <div class="col-xs-6 bold">{{company.technicalContractNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">技术合同交易额（万元）：</div>
                        <div class="col-xs-6 bold">{{company.technicalContractTradingValue}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">研发加计备案数：</div>
                        <div class="col-xs-6 bold">{{company.rdRecordNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">累计工程中心数量：</div>
                        <div class="col-xs-6 bold">{{company.projectCenterNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中累计国家级工程中心数量：</div>
                        <div class="col-xs-6 bold">{{company.projectCenterNationalNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中累计省级工程中心数量：</div>
                        <div class="col-xs-6 bold">{{company.projectCenterProvinceNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中累计市级工程中心数量：</div>
                        <div class="col-xs-6 bold">{{company.projectCenterCityNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">累计项目数量：</div>
                        <div class="col-xs-6 bold">{{company.projectNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中累计国家级项目数量：</div>
                        <div class="col-xs-6 bold">{{company.projectNationalNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中累计省级项目数量：</div>
                        <div class="col-xs-6 bold">{{company.projectProvinceNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">其中累计市级项目数量：</div>
                        <div class="col-xs-6 bold">{{company.projectCityNum}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">累计获得国家资助经费金额：</div>
                        <div class="col-xs-6 bold">{{company.nationalFunding}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">累计获得省级资助经费金额：</div>
                        <div class="col-xs-6 bold">{{company.provinceFunding}}</div>
                      </div>
                      <div class="row mt10">
                        <div class="col-xs-6">累计获得市级资助经费金额：</div>
                        <div class="col-xs-6 bold">{{company.cityFunding}}</div>
                      </div>
                    </div>

                  </div>
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
                  <NbSlidePanel type="primary" v-for="(invest,index) in company.companyInvestments"  :key="invest.id">
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
                  <NbSlidePanel type="primary" v-for="(intellect,index) in company.companyIntellectuals" :key="intellect.id">
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
                    企业资质
                </span>
                <div slot="body">
                  <NbSlidePanel type="primary" v-for="(qulify,index) in company.companyQualifications" :key="qulify.id">
                    <span slot="heading" class="">
                        <i class="fa fa-user"></i>
                        企业资质详情 #{{index+1}}
                    </span>
                    <div slot="body">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">认定机构：</div>
                          <div class="col-xs-8 bold"> {{qulify.identificationMechanism}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">编号：</div>
                          <div class="col-xs-8 bold"> {{qulify.identificationNo}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">认定年份：</div>
                          <div class="col-xs-8 bold"> {{qulify.identificationTime | humanTime}}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-xs-4">复核/验收年份：</div>
                          <div class="col-xs-8 bold"> {{qulify.reviewTime | humanTime}}</div>
                        </div>
                        <div class="row mt10">
                          <div class="col-xs-4">资助资金（万元）：</div>
                          <div class="col-xs-8 bold"> {{qulify.grantFunds}}</div>
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
                    机构信息
                </span>
                <div slot="body">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-xs-4">控股母公司：</div>
                      <div class="col-xs-8 bold">{{company.parentCompany}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">纳税人识别号：</div>
                      <div class="col-xs-8 bold">{{company.parentTaxpayerCode}}</div>
                    </div>
                    <div class="row mt10">
                      <div class="col-xs-4">地址：</div>
                      <div class="col-xs-8 bold">{{company.parentAddress}}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-xs-4">经营范围（按营业执照）：</div>
                      <div class="col-xs-8 bold">{{company.parentBusinessScope}}</div>
                    </div>
                  </div>
                </div>
              </NbSlidePanel>
            </div>
            <div class="col-xs-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-leaf"></i>
                    分支机构信息
                </span>
                <div slot="body">
                  <NbSlidePanel type="primary" v-for="(branch,index) in company.companyBranches" :key="branch.id">
                    <span slot="heading" class="">
                      <i class="fa fa-user"></i>
                      分支机构详情 #{{index+1}}
                    </span>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-xs-4">公司名称</div>
                        <div class="col-xs-8">{{branch.name}}</div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-xs-4">公司地址</div>
                        <div class="col-xs-8">{{branch.address}}</div>
                      </div>
                    </div>
                  </NbSlidePanel>
                </div>
              </NbSlidePanel>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 text-center" v-if="company.loading">
              <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            </div>
          </div>

        </LoadingFrame>
      </div>
      <div class="col-xs-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>

  </div>
</template>
<script>
	import {Notification} from 'element-ui';
	import Company from '../../../common/model/company/Company'
  import CompanyBranch from '../../../common/model/company/CompanyBranch'
  import CompanyCore from '../../../common/model/company/CompanyCore'
  import CompanyEquity from '../../../common/model/company/CompanyEquity'
  import CompanyFinance from '../../../common/model/company/CompanyFinance'
  import CompanyIntellectual from '../../../common/model/company/CompanyIntellectual'
  import CompanyIntellectualInformation from '../../../common/model/company/CompanyIntellectualInformation'
  import CompanyInvestment from '../../../common/model/company/CompanyInvestment'
  import CompanyQualification from '../../../common/model/company/CompanyQualification'
  import NbTank from '../../../common/widget/NbTank'
  import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
  import LoadingFrame from "../widget/LoadingFrame";
  import UserProfileLink from "../widget/UserProfileLink";

	export default {

		data () {
			return {
				company: new Company(),
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType
			}
		},
		components: {
      NbTank,
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink
    },
		methods: {

		},
		mounted(){
			let that = this;
			this.company.id = this.$store.state.route.query.id;
			if (this.company.id) {
				this.company.httpDetail();
			}
		}
	}
</script>
