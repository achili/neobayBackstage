import NbBtnDropdownDemo from "../../../developer/view/wheel/NbBtnDropdownDemo.vue";
import NbCaptchaDemo from "../../../developer/view/wheel/NbCaptchaDemo.vue";
import NbCheckView from "../../../developer/view/wheel/NbCheckDemo.vue";
import NbCodeMirrorDemo from "../../../developer/view/wheel/NbCodeMirrorDemo.vue";
import NbFlipDemo from "../../../developer/view/wheel/NbFlipDemo.vue";
import NbEditorDemo from "../../../developer/view/wheel/NbEditorDemo.vue";
import NbBoingPayDemo from "../../../developer/view/wheel/NbBoingPayDemo.vue";
import NbExpandingDemo from "../../../developer/view/wheel/NbExpandingDemo.vue";
import NbPagerSelectionDemo from "../../../developer/view/wheel/NbPagerSelectionDemo.vue";
import NbMetaSelectionDemo from "../../../developer/view/wheel/NbMetaSelectionDemo.vue";
import NbDateRangeDemo from "../../../developer/view/wheel/NbDateRangeDemo.vue";
import NbTimePickerView from "../../../developer/view/wheel/NbTimePickerDemo.vue";
import NbTankView from "../../../developer/view/wheel/NbTankDemo.vue";
import NbTagDemo from "../../../developer/view/wheel/NbTagsDemo.vue";
import NbTabsDemo from "../../../developer/view/wheel/NbTabsDemo.vue";
import NbSlidePanelDemo from "../../../developer/view/wheel/NbSlidePanelDemo.vue";
import NbSwitcherView from "../../../developer/view/wheel/NbSwitcherDemo.vue";
import NbDistrictDemo from "../../../developer/view/wheel/NbDistrictDemo.vue";
import SVGDemoView from "../../../developer/view/wheel/SVG/SVGDemo.vue";
import SummaryChartDemo from "../../../developer/view/wheel/SummaryChartDemo";
import QRCodeDemo from "../../../developer/view/wheel/NbQRCodeDemo";


let wheelRouter = [
	{
		path: 'wheel/nb-btn-dropdown',
		name: "nbBtnDropdown",
		component: NbBtnDropdownDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "nbBtnDropdown",
					title: "NbBtnDropdownDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-captcha',
		name: "nbCaptchaDemo",
		component: NbCaptchaDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "nbCaptchaDemo",
					title: "NbCaptchaDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-check',
		name: "wheelNbCheck",
		component: NbCheckView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbCheck",
					title: "NbCheckDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-switcher',
		name: "wheelNbSwitcher",
		component: NbSwitcherView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbSwitcher",
					title: "NbSwitcherDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-code-mirror',
		name: "wheelCodeMirror",
		component: NbCodeMirrorDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelCodeMirror",
					title: "NbCodeMirrorDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-flip',
		name: "wheelNbFlip",
		component: NbFlipDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbFlip",
					title: "NbFlipDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-editor',
		name: "wheelNbEditor",
		component: NbEditorDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbEditor",
					title: "BoingPay"
				}
			]
		}
	},
  {
    path: 'wheel/nb-boing-pay',
    name: "wheelNbBoingPay",
    component: NbBoingPayDemo,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "wheelNbBoingPay",
          title: "NbBoingPayDemo"
        }
      ]
    }
  },
	{
		path: 'wheel/nb-expanding',
		name: "nbExpanding",
		component: NbExpandingDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "nbExpanding",
					title: "NbExpandingDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-pager-selection',
		name: "wheelNbPagerSelection",
		component: NbPagerSelectionDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbPagerSelection",
					title: "NbPagerSelectionDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-meta-selection',
		name: "wheelNbMetaSelection",
		component: NbMetaSelectionDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbMetaSelection",
					title: "NbMetaSelectionDemo"
				}
			]
		}
	},

	{
		path: 'wheel/nb-time-picker',
		name: "wheelNbTimePicker",
		component: NbTimePickerView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbTimePicker",
					title: "NbTimePickerDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-date-range',
		name: "wheelNbDateRangeDemo",
		component: NbDateRangeDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbDateRangeDemo",
					title: "NbDateRangeDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-tank',
		name: "wheelNbTank",
		component: NbTankView,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbTank",
					title: "NbTankDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-tag',
		name: "wheelNbTag",
		component: NbTagDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbTag",
					title: "NbTagDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-tabs',
		name: "wheelNbTabs",
		component: NbTabsDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbTabs",
					title: "NbTabsDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-slide-panel',
		name: "wheelNbSlidePanelDemo",
		component: NbSlidePanelDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "wheelNbSlidePanelDemo",
					title: "NbSlidePanelDemo"
				}
			]
		}
	},
	{
		path: 'wheel/nb-district',
		name: "nbDistrict",
		component: NbDistrictDemo,
		meta: {
			requiresAuth: true,
			breadcrumbs: [
				{
					name: "nbDistrict",
					title: "NbDistrictDemo"
				}
			]
		}
	},
  {
    path: 'wheel/SVG-demo',
    name: "SVGDemo",
    component: SVGDemoView,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "SVGDemo",
          title: "SVGDemo"
        }
      ]
    }
  },
  {
    path: 'wheel/summary-chart-demo',
    name: "SummaryChartDemo",
    component: SummaryChartDemo,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "SummaryChartDemo",
          title: "统计分析图表"
        }
      ]
    }
  },
  {
    path: 'wheel/qr-code-demo',
    name: "QRCodeDemo",
    component: QRCodeDemo,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "QRCodeDemo",
          title: "二维码"
        }
      ]
    }
  }

];

export default wheelRouter;


