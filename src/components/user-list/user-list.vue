<template>
  <div class="user-list-warp">
    <el-row>
        <el-col :span="24">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row class="user-search">
      <!-- 搜索框部分 -->
        <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
            <!-- 添加按钮部分 -->
        <el-col :span="4">
            <el-button type="success" plain>成功按钮</el-button>
      </el-col>
    </el-row>
      <!-- 表格部分 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="  email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
// import axios from 'axios'
// import http from '@/assets/js/http'
import {getToken} from '@/assets/js/auth'
export default {
  async created () {
    const token = getToken()
    const res = await this.$http.get('/users', {
      headers: {
        // 配置请求携带身份令牌
        Authorization: token
      },
      // 请求参数，对象会被转成k=v 的格式 然后自动拼接到请求路径？后  发起请求
      params: {
        pagenum: 1,
        pagesize: 5
      }
    })
    this.tableData = res.data.data.users
  },
  data () {
    return {
      searchText: '',
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style>
  .user-search{
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
