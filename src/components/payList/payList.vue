<template>

  <div class="payInfo">
   <!-- 缴费列表 -->
   <div v-title data-title="用户缴费历史账单" ></div>
    <div class="infoBox">
        <div class="address">
            <div class="address-name">
                {{houseData.agencyName}}
            </div>
            <div class="address-desc">
                <img src="../../assets/images/address.png" class="icon-img" alt="">
                <span class="address-detail color-Gray">{{houseData.roomName}}</span>
            </div>
        </div>
        <div class="content-box">

            <!-- <div class="option">
                <div class="option-left">2019年</div>
            </div> -->
            <div class="content-list">

              
                <van-list
                v-model="loading"
                :finished="finished"
                :immediate-check='false'
                :offset="4"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="onLoad"
              >
              <ul class="ul-list">
                <li class="li-item" v-for="(item,index) in payInfo" :key="index">
                  <div class="li-item-content" @click="detail(item.payNumber)">
                    <div class="li-left">
                      <div class="li-name">物业费</div>
                      <p class="li-desc">{{item.payTime}}</p>
                    </div>
                    <div class="li-right">￥{{item.payMoney}}<img src="../../assets/images/allPay/show.png" alt="" :class="['show-icon',{'show':isShow}]" @click="showInfo" > </div>
                  </div>
                  <!-- <ul class="use-list" :class="{'show':isShow}">
                    <li class="use-item">
                      <div class="use-label">物业服务费</div>
                      <div class="use-val">￥190.89</div>
                    </li>
                    <li class="use-item">
                      <div class="use-label">消防控制中心用电分摊</div>
                      <div class="use-val">￥190.89</div>
                    </li>
                    <li class="use-item">
                      <div class="use-label">公共电费分摊</div>
                      <div class="use-val">￥190.89</div>
                    </li>
                    <li class="use-item">
                      <div class="use-label">小区园林照明电费分摊</div>
                      <div class="use-val">￥190.89</div>
                    </li>
                  </ul> -->

                </li>
              </ul>
              </van-list>
      

            </div>
        </div>
    </div>
    <!-- <div class="foot-tip"> <span class="tip-desc">已经到底了</span></div> -->
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
      isShow:false,

      loading: false,
      isDownLoading:false,
      finished: false,
      pageNo:1,

      houseData: {
        agencyName: "",
        roomName: "",
        waitPayMonth: 0,
        waitPayMoney: 0,
      },
      payInfo: [],

      payHistory:{
        token:'',
        roomId:null,
        pageNo:1,
        pageSize:10

      },


        pay:true,
        show:false,

      token: '',
      
    }
  },
  created () {
    this.init()
  },
  computed:{
  },
  mounted () {
  },
  methods: {
    init() {
      let house = this.localData("get", "pay_house");
      
      this.houseData.agencyName = house.agencyName;
      this.houseData.roomName = house.roomName;
      let token = this.localData("get", "token");
      let roomId = house.roomId;
      this.payHistory.token=token;
      this.payHistory.roomId=roomId;
      console.log(this.payHistory)
      api.Axios.get(api.ROOM_PAY_HISTORY(this.payHistory)).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          let infoData=res.data.data.list;
          this.loading=false
          if(infoData.length<1){
            this.finished=true;
          }
          infoData.forEach(item => {
            console.log(this.formatTime(item.payTime));
            item.payTime=this.formatTime(item.payTime);
          });
          
          this.payInfo=[...this.payInfo,...res.data.data.list];
          // this.payInfo=this.payInfo;
          this.loading=false
          
          console.log(this.payInfo)
          console.log(res.data.data.list)

        } else {
          this.$toast('网络或者系统错误，请稍后再试\n\r'+res.data.requestId, 10000);
        }
      });
    },
    onLoad() {
        let that=this;
        that.payHistory.pageNo++;
        that.init();
    },
    detail(payNumber){
      this.$router.push({path:'/payDetails',query:{payNumber}})
    },
    showInfo(){
      // this.isShow=!this.isShow;
    },
    hideConfirm(){
        this.show=!this.show;
    },
    sureConfirm(){
        
        if(this.show){

        }else{
            this.show=!this.show;
        }
        
    },
  }
}
</script>

<style lang="stylus" scoped>
// @import '../../asstes/styles/footer.styl'
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
.payInfo
    font-family:PingFangSC-Regular,PingFang SC;
    margin-top: 16px;
    .color-Gray 
        color #999999
    .title
        padding 14px 0
        text-align center
        color #444
        font-size 18px
        margin-bottom 15px
    .infoBox
        margin 0 16px 0 16px 
        .address
            padding 23px 20px
            box-shadow:0px 0px 16px 0px rgba(0,0,0,0.08);
            border-radius:8px;
            .address-name
                font-size:17px;
                font-weight:500;
                color:rgba(68,68,68,1);
                text-align left 
                margin-bottom 35px
            .address-desc
                display: flex;
                align-items: center;
                text-align: left;
                align-items: end;
                .icon-img
                    display block
                    margin-right 13px
                .address-detail
                    font-size:14px;
                    font-weight:400;
        .content-box
            .option
                display flex
                justify-content space-between
                margin 20px 16px 15px
                .option-left
                    font-size:17px;
                    font-weight:400;
                    color:rgba(153,153,153,1);
            .content-list
              .ul-list
                
                .li-item
                  padding 17px 16px
                  box-shadow:0px 0px 16px 0px rgba(0,0,0,0.08);
                  margin-bottom 20px
                  .li-item-content
                    display flex
                    justify-content space-between
                    align-items center
                    .li-left
                      text-align left 
                      .li-name
                        font-size:17px;
                        font-weight:400;
                        color:rgba(68,68,68,1);
                        margin-bottom 12px
                      .li-desc
                        font-size:14px;
                        font-weight:500;
                        color:rgba(153,153,153,1);
                    .li-right
                      font-size:17px;
                      font-weight:500;
                      color:rgba(119,119,119,1);
                      .show-icon
                        margin-left 8px
                        transition .2s
                        transform rotateZ(0deg)
                        &.show
                          transform rotateZ(90deg)
                  .use-list
                    // padding-top: 36px;
                    position relative
                    height 0
                    visibility hidden
                    transition .2s
                    opacity 0
                    &.show
                      opacity 1
                      height auto
                      visibility visible
                      padding-top: 36px;
                      // padding 0
                    &:after
                      content ''
                      position absolute
                      top 17px
                      left 0
                      width 100%
                      height 1px 
                      background #e2e2e2
                    .use-item
                      color:rgba(153,153,153,1);
                      font-size:14px;
                      display flex
                      justify-content space-between
                      margin-bottom 30px
                      &:last-child
                        margin 0
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
