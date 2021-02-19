<template>
  <div class="allpage">
    <div class="box">
      <div
        class="info"
        v-for="(list , index) in dataList"
        :key="index"
      >
        <h3>
          <p>
            <img
              src="../../assets/images/decoration/icon_pay.png"
              alt=""
            >
            <span>保证金退款</span>
          </p>
          <p style="font-size:.30rem;text-align:right;color: #FFCA1C;">{{list.decorateStatusName}}</p>
        </h3>
        <div>
          <p>{{list.roomName}} </p>
          <p> <img
              src="../../assets/images/decoration/icon_pay.png"
              alt=""
            > {{list.decorateStartTime|getTime}} - {{list.decorateEndTime|getTime}} </p>
        </div>
      </div>
    </div>


    <div class="noData" v-if="!dataList.length">
      <div class="midBox">
        <img src="../../assets/images/nodata.png" alt="">
        <p>暂时无数据</p>
      </div>
    </div>

  </div>
</template>
<script>
import { rufundList } from "../../config/decManApi";
import qs from "qs";
export default {
  data() {
    return {
      decorateId: "",
      dataList: []
    };
  },
  filters: {
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
    this.getData();
  },
  methods: {
    getData() {
      var obj = this.getSign();

      rufundList(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.dataList = res.data;
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
.box {
  background-color: rgba(245, 245, 245, 1);
  padding: 0.3rem 0;
}
.info {
  margin: 0 0.3rem;
  margin-bottom: 0.2rem;
}
.info h3 {
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: #fff;
  text-align: left;
  display: flex;
  justify-content: space-between;

  padding: 0.3rem 0.4rem;
  border-bottom: 1px solid #efefef;
  font-size: 0.36rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
  align-items: center;
}
.info h3 p {
  display: flex;
  align-items: center;
  /* flex: 1; */
  /* background-color: #000; */
}
.info h3 img {
  width: 0.56rem;
  height: 0.56rem;
  margin-right: 0.1rem;
}
.info > div {
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
.info p {
  font-size: 0.28rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
  padding: 0.1rem 0;
  display: flex;
  align-items: center;
}
.info p img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.1rem;
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

  font-size: 0.36rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #252525;
}
.noData{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eee;
  display: grid;
  place-content: center;

}
.noData img{
  width: 5rem;
  margin-bottom: .2rem;
  box-sizing: border-box;
}
.noData p {
  color: #aaa;
  font-size: .2rem;
}
</style>

