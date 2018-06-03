import { request, config } from 'utils'

const { api } = config
const { crossComparisonAPI } = api

export async function crossComparisonService (params) {
  return request({
    url: crossComparisonAPI,
    method: 'post',
    data: params,
  });
}
