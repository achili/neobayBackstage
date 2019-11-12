import Menu from '../model/lover/Menu'
import { FeatureType } from '../model/core/feature/FeatureType'

let backyardMenu = {
  getMenuByUser(user) {
    let byMenus = [];

    if(user.role.type === user.role.Type.USER) {
      return [];
    }

    let indexMenu = new Menu("管理中心", "/by/index", false, "fa fa-home");
    byMenus.push(indexMenu);

    /**************宣传中心****************/
    if (user.hasPermissionAllSpace(FeatureType.OFFICIAL_MANAGE)) {
      let officialMenu = new Menu("宣传中心", null, false, "fa fa-desktop");
      byMenus.push(officialMenu);
      let indexCarouelMenu = new Menu("轮播图", "/by/official/carousel/list", false, "fa fa-image");
      officialMenu.add(indexCarouelMenu);
      let officialActivityMenu = new Menu('资讯动态', null, false, 'fa fa-podcast')
      officialMenu.add(officialActivityMenu);
      let informationMenu = new Menu("资讯", "/by/official/article/list", false, "fa fa-wpforms");
      officialActivityMenu.add(informationMenu);
      let informationTagMenu = new Menu("标签", "/by/official/article/tag/list", false, "fa fa-tag");
      officialActivityMenu.add(informationTagMenu);
      let starProjectMenu = new Menu("明星项目", "/by/official/star/list", false, "fa fa-star");
      officialMenu.add(starProjectMenu);

      let helpMenu = new Menu("帮助", "/by/official/help/list", false, "fa fa-star");
      officialMenu.add(helpMenu);
    }
    /**************入驻评审****************/
    if (user.hasPermissionAllSpace(FeatureType.ENTRY_APPLY_MANAGE)) {
      let entryApplyMenu = new Menu("入驻评审", null, false, "fa fa-sign-in");
      byMenus.push(entryApplyMenu);
      let entryApplyFormMenu = new Menu("申请管理", null, false, "fa fa-database");
      entryApplyMenu.add(entryApplyFormMenu);
      let but1 = [
        '/by/entry/apply/list/type'
      ];
      let entryApplyListMenu = new Menu("申请列表", "/by/entry/apply/list", false, "fa fa-credit-card",[],[],but1);
      entryApplyFormMenu.add(entryApplyListMenu);
      let but2 = [
        '/by/entry/apply/list'
      ];
      let entryApplyCUMTListMenu = new Menu("中国矿业大学项目信息统计", "/by/entry/apply/list/type?type=CUMT", false, "fa fa-credit-card",[],["/by/entry/apply/list/detail","/by/entry/apply/list/edit"],but2);
      entryApplyFormMenu.add(entryApplyCUMTListMenu);

      let entryBatchMenu = new Menu("批次管理", "/by/entry/batch/list", false, "fa fa-cube");
      entryApplyMenu.add(entryBatchMenu);
    }
    /**************项目管理****************/
    if (user.hasPermissionAllSpace(FeatureType.PROJECT_MANAGE)) {
      let projectMenu = new Menu("项目管理", null, false, "fa fa-support");
      byMenus.push(projectMenu);
      let projectListMenu = new Menu("项目管理", "/by/project/list", false, "fa fa-support");
      projectMenu.add(projectListMenu);
      let companyMenu = new Menu("企业管理", "/by/company/list", false, "fa fa-bank");
      projectMenu.add(companyMenu);


      let torchStatisticsListMenu = new Menu('火炬统计', null, false, 'fa fa-fire');
      projectMenu.add(torchStatisticsListMenu);
      let torchStatisticsListMenu2017 = new Menu('2017火炬统计', '/by/torch2017/list', false, 'fa fa-fire');
      torchStatisticsListMenu.add(torchStatisticsListMenu2017);
      let torchStatisticsListMenu2018 = new Menu('2018火炬统计', '/by/torch2018/list', false, 'fa fa-fire');
      torchStatisticsListMenu.add(torchStatisticsListMenu2018);


      let mentorMenu = new Menu("社区经理管理", "/by/mentor/list", false, "fa fa-male");
      projectMenu.add(mentorMenu);
    }
    /**************园区服务****************/
    if (user.hasPermissionAllSpace(FeatureType.SPACE_APPLY_MANAGE) || user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)) {
      let businessMenu = new Menu("园区服务", null, false, "fa fa-support");
      byMenus.push(businessMenu);
      /**************管理员-创业空间****************/
      if (user.hasPermissionAllSpace(FeatureType.SPACE_APPLY_MANAGE) || user.hasPermissionAllSpace(FeatureType.SPACE_INVESTMENT_MINE)) {
        let entrySpaceMenu = new Menu("创业空间", null, false, "fa fa-bank");
        businessMenu.add(entrySpaceMenu);
        let entrySpaceListMenu = new Menu("申请管理", "/by/space/apply/list", false, "fa fa-bank");
        entrySpaceMenu.add(entrySpaceListMenu);

        let spaceMenu = new Menu("场地维护", null, false, "fa fa-database");
        entrySpaceMenu.add(spaceMenu);
        let spaceBuildingMenu = new Menu("楼栋", "/by/space/building/list", false, "fa fa-building");
        spaceMenu.add(spaceBuildingMenu);
        let spaceRoomMenu = new Menu("房间", "/by/space/room/list", false, "fa fa-tags");
        spaceMenu.add(spaceRoomMenu);
        let spaceSeatMenu = new Menu("工位", "/by/space/seat/graph", false, "fa fa-television");
        spaceMenu.add(spaceSeatMenu);

        let spaceDistributionRoomMenu = new Menu("房间预分配", "/by/space/room/distribution", false, "fa fa-tags");
        spaceMenu.add(spaceDistributionRoomMenu);
        let spaceDistributionSeatMenu = new Menu("工位预分配", "/by/space/seat/distribution", false, "fa fa-television",[] ,["/by/space/seat/detail"]);
        spaceMenu.add(spaceDistributionSeatMenu);
        let spaceVisualSiteMenu = new Menu("可视化场地维护","/by/space/site/visual",false,'fa fa-tags');
        spaceMenu.add(spaceVisualSiteMenu);
        if (user.hasPermissionAllSpace(FeatureType.SPACE_INVESTMENT_MINE)) {
          /**************表单****************/
          let investmentMenu = new Menu('空间需求管理', '/by/space/investment/list', false, 'fa fa-sign-language');
          entrySpaceMenu.add(investmentMenu);
        }
      }
      /**************会议室****************/
      if (user.hasPermissionAllSpace(FeatureType.SPACE_APPLY_MANAGE)) {
        /**************会议室****************/
        let conferenceMenu = new Menu('会议室',null,false,'fa fa-briefcase');
        businessMenu.add(conferenceMenu);
        let conferenceRoomReservationMenu = new Menu('订单管理', '/by/conference/room/reservation/list', false, 'fa fa-tty');
        conferenceMenu.add(conferenceRoomReservationMenu);
        let conferenceRoomMenu = new Menu('会议室管理', '/by/conference/room/list', false, 'fa fa-briefcase');
        conferenceMenu.add(conferenceRoomMenu);
      }
      /**************创业活动****************/
      if (user.hasPermissionAllSpace(FeatureType.SPACE_APPLY_MANAGE)) {
        let activityMenu = new Menu('创业活动',null,false,'fa fa-tasks');
        businessMenu.add(activityMenu);
        let enterActivityMenu = new Menu("活动发布", "/by/official/activity/list", false, "fa fa-list-ol");
        activityMenu.add(enterActivityMenu);
        let activityTypeMenu = new Menu("活动类型", "/by/official/activity/type/list", false, "fa fa-gg-circle");
        activityMenu.add(activityTypeMenu);
      }
      /**************政策管理****************/
      if (user.hasPermissionAllSpace(FeatureType.SPACE_APPLY_MANAGE)) {
        let policyMenu = new Menu('政策管理',null,false,'fa fa-tasks');
        businessMenu.add(policyMenu);
        let officialPolicyMenu = new Menu("政策发布", "/by/official/policy/list", false, "fa fa-star");
        policyMenu.add(officialPolicyMenu);
        // let officialPolicyQueryMenu = new Menu("政策咨询", "/by/official/policy/query/list", false, "fa fa-question-circle-o");
        // policyMenu.add(officialPolicyQueryMenu);
        let officialPolicyTagMenu = new Menu("政策标签", "/by/official/policy/tag/list", false, "fa fa-flag");
        policyMenu.add(officialPolicyTagMenu);
        let officialPolicyAreaMenu = new Menu("地区政策", "/by/official/policy/area/list", false, "fa fa-map-marker");
        policyMenu.add(officialPolicyAreaMenu);
      }
      /**************缺少投融资管理****************/
      if (user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE) || user.hasPermissionAllSpace(FeatureType.INVESTMENT_MANAGE) ||
        (user.hasPermissionAllSpace(FeatureType.INVESTMENT_QUERY) && !user.hasPermissionAllSpace(FeatureType.INVESTMENT_MANAGE)) ) {
        let keeperBusinessRegistryMenu = new Menu("投融资管理", null, false, "fa fa-shield");
        businessMenu.add(keeperBusinessRegistryMenu);
        // ********************管理员-投资融资*****************************
        if ( user.hasPermissionAllSpace(FeatureType.INVESTMENT_MANAGE)) {
          let investmentListMenu = new Menu('投资平台', '/by/investment/list', false, 'fa fa-pagelines');
          keeperBusinessRegistryMenu.add(investmentListMenu);
        }

        //******************自定义角色-投资融资评论者*******************************
        if ( user.hasPermissionAllSpace(FeatureType.INVESTMENT_QUERY) && !user.hasPermissionAllSpace(FeatureType.INVESTMENT_MANAGE)) {
          let investmentListMenu = new Menu('投资平台', '/by/investment/list', false, 'fa fa-pagelines');
          keeperBusinessRegistryMenu.add(investmentListMenu);
        }
      }

      /********************邀请访客**********************/
      if(user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)){
        let inviteVisitorMenu = new Menu('邀请访客管理', '/by/invite/list', false, 'fa fa-bar-chart');
        businessMenu.add(inviteVisitorMenu);
      }
    }
    /**************管理员-企业管家****************/
    if (user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE) || user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MINE)) {
      let keeperBusinessRegistryMenu = new Menu("企业管家", null, false, "fa fa-shield");
      byMenus.push(keeperBusinessRegistryMenu);
      let keeperBusinessRegistryListMenu = new Menu("申请管理", "/by/keeper/business/list", false, "fa fa-check-square-o");
      keeperBusinessRegistryMenu.add(keeperBusinessRegistryListMenu);
      let keeperBusinessOrganizationMenu = new Menu("服务机构管理", "/by/keeper/business/organization/list", false, "fa fa-handshake-o");
      keeperBusinessRegistryMenu.add(keeperBusinessOrganizationMenu);

      if(user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)){
        let keeperBusinessTypeMenu = new Menu("服务类型管理", "/by/keeper/business/type/list", false, "fa fa-heartbeat");
        keeperBusinessRegistryMenu.add(keeperBusinessTypeMenu);
      }
    }
    /**************创业者服务****************/
    if (user.hasPermissionAllSpace(FeatureType.OFFICIAL_MANAGE) || user.hasPermissionAllSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE) ||  user.hasPermissionAllSpace(FeatureType.MAKER_SIMPLE_APPLY_MINE)) {

      let makerMenu = new Menu("创业者服务", null, false, "fa fa-desktop");
      byMenus.push(makerMenu);
      let organizationMenu = new Menu("服务机构管理", "/by/maker/organization/list", false, "fa fa-support");
      makerMenu.add(organizationMenu);
      if(user.hasPermissionAllSpace(FeatureType.OFFICIAL_MANAGE) ||  user.hasPermissionAllSpace(FeatureType.MAKER_SIMPLE_APPLY_MINE)){
        let orderMenu = new Menu("订单管理", "/by/maker/order/list", false, "fa fa-diamond");
        makerMenu.add(orderMenu);
        // let oneCardMenu = new Menu("一卡通", "/by/maker/card/list", false, "fa fa-id-card-o");
        // orderMenu.add(oneCardMenu);
        // let marketMenu = new Menu("园区市集", "/by/maker/market/list", false, "fa fa-shopping-basket");
        // orderMenu.add(marketMenu);
        if(user.hasPermissionAllSpace(FeatureType.OFFICIAL_MANAGE)){
          let apartmentMenu = new Menu("人才公寓","/by/maker/apartment/list",false,"fa fa-bed");
          orderMenu.add(apartmentMenu);
        }
        let parkMenu = new Menu("第三方服务", "/by/maker/simple/apply/list", false, "fa fa-automobile");
        orderMenu.add(parkMenu);
        // if(user.hasPermissionAllSpace(FeatureType.OFFICIAL_MANAGE)){
        //   let makerCarouselMenu = new Menu("轮播图", "/by/maker/carousel/list", false, "fa fa-image");
        //   makerMenu.add(makerCarouselMenu);
        // }

      }

      // let sportMenu = new Menu("体育运动", "/by/maker/sport/list", false, "fa fa-soccer-ball-o");
      // makerMenu.add(sportMenu);
      //
      // let hotelMenu = new Menu("协议酒店","/by/maker/hotel/list",false,"fa fa-building-o");
      // makerMenu.add(hotelMenu);
    }
    /**************管理员-合同管理****************/
    if (user.hasPermissionAllSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE) ||
      user.hasPermissionAllSpace(FeatureType.PROTOCOL_SPACE_MANAGE)) {
      let protocolMenu = new Menu("合同管理", null, false, "fa fa-file-text-o");
      byMenus.push(protocolMenu);
      if (user.hasPermissionAllSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE)) {
        let entryApplyProtocolListMenu = new Menu("孵化协议", "/by/protocol/incubator/list", false, "fa fa-briefcase");
        protocolMenu.add(entryApplyProtocolListMenu);
      }
      if (user.hasPermissionAllSpace(FeatureType.PROTOCOL_SPACE_MANAGE)) {
        let entryApplyRentListMenu = new Menu("租赁协议", "/by/protocol/space/list", false, "fa fa-diamond");
        protocolMenu.add(entryApplyRentListMenu);
      }
    }
    /**************管理员-财务管理****************/
    if (user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_MANAGE) ||
      user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_REMINDER_MANAGE) ||
      user.hasPermissionAllSpace(FeatureType.FINANCE_BILL_VIEW)
    ) {
      let financeMenu = new Menu("财务管理", null, false, "fa fa-jpy");
      byMenus.push(financeMenu);
      if (user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_MANAGE)) {
        //给业务人员用的 租金 押金 滞纳金 创新券
        let payNotifyMenu = new Menu("付款信息单", "/by/finance/pay/info/list", false, "fa fa-file-text");
        financeMenu.add(payNotifyMenu);
        let ElectricityPayNotifyMenu = new Menu("能耗付款信息单", "/by/finance/electric/pay/list", false, "fa fa-bolt");
        financeMenu.add(ElectricityPayNotifyMenu);
        let otherPayNotifyMenu = new Menu("其他付款信息单", "/by/finance/other/pay/list", false, "fa fa-file-text-o");
        financeMenu.add(otherPayNotifyMenu);
      }
      if (user.hasPermissionAllSpace(FeatureType.FINANCE_PAY_INFO_REMINDER_MANAGE)) {
        let payPromptMenu = new Menu("催款通知", "/by/finance/pay/info/reminder", false, "fa fa-bullhorn");
        financeMenu.add(payPromptMenu);
      }
      if (user.hasPermissionAllSpace(FeatureType.FINANCE_BILL_VIEW)) {
        //给财务人员用。 补充信息
        let payInfoMenu = new Menu("已收账款录入", "/by/finance/bill/receipt/list", false, "fa fa-dollar");
        financeMenu.add(payInfoMenu);
        //统计分析
        let billMenu = new Menu("应收账款", "/by/finance/statement", false, "fa fa-pie-chart");
        financeMenu.add(billMenu);
      }
      if (user.hasPermissionAllSpace(FeatureType.PREFERENCE_MANAGE)) {
        let preferenceMenu = new Menu("系统设置", "/by/preference/detail", false, "fa fa-cogs");
        financeMenu.add(preferenceMenu);
      }
    }
    /**************智慧空间****************/
    if (user.hasPermissionAllSpace(FeatureType.PROJECT_MANAGE)) {
      let spaceSmartMenu = new Menu("智慧空间", null, false, "fa fa-support");
      byMenus.push(spaceSmartMenu);
      let fileMenu = new Menu("工作文件管理", "http://QuickConnect.to/neoBay", false, "fa fa-folder-open-o");
      spaceSmartMenu.add(fileMenu);
      let doorMenu = new Menu("门禁管理", "/by/ispace/door", false, "fa fa-address-card", [], ['/by/door/detail',"/by/grant/authority/detail",
        "/by/grant/authority/create","/by/grant/authority/edit","/by/room/detail","/by/task/info/create",
      "/by/task/info/detail","/by/task/info/edit"]);
      spaceSmartMenu.add(doorMenu);
      // let airMenu = new Menu("智能空调", "/by/no/message/air", false, "fa fa-support");
      // spaceSmartMenu.add(airMenu);
      let resCenterMenu = new Menu("能耗中心", "/by/ispace/energy/list", false, "fa fa-bolt");
      spaceSmartMenu.add(resCenterMenu);
      let networkMenu = new Menu("智能网络", "/by/isspace/network", false, "fa fa-support");
      spaceSmartMenu.add(networkMenu);
      let printMenu = new Menu("智能打印", "/by/ispace/print/list", false, "fa fa-file-pdf-o", [], ["/by/ispace/print/printhistorycreate", "/by/ispace/print/printcreate"]);
      spaceSmartMenu.add(printMenu);
      let securityMenu = new Menu("智能安防", "/by/ispace/security", false, "fa fa-video-camera");
      spaceSmartMenu.add(securityMenu);
      // let pubCenterMenu = new Menu("宣传展示中心", "/by/no/message/pub", false, "fa fa-support");
      // spaceSmartMenu.add(pubCenterMenu);
    }
    /**************协同工作****************/
    if (user.hasPermissionAllSpace(FeatureType.SPACE_TEAMWORK_MINE)) {
      let teamMenu = new Menu('协同工作',null,false,'fa fa-paperclip');
      byMenus.push(teamMenu);
      let teamworkMenu = new Menu('协同工作任务', '/by/teamwork/list', false, 'fa fa-paperclip');
      teamMenu.add(teamworkMenu);
      if (user.hasPermissionAllSpace(FeatureType.SPACE_TEAMWORK_MANAGE)) {
        let teamworkTagMenu = new Menu('工作类型', '/by/teamwork/tag/list', false, 'fa fa-paperclip');
        teamMenu.add(teamworkTagMenu);
      }
      if (user.hasPermissionAllSpace(FeatureType.RECEPTION_MINE)) {
        let surveyMenu = new Menu('接待与活动管理', '/by/reception/list', false, 'fa fa-futbol-o');
        teamMenu.add(surveyMenu);
      }
    }
    /*****************汇总统计********************/
    if (user.hasPermissionAllSpace(FeatureType.SUMMARY_INTERNS)) {
      let summaryStatisticsMenu = new Menu('汇总统计', null, false, 'fa fa-th');
      byMenus.push(summaryStatisticsMenu);
      let summaryStatisticsResult = new Menu('汇总统计', '/by/summary/result', false, 'fa fa-bar-chart');
      summaryStatisticsMenu.add(summaryStatisticsResult);
      let summaryStatisticsList = new Menu('汇总统计模板', '/by/summary/list', false, 'fa fa-list-ol');
      summaryStatisticsMenu.add(summaryStatisticsList);
      let summaryStatisticsAnalysis = new Menu('图表分析', '/by/summary/analysis', false, 'fa fa-superpowers');
      summaryStatisticsMenu.add(summaryStatisticsAnalysis);
      let summaryStatisticsChart = new Menu('图表分析模板', '/by/summary/analysis/list', false, 'fa fa-ioxhost');
      summaryStatisticsMenu.add(summaryStatisticsChart);
    }
    /**************表单管理****************/
    if (user.hasPermissionAllSpace(FeatureType.SURVEY_MANAGE)) {
      let surveyMenu = new Menu('表单管理', '/by/survey/list', false, 'fa fa-bar-chart');
      byMenus.push(surveyMenu);
    }
    /**************园区地点管理****************/
    if (user.hasPermissionAllSpace(FeatureType.OFFICIAL_MANAGE)) {
      let spaceRegionalMenu = new Menu('园区地点管理', '/by/space/regional/list', false, 'fa fa-bar-chart');
      byMenus.push(spaceRegionalMenu);
    }
    /**************管理员-消息管理****************/
    if (user.hasPermissionAllSpace(FeatureType.MESSAGE_MANAGE)) {
      let messageManageMenu = new Menu('站内消息管理', null, false, 'fa fa fa-bullhorn');
      byMenus.push(messageManageMenu);
      let messageAnnouncementMenu = new Menu('系统消息', null, false, 'fa fa fa-bullhorn');
      messageManageMenu.add(messageAnnouncementMenu);
      let messageAnnouncementCreateMenu = new Menu('系统消息发送', '/by/message/announcement/create', false, 'fa fa-paper-plane-o')
      messageAnnouncementMenu.add(messageAnnouncementCreateMenu);
      let messageAnnouncementHistoryMenu = new Menu('历史消息', '/by/message/announcement/list', false, 'fa fa-history', [], [], ['/by/message/announcement/create'])
      messageAnnouncementMenu.add(messageAnnouncementHistoryMenu);
      let messageAnnouncementContactMenu = new Menu('联系人管理', '/by/message/contact/list', false, 'fa fa-id-card')
      messageAnnouncementMenu.add(messageAnnouncementContactMenu);
      let userNotificationMenu = new Menu("站内信通知", "/by/notification/list", false, "fa fa-credit-card");
      messageManageMenu.add(userNotificationMenu);
    }
    /**************管理员-用户管理****************/
    if (user.hasPermissionAllSpace(FeatureType.USER_MANAGE) || user.hasPermissionAllSpace(FeatureType.USER_ROLE_MANAGE)) {
      let userMenu = new Menu("用户管理", null, false, "fa fa-user-plus");
      byMenus.push(userMenu);
      if (user.hasPermissionAllSpace(FeatureType.USER_ROLE_MANAGE)) {
        let roleListMenu = new Menu("角色列表", "/by/user/role/list", false, "fa fa-user-secret");
        userMenu.add(roleListMenu);
      }
      if (user.hasPermissionAllSpace(FeatureType.USER_MANAGE)) {
        let userListMenu = new Menu("用户列表", "/by/user/list", false, "fa fa-users");
        userMenu.add(userListMenu);
      }
    }
    return byMenus;
  }

};


export  default backyardMenu;
