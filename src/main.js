// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import Toast from 'vue-toast-component'
import "./utils/rem.js"
import store from './store/index'
import {
  localData,
  sessionData
} from "./utils/local"
import {
  DropdownMenu,
  DropdownItem,
  Skeleton,
  Loading,
  List,
  PullRefresh
} from 'vant';
import Scroll from "@/components/utils/scroll"


import md5 from 'js-md5';

Vue.prototype.$md5 = md5;


function encode(str) {
  var base64 = window.btoa(encodeURI(str));
  return base64;
}



Vue.use(Skeleton);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading);
Vue.use(List);
Vue.component("Scroll", Scroll);
Vue.use(PullRefresh)
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})
Vue.prototype.localData = localData;
Vue.prototype.sessionData = sessionData;

Vue.prototype.formatTime = function (te) {
  if (te == '') {
    return '';
  } else if (te.length == 10) {
    let time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let y = time.getFullYear();
    let m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    let timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return timedate;
  } else {
    let time = new Date(te);
    let y = time.getFullYear();
    let m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    let timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return timedate;
  }
}

Vue.config.productionTip = false;
Vue.use(Toast);

router.beforeEach((to, from, next) => {
  console.log('======');
  console.log(store.state.deData.code);

  console.log('======');

  // if (store.state.deData.code == 1) {
  //   to.meta.keepAlive = true;
  //   console.log("缓存");
  // } else {
  //   to.meta.keepAlive = false
  //   console.log("不缓存");
  // }

  if (to.path === '/decoration' && from.path === '/appointments') {
    to.meta.keepAlive = false
    // store.state.deData.code = 3
    console.log("不缓存");
  }

  if (to.path === '/appointments' && from.path === '/decoration') {
    to.meta.keepAlive = true
    store.state.deData.code = 1
    console.log("缓存");
  }

  console.log('11111111');
  console.log(store.state.deData.code);
  console.log('11111111');






  // //  //判断是否需要缓存
  // if(to.path === '/decoration' && from.path === '/appointments'){
  //   store.state.deData.code==3
  //   from.meta.keepAlive = true;  // 缓存，即不刷新
  //   next();
  // }else {
  //   from.meta.keepAlive = false;  //  即不缓存，刷新
  //   next();
  // }


  console.log(to.path, from.path);






  if (to.meta.title) {
    document.title = to.meta.title
    next();

  } else {
    document.title = ''
    next();
  }
})





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
