<template>
  <div class="allpage">
  <div class="info">
      <h3>
        <img
          src="../../assets/images/decoration/icon_1.png"
          alt=""
        >
        <span>{{roomDetail.roomId|getRoomName}}</span>
      </h3>
      <p>装修时间：{{roomDetail.decorateStartTime|getTime}} - {{roomDetail.decorateEndTime|getTime}} </p>
    </div>
    <h3>装修费用</h3>
    <div class="total">
      <p>合计</p>
      <p> <span style="font-size: .50rem;margin-right:.1rem"> 5615.00</span> <span>元</span> </p>
    </div>

    <div class="bth">去支付</div>

  </div>
</template>
<script>
let roomPersonList = "";
import qs from "qs";
import { decDetail, decDetailList,roomList ,payfee} from "../../config/decManApi";
export default {
  data() {
    return {
      decorateId: "",
      roomDetail: "",
      listDetail: [],
      roomId: [],
    };
  },
  mounted() {
    this.roomId = this.$route.query.roomId;
    this.decorateId = this.$route.query.decorateId;
    this.getData();
    this.getPerData()
  },
  filters: {
    getRoomName: function(value) {
      console.log(roomPersonList);

      for (let index = 0; index < roomPersonList.length; index++) {
        const element = roomPersonList[index];
        if (element.roomId == value) {
          return element.roomName;
        }
      }
    },
    getTime: function(value) {
      return new Date(parseInt(value))
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ")
        .substring(0, 9);
    },
    getTime2: function(value) {
      return new Date(parseInt(value))
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ")
   
    },
   
  },
  methods: {
    getData() {
      var obj = this.getSign2();
      payfee(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.roomDetail = res.data;
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
        decorateId: this.decorateId,
        token: sessionStorage.getItem("token"),
        roomId: this.roomId
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        decorateId: this.decorateId,
        sign: sign,
        token: sessionStorage.getItem("token"),
        roomId: this.roomId
      };
      return obj;
    },
    getSign2() {
      var timestamp = new Date().getTime();
      var objList = {
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        appId: "20200923157363955623",
        timestamp: timestamp,
        token: sessionStorage.getItem("token"),
        roomId: this.roomId
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        token: sessionStorage.getItem("token"),
        roomId: this.roomId
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
  border-bottom: 1px solid #efefef;
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
.allpage > h3 {
  text-align: left;
  margin: 0.3rem;

  font-size: 0.28rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
}
.total {
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: #fff;
  text-align: left;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  margin: 0.3rem;
  font-size: 0.3rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
}
.total p {
  display: flex;
  align-items: center;
}
.bth {
  width: 90%;
  margin: auto;

  height: 0.9rem;
  line-height: 0.9rem;
  background: #ffca1c;
  box-shadow: 0px 0.19rem 0.21rem 0px rgba(255, 218, 96, 0.5);
  border-radius: 6px;
  margin-top: 1rem;

  font-size: .36rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #252525;
}
</style>

