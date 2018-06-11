import { request, config } from 'utils';

const { api } = config;
const {
  managerStatusAPI,
} = api;

// 通过型号查询任务下所有的报告
export async function managerStatusService (params) {
  return request({
    url: managerStatusAPI,
    method: 'post',
    data: params,
  });
}
