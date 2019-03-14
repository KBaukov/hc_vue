<template>
  <div> {{ description }}
        <div v-for="(item) in sensorsData" :key="item.id"
            :id="item.map_id+'_sensor_'+item.device_id" 
            :class="item.type+' sensor'"
            v-on:dblclick ="sensorOpen"
        >
            <span class="T" >23.5°C</span>
            <div style="height:22px"></div>
            <span class="H">57.3%</span>
            
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import comm from '@/common.js'

  export default {
    data: () => ({
      mapId: 0,
      description: '',
      sensorsData: [
        {id:1,map_id:1,device_id:3,type:"kotelIcon",xk:0.304,yk:0.115,pict:"zsxasx",description:""},
        //{id:2,map_id:1,device_id:4,type:"tempIcon",xk:0.204,yk:0.815,pict:"zsxasx",description:""}
      ]
    }),
    created: function() {
        this.mapID = this.$attrs.mapid;
        this.description = this.$attrs.descr;
        this.getSensorsData();
    },
    methods: {
        getSensorsData: function() {
            axios({
                method: 'post', url: '/api/sensors', data: comm.toBodyFormData({map_id: this.$attrs.mapid}),
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {            
                if(res.data.success) {
                    this.sensorsData = res.data.data;
                    this.$emit('sensors', this.sensorsData);
                } else {
                    //this.message = res.data.msg;
                    //this.snackbar = true;
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        sensorOpen: function(ev) {
            var type = ev.target.classList[0];
            this.$emit('dialog', type);
        },
    }
  }

</script>
<style>
div.sensor {
    position: absolute;
    top:0; left:0;
    background-color: #fff;
    opacity: 0.6;
}

div.kotelIcon {
    width: 48px;
    height: 86px;
    font-size: 11px;
}
div.tempIcon {
    width: 34px;
    height: 48px;
    background-image: url("../assets/tempHum.png");
    font-size: 11px;
    
    padding-left: 33px;
}
span.T {
    color: #ff6600;
}
span.H {
    color: #008cff;
}
</style>