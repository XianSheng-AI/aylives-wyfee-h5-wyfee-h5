<template>
  <div class="pageAll">
    <loading :show="showLoad"></loading>
    <h3>选择装修房屋</h3>
    <div class="address">
      <div
        v-for="(info ,index) in roomList"
        :key="index"
        :class="{choosed:roomId==info.roomId }"
        v-if="decorateId"
      >{{info.roomName}}</div>
      <div
        v-if="!decorateId"
        v-for="(info ,index) in roomList"
        :key="index"
        :class="{choosed:roomId==info.roomId }"
        @click="chooseRoom(info.roomId,info.agId)"
      >{{info.roomName}}</div>

    </div>
    <div class="details">
      <div class="deList">
        <p>装修时间</p>
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
              ></datetime>
              <i>{{decorateStartTime2}}</i>
            </span> </span>

          至
          <span> <img
              src="../../assets/images/decoration/icon_date.png"
              alt=""
            > <span>
              <datetime
                v-model="endTime"
                format="YYYY-MM-DD"
                @on-change="change2"
                class="dateTime"
              ></datetime>
              <i>{{decorateEndTime2}}</i>
            </span> </span>
        </p>

      </div>
      <div
        class="deList"
        @click="chooseisVilla2"
      >
        <p>是否别墅/商铺/写字楼</p>
        <p>
          <x-switch
            title=""
            v-model="isVilla2"
          ></x-switch>
        </p>
      </div>

      <div class="deList">
        <p>是否装修公司装修</p>
        <p>
          <x-switch
            title=""
            v-model="decorateSelf2"
          ></x-switch>
        </p>
      </div>
      <!-- <div class="deList">
        <p>是否装修公司装修
        </p>
        <p>
          <x-switch
            title=""
            v-model="isDecCom"
          ></x-switch>
        </p>
      </div> -->
      <div class="deList">
        <p>装修内容选择</p>
        <p>

        </p>
      </div>
      <div class="psi">
        <p
          v-for="(info, idx) in typeList"
          :key="idx"
          :class="{chooseTime:chooseTypeList.indexOf(info.decorateContentName) != -1 }"
          @click="chooseType(info.decorateContentName)"
        > {{info.decorateContentName}}</p>

      </div>
      <!-- <div class="time  dec">
        <p
          v-for="(info, idx) in typeList"
          :key="idx"
          @click="chooseType(info.id)"
          :class="{chooseTime:chooseTypeList.indexOf(info.id) != -1 }"
        >
          {{info.decorateContentName}}
        </p>
      </div> -->
    </div>

    <h3>装修图纸</h3>
    <div class="contBox">

      <div class="upppp">
        <h5>
          <p>上传原始平面图</p>
          <p
            style="color: #999999;"
            @click="shili('planeUrl')"
          >查看示例</p>
        </h5>

        <div class="imgList">
          <div
            v-for="(info , index) in planeUrlArr"
            :key="index"
          >
            <img
              :src="info"
              alt=""
            >
            <img
              class="del"
              src="../../assets/images/decoration/ic_shut_down.png"
              alt=""
              @click="cultArr('planeUrlArr', index)"
            >
          </div>
          <div class="upLoadBox">
            <img
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
      <div class="upppp">
        <h5>
          <p>上传水电图</p>
          <p
            style="color: #999999;"
            @click="shili('structureUrl')"
          >查看示例</p>
        </h5>

        <div class="imgList">
          <div
            v-for="(info , index) in structureUrlArr"
            :key="index"
          >
            <img
              :src="info"
              alt=""
            >
            <img
              class="del"
              src="../../assets/images/decoration/ic_shut_down.png"
              alt=""
              @click="cultArr('structureUrlArr', index)"
            >
          </div>

          <div class="upLoadBox">
            <img
              src="../../assets/images/decoration/add.png"
              alt=""
            >
            <input
              type="file"
              value
              id="file2"
              accept="image/png, image/jpg, application/pdf, application/msword"
              @change="onUploadStructureUrl"
              ref="input"
            />

          </div>

        </div>

      </div>
      <!-- <div class="upppp">
        <h5>
          <p>上传拆改图</p>
          <p
            style="color: #999999;"
            @click="shili('rebuildUrl')"
          >查看示例</p>
        </h5>

        <div class="imgList">
          <div
            v-for="(info , index) in rebuildUrlArr"
            :key="index"
          >
            <img
              :src="info"
              alt=""
            >
            <img
              class="del"
              src="../../assets/images/decoration/ic_shut_down.png"
              alt=""
              @click="cultArr('rebuildUrlArr', index)"
            >
          </div>

          <div class="upLoadBox">
            <img
              src="../../assets/images/decoration/add.png"
              alt=""
            >
            <input
              type="file"
              value
              id="file3"
              accept="image/png, image/jpg, application/pdf, application/msword"
              @change="onUploadRebuildUrl"
              ref="input"
            />

          </div>

        </div>

      </div> -->

    </div>
    <h3 v-if="decorateSelf2">装修单位</h3>
    <div
      class="company"
      v-if="decorateSelf2"
    >
      <div class="inpList">
        <span>施工单位</span> <input
          type="text"
          name=""
          id=""
          placeholder="输入单位名称"
          v-model="decorateCompany"
        >
      </div>
      <div class="inpList">
        <span>装修负责人</span> <input
          type="text"
          name=""
          id=""
          placeholder="输入单位负责人"
          v-model="decorateResponseName"
        >
      </div>
      <div class="inpList">
        <span>联系电话</span> <input
          type="text"
          name=""
          id=""
          placeholder="输入联系电话"
          v-model="decorateResponsePhone"
        >
      </div>
      <div class="upppp">
        <h5>
          <p>请上传装修资质</p>
          <p
            style="color: #999999;"
            @click="shili('credentialsUrl')"
          >查看示例</p>
        </h5>

        <div class="imgList">
          <div
            v-for="(info , index) in credentialsUrlArr"
            :key="index"
          >
            <img
              :src="info"
              alt=""
            >
            <img
              class="del"
              src="../../assets/images/decoration/ic_shut_down.png"
              alt=""
              @click="cultArr('credentialsUrlArr', index)"
            >
          </div>
          <div class="upLoadBox">
            <img
              src="../../assets/images/decoration/add.png"
              alt=""
            >
            <input
              type="file"
              value
              id="file4"
              accept="image/png, image/jpg, application/pdf, application/msword"
              @change="onUploadCredentialsUrl"
              ref="input"
            />

          </div>
        </div>

      </div>
      <!-- <div class="upppp">
        <h5>
          <p>请上传装修公司营业执照</p>
          <p
            style="color: #999999;"
            @click="shili('licenseUrl')"
          >查看示例</p>
        </h5>

        <div class="imgList">
          <div
            v-for="(info , index) in licenseUrlArr"
            :key="index"
          >
            <img
              :src="info"
              alt=""
            >
            <img
              class="del"
              src="../../assets/images/decoration/ic_shut_down.png"
              alt=""
              @click="cultArr('licenseUrlArr', index)"
            >
          </div>
          <div class="upLoadBox">
            <img
              src="../../assets/images/decoration/add.png"
              alt=""
            >
            <input
              type="file"
              value
              id="file5"
              accept="image/png, image/jpg, application/pdf, application/msword"
              @change="onUploadLicenseUrl"
              ref="input"
            />

          </div>
        </div>

      </div> -->
    </div>
    <p
      class="xieyi"
      @click="chooseXieyi"
      v-if="!decorateId"
    >
      <img
        src="../../assets/images/decoration/ic_shut_down.png"
        alt=""
        v-if="!xieyi"
      >
      <img
        src="../../assets/images/decoration/ture.png"
        alt=""
        v-if="xieyi"
      >
      我已阅读
      <span
        style="color:#FFCA1C"
        @click.stop="jumpxieyi"
      >

        《装修管理协议》

      </span>
    </p>

    <div
      class="btn"
      v-if="!showBtn&&!decorateId"
    >
      提交申请
    </div>
    <div
      class="btn"
      style="background: #FFCA1C;"
      @click="subApt"
      v-if="showBtn&&!decorateId"
    >
      提交申请
    </div>

    <div
      class="btn"
      style="background: #FFCA1C;"
      @click="upLoadData"
      v-if="decorateId"
    >
      更改资料
    </div>

    <div
      class="alertBox"
      v-show="showBox"
    >
      <div
        class="box"
        style="width:100%"
      >
        <div class="h3">申请成功 <br>
          即将跳转到签名</div>
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
    <div
      class="alertBox"
      v-show="isVilla2"
    >
      <div
        class="box"
        style="width:100%"
      >
        <div class="bieShu">
          <h3>别墅/商铺/写字楼装修</h3>

          <span>
            别墅/商铺/写字楼装修暂不支持线上办理，
            <br>
            请移步到物业前台申请，谢谢
          </span>

        </div>
        <div
          class="h5"
          style="padding:0 0.6rem;margin-bottom:.3rem"
        >

        </div>

        <div>

          <div
            class="p"
            style="border: 2px solid #FFCA1C;color: #FFCA1C;"
            @click.stop="isVilla2=false"
          >确定</div>
        </div>
      </div>

    </div>
    <div
      class="coverBox"
      v-if="showCover"
    >
      <div class="box">
        <h3>温馨提示</h3>
        <p>
          尊敬的业主您好，装修过程中产生的费用我司均以“奥悦家线上缴费”的方式收取，为了维护您的权益，请勿向员工个人转账，谢谢配合。
        </p>
        <h5 @click="showCover=false">确定</h5>
      </div>
    </div>

  </div>
