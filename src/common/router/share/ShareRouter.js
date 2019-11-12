import updateAppView from '../../../share/view/UpdateApp'
import inviteUserView from '../../../share/view/InviteUserShare'

let shareRouter = [
  //用于更新app的页面
  {
    path: 'update/app',
    component: updateAppView,
    meta: {requiresAuth: false}
  },
  // 邀请访客分享页面
  {
    path: 'invite/visitor/detail',
    component: inviteUserView,
    meta: { requiresAuth: false }
  }
]

export default shareRouter;
