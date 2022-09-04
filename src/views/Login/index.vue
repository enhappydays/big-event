<template>
  <div class="login-container">
    <!-- 头部的 logo 区域 -->
    <div class="header">
      <img src="../../assets/images/logo.png" alt="" />
    </div>

    <!-- 登录和注册区域 -->
    <div class="box">
      <div class="box-header"></div>
      <!-- 登录的表单 -->
      <el-form ref="loginForm" :model="form" :rules="rules">
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
        <el-button @click="login" type="primary" class="btn-login" >登录</el-button>
        <el-link type="info" class="link-reg" @click="$router.push('/reg')">去注册账号</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>

// import { Message } from 'element-ui'
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        username: 'cd666',
        password: '123456'
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 10, message: '用户名长度为 5-10 位', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { pattern: /^\w{6,15}$/, message: '密码必须是6-15位的字符', trigger: ['blur', 'change'] }
        ]
      }

    }
  },
  methods: {
    login () {
      // 校验通过后,再去发出登录的请求
      this.$refs.loginForm.validate((flag) => {
        if (!flag) return
        // 发送异步任务
        this.$store.dispatch('user/login', this.form)
        console.log('发起登录请求...', this.form)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
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
    height: 270px;
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
