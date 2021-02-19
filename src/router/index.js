import Vue from 'vue'
import Router from 'vue-router'

// 失败页面
const error = r => require.ensure([], () => r(require('@/components/common/error')), 'error')
// 选择房屋
const houses = r => require.ensure([], () => r(require('@/components/chooseHouse/houses')), 'houses')
// 缴费信息
const payInfo = r => require.ensure([], () => r(require('@/components/payInfo/payInfo')), 'payInfo')
// 预缴费
const advancePay = r => require.ensure([], () => r(require('@/components/advancePay/advancePay')), 'advancePay')
// 预缴费
const valid = r => require.ensure([], () => r(require('@/components/authentication/authentication')), 'authentication')
// 账单列表
const payList = r => require.ensure([], () => r(require('@/components/payList/payList')), 'payList')
// 账单详情
const payDetails = r => require.ensure([], () => r(require('@/components/payDetails/payDetails')), 'payDetails')
// 支付成功
const paySuccess = r => require.ensure([], () => r(require('@/components/paySuccess/paySuccess')), 'paySuccess')







//装修管理

const decoration = r => require.ensure([], () => r(require('@/components/decoration/index')), 'decoration')
const appointments = r => require.ensure([], () => r(require('@/components/decoration/appointments')), 'appointments')
const progress = r => require.ensure([], () => r(require('@/components/decoration/progress')), 'progress')
const pay = r => require.ensure([], () => r(require('@/components/decoration/pay')), 'pay')
const refund = r => require.ensure([], () => r(require('@/components/decoration/refund')), 'refund')
const deOrder = r => require.ensure([], () => r(require('@/components/decoration/deOrder')), 'deOrder')
const upData = r => require.ensure([], () => r(require('@/components/decoration/upData')), 'upData')
const novice = r => require.ensure([], () => r(require('@/components/decoration/novice')), 'novice')
const signature = r => require.ensure([], () => r(require('@/components/decoration/signature')), 'signature')
const signDocument = r => require.ensure([], () => r(require('@/components/decoration/signDocument')), 'signDocument')
const refuceInfo = r => require.ensure([], () => r(require('@/components/decoration/refuceInfo')), 'refuceInfo')
const delay = r => require.ensure([], () => r(require('@/components/decoration/delay')), 'delay')
const deProgress = r => require.ensure([], () => r(require('@/components/decoration/deProgress')), 'deProgress')
const shiLI = r => require.ensure([], () => r(require('@/components/decoration/shiLI')), 'shiLI')
const validHouse = r => require.ensure([], () => r(require('@/components/authentication/authentication')), 'authentication')




Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/houses',
      name: 'houses',
      component: houses,
      meta: {
        title: '选择房屋'
      }
    },
    {
      path: '/error',
      name: 'error',
      component: error,
      meta: {
        title: '访问页面失败'
      }
    },
    {
      path: '/payInfo',
      name: 'payInfo',
      component: payInfo,
      meta: {
        title: '缴费信息'
      }
    },
    {
      path: '/advancePay',
      name: 'advancePay',
      component: advancePay,
      meta: {
        title: '预缴费'
      }
    },
    {
      path: '/idcard',
      name: 'idcard',
      component: validHouse,
      meta: {
        title: '房屋认证'
      }
    },
    {
      path: '/payList',
      name: 'payList',
      component: payList,
      meta: {
        title: '账单列表'
      }
    },,
    {
      path: '/payDetails',
      name: 'payDetails',
      component: payDetails,
      meta: {
        title: '账单详情'
      }
    },,
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess,
      meta: {
        title: '支付成功'
      }
    },
    {
      path: '/decoration',
      name: 'decoration',
      component: decoration,
      meta: {
        title: '装修管理'
      }
    },
    
    {
      path: '/appointments',
      name: 'appointments',
      component: appointments,
      meta: {
        title: '装修申请',
        keepAlive:false
      }
    },
    {
      path: '/progress',
      name: 'progress',
      component: progress,
      meta: {
        title: '装修进度详情'
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,
      meta: {
        title: '装修缴费'
      }
    },
    {
      path: '/refund',
      name: 'refund',
      component: refund,
      meta: {
        title: '我的退款'
      }
    },
    {
      path: '/deOrder',
      name: 'deOrder',
      component: deOrder,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/upData',
      name: 'upData',
      component: upData,
      meta: {
        title: '上传资料'
      }
    },
    {
      path: '/novice',
      name: 'novice',
      component: novice,
      meta: {
        title: '装修须知'
      }
    },
    {
      path: '/signature',
      name: 'signature',
      component: signature,
      meta: {
        title: '装修申请签字'
      }
    },
    {
      path: '/signDocument',
      name: 'signDocument',
      component: signDocument,
      meta: {
        title: '签名文档'
      }
    },
    {
      path: '/refuceInfo',
      name: 'refuceInfo',
      component: refuceInfo,
      meta: {
        title: '申请退款'
      }
    },
    {
      path: '/delay',
      name: 'delay',
      component: delay,
      meta: {
        title: '装修延期'
      }
    },
    {
      path: '/deProgress',
      name: 'deProgress',
      component: deProgress,
      meta: {
        title: '装修流程'
      }
    },
    {
      path: '/shiLI',
      name: 'shiLI',
      component: shiLI,
      meta: {
        title: '示例'
      }
    },
  ]
})
