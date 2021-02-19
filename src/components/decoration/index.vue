<template>
  <div class="page">

    <div class="title">
      <h3 @click="jumpNovice">
        <span>装修须知</span><img
          src="../../assets/images/decoration/icon_help.png"
          alt=""
        >
      </h3>
      <div class="btn">
        <p
          class="choosed"
          @click="jumpAdd(null)"
        >装修申请</p>
        <p @click="jumpDeProgress">装修流程</p>
      </div>
      <!-- <div
        class="btn btn2"
        v-if="tis==2"
      >
        <p @click="choosed(1)">装修申请</p>
        <p
          class="choosed"
          @click="choosed(2)"
        >新手教程</p>
      </div> -->
    </div>

    <div
      class="content"
      v-show="tis==1"
    >

      <div>
        <Scroll :onBottom="onBottom"></Scroll>
        <div
          class="list"
          v-for="(list , index ) in roomList"
          :key="index"
          @click="jumpState(list.id)"
          v-if="roomPerList.length"
        >
          <h5>
            <img
              src="../../assets/images/decoration/icon_1.png"
              alt=""
            >
            <span>{{list.roomId|getRoomName}} </span>
          </h5>
          <div class="infolist">
            <p>
              <span>装修时间 </span> <span><i>:</i> {{list.decorateStartTime|getTime}} - {{list.decorateEndTime|getTime}}</span>
            </p>
            <p>
              <span> 当前状态</span> <span><i>:</i> {{list.decorateStatusName}}</span>
            </p>
            <p v-if="list.decorateStatus=='14'">
              <span>  提示 </span> <span><i>:</i> {{list.decorateStatusRemark}}（如有疑问，请与物业服务中心或管家联系。）</span>
            </p>
            <p v-if="list.decorateStatus=='6'">
              <span> 提示</span> <span><i>:</i> 终审通过，请携带施工人员身份证到前台</span>
            </p>
            <p v-if="list.decorateStatus=='7'">
              <span> 提示</span> <span><i>:</i> 资料审核中</span>
            </p>
            <p v-if="list.decorateStatus=='10'">
              <span> 提示</span> <span><i>:</i> {{list.decorateStatusRemark}}</span>
            </p>
            <div
              class="way"
              v-if="list.decorateStatus=='1'&&list.isSign!=0"
            >
              <div
                class="pay"
                @click.stop="jumpPay(list.id,list.roomId)"
              >去缴费</div>
            </div>
            <div class="way">
              <p
                v-if="list.isSign==0"
                style="color : red"
                @click.stop="jumpSign(list.id ,list.roomId)"
              >未签名</p>

              <p v-if="list.isSign!=0">
                <!-- <span
                    v-if="list.decorateStatus< 9&&list.decorateStatus>6"
                    style="color : rgba(255, 202, 28, 1)"
                    @click.stop="upData(list.id)"
                  >上传装修资料</span> -->
                <span
                  style="color : rgba(255, 202, 28, 1)"
                  @click.stop="jumpAdd(list.id)"
                  v-if="list.decorateStatus=='14'"
                >重写申请</span>
                <!-- v-if="list.decorateStatus=='14'" -->
                <!-- v-if="list.decorateStatus=='14'" -->
                <span
                  style="color : rgba(255, 202, 28, 1)"
                  @click.stop="yanshou(list.id)"
                  v-if="list.decorateStatus==6||list.decorateStatus==8"
                >发起验收</span>
                <span
                  style="color : rgba(255, 202, 28, 1)"
                  @click.stop="delay(list.id)"
                  v-if="list.decorateStatus==6||list.decorateStatus==8"
                >装修延期</span>
                <!-- v-if="list.decorateStatus==6||list.decorateStatus==8" -->
                <span
                  style="color : rgba(255, 202, 28, 1)"
                  @click.stop="yanshou(list.id)"
                  v-if="list.decorateStatus=='10'"
                >重新发起验收</span>
                <span
                 v-if="list.decorateStatus=='11'"
                  @click.stop="tuikuan(list.id)"
                  style="color : rgba(255, 202, 28, 1)"
                >申请退款</span>
                 <!-- v-if="list.decorateStatus=='11'" -->
                <!-- <span
                  @click.stop="tuikuan(list.id)"
                  style="color : rgba(255, 202, 28, 1)"
                >申请退款</span> -->
                <!-- <span v-if="list.decorateStatus=='12'">已申请退款</span>
                <span v-if="list.decorateStatus=='13'">已退款</span> -->
                <span v-if="list.decorateStatus=='12'">已发起退款</span>
                <span v-if="list.decorateStatus=='13'">已发起退款</span>

                <span v-if="list.decorateStatus=='11'">已验收</span>

              </p>

            </div>
          </div>

        </div>
      </div>
      <div
        class="noData"
        v-if="!roomList.length"
      >
        <div class="midBox">
          <img
            src="../../assets/images/nodata.png"
            alt=""
          >
          <p>暂时无数据</p>
        </div>
      </div>
    </div>
    <div
      class="content cont2"
      v-show="tis==2"
    >
      <div @click="retund">
        <p>
          <img
            src="../../assets/images/decoration/iconrefund.png"
            alt=""
          > <span>我的退款</span>
        </p>
        <p>></p>
      </div>
      <div @click="myOrder">
        <p>
          <img
            src="../../assets/images/decoration/icon_order.png"
            alt=""
          > <span>我的订单</span>
        </p>
        <p>></p>
      </div>
    </div>

    <div>
    </div>
    <div
      class="alertBox"
      v-show="show"
    >
      <div class="box">
        <div class="h3">温馨提示</div>
        <div class="h5"> 亲爱的奥悦家业主，您需要先读《装修注意事项》才可预约装修。</div>
        <p>
          <img
            src="../../assets/images/decoration/icon_select.png"
            alt=""
          >
          <img
            src="../../assets/images/decoration/icon_select2x.png"
            alt=""
          >
          <span>
            我已阅读
          </span>
          <span style="color:rgba(255, 202, 28, 1)">
            《装修注意事项》
          </span>
        </p>

        <div>
          <div class="p">取消</div>
          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
          >确定</div>
        </div>
      </div>

    </div>
    <div
      class="alertBox"
      v-show="showYanshou"
    >
      <div
        class="box"
        style="width:100%"
      >
        <div class="h3">发起验收</div>
        <div
          class="h5"
          style="padding:0 1rem;margin-bottom:.3rem"
        > 您确定发起验收项目？ </div>

        <div>
          <div
            class="p"
            @click.stop="cancel"
          >取消</div>
          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="toYanshou"
          >确定</div>
        </div>
      </div>

    </div>
    <div
      class="alertBox"
      v-show="showTuikuan"
    >
      <div
        class="box"
        style="width:100%"
      >
        <div class="h3">申请退款</div>
        <div
          class="h5"
          style="padding:0 1rem;margin-bottom:.3rem"
        > 您确定发起申请退款？ </div>

        <div>
          <div
            class="p"
            @click.stop="cancel"
          >取消</div>
          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="toTUikuan()"
          >确定</div>
        </div>
      </div>

    </div>
    <loading :show="showLoad"></loading>

    <div class="bottomBtn">
      <div v-if="tis==1">
        <p @click="choosed(1)"><img
            src="../../assets/images/decoration/icon_decorate.png"
            alt=""
          ></p>
        <p @click="choosed(2)"><img
            src="../../assets/images/decoration/icon_mine.png"
            alt=""
          ></p>
      </div>
      <div v-if="tis==2">
        <p @click="choosed(1)"><img
            src="../../assets/images/decoration/icon_decorate_2.png"
            alt=""
          ></p>
        <p @click="choosed(2)"><img
            src="../../assets/images/decoration/icon_mine-current.png"
            alt=""
          ></p>
      </div>
    </div>

  </div>
