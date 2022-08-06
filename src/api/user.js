//引入
import request from '@/utils/request'

/**
 *
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 * @returns Pormise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 *
 * @param {string} mobile 验证手机号
 * @returns Pormise
 */
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 *
 * @returns Pormise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)
/**
 *
 * @param {*} file 图片的file对象
 * @returns  promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
