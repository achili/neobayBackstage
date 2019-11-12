import Menu from '../model/lover/Menu'
import { FeatureType } from '../model/core/feature/FeatureType'
import $store from "../store";

let backyardMenu = {
  getMenuByUser(user) {
    let menus = [];

      if (user.hasPermissionAllSpace(FeatureType.PROJECT_MINE) && !user.hasPermissionAllSpace(FeatureType.PROJECT_MANAGE)) {
        let indexMenu = new Menu("首页", "/group/index", false, "fa fa-home");
        menus.push(indexMenu);

        /**************注册用户-入驻申请****************/
        let but = ['/group/entry/apply/list/type'
        ];
        if (user.hasPermissionAllSpace(FeatureType.ENTRY_APPLY_MINE)) {
          let userEntryMenu = new Menu("入驻申请", "/group/entry/apply/list?userId=" + user.id, false, "fa fa-sign-in", [], [], but);
          menus.push(userEntryMenu);

          let but5 = ['/group/entry/apply/list'];
          let entryApplyCUMTListMenu = new Menu("中国矿业大学项目信息统计", "/group/entry/apply/list/type?type=CUMT", false, "fa fa-credit-card", [], [], but5);
          menus.push(entryApplyCUMTListMenu);
        }
        /**************注册用户-创业项目和企业****************/


        let userProjectMenu = new Menu("我的项目", "/group/project/list", false, "fa fa-support");
        menus.push(userProjectMenu);

        let userProjectCreateMenu = new Menu("创建项目", "/group/project/create", false, "fa fa-plus");
        userProjectMenu.add(userProjectCreateMenu);

        let userProjectEditMenu = new Menu("项目信息维护", "/group/project/list?userId=" + user.id, false, "fa fa-support", [], ['/group/mentor/detail'], ['/group/project/create']);
        userProjectMenu.add(userProjectEditMenu);


        let userCompanyEditMenu = new Menu("企业信息维护", "/group/company/list?userId=" + user.id, false, "fa fa-bank");
        userProjectMenu.add(userCompanyEditMenu);

        let groupTorch2017Menu = new Menu('火炬统计', null, false, 'fa fa-fire');
        menus.push(groupTorch2017Menu);
        let torchStatisticsListMenu2017 = new Menu('2017火炬统计', '/group/torch2017/create', false, 'fa fa-fire');
        groupTorch2017Menu.add(torchStatisticsListMenu2017);
        let torchStatisticsListMenu2018 = new Menu('2018火炬统计', '/group/torch2018/create', false, 'fa fa-fire');
        groupTorch2017Menu.add(torchStatisticsListMenu2018);
      }
      /**************注册用户-创业项目和企业****************/
      if (user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MINE) && !user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)) {

        let userkeeperbusinessregistryMenu = new Menu("企业管家", null, false, "fa fa-shield");
        menus.push(userkeeperbusinessregistryMenu);

        let userkeeperbusinessregistryListMenu = new Menu("申请服务", "/group/keeper/business/create", false, "fa fa-plus");
        userkeeperbusinessregistryMenu.add(userkeeperbusinessregistryListMenu);

        let userBusinessListMenu = new Menu("我的申请", "/group/keeper/business/list?userId=" + user.id, false, "fa fa-heartbeat", [], [], ['/group/keeper/business/create']);
        userkeeperbusinessregistryMenu.add(userBusinessListMenu);
      }

      /**************会议室****************/
      let conferenceMenu = new Menu('会议室', null, false, 'fa fa-briefcase');
      menus.push(conferenceMenu);
      let conferenceRoomReservationMenu = new Menu('订单管理', '/group/conference/room/reservation/list', false, 'fa fa-tty');
      conferenceMenu.add(conferenceRoomReservationMenu);
      let conferenceRoomMenu = new Menu('会议室管理', '/group/conference/room/list', false, 'fa fa-briefcase');
      conferenceMenu.add(conferenceRoomMenu);

      /**************智慧空间****************/
      let wisdomSpaceMenu = new Menu('智慧空间', null, false, 'fa fa-support');
      menus.push(wisdomSpaceMenu);
      let smartPrintMenu = new Menu('智能打印', '/group/smart/print/list', false, 'fa fa-support');
      wisdomSpaceMenu.add(smartPrintMenu);

      /**************注册用户-创业空间****************/
      if (user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MINE) && !user.hasPermissionAllSpace(FeatureType.KEEPER_BUSINESS_MANAGE)) {

        let incubatorMenu = new Menu("创业空间", null, false, "fa fa-cube");
        menus.push(incubatorMenu);

        let incubatorIndependentSpaceMenu = new Menu("空间申请", "/group/space/apply/list?userId=" + user.id, false, "fa fa-id-badge");
        incubatorMenu.add(incubatorIndependentSpaceMenu);

        let entryApplyRentListMenu = new Menu("孵化协议", "/group/protocol/incubator/list?userId=" + user.id, false, "fa fa-handshake-o");
        incubatorMenu.add(entryApplyRentListMenu);


        let entryApplyProtocolListMenu = new Menu("租赁协议", "/group/protocol/space/list", false, "fa fa-diamond");
        incubatorMenu.add(entryApplyProtocolListMenu);


        let financePayInfoListMenu = new Menu("付款信息单", "/group/finance/pay/info/list", false, "fa fa-file-text");
        incubatorMenu.add(financePayInfoListMenu);
        let ElectricityPayNotifyMenu = new Menu("电费付款信息单", "/group/finance/electric/pay/list", false, "fa fa-bolt");
        incubatorMenu.add(ElectricityPayNotifyMenu);
        let otherPayNotifyMenu = new Menu("其他付款信息单", "/group/finance/other/pay/list", false, "fa fa-file-text-o");
        incubatorMenu.add(otherPayNotifyMenu);
      }
      /**************注册用户-投资融资****************/
      if (user.hasPermissionAllSpace(FeatureType.INVESTMENT_MINE) && !user.hasPermissionAllSpace(FeatureType.INVESTMENT_MANAGE)) {
        let investmentMenu = new Menu('投资平台', '/group/investment/list', false, 'fa fa-pagelines');
        menus.push(investmentMenu);
      }

    return menus;
  }
}


export  default backyardMenu;
