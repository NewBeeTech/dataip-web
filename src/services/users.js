import { request, config } from 'utils'

const { api } = config
const { users, flyTime, listInstance, instanceActive,
  instanceBan,
  instanceIndex,
  listInstanceByName,
  blurQuery,
} = api

// 查询所有
export async function query (params) {
  return request({
    url: listInstance,
    method: 'post',
    data: params,
  })
}

// 根据任务获取实验
export async function listByName (params) {
  return request({
    url: listInstanceByName,
    method: 'post',
    data: params,
  })
}

export async function queryTree (params) {
  return request({
    url: instanceIndex,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}

export async function updateFlyTime (params) {
  return request({
    url: flyTime,
    method: 'post',
    data: params,
  })
}

export async function blurSearch (params) {
  return request({
    url: blurQuery,
    method: 'post',
    data: params,
  })
}

// 启用或者禁用
export async function changeStatus (params) {
  const url = params.operationType === 'disable' ? instanceBan : instanceActive
  delete params.operationType
  return request({
    url,
    method: 'post',
    data: params,
  })
}
