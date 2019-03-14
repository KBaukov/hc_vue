<template>
     <el-card class="box-card" style="float:left">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <!--el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button-->
      </div>      

      <line-chart :data="data"></line-chart>
      <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23]]"></pie-chart>
      <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart>
      <bar-chart :data="[['Work', 32], ['Play', 1492]]"></bar-chart>
      <area-chart :data="{'2017-01-01': 11, '2017-01-02': 6}"></area-chart>
      <scatter-chart :data="[[174.0, 80.0], [176.5, 82.3]]" xtitle="Size" ytitle="Population"></scatter-chart>
      

    </el-card>
</template>

<script>

export default { 
  data: () => ({
    data: {'2017-01-01': 11, '2017-01-02': 6, '2017-01-03': 12, '2017-01-04': 9, '2017-01-05': 5 }
  }),
  components: {
    //DoughnutChart
  },
  created () {
    //this.temp = parseFloat(this.$attrs.t); 
    //this.hum = parseFloat(this.$attrs.h);
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
</style>