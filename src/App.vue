
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App',

}
</script>

<style>
  html, body, div#app {
    height: 100%; padding: 0; margin: 0;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
</style>