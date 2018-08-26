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
          <el-aside class="home-aside">Aside</el-aside>
          <el-main class="home-main">Main</el-main>
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
  background-color: #D3DCE6;
}
.home-main{
  background-color: #E9EEF3;
}

</style>
