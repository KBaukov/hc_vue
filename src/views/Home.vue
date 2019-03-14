<template>
  <el-container>
    <el-header >
      <el-button style="padding: 1px 5px 3px 5px; height: 25px; float:right" @click="handleClick">выйти</el-button>
    </el-header>
    <el-main>
      <MainTabs/>
    </el-main>
    
  </el-container>
</template>

<script>
import MainTabs from '@/components/MainTabs.vue'

export default {
  name: 'home',
  components: {
    MainTabs
  },
  methods: {
    handleClick() {
      document.location = '/logout';
    } 
  }
}
</script>

<style>
  header.el-header {
    height: 30px !important;
    padding: 2px;
    background-color: #f5f5f5;
    background-image: url("../assets/hcc.png");
    background-repeat: no-repeat;
    background-position: left;
    box-shadow: 0 0px 5px 0px rgba(10,10,10,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  }
  main.el-main {
    padding: 5px;
  }
</style>
