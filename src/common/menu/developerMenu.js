import Menu from '../model/lover/Menu'
import { FeatureType } from '../model/core/feature/FeatureType'

let developerMenu = {
  getMenuByUser(user) {
    let menus = [];
    //角色和权限部分结构维持原状 不做太多修改，按照角色返回菜单
    if(user.role.type !== user.role.Type.PROGRAMMER) {
      return [];
    }

      if (user.hasPermissionAllSpace(FeatureType.OTHER)) {

      let indexMenu = new Menu("首页", "/developer/index", false, "fa fa-home");
      menus.push(indexMenu);

      /**************文章****************/
      let articleMenu = new Menu("文章(示例)", null, false, "fa fa-book");
      menus.push(articleMenu);

      let articleListMenu = new Menu("文章", "/developer/article/list", false, "fa fa-wpforms");
      articleMenu.add(articleListMenu);

      let articleTagListMenu = new Menu("标签", "/developer/article/tag/list", false, "fa fa-tag");
      articleMenu.add(articleTagListMenu);


      /**************文章首页生成****************/
      let indexMenu2 = new Menu("齐小东的测试页面", "/developer/qixiaodong-debug", false, "fa fa-tree");
      menus.push(indexMenu2);


      /**************门禁接口调试****************/
      let guardMenu = new Menu("接口调试", null, false, "fa fa-book");
      menus.push(guardMenu);

      let guardListMenu = new Menu("门禁接口调试", "/developer/guard/test/list", false, "fa fa-wpforms");
      guardMenu.add(guardListMenu);

      let printListMenu = new Menu("打印机接口调试", "/developer/print/test/list", false, "fa fa-wpforms");
      guardMenu.add(printListMenu);


      /**************文件****************/
      let tankMenu = new Menu("文件", "/developer/tank/list", false, "fa fa-folder");
      menus.push(tankMenu);


      /**************模板****************/
      let templateMenu = new Menu("消息模板管理", "/developer/template/list", false, "fa fa-flag-checkered");
      menus.push(templateMenu);


      /**************自家轮子****************/
      let wheelMenu = new Menu("自家轮子", null, false, "fa fa-plane");
      menus.push(wheelMenu);

      let wheelNbBtnDropdownMenu = new Menu("NbBtnDropdown", "/developer/wheel/nb-btn-dropdown", false, "fa fa-check-square");
      wheelMenu.add(wheelNbBtnDropdownMenu);

      let wheelNbCaptchaDemo = new Menu("NbCaptcha", "/developer/wheel/nb-captcha", false, "fa fa-image");
      wheelMenu.add(wheelNbCaptchaDemo);


      let wheelNbCheckMenu = new Menu("NbCheck", "/developer/wheel/nb-check", false, "fa fa-check-square");
      wheelMenu.add(wheelNbCheckMenu);

      let wheelNbFlipMenu = new Menu("NbFlip", "/developer/wheel/nb-flip", false, "fa fa-exchange");
      wheelMenu.add(wheelNbFlipMenu);

      let wheelNbSwitcherMenu = new Menu("NbSwitcher", "/developer/wheel/nb-switcher", false, "fa fa-toggle-on");
      wheelMenu.add(wheelNbSwitcherMenu);


      let wheelNbEditorMenu = new Menu("NbEditor", "/developer/wheel/nb-editor", false, "fa fa-pencil-square-o");
      wheelMenu.add(wheelNbEditorMenu);

      let wheelNbBoingPayMenu = new Menu("NbBoingPay", "/developer/wheel/nb-boing-pay", false, "fa fa-pencil-square-o");
      wheelMenu.add(wheelNbBoingPayMenu);

        let wheelNbCodeMirrorMenu = new Menu("NbCodeMirror", "/developer/wheel/nb-code-mirror", false, "fa fa-code");
        wheelMenu.add(wheelNbCodeMirrorMenu);


        let wheelNbExpanding = new Menu("NbExpanding", "/developer/wheel/nb-expanding", false, "fa fa-caret-square-o-down");
        wheelMenu.add(wheelNbExpanding);


        let wheelNbPagerSelectionMenu = new Menu("NbPagerSelection", "/developer/wheel/nb-pager-selection", false, "fa fa-minus-square-o");
        wheelMenu.add(wheelNbPagerSelectionMenu);

        let wheelNbMetaSelectionMenu = new Menu("NbMetaSelection", "/developer/wheel/nb-meta-selection", false, "fa fa-minus-square-o");
        wheelMenu.add(wheelNbMetaSelectionMenu);

        let wheelNbTimePickerMenu = new Menu("NbTimePicker", "/developer/wheel/nb-time-picker", false, "fa fa-clock-o");
        wheelMenu.add(wheelNbTimePickerMenu);

        let wheelNbDateRange = new Menu("NbDateRange", "/developer/wheel/nb-date-range", false, "fa fa-clock-o");
        wheelMenu.add(wheelNbDateRange);


        let wheelNbTankMenu = new Menu("NbTank", "/developer/wheel/nb-tank", false, "fa fa-upload");
        wheelMenu.add(wheelNbTankMenu);

        let wheelNbTagMenu = new Menu("NbTags", "/developer/wheel/nb-tag", false, "fa fa-tags");
        wheelMenu.add(wheelNbTagMenu);

        let wheelNbTabsMenu = new Menu("NbTabs", "/developer/wheel/nb-tabs", false, "fa fa-navicon");
        wheelMenu.add(wheelNbTabsMenu);

        let wheelNbSlidePanelMenu = new Menu("NbSlidePanel", "/developer/wheel/nb-slide-panel", false, "fa fa-sliders");
        wheelMenu.add(wheelNbSlidePanelMenu);

        let wheelNbDistrictMenu = new Menu("NbDistrict", "/developer/wheel/nb-district", false, "fa fa-upload");
        wheelMenu.add(wheelNbDistrictMenu);

        let wheelSVGDemoMenu = new Menu("SVGDemo", "/developer/wheel/svg-demo", false, "fa fa-picture-o");
        wheelMenu.add(wheelSVGDemoMenu);

      let wheelSummaryChartDemoMenu = new Menu("SummaryChartDemo", "/developer/wheel/summary-chart-demo", false, "fa fa-area-chart");
      wheelMenu.add(wheelSummaryChartDemoMenu);

      let wheelQRCodeDemoMenu = new Menu("QRCodeDemo", "/developer/wheel/qr-code-demo", false, "fa fa-area-chart");
      wheelMenu.add(wheelQRCodeDemoMenu);
    }
    return menus;
  }
};


export  default developerMenu;
