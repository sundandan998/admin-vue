<template>
<div class="login-wrap">
    <el-form class="login-form" label-position="top" @submit.prevent="login" ref="form" :model="userForm" label-width="80px">
      <h2 class="heading">用户登录</h2>
      <el-form-item label="用户名">
            <el-input
             v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input type="password"
               v-model="userForm.password">
              </el-input>
            </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
        </el-form-item>
      </el-form>
</div>
</template>

<script>
// import axios from 'axios'
// import http from '@/assets/js/http'
import {saveUserInfo} from '@/assets/js/auth'
export default{
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 采集表单数据
      // console.log(this.userForm)
      // 表单校验
      // 发请求执行登录操作
      const res = await this.$http.post('/login', this.userForm)
      const data = res.data
      // 根据响应做交互
      if (data.meta.status === 200) {
        // 把token放到本地存储localStorage中，其他组件需要都去localStorage中拿
        // 把服务器给我当前登录用户信息存储到本地存储 session-users
        // window.localStorage.setItem('session-users', JSON.stringify(data.data))
        saveUserInfo(data.data)
        this.$router.push({
          name: 'home'
        })
        this.$message({
          type: 'success',
          message: '登录成功!'
        })
      }
    }
  }
}
</script>
<style>
  .login-wrap{
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form{
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius:5px;
  }
.login-btn{
  width: 100%;
}
</style>
