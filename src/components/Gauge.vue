<template>
     <el-card class="box-card" style="float:left">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <!--el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button-->
      </div>      
      <span class="tempInfo">{{ temp.toFixed(2)}}°C</span>
      <VueSvgGauge
        :start-angle="-110"
        :end-angle="110"
        :value="temp"
        :separator-step="45"
        :min="0"
        :max="45"
        :gauge-color="[{ offset: 0, color: '#0000FF'}, { offset: 50, color: '#00FF00'}, { offset: 100, color: '#FF0000'}]"
        :scale-interval=".5"
      >

        <div class="inner-text">
          
          <DoughnutChart
            :percent="hum"
            foregroundColor="#1993ff"
            backgroundColor="#ecf6ff"
            :strokeWidth="10"
            :radius="65"
            :width="100"
            :height="100"
            :visibleValue="true"
          />
        </div>
        
      </VueSvgGauge>      
    </el-card>
</template>

<script>
import DoughnutChart from 'vue-doughnut-chart';

export default { 
  data: () => ({
    temp: 25.0,
    hum: 63.4
  }),
  components: {
    DoughnutChart
  },
  created () {
    this.temp = parseFloat(this.$attrs.t); 
    this.hum = parseFloat(this.$attrs.h);
    this.title = this.$attrs.title; 
  },
};
</script>

<style>
  .el-card {margin:3px;}
  div.clearfix span {
    color: teal;
    font-weight: bold;
    font-size: 10pt;
  }
  div.el-card__body span.tempInfo {
    color: #ff6600;
    font-weight: bold;
    font-size: 20pt;
    float: right;
  }
  div.inner-text {
    position: absolute;
    bottom: 33px;
    left: 75px;
  }
  div.inner-text span {
    font-size: 12px;
  }
  div.doughnut_chart {
    top:50px; left: -24px;
  }
</style>