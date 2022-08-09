import request from '@/utils/request'
/**
 *
 * @param {String} p 搜索关键词
 * @returns  Promise
 */
export const getSearchSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
export const getSearchAPI = (q) => {
  return request({
    url: '/v1_0/search',
    params: { q }
  })
}
