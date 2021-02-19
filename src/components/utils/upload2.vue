<template>
  <div class="des-upload">
    <div class="des-photo" v-if="uploaded">
      <loading class="loading-photo" v-if="loading" :color='"#328FDE"'></loading>
      <img v-else class="photo" :src="photoUrl" alt="">
    </div>
    <vue-core-image-upload v-else
      class="upload-box-item"
      :crop="false"
      @imageuploaded="imageuploaded"
      @imageuploading="imageuploading"
      @errorhandle="errorhandle"
      :max-file-size="10485760"
      inputOfFile="img"
      :text="uploadText"
      :credentials="false"
      :url="uploadUrl">
      <img class="image" src="../../assets/icon_pic_current.png" v-if="!imgSrc">
      <img class="image" :src="imgSrc" v-else>
    </vue-core-image-upload>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import loading from "./loading.vue"
import { Toast, Indicator } from "mint-ui";
// import api from "../../config/api.js"
import { baseUploadURL } from "../../api/index";
export default {
  name: 'upload',
  props:["imgSrc"],
  data () {

    return {
      uploadUrl: baseUploadURL,
      showUpload: true,
      loading: true,
      uploaded: false,
      photoUrl: '',
      uploadText: '',
    }
  },
  watch: {
  },
  components: {
    VueCoreImageUpload,
    loading
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    getThumbId(id) {
       Toast({
          message: "图片上传中",
          position: "middle",
          duration: 1000
        });
      this.$emit('getThumbId', id)
       
    },
    imageuploaded(res) {
      
      if (res) {
        // this.uploaded = true
        if (res.code === 200) {
          this.loading = false
          this.photoUrl = res.data.filepath
          this.url = res.data
          this.getThumbId(this.url)
        } else {
          this.$toast(res.msg, 1000)
        }
      } else {
        this.$toast("上传图片服务器错误", 1000)
      }
    },
    delImage(index) {
      this.photoUrl.splice(index, 1)
    },
    imageuploading() {
      // 显示
      this.loading = true
      // this.$toast("正在上传中，请稍后", 3000)
    },
    errorhandle(err) {
      if (err) {
        this.$toast(err, 1000)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .des-upload
    width 100%
    .des-photo 
      width: 100%;
      position absolute
      top 50%
      transform translateY(-50%)
      -webkit-transform translateY(-50%)
      .loading-photo 
        // margin-top: 70%;
        width: 32px;
        margin: auto;
      .photo 
        height 70px
    .upload-box-item 
      width 100%
      text-align center
      position absolute
      top 50%
      transform translateY(-50%)
      -webkit-transform translateY(-50%)
      .image
        width 100%
</style>


