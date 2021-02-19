<template>
  <div class="pay-detail">
   <!-- 用户缴费明细 -->
   <div v-title data-title="用户缴费明细" ></div>
   <div class="info-box">
     <div class="top-box">
       <div class="top-info">
         <div class="top-label">物业付款全额</div>
         <div class="money">¥{{payInfo.payMoney}}</div>
       </div>
       <ul class="ul-list">
         <li class="li-item">
           <div class="li-label">缴费时间:</div>
           <div class="li-val">{{payInfo.payTime}}</div>
         </li>
         <li class="li-item">
           <div class="li-label">流水号:</div>
           <div class="li-val">{{payInfo.payNumber}}</div>
         </li>
         <li class="li-item">
           <div class="li-label">缴费小区:</div>
           <div class="li-val">{{payInfo.roomAddress}}</div>
         </li>
         <li class="li-item">
           <div class="li-label">支付方式:</div>
           <div class="li-val">{{payType}}</div>
         </li>
         <li class="li-item">
           <div class="li-label">缴费类型:</div>
           <div class="li-val">{{payInfo.recordType==1?'欠费':'预缴费'}}</div>
         </li>
         <li class="li-item" v-if="payInfo.recordType==2">
           <div class="li-label">缴费月数:</div>
           <div class="li-val">{{payInfo.prepayMonth}}</div>
         </li>
       </ul>
     </div>
     <div class="content-foot">

       
        
      
       <ul class="ul-list">
         <li class="li-item" v-for="(item,index) in payDesc" :key="index">
            <div class="li-top">
              <div class="li-top-left">{{payInfo.recordType==2?'每月费用':item.month}}</div>
              <!-- <div class="li-top-left">{{item.month}}</div> -->
              <div class="li-top-right">￥{{item.totalAmount}}</div>
            </div>
            <ul class="use-list">
              <li class="use-item" v-for="(ite,ind) in item.list" :key="ind">
                <div class="use-label">{{ite.costname}}</div>
                <div class="use-val">￥{{ite.amount}}</div>
              </li>
            </ul>
         </li>
       </ul>

     </div>
   </div>
   <div class="foot-tip"> <span class="tip-desc">已经到底了</span></div>
  </div>
</template>

<script>
import api from '../../config/api.js'
import Util from '../../utils/utils'
// import { XButton } from 'vux'

export default {
  name: 'houses',
  components: {
    // XButton
  },
  data () {
    return {
      

      payInfo:{},
      payDesc:[],  //详情列表
      payType:null
    }
  },
  created () {
  },
  computed:{
   
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      // 1微信 2支付宝 3光大银行 4微信H5
      let token = this.localData("get", "token");
      let payNumber=this.$route.query.payNumber;
      let house = this.localData("get", "pay_house");
      let roomId = house.roomId;
      // if (typeof(payNumber) == "undefined")
      // {
      //     this.$router.push('error')
      // }
      api.Axios.get(api.ROOM_PAY_DETAIL(token,payNumber)).then((res) => {
        if (res.data.code === 0) {
             res.data.data.pay.payTime=this.formatTime(res.data.data.pay.payTime);

            this.payInfo=res.data.data.pay;
            this.computePayType(res.data.data.pay.payType)
            this.payDesc=res.data.data.detail;
        } else {
          this.$toast('网络或者系统错误，请稍后再试\n\r'+res.data.requestId, 10000);
        }
      });
    },
    computePayType(payType){
      switch (payType) {
        case 1:
            return this.payType='微信'
          break;
        case 2:
            return this.payType='支付宝'
          break;
        case 3:
        console.log(464654)
            return this.payType='光大银行'
          break;
        case 4:
            return this.payType='微信H5'
          break;
        default:
          break;
      }
    },
    getParam () {
    
    },
     

  }
}
</script>

<style lang="stylus" scoped>
  
  .pay-detail
    margin-top: 16px;
    .title
      padding 14px 0
      text-align center
      color #444
      font-size 18px
      margin-bottom 15px
    .info-box
      margin 0 16px 0 16px 
      .top-box
        padding 25px 16px 1px
        box-shadow:0px 0px 16px 0px rgba(0,0,0,0.08);
        border-radius:8px;
        color:rgba(68,68,68,1);
        .top-info
          margin-bottom 30px
          display flex
          justify-content space-between
          .top-label
            font-size:18px;
            font-weight:500;
          .money
            font-size:18px;
            color:rgba(233,108,5,1);
        .ul-list
          .li-item  
            margin-bottom 27px
            display flex
            align-items baseline
            .li-label
              font-size:15px;
              font-weight:500;
              width: 26%;
              white-space: nowrap;
              text-align: left;
            .li-val
              font-size:14px;
              font-weight:400;
              width: 74%;
              color:rgba(153,153,153,1);
              text-align left 
              padding-left: 10px;
      .content-foot
        margin 30px 16px
        .ul-list
          .li-item  
            margin-bottom 40px
            .li-top
              font-size:17px;
              color:rgba(68,68,68,1);
              display flex
              justify-content space-between
              margin-bottom 30px
              font-weight:500;

            .use-list
              .use-item
                color:rgba(153,153,153,1);
                font-size:14px;
                display flex
                justify-content space-between
                margin-bottom 30px
  .foot-tip
    padding: 0 0 30px;
    .tip-desc
      position relative
      font-size:13px;
      color:rgba(204,204,204,1);
      &:after
        content ''
        width 66px
        height 1px
        position: absolute;        
        top: 52%;
        right 74px
        background:rgba(238,238,238,1);
      &:before
        content ''
        width 66px
        height 1px
        position: absolute;         
        top: 52%;
        left 74px
        background:rgba(238,238,238,1);



</style>
