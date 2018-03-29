import { request, config } from 'utils'

const { api } = config
const {
  listInstance, paramTree,
  paramsetName, startJudge,
  judgeIndex,
} = api

export async function queryIndex (params) {
  return request({
    url: judgeIndex,
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: listInstance,
    method: 'get',
    data: params,
  })
}
export async function queryParams (params) {
  return request({
    url: paramTree,
    method: 'post',
    data: params,
  })
}

export async function queryParamsetName (params) {
  return request({
    url: paramsetName,
    method: 'post',
    data: params,
  })
}

export async function queryStartJudge (params) {
  return request({
    url: startJudge,
    method: 'post',
    data: params,
  })
}
