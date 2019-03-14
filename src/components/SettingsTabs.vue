<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
    <el-tab-pane label="Пользователи" name="userTab"><UsersGrid/></el-tab-pane>
    <el-tab-pane label="Устройства" name="devicesTab"><DevicesGrid/></el-tab-pane>
    <el-tab-pane label="Карты" name="mapsTab">Карты</el-tab-pane>
  </el-tabs>
</template>
<script>
import UsersGrid from '@/components/UsersGrid.vue'
import DevicesGrid from '@/components/DevicesGrid.vue'

  export default {
    data() {
      return {
        activeName: 'userTab'
      };
    },
    components: {
      UsersGrid, DevicesGrid
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style>
  div.el-tabs__item {
    color: #939393;
  }
</style>