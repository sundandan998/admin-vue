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
                <el-button slot="append"
                icon="el-icon-search"
                @click = "handleSearch">
                </el-button>
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
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      label="用户状态"
      width="180">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
  </el-table-column>
  <el-table-column
    label="操作"
    width="180">
    <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="small" plain></el-button>
        <el-button type="info" icon="el-icon-share" size="small" plain></el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" plain></el-button>
    </template>
</el-table-column>
  </el-table>
  <!-- 分页部分 -->
  <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[1,2,3,4]"
  layout="total,sizes,prev, pager, next, jumper"
  :total="totalSize">
</el-pagination>
  </div>
  </template>
<script>
// import axios from 'axios'
// import http from '@/assets/js/http'
// import {getToken} from '@/assets/js/auth'
export default {
  async created () {
    // 用户数据，上来加载第一页数据
    this.loadUsersPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      pageSize: 1
    }
  },
  methods: {
    // 单击切换每页大小，数据变化
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadUsersPage(1, pageSize)
      this.currentPage = 1
    },
    handleCurrentChange (currentPage) {
      this.loadUsersPage(currentPage, this.pageSize)
    },
    handleSearch () {
      this.loadUsersPage(1)
    },
    // 根据页码加载用户数据
    async loadUsersPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText
        }
      })
      const {users, total} = res.data.data
      this.tableData = users
      this.totalSize = total
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
