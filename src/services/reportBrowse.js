import { request, config } from 'utils'

const { api } = config
const { listInstanceByNameAPI } = api

// 通过型号查询任务下所有的报告
export async function listInstanceByNameService (params) {
  return request({
    url: listInstanceByNameAPI,
    method: 'post',
    data: params,
  });
}
