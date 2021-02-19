<template>
  <div
    class="allpage"
    @touchmove.prevent
  >

    <!-- <img src="https://img1.aylives.cn/lucky/bag/d2504393-bb21-41d8-9982-bd67045260b5-NGRTu6lKy6ZirPp9.?imageslim" alt=""> -->

    <div class="content">
      <div class="coverBox">
        <p>请在此处签名</p>

      </div>
      <div class="btn">
        <p>
          签字不清晰可能导致签约/授权失败，请手机横屏工整签字
        </p>

        <p
          id="clearCanvas"
          ref="clearCanvas"
          style=" font-size: .4rem;color: #aaa"
        >重写</p>
        <p
          id="saveCanvas"
          ref="saveCanvas"
          style=" font-size: .4rem;color: #aaa"
        >确定</p>
      </div>
      <div
        id="canvas"
        ref="canvas"
      >

      </div>
      <div
        class="mySign"
        v-if="isSign"
      >
        <img
          :src="signSrc"
          alt=""
        >
      </div>

    </div>

    <div
      class="alertBox"
      v-show="showBox"
    >
      <div
        class="box"
        style="width:100%"
      >
        <div class="h3">是否提交您的签名</div>
        <div
          class="h5"
          style="padding:0 0.6rem;margin-bottom:.3rem"
        >

        </div>

        <div>

          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="signIng"
          >确定</div>
          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="cancle"
          >取消</div>
        </div>
      </div>

    </div>

    <loading :show="showLoad"></loading>
    <!-- <img
      :src="finallyURL"
      alt=""
      id="photoFile"
    > -->

    <div
      class="alertBox"
      v-show="showBox2"
    >
      <div
        class="box"
        style="width:100%"
      >
        <div class="h3">申请成功 <br><br>

          请等待物业管理员审核您的装修申请</div>
        <div
          class="h5"
          style="padding:0 0.6rem;margin-bottom:.3rem"
        >

        </div>

        <div>

          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="toTUikuan"
          >确定</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import qs from "qs";
