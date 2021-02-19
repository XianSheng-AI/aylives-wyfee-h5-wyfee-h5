<template>
  <div class="error">
   <!-- 失败页 -->
        <div v-title data-title="页面访问失败" ></div>
        <div class="content">
            <img src="../../assets/images/error.png" class="error-img" alt="">
            <h2 class="error-tip">温馨提示</h2>
            <p class="error-desc">{{errorText}}</p>
        </div>

        <div class="open" :class="{'show':isShow}">
          <div class="open-title">打开下载奥悦家</div>
          <div class="open-item">
            <div class="item-left">
              <img src="../../assets/images/ao-logo.png" alt="">
              <div>
                <h4>奥悦家</h4>
                <p>奥园物业健康生活O2O服务平台</p>
              </div>
            </div>
            <div @click="downLoad" class="item-right">打开</div>
          </div>




          <div class="open-item"></div>
        </div>
  </div>
</template>

<script>
import Util from '../../utils/utils'

export default {
  name: 'error',
  data () {
    return {
      errorText:'',
      isShow:false
    }
  },
  created () {

  },
  computed:{
    
  },
  mounted () {
    this.init();
    let msg=this.$route.query.msg;
    if (typeof(msg) == "undefined")
    {
        this.errorText='页面访问参数缺失'
    }
    else{
      this.errorText=msg;
    }
    
  },
  methods: {
    init(){
      if(this.$route.query.hasOwnProperty('show')){
        setTimeout(()=>{
        this.isShow=true
      },500)
      }
      
    },
    downLoad(){
      window.location = 'http://h5.aylives.cn/app'
    }
  }
}
</script>

<style lang="stylus" scoped>
.open{
  width 100%
  // height 400rpx;
  background #fff
  position fixed;
  // bottom 400rpx
  bottom -400px
  display flex
  flex-direction column
  box-sizing border-box
  padding 20px
  box-shadow 0 0 10px #ccc
  transition .6s;
  border-radius:20px 20px 0 0
  &.show{
    bottom 0
  }
  .open-title{
    font-size 16px
    text-align left 
    padding-bottom 16px
  }
  .open-item{
    display flex
    justify-content space-between
    align-items center
    .item-left{
      display flex
      justify-content start
      h4{
        font-size 17px
      }
      p{
        margin-top 7px
      }
      img{
        display block
        width 50px
      }
      >div{
        text-align left 
        margin-left 10px
      }
    }
    .item-right{
      padding 12px 36px
      background-image: linear-gradient(to right, #7772ff ,#fd69a5);
      border-radius 8px
      font-size 17px
      color #fff
    }
  }
}

.error
    margin-top 200px
    .error-tip
        margin 20px 0 8px
        font-size:18px;
    .error-desc
        font-size:13px;
        font-weight:400;
        color:rgba(153,153,153,1);

</style>
