
/**
 * 封装与用户相关的接口函数
 */

import request from '@/utils/request.js'

/**
 * 用户登录
 * loginForm 传递的是一个对象 包含 用户名 和 密码
 */
export const reqLogin = form => {
  return request.post('/api/login', form)
}
/**
 * 用户注册
 * @param {*} form
 * @returns
 */
export const reqRegister = form => {
  return request.post('/api/reg', form)
}
/**
 * 获取用户个人信息携带token
 *
 */
export const reqGetUserInfo = () => {
  return request.get('/my/userinfo')
}
