<template>
  <div class="containner">
      <div class="item-box">
          <div class="lable">证件类型</div>
          <div class="id-type">身份证</div>
      </div>
      <div class="item-box">
          <div class="lable">证件号码</div>
          <input v-model="idNum" class="idNum" type="text" placeholder="请输入证件号">
      </div>
      <div class="submit" @click="valid" :class="{'active':isHas}">申请认证</div>
      <div class="foo-box">
          <div class="foo-lable">个人业主：</div>
          <div class="foo-val">请输入房屋产权户主身份证进行房屋认证</div>
      </div>
      <!-- <div class="foo-box">
          <div class="foo-lable">企业业主：</div>
          <div class="foo-val">请选择企业证件类型及填入证件号进行房屋认证</div>
      </div> -->
  </div>
</template>

<script>
import api from '../../config/api.js'
import Util from '../../utils/utils'

export default {
  name: 'houses',
  components: {
    // XButton
  },
  watch:{
      idNum:function (val,old){
          val?this.isHas=true:this.isHas=false
      }
  },
  data () {
    return {
      isHas:false,
      token: '',
      idNum:'',
    }
  },
  created () {
  },
  computed:{
  },
  mounted () {
  },
  methods: {
    valid(){
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        let res=reg.test(this.idNum) 
        if(res){
            let token=this.$route.query.token;
            let idcard=this.idNum;
            console.log(this.$route.query)
            api.Axios.post(api.ROOM_VALID({token:token,idcard:idcard}),).then(res=>{ 
                if(res.data.code===0){
                    this.$router.push({path:'/houses',query:{token:token}})
                }
                
             })
        }else{
            this.$toast('身份证号码格式不正确!', 3000);
        }
        
    }
  }
}
</script>

<style lang="stylus" scoped>
.containner{
    input::-webkit-input-placeholder{  // 针对 谷歌 内核
        color:#d5d5d5;
        line-height:40px;
    }
    input:-moz-placeholder{   // 火狐
        color:#d5d5d5;
    }
    input:-ms-input-placeholder{  // 微软ie
        color:#d5d5d5;
    }
   
    .item-box{
        display flex;
        justify-content space-between;
        align-items flex-end;
        padding .5rem .4rem;
        border-bottom 1px solid #eee
        font-size 16px
        .lable{

        }
        .id-type{
            color gray
        }
        .idNum{
            width : 70%;
            display block
        }
    }
    .submit{
        width 92%;
        padding .3rem 0;
        margin .8rem auto;
        background #d4d4d4;
        font-size 18px;
        color #fff;
        border-radius 8px
        color #fff;
        transition .4s
        &.active{
            background rgb(255 194 21)
        }

    }
    .foo-box{
        padding 0 .3rem;
        display flex;
        color #e6b400
        .foo-lable{
            white-space:nowrap;

        }
        .foo-val{
            text-align left;
            // line-height: .5rem;
            
        }
    }
}
</style>
