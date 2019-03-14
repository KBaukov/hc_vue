<template>

    <div id="cpBase"> 
      <div class="led" id="led1" on="on"></div>
      <div class="led" id="led2"></div>
      <div id="ddt"> .8.</div>
      <!--div id="dig1"></div><div id="dig2"></div><div-- id="dot"></div-->
      <div id="leftButt" @click="leftButt"></div>
      <div id="rightButt" @click="rightButt"></div>
      <div id="mokButt" @click="modeButt"></div>
      <div id="cpBaseShadow"></div>
    </div>

</template>
<script>
import axios from 'axios';
import comm from '@/common.js';

//var md5 = require('md5');

  export default {
    data: () => ({
      currVal: ['25','60','11','1.8','e0','p0'],
      destVal: ['25','60','11','1.8','e0','p0'],
      stage:   ['ot','vs','va','pr', 'es','es'],
      va:      ['2','4','7','9','11','14'],
      desttc: 0.0, to: 0.0, tp:0.0, 
      mode: 0,
      curSatgeInx: 0,
      curVaInx: 0,
      led1: document.getElementById("led1"),
      task: null
    }),
    created: function() {
      this.led1 = document.getElementById("led1");
      this.getValues();
    },
    updated: function() {
      console.log('#####: Updated');
      this.dispCurrentView();
    },
    opened: function() {
      console.log('#####: Opened');
      this.dispCurrentView();
    },
    methods: {
      buttClick: function(ev) {
        var id = ev.target.id;
        var butt = id.substring(0,1).toUpperCase();
        //var cmp =Ext.getCmp('kotelControlPanel');
        if(this.stage[this.curSatgeInx]=='pr' && butt=='M'){
            this.setDisabled(true);
            //setTimeout( function(cmp) { var cmp =Ext.getCmp('kotelControlPanel'); cmp.setDisabled(false) }, 200);
            return; 
        }
        //var stage = this.nextStage(butt);
        //var hash = md5((new Date()).toLocaleString());
        //var rMsg = '{"action":"resend", "recipient":"'+this.kotelId+'", "msg":"'
        //    +btoa('{"action":"pessButton","butt":"'+butt+'","sender":"","hash":"'+hash+'","stage":"'+stage+'"}') //
        //+'"}';
        this.setDisabled(true);
        //this.papa.wss.butt = butt;
        //this.papa.wss.hash = hash;
        //this.papa.wss.send(rMsg);
      },
      leftButt: function() { 
        var val = 0;
        if(this.mode==0) {
            if(this.curSatgeInx==0) {
                this.curSatgeInx = 3;
            } else
               this.curSatgeInx--; 
            
            this.setLedPosition(this.curSatgeInx);            
        }
        if(this.mode==1 && this.stage[this.curSatgeInx]=='ot') {
            val = this.destVal[this.curSatgeInx] == 'mm' ? 25 : parseInt(this.destVal[this.curSatgeInx]);
            val--;
            if(val<25) { val = 'mm'; }
            
            this.destVal[this.curSatgeInx] = val+'';
        }
        if(this.mode==1 && this.stage[this.curSatgeInx]=='vs') {
            val = this.destVal[this.curSatgeInx] == 'mm' ? 35 : parseInt(this.destVal[this.curSatgeInx]);
            val--;
            if(val<35) { val = 'mm'; }
            
            this.destVal[this.curSatgeInx] = val+'';
        }
        if(this.mode==1 && this.stage[this.curSatgeInx]=='va') {
            this.curVaInx = this.curVaInx == 0 ? 0 : (--this.curVaInx);
            val = this.va[this.curVaInx];            
            this.destVal[this.curSatgeInx] = val+'';
        }
        
        this.dispCurrentView();
            
      },
      rightButt: function() { 
        var val = 0;
        if(this.mode==0) {
            if(this.curSatgeInx==3) {
                this.curSatgeInx = 0;
            } else
               this.curSatgeInx++;             
            this.setLedPosition(this.curSatgeInx);
        }
        if(this.mode==1 && this.stage[this.curSatgeInx]=='ot') {
            val = this.destVal[this.curSatgeInx] == 'mm' ? 24 : (this.destVal[this.curSatgeInx] == '80' ? 79 : parseInt(this.destVal[this.curSatgeInx])) ;
            val++;
            //if(val>99) { val = "mm"; }

            this.destVal[this.curSatgeInx] = val+'';
        }
        if(this.mode==1 && this.stage[this.curSatgeInx]=='vs') {
            val = this.destVal[this.curSatgeInx] == 'mm' ? 34 : (this.destVal[this.curSatgeInx] == '70' ? 69 : parseInt(this.destVal[this.curSatgeInx])) ;
            val++;
            //if(val>99) { val = "mm"; }

            this.destVal[this.curSatgeInx] = val+'';
        }
        if(this.mode==1 && this.stage[this.curSatgeInx]=='va') {
            this.curVaInx = this.curVaInx == 5 ? 5 : (++this.curVaInx);
            val = this.va[this.curVaInx];            
            this.destVal[this.curSatgeInx] = val+'';
        }
        
        this.dispCurrentView();
      },
      modeButt: function() { 
        if(this.stage[this.curSatgeInx]=='pr') return;
        if(this.mode==0) {
            this.mode=1;
            this.startBlink();
            this.display(this.destVal[this.curSatgeInx]);
        } else {
           this.mode=0; 
           this.stopBlink(); 
           this.display(this.currVal[this.curSatgeInx]);
        }
      },

      dispCurrentView: function() {
        //console.log('#####: dispCurrentView');
        if(this.mode==0)
            this.display(this.currVal[this.curSatgeInx]);
        else
            this.display(this.destVal[this.curSatgeInx]);
      },
      display: function(val) {
          var box = document.getElementById("ddt");
          val = val.replace('m', '-').replace('m', '-');
          box.innerHTML = val.length>1 ? val : ' '+val;
      },
      getValues: function() {
        axios({
            method: 'get', url: '/api/kotel/getvalues', data: {},
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {    
          var resp = res.data;        
          if(resp.success) {
            this.tp = parseFloat(resp.data.tp);
            this.to = parseFloat(resp.data.to);
            this.desttc = parseFloat(resp.data.destTc);

            this.currVal[0]=parseInt(resp.data.tp)+"";
            this.currVal[1]=parseInt(resp.data.to)+"";
            this.currVal[2]=parseInt(resp.data.kw)+"";
            //if(!this.destInit) {
            this.destVal[0]=parseInt(resp.data.destTp)+"";
            this.destVal[1]=parseInt(resp.data.destTo)+"";
            this.destVal[2]=parseInt(resp.data.destKw)+"";
            if(this.destVal[0]<25) this.destVal[0]="mm";
            if(this.destVal[1]<35) this.destVal[1]="mm";
            //this.destInit = true;
            //}
            var stage = resp.data.stage.split('_');
            this.mode = stage[0];
            this.curSatgeInx = stage[1];
            this.curVaInx = this.getCurrVaIndex(this.destVal[2]);

            this.setLedPosition(this.curSatgeInx);
            this.dispCurrentView();
          } else {
              //this.message = res.data.msg;
              //this.snackbar = true;
          }
        })
        .catch(function (err) {
            console.log(err);
        });
      },
      setLedPosition: function(idx) {
        if(idx==5) idx=4;
        var led = document.getElementById("led1");
        led.style.left = (55+idx*70) + 'px';
      },
      startBlink: function() {
        //Ext.TaskManager.start(this.task);
        this.task = setInterval(function () {
          this.blink();
        }.bind(this), 500);
      },
      stopBlink: function() {
        clearInterval(this.task);
        var led = document.getElementById("led1");
        led.style.opacity=1;
      },
      blink: function() {
        var led = document.getElementById("led1");
        if(led.style.opacity==1) {
            led.style.opacity = 0.2;
        } else {
            led.style.opacity = 1;
        }
      },
      getCurrVaIndex: function(val) {
        for(var i=0; i<this.va.length; i++) {
            if(this.va[i]==val)
                return i;
        }
        return -1;
      },
      setDest: function() {
        var suf = '.0';
        var currStage = this.mode+'_'+this.curSatgeInx;
        var data = {
            desttp: (this.destVal[0]=='mm' ? '1':this.destVal[0])+suf,
            destto: (this.destVal[1]=='mm' ? '1':this.destVal[1])+suf,
            desttc: this.desttc,
            destkw: this.destVal[2],
            destpr: this.destVal[3],
            stage: currStage
        };
        axios({
          method: 'post', url: '/api/kotel/setdest', data: comm.toBodyFormData(data),
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(res => {            
          //console.log(res);
          if(res.data.success) {
            //this.papa.stopSession();
            this.$message({
              type: 'success', 
              message: 'Новые установочные данные сохранены.'
            });
          } else {
            this.$message({
              type: 'error', 
              message: res.data.msg
            });
          }                
        }).catch(res => {
          if(res.response) {
            this.$message({ type: 'error',  message: 'Новые установочные данные не сохранены.' + res.response.status });
          }
        });        
      },
      nextStage: function(butt) { //cmp.mode+'_'+cmp.curSatgeInx;
        var mm=this.mode; var st = st=this.curSatgeInx;
        if(butt=='M') {
            if(this.mode==1)  mm=0;
            else mm=1;
        }
        if(butt=='L') {
            if(this.mode==0) {
                if(this.curSatgeInx==0) st=3;
                else st=this.curSatgeInx-1;
            }
        }
        if(butt=='R') {
            if(this.mode ==0) {
                if(this.curSatgeInx==3) st=0;
                else st=this.curSatgeInx+1;
            }
        }
        return mm+'_'+st;
      },
      setDisabled: isBlock => {
        var shadow = document.getElementById("cpBaseShadow");
        shadow.style.display = isBlock ? 'block' : 'none';
      }
    }
  };
</script>

<style>  

  @font-face {
  font-family: digital7;
    src: url("../assets/7segment.woff");
  }

  div#cpBase {
    width: 391px;
    height: 455px;
    background-image: url("../assets/kotel/CP_base.png");
    
  }
  div#cpBaseShadow {
    width: 391px;
    height: 455px;
    position: relative;
    top:0; left:0;
    background-color: black;
    opacity: .4;
    display: none;
    border-bottom: 2px solid #999;
    border-left: 2px solid #666;
    border-top: 2px solid #666;
    border-right: 2px solid #999
  }
  div#ddt {
    font-family: digital7;
    font-size: 110px;
    height: 100px; width:120px;
    top: 190px; left: 156px;
    position: absolute;
    color: #c20606;
    white-space: pre;
  }
  /*div#dig1{
    height: 78px; width:53px;
    background-image: url("../assets/kotel/dr.png");
    top: 204px; left: 158px;
    position: absolute;
  }
  div#dig2{
    height: 78px; width:53px;
    background-image: url("../assets/kotel/dr.png");
    top: 204px; left: 210px;
    position: absolute;
  }
  div#dot{
    height: 13px; width:13px;
    background-image: url("../assets/kotel/drd.png");
    top: 272px; left: 198px;
    position: absolute;
    opacity: 0;
  } */
  div#leftButt{
    height: 62px; width:147px;
    background-image: url("../assets/kotel/leftButt.png");
    top: 350px; left: 55px;
    position: absolute;
    background-position-y: top;
  }
  div#rightButt{
    height: 62px; width:147px;
    background-image: url("../assets/kotel/rightButt.png");
    top: 350px; left: 220px;
    position: absolute;
    background-position-y: top;
  }

  div#mokButt{
    height: 63px; width:182px;
    background-image: url("../assets/kotel/mokButt.png");
    top: 426px; left: 120px;
    position: absolute;
    background-position-y: top;
  }
  div.led{
    height: 28px; width:30px;
    background-image: url("../assets/kotel/ledOn.png");
    top: 130px; 
    position: absolute;
    opacity: 1;
  }
  div#led1 { left: 55px; } /*  81, 222, 363, 504 */
  div#led2 { left: 337px; opacity: 1;}

  div#rightButt:hover { background-position-y: bottom;}
  div#leftButt:hover { background-position-y: bottom;}
  div#mokButt:hover { background-position-y: bottom;}


</style>
