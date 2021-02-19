import Axios from 'axios'
// import { get, post } from './http'

let host;
if (process.env.NODE_ENV === 'production') {
  host = 'http://wyfee-h5-api.aylives.cn'
  
} else {
  host = 'http://wyfee-h5-api-test.aylives.cn'
}




// let doorhost = '//lars.aylives.cn'

// Axios.defaults.withCredentials = true   //跨域访问需要发送cookie时一定要加


let api = {
  Axios: Axios,
  // 获取token
  ROOM_TOKEN: (arg)=>`${host}/roomAuth/auth?mobile=${arg.mobile}&twRoomIds=${arg.twRoomIds}&sign=${arg.sign}&openId=${arg.openId}`,
  // 房屋列表
  ROOM_LIST: (token)=>`${host}/roomAuth/roomList?token=${token}`,
  // 查询房屋欠费信息
  ROOM_PAY_INFO: (token,roomId)=>`${host}/roomPay/fee?token=${token}&roomId=${roomId}`,
  // 房屋认证
  ROOM_VALID: (arg)=>`${host}/roomAuth/auth/idcard?token=${arg.token}&idcard=${arg.idcard}`,
  
  
  // 缴费历史
  ROOM_PAY_HISTORY:(arg)=>`${host}/roomPay/payHistory?token=${arg.token}&roomId=${arg.roomId}&pageNo=${arg.pageNo}&pageSize=${arg.pageSize}`,
  // 缴费明细
  ROOM_PAY_DETAIL:(token,payNumber)=>`${host}/roomPay/historyDetail?token=${token}&payNumber=${payNumber}`,
  // 欠费缴费
  ROOM_PAY:`${host}/roomPay/pay`,
  // 预缴费
  ROOM_PAY_PREPAY:`${host}/roomPay/prepay`,
}

export default api
