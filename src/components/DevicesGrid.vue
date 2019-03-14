<template>
<div>

  <el-table :data="devices" height="400" style="width: 100%">
    <el-table-column prop="id" label="ID" width="40"></el-table-column>
    <el-table-column prop="name" label="Идентификатор" width="180"></el-table-column>
    <el-table-column prop="type" label="Тип" width="180"></el-table-column>
    <el-table-column prop="ip" label="IP" width="180"></el-table-column>
    <el-table-column prop="active_flag" label="Активно" align="center"></el-table-column>
    <el-table-column prop="description" label="Описание"></el-table-column>
    <el-table-column align="right" label="">
      <template slot="header">
        <el-button size="mini" type="primary" icon="el-icon-plus" circle @click="handleAdd()"></el-button>
      </template>
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>        
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="Устройство" :visible.sync="dialogFormVisible" width="420px">
    <el-form :model="form">
      <el-form-item label="Идентификатор" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="Введите идентификатор"></el-input>
      </el-form-item>
      <el-form-item label="Тип" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="Выберете тип пользователя">
          <el-option label="Контроллер отопления" value="KotelController"></el-option>
          <el-option label="Датчик T&H" value="TempHumSensor"></el-option>
          <el-option label="Контроллер пола" value="FloorController"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP" :label-width="formLabelWidth">
        <el-input v-model="form.ip" autocomplete="off" placeholder="Введите ip адрес"></el-input>
      </el-form-item>
      <el-form-item label="Активно" :label-width="formLabelWidth">
        <el-checkbox v-model="form.active_flag"> </el-checkbox>
      </el-form-item>
      <el-form-item label="Описание" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off" placeholder="Введите описание"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Отменить</el-button>
      <el-button type="primary" @click="saveDevice">Сохранить</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import comm from '@/common.js'

  export default {
    
    data: () => ({
      dialogFormVisible: false,
      devices: [{"id":2,"type":"TempHumSensor","name":"ESP_73FFF2","ip":"192.168.0.125","active_flag":"Y","description":"Влажность и температура в зале"},{"id":4,"type":"KotelController","name":"ESP_AB2042","ip":"192.168.1.41","active_flag":"Y","description":"Контроллер отопления"},{"id":5,"type":"TempHumSensor","name":"ESP_681A38","ip":"192.168.1.222","active_flag":"Y","description":"Влажность и температура в Никитиной спальне"}],
      lastId: 0,
      formLabelWidth: '120px',
      form: {
        id: 0,
        name: '',
        ip: '',
        type: '',
        active_flag: 'N',
        description: ''
      },
      defaulteDevice: {
        id: 0,
        name: '',
        ip: '',
        type: '',
        active_flag: 'N',
        description: ''
      },
      mode: 'add'
    }),
    created () {
      this.initialize();
    },
    methods: {
      initialize () {
        axios.get('/api/devices')
        .then(response => {            
            this.devices = response.data.success ? response.data.data : [];
            this.getLastId();
        })
        .catch(error => {
            console.log(error);
            //this.errors.push(error);
        })
      },     
      handleEdit(index, row) {
        this.mode = 'edit';
        this.form = row;
        if(row.active_flag=='Y') {
          this.form.active_flag = true;
        }        
        this.dialogFormVisible = true;
        //console.log(row.login);
      },
      handleDelete(index, row) {
        this.$confirm('Вы действительно хотите удалить это устройство?', 'Внимание !!!', {
          confirmButtonText: 'ДА',
          cancelButtonText: 'НЕТ',
          type: 'warning'
        }).then(() => {
          this.deleteFromServer(row, index);          
        }).catch(() => {
                   
        });
        //console.log(row.id);
      },
      handleAdd() {
        this.mode = 'add';
        this.form = this.defaulteDevice;
        this.form.active_flag = false;
        this.dialogFormVisible = true;
      },
      saveDevice() {
        if(this.mode=='add') {
          this.form.id = this.lastId + 1;
        }
        this.sendToServer(this.form);
      },
      sendToServer(data) {
        data.active_flag = data.active_flag ? 'Y' : 'N';
        //data.pass = this.mode =='add' ? data.pass : '';
        axios({
            method: 'post', url: '/api/device/edit', data: comm.toBodyFormData(data),
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {            
                //console.log(res);
                if(res.data.success) {
                  if(this.mode =='add') this.devices.push(data);
                  else {
                    var idx = this.devices.indexOf(data);
                    Object.assign(this.devices[idx], data)
                  }
                  this.$message({
                    type: 'success', 
                    message: this.mode =='add' ? 'Устройство создано' : 'Данные устройства изменены'
                  });
                } else {
                  this.$message({
                    type: 'error', 
                    message: res.data.msg
                  });
                }
                this.dialogFormVisible = false;                
            })
            .catch(res => {
              if(res.response) {
                this.$message({
                  type: 'error', 
                  message: (this.mode == 'add' ? 'Устройство не создан: ' : 'Данные устройства не изменены: ') + res.response.status
                });
              }
              this.dialogFormVisible = false;
            });
      },
      deleteFromServer(data, idx) {
        axios({
            method: 'post', url: '/api/device/delete', data: comm.toBodyFormData({ id: data.id}),
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {            
                if(res.data.success) {
                    this.devices.splice(idx, 1);
                    this.getLastId();
                }
                this.dialogFormVisible = false;
                this.$message({
                  type: 'success',
                  message: 'Устройство удалено'
                });
            })
            .catch(res => {
              if(res.response) {
                this.$message({
                  type: 'error', 
                  message: 'Устройство не удалено: ' + res.response.status
                });
              }
              this.dialogFormVisible = false;
            });
      },
      getLastId() {
        var n = this.devices.length;
        var m = 0;
        for(var i=0; i<n; i++) {
            var k = this.devices[i].id;
            if(k>m) m=k;
        }
        this.lastId = m;
      }
    }
  }
</script>