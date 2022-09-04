<template>
  <div class="catelist-container">
    <!-- 卡片视图 -->
    <el-card>
        <!-- 面板屑导航 -->
        <el-breadcrumb separator="/" style="margin-bottom: 10px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章分类</el-breadcrumb-item>
        </el-breadcrumb>
       <!-- 添加按钮 -->
<el-row type="flex" justify="end" style="margin-bottom: 10px">
    <el-button type="primary" size="medium" @click="addDialogVisible = true">添加分类</el-button>
</el-row>

<!-- 添加分类信息的对话框 -->
<el-dialog @close="resetAddForm" ref="addRef"  title="添加文章分类" :visible.sync="addDialogVisible" width="35%">
    <!-- 添加的表单 -->
    <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="addForm.cate_alias"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="addCate">添 加</el-button>
    </span>
</el-dialog>
        <!-- 展示数据表格 -->
        <el-table
          :data="cateList"
          style="width: 100%" border stripe>
          <el-table-column type="index" label="序号" width="120"></el-table-column>
          <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
          <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button type="primary" size="mini" @click="showEditDialog(row.id)">修改</el-button>
              <!-- 修改分类信息的对话框 -->
<el-dialog @close="resetEditForm" title="修改文章分类" :visible.sync="editDialogVisible" width="35%">
    <!-- 修改分类的表单 -->
    <el-form :model="editForm" :rules="addRules" ref="editRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="editForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="editForm.cate_alias"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button @click="editCate" type="primary">确 定</el-button>
    </span>
</el-dialog>
              <el-button type="danger" size="mini" @click="removeCate(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>
<script>
import { reqAddArticleCate, reqUpdataArticle, reqDelArticle, reqGetCateInfoById } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArtCategory',
  created () {
    // 获取文章分类列表
    this.$store.dispatch('article/getCateList')
  },
  data () {
    return {
      // 是否展示添加的对话框
      addDialogVisible: false,
      // 添加的表单
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 是否展示修改的对话框
      editDialogVisible: false,
      // 修改的表单
      editForm: {
        id: '',
        cate_name: '',
        cate_alias: ''
      },
      // 添加的表单验证
      addRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 10, message: '分类名称必须是2-10位的字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { min: 2, max: 10, message: '分类别名必须是2-10位的字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 映射文章分类列表
    ...mapState('article', ['cateList'])
  },
  methods: {
    // 重置表单 对话框关闭完成后的事件
    resetAddForm () {
      this.$refs.addRef.resetFields()
    },

    // 新增文章分类
    async addCate () {
      await this.$refs.addRef.validate()
      const res = await reqAddArticleCate(this.addForm)
      // 提示用户
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success('新增文章分类成功！')
      // 关闭对话框
      this.addDialogVisible = false
      // 重新获取分类列表
      this.$store.dispatch('article/getCateList')
    },
    // 删除分类
    async removeCate (id) {
      // 询问用户是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 取消了删除
      if (confirmResult !== 'confirm') return this.$message.info('已取消操作')

      // 调用删除的接口
      const res = await reqDelArticle(id)

      // 判断删除的结果
      if (res.code !== 0) return this.$message.error(res.message)

      this.$message.success('删除分类成功！')

      // 重新获取分类列表
      this.$store.dispatch('article/getCateList')
    },
    // 数据回显
    async showEditDialog (id) {
      // 展示对话框
      this.editDialogVisible = true
      // 发送请求
      const res = await reqGetCateInfoById(id)
      // 数据回显 将结果赋值给双向绑定给表单的editForm
      if (res.code !== 0) return this.$message.error('获取分类失败')
      this.editForm = res.data
    },
    // 更新文章信息
    async editCate () {
      try {
        await this.$refs.editRef.validate()
        const res = await reqUpdataArticle(this.editForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success('更新分类成功！')
        this.editDialogVisible = false
        this.$store.dispatch('article/getCateList')
      } catch (e) {
        console.log(e)
      }
    },
    // 重置表单 对话框关闭完成后的事件
    resetEditForm () {
      this.$refs.editRef.resetFields()
    }

  }
}
</script>
<style scoped>

</style>
