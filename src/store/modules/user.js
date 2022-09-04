import { reqLogin, reqGetUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/storage'

import router from '@/router'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {

    token: getToken() || '',

    // 用户信息
    userInfo: {}

  },
  getters: {
    // 动态计算文本头像
    textAvatar (state) {
      return state.userInfo.username ? state.userInfo.username.charAt(0).toUpperCase() : ''
    }
  },
  mutations: {
    // 设置token
    setUserToken (state, newToken) {
      state.token = newToken
      // 本地存一份
      setToken(newToken)
    },
    clearToken (state) {
      state.token = ''
      removeToken()
    },
    // 设置用户信息
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    clearUserInfo (state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录操作
    async login (ctx, payload) {
      // 2.1发起请求
      const res = await reqLogin(payload)
      console.log(res)
      // 2.2提交mutation
      ctx.commit('setUserToken', res.token)
      // 2.3提示用户
      if (res.code !== 0) {
        return Message.error('登录失败！')
      }
      Message.success('登录成功')
      // 2.4跳转到主页面（临时）
      router.push('./')
    },
    async getUserInfo (context) {
      const res = await reqGetUserInfo()
      // 如果状态码是0 提交对应的mutation存储用户信息
      if (res.code === 0) {
        context.commit('setUserInfo', res.data)
      }
    },
    logout (ctx) {
      ctx.commit('clearToken')
      ctx.commit('clearUserInfo')
    }
  }
}