</template>
<script>
let roomPersonList = "";
import { roomList } from "../../config/decManApi";
import { Datetime, XSwitch, Loading } from "vux";
import "../../utils/md5";
import qs from "qs";
import { decList, addStatus } from "../../config/decManApi";
import { clearTimeout } from "timers";
export default {
  components: {
    Loading
  },
  data() {
    return {
      tis: 1,
      scrollBoxId: "scrollBoxId",
      show: false,
      pageIndex: 1,
      pageSize: 10,
      roomList: [],
      roomPerList: [],
      timer: "",
      showYanshou: false,
      showLoad: false,
      showTuikuan: false,
      tuikuanId: ""
    };
  },
  filters: {
    getRoomName: function(value) {
      for (let index = 0; index < roomPersonList.length; index++) {
        const element = roomPersonList[index];
        if (element.roomId == value) {
          return element.roomName;
        }
      }
    },
    getTime: function(value) {
      var time = new Date(value);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y + "/" + m + "/" + d + " ";
    }
  },
  mounted() {
    if (this.$store.state.deData.code == 1) {
      this.$store.state.deData.code = 2;
      location.reload();
    }
    if (sessionStorage.getItem("tis")) {
      this.tis = sessionStorage.getItem("tis");
    }
    if (this.$route.query.token) {
      sessionStorage.setItem("token", this.$route.query.token);
    } else {
    }

    // sessionStorage.setItem("token", "c00030a07cb446c7bdadfb743be77b66126342");
    // sessionStorage.setItem("token", "4261f36666954f3c9f8e4365e8b548be126366");
    this.getPerData();
  },
  methods: {
    // add0(m){return m<10?'0'+m:m },
    //跳转到我的退款
    retund() {
      this.$router.push({ path: "/refund" });
    },
    //我的订单
    myOrder() {
      this.$router.push({ path: "/deOrder" });
    },
    getData() {
      //生成加密码参数
      var timestamp = new Date().getTime();
      var asObj = {
        timestamp: timestamp,
        appId: "20200923157363955623",
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        token: sessionStorage.getItem("token")
      };
      var str = this.sort_ASCII(asObj);
      var sign = this.$md5(str);
      var obj = {
        sign: sign,
        timestamp: timestamp,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        token: sessionStorage.getItem("token")
      };
      decList(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.roomList.push(...res.data.list);
        } else {
          this.$toast(res.msg);
        }
      });
    },
    //获取房屋列表
    getPerData() {
      var obj = this.getSign();
      roomList(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.roomPerList = res.data;
          roomPersonList = res.data;
          this.getData();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    getSign() {
      var timestamp = new Date().getTime();
      var objList = {
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        appId: "20200923157363955623",
        timestamp: timestamp,
        token: sessionStorage.getItem("token")
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        token: sessionStorage.getItem("token")
      };
      return obj;
    },

    //发起验收
    yanshou(val) {
      this.showYanshou = true;
      this.yangshouId = val;
    },
    //延期装修
    delay(val) {
      this.$router.push({ path: "/delay", query: { decorateId: val } });
    },
    upData(val) {
      this.$router.push({ path: "/upData", query: { decorateId: val } });
    },
    jumpSign(val, var2) {
      sessionStorage.setItem("returnIdx", 1);
      this.$router.push({
        path: "/signature",
        query: { decorateId: val, roomId: var2 }
      });
    },
    //取消
    cancel() {
      this.showYanshou = false;
      this.showTuikuan = false;
    },
    //
    toYanshou() {
      var that = this;
      this.showLoad = true;
      var obj = this.getYSSign(this.yangshouId, 9);
      addStatus(qs.stringify(obj)).then(res => {
        this.showLoad = false;
        this.showYanshou = false;
        if (res.code === "200") {
          that.roomList = [];
          that.pageIndex = 1;
          that.getData();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    //发起退款
    tuikuan(val) {
      this.showTuikuan = true;
      this.tuikuanId = val;
    },
    toTUikuan(val) {
      var that = this;
      this.showLoad = true;

      this.$router.push({
        path: "/refuceInfo",
        query: { decorateId: this.tuikuanId }
      });

      return;
      var obj = this.getYSSign(this.tuikuanId, 12);
      addStatus(qs.stringify(obj)).then(res => {
        this.showLoad = false;
        this.showTuikuan = false;
        if (res.code === "200") {
          that.roomList = [];
          that.pageIndex = 1;
          that.getData();
        } else {
          this.$toast(res.msg);
        }
      });
    },

    getYSSign(decorateId, status) {
      var timestamp = new Date().getTime();
      var objList = {
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        appId: "20200923157363955623",
        timestamp: timestamp,
        token: sessionStorage.getItem("token"),
        decorateId: decorateId,
        status: status
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        token: sessionStorage.getItem("token"),
        decorateId: decorateId,
        status: status
      };
      return obj;
    },

    //生成加密码排序

    sort_ASCII(obj) {
      var arr = new Array();
      var num = 0;
      for (var i in obj) {
        arr[num] = i;
        num++;
      }
      var str = "";
      var sortArr = arr.sort();
      var sortObj = {};
      for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]];
      }

      for (const key in sortObj) {
        if (sortObj.hasOwnProperty(key)) {
          str = str + key + "=" + sortObj[key] + "&";
        }
      }

      return str.slice(0, str.length - 1);
    },
    //跳到预约
    jumpAdd(val) {
      this.$store.state.deData.code = 1;
      this.$router.push({ path: "/appointments", query: { decorateId: val } });
    },
    //跳到新手详情
    jumpNovice() {
      // window.location.href = 'https://img1.aylives.cn/bidding/cfae0150-d675-4041-8504-aaf99444ce96-hqIHO5rZQfwdf97v.pdf?imageslim'
      this.$router.push({ path: "/novice" });
    },
    //跳到装修流程
    jumpDeProgress() {
      this.$router.push({ path: "/deProgress" });
    },
    //跳到支付
    jumpPay(val1, val2) {
   
      if (this._IsIOS()) {
        try {
          window.webkit.messageHandlers.openWeChatPayForFitup.postMessage({
            decorateId:val1,
            roomId: val2
          });
        } catch (err) {
          //在这里处理错误
          alert("调用异常：" + err);
          return;
        }
      } else if (this._IsAndroid()) {
        try {
          window.android.openWeChatPayForFitup(val1,val2);
          //在这里运行代码
        } catch (err) {
          alert("调用异常：" + err);
          return;
        }
      }
    },

    //判断是否为ios端访问
    _IsIOS() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    },
    //判断是否为android端访问
    _IsAndroid() {
      if (/(Android|Adr)/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    },

    delMD5() {},
    onBottom() {
      console.log("触底");
      window.clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.pageIndex++;
        this.getData();
      }, 1000);
    },
    choosed(index) {
      this.tis = index;
      sessionStorage.setItem("tis", index);
    },
    //状态列表
    jumpState(val) {
      this.$router.push({ path: "/progress", query: { decorateId: val } });
    }
  }
};
</script>

