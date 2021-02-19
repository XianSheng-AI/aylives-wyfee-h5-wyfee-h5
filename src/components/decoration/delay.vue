<template>
  <div class="allpage">
    <div
      class="alertBox"
      v-show="showBox"
    >
      <div class="box">
        <div class="h3">延期成功</div>
        <!-- <p>您已成功申请退款， <br>
          请您耐心等待物业管理人员完成退款操作</p> -->
        <div
          class="h5"
          style="margin-bottom:.3rem"
        >
          您已成功延期装修施工时间 <br>

        </div>

        <div>

          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="cancle"
          >确定</div>
          <!-- <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="cancle"
          >取消</div> -->
        </div>
      </div>

    </div>
    <div class="info">
      <h3>
        <img
          src="../../assets/images/decoration/icon_1.png"
          alt=""
        >
        <span>{{roomDetail.roomId|getRoomName}}</span>
      </h3>
      <p>原装修时间：{{roomDetail.decorateStartTime|getTime}} - {{roomDetail.decorateEndTime|getTime}} </p>
    </div>

    <div class="content">
      <h3>选择装修房屋</h3>
      <div class="details">
        <div class="deList">
          <p>请设置延期时间</p>
          <p>
            <span> <img
                src="../../assets/images/decoration/icon_date.png"
                alt=""
              > <span>
                <datetime
                  v-model="startTime"
                  format="YYYY-MM-DD"
                  @on-change="change"
                  class="dateTime"
                  :start-date="startDate"
                  :end-date="endDate"
                ></datetime>
                <i>{{decorateStartTime2}}</i>
              </span> </span>

          </p>

        </div>
        <p style="text-align:left;color:#ffca1c; font-size: .24rem">延期不能超过90天</p>

      </div>
    </div>

    <div
      class="btn"
      @click="upData"
    >
      确认延期
    </div>
    <loading :show="showLoad"></loading>
  </div>
