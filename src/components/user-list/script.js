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
      currentPage: 4,
      pageSize: 1,
      // 添加用户表单
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户表单
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 添加用户对话框
      dialogFormVisible: false,
      // 编辑用户对话框
      dialogEditFormVisible: false,
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
      this.currentPage = 4
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
          // 重新加载用户数据
          this.loadUsersPage(this.currentPage)
          // 清空表单内容
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
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
    },
    // 删除用户操作
    async handleDeleteUser (user) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 点击确认执行的操作
        const {id: userId} = user
        const res = await this.$http.delete(`/users/${userId}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 删除成功重新加载数据
          this.loadUsersPage(this.currentPage)
        }
      }).catch(() => { // 点击取消执行的操作
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑用户操作
    async handleEditUser () {
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`/users/${userId}`, this.editUserForm)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑用户成功'
        })
        // 关闭对话框
        this.dialogEditFormVisible = false
        // 重新加载数据
        this.loadUsersPage(this.currentPage)
      }
    },
    // 处理显示被编辑的用户表单信息
    async handleShowEditForm (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`/users/${user.id}`)
      console.log(res)
      this.editUserForm = res.data.data
    }
  }
}
