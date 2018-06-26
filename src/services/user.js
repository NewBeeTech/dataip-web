import { request, config } from 'utils'

const { api } = config
const {
  user,
  listInstance,
  instanceUpdate,
  instanceDelete,
  userListAPI,
} = api

export async function userListService(params) {
  return request({
    url: userListAPI,
    method: 'POST',
    data: params,
  });
}

export async function query (params) {
  return request({
    url: listInstance,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: instanceDelete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: instanceUpdate,
    method: 'post',
    data: params,
  })
}
