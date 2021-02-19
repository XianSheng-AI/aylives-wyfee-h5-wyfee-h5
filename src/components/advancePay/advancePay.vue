<template>
  <div class="houses">
   <!-- 预缴费 -->
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
      token: '',
      currentRoomId: '',
      actDetail : {}, //房屋详情信息
      loading : true ,
      isSubmit : false ,
      actId : 0 ,
      isOutDate: false,
    }
  },
  created () {
    this.init()
  },
  computed:{
  },
  mounted () {
  },
  methods: {
    getParam () {
    
    },
    init() {
      
    },
    // 用户参与活动
    confirmJoin() { //ACTIVITY_ADD_USER
    
    }
  }
}
</script>

<style lang="stylus" scoped>


</style>