</template>
<script>
import { Datetime, XSwitch, Loading } from "vux";
import { constants } from "zlib";
import api from "../../config/decManApi";
import qs from "qs";
import $ from "jquery";
import {
  subscribeNum,
  roomList,
  decoAdd,
  typeList,
  decDetail,
  baseUploadURL,
  decorateUpdate
} from "../../config/decManApi";
import { type } from "os";
import { clearTimeout } from "timers";
export default {
  components: {
    Datetime,
    XSwitch,
    Loading
  },
  data() {
    return {
      isDecComArr: [1],
      showBeishuBox: true,
      uploadUrl: baseUploadURL,
      minuteListValue: "20-06-12 09:00",
      startTime: "开始时间",
      endTime: "结束时间",
      decorateStartTime: "",
      decorateStartTime2: "开始时间",
      decorateEndTime: "",
      decorateEndTime2: "结束时间",
      isVilla: false,
      isVilla2: false,
      decorateSelf: false,
      decorateSelf2: true,
      decorateEasy: false,
      decorateEasy2: false,
      timeList: [],
      isActive: "",
      roomList: [],
      roomId: "",
      agId: "",
      decorateCompany: "",
      decorateContent: "装修内容",
      subscribeTime: "",
      decorateResponseName: "",
      decorateResponsePhone: "",
      decorateDays: "",
      showBtn: true,
      showLoad: false,
      showBox: false,
      typeList: [],
      chooseTypeList: [],
      decorateContentType: "",
      planeUrl: "",
      structureUrl: "",
      rebuildUrl: "",
      credentialsUrl: "",
      licenseUrl: "",
      planeUrlArr: [],
      structureUrlArr: [],
      rebuildUrlArr: [],
      credentialsUrlArr: [],
      licenseUrlArr: [],
      xieyi: false,
      decorateId: "",
      showCover: true,
      isDecCom: false
    };
  },
  mounted() {

//     var plateform = Zepto.device.os;

// if(plateform == "android"){
//   alert("android")
//  $("selector").find("input[type='file']").attr("capture","camera");
// }else if(plateform=="ios"){  
//    alert("ios")       
//   $("selector").find("input[type='file']").removeAttr("capture");
// }





    
    this.getData();
    this.decorateId = this.$route.query.decorateId;

    if (this.$route.query.decorateId) {
          this.showCover = false
      this.getDataDetail();
    }
    this.getTime();

    console.log(this.$store.state.deData.code);
  },
  filters: {
    getTime: function(value) {
      // return value.replace(/:\d{1,2}$/, " ").substring(0, 10);
      return value.rzeplace(/:\d{1,2}$/, " ").substring(0, 10);
    }
  },
  watch: {
    decorateSelf2(newData, oldData) {
      // if (!newData) {
      //   this.decorateCompany = "";
      //   this.decorateResponseName = "";
      //   this.decorateResponsePhone = "";
      // } else {
      //   this.decorateCompany = "自装修";
      //   this.decorateResponseName = "自装修";
      //   this.decorateResponsePhone = "自装修";
      // }
    }
  },
  methods: {
    addDecComArr(id) {
      if (this.isDecComArr.indexOf(id) > -1) {
        for (let index = 0; index < this.isDecComArr.length; index++) {
          const element = this.isDecComArr[index];
          if (element == id) {
            this.isDecComArr.splice(index, 1);
          }
        }
      } else {
        this.isDecComArr.push(id);
      }
    },
    //修改的原来信息
    getDataDetail() {
      var obj = this.getSignDetail();
      decDetail(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          for (
            let index = 0;
            index < res.data.appHouseDecorateFiles.length;
            index++
          ) {
            const element = res.data.appHouseDecorateFiles[index];
            if (element.fileName == "planeUrl") {
              this.planeUrlArr = element.file.split(",");
              this.planeUrlId = element.id;
            }
            if (element.fileName == "structureUrl") {
              this.structureUrlArr = element.file.split(",");
              this.structureUrlId = element.id;
            }
            // if (element.fileName == "rebuildUrl") {
            //   this.rebuildUrlArr = element.file.split(",");
            //   this.rebuildUrlId = element.id;
            // }
            if (element.fileName == "credentialsUrl") {
              this.credentialsUrlArr = element.file.split(",");
              this.credentialsUrlId = element.id;
            }
            if (element.fileName == "licenseUrl") {
              this.licenseUrlArr = element.file.split(",");
              this.licenseUrlId = element.id;
            }
          }

          //1609084800000
          //1609084800000
          //1606492800000
          //1606492800000
          this.decorateStartTime = this.getTime(res.data.decorateStartTime);
          this.decorateStartTime2 = this.getTime(res.data.decorateStartTime);
          this.endTime = this.getTime(res.data.decorateEndTime);
          this.startTime = this.getTime(res.data.decorateStartTime);
          this.decorateEndTime = this.getTime(res.data.decorateEndTime);
          this.decorateEndTime2 = this.getTime(res.data.decorateEndTime);
          this.decorateSelf = res.data.decorateSelf;
          this.decorateSelf2 = this.getTure(res.data.decorateSelf);
          this.decorateCompany = res.data.decorateCompany;
          this.decorateResponseName = res.data.decorateResponseName;
          this.decorateResponsePhone = res.data.decorateResponsePhone;
          this.decorateDays = res.data.decorateDays;
          this.roomId = res.data.roomId;
          this.room_id = res.data.roomId;
          this.agId = res.data.agId;
          this.chooseTypeList = res.data.decorateContentType.split(",");
          // for (
          //   let index = 0;
          //   index < res.data.decorateContentType.split(",").length;
          //   index++
          // ) {
          //   const element = res.data.decorateContentType.split(",")[index];
          //   this.chooseTypeList.push(parseInt(element));
          // }

          console.log(this.chooseTypeList);
        } else {
          this.$toast(res.msg);
        }
      });
    },

    getTure(val) {
      if (val == 1) {
        return false;
      } else {
        return true;
      }
    },

    getTime: function(value) {
      var reg = /\\|\/|\?|\？|\*|\"|\“|\”|\‘|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g;

      var now = new Date(value),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate(),
        x =
          y +
          "-" +
          (m < 10 ? "0" + m : m) +
          "-" +
          (d < 10 ? "0" + d : d) +
          " " +
          now.toTimeString().substr(0, 8);
      return y + "-" + m + "-" + d;
    },
    getSignDetail() {
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
    chooseisVilla2() {
      this.showBeishuBox = true;
    },
    shili(name) {
      this.$router.push({
        path: "/shili",
        query: { names: name }
      });
    },
    chooseXieyi() {
      if (this.xieyi) {
        this.xieyi = false;
      } else {
        this.xieyi = true;
      }
    },
    cultArr(arrName, index) {
      if (arrName == "planeUrlArr") {
        this.planeUrlArr.splice(index, 1);
      }
      if (arrName == "structureUrlArr") {
        this.structureUrlArr.splice(index, 1);
      }
      if (arrName == "rebuildUrlArr") {
        this.rebuildUrlArr.splice(index, 1);
      }
      if (arrName == "credentialsUrlArr") {
        this.credentialsUrlArr.splice(index, 1);
      }
      if (arrName == "licenseUrlArr") {
        this.licenseUrlArr.splice(index, 1);
      }
    },
    //上传图片
    onUploadPlaneUrlArr(e) {
      var that = this;

      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file1.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
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
            that.planeUrlArr.push(res.data);
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    onUploadStructureUrl(e) {
      var that = this;

      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file2.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
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
            that.structureUrlArr.push(res.data);
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    onUploadRebuildUrl(e) {
      var that = this;

      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file3.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
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
            that.rebuildUrlArr.push(res.data);
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    onUploadCredentialsUrl(e) {
      var that = this;

      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file4.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
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
            that.credentialsUrlArr.push(res.data);
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },
    onUploadLicenseUrl(e) {
      var that = this;

      var formData = new FormData();
      formData.append("img", e.target.files[0]);

      var fileName = file5.files[0].name;
      var index = fileName.lastIndexOf(".");
      var ext = fileName.substr(index + 1);
      var that = this;
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
            that.licenseUrlArr.push(res.data);
          }
        },
        error: function(err) {
          alert("网络连接失败,稍后重试", err);
        }
      });
    },

    //提交预约

    subApt() {
      var obj = this.getSubSign();
      var that = this;
      if (!obj) {
        return;
      }

      this.showLoad = true;
      this.showBtn = false;

      decoAdd(qs.stringify(obj)).then(res => {
        this.showLoad = false;
        if (res.code === 0) {
          that.showBox = true;
          this.decorateId = res.data.id;
        } else {
          this.$toast(res.msg);
          this.showBtn = true;
        }
      });
    },
    toTUikuan() {
      this.showLoad = false;
      sessionStorage.setItem("returnIdx", 2);
      this.showBox = false;

      this.$router.push({
        path: "/signature",
        query: { decorateId: this.decorateId, roomId: this.roomId }
      });
    },
    jumpxieyi() {
      this.$router.push({
        path: "/signDocument",
        query: { decorateId: this.decorateId }
      });
    },

    //选择房屋
    chooseRoom(val, agId) {
      this.roomId = val;
      this.agId = agId;
    },
    //预约时间
    chooseTime(val) {
      this.subscribeTime = val;
    },
    getData() {
      var obj = this.getSign();
      roomList(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.roomList = res.data;
        } else {
        }
      });
      typeList(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.typeList = res.data.list;
        } else {
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
    getSubSign() {




      
      if (!this.xieyi) {
        this.$toast("请先阅读《装修管理协议》");
        return false;
      }

      if (!this.roomId) {
        this.$toast("请选择要装修的房屋");

        return;
      }
      if (!this.decorateStartTime) {
        this.$toast("请选择装修开始时间");
        return;
      }
      if (!this.decorateEndTime) {
        this.$toast("请选择装修结束时间");
        return;
      }

      if (!this.chooseTypeList.length) {
        this.$toast("请选择装修内容");
        return;
      }

      if (this.isVilla2) {
        this.isVilla = 1;
      } else {
        this.isVilla = 0;
      }
      if (this.decorateEasy2) {
        this.decorateEasy = 1;
      } else {
        this.decorateEasy = 0;
      }
      if (this.decorateSelf2) {
        this.decorateSelf = 0;

        if (!this.decorateCompany.trim()) {
          this.$toast("施工单位不能为空");
          return false;
        }
        if (!this.decorateResponseName.trim()) {
          this.$toast("请填写装修负责人");
          return false;
        }
        if (!this.decorateResponsePhone.trim()) {
          this.$toast("请填写联系电话");
          return false;
        }
        if (!this.credentialsUrlArr.length) {
          this.$toast("请上传装修资质");
          return false;
        }
      } else {
        this.decorateSelf = 1;
      }

      if (this.decorateResponsePhone.trim()) {
        if (!/^1[3456789]\d{9}$/.test(this.decorateResponsePhone)) {
          this.$toast("手机号码有误");
          return false;
        }
      }

      if (!this.planeUrlArr.length) {
        this.$toast("原始平面图不能为空");
        return false;
      }
      if (!this.structureUrlArr.length) {
        this.$toast("水电图不能为空");
        return false;
      }
      // if (!this.rebuildUrlArr.length) {
      //   this.$toast("拆改图不能为空");
      //   return false;
      // }

      var timess =
        this.getDate(this.decorateEndTime) -
        this.getDate(this.decorateStartTime);

      if (timess < 0) {
        this.$toast("结束时间有误");
        return false;
      }

      this.decorateDays = timess / 1000 / 3600 / 24 + 1;
      var timestamp = new Date().getTime();

      var asObj = {
        timestamp: timestamp,
        appId: "20200923157363955623",
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        agId: this.agId,
        decorateCompany: this.decorateCompany,
        decorateContent: this.decorateContent,
        decorateDays: this.decorateDays,
        decorateEasy: this.decorateEasy,
        decorateEndTime: this.decorateEndTime + " 00:00:00",
        decorateResponseName: this.decorateResponseName,
        decorateResponsePhone: this.decorateResponsePhone,
        decorateStartTime: this.decorateStartTime + " 00:00:00",
        isVilla: this.isVilla,
        decorateSelf: this.decorateSelf,
        decorateContentType: this.chooseTypeList.toString(),
        roomId: this.roomId,
        subscribeTime: this.subscribeTime,
        planeUrl: this.planeUrlArr.toString(),
        structureUrl: this.structureUrlArr.toString(),
        rebuildUrl: this.rebuildUrlArr.toString(),
        credentialsUrl: this.credentialsUrlArr.toString(),
        licenseUrl: this.licenseUrlArr.toString(),
        token: sessionStorage.getItem("token")
      };

      var str = this.sort_ASCII(asObj);
      var sign = this.$md5(str);
      var obj = {
        sign: sign,
        timestamp: timestamp,
        appId: "20200923157363955623",
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        agId: this.agId,
        decorateCompany: this.decorateCompany,
        decorateContent: this.decorateContent,
        decorateDays: this.decorateDays,
        decorateEasy: this.decorateEasy,
        decorateEndTime: this.decorateEndTime + " 00:00:00",
        decorateResponseName: this.decorateResponseName,
        decorateResponsePhone: this.decorateResponsePhone,
        decorateStartTime: this.decorateStartTime + " 00:00:00",
        isVilla: this.isVilla,
        decorateSelf: this.decorateSelf,
        decorateContentType: this.chooseTypeList.toString(),
        roomId: this.roomId,
        subscribeTime: this.subscribeTime,
        planeUrl: this.planeUrlArr.toString(),
        structureUrl: this.structureUrlArr.toString(),
        rebuildUrl: this.rebuildUrlArr.toString(),
        credentialsUrl: this.credentialsUrlArr.toString(),
        licenseUrl: this.licenseUrlArr.toString(),
        token: sessionStorage.getItem("token")
      };

      return obj;
    },

    //更改资料
    upLoadData() {
      var obj = this.getUpdataSign();
      var that = this;

      if (!obj) {
        return;
      }

      this.showLoad = true;
      this.showBtn = false;

      decorateUpdate(qs.stringify(obj)).then(res => {
        this.showLoad = false;
        if (res.code === 0) {
          this.$router.go(-1); //返回上一层
        } else {
          this.$toast(res.msg);
        }
      });
    },

    getUpdataSign() {

      if (!this.decorateStartTime) {
        this.$toast("请选择装修开始时间");
        return;
      }
      if (!this.decorateEndTime) {
        this.$toast("请选择装修结束时间");
        return;
      }

      if (!this.chooseTypeList.length) {
        this.$toast("请选择装修内容");
        return;
      }

      if (this.isVilla2) {
        this.isVilla = 1;
      } else {
        this.isVilla = 0;
      }
      if (this.decorateEasy2) {
        this.decorateEasy = 1;
      } else {
        this.decorateEasy = 0;
      }
      if (this.decorateSelf2) {
        this.decorateSelf = 0;
        if (!this.decorateCompany.trim()) {
          this.$toast("施工单位不能为空");
          return false;
        }
        if (!this.decorateResponseName.trim()) {
          this.$toast("请填写装修负责人");
          return false;
        }
        if (!this.decorateResponsePhone.trim()) {
          this.$toast("请填写联系电话");
          return false;
        }
        if (!this.credentialsUrlArr.length) {
          this.$toast("请上传装修资质");
          return false;
        }
      } else {
        this.decorateSelf = 1;
      }

      if (this.decorateResponsePhone.trim()) {
        if (!/^1[3456789]\d{9}$/.test(this.decorateResponsePhone)) {
          this.$toast("手机号码有误");
          return false;
        }
      }

      if (!this.planeUrlArr.length) {
        this.$toast("原始平面图不能为空");
        return false;
      }
      if (!this.structureUrlArr.length) {
        this.$toast("水电图不能为空");
        return false;
      }
      // if (!this.rebuildUrlArr.length) {
      //   this.$toast("拆改图不能为空");
      //   return false;
      // }
      if (!this.credentialsUrlId) {
        this.credentialsUrlId = "";
      }
      if (!this.licenseUrlId) {
        this.licenseUrlId = "";
      }
      var timess =
        this.getDate(this.decorateEndTime) -
        this.getDate(this.decorateStartTime);

      if (timess < 0) {
        this.$toast("结束时间有误");
        return false;
      }

      this.decorateDays = timess / 1000 / 3600 / 24 + 1;
      var timestamp = new Date().getTime();
      var reg = /\\|\/|\?|\？|\*|\"|\“|\”|\‘|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g;
      var asObj = {
        //.replace(/Microsoft/g, "jb51.net")
        timestamp: timestamp,
        appId: "20200923157363955623",
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        token: sessionStorage.getItem("token"),
        isVilla: this.isVilla,
        decorateStartTime:
          this.decorateStartTime.replace(reg, "-") + " 00:00:00",
        decorateEndTime: this.decorateEndTime.replace(reg, "-") + " 00:00:00",
        decorateCompany: this.decorateCompany,
        decorateResponseName: this.decorateResponseName,
        decorateResponsePhone: this.decorateResponsePhone,
        decorateContent: this.decorateContent,
        decorateEasy: this.decorateEasy,
        decorateDays: this.decorateDays,
        room_id: this.roomId,
        agId: this.agId,
        decorateSelf: this.decorateSelf,
        decorateContentType: this.chooseTypeList.toString(),
        planeUrl: this.planeUrlArr.toString(),
        structureUrl: this.structureUrlArr.toString(),
        rebuildUrl: this.rebuildUrlArr.toString(),
        credentialsUrl: this.credentialsUrlArr.toString(),
        licenseUrl: this.licenseUrlArr.toString(),
        decorateId: this.decorateId,
        planeUrlId: this.planeUrlId,
        structureUrlId: this.structureUrlId,
        credentialsUrlId: this.credentialsUrlId,
        licenseUrlId: this.licenseUrlId,

        subscribeTime: this.subscribeTime,
        roomId: this.roomId
      };

      var str = this.sort_ASCII(asObj);
      var sign = this.$md5(str);
      var obj = {
        sign: sign,
        timestamp: timestamp,
        appId: "20200923157363955623",
        appSecret: "4527cf0f368ea109ddfdc2951c6af6d0",
        token: sessionStorage.getItem("token"),
        isVilla: this.isVilla,
        decorateStartTime:
          this.decorateStartTime.replace(reg, "-") + " 00:00:00",
        decorateEndTime: this.decorateEndTime.replace(reg, "-") + " 00:00:00",
        decorateCompany: this.decorateCompany,
        decorateResponseName: this.decorateResponseName,
        decorateResponsePhone: this.decorateResponsePhone,
        decorateContent: this.decorateContent,
        decorateEasy: this.decorateEasy,
        decorateDays: this.decorateDays,
        room_id: this.roomId,
        agId: this.agId,
        decorateSelf: this.decorateSelf,
        decorateContentType: this.chooseTypeList.toString(),
        planeUrl: this.planeUrlArr.toString(),
        structureUrl: this.structureUrlArr.toString(),
        rebuildUrl: this.rebuildUrlArr.toString(),
        credentialsUrl: this.credentialsUrlArr.toString(),
        licenseUrl: this.licenseUrlArr.toString(),
        decorateId: this.decorateId,
        planeUrlId: this.planeUrlId,
        structureUrlId: this.structureUrlId,
        credentialsUrlId: this.credentialsUrlId,
        licenseUrlId: this.licenseUrlId,
        subscribeTime: this.subscribeTime,
        roomId: this.roomId
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
    change(value) {
      this.startTime = value;
      this.decorateStartTime = this.startTime;
      this.decorateStartTime2 = this.startTime.substring(5);
    },
    change2(value) {
      this.endTime = value;
      this.decorateEndTime = this.endTime;
      this.decorateEndTime2 = this.endTime.substring(5);
      this.getDate(value);
    },
    //获取装修天数

    getDate(time) {
      // 2020-10-26
      var dateStr = time.replace(/-/g, "/");
      var timeTamp = new Date(dateStr).getTime();
      return timeTamp;
    },
    chooseType(decorateContentName) {
      if (this.chooseTypeList.indexOf(decorateContentName) != -1) {
        this.chooseTypeList.splice(
          this.chooseTypeList.indexOf(decorateContentName),
          1
        );
      } else {
        this.chooseTypeList.push(decorateContentName);
      }

      console.log(this.chooseTypeList);
    }
    //
  }
};
</script>

<style scoped>
.psi {
  display: flex;
  flex-wrap: wrap;
}
.psi p {
  background: #f3f3f3;
  border-radius: 44px;
  margin-right: 0.2rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.24rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #454545;
  margin-bottom: 0.2rem;
}
.coverBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-content: center;
}
.box {
  /* width: 50%; */
  width: 5rem;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  padding: 0.2rem;
}
.coverBox .box h3 {
  text-align: center;

  font-size: 0.34rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #454545;
}
.coverBox .box p {
  text-align: center;
  text-indent: 0.5rem;

  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #454545;
  text-align: justify;
}

