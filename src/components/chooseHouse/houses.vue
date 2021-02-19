<template>
  <div class="houses">
    <div v-title data-title="请选择缴费房屋" ></div>
    <div class="houseBox">
      <ul class="houseList">
        <li class="houseItem" v-for="(item,index) in houses" :key="index" :class="{'active':index==activeNum}" @click="chageActive(index,item)">
          <div class="houseTitle">{{item.agencyName}}</div>
          <p class="houseAddress">{{item.roomName}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../config/api.js'
import Util from '../../utils/utils'
// import { XButton } from 'vux'

export default {
  name: 'houses',
  components: {
    // XButton
  },
  data () {
    return {
      houses:[],
      activeNum:'0',
      token: '',
    }
  },
  created () {
  },
  computed:{
  },
  mounted () {
    this.init();
  },
  methods: {
    getHouses(){
      let token=this.$route.query.token;
      console.log(token)
      if (typeof(token) == "undefined")
      {
          this.$router.push('error')
      }
      this.localData('set','token',token);
      api.Axios.get(api.ROOM_LIST(token)).then(res=>{
        if(res.data.code===0){
          if(res.data.data.length<1){
            this.$router.push({path:'error',query:{msg:'当前账号没有房屋，请到奥悦家登录认证  '+res.data.requestId,show:true}});
          }
          this.houses=res.data.data;
          
        }else{
          this.$toast('网络或者系统错误，请稍后再试\n\r'+res.data.requestId, 10000);
          this.$router.push({path:'error',query:{msg:'没有房屋'+res.data.requestId}})
        }
      })
    },
    init() {
      this.getHouses();      
    },
    chageActive(index,item){
      this.activeNum=index;
      this.localData('set','pay_house',item);
      this.$router.push({path:'payInfo',query:{roomId:item.roomId}})
    },
    getParam () {
    
    },
   
    // 用户参与活动
    confirmJoin() { //ACTIVITY_ADD_USER
    
    }
  }
}
</script>

<style lang="stylus" scoped>
//   @import "../../style/activity.styl"
.houses
  margin 16px 20px 0 20px 
  .title
    padding 14px 0
    text-align center
    color #444
    font-size 16px
    margin-bottom 20px
  .houseBox
    
    .houseList
      .houseItem
        text-align left 
        padding 17px 20px
        box-shadow:0px 0px 16px 0px rgba(0,0,0,0.08);
        border-radius:8px;
        margin-bottom 20px
        border: 1px solid #fff;
        transition .2s
        &.active
          border 1px solid #EA4504
        .houseTitle
          font-size 18px
          font-weight:500;
          color:rgba(68,68,68,1);
          padding-bottom 12px
        .houseAddress
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);



</style>
