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
    <div class="progress">
      <div class="box">
        <div
          class="list"
          v-for="(list , index) in listDetail"
          :key="index"
        >
          <h5>
            <div>
              <img
                src="../../assets/images/decoration/icon_true.png"
                alt=""
                v-if="index==0"
              >
            </div>
            <p>{{list.decorateStatusName}}</p>

          </h5>
          <p>{{list.createTime|getTime2}}</p>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
let roomPersonList = "";
import qs from "qs";
import { decDetail, decDetailList, roomList } from "../../config/decManApi";
export default {
  data() {
    return {
      decorateId: "",
      roomDetail: "",
      listDetail: []
    };
  },
  mounted() {
    this.decorateId = this.$route.query.decorateId;
    console.log(this.decorateId);

    this.getPerData();
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
      var time = new Date(value);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      if(h<10){
        h = '0' + h
      }
      if(mm<10){
        mm = '0' + mm
      }
      if(s<10){
        s = '0' + s
      }




      return y + "/" + m + "/" + d + " " + h + ":" + mm + ":" + s;
    }
  },
  methods: {
    getData() {
      var obj = this.getSign();
      decDetail(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.roomDetail = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
      decDetailList(qs.stringify(obj)).then(res => {
        if (res.code === "200") {
          this.listDetail = res.data;
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
</style>

