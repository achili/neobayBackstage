import Vue from 'vue'
import Router from 'vue-router'
import store from '../../common/store'

import LoginFrame from '../../login/LoginFrame.vue'
import ProjectFrame from '../../group/GroupFrame.vue'
import DeveloperFrame from '../../developer/DeveloperFrame.vue'
import ByFrameView from '../../backyard/Frame.vue'
import OtherFrame from '../../other/OtherFrame.vue'
import ShareFrame from '../../share/ShareFrame.vue'
import UserFrame from '../../user/UserFrame.vue'

import loginRouter from './login/LoginRouter'

import groupRouter from './group/GroupRouter'
import groupEnterRouter from './group/EntryApplyRouter'
import groupProjectRouter from './group/GroupProjectRouter'
import groupKeeperBusinessRouter from './group/GroupKeeperRouter'
import groupSpaceApplyRouter from './group/GroupSpaceApplyRouter'
import groupCompanyRouter from './group/CompanyRouter'
import groupConferenceRouter from './group/GroupConferenceRouter'
import groupSmartRouter from './group/GroupSmartRouter'
import groupTorchRouter from './group/TorchStatisticsRouter'

import developerRouter from './developer/DeveloperRouter'
import developerArticleRouter from './developer/ArticleRouter'
import qixiaodongDebugRouter from "./developer/QixiaodongDebugRouter";
import interfaceDebugRouter from "./developer/InterfaceDebugRouter";
import printDebugRouter from "./developer/PrintDebugRouter";
import developerWheelRouter from './developer/WheelRouter'
import developerTankRouter from './developer/TankRouter'
import developerTemplateRouter from './developer/TemplateRouter'

import ByIndexView from '../../backyard/view/index/Index.vue'
import NotFoundView from '../../404/404.vue'
import {byCarouselRouter} from './backyard/OfficialCarouselRouter'
import {byMakerApartmentRouter} from './backyard/MakerApartmentRouter'
import {byMakerOrderRouter} from './backyard/MakerOrganizationRouter'
import {byMakerCardRouter} from './backyard/MakerCardRouter'
import {byMakerCarouselRouter} from './backyard/MakerCarouselRouter'
import {byMakerSportRouter} from './backyard/MakerSportRouter'
import {byMakerParkRouter} from './backyard/MakerParkRouter'
import {byMakerHotelRouter} from './backyard/MakerHotelRouter'
import {byMakerMarketRouter} from './backyard/MakerMarketRouter'
import {byParkingRouter} from './backyard/ParkingRouter'
import {bySurveyRouter} from './backyard/SurveyRouter'
import {byEntryRouter} from './backyard/EntryRouter'
import {byFinanceRouter} from './backyard/FinanceRouter'
import {byProtocolRouter} from './backyard/ProtocolRouter'
import {bySpaceRouter} from './backyard/SpaceRouter'
import {byUserRouter} from './backyard/UserManageRouter'
import {byProjectRouter} from './backyard/ProjectRouter'
import {byMentorRouter} from './backyard/MentorRouter'
import {byMeetingRouter} from './backyard/MeetingRouter'
import {byExportMetaRouter} from './backyard/ExportMetaRouter'
import {byCompanyRouter} from './backyard/CompanyRouter'
import {byTorch2017Router, byTorch2018Router} from './backyard/TorchStatisticsRouter'
import {byNotificationRouter} from './backyard/NotificationRouter'
import {byMessageRouter} from './backyard/MessageManageRouter'
import {byKeeperRouter} from './backyard/KeeperRouter'
import {byNurseryRouter} from './backyard/SpaceApplyRouter'
import {byOfficialStarRouter} from './backyard/OfficialStarRouter'
import {byOfficialArticleRouter} from './backyard/OfficialArticleRouter'
import {byOfficialActivityRouter} from './backyard/OfficialActivityRouter'
import {byOfficialPolicyRouter} from './backyard/OfficialPolicyRouter'
import {bySummaryStatisticsRouter} from './backyard/SummaryStatisticsRouter'
import {byOfficialHelpRouter} from './backyard/OfficialHelpRouter'
import {byPreferenceRouter} from './backyard/PreferenceRouter'
import {byReceptionRouter} from './backyard/Reception'
import {bySpaceInvestmentRouter} from './backyard/SpaceInvestmentRouter'
import {byNoMessageRouter} from './backyard/NoMessageRouter'
import byIsSpaceNetworkRouter from './backyard/IsSpaceNetworkRouter'
import byISpaceDoorRouter from './backyard/ISpaceRouter'
import byIsSpacePrintRouter from './backyard/IsSpacePrintRouter'

import userRouter from './user/UserRouter'
import userMessageRouter from './user/MessageRouter'
import userEntryApplyRouter from './user/EntryApplyRouter'
import invitationRouter from './user/InvitationRouter'


import otherRouter from './other/OtherRouter'
import shareRouter from './share/ShareRouter'

