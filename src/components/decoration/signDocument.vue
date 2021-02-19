<template>
  <div class="allpage">
    <loading :show="showLoad"></loading>
    <div class="pdf-box">
      <pdf
        v-for="i in 9"
        :key="i"
        :src="pdfSrc"
        :page="i"
      >
      </pdf>
    </div>
  </div>
</template>
<script>
import pdf from "vue-pdf";
import qs from "qs";
import { filesGet } from "../../config/decManApi";
import { Loading } from "vux";
export default {
  metaInfo: {
    meta: [
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes"
      }
    ]
  },
  components: {
    pdf,
    Loading
  },
  data() {
    return {
      pdfSrc: "",
      //    "https://img1.aylives.cn/lucky/bag/7721335f-9135-401c-b414-b57ab27aea5e-JitK9NpUiYmsUmUk.pdf?imageslim", // pdf文件地址
      numPages: undefined,
      decorateId: "",
      showLoad: true
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.decorateId = this.$route.query.decorateId;
    this.getData();
  },
  methods: {
    jumpSign() {
      this.$router.push({
        path: "/signature",
        query: { decorateId: this.decorateId }
      });
      // this.$router.push({ path: "/upData", query: { decorateId: val } });
    },
    getData() {
      var obj = this.getSign();

      filesGet(qs.stringify(obj)).then(res => {
        if (res.code === 0) {
          this.pdfSrc = res.data;
          setTimeout(() => {
            this.showLoad = false;
          }, 3000);
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
  padding: 0.5rem 0;
}
h3 {
  margin: 0.4rem;
}
iframe {
  width: 100%;
  height: 500px;
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
  margin-top: 0.5rem;
}
.pdf-box {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 0.28rem;
}

.pdf-box span {
  width: 100%;
}
</style>
