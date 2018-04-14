import { request, config } from 'utils'

const { api , APIV3, APIHOST} = config
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
//获取型号
export async function getModels (params) {
  return request({
    url: `${APIV3}/instance/model`,
    method: 'get',
    data: params,
  })
}
//追加自定义参数
export async function appendParamSet (params) {
  return request({
    url: `${APIV3}/UserParamset/append`,
    method: 'post',
    data: params,
  })
}
//更新自定义参数
export async function updateParamSet (params) {
  return request({
    url: `${APIV3}/UserParamset/update`,
    method: 'post',
    data: params,
  })
}
//添加自定义参数
export async function addParamSet (params) {
  return request({
    url: `${APIV3}/UserParamset/new`,
    method: 'post',
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
export async function queryUserParamsetName (params) {
  return request({
    url: `${APIV3}/manual/judge/tree/UserParamsetName`,
    method: 'post',
    data: params,
  })
}
//获取型号信息
export async function setCurrTask (params) {
  return request({
    url: `${APIV3}/userConfig/setCurrTask`,
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
