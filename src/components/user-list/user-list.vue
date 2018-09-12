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
            <el-button
            type="success"
            plain
            @click="dialogFormVisible = true">添加按钮</el-button>
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
        @change ="(val) => {handleStateChange(val, scope.row)}"
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
<!-- 添加对话的弹出框 -->
<!-- 表单验证 -->
<!-- 1.为el-form 增加:rules -->
<!-- 2.为el-form-item 元素 配置prop属性 值是验证对象中对应的名称 -->
<!-- vue的$refs属性可以用来设置ref属性的DOM -->
<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form
  :model = "userForm"
  :rules = "addUserFormRules"
  ref = "addUserForm">
    <el-form-item label="用户名" label-width="120px" prop="username">
      <el-input v-model="userForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="120px" prop="password">
      <el-input v-model="userForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="120px" prop="email">
      <el-input v-model="userForm.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="120px" prop="mobile">
      <el-input v-model="userForm.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleAddUser">确 定</el-button>
  </div>
</el-dialog>
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
      pageSize: 1,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      // 表单验证
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输邮箱', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输电话', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      }
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
    // 用户搜索功能
    handleSearch () {
      this.loadUsersPage(1)
      this.searchText = ''
    },
    // switch开关状态功能
    async handleStateChange (state, user) {
      // console.log(val, user)
      const {id: userId} = user
      const res = await this.$http.put(`/users/${userId}/state/${state}`)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' : '禁用'}成功`
        })
      }
    },
    // 添加用户按钮
    async handleAddUser () {
      this.$refs['addUserForm'].validate(async (valid) => {
        if (!valid) {
          return false
        }
        // 根据响应做交互
        const res = await this.$http.post('/users', this.userForm)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          // 关闭对话框1
          this.dialogFormVisible = false
          this.loadUsersPage(this.currentPage)
        }
      })
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
