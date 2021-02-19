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
        <h5>装修拆改图（必填）</h5>
        <p v-if="Buslicen.url"> <span>{{Buslicen.name}}</span> <img
            src="../../assets/images/decoration/icon_failed@2x.png"
            alt=""
            @click="delBuslicen"
          > </p>
        <div
          class="upLoadBox"
          v-if="!Buslicen.url"
        >
          <img
            src="../../assets/images/decoration/add.png"
            alt=""
          >
          <input
            type="file"
            value
            id="file1"
            accept="image/png, image/jpg, application/pdf, application/msword"
            @change="onUpload"
            ref="input"
          />
          <div
            class="cover"
            style="width:100%;height:100%;"
            v-if="!Buslicen.name"
            @click="tisss"
          ></div>
        </div>
        <input
          type="text"
          placeholder="请输入文件名"
          style="width:3rem;margin-top:.2rem"
          v-model="Buslicen.name"
          v-if="!Buslicen.url"
        >

      </div>
      <div class="box">
        <h5>装修单位资料（选填）</h5>
        <p v-if="register.url"> <span>{{register.name}}</span> <img
            src="../../assets/images/decoration/icon_failed@2x.png"
            alt=""
            @click="delregister"
          > </p>
        <div
          class="upLoadBox"
          v-if="!register.url"
        >
          <img
            src="../../assets/images/decoration/add.png"
            alt=""
          >
          <input
            type="file"
            value
            id="file2"
            @change="onUpload2"
            ref="input"
          />
          <div
            class="cover"
            style="width:100%;height:100%;"
            v-if="!register.name"
            @click="tisss"
          ></div>
        </div>
        <input
          type="text"
          placeholder="请输入文件名"
          style="width:3rem;margin-top:.2rem"
          v-model="register.name"
          v-if="!register.url"
        >

      </div>

      <div class="box">
        <h5>其他资料</h5>
        <p
          v-if="others.length"
          v-for="(info, index) in others"
          :key="index"
        > <span>{{info.name}}</span> <img
            src="../../assets/images/decoration/icon_failed@2x.png"
            alt=""
            @click="delOther(index)"
          > </p>
        <div class="upLoadBox">
          <img
            src="../../assets/images/decoration/add.png"
            alt=""
          >
          <input
            type="file"
            value
            id="file3"
            @change="onUpload3"
            ref="input"
          />
          <div
            class="cover"
            style="width:100%;height:100%;"
            v-if="!fileName"
            @click="tisss"
          ></div>
        </div>
        <input
          type="text"
          placeholder="请输入文件名"
          style="width:3rem;margin-top:.2rem"
          v-model="fileName"
        >
        <!-- <div
          class="more"
          @click="upLoadMore"
        >
          新增上传文件
        </div> -->
      </div>
      <div
        class="btn"
        @click="uploadData"
      >
        确认上传
      </div>
    </div>
    <loading :show="showLoad"></loading>
  </div>
