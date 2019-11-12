import otherEntryForm from '../../../backyard/view/entry/apply/widget/ExposeCreate.vue'
import otherEntryFormCUMT from '../../../backyard/view/entry/apply/widget/ExposeCreateCUMT.vue'
import otherMakerForm from '../../../backyard/view/maker/sport/Create'
import otherMakerApartmentForm from '../../../backyard/view/maker/apartment/Create'
import otherMakerParkForm from '../../../backyard/view/maker/simple/Create'
import otherMakerMarketForm from '../../../backyard/view/maker/market/Create'
import otherMakerHotelForm from '../../../backyard/view/maker/hotel/Create'
import otherMakerCardForm from '../../../backyard/view/maker/card/Create'
import otherFinanceForm from '../../../backyard/view/investment/Create'



let otherRouter = [
  //这个是用于前台显示的入驻申请(页中页)
	{
		path: 'entry/form',
		component: otherEntryForm,
		meta: {requiresAuth: true}
	},
  //这个是用于前台显示的中国矿业大学入驻申请(页中页)
  {
    path: 'entry/form/type',
    component: otherEntryFormCUMT,
    meta: {requiresAuth: true}
  },
  //这个是用于创客无忧前台显示的体育运动申请表(页中页)
  {
    path: 'maker/sport',
    component: otherMakerForm,
    meta: {requiresAuth: true}
  },
  //这个是用于创客无忧前台显示的人才公寓申请表(页中页)
  {
    path: 'maker/apartment',
    component: otherMakerApartmentForm,
    meta: {requiresAuth: true}
  },
  //这个是用于创客无忧前台显示的停车缴费申请表(页中页)
  {
    path: 'maker/simple/apply',
    component: otherMakerParkForm,
    meta: {requiresAuth: true}
  },
  //这个是用于创客无忧前台显示的园区市集申请表(页中页)
  {
    path: 'maker/market',
    component: otherMakerMarketForm,
    meta: {requiresAuth: true}
  },
  //这个是用于创客无忧前台显示的协议酒店申请表(页中页)
  {
    path: 'maker/hotel',
    component: otherMakerHotelForm,
    meta: {requiresAuth: true}
  },
  //这个是用于创客无忧前台显示的一卡通申请表(页中页)
  {
    path: 'maker/card',
    component: otherMakerCardForm,
    meta: {requiresAuth: true}
  },
  //这个是用于企业无忧前台显示的投资融资申请表(页中页)
  {
    path: 'finance/form',
    component: otherFinanceForm,
    meta: {requiresAuth: true}
  }
];

export default otherRouter;
