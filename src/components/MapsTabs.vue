<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left">
      <el-tab-pane v-for="(item) in mapsData" :key="item.id" :label="item.title" :name="'map_'+item.id">
        <img :id="'mapId_'+item.id" :src="'/img/maps/'+item.pict" />
        <MapSensors 
          :mapid="item.id" :descr="item.description"
          v-on:sensors="getMapSensors"
          v-on:dialog="dialogOpen"
        />
      </el-tab-pane>
    </el-tabs>

    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="430px"
        :close-on-press-escape="false"
        :close-on-click-modal = "false"
      >
        
        <KotelControlPanel v-if="deviceType=='kotelIcon'"/>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogClose">Закрыть</el-button>
        </span>
      </el-dialog>

  </div>
</template>
<script>
import axios from 'axios'
import MapSensors from '@/components/MapSensors.vue';
import KotelControlPanel from '@/components/KotelControlPanel.vue';
import comm from '@/common.js'

  export default {
    data: () => ({
      activeName: '', //'map_'+this.mapsData[0].id,
      dialogVisible: false,
      dialogTitle: '',
      deviceType: 'kotelIcon',
      mapsData: [
        {id:1,title:"Первый Этаж",pict:"dacha.png",w:3000,h:1454,description:"План первого этажа"},
        {id:2,title:"Второй этаж",pict:"dacha2.png",w:2000,h:1432,description:"План второго этажа"}
      ],
      sensorData: []
    }),
    components: { MapSensors, KotelControlPanel },
    created: function() {
        axios({
            method: 'post', url: '/api/maps', data: {},
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {            
            if(res.data.success) {
                this.mapsData = res.data.data;
                this.activeName = 'map_'+this.mapsData[0].id;
            } else {
                //this.message = res.data.msg;
                //this.snackbar = true;
            }
        })
        .catch(function (err) {
            console.log(err);
        });
        
        window.onresize = this.resizeImage;
        this.resizeImage();
    },
    updated: function() {
        this.resizeImage();
        //this.getMapSensors();
    },
    methods: {
      dialogClose: function() {
        this.dialogVisible = false;
      },
      dialogOpen: function(type) {
        this.dialogTitle = 'Управление ' + (type=='kotelIcon' ? 'котлом' : 'теплым полом');
        this.dialogVisible = true;
      },
      resizeImage: function() {
        var dim = comm.getElementPosition('app');
        var h = dim.height; 
        var w = dim.width; 
        var winRatio = w/h;
        var imgW = w - 170;
        var imgH = imgW / 1.3;
        if( winRatio>1.3 ) {
          imgH = h-130;
          imgW = imgH*1.3;
        }
        var m = this.mapsData.length; 
        if(m>0) {
          for(var i=0; i<m; i++) {
            //comm.resizeImage(40, 'mapId_'+this.mapsData[i].id);
            var el = document.getElementById('mapId_'+this.mapsData[i].id);    
            if(el) {
              el.width  = imgW;
              el.height = imgH;
              //var dw = (w - imgW) /2;
              if(this.sensorData.length>0 && this.sensorData[i]) {
                var n = this.sensorData[i].length;
                for(var j=0; j<n; j++) {
                  //comm.relocateElement:(this.sensorData[i][j].map_id+'_sensor_'+this.sensorData[i][j].device_id, imgW, elData)
                  var ht =  document.getElementById(this.sensorData[i][j].map_id+'_sensor_'+this.sensorData[i][j].device_id );
                  if(ht) {
                    ht.style.top  = (imgH * this.sensorData[i][j].yk)+'px';
                    ht.style.left = (imgW * this.sensorData[i][j].xk)+'px';
                  }                          
                }
              }
            }
          }
        }
      },
      getMapSensors: function(sens) {
        if(sens.length>0) {
            this.sensorData.push(sens);
            this.resizeImage();
        }
      }
    }
  };
</script>