.coverBox .box h5 {
  text-align: center !important;
  padding: 0.2rem 0;

  height: 0.32rem;
  font-family: PingFang SC;
  font-weight: 500;
  /* padding-left: 2.2rem; */
  display: flex;
  place-content: center;

  color: #ffca1c;
}
.pageAll {
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
  padding: 0.2rem 0.3rem 0.3rem 0.5rem;
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
  margin-right: 0.3rem;
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
  background: #aaaaaa;
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
  width: 80%;
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
.dec {
  padding: 0;
}
.dec p {
  /* background-color: red; */
}
h5 {
  display: flex;
  justify-content: space-between;

  font-size: 0.3rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
}
.upLoadBox {
  position: relative;
  margin-top: 0.2rem;
  text-align: left;
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
.imgList {
  text-align: left;
  flex-wrap: wrap;
}
.imgList img {
  width: 1.8rem;
  height: 1.9rem;
}
.imgList div {
  display: inline-block;
  margin-top: 0.2rem;
  width: 1.8rem;
  height: 1.9rem;
  margin-right: 0.2rem;
  position: relative;
}
.imgList div:nth-child(3n) {
  margin-right: 0rem;
}
.del {
  position: absolute;
  right: 0rem;
  top: 0rem;
  width: 0.5rem !important;
  height: 0.5rem !important;
}
.upppp {
  padding: 0.3rem 0;
  border-bottom: 1px solid #eee;
}
.xieyi {
  text-align: left;
  display: flex;
  padding: 0.2rem 0;
  font-size: 0.3rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #454545;
  align-items: center;
}
.xieyi img {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0 0.1rem;
}
.bieShu {
  text-align: center !important;
  display: block !important;
  padding: 0 0.5rem;
  font-size: 0.3rem;
  color: #333;
}
.bieShu h3 {
  text-align: center !important;
  font-size: 0.3rem;
  color: #000;
}
</style>

