<template>
     <el-card class="box-card" style="float:left">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <!--el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button-->
      </div>      

      <DoughnutChart
        :percent="val"
        foregroundColor="#1993ff"
        backgroundColor="#ecf6ff"
        :strokeWidth="10"
        :radius="95"
        :width="100"
        :height="100"
        :visibleValue="true"
      >

        <div class="inner-text">
          <span>{{ val.toFixed(2)}}°C</span>
        </div>

      </DoughnutChart>      
    </el-card>
</template>

<script>
import DoughnutChart from 'vue-doughnut-chart';

export default { 
  data: () => ({
    val: 25.0
  }),
  components: {
    DoughnutChart
  },
  created () {
    this.val = parseFloat(this.$attrs.val); 
    this.title = this.$attrs.title; 
  },
};
</script>

<style>
  .el-card {margin:3px;}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  div.inner-text {
    position: absolute;
    bottom: 30px;
    left: 75px;
    color: #ff6600;
  }
  div.clearfix span {
    color: teal;
    font-size: 12px;
    font-weight: bolder;
  }
</style>