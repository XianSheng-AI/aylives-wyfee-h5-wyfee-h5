<template>
  <div id="app">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'/>
    </keep-alive>
      <router-view v-if='!$route.meta.keepAlive'/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  margin: 0;
  padding: 0;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-size: 100px;
}
body {
  margin: 0;
  padding: 0;
  font-size: 12px; /*实际相当于14px*/
}
* {
  margin: 0;
  padding: 0;
}

a img {
  border: 0;
}

a {
  text-decoration: none;
}

input, textarea{
  border: none;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
button{
  outline: none;
  border: none;
}

#app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
}
ul,li{
  list-style: none;
}
i{
  font-style: normal;
}
</style>
