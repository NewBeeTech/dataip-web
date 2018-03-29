import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import lodash from 'lodash'
import constmenus from './constmenus'

const localRoles = JSON.parse(window.localStorage.getItem('app_roles')) || []

const handleRoles = (roles) => {
  const array = []
  if (!roles || !(roles instanceof Array)) { return array }
  const doArr = (obj) => {
    if (obj.name) {
      array.push(obj.name)
    }
    if (obj.roleList && obj.roleList instanceof Array) {
      obj.roleList.forEach(doArr)
    }
  }
  roles.forEach(doArr)
  return array
}

// 和本地menus tree 匹配
const roleToMenu = (roles) => {
  return roles.map((parent) => {
    parent.icon = 'book'
    parent.roleList = parent.roleList || []
    parent.roleList = parent.roleList.map((menuItem) => {
      let menuObj = lodash.find(constmenus, m => m.name === menuItem.name) || {}
      menuItem.route = menuObj.route
      menuItem.icon = menuObj.icon
      return menuItem
    })
    return parent
  })
}


export default {
  namespace: 'login',
  state: {
    roles: localRoles,
  },

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.result === '0') {
        let { roles, token } = data.data
        // 处理
        roles = roleToMenu(roles)
        const { from } = locationQuery
        yield put({
          type: 'updateRoles',
          payload: {
            roles,
          },
        })
        // 保存本地 解决刷新浏览器后 找不到数据的问题
        // console.log('设置 roles -- %o ---- username: %s', roles, payload.username)
        window && window.localStorage.setItem('app_token', token)
        window && window.localStorage.setItem('app_username', payload.username)
        // 保存roles to local 解决刷新浏览器后没有菜单问题
        window && window.localStorage.setItem('app_roles', JSON.stringify(roles))
        // 自动登录
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/paramsBrowse'))
        }
        yield put({
          type: 'app/updateState',
          payload: {
            user: {
              username: payload.username,
            },
          },
        })
      } else if (data && data.result === '1') {
        throw { message: data.errmsg }
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateRoles (state, { payload }) {
      return { ...state, ...payload }
    },
  },

}
