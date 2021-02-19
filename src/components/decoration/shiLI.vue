<template>
    <div>
        <img @dblclick="getInfo" :class="{overImg:isbig==true}" v-if="names=='planeUrl'" src="../../assets/images/decoration/pingmian.jpg" alt="">
        <img @dblclick="getInfo" :class="{overImg:isbig==true}" v-if="names=='structureUrl'" src="../../assets/images/decoration/jiegou.jpg" alt="">
        <img @dblclick="getInfo" :class="{overImg:isbig==true}" v-if="names=='rebuildUrl'" src="../../assets/images/decoration/chaigai.jpg" alt="">
        <img @dblclick="getInfo" :class="{overImg:isbig==true}" v-if="names=='credentialsUrl'" src="../../assets/images/decoration/zizhi.jpg" alt="">
        <img @dblclick="getInfo" :class="{overImg:isbig==true}" v-if="names=='licenseUrl'" src="../../assets/images/decoration/zhizhao.jpg" alt="">
    </div>
</template>
<script>
export default {
    data () {
        return {
            names :'',
            imgSrc:'../../assets/images/decoration/WechatIMG172.png',
            isbig:false
        }
    },
    created () {
        console.log(this.$route.query.names);
       this.names= this.$route.query.names
        // if(){
        //     this.imgSrc = "../../assets/images/decoration/WechatIMG172.png"
        // }
    },
    methods: {
        getInfo(){
            console.log("双击");
            if(this.isbig){
                this.isbig = false
            }else{
                this.isbig = true
            }
        }
    }
}
</script>
<style scoped>
div{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: grid;
    place-content: center;
    overflow: scroll 
}
img{
    width: 100%;
}
.overImg{
    width: 200% !important;
}
</style>