import {byTeamworkRouter} from "./backyard/TeamworkRouter";
import {byInvestmentRouter} from "./backyard/InvestmentRouter";
import groupInvestmentRouter from "./group/InvestmentRouter";
import {byConferenceRoomRouter} from "./backyard/ConferenceRoomRouter";
import {byConferenceRoomReservationRouter} from "./backyard/ConferenceRoomReservationRouter";
import byIsSpaceEnergyRouter from './backyard/IsSpaceEnergyRouter'
import {byInviteVisitorRouter} from "./backyard/InviteVisitor";
import {bySpaceRegionalRouter} from "./backyard/SpaceRegionalRouter";

Vue.use(Router);


let router = new Router({
	mode: 'history',
	linkActiveClass: 'is-link-active',
	scrollBehavior: () => ({y: 0}),
	routes: [
    //登陆、注册
    {
      path: '/login',
      component: LoginFrame,
      meta: {requiresAuth: false},
      children: [
        //这个是用于前台显示的入驻申请(页中页)
        ...loginRouter
      ]
    },
    //项目中心
    {
      path: '/group',
      component: ProjectFrame,
      meta: {requiresAuth: false},
      children: [

        ...groupRouter,
        ...groupEnterRouter,
        ...groupConferenceRouter,
        ...groupProjectRouter,
        ...groupKeeperBusinessRouter,
        ...groupSpaceApplyRouter,
        ...groupCompanyRouter,
        ...groupTorchRouter,
        ...groupSmartRouter,
        ...groupInvestmentRouter
      ]
    },
    //开发者工具
    {
      path: '/developer',
      component: DeveloperFrame,
      meta: {requiresAuth: true},
      children: [
        ...developerRouter,
        ...developerArticleRouter,
        ...qixiaodongDebugRouter,
        ...interfaceDebugRouter,
        ...printDebugRouter,
        ...developerTankRouter,
        ...developerWheelRouter,
        ...developerTemplateRouter

      ]
    },
    //这个是控制台
		{
			path: '/by',
			component: ByFrameView,
			meta: {requiresAuth: true},
			children: [
				{
					path: '',
          redirect: { name: 'byIndex' }
				},
				{
					path: 'index',
					name: "byIndex",
					component: ByIndexView,
					meta: {requiresAuth: true}
				},
				...byCarouselRouter,
        ...byMakerApartmentRouter,
        ...byMakerCardRouter,
        ...byMakerOrderRouter,
				...byMakerCarouselRouter,
				...byMakerSportRouter,
				...byMakerHotelRouter,
				...byMakerParkRouter,
        ...byMakerMarketRouter,
				...byParkingRouter,
				...byNurseryRouter,
				...bySurveyRouter,
				...byEntryRouter,
				...byFinanceRouter,
				...byProtocolRouter,
				...bySpaceRouter,
				...byUserRouter,
				...byMessageRouter,
				...byMeetingRouter,
				...byProjectRouter,
				...byMentorRouter,
				...byCompanyRouter,
        ...byTorch2017Router,
        ...byTorch2018Router,
				...byNotificationRouter,
				...byKeeperRouter,
				...byExportMetaRouter,
				...byOfficialStarRouter,
				...byPreferenceRouter,
				...byOfficialArticleRouter,
				...byOfficialPolicyRouter,
        ...bySummaryStatisticsRouter,
				...byOfficialActivityRouter,
				...byOfficialHelpRouter,
        ...byReceptionRouter,
        ...bySpaceInvestmentRouter,
        ...byNoMessageRouter,
        ...byTeamworkRouter,
        ...byInvestmentRouter,
        ...byConferenceRoomRouter,
        ...byConferenceRoomReservationRouter,
        ...byISpaceDoorRouter,
        ...byIsSpacePrintRouter,
        ...byIsSpaceNetworkRouter,
        ...byIsSpaceEnergyRouter,
        ...byInviteVisitorRouter,
        ...bySpaceRegionalRouter
			]
		},
    {
      path: '/user',
      component: UserFrame,
      meta: {requiresAuth: false},
      children: [
        ...userRouter,
        ...userMessageRouter,
        ...userEntryApplyRouter,
        ...invitationRouter
      ]
    },

    {
      path: '/other',
      component: OtherFrame,
      meta: {requiresAuth: false},
      children: [
        ...otherRouter
      ]
    },
    {
      path: '/share',
      component: ShareFrame,
      meta: {requiresAuth: false},
      children: [
        ...shareRouter
      ]
    },
    //重定向 未来会删除
    {
      path: '/user/login',
      redirect : '/login'
    },
    //未被上面处理的route被视为404
		{
			path: '*',
			component: NotFoundView,
			meta: {requiresAuth: false}
		}

	]
});


//add global interceptor.
router.beforeEach((to, from, next) => {

	//handle breadcrumbs things.
	if (to.meta.breadcrumbs) {
		store.state.breadcrumbs = to.meta.breadcrumbs;
	} else {
		store.state.breadcrumbs = [];
	}

	if (to.meta.title) {
		document.title = to.meta.title;
	} else {
		document.title = "零号湾 | 全球创新创业集聚区";
	}


	//handle auth feature.
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (store.state.user.isLogin) {
			next()
		} else {
			next({
				path: '/login',
				query: {redirect: to.fullPath}
			})
		}
	} else {
		next()
	}
});

export default router;