</template>
<script>
let roomPersonList = "";
import qs from "qs";
import VueCoreImageUpload from "vue-core-image-upload";
import { Loading } from "vux";
import $ from "jquery";
import {
  decDetail,
  decDetailList,
  roomList,
  baseUploadURL,
  filesSave
} from "../../config/decManApi";
export default {
  data() {
    return {
      decorateId: "",
      roomDetail: "",
      listDetail: [],
      uploadUrl: baseUploadURL,
      Buslicen: {
        name: "",
        url: ""
      },
      register: {
        name: "",
        url: ""
      },
      fileName: "",
      fileUrl: "",
      others: [],
      showLoad: false
    };
  },
  components: {
    VueCoreImageUpload,
    Loading
  },
  mounted() {
    this.decorateId = this.$route.query.decorateId;
    console.log(this.decorateId);

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
    },
    //上传营业执照
    onUpload(e) {
      var that = this;

      this.showLoad = true;
      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file1.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
      $.ajax({
        url: that.uploadUrl,
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          that.showLoad = false;
          if (res) {
            console.log(res.data);
            that.$toast("上传成功");
            that.Buslicen.url = res.data;
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    //删除营业执照
    delBuslicen() {
      this.Buslicen.url = "";
      this.Buslicen.name = "";
    },
    //上传营业执照
    onUpload2(e) {
      var that = this;
      // if (!that.register.name.trim()) {
      //   that.$toast("请先填写文件名");
      //   return;
      // }

      this.showLoad = true;
      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file2.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
      $.ajax({
        url: that.uploadUrl,
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          that.showLoad = false;
          if (res) {
            console.log(res.data);
            that.register.url = res.data;
            that.$toast("上传成功");
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    //删除营业执照
    delregister() {
      this.register.url = "";
    },
    //上传其他资料
    onUpload3(e) {
      var that = this;

      this.showLoad = true;
      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file3.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
      $.ajax({
        url: that.uploadUrl,
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          that.showLoad = false;
          if (res) {
            console.log(res.data);
            that.fileUrl = res.data;
            that.$toast("上传成功");
            that.others.push({ name: that.fileName, url: that.fileUrl });
            that.fileName = "";
            that.fileUrl = "";
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
 //   上传更多
    upLoadMore() {
      if (!this.fileName) {
        this.$toast("请输入文件名");
        return;
      }
      if (!this.fileUrl) {
        this.$toast("请上传文件");
        return;
      }
      this.others.push({ name: this.fileName, url: this.fileUrl });
      this.fileName = "";
      this.fileUrl = "";
    },
    //删除单项
    delOther(id) {
      console.log(id);
      this.others.splice(id,1)
    },
    tisss() {
      this.$toast("请先输入文件名");
    },

    getSign2(val) {
      var timestamp = new Date().getTime();

      var jsonObj = val;
      var objList = {
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        appId: "20200923157363955623",
        timestamp: timestamp,
        token: sessionStorage.getItem("token"),
        decorateId: this.decorateId,
        typeCode: 7,
        fileStr: JSON.stringify(jsonObj)
      };
      var str = this.sort_ASCII(objList);
      var sign = this.$md5(str);
      var obj = {
        timestamp: timestamp,
        sign: sign,
        token: sessionStorage.getItem("token"),
        decorateId: this.decorateId,
        typeCode: 7,
        fileStr: JSON.stringify(jsonObj)
      };
      return obj;
    },
    uploadData() {
      var upData = [];
      if (!this.Buslicen.url) {
        this.$toast("装修拆改图需上传");
        return
      } else {
        upData.push(this.Buslicen);
      }
      if (!this.register.url) {
        // this.Buslicen == null;
      } else {
        upData.push(this.register);
      }
      upData = [...upData, ...this.others];
      if (upData.length == 0) {
        this.$toast("上传数据不能为空");
        return;
      }
      var obj = this.getSign2(upData);
      var that = this;

      if (!obj) {
        return;
      }

      this.showLoad = true;

      console.log(obj);

      filesSave(qs.stringify(obj)).then(res => {
        console.log(res);
        that.showLoad = false;
        if (res.code === 0) {
          this.$router.go(-1); //返回上一层
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
  margin-bottom: 0.2rem;
}
.box p {
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
  font-size: 0.2rem;
}
.box p img {
  width: 0.3rem;
  height: 0.3rem;
}
.box .upLoadBox {
  position: relative;
  top: 0;
  height: 1rem;
  margin-top: 0.3rem;
}
.box .upLoadBox img {
  position: absolute;
  top: 0;
  height: 0;
  width: 1rem;
  height: 1rem;
}
.box .upLoadBox input {
  position: absolute;
  top: 0;
  height: 0;
  width: 1rem;
  height: 1rem;
  opacity: 0;
}
.more {
  margin-top: 0.2rem;
  color: #fcb757;
  font-weight: 600;
  font-size: 0.25rem;
}
.cover {
  position: absolute;
  width: 100px;
  height: 100%;
  /* background-color: #000; */
}
.btn {
  width: 4rem;
  height: 0.9rem;
  font-size: 0.3rem;
  background: #ffca1c;
  box-shadow: -1px 10px 15px 0px rgba(255, 218, 96, 0.5);
  border-radius: 6px;
  margin: auto;
  line-height: 0.9rem;
  margin-top: 0.5rem;
}
</style>

