<template>
<div>

  <el-table
    :data="users"
    height="400"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="40">
    </el-table-column>
    <el-table-column
      prop="login"
      label="Логин"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user_type"
      label="Тип">
    </el-table-column>
    <el-table-column
      prop="active_flag"
      label="Активный" align="center">
    </el-table-column>
    <el-table-column
      prop="last_visit"
      label="Дата последней активности">
    </el-table-column>
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
  <el-dialog title="Пользователь" :visible.sync="dialogFormVisible" width="420px">
    <el-form :model="form">
      <el-form-item label="Логин" :label-width="formLabelWidth">
        <el-input v-model="form.login" autocomplete="off" placeholder="Введите логин"></el-input>
      </el-form-item>
      <el-form-item label="Пароль" :label-width="formLabelWidth">
        <el-input v-model="form.pass" autocomplete="off" type="password" placeholder="Введите пароль"></el-input>
      </el-form-item>
      <el-form-item label="Тип" :label-width="formLabelWidth">
        <el-select v-model="form.user_type" placeholder="Выберете тип пользователя">
          <el-option label="администратор" value="admin"></el-option>
          <el-option label="пользователь" value="user"></el-option>
          <el-option label="тех. пользователь" value="tuser"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Активен" :label-width="formLabelWidth">
        <el-checkbox v-model="form.active_flag"> </el-checkbox>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Отменить</el-button>
      <el-button type="primary" @click="saveUser">Сохранить</el-button>
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
      users: [{"id":2,"login":"strobo","pass":"de34ddf5af5bcbda0219a7280880a0b7c6ae7b12885160996fe3effaa67733a3","active_flag":"Y","user_type":"admin","last_visit":"2018-10-18T14:04:05Z"},{"id":3,"login":"nikita","pass":"8458b1d651d9faf2691730497b34526730947b758078610ec3a56ebe844fd1a3","active_flag":"Y","user_type":"admin","last_visit":"0001-01-01T00:00:00Z"},{"id":4,"login":"techuser","pass":"72340c1a74454eb58f66e4985e158bd2ee1be144bc5abc123c19e4755b169ef2","active_flag":"N","user_type":"techUser","last_visit":"0001-01-01T00:00:00Z"}],
      lastId: 0,
      formLabelWidth: '80px',
      form: {
        id: 0,
        login: '',
        pass: '',
        user_type: '',
        active_flag: 'N',
        last_visit: ''
      },
      defaulteUser: {
        id: 0,
        login: '',
        pass: '',
        user_type: '',
        active_flag: 'N',
        last_visit: '2006-01-02T00:00:00Z'
      },
      mode: 'add'
    }),
    created () {
      this.initialize();
    },
    methods: {
      initialize () {
        axios.get('/api/users')
        .then(response => {            
            this.users = response.data.success ? response.data.data : [];
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
        this.$confirm('Вы действительно хотите удалить этого пользователя?', 'Внимание !!!', {
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
        this.form = this.defaulteUser;
        this.form.active_flag = false;
        this.dialogFormVisible = true;
      },
      saveUser() {
        if(this.mode=='add') {
          this.form.id = this.lastId + 1;
        }
        this.sendToServer(this.form);
      },
      sendToServer(data) {
        data.active_flag = data.active_flag ? 'Y' : 'N';
        //data.pass = this.mode =='add' ? data.pass : '';
        axios({
            method: 'post', url: '/api/user/edit', data: comm.toBodyFormData(data),
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {            
                //console.log(res);
                if(res.data.success) {
                  if(this.mode =='add') this.users.push(data);
                  else {
                    var idx = this.users.indexOf(data);
                    Object.assign(this.users[idx], data)
                  }
                  this.$message({
                    type: 'success', 
                    message: this.mode =='add' ? 'Пользователь создан' : 'Данные пользователя изменены'
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
                  message: (this.mode == 'add' ? 'Пользователь не создан: ' : 'Данные пользователя не изменены: ') + res.response.status
                });
              }
              this.dialogFormVisible = false;
            });
      },
      deleteFromServer(data, idx) {
        axios({
            method: 'post', url: '/api/user/delete', data: comm.toBodyFormData({ id: data.id}),
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {            
                if(res.data.success) {
                    this.users.splice(idx, 1);
                    this.getLastId();
                }
                this.dialogFormVisible = false;
                this.$message({
                  type: 'success',
                  message: 'Пользователь удален'
                });
            })
            .catch(res => {
              if(res.response) {
                this.$message({
                  type: 'error', 
                  message: 'Пользователь не удален: ' + res.response.status
                });
              }
              this.dialogFormVisible = false;
            });
      },
      getLastId() {
        var n = this.users.length;
        var m = 0;
        for(var i=0; i<n; i++) {
            var k = this.users[i].id;
            if(k>m) m=k;
        }
        this.lastId = m;
      }
    }
  }
</script>