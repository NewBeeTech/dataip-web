import { request, config } from 'utils'
import { asyncComponent } from 'react-async-component';

const { api } = config
const {
  user,
  listInstance,
  instanceUpdate,
  instanceDelete,
  userListAPI,
  roleListAPI,
  getRightsAPI,
  addRoleAPI,
  updateRoleAPI,
  getRoleRightsAPI,
  deleteRoleAPI,
} = api

export async function deleteRoleService(params) {
  return request({
    url: deleteRoleAPI,
    method: 'POST',
    data: params,
  });
}

export async function updateRoleService(params) {
  return request({
    url: updateRoleAPI,
    method: 'POST',
    data: params,
  });
}

export async function getRoleRightsService(params) {
  return request({
    url: getRoleRightsAPI,
    method: 'POST',
    data: params,
  });
}

export async function addRoleService(params) {
  return request({
    url: addRoleAPI,
    method: 'POST',
    data: params,
  });
}

export async function getRightsService(params) {
  return request({
    url: getRightsAPI,
    method: 'post',
    data: params,
  });
}

export async function roleListService(params) {
  return request({
    url: roleListAPI,
    method: 'POST',
    data: params,
  });
}

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
