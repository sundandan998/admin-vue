<template>
    <el-container class="home-box">
      <el-header class="home-header">
          <el-row class="logo-img">
              <el-col :span="4"><div class="grid-content bg-purple"><img src="./logo.png" alt=""></div></el-col>
              <el-col :offset="16" :span="4"><div class="grid-content bg-purple">
                <a href="" @click.prevent="logout">退出</a></div></el-col>
            </el-row>
      </el-header>
      <el-container>
        <el-aside>
            <!-- 实现页面跳转:router="true" -->
            <!-- 菜单栏互斥  :unique-opened="true" -->
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo aside-menu"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              :unique-opened="true"
              :router="true"
              active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/users">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/roles">角色列表</el-menu-item>
                <el-menu-item index="2-2">权限列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">商品列表</el-menu-item>
                  <el-menu-item index="3-1">商品分类</el-menu-item>
                  <el-menu-item index="3-1">商品参数</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">数据列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
            </el-aside>
          <el-main class="home-main">
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$confirm('你确认要退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //  删除token
        window.localStorage.removeItem('admin-token')
        // 跳转到登录视图
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.home-box{
    height: 100%;
  }
.logo-img img{
  width: 185px;
  margin-top: -15px;
  margin-left: -20px;
}
.logo-img a{
  color:#000;
  text-decoration: none;
  font-weight: 700;
}
.home-header{
  background-color: #B3C0D1;
  line-height: 60px;
}
.home-aside{
  height: 100%;
  background-color: #D3DCE6;
}
.home-main{
  background-color: #E9EEF3;
}
.aside-menu{
  height: 100%;
}
</style>
