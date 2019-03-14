<template>
  <el-container direction="horizontal" class="loginFon">
    
    <el-aside></el-aside>
    <el-main>

      <el-dialog
        title="Авторизация"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-press-escape="false"
        :close-on-click-modal = "false"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item prop="username" label="Логин" >
            <el-input
              v-model="form.username"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item label="Пароль">
            <el-input 
              v-model="form.password"
              name="password"
              type="password"
              auto-complete="on"
            />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="actLog">Войти</el-button>
        </span>
      </el-dialog>

      
    </el-main>

  </el-container>
</template>

<script>
import axios from 'axios'
import comm from '@/common.js'

  export default {
    data() {
      return {
        form: {
          username: '',
          passvord: ''
        },
        dialogVisible: true,
        valid: true,
        loginRules: [ v => !!v || 'Login не может быть пустым' ],
        passRules: [ v => !!v || 'Password не может быть пустым' ],
        message: ''
      }
    },
    created: function () {
        window.addEventListener('keyup', this.keyUp)
    },
    methods: {
      keyUp: function(ev) {
        if(ev.key == "Enter")
            this.actLog();
      },
      actLog: function() { 
        //if(!this.$data.valid) {
        //    this.message = 'Логин и пароль не могут быть пустыми.';
        //} else {
            this.loginRequest();
        //}
      },
      loginRequest() {
        axios({
        method: 'post', url: '/api/login', data: comm.toBodyFormData(this.form),
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {            
            if(res.data.success) {
                window.location = '/home';
            } else {
              this.$message({
                type: 'error', 
                message: res.data.msg
              });
            }
        })
        .catch(function (err) {
            console.log(err);
            this.errors.push(err);
        });
      }
    }
  }
</script>

<style>
  section.loginFon {
    background-image: url("../assets/fon.jpg");
    height: 100%;
  }
  aside.el-aside {
    width:50px !important; 
    height:100%;
    background-color: #f5f5f5;
    background-image: url("../assets/hc.png");
    background-repeat: no-repeat;
    background-position: bottom;
    box-shadow: 0 10px 10px 10px rgba(10,10,10,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  }
  div.el-dialog__header {
    background-color: #399;
    box-shadow: 0 0 10px 0px rgba(10,10,10,.2), 0 0 5px 0 rgba(0,0,0,.14), 0 0 10px 0 rgba(0,0,0,.12);
  }
  span.el-dialog__title {
    color:white;
  }
</style>