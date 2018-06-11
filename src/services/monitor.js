import { request, config } from 'utils';

const { api } = config;
const {
  managerStatusAPI,
  ipControlAPI,
} = api;

export async function managerStatusService (params) {
  return request({
    url: managerStatusAPI,
    method: 'post',
    data: params,
  });
}
export async function ipControlService (params) {
  return request({
    url: ipControlAPI,
    method: 'post',
    data: params,
  });
}
