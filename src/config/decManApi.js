import axios from 'axios'

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://third-part-api.aylives.cn/'  //正式
  // baseURL = 'http://third-part-api-test.aylives.cn'
} else {
  baseURL = 'http://third-part-api-test.aylives.cn'
  // baseURL = 'http://third-part-api.aylives.cn/'  //正式
}

axios.defaults.baseURL = baseURL

let uploadURL = 'http://hr-api.aoyuancm.com/wxhr/upload/img'
export const baseUploadURL = uploadURL
// 预约时间
export const subscribeNum = params => {
  return axios.post('/decorate/subscribe/num', params).then(res => res.data)
}
//房屋列表
export const roomList = params => {
  return axios.post('/third/user/room', params).then(res => res.data)
}
//添加预约
export const decoAdd = params => {
  return axios.post('/decorate/add', params).then(res => res.data)
}

//装修列表
export const decList = params => {
  return axios.post('/decorate/list', params).then(res => res.data)
}

//装修申请详情
export const decDetail = params => {
  return axios.post('/decorate/detail', params).then(res => res.data)
}

//装修详情列表
export const decDetailList = params => {
  return axios.post('/decorate/status/list', params).then(res => res.data)
}

//发起验收9  申请退款12
export const addStatus = params => {
  return axios.post('/decorate/status/addStatus', params).then(res => res.data)
}
//获取缴费信息
export const payfee = params => {
  return axios.post('/app/decorate/order/pay/fee', params).then(res => res.data)
}
//订单列表
export const payList = params => {
  return axios.post('/app/decorate/order/pay/list', params).then(res => res.data)
}
//退款列表
export const rufundList = params => {
  return axios.post('/app/decorate/order/pay/refund/list', params).then(res => res.data)
}
//退款列表
export const filesSave = params => {
  return axios.post('/decorate/filesSave', params).then(res => res.data)
}
//装修类型
export const typeList = params => {
  return axios.post('/app/house/decorate/content/type/list', params).then(res => res.data)
}
//退款列表
export const filesGet = params => {
  return axios.post('/decorate/sign/files/get', params).then(res => res.data)
}
//上传签名文件
export const filesPost = params => {
  return axios.post('/decorate/sign/files/post', params).then(res => res.data)
}
//新增退款信息
export const refundAdd = params => {
  return axios.post('/app/decorate/order/pay/refund/add', params).then(res => res.data)
}
//新增退款信息
export const decorateDelay = params => {
  return axios.post('/decorate/delay', params).then(res => res.data)
}


//资料更改
export const decorateUpdate = params => {
  return axios.post('/decorate/update', params).then(res => res.data)
}
