import request from '@/utils/request'

/**
 *
 * @param {*} channelId 频道id
 * @param {*} timestamp 请求第一页数据传当前的时间戳，求求上一页返回上一页时间戳
 * @returns
 */
export const getArticleAPI = (channelId, timestamp) =>
  request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
