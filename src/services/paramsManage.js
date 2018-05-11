import { request, config } from 'utils'

const { api , APIV3, APIHOST} = config
const {
  listUserParamsetByModelName,
  userParamsetDeleteAPI,
} = api

/**
 * 根据型号名称获取用户的自定义参数组
 * @param {[type]} params [description]
 */
export async function queryListUserParamsetByModelName(params) {
  return request({
    url: listUserParamsetByModelName,
    method: 'post',
    data: params,
  });
}

/**
 * 删除自定义参数组
 * @param {[type]} params [description]
 */
export async function userParamsetDeleteService(params) {
  return request({
    url: userParamsetDeleteAPI,
    method: 'post',
    data: params,
  });
}
