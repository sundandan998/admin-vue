<template>
<div class="login-warp">
    <el-form label-position="top" @submit.prevent="login" ref="form" :model="userForm" label-width="80px">
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
          <el-button type="primary" @click="login">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
</div>
</template>

<script>
import axios from 'axios'
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
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      const data = res.data
      // 根据响应做交互
      if (data.meta.status === 200) {
        this.$router.push({
          name: 'home'
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
  }
</style>
