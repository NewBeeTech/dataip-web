import { request, config } from 'utils'

const { api } = config
const { crossComparisonAPI, reportComparisonAPI } = api

export async function crossComparisonService (params) {
  return request({
    url: crossComparisonAPI,
    method: 'post',
    data: params,
  });
}

// 将横向比对的结果写入到报告
export async function reportComparisonService (params) {
  return request({
    url: reportComparisonAPI,
    method: 'post',
    data: params,
  });
}
