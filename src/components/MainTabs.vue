<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
    <el-tab-pane label="Сводная информация" name="dashboardTab">
      <DashBoard />
    </el-tab-pane>
    <el-tab-pane label="Карты" name="mapsTab"><MapsTabs/></el-tab-pane>
    <el-tab-pane label="Настройки" name="settingsTab"><SettingsTabs/></el-tab-pane>
  </el-tabs>
</template>
<script>
import SettingsTabs from '@/components/SettingsTabs.vue';
import MapsTabs from '@/components/MapsTabs.vue';
import DashBoard from '@/components/DashBoard.vue';

  export default {
    data() {
      return {
        activeName: 'dashboardTab'
      };
    },
    components: {
      SettingsTabs, MapsTabs, DashBoard
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style>
  div.el-tabs__content, div.el-tabs__content {
    padding: 5px !important;
    border: 1px solid #EBEEF5;
  }
</style>