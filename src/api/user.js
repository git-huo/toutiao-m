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
