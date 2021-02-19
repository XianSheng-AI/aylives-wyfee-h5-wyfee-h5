<template>
  <div class="payInfo">
    <!-- 缴费信息 -->
    <div v-title data-title="缴费信息" ></div>
        
    <div v-show="loadingShow"
         class="loading-box">
      <van-loading  type="circular" />
    </div>
    <div v-show="picShow">
      
    
    
    <div class="infoBox">
      <div class="address">
        <div class="address-name">{{houseData.agencyName}}</div>
        <div class="address-desc">
          <img src="../../assets/images/address.png" class="icon-img" alt />
          <span class="address-detail color-Gray">{{houseData.roomName}}</span>
        </div>
      </div>
      <div class="content-box">
        <div class="option">
          <div class="option-left">待缴费</div>
          <div class="option-right color-Gray" @click="historyPay">历史账单</div>
        </div>
        <div class="show-pay">
          <div class="pay-content">
            <div class="pay-desc color-Gray">待缴费月数 (月)</div>
            <div class="pay-num color-Gray">{{houseData.waitPayMonth==0?'无':houseData.waitPayMonth}}</div>
          </div>
          <div class="pay-content">
            <div class="pay-desc color-Gray">待缴费金额 (元)</div>
            <div class="pay-num color-Gray">{{houseData.waitPayMoney==0?'无':houseData.waitPayMoney}}</div>
          </div>
        </div>
        <div class="pay-list">
          <ul>
            <li v-for="(item,index) in payInfo" :key="index" class="pay-li">
              <div class="timer color-Gray">{{item.payMonth}}</div>
              <div class="count-box" @click="showIndex=index">
                <div class="count" @click="item.show=!item.show">
                  <div class="count-desc">{{item.itemName}}</div>
                  <div class="count-num">
                    ￥{{item.payMoney}}
                    <img
                      src="../../assets/images/show.png"
                      alt
                      :class="['show-icon',{'show':item.show}]"
                    />
                  </div>
                </div>
                <ul class="use-list" :class="{'show':item.show}">
                  <li class="use-item" v-for="(ite,ind) in item.details" :key="ind">
                    <div class="use-label">{{ite.detailName}}</div>
                    <div class="use-val">￥{{ite.detailMoney}}</div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="picker-box">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="value1" :options="option1" style="width:100%" />
      </van-dropdown-menu>
    </div> -->
    
    <transition name="fade">
      <div class="fade mask" v-show="show" @click="hideConfirm"></div>
    </transition>
    <!-- <div v-if="pay" class="posi-btn">
      <button class="submit" @click="confirm">立即缴费</button>
    </div> -->
    <div class="posi-btn">
      <transition name="fade">
        <div class="fade ralative" v-show="show">
          <div class="submit-info">
            <div class="month">每月费用：{{arrearsInfo.prePayMoney}}元</div>
            <!-- <div class="month">每月费用：{{houseData.payMoney}}元</div> -->
            
            <div class="pay-time">
              <van-dropdown-menu direction="up">
                <van-dropdown-item v-model="prePayMonth" :options="option1" style="width:100%" />
              </van-dropdown-menu>
              <!-- 缴费时间：{{prePayMonth}}个月 -->
            </div>
            <!-- <div class="pay-time">缴费时间：{{houseData.waitPayMonth}}个月</div> -->
            <div class="pay-all">
              合计金额：
              <span class="total">￥{{prePayTotal}}</span>
            </div>
          </div>
        </div>
      </transition>
      <button class="submit" :class="[{'alClick':hasClick}]" v-if="!has" @click="advancePay">{{show?'确定':'预缴费'}}</button>
      <button class="submit" :class="[{'alClick':hasClick}]" v-if="has"  @click="sureConfirm">立即缴费</button>
      <!-- <button class="submit" v-if="has"  @click="sureConfirm">{{show?'确定2':'立即缴费'}}</button> -->
    </div>
    </div>
  </div>
</template>

<script>
import api from "../../config/api.js";
import Util from "../../utils/utils";
// import { XButton } from 'vux'