import { filesPost, baseUploadURL } from "../../config/decManApi";
import { Loading } from "vux";
import { all } from "q";
import $ from "jquery";
export default {
  data() {
    return {
      isSign: false,
      signSrc: "",
      showBox: false,
      showBox2: false,
      finallyURL: "",
      showLoad: false,
      imgSrc: "",
      uploadUrl: baseUploadURL,
      file: ""
    };
  },
  components: {
    Loading
  },
  created() {
    this.decorateId = this.$route.query.decorateId;
    this.roomId = this.$route.query.roomId;
    window.scrollTo(0, 0);
  },
  mounted() {
    this.lineCanvas({
      el: this.$refs.canvas, //绘制canvas的父级div
      clearEl: this.$refs.clearCanvas, //清除按钮
      saveEl: this.$refs.saveCanvas //保存按钮
    });
  },
  methods: {
    dataURLtoBlob(dataurl) {
      var localData = dataurl; //假定dataUrl为base64位
      let base = atob(localData.substring(localData.indexOf(",") + 1)); // base是将base64编码解码，去掉data:image/png;base64部分
      let length = base.length;
      let url = new Uint8Array(length);
      while (length--) {
        url[length] = base.charCodeAt(length);
      }
      let file = new File([url], "a.jpg", {
        type: "image/jpg"
      });
      //最后将file，通过ajax请求做为参数传给服务器就可以了
      return file;
    },

    //上传营业执照
    onUpload(e) {
      var that = this;

      this.showLoad = true;
      var formData = new FormData();
      formData.append("img", this.dataURLtoBlob(this.finallyURL), "png");
      console.log(formData);
      var that = this;
      $.ajax({
        url: that.uploadUrl,
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          that.showLoad = false;
          that.showBox = true;
          if (res) {
            console.log(res.data);

            that.file = res.data;
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    lineCanvas(obj) {
      var that = this;
      this.linewidth = 2;
      this.color = "#000000";
      this.background = "#ffffff";
      for (var i in obj) {
        this[i] = obj[i];
      }
      this.canvas = document.createElement("canvas");
      this.el.appendChild(this.canvas);
      this.cxt = this.canvas.getContext("2d");
      this.canvas.width = this.el.clientWidth;
      this.canvas.height = this.el.clientHeight;

      console.log(this.canvas.width, this.canvas.height);
      this.cxt.fillStyle = this.background;
      this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.width);
      this.cxt.strokeStyle = this.color;
      this.cxt.lineWidth = this.linewidth;
      this.cxt.lineCap = "round";
      this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //开始绘制
      this.canvas.addEventListener(
        "touchstart",
        function(e) {
          this.cxt.beginPath();
          this.cxt.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        }.bind(this),
        false
      );
      //绘制中
      this.canvas.addEventListener(
        "touchmove",
        function(e) {
          this.cxt.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
          this.cxt.stroke();
        }.bind(this),
        false
      );
      //结束绘制
      this.canvas.addEventListener(
        "touchend",
        function() {
          this.cxt.closePath();
          let imgBase64 = this.canvas.toDataURL();
          this.signSrc = imgBase64;
        }.bind(this),
        false
      );
      //清除画布
      this.clearEl.addEventListener(
        "click",
        function() {
          this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }.bind(this),
        false
      );
      //保存图片，直接转base64
      this.saveEl.addEventListener(
        "click",
        function() {
          that.finallyURL = this.canvas.toDataURL();
          // document.getElementById("myImage").src = that.finallyURL;

          that.onUpload();
        }.bind(this),
        false
      );
    },
    signIng() {
      this.signSrc = this.finallyURL;
      this.isSign = true;
      this.showBox = false;
      this.showLoad = true;
      //  return;
      var obj = this.getSign();
      filesPost(qs.stringify(obj)).then(res => {
        this.showBox = false;
        if (res.code === 0) {
          this.showBox2 = true;
          this.showLoad = false;
        } else {
          this.$toast(res.msg);
        }
      });
    },

    toTUikuan() {
      this.showBox2 = false;
      var idx = sessionStorage.getItem("returnIdx");
      // this.$router.go(-idx); //返回上一层

      this.jumpPay(null, this.roomId);

      // this.jumpPay();
    },
    cancle() {
      this.showBox = false;
    },

    getSign() {
      var timestamp = new Date().getTime();
      var objList = {
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        appId: "20200923157363955623",
        timestamp: timestamp,
        decorateId: this.decorateId,
        fileName: "签名文件",
        file: this.file,
        token: sessionStorage.getItem("token")
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        decorateId: this.decorateId,
        fileName: "签名文件",
        file: this.file,

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
    },
    //跳到支付
    jumpPay(val1, val2) {
      if (this._IsIOS()) {
        console.log("========");
        console.log(val2);
        console.log("========");
        try {
          window.webkit.messageHandlers.openWeChatPayForFitup.postMessage({
            decorateId: this.decorateId,
            roomId: val2
          });
        } catch (err) {
          //在这里处理错误
          alert("调用异常：" + err);
          return;
        } finally {
          this.$router.go(-2);
        }
      } else if (this._IsAndroid()) {
        try {
          window.android.openWeChatPayForFitup(this.decorateId ,val2);
          //在这里运行代码
        } catch (err) {
          alert("调用异常：" + err);
          return;
        } finally {
          this.$router.go(-2);
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
    }
  }
};
</script>

<style scoped lang="less">
.allpage {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  display: grid;
  resize: none;
  // color: rgba(0, 0, 0, 0)
}
.content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -0.5rem;
  right: 0;
  margin: auto;
  width: 80%;
  height: 95%;
}

.btn {
  position: absolute;
  right: -6.4rem;
  top: 6rem;
  width: 12rem;
  display: flex;
  justify-content: space-around;
  z-index: 999999;
  transform: rotate(90deg);
  text-align: left;

  p {
    z-index: 1;
    font-size: 0.3rem;
    word-wrap: break-word;
    word-break: normal;
    border-radius: 0.2rem;
    text-align: left;
  }
  #clearCanvas {
    // transform: rotate(90deg);
  }
  #saveCanvas {
    // transform: rotate(90deg);
  }
}
.coverBox {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px dashed #000;
  display: grid;
  place-content: center;
  // z-index: 999;
}
.coverBox p {
  // width: 1rem;
  transform: rotate(90deg);
  font-size: 0.7rem;
  color: #eee;
}

#canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  canvas {
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    display: block;
    height: 100%;
  }

  // #clearCanvas{
  //     width: 50%;
  //     height: 40px;
  //     line-height: 40px;
  //     text-align: center;
  //     position: absolute;
  //     bottom: 0;
  //     left: 0;
  //     border: 1px solid #DEDEDE;
  //     z-index: 1;
  //     // transform:rotate(90deg)
  //     // rotate: 90;
  // }
  // #saveCanvas{
  //     width: 50%;
  //     height: 40px;
  //     line-height: 40px;
  //     text-align: center;
  //     position: absolute;
  //     bottom: 0;
  //     right: 0;
  //     border: 1px solid #DEDEDE;
  //     z-index: 1;
  // }
}
.mySign {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: red;
  z-index: 999;
  img {
    width: 100%;
    height: 100%;
  }
}
.test {
  width: 100%;
  height: 200px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
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
  width: 90%;
  border-radius: 0.25rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0.5rem 0;
}
.alertBox .box > .h3 {
  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #454545;
  width: 5rem;
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