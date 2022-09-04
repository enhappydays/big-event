<template>
  <div class="reg-container">
    <!-- 头部的 logo 区域 -->
    <div class="header">
      <img src="../../assets/images/logo.png" alt="" />
    </div>

    <!-- 登录和注册区域 -->
    <div class="box">
      <div class="box-header"></div>
      <!-- 注册的表单 -->
      <el-form :model="form" :rules="rules" ref="regForm">
        <el-form-item prop="username">
          <el-input
          v-model="form.username"
            placeholder="请输入用户名"
            maxlength="10"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
           v-model="form.password"
            placeholder="请输入密码"
            maxlength="15"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
           v-model="form.repassword"
            placeholder="请再次输入密码"
            maxlength="15"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="btn-login" @click="regUser">注册</el-button>
        <el-link @click="$router.push('/login')" type="info" class="link-reg">去登录</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqRegister } from '@/api/user.js'
export default {
  name: 'RegIndex',
  data () {
    // 自定义校验规则，判断两次密码是否一致
    const rePwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }

    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 6, max: 15, message: '密码必须是6-15位的字符', trigger: ['blur', 'change'] }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: ['blur', 'change'] },
          { min: 6, max: 15, message: '密码必须是6-15位的字符', trigger: ['blur', 'change'] },
          { validator: rePwd, trigger: ['blur', 'change'] }
        ]
      }

    }
  },
  methods: {
    async regUser () {
      try {
        await this.$refs.regForm.validate()

        // 发起请求，注册新用户
        const res = await reqRegister(this.form)
        console.log(res)
        if (res.code === 1) {
        // 注册失败，提示错误消息
          this.$message.error(res.message)
        } else {
        // 注册成功，提示用户，跳转到登录页面
          this.$message.success('注册成功，请登录！')
          this.$router.push('/login')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

}

</script>

<style lang="less" scoped>
.reg-container {
  background-color: blue;
  height: 100%;
  background: url('../../assets/images/login_bg.jpg') no-repeat center;
  background-size: cover;

  .header {
    width: 1200px;
    margin: 0 auto;
    user-select: none;
  }

  .box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
    padding: 0 30px;
    box-sizing: border-box;

    .box-header {
      height: 60px;
      background: url('../../assets/images/login_title.png') no-repeat center;
    }

    .btn-login {
      width: 100%;
    }

    .link-reg {
      font-size: 12px;
    }
  }
}
</style>
