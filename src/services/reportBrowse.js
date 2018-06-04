import { request, config } from 'utils';

const { api } = config;
const {
  listInstanceByNameAPI,
  listTaskAPI,
  listInstanceAPI,
  downloadReportAPI,
} = api;

// 通过型号查询任务下所有的报告
export async function listInstanceByNameService (params) {
  return request({
    url: listInstanceByNameAPI,
    method: 'post',
    data: params,
  });
}

export async function listInstanceService(params) {
  return request({
    url: listInstanceAPI,
    method: 'post',
    data: params,
  });
}

export async function listTaskService(params) {
  return request({
    url: listTaskAPI,
    method: 'post',
    data: params,
  });
}

export async function downloadReportService(params) {
  return request({
    url: downloadReportAPI,
    method: 'post',
    data: params,
  });
}