export default {
  name: "houses",
  components: {
    // XButton
  },
  data() {
    return {
      hasClick:false,

      loading:false,
      loadingShow: true,
      picShow: false,
      // preMonth:3,
      option1: [
        { text: '缴费时间：3个月', value: 3 },
        { text: '缴费时间：6个月', value: 6 },
        { text: '缴费时间：9个月', value: 9 },
        { text: '缴费时间：12个月', value: 12 },
      ],

      houseData: {
        agencyName: "",
        roomName: "",
        waitPayMonth: 0,
        waitPayMoney: 0,
        payMoney:'',
      },
      payInfo: [],
      showIndex:null,
      roomId:null,
      wxInfo:{},
      has:false,   //预缴费

      column1: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      slots: [
        {
          // flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          // textAlign: 'right'
        }
      ],
      //无欠费
      arrearsInfo:{
        activityTips: "",
        items: [],
        prePayMoney: 760.31,
        prePayType: 0
      },  
      prePayMonth:3,  //预缴费月数
      // prePayTotal:0,  //预缴费月数

      pay: false,
      show: false,
      isShow: false,

      token: "",
    };
  },
  created() {},
  computed: {
    prePayTotal(){
      let total=Number(this.arrearsInfo.prePayMoney)*Number(this.prePayMonth);
      return total.toFixed(2)
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let house = this.localData("get", "pay_house");
      this.houseData.agencyName = house.agencyName;
      this.houseData.roomName = house.roomName;
      let token = this.localData("get", "token");
      this.token=token;
      let roomIdNum = this.$route.query.roomId;
      this.roomId=roomIdNum
      api.Axios.get(api.ROOM_PAY_INFO(token, roomIdNum)).then((res) => {
        if (res.data.code === 0) {
          this.loadingShow = false
          this.picShow = true
          let has=res.data.data.items.length;
          if(!has){
            // 没有欠费
            this.has=false;
            this.arrearsInfo=res.data.data;
            return;
          }
          this.has=true;
          this.houseData.waitPayMonth = res.data.data.waitPayMonth;
          this.houseData.waitPayMoney = res.data.data.waitPayMoney;
          this.houseData.payMoney = res.data.data.items[0].payMoney;
          let itemsArr=res.data.data.items
          itemsArr.forEach(item => {
            item.show=false;
          });
          this.payInfo = itemsArr;
        } else {
          this.$toast('网络或者系统错误，请稍后再试\n\r'+res.data.requestId, 10000);
          this.loadingShow=false;
        }
      });
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    onChange(){

    },
    historyPay() {
      this.$router.push({ path: "/paylist", query: { type: "0" } });
    },
    hideConfirm() {
      this.show = !this.show;
    },
    // 预缴费
    advancePay(){
      let that=this;
      if (this.show) {     //点击切换  先注释
        this.hasClick=true;
        //确定进行支付
        let params={
            token:this.token,
            roomId:this.roomId,
            monthNum:this.prePayMonth
        }
         let formdata = new FormData();
         for(var key in params){
            formdata.append(key,params[key]);
          }
        api.Axios({
          url: api.ROOM_PAY_PREPAY,
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.data.code === 0) {
              that.wxInfo=res.data.data;
              that.bindOnBridgeReady();
          } else {
            that.$toast(res.data.msg, 1500)
          }
        })

      } else {
        this.show = !this.show;
      }
    },
    sureConfirm() {
      this.hasClick=true;
      let list=this.payInfo;
      let that=this;
      let detailBillIDs='',
          arr=[];
      list.forEach(item=>{
        item.details.forEach(ite=>{
          arr.push(ite.detailBillID); 
        })
      })
        //确定进行支付
        let params={
            token:this.token,
            roomId:this.roomId,
            detailBillIDs:arr.join(',')
        }
         let formdata = new FormData();
         for(var key in params){
            formdata.append(key,params[key]);
          }
        api.Axios({
          url: api.ROOM_PAY,
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.code === 0) {
              that.wxInfo=res.data.data;
              that.bindOnBridgeReady();
          } else {
            that.$toast(res.data.msg, 1500)
          }
        })
    },
    bindOnBridgeReady(){
      let that=this;
      if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady',that.onBridgeReady, false);
          } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
          }
      } else {
          that.onBridgeReady();
      }
    },
    onBridgeReady(){
      let that=this;
      let wxInfo=this.wxInfo; 
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
        "appId": wxInfo.appId,     //公众号名称，由商户传入
        "timeStamp": wxInfo.timeStamp,         //时间戳，自1970年以来的秒数
        "nonceStr": wxInfo.nonceStr, //随机串
        "package": wxInfo.packageValue,
        "signType": wxInfo.signType,         //微信签名方式：
        "paySign": wxInfo.paySign //微信签名
    },
        function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              that.$router.push({path:'/houses',query:{token:that.token}})
             }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              else{
                that.hasClick=false;
              }
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.loading-box{
  position: absolute;
  padding-top: 75%;
  padding-left: 45%;
}
.fade {}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.payInfo {
  font-family: PingFangSC-Regular, PingFang SC;
  margin-top: 16px;
  .color-Gray {
    color: #999999;
  }

  .title {
    padding: 14px 0;
    text-align: center;
    color: #444;
    font-size: 18px;
    margin-bottom: 15px;
  }

  .infoBox {
    margin: 0 16px 0 16px;

    .address {
      padding: 23px 20px;
      box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
      border-radius: 8px;

      .address-name {
        font-size: 17px;
        font-weight: 500;
        color: rgba(68, 68, 68, 1);
        text-align: left;
        margin-bottom: 35px;
      }

      .address-desc {
        display: flex;
        align-items: center;
        text-align: left;
        align-items: end;

        .icon-img {
          display: block;
          margin-right: 13px;
        }

        .address-detail {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }

    .content-box {
      .option {
        display: flex;
        justify-content: space-between;
        margin: 47px 16px 20px;

        .option-left {
          font-size: 18px;
          font-weight: 500;
          color: rgba(68, 68, 68, 1);
        }

        .option-right {
          font-size: 16px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }

      .show-pay {
        padding: 33px 26px;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        display: flex;

        .pay-content {
          width: 50%;

          .pay-desc {
            font-size: 14px;
            margin-bottom: 30px;
          }

          .pay-num {
            font-size: 28px;
            font-family: DIN-Bold, DIN;
            font-weight: bold;
            color: rgba(233, 108, 5, 1);
          }
        }
      }
      .pay-list{
        margin: 40px 0 80px;
        .pay-li{
            margin-bottom 30px
            .timer {
                text-align: left;
                // margin: 40px 0 30px;
                font-size: 17px;
                font-family: PingFang-SC-Medium, PingFang-SC;
                font-weight: 500;
                color: rgba(119, 119, 119, 1);
            }

            .count-box {
                margin-top 10px
                box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.08);
                border-radius: 8px;
                padding: 10px;
                .count {
                display: flex;
                justify-content: space-between;

                .count-desc {
                    font-size: 17px;
                    font-weight: 500;
                    color: rgba(119, 119, 119, 1);
                }

                .count-num {
                    font-size: 17px;
                    font-weight: 500;
                    color: rgba(119, 119, 119, 1);
                    display: flex;
                    align-items: center;

                    .show-icon {
                    margin-left: 8px;
                    transition: 0.2s;
                    transform: rotateZ(-90deg);

                    &.show {
                        transform: rotateZ(0);
                    }
                    }
                }
                }

                .use-list {
                position: relative;
                height: 0;
                visibility: hidden;
                transition: 0.2s;
                opacity: 0;

                &.show {
                    opacity: 1;
                    height: auto;
                    visibility: visible;
                    padding-top: 36px;
                }

                &:after {
                    content: '';
                    position: absolute;
                    top: 17px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: #f5f3f3;
                }

                .use-item {
                    color: rgba(153, 153, 153, 1);
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;

                    &:last-child {
                    margin: 0;
                    }
                }
                }
            }
        }
      }
    }
  }

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .posi-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    .submit {
      background: linear-gradient(135deg, rgba(233, 108, 5, 1) 0%, rgba(234, 67, 4, 1) 100%);
      font-size: 17px;
      font-weight: 500;
      color: #ffffff;
      width: 100%;
      height: 47px;
      &.alClick{
        background #e8e8e8;
        pointer-events: none;
      }
    }

    .ralative {
      z-index: 100;
      position: relative;
      width: 100%;

      .submit-info {
        position: absolute;
        box-sizing: content-box;
        left: 0;
        right: 0;
        text-align: left;
        bottom: 0px;
        background: #fff;
        display: block;
        padding: 30px 27px;

        .month {
          color: #999;
          font-size: 17px;
          font-weight: 500;
          padding-left: 11px;
        }

        .pay-time {
          background: rgba(245, 245, 245, 1);
          border-radius: 8px;
          // border: 1px solid rgba(238, 238, 238, 1);
          margin: 30px 0;
          font-size: 17px;
          font-weight: 500;
          color: rgba(68, 68, 68, 1);
          // padding: 16px 11px;
        }

        .pay-all {
          font-size: 17px;
          font-weight: 500;
          color: rgba(68, 68, 68, 1);
          padding-left: 11px;

          .total {
            display: inline-block;
            font-size: 24px;
            font-family: DIN-Bold, DIN;
            font-weight: bold;
            color: rgba(233, 108, 5, 1);
          }
        }
      }
    }
  }
}
.pay-time >>> .van-dropdown-menu__bar{
  background-color: #f5f5f5;
  border: 1px solid #eee;
  box-shadow none 
}
.pay-time >>> .van-dropdown-menu__item{
  justify-content end
}
.pay-time >>> .van-ellipsis{
  font-size 17px
}
.pay-time >>> .van-cell{
  font-size 17px
  padding: 10px 38px;
}
.pay-time >>> .van-dropdown-menu__title{
  font-weight:400;
  color:#444;
  padding: 0 11px;
}
</style>
