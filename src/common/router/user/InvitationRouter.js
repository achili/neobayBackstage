import Detail from '../../../user/view/invitation/Detail.vue'

let invitationRouter = [
  {
    path: 'project/administrator/invitation/:key',
    name: "InvitationDetail",
    component: Detail,
    meta: {
      requiresAuth: true,
      breadcrumbs: [
        {
          name: "InvitationDetail",
          title: "项目管理团队邀请"
        }
      ]
    }
  }
]


export default invitationRouter
