import Menu from '../model/lover/Menu'
import { FeatureType } from '../model/core/feature/FeatureType'
import $store from "../store";

let userMenu = {
  getMenuByUser(user) {
    let menus = [];

      /**************所有人-个人中心****************/
      if (user.hasPermissionAllSpace(FeatureType.USER_MINE)) {

        let userHomeMenu = new Menu("个人资料", "/user/profile", false, "fa fa-user-circle");
        menus.push(userHomeMenu);
      }

      /**************所有人-消息中心****************/
      if (user.hasPermissionAllSpace(FeatureType.MESSAGE_MINE)) {
        let messageMenu = new Menu("消息中心", null, false, "fa fa-bullhorn");
        menus.push(messageMenu);

        let messageRemindMenu = new Menu("提醒", "/user/message/remind/list", false, "fa fa-bell");
        messageMenu.add(messageRemindMenu);

        let contain = ['/user/message/letter/list/outbox',
          '/user/message/letter/list/flag',
          '/user/message/letter/list/deleted',
          '/user/message/letter/list/detail',
          '/user/message/letter/list/create',
          '/user/project/administrator/invitation/detail'
        ];
        let messageInboxMenu = new Menu("站内信", "/user/message/letter/list/inbox", false, "fa fa-envelope-o", [], contain);
        messageMenu.add(messageInboxMenu);
      }

      let answerMenu = new Menu("表单历史", "/user/answer/list", false, "fa fa-list");
      menus.push(answerMenu);

      let feedbackMenu = new Menu("意见反馈", "/user/feedback/list", false, "fa fa-rss");
      menus.push(feedbackMenu);

    return menus;
  }
}


export  default userMenu;
