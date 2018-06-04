import { request, config } from 'utils';

const { api } = config;
const {
  listInstanceByNameAPI,
  listTaskAPI,
  listInstanceAPI,
  downloadReportAPI,
  checkReportAPI,
  auditReportAPI,
  approveReportAPI,
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
export async function checkReportService(params) {
  return request({
    url: checkReportAPI,
    method: 'post',
    data: params,
  });
}
export async function auditReportService(params) {
  return request({
    url: auditReportAPI,
    method: 'post',
    data: params,
  });
}
export async function approveReportService(params) {
  return request({
    url: approveReportAPI,
    method: 'post',
    data: params,
  });
}
