<template>
    <div class="scroll"></div>
</template>

<script>
export default {
  name: "Scroll",
  data() {
    return {
      id: ""
    };
  },
  methods: {
    scrollEvent() {
      //页面滚动距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //浮动框变化的高度
      const docuHeight =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      //屏幕高度
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //内容高度
      let contentHeight = document.body.scrollHeight;
      if (contentHeight - scrollTop <= clientHeight) {
          setTimeout(() => {
              this.onBottom();
          }, 1000);
      }
    }
  },
  props: {
    onBottom: Function,
    scrollBoxId: {
      type: String,
      default: function(params) {}
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent, true);
  }
};
</script>
<style scoped>
</style>