</template>
<script>
let roomPersonList = "";
import qs from "qs";
import {
  decDetail,
  decDetailList,
  roomList,
  decorateDelay
} from "../../config/decManApi";
import { Datetime, XSwitch, Loading } from "vux";
import { clearTimeout } from "timers";
export default {
  components: {
    Datetime,
    XSwitch,
    Loading
  },
  data() {
    return {
      decorateId: "",
      roomDetail: "",
      listDetail: [],
      startTime: "延期结束时间",
      decorateStartTime2: "延期结束时间",
      showLoad: false,
      showBox: false,
      startDate: "2015-11-11",
      endDate: "2015-11-11",
    };
  },
  mounted() {
    this.decorateId = this.$route.query.decorateId;

    this.getPerData();
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
    },
    getTime2: function(value) {
      return new Date(parseInt(value))
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    }
  },
  methods: {
    cancle() {
      this.showBox = false;
      this.$router.go(-1); //返回上一层
    },
    change(value) {
      this.startTime = value;
      this.decorateStartTime = this.startTime;
      this.decorateStartTime2 = this.startTime;
    },
    getData() {
      var that = this;
      that.showLoad = true;
      var obj = this.getSign();
      decDetail(qs.stringify(obj)).then(res => {
        that.showLoad = false;
        if (res.code === 0) {
          this.roomDetail = res.data;
          console.log(res.data.decorateEndTime);
          console.log(res.data.decorateEndTime+1000*60*60*24);
          this.startDate = this.getTime(res.data.decorateEndTime);
          this.startTime = this.getTime(res.data.decorateEndTime);
          this.decorateStartTime2 = this.getTime(res.data.decorateEndTime);
          this.endDate = this.getTime(res.data.decorateEndTime+1000*60*60*24*90);
        } else {
          this.$toast(res.msg);
        }
      });
    },
    getTime: function(value) {
      var time = new Date(value);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();

      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }

      // this.startTime = y + "-" + m + "-" + d;
      // this.decorateStartTime = y + "-" + m + "-" + d;
      return y + "-" + m + "-" + d;
    },
    getSign() {
      var timestamp = new Date().getTime();
      var objList = {
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        appId: "20200923157363955623",
        timestamp: timestamp,
        token: sessionStorage.getItem("token"),
        decorateId: this.decorateId
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        token: sessionStorage.getItem("token"),
        decorateId: this.decorateId
      };
      return obj;
    },

    upData() {
      var that = this;

      // if (this.startTime == this.decorateStartTime) {
      //   this.$toast("请选择延期时间");

      //   return;
      // }

      if (!this.decorateStartTime) {
        this.$toast("请选择延期时间");

        return;
      }
      var obj = this.getSign2();
      decorateDelay(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          that.showBox = true;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    //延期
    getSign2() {
      var timestamp = new Date().getTime();
      var objList = {
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        appId: "20200923157363955623",
        timestamp: timestamp,
        token: sessionStorage.getItem("token"),
        decorateId: this.decorateId,
        delayDate: this.decorateStartTime + " 00:00:00"
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        token: sessionStorage.getItem("token"),
        decorateId: this.decorateId,
        delayDate: this.decorateStartTime + " 00:00:00"
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
    }
  }
};
</script>

<style scoped>
.allpage {
  position: absolute;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 245, 245, 1);
  height: 100%;
  padding: 0.3rem 0;
 
}
.info {
  margin: 0 0.3rem;
}
.info h3 {
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: #fff;
  text-align: left;
  display: flex;
  padding: 0.3rem 0.4rem;
  border-bottom: 1px solid #eee;
  font-size: 0.36rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
}
.info h3 img {
  width: 0.56rem;
  height: 0.56rem;
  margin-right: 0.1rem;
}
.info p {
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: #fff;
  text-align: left;
  padding: 0.4rem;

  font-size: 0.3rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
}
.progress {
  padding: 0.3rem;

  background-color: rgba(245, 245, 245, 1);
}
.box {
  background-color: #fff;
  padding: 0.4rem;
  border-radius: 0.2rem;
  text-align: left;
}
.box .list {
  /* padding-top: .2rem */
}
.box .list h5 {
  padding: 0.1rem 0.5rem;
  padding-top: 0.3rem;
  box-sizing: border-box;
  font-size: 0.32rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
  border-left: 1px solid #ededed;
  position: relative;
  margin: 0;
}
.box .list h5 div {
  width: 0.2rem;
  height: 0.2rem;
  background: #ededed;
  border-radius: 50%;
  position: absolute;
  left: -0.1rem;
  top: 0.5rem;
  display: grid;
  place-content: center;
}
.box .list h5 div img {
  width: 0.4rem;
  height: 0.4rem;
}
.box .list > p {
  font-size: 0.28rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
  padding: 0rem 0.5rem;
  border-left: 1px solid #ededed;
}
.content {
  font-size: 0.1rem;
  background-color: rgba(245, 245, 245, 1);
  padding: 0.4rem 0.35rem;
}
h3 {
  text-align: left;
  font-size: 0.28rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #999999;
  padding: 0.3rem 0 0.2rem 0;
}
.details {
  margin-top: 0.3rem;
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.deList {
  display: flex;
  justify-content: space-between;

  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #454545;
  margin-bottom: 0.2rem;
}
.deList p {
  flex: 1;
  display: flex;
  align-items: center;
}
.deList p:nth-child(2) {
  flex: 1.1;
}
.deList p > span {
  display: flex;
  align-items: center;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  position: relative;
  font-size: 0.26rem;
  /* background-color: #000; */
}
.deList p > span i {
  display: block;
  width: 2rem;
  /* background-color: #000; */
}
.dateTime {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.deList p span img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.1rem;
}
i {
  font-size: 0.3rem;
  color: #999999;
}
.btn {
  width: 80%;
  height: 0.9rem;
  line-height: 0.9rem;

  font-size: 0.36rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  background: #aaaaaa;
  background: #ffca1c;
  box-shadow: -1px 10px 15px 0px rgba(153, 153, 153, 0.5);
  border-radius: 6px;
  margin: auto;
  margin-top: 1rem;
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
  width: 100%;
  border-radius: 0.25rem;
  background-color: #fff;

  box-sizing: border-box;
  padding: 0.3rem;
}
.alertBox .box > .h3 {
  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #454545;
  /* width: 5rem; */
  text-align: center !important;

  margin: 0;
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
  /* display: flex; */
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
</style>