<style scoped>
.infolist > p {
  display: flex;
}
.infolist > p span:nth-child(1) {
  flex-shrink: 0;
  flex-basis: 1.3rem;
  text-align-last: justify;

  text-align: justify;
  text-justify: distribute-all-lines;
}
.infolist > p span:nth-child(2) {
  flex: 1 ;
  display: flex ;
  text-align: left ;
}
.infolist > p span:nth-child(2) i{
  flex-basis: .3rem ;
  flex-shrink: 0 ;
  text-align: center ;

  
}

.page {
  font-size: 0.1rem;
  background-color: rgba(245, 245, 245, 1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.3rem;
  /* background: url("../../assets/images/decoration/bg_pic.png") no-repeat; */
  background: url("https://img1.aylives.cn/lucky/bag/77c76a28-ff1f-4dee-9946-798ef8a78cfc-Uto5Q80FxsHTqvPX.png?imageslim") no-repeat;
  background-size: 100% 100%;
  z-index: 99;
}
h3 {
  width: 100%;

  padding: 0.3rem;
  box-sizing: border-box;
  font-size: 0.28rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  /* line-height: 0.55rem; */
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}
h3 img {
  width: 0.4rem;
  height: 0.4rem;
  /* margin-bottom: 0.1rem; */
  margin-left: 0.2rem;
}
.title .btn {
  position: absolute;
  left: 0;
  bottom: -1rem;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.3rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.title .btn2 {
  right: 0.3rem;
}
.title .btn p {
  width: 100%;
  height: 1.89rem;
  background: rgba(159, 159, 159, 1);
  box-shadow: 1px 0.23rem 0.19rem 0px rgba(210, 210, 210, 0.63);
  border-radius: 0.45rem;
  font-size: 0.36rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.89rem;
}
.choosed {
  color: #464646 !important;
  background: #ffca1c !important;
  box-shadow: 1px 0.43rem 0.31rem 0px rgba(255, 234, 192, 0.63) !important;
}
.content {
  padding: 0.3rem;
  padding-top: 5.8rem;
  padding-bottom: 1.2rem;
  box-sizing: border-box;
  position: relative;
  background-color: rgba(245, 245, 245, 1);
}
.list {
  /* padding: 0.3rem 0.35rem 0.5rem 0.35rem; */

  text-align: left;
  margin-bottom: 0.3rem;

  border-radius: 0.16rem;
}
.list h5 {
  display: flex;
  align-items: center;

  font-size: 0.36rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #464646;
  /* background-color: #000; */
  padding: 0.3rem 0.35rem 0.2rem 0.35rem;
  border-radius: 0.16rem;
  border-bottom: 1px solid #efefef;
  background-color: #fff;
}
.list h5 img {
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.1rem;
}
.list > div {
  /* margin-top: 0.5rem; */

  padding: 0.2rem 0.35rem 0.2rem 0.35rem;
  border-radius: 0.16rem;
  border-bottom: 1px solid #efefef;
  background-color: #fff;
}
.list > div p {
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #464646;
  /* margin-top: 0.2rem; */
}
.list .way p {
  display: flex;
  padding: 0.2rem 0;
  justify-content: space-around;

  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ccc;
}
.list .pay {
  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #454545;
  text-align: center;
  background-color: #000;
  line-height: 0.84rem;
  width: 2.62rem;
  height: 0.84rem;
  background: #ffca1c;
  box-shadow: -1px 0.2rem 0.2rem 0px rgba(255, 218, 96, 0.5);
  border-radius: 0.42rem;
  margin: auto;
  margin-top: 0.2rem;
}
.cont2 {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 245, 245, 1);
  z-index: 1;
}
.cont2 div {
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: #fff;
  margin-bottom: 0.3rem;
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
}
.cont2 div p {
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 0.36rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #464646;
  /* background-color: #000; */
}
.cont2 div p img {
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.2rem;
}

.alertBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: grid;
  place-content: center;
  margin: 0 auto;
}
.alertBox .box {
  margin: auto;
  width: 80%;
  border-radius: 0.25rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0.5rem;
}
.alertBox .box > .h3 {
  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #454545;
  text-align: center !important;
}

.alertBox .box .h5 {
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #454545;
  text-align: center;
}
.alertBox .box p {
  margin-top: 0.2rem;
  display: flex;
  align-items: center;

  font-size: 0.28rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #999999;
}
.alertBox .box p img {
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.2rem;
}
.alertBox .box > div {
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-around;
}
.alertBox .box > div .p {
  width: 2rem;
  height: 0.8rem;
  border: 2px solid #dddddd;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 0.8rem;

  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: 500;
}

.noData {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  box-sizing: border-box;
  padding-top: 7rem;
}
.noData img {
  width: 5rem;
  margin-bottom: 0.2rem;
  box-sizing: border-box;
}
.noData p {
  color: #aaa;
  font-size: 0.2rem;
}
.bottomBtn {
  position: fixed;
  width: 100%;
  height: 1rem;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 999999;
  border-radius: 0.3rem 0.3rem 0 0;
}
.bottomBtn div {
  display: flex;
  justify-content: space-around;
  height: 100%;
}
.bottomBtn div p {
  flex: 1;
  display: grid;
  place-content: center;
  height: 100%;
}
.bottomBtn div p img {
  width: 0.47rem;
  height: 0.47rem;
}
</style>
