<template>
  <div>
    <!-- 面包屑部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格部分 -->
    <el-table
      class="rights-form"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        label="层级">
        <!-- 自定义表格列 -->
        <!-- 1.在表格列中加一个template标签 写上slot-scop ='scop' -->
        <!-- slot-scop ='scop'的值scop可以是任意名字，他始终表示当前遍历的作用域对象 -->
        <!-- 该作用域中有一个属性row 可以用来获取当前行对象，就是数组的每一项 -->
          <template slot-scope="scope">
            <span v-if = "scope.row.level === '0'">一级</span>
            <span v-else-if = " scope.row.level === '1'">二级</span>
            <span v-else-if = " scope.row.level === '2'">三级</span>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created () {
    this.loadRigths()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadRigths () {
      const res = await this.$http.get('/rights/list')
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    }
  }
}
</script>

 <style>
  .rights-form{
    margin-top: 20px;
  }
 </style>
