<template>
  <div class="pageAll">
    <div
      class="alertBox"
      v-show="showBox"
    >
      <div class="box">
        <div class="h3">申请退款成功</div>
        <!-- <p>您已成功申请退款， <br>
          请您耐心等待物业管理人员完成退款操作</p> -->
        <div
          class="h5"
          style="margin-bottom:.3rem"
        >
          您已成功申请退款， <br>
          请您耐心等待物业管理人员完成退款操作
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
    <h3>装修单位</h3>
    <div class="company">
      <div class="inpList">
        <span>收款户名</span> <input
          type="text"
          name=""
          id=""
          placeholder="输入收款户名"
          v-model="accountName"
        >
      </div>
      <div class="inpList">
        <span>收款开户行</span> <input
          type="text"
          name=""
          id=""
          placeholder="输入收款开户行"
          v-model="accountBank"
        >
      </div>
      <div class="inpList">
        <span>收款开户支行</span> <input
          type="text"
          name=""
          id=""
          placeholder="收款开户支行名称"
          v-model="accountBankSub"
        >
      </div>
      <div class="inpList">
        <span>收款银行账号</span> <input
          type="number"
          name=""
          id=""
          placeholder="输入收款银行账号"
          v-model="accountNum"
        >
      </div>
      <div class="inpList">
        <span>上传银行卡正面图片</span>
        <div class="upLoadBox">

          <img
            v-if="bankImg"
            :src="bankImg"
            alt=""
          >
          <img
            v-else
            src="../../assets/images/decoration/add.png"
            alt=""
          >
          <input
            type="file"
            value
            id="file1"
            accept="image/png, image/jpg, application/pdf, application/msword"
            @change="onUploadPlaneUrlArr"
            ref="input"
          />

        </div>
      </div>
    </div>

    <div
      class="btn"
      @click="upData"
    >
      提交退款申请
    </div>
    <loading :show="showLoad"></loading>
  </div>
</template>
<script>
import { refundAdd, baseUploadURL } from "../../config/decManApi";
import { Loading } from "vux";
import qs from "qs";
import $ from "jquery";
export default {
  components: {
    Loading
  },
  data() {
    return {
      decorateId: "",
      accountBank: "",
      accountName: "",
      accountNum: "",
      accountBankSub: "",
      showLoad: false,
      showBox: false,
      uploadUrl: baseUploadURL,
      bankImg: ""
    };
  },
  mounted() {
    this.decorateId = this.$route.query.decorateId;
  },

  methods: {
    onUploadPlaneUrlArr(e) {
      var that = this;

      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      this.showLoad = true;
      $.ajax({
        url: that.uploadUrl,
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          that.showLoad = false;
          if (res) {
            that.$toast("上传成功");
            that.bankImg = res.data;

            console.log(that.bankImg);
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    showb() {},
    cancle() {
      this.showBox = false;
      this.$router.go(-1); //返回上一层
    },
    upData() {
      if (!this.accountName.trim()) {
        this.$toast("户名不能为空");
        return;
      }
      if (!this.accountBank.trim()) {
        this.$toast("开户行不能为空");
        return;
      }
      if (!this.accountBankSub.trim()) {
        this.$toast("开户支行不能为空");
        return;
      }

      if (!this.accountNum.trim()) {
        this.$toast("银行账号不能为空");
        return;
      }
      if (!this.bankImg.trim()) {
        this.$toast("银行卡正面照不能为空");
        return;
      }

      console.log(this.accountName, this.accountBank, this.accountNum);

      var that = this;
      that.showLoad = true;
      var obj = this.getSign();
      refundAdd(qs.stringify(obj)).then(res => {
        this.showBox = false;
        that.showLoad = false;
        if (res.code === 0) {
          that.showBox = true;
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
        accountBank: this.accountBank,
        accountName: this.accountName,
        accountNum: this.accountNum,
        accountBankSub: this.accountBankSub,
        bankImg: this.bankImg,

        token: sessionStorage.getItem("token")
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        token: sessionStorage.getItem("token"),
        decorateId: this.decorateId,
        accountBank: this.accountBank,
        accountName: this.accountName,
        accountNum: this.accountNum,
        accountBankSub: this.accountBankSub,
        bankImg: this.bankImg
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
.upLoadBox {
  position: relative;
  margin-top: 0.2rem;
  text-align: left;
  margin-left: 0.5rem;
}
.upLoadBox input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  width: 2rem;
  height: 2rem;
  background-color: pink;
  opacity: 0;
}
.upLoadBox img {
  width: 2rem;
  height: 2rem;
  /* position: absolute; */
}
.pageAll {
  font-size: 0.1rem;
  background-color: rgba(245, 245, 245, 1);
  padding: 0.4rem 0.35rem;
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
}
h3 {
  text-align: left;
  font-size: 0.28rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #999999;
  padding: 0.3rem 0 0.2rem 0;
}
.address {
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-auto-flow: column;
  grid-auto-flow: row dense;
  grid-gap: 0.2rem;
}
.address > div {
  /* width: 50%; */
  display: block;
  box-sizing: border-box;
  padding: 0.3rem;
  /* height: 1.76rem; */
  /* line-height: 1.76rem; */
  background: #dcdcdc;
  border-radius: 0.3rem;
  grid-gap: 0.2rem;
  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  white-space: normal;
  word-break: break-all;
  display: grid;
  place-content: center;
}
.time {
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  background-color: #fff;
  border-radius: 0.1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.3rem;
}

.time p {
  height: 0.88rem;
  line-height: 0.88rem;
  background: #f3f3f3;
  border-radius: 0.44rem;
  display: grid;
  place-content: center;
  font-size: 0.24rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  display: flex;
  text-align: center;
  box-sizing: border-box;
  padding-left: 0.2rem;
}
.time p span {
  color: rgba(153, 153, 153, 1);
  color: red;
  /* color: #454545 !important; */
}
.contBox {
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.contBox textarea {
  border: 1px solid #eee;
  width: 100%;
  height: 2rem;
  font-size: 0.3rem;
  padding: 0.2rem;
  box-sizing: border-box;
}
.company {
  box-sizing: border-box;
  padding: 0.5rem 0.3rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.company .inpList {
  display: flex;
  align-items: center;
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  padding: 0.1rem 0;
}
.company .inpList span {
  width: 100%;
  display: inline-block;
  width: 2.3rem;
  text-align: justify;
  vertical-align: top;
  /* margin-right: 0.3rem; */
}
input::placeholder {
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 500;
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
  background: #ffca1c;
  box-shadow: -1px 10px 15px 0px rgba(153, 153, 153, 0.5);
  border-radius: 6px;
  margin: auto;
  margin-top: 1rem;
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
  display: flex;
  align-items: center;
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
  width: 1.6rem;
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
.choosed {
  color: #454545 !important;
  background: #ffca1c !important;
}
.chooseTime {
  background: #ffca1c !important;
}
.chooseTime span {
  color: #333 !important;
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
.dec {
  padding: 0;
}
.dec p {
  /* background-color: red; */
}
</style>